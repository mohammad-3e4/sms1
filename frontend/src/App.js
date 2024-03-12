import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./BaseFiles/Layout";
import AdminDashboard from "./DashBoard/AdminDashboard/AdminDashboard";
import NotFound from "../src/pages/NotFound";
import AdminLogin from "../src/pages/AdminLogin";
import ForgotPassword from "../src/pages/ForgotPassword";
import ResetPassword from "../src/pages/ResetPassword";
import AddStudent from "../src/Component/student/AddStudent";
import AddStaff from "./Component/staff/AddStaff";
import AllStudents from "./Component/student/AllStudents";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route path="/" element={<AdminLogin />} />
        <Route
          path="/student/create"
          element={
            <Layout>
              <AddStudent />
            </Layout>
          }
        />
        <Route
          path="/staff/create"
          element={
            <Layout>
              <AddStaff />
            </Layout>
          }
        />
        <Route
          path="/all/students"
          element={
            <Layout>
              <AllStudents/>
            </Layout>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
