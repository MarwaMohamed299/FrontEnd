import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom'

export default function ProtetedRoutes({ children }: { children: ReactNode }) {
  let token = localStorage.getItem('token')
  
  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" />;
}
