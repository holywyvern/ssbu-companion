import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { loginAnonymously } from "@/lib/services/auth";
import { auth } from "@/lib/firebase/config";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    loginAnonymously();
    return () => unsubscribe();
  }, []);

  const retry = () =>{
    setLoading(true);
    loginAnonymously();
  }

  return { user, loading, retry };
}