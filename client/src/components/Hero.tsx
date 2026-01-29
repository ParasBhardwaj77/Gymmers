import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, MessageCircle } from "lucide-react";

const TOTAL_FRAMES = 40;
const FPS = 18; // 18 FPS - Sweet spot between laggy (12) and fast (24)
const FRAME_DURATION = 1 / FPS;

// Generate frame paths
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = (i + 1).toString().padStart(3, "0");
  return `/sequence/ezgif-frame-${num}.jpg`;
});

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Store loaded images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    framePaths.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      loadedImages[index] = img;
    });

    imagesRef.current = loadedImages;

    return () => {
      // Cleanup if needed
      loadedImages.forEach((img) => (img.onload = null));
    };
  }, []);

  // Canvas Rendering & Animation
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency
    if (!ctx) return;

    // Render Function (Hard Cut)
    const render = (fIndex: number) => {
      if (!ctx || !canvas || !imagesRef.current[fIndex]) return;

      const img = imagesRef.current[fIndex];
      const w = canvas.width;
      const h = canvas.height;

      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;

      let drawW, drawH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        offsetX = 0;
        offsetY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        offsetX = (w - drawW) / 2;
        offsetY = 0;
      }

      // No clearing needed if we cover the whole canvas
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    // Handle Resize
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        // Optimization: don't re-render here, loop will catch it next frame
      }
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    // Animation Loop
    let accumulatedTime = 0;
    let currentFrame = 0;

    const loop = (timestamp: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const deltaTime = (timestamp - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = timestamp;

      accumulatedTime += deltaTime;

      if (accumulatedTime >= FRAME_DURATION) {
        // Catch up logic
        const framesToAdvance = Math.floor(accumulatedTime / FRAME_DURATION);

        if (framesToAdvance > 0) {
          currentFrame = (currentFrame + framesToAdvance) % TOTAL_FRAMES;
          accumulatedTime -= framesToAdvance * FRAME_DURATION;
          render(currentFrame);
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [imagesLoaded]);

  // Initial Entrance Animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" },
    )
      .fromTo(
        textRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.5",
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
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gym-black pb-24 pt-32"
    >
      {/* Canvas Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-gym-black via-gym-black/40 to-black/20 z-10"></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div ref={textRef} className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-gym-accent font-bold tracking-[0.2em] uppercase text-sm md:text-base animate-pulse">
            Welcome to the Future of Fitness
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
            TRAIN HARD.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
              STAY STRONG.
            </span>
            <br />
            <span className="text-gym-accent">BE A GYMMER.</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Elite training, smart nutrition, and AI-powered fitness guidance —
            all within a premium facility designed for champions.
          </p>
        </div>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/signup"
            className="group relative bg-gym-accent text-white px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,95,31,0.6)] text-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Join Membership
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:animate-shine" />
          </Link>

          <Link
            to="/login"
            className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white hover:text-gym-black hover:scale-105 flex items-center justify-center gap-3 text-center"
          >
            <MessageCircle className="w-5 h-5" />
            Ask a Question
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 ml-2 animate-bounce z-20 opacity-70">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
