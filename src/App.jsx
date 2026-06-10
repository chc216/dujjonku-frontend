import { Routes, Route } from "react-router-dom";
import Report from "@/pages/user/Report";
import DashBoard from "@/pages/user/DashBoard";
import Quiz from "@/pages/user/Quiz";
import Main from "@/pages/user/Main";
import Admin from "@/pages/user/Admin/Admin";
import AdminLogin from "@/pages/user/Admin/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/report/:id" element={<Report />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
