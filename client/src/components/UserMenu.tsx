import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  // Get user from localStorage safely
  const getUser = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  };

  const user = getUser();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Dispatch a storage event so other components can react if needed
    window.dispatchEvent(new Event("storage"));
    // Also force a reload or state update if simple navigation isn't enough to trigger re-render of Navbar
    // But usually navigate is fine if Navbar checks auth on mount/update.
    // We will ensure Navbar listens to storage/custom events or we just hard reload.
    // For SPA, it's better to having a context, but for now simple approach:
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 group cursor-default">
        <span className="text-white text-sm font-medium mr-2 hidden sm:block">
          Hello, {user?.name || "User"}
        </span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gym-accent to-gym-orange flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-transparent transition-all">
          {initials}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all border border-white/10 hover:border-red-500/30 group"
        title="Logout"
      >
        <LogOut
          size={18}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      </button>
    </div>
  );
};

export default UserMenu;
