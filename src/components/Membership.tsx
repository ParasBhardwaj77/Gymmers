import { useEffect, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import gsap from "gsap";

const Membership = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const plans = [
    {
      name: "All Access",
      price: "15",
      period: "/ month",
      features: [
        "Access to Gym Floor",
        "Locker Room Access",
        "1 Personal Training Session",
        "Free WiFi",
        "AI Fitness Trainer",
      ],
      highlight: true,
      popular: false,
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 bg-gym-gray relative scroll-mt-20"
    >
      {/* Background Noise/Texture optional */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-gym-accent font-bold tracking-wider uppercase text-sm mb-2">
            Membership Plans
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Invest In Your <span className="text-gray-500">Body</span>
          </h3>
        </div>

        <div
          ref={cardsRef}
          className="flex justify-center items-center max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 w-full max-w-md ${
                plan.highlight
                  ? "bg-gradient-to-b from-gym-gray to-gym-black border-gym-accent shadow-[0_0_30px_rgba(225,6,0,0.2)] md:-mt-8 md:mb-8 z-10"
                  : "bg-gym-black border-white/10 hover:border-white/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gym-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$</span>
                <span className="text-5xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400 ml-2 text-sm">
                  {plan.period || "/ month"}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, _) => (
                  <li
                    key={_}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <div
                      className={`p-1 rounded-full ${plan.highlight ? "bg-gym-accent text-white" : "bg-white/10 text-gray-400"}`}
                    >
                      <Check size={12} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? "bg-gym-accent text-white hover:bg-gym-orange shadow-lg hover:shadow-gym-orange/50"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Choose Plan <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Membership;
