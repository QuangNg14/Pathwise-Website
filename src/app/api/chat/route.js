import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

let _cachedModelList = null;
let _cachedModelListAtMs = 0;
let _cachedAutoModel = null;

function normalizeModelName(name) {
  if (!name) return name;
  return name.startsWith("models/") ? name.slice("models/".length) : name;
}

function looksLikeModelNotFoundError(error) {
  const msg = (error?.message || String(error)).toLowerCase();
  return (
    (msg.includes("404") || msg.includes("not found")) &&
    (msg.includes("models/") || msg.includes("model")) &&
    msg.includes("generatecontent")
  );
}

async function listSupportedModels(apiKey) {
  const now = Date.now();
  if (_cachedModelList && now - _cachedModelListAtMs < 5 * 60 * 1000) {
    return _cachedModelList;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
    apiKey
  )}`;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `ListModels failed (${res.status} ${res.statusText}). ${body}`.trim()
    );
  }

  const json = await res.json();
  const models = Array.isArray(json?.models) ? json.models : [];
  const supported = models
    .filter((m) =>
      Array.isArray(m?.supportedGenerationMethods)
        ? m.supportedGenerationMethods.includes("generateContent")
        : false
    )
    .map((m) => normalizeModelName(m?.name))
    .filter(Boolean);

  _cachedModelList = supported;
  _cachedModelListAtMs = now;
  return supported;
}

function pickBestModel(modelNames) {
  const names = Array.isArray(modelNames) ? modelNames : [];
  const lower = names.map((n) => String(n).toLowerCase());

  const flashIdx = lower.findIndex(
    (n) => n.includes("gemini") && n.includes("flash")
  );
  if (flashIdx >= 0) return names[flashIdx];

  const geminiIdx = lower.findIndex((n) => n.includes("gemini"));
  if (geminiIdx >= 0) return names[geminiIdx];

  return names[0] || null;
}

export async function POST(request) {
  try {
    const { message, chatHistory = [] } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        {
          error: "Gemini API key not configured",
          hint: "Set GEMINI_API_KEY in .env.local (local) or environment variables (deployment) and restart the server.",
        },
        { status: 500 }
      );
    }

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Initialize Gemini only after we know the key exists (avoids module-load failures)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const requestedModel =
      process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash-lite";
    let model = genAI.getGenerativeModel({ model: requestedModel });

    // Create a system prompt for the mentorship chatbot
    const systemPrompt = `You are a helpful AI assistant for Pathwise Mentorship, a program that helps Vietnamese students in the U.S. get internships and full-time positions at top companies.

Your role is to:
- Provide guidance on career development, resume building, and interview preparation
- Answer questions about the mentorship program
- Help with application processes
- Offer advice on networking and job searching
- Be encouraging and supportive

Keep responses concise (2-3 sentences), professional, and helpful. If you don't know something specific about Pathwise, politely suggest contacting the team directly.

Previous conversation context: ${chatHistory
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n")}

User's current message: ${message}`;

    let text = "";
    try {
      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      text = response.text();
    } catch (error) {
      // If the configured/default model isn't available for this key/API version, auto-discover via ListModels.
      if (looksLikeModelNotFoundError(error) && !process.env.GEMINI_MODEL) {
        try {
          if (!_cachedAutoModel) {
            const supported = await listSupportedModels(
              process.env.GEMINI_API_KEY
            );
            _cachedAutoModel = pickBestModel(supported);
          }

          if (_cachedAutoModel && _cachedAutoModel !== requestedModel) {
            model = genAI.getGenerativeModel({ model: _cachedAutoModel });
            const retry = await model.generateContent(systemPrompt);
            const retryResp = await retry.response;
            text = retryResp.text();
          } else {
            throw error;
          }
        } catch (autoError) {
          return Response.json(
            {
              error: "Failed to get response from AI (model not available)",
              details: error?.message || String(error),
              hint: "Set GEMINI_MODEL to a valid model returned by ListModels (https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY), then restart the server.",
            },
            { status: 500 }
          );
        }
      } else {
        throw error;
      }
    }

    return Response.json({
      success: true,
      message: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      {
        error: "Failed to get response from AI",
        details: error?.message || String(error),
        hint: "If you see a 404 model error, set GEMINI_MODEL in your environment (e.g., .env.local) to one of the model IDs returned by the ListModels endpoint.",
      },
      { status: 500 }
    );
  }
}
