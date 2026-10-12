import { useContext } from "react";
import { AuthContext } from "@/components/auth-provider";

export default function useUser() {
  return useContext(AuthContext);
}