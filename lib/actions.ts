"use server";
import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function createComment(formData: FormData) {
  const name = formData.get("name") as string;
  // console.log(name);
  const message = formData.get("message") as string;
  const postId = formData.get("postId") as string;
  
  try {
    await prisma.comment.create({
      data: {
        name,
        message,
        postId: parseInt(postId),
      },
    });
    revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.error("error", error);
  }
}

//delete comments
export async function deleteComment(formData: FormData) {
  const commentId = formData.get("commentId") as string;
  const postId = formData.get("postId") as string;

  await prisma.comment.delete({
    where: {
      id: parseInt(commentId),
    },
  });
  revalidatePath(`/posts/${postId}`);
}

//edit comments
export async function editComment(formData: FormData) {
  const commentId = formData.get("commentId") as string;
  const newText = formData.get("newText") as string;
  const postId = formData.get("postId") as string;

  await prisma.comment.update({
    where: {
      id: parseInt(commentId),
    },
    data: {
      message: newText,
    },
  });
  revalidatePath(`/posts/${postId}`);
}
