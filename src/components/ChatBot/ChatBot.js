import React, { useState, useRef, useEffect } from "react";
import {
  CloseOutlined,
  SendOutlined,
  MessageOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "./ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Pathwise AI assistant. How can I help you with your career journey today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Help with resume review",
    "Interview preparation tips",
    "Career guidance",
    "About Pathwise program",
    "Application process",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setIsLoading(true);

      try {
        // Prepare chat history for context
        const chatHistory = messages.slice(-10).map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: newMessage,
            chatHistory: chatHistory,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const botMessage = {
            id: Date.now() + 1,
            text: data.message,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          const extraHint = data?.hint ? `\n\n${data.hint}` : "";
          throw new Error(
            (data?.error || "Failed to get response") + extraHint
          );
        }
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage = {
          id: Date.now() + 1,
          text:
            error?.message ||
            "Sorry, I'm having trouble connecting right now. Please try again later or contact our team directly.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickReply = async (reply) => {
    const userMessage = {
      id: Date.now(),
      text: reply,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-10).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: reply,
          chatHistory: chatHistory,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          id: Date.now() + 1,
          text: data.message,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const extraHint = data?.hint ? `\n\n${data.hint}` : "";
        throw new Error((data?.error || "Failed to get response") + extraHint);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text:
          error?.message ||
          "Sorry, I'm having trouble connecting right now. Please try again later or contact our team directly.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageOutlined />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-overlay">
          <div className="chatbot-window">
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <h3 className="chatbot-title">Pathwise AI Assistant</h3>
                <p className="chatbot-subtitle">Powered by Google Gemini AI</p>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
              >
                <CloseOutlined />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-bubble">{message.text}</div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="message bot">
                  <div className="message-bubble loading">
                    <LoadingOutlined spin /> Thinking...
                  </div>
                </div>
              )}

              {/* Quick Reply Buttons (only show after first bot message) */}
              {messages.length === 1 && (
                <div className="quick-replies">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      className="quick-reply-btn"
                      onClick={() => handleQuickReply(reply)}
                      disabled={isLoading}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chatbot-input-area">
              <div className="chatbot-input-container">
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Ask me anything about career development..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                >
                  {isLoading ? <LoadingOutlined spin /> : <SendOutlined />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
