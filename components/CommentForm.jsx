import React from "react";
import {createComment} from "../lib/actions";

const CommentForm = ({ postId }) => {
  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md max-w-[700px] mx-auto">
      <p className="text-2xl font-bold text-gray-800 mb-6">Leave a Comment</p>

      <form action={createComment} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Comment"
          className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          required
        />
        <input type="hidden" name="postId" value={postId} />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
