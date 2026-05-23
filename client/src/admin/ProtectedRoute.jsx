import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingSpinner fullPage message="Checking authentication..." />;
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
}
