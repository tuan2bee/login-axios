import { useRouter } from "next/router";
import * as React from "react";
import { authApi } from "@/api/index";

export default function LoginPage() {
  async function handleLoginClick() {
    try {
      await authApi.login({
        email: "nilson@email.com",
        password: "nilson",
      });
    } catch (error) {
      console.log("failed to login", error);
    }
  }

  async function handleGetProfileClick() {
    try {
      const data = await authApi.getProfile();
      console.log(data);
    } catch (error) {
      console.log("failed to login", error);
    }
  }

  async function handleLogoutClick() {}

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
