import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-black text-white py-16 md:py-12 border-t border-white/10"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-12 text-center md:text-left">
          {/* Brand */}
          <div className="max-w-sm mx-auto md:mx-0 text-center">
            <div className="text-2xl font-bold font-sans tracking-tighter uppercase text-white mb-6">
              Gym<span className="text-gym-accent">mers</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Elevating human performance through elite training, cutting-edge
              technology, and a community of champions.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gym-accent transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gym-accent transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gym-accent transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gym-accent transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-lg font-bold mb-6">Visit Us</h4>
            <ul className="space-y-4 text-gray-400 flex flex-col items-center">
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-gym-accent shrink-0" />
                <span>123 Elite Fitness Blvd, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-gym-accent shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-gym-accent shrink-0" />
                <span>hello@gymmers.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-center gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gymmers. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
