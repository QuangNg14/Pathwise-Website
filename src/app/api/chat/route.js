import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

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

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    // Generate content
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({
      message: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      {
        error: "Failed to get response from AI",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
