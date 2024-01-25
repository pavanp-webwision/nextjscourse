"use client";
import React from "react";
import LoginForm from "../../ui/login-form";
import { useRouter } from "next/navigation";
import { handleLogin } from "../../../services/authService";
import { useAuth } from "@/contexts/AuthContext.tsx";

export default function Login() {
  const router = useRouter();

  const { login } = useAuth()
  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    const error = await login(email, password)

    console.log('login error', error)

    // if (success) {
    //   router.push("/dashboard");
    // } else {
    //   // Login failed, handle the error or show an error message
    //   console.error("Login failed:", error);
    // }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
