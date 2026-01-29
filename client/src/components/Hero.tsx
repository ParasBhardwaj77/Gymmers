import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Background Image Parallax/Scale
    tl.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
    )
      .fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=1.0",
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="w-full h-full">
          <img
            src="/hero.png"
            alt="Gym Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-gym-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div ref={textRef} className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-gym-accent font-bold tracking-wider uppercase text-sm md:text-base">
            Welcome to the Future of Fitness
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight">
            TRAIN HARD.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              STAY STRONG.
            </span>
            <br />
            BE A GYMMER.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Elite training, smart nutrition, and AI-powered fitness guidance —
            all within a premium facility designed for champions.
          </p>
        </div>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <button className="bg-gym-accent hover:bg-gym-orange text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(225,6,0,0.4)] hover:shadow-[0_0_30px_rgba(255,95,31,0.6)] flex items-center gap-2 group">
            Start Your Journey
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
