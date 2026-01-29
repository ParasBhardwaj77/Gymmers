import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Alex Russo",
      role: "Pro Athlete",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      review:
        "Gymmers changed my perspective on elite training. The AI coach is shockingly accurate, and the equipment is world-class.",
    },
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      review:
        "The 24/7 access matches my crazy schedule. I've gained 5kg of muscle in 3 months using their personalized plans.",
    },
    {
      name: "Marcus Johnson",
      role: "Fitness Enthusiast",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      review:
        "The community here is different. No egos, just people wanting to be better. Best gym investment I've ever made.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const slide = slideRef.current;
    if (slide) {
      gsap.fromTo(
        slide,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      );
    }

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="py-24 bg-gym-gray relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-gym-accent/5">
        <Quote size={200} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-gym-accent font-bold tracking-wider uppercase text-sm mb-2">
            Success Stories
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Member <span className="text-gray-500">Reviews</span>
          </h3>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gym-black rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-20 md:-left-6 md:bg-gym-accent md:hover:bg-gym-orange"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-20 md:-right-6 md:bg-gym-accent md:hover:bg-gym-orange"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content */}
            <div
              ref={slideRef}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left"
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gym-accent shadow-lg">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-1 justify-center mt-4 text-yellow-500 md:hidden">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="hidden md:flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-gray-200 italic font-light mb-6 leading-relaxed">
                  "{testimonials[currentIndex].review}"
                </p>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gym-accent text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-gym-accent w-8" : "bg-gray-600 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
