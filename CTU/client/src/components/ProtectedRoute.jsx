import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * RequireAuth — Requires sign-in (Customer tier or higher).
 * If not authenticated, redirects to /login and saves destination path.
 */
export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

/**
 * RedirectIfLoggedIn — If already authenticated, redirect away from guest pages.
 */
export function RedirectIfLoggedIn({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.isAdmin ? '/admin' : '/'} replace />;
  }

  return children;
}
