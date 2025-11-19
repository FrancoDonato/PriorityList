import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import HomeUser from "./pages/HomeUser";
import { useAuth } from './context/AuthContext';
import Login from './componentes/login/Login';

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user
            ? user.role === 'admin'
              ? <Navigate to="/admin" />
              : <Navigate to="/HomeUser" />
            : <Home />
        } />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/HomeUser"
          element={
            <PrivateRoute roles={['user', 'admin']}>
              <HomeUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
