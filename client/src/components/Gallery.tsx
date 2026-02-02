import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Instagram } from "lucide-react";

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images = gridRef.current?.children;
    if (images) {
      gsap.fromTo(
        images,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gym-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-gym-accent font-bold tracking-wider uppercase text-sm mb-2">
              Inside Gymmers
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white">
              Forged In <span className="text-gray-500">Iron</span>
            </h3>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-white hover:text-gym-accent transition-colors mt-4 md:mt-0"
          >
            <Instagram size={20} />
            <span>@GymmersOfficial</span>
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-[500px]"
        >
          {/* Large Item */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl">
            <img
              src="/gallery1.png"
              alt="Training"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-bold text-xl">Personal Training</p>
            </div>
          </div>

          {/* Small Item 1 */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/gallery2.png"
              alt="Yoga"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-semibold">Yoga Studio</p>
            </div>
          </div>

          {/* Small Item 2 */}
          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/gallery3.png"
              alt="Weights"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-semibold">Free Weights</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-white hover:text-gym-accent transition-colors"
          >
            <Instagram size={20} />
            <span>@GymmersOfficial</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
