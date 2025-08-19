"use client";

import { useState, useTransition } from "react";
import { editComment, deleteComment } from "../lib/actions";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CommentCard = ({ comment, postId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(comment.message);
  const [isPending, startTransition] = useTransition();

  const handleEdit = () => {
    setIsEditing(true);
    setIsEdited(comment.message);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsEdited(comment.message);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    startTransition(() => {
      editComment(formData);
    });

    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="commentId" value={comment.id} />
          <input type="hidden" name="postId" value={postId} />

          <textarea
            name="newText"
            value={isEdited}
            onChange={(e) => setIsEdited(e.target.value)}
            className="w-full border-gray-300 rounded-md p-3 mt-2"
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 cursor-pointer rounded-md text-sm mt-2"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-md text-sm cursor-pointer" 
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex justify-between items-baseline pt-15 pb-5 mt-2">
          <p className="text-[17px]  text-gray-800  w-35">
            {comment.name}
          </p>
          <p className="text-gray-600 text-wrap w-100">{comment.message}</p>
          <div>
            <button onClick={handleEdit}>
              <FaEdit className="text-blue-500 text-[16px] cursor-pointer hover:text-blue-700 mr-2" />
            </button>

            <form action={deleteComment} className="inline-block ml-2">
              <input type="hidden" name="commentId" value={comment.id} />
              <input type="hidden" name="postId" value={postId} />

              <button type="submit">
                <FaTrashAlt className="text-red-500 text-[16px] cursor-pointer hover:text-red-700" />{" "}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentCard;
