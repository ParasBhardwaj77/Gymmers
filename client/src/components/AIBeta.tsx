import { useState, useEffect, useRef } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AIBeta = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    {
      text: "Welcome to Gymmers AI Beta! How can I help you reach your fitness goals today?",
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Premium Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let isPremium = false;

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        isPremium = user.premium === true;
      } catch (e) {
        console.error("Error parsing user data");
      }
    }

    if (!token || !isPremium) {
      navigate("/");
    }
  }, [navigate]);

  // Entrance Animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".ai-bg",
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
    )
      .fromTo(
        ".chat-container",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
        "-=1",
      )
      .fromTo(
        ".ai-title",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.5",
      );
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = inputText.trim();
    if (!prompt) return;

    // Add User Message
    setMessages((prev) => [...prev, { text: prompt, isBot: false }]);
    setInputText("");

    try {
      // Call Backend API
      /* import api from "../api/axios"; // Ensure this import exists at top */
      const response = await api.post("/chat", { prompt });

      if (response.data && response.data.response) {
        setMessages((prev) => [
          ...prev,
          {
            text: response.data.response,
            isBot: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting to the fitness database. Please try again.",
          isBot: true,
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gym-black relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 px-4">
      {/* Animated Background */}
      <div className="ai-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gym-accent/20 via-gym-black to-gym-black opacity-60 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 ai-title">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="text-gym-accent animate-spin-slow" size={32} />
            <h1 className="text-4xl font-extrabold text-white tracking-widest">
              GYMMERS <span className="text-gym-accent">AI</span>
            </h1>
          </div>
          <p className="text-gym-accent/80 font-mono text-sm tracking-[0.3em] uppercase">
            Beta Version 1.0
          </p>
        </div>

        {/* Chat Interface */}
        <div className="chat-container flex-1 bg-gym-gray/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(255,95,31,0.15)]">
          {/* Messages Area */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gym-accent/50 scrollbar-track-transparent"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`
                              max-w-[80%] p-4 rounded-2xl flex gap-3 text-white shadow-lg
                              ${
                                msg.isBot
                                  ? "bg-white/10 rounded-tl-none border border-white/5"
                                  : "bg-gym-accent rounded-tr-none text-white"
                              }
                              animate-fade-in-up
                          `}
                >
                  {msg.isBot && (
                    <Bot size={24} className="text-gym-accent min-w-[24px]" />
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/20 border-t border-white/5">
            <form
              onSubmit={handleSend}
              className="relative flex items-center gap-4"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about workout plans, nutrition, or exercises..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-gym-accent focus:ring-1 focus:ring-gym-accent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 p-3 bg-gym-accent hover:bg-gym-orange text-white rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-gym-accent/50"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBeta;
