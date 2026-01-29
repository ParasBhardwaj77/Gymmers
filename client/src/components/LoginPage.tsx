import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Mail, Lock, ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      leftSideRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
    )
      .fromTo(
        rightSideRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        formRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.5",
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex bg-gym-black overflow-hidden font-sans"
    >
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
          <ArrowLeft size={18} />
        </div>
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Left Side: Form */}
      <div
        ref={leftSideRef}
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 z-10"
      >
        <div ref={formRef} className="max-w-sm w-full mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="text-gym-accent font-bold tracking-widest uppercase text-xs">
              Join the Elite
            </h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sign in
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your details to continue your transformation journey.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-black py-2.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-gym-black px-4 text-gray-500 font-medium tracking-wider">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-300 ml-1">
                  Email address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-gym-accent transition-colors">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-gym-accent focus:bg-white/10 text-sm transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-medium text-gray-300">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[10px] text-gym-accent hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-gym-accent transition-colors">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-gym-accent focus:bg-white/10 text-sm transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
            </div>

            <button className="w-full group bg-gym-accent hover:bg-gym-orange text-white py-3.5 rounded-xl font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(255,10,0,0.2)] hover:shadow-[0_0_30px_rgba(255,95,31,0.4)] flex items-center justify-center gap-2 mt-1">
              Continue
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-semibold hover:text-gym-accent transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual */}
      <div ref={rightSideRef} className="hidden lg:block w-1/2 relative h-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-gym-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 z-10 bg-black/20"></div>
        <img
          src="/login-bg.png"
          alt="Gym Interior"
          className="h-full w-full object-cover"
        />

        {/* Quote Overlay */}
        <div className="absolute bottom-16 left-16 right-16 z-20 space-y-4">
          <div className="w-12 h-1 bg-gym-accent"></div>
          <h3 className="text-3xl font-bold text-white leading-tight">
            "The only bad workout is the one that didn't happen."
          </h3>
          <p className="text-gray-300 font-medium">— Kai Greene</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
