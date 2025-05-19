import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/registerPage";
import ChatPage from "./pages/chatPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

