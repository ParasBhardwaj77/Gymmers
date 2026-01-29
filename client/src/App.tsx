import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
    <Router>
      <div className="bg-gym-black min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
