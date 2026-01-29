import { useEffect, useRef } from "react";
import { Dumbbell, Users, Zap, Brain, Clock } from "lucide-react";
import gsap from "gsap";

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Users size={32} />,
      title: "Expert Trainers",
      description:
        "Train with certified professionals who have coached champions.",
    },
    {
      icon: <Dumbbell size={32} />,
      title: "Elite Equipment",
      description: "State-of-the-art Hammer Strength & Technogym machinery.",
    },
    {
      icon: <Zap size={32} />,
      title: "Personalized Plans",
      description:
        "Custom workout and nutrition plans tailored to your DNA and goals.",
    },
    {
      icon: <Brain size={32} />,
      title: "AI Coaching",
      description:
        "24/7 access to our proprietary AI fitness assistant for instant guidance.",
    },
    {
      icon: <Clock size={32} />,
      title: "Flexible Access",
      description: "Open 24/7 because we know dedication doesn't sleep.",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current?.children;

    if (cards) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Start when top of section hits 80% viewport height
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="py-24 bg-gym-gray relative overflow-hidden scroll-mt-20 min-h-screen"
    >
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gym-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gym-orange/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-gym-accent font-bold tracking-wider uppercase text-sm mb-2">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Redefining Fit<span className="text-gray-500">ness</span>
          </h3>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gym-black/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-gym-accent/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gym-accent mb-4 group-hover:bg-gym-accent group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                {feature.description}
              </p>
            </div>
          ))}

          {/* Last card acts as a CTA or graphic */}
          <div className="bg-gradient-to-br from-gym-accent to-gym-orange p-6 rounded-2xl flex flex-col justify-center items-center text-center transform md:scale-105 shadow-lg">
            <h4 className="text-xl font-bold text-white mb-2">
              Ready to Start?
            </h4>
            <p className="text-white/90 mb-4 text-sm">
              Join 10,000+ members transforming their lives today.
            </p>
            <button className="bg-white text-gym-accent px-6 py-2 rounded-full font-bold hover:bg-gym-black hover:text-white transition-colors text-sm">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
