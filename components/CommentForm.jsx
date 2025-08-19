"use client";

import React from "react";
import { createComment, signInAction } from "../lib/actions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function CommentForm({ postId }) {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (status !== "authenticated") {
    return (
      <div className="flex justify-center items-baseline m-auto gap-6">
        <p className="text-[17px]  text-gray-800 mb-6">
          Login to leave a comment
        </p>
        <button
          type="submit"
          className=" w-[100px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-1.5 rounded-md transition-colors duration-300 "
        >
          <Link href="/login">Login</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md w-full mx-auto mb-20">
      <p className="text-2xl font-bold text-gray-800 mb-3">Leave a Comment</p>

      <form action={createComment} className="flex flex-col gap-4">
        {/* {session?.user?.id && (
          <input type="hidden" name="userId" value={session.user.id} />
        )} */}
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        /> */}
        <textarea
          name="message"
          placeholder="Comment"
          className="w-full border-gray-500 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
          required
        />
        <input type="hidden" name="postId" value={postId} />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}
