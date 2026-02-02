import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Navigation, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Location = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          setIsPremium(user.premium === true);
        } else {
          setIsPremium(false);
        }
      } catch (e) {
        setIsPremium(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        mapRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleJoinMembership = async () => {
    if (!isLoggedIn) {
      navigate("/signup");
      return;
    }

    try {
      const response = await api.post("/payment/create-checkout-session");
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      className="py-24 bg-gym-black relative overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info Card */}
          <div ref={infoRef} className="relative z-20">
            <div className="bg-gym-gray/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl hover:shadow-gym-accent/10 transition-shadow duration-500">
              <h2 className="text-gym-accent font-bold tracking-wider uppercase text-sm mb-2">
                Find Us
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Visit <span className="text-gym-accent">GYMMERS</span>
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-gym-accent/10 p-3 rounded-full text-gym-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Address
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      GYMMERS Fitness Hub
                      <br />
                      214 Iron Street, Downtown Brooklyn,
                      <br />
                      New York, USA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gym-accent/10 p-3 rounded-full text-gym-accent">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Opening Hours
                    </h4>
                    <p className="text-gray-400">
                      Monday – Sunday
                      <br />
                      5:00 AM – 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=214+Iron+Street+Downtown+Brooklyn+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group hover:scale-105 transform duration-300"
                >
                  <Navigation
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  Get Directions
                </a>
                {!isPremium && (
                  <button
                    onClick={handleJoinMembership}
                    className="px-8 py-4 bg-gym-accent text-white rounded-full font-bold hover:bg-gym-orange transition-all flex items-center justify-center gap-2 hover:scale-105 transform duration-300 shadow-lg hover:shadow-gym-orange/50"
                  >
                    Join Membership
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.522204555845!2d-73.9893!3d40.6932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a4a9c687259%3A0x889893110037a346!2sDowntown%20Brooklyn%2C%20Brooklyn%2C%20NY!5e0!3m2!1sen!2sus!4v1706600000000!5m2!1sen!2sus&invert_filter=true&maptype=roadmap&mode=dark"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) invert(92%) contrast(83%)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>

            {/* Interactive Overlay Hint */}
            <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
