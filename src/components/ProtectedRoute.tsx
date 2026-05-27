import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

type Props = { children: ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const { state } = useAuth();
  return state.isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
