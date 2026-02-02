import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gym-black flex items-center justify-center p-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-500">
            <XCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment Cancelled
          </h2>
          <p className="text-gray-300 mb-6">
            You have cancelled the payment process. No charges were made.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gym-accent hover:bg-gym-orange text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
