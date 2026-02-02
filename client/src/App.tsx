import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import PaymentCancelPage from "./components/PaymentCancelPage";
import Dashboard from "./components/Dashboard";
import AIBeta from "./components/AIBeta";

function App() {
  return (
    <Router>
      <div className="bg-gym-black min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/cancel" element={<PaymentCancelPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-beta" element={<AIBeta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
