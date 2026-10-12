"use client";
import { ReactNode, createContext } from "react";
import { User } from "firebase/auth";

import useAuth from "@/lib/hooks/useAuth";
import Loading from "@/components/preload/loading";
import UserError from "@/components/preload/user-error";

export const AuthContext = createContext<User>(null!);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, retry } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <UserError onRetry={retry} />;
  }
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
