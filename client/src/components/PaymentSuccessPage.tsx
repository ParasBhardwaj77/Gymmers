import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { CheckCircle, Loader } from "lucide-react";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setError("Invalid session ID");
        setLoading(false);
        return;
      }

      try {
        const response = await api.post("/payment/verify-payment", {
          session_id: sessionId,
        });

        if (response.data.success) {
          // Update local user data
          const userStr = localStorage.getItem("user");
          if (userStr) {
            const user = JSON.parse(userStr);
            user.premium = true;
            localStorage.setItem("user", JSON.stringify(user));
            // Dispatch storage event to update Navbar immediately
            window.dispatchEvent(new Event("storage"));
          }

          setTimeout(() => {
            navigate("/");
          }, 3000); // Redirect after 3 seconds
        } else {
          setError("Payment verification failed.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center p-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-sm">
        {loading ? (
          <div className="flex flex-col items-center">
            <Loader className="animate-spin text-gym-accent mb-4" size={48} />
            <h2 className="text-xl font-bold text-white">
              Verifying Payment...
            </h2>
            <p className="text-gray-400 mt-2">
              Please wait while we confirm your subscription.
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-500">
              <span className="text-3xl font-bold">!</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Payment Error</h2>
            <p className="text-red-400 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full transition-colors"
            >
              Return Home
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500 animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-300 mb-6">
              Welcome to Gymmers Premium! Your account has been upgraded.
            </p>
            <p className="text-sm text-gray-500">Redirecting to home...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
