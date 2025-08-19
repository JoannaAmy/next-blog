"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { signInAction } from "../../lib/actions";
import Link from "next/link";

export default function LoginPage() {
  const { update, status } = useSession();
  const redirectTo = "/";
  const router = useRouter();

  const [signInLoading, setSignInLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>({
    text: "",
    type: "error",
  });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-2xl" />
      </div>
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ text: "", type: "error" });
    setSignInLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signInAction(formData);

      if (result?.success) {
        setMessage({
          text: result.message ?? "Login successful!",
          type: "success",
        });

        await update();
        router.push(redirectTo);
      } else {
        setMessage({ text: result?.error ?? "Login failed", type: "error" });
      }
    } catch (err) {
      console.error("Login error", err);
      setMessage({ text: "An unexpected error occurred", type: "error" });
    } finally {
      setSignInLoading(false);
    }
  };
  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
        <div className="flex flex-col items-center w-[400px] max-w-full gap-4">
          <h2 className="text-2xl font-bold">Login</h2>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={signInLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md flex items-center justify-center cursor-pointer"
            >
              {signInLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Sign In"
              )}
            </button>

            {message.text && (
              <p
                className={`text-center ${
                  message.type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>

          <div className="w-full text-center">
            <p className="my-2">OR</p>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 mt-2.5 cursor-pointer"
            >
              {googleLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Login with Google"
              )}
            </button>
          </div>
          <p>
            Do not have an account yet?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 cursor-pointer hover:text-blue-700 underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
        {/* )} */}
      </div>
    </>
  );
}
