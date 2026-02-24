import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Patient from "./pages/Patient";
import Doctor from "./pages/Doctor";
import Admin from "./pages/Admin";
import BookAppointmentPage from "./components/BookAppointment";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import ThreeBackground from "./components/ThreeBackground";

// 🔐 Protected Route
const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
};

// 🌌 Reusable Auth Layout
const AuthLayout = ({ children }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white bg-gradient-to-br from-[#020617] via-[#020617] to-[#0a1a2f]">
    <ThreeBackground />
    {children}
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />

          <Route
            path="/register"
            element={
              <AuthLayout>
                <RegisterForm />
              </AuthLayout>
            }
          />

          {/* 🔐 Protected Routes */}
          <Route
            path="/patient"
            element={
              <PrivateRoute role="ROLE_PATIENT">
                <Patient />
              </PrivateRoute>
            }
          />

          <Route
            path="/doctor"
            element={
              <PrivateRoute role="ROLE_DOCTOR">
                <Doctor />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/book-appointment/:patientId/:doctorId"
            element={<BookAppointmentPage />}
          />

          {/* 🌍 Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
