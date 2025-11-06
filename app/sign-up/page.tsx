"use client";

import React from "react";
import { useState } from "react";
import { signUpAction } from "../../lib/actions";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

export default function SignUpPage() {
  const { update } = useSession();
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>({ text: "", type: "error" });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMessage({ text: "", type: "error" });
    setSignUpLoading(true);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const result = await signUpAction(formData);

    if (result.error) {
      setMessage({ text: result.error, type: "error" });
      setSignUpLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signInResult?.error) {
      setMessage({ text: String(signInResult.error), type: "error" });
      setSignUpLoading(false);
      return;
    }

    await update();
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center ">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form
        className="flex flex-col gap-y-6 w-[400px] max-w-[900px]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600  hover:bg-blue-700 items-center text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 cursor-pointer"
          disabled={signUpLoading}
        >
          {signUpLoading ? (
            <>
              <FaSpinner className="animate-spin text-center " />
            </>
          ) : (
            "Sign up"
          )}
        </button>
        {message.text && (
          <p
            className={`${
              message.type === "success" ? "text-green-500" : "text-red-500"
            } text-wrap text-center`}
          >
            {" "}
            {message.text}
          </p>
        )}
      </form>

      <div className="mt-4 w-[400px] max-w-[900px] text-center justify-center">
        <p>OR</p>
        <button
          type="button"
          disabled={googleLoading}
          onClick={() => {
            setGoogleLoading(true);
            signIn("google", { callbackUrl: "/" });
          }}
          className="w-full bg-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 mt-2.5 cursor-pointer "
        >
          {googleLoading ? (
            <>
              <span>
                Signing Up with Google
                <FaSpinner className="animate-spin" />{" "}
              </span>
            </>
          ) : (
            "Continue with Google"
          )}
        </button>
      </div>
      <p className="mt-2">
        Have an account already?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-700 underline cursor-pointer"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
