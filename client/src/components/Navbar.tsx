import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UserMenu from "./UserMenu";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Programs", href: "#programs" },
    { name: "Pricing", href: "#pricing" },
    { name: "Location", href: "#location" },
  ];

  // Check auth state
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();

    // Listen for storage events (logout from another tab)
    window.addEventListener("storage", checkAuth);

    // Custom event listener for same-tab updates
    // This is optional but helpful if not using a global state manager
    // We'll rely on storage event or just page reload for now as implemented in UserMenu

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initial Animation
    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.4",
      )
      .fromTo(
        linksRef.current?.children || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
        "-=0.3",
      )
      .fromTo(
        actionsRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.3",
      );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gym-black/80 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          ref={logoRef}
          className="text-2xl font-bold font-sans tracking-tighter uppercase text-white cursor-pointer group"
        >
          Gym
          <span className="text-gym-accent group-hover:text-white transition-colors">
            mers
          </span>
        </Link>

        {/* Desktop Links */}
        <div
          ref={linksRef}
          className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white relative group transition-colors"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gym-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div ref={actionsRef} className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gym-accent hover:bg-gym-orange text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(225,6,0,0.3)] hover:shadow-[0_0_25px_rgba(255,95,31,0.5)] flex items-center gap-2"
              >
                Join Membership
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-gym-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-2xl font-bold text-white hover:text-gym-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        {isLoggedIn ? (
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-medium text-white">My Profile</span>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                setIsMobileMenuOpen(false);
                window.location.reload();
              }}
              className="bg-red-500/20 text-red-500 px-8 py-2 rounded-full font-bold text-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/signup"
            className="mt-8 bg-gym-accent text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gym-orange transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Membership
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
