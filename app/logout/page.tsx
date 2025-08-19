"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function LogoutPage() {
  const { data: session, status } = useSession();
  // const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [message, setMessage] = useState<{
      text: string,
      type: "success" | "error",
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

  const handleSignOut = async () => {
    setMessage({ text: "", type: "error" });
    setLogoutLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: "/login" });
    } catch (err) {
      console.error("Sign out failed", err);
      setMessage({ text: "Sign out failed", type: "error" });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
        {status === "authenticated" && (
          <div className="flex flex-col items-center w-[400px] max-w-full gap-4">
            <h1 className="text-2xl font-bold">
              Hello {session.user?.name ?? session.user?.email}
            </h1>

            <button
              onClick={handleSignOut}
              disabled={logoutLoading}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center cursor-pointer"
            >
              {logoutLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Log Out"
              )}
            </button>

            {message.text && (
              <p
                className={`mt-2 ${
                  message.type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
