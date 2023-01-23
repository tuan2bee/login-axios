import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { authApi } from "@/api/index";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";

export default function Login() {
  const router = useRouter();

  async function handleLoginClick() {
    try {
      await authApi.login({
        email: email.value,
        password: password.value,
      });
      router.push("/");
    } catch (error) {
      console.log("failed to login", error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginClick();
  };

  return (
    <>
      <Head>
        <title>Sign In - XYLOO</title>
      </Head>
      <AuthLayout title="" subtitle={""}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 mb-10">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Sign in to account
          </Button>
        </form>
      </AuthLayout>
    </>
  );
}
