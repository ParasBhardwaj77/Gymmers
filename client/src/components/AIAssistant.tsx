import { useEffect, useRef } from "react";
import { MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import api from "../api/axios";

const AIAssistant = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleTryAI = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userStr = localStorage.getItem("user");
      const isPremium = userStr ? JSON.parse(userStr).premium === true : false;

      if (!isPremium) {
        try {
          const response = await api.post("/payment/create-checkout-session");
          if (response.data && response.data.url) {
            window.location.href = response.data.url;
          }
        } catch (error) {
          console.error("Error creating checkout session:", error);
          alert("Failed to initiate payment. Please try again.");
        }
      } else {
        navigate("/ai-beta");
      }
    } catch (e) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const chatBubbles = chatRef.current?.children;

    // Animate Text
    gsap.fromTo(
      textRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      },
    );

    // Animate Chat Bubbles Staggered
    if (chatBubbles) {
      gsap.fromTo(
        chatBubbles,
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.4,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-gym-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text Content */}
        <div ref={textRef} className="order-2 lg:order-1 space-y-8">
          <div className="flex items-center gap-3 text-gym-accent font-bold uppercase tracking-wider text-sm">
            <span className="p-2 bg-gym-accent/10 rounded-lg">
              <MessageSquare size={20} />
            </span>
            Gymmers AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Your Personal Trainer.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gym-accent to-gym-orange">
              Available 24/7.
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Not sure what to eat? Need a workout modification? Our proprietary
            AI coach learns your goals and habits to provide instant,
            science-backed advice anytime you need it.
          </p>
          <ul className="space-y-4 text-gray-300">
            {[
              "Instant Workout Adjustments",
              "Macro-Nutrient Tracking",
              "Form Correction Tips",
              "Sleep & Recovery Analysis",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gym-accent"></div>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={handleTryAI}
            className="mt-4 bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Try AI Beta
          </button>
        </div>

        {/* Right: Chat UI Mockup */}
        <div className="order-1 lg:order-2 flex justify-center perspective-1000">
          <div className="w-full max-w-sm bg-gym-gray rounded-[2rem] border-4 border-white/10 p-4 shadow-2xl transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out">
            <div className="bg-gym-black rounded-3xl p-6 h-[500px] flex flex-col relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gym-accent to-gym-orange flex items-center justify-center font-bold text-white">
                  AI
                </div>
                <div>
                  <div className="font-bold text-white">Gymmers Coach</div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    ● Online
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] text-sm text-gray-200">
                  Hello Paras! Ready to crush your leg day? 🦵
                </div>
                <div className="bg-gym-accent p-3 rounded-2xl rounded-tr-none self-end max-w-[85%] text-sm text-white ml-auto">
                  Yes! But my knee hurts a bit. Can we swap squats?
                </div>
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] text-sm text-gray-200">
                  No problem. Let's switch to Leg Press (3x12) and Bulgarian
                  Split Squats (lighter weight). Focus on depth! 🏋️‍♂️
                </div>
                <div className="bg-gym-accent p-3 rounded-2xl rounded-tr-none self-end max-w-[85%] text-sm text-white ml-auto">
                  Perfect, thanks! What about post-workout meal?
                </div>
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none self-start max-w-[85%] text-sm text-gray-200">
                  Try 30g protein (Whey/Chicken) + 50g carbs (Rice/Banana). I've
                  logged it for you. 🥗
                </div>
              </div>

              {/* Input Area */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="bg-white/5 rounded-full px-4 py-2 text-sm text-white w-full border border-white/10 focus:outline-none focus:border-gym-accent"
                />
                <button className="bg-gym-accent p-2 rounded-full text-white hover:bg-gym-orange transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
