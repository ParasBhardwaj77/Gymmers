import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Smartphone } from "lucide-react";
import gsap from "gsap";

const Dashboard = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let isPremium = false;

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        isPremium = user.premium === true;
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    if (!token || !isPremium) {
      navigate("/");
    }
  }, [navigate]);

  // Generate time slots from 6 AM (6) to 11 PM (23)
  const timeSlots = [];
  for (let i = 6; i <= 23; i++) {
    const hour = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? "PM" : "AM";
    timeSlots.push(`${hour}:00 ${ampm}`);
  }

  useEffect(() => {
    gsap.fromTo(
      ".dashboard-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
    );
  }, []);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSchedule = () => {
    if (selectedTime) {
      alert(`Session scheduled for: ${selectedTime}`);
    } else {
      alert("Please select a time slot first.");
    }
  };

  return (
    <div className="min-h-screen bg-gym-black pt-28 pb-12 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-6 text-center dashboard-item">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            MEMBER <span className="text-gym-accent">DASHBOARD</span>
          </h1>
          <p className="text-gray-400 text-base">
            Manage your training schedule and preferences.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Scheduling Card */}
          <div className="md:col-span-2 bg-gym-gray/30 border border-white/10 rounded-3xl p-6 backdrop-blur-sm dashboard-item">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gym-accent/20 p-2 rounded-full text-gym-accent">
                <Clock size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">
                Book Your Training Slot
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <span>Between 6:00 AM - 11:00 PM</span>
                <span className="flex items-center gap-2">
                  <Calendar size={12} /> Today
                </span>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      py-2 px-1 rounded-lg text-xs font-bold transition-all duration-300 border
                      ${
                        selectedTime === time
                          ? "bg-gym-accent text-white border-gym-accent shadow-[0_0_15px_rgba(255,95,31,0.4)] scale-105"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-gym-accent/50 hover:bg-white/10"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSchedule}
                  disabled={!selectedTime}
                  className={`
                        w-full py-3 rounded-full font-bold text-lg uppercase tracking-widest transition-all duration-300
                        ${
                          selectedTime
                            ? "bg-white text-gym-black hover:bg-gray-200 cursor-pointer hover:scale-[1.02]"
                            : "bg-white/10 text-gray-500 cursor-not-allowed"
                        }
                    `}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar / Stats Placeholder */}
          <div className="space-y-4 dashboard-item">
            <div className="bg-gym-gray/30 border border-white/10 rounded-3xl p-5 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-lg">
                <Smartphone size={18} className="text-gym-accent" />
                Your Plan
              </h3>
              <div className="bg-gym-accent/10 rounded-xl p-3 border border-gym-accent/20">
                <p className="text-gym-accent font-bold text-base">
                  Premium Member
                </p>
                <p className="text-gray-400 text-xs">All Access Pass</p>
              </div>
              <div className="mt-3 space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Valid until</span>
                  <span className="text-white">Lifetime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
