import CommentForm from "../../../components/CommentForm";
import prisma from "../../../lib/db";
import CommentCard from "../../../components/commentCard";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const postId = params.id;

  const res = await fetch(`https://dummyjson.com/posts/${postId}`);
  const post = await res.json();

  if(!post || !post.id){
    notFound();
  }
  const comments = await prisma.comment.findMany({
    where: {
      postId: parseInt(postId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className=" min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
        <div className="pt-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight text-center mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-gray-700 mx-auto prose max-w-none">
            {post.body}
          </p>
        </div>
        
        <div className="mt-30 ">
          <CommentForm postId={postId} />
        </div>
        <div className="space-y-4 bg-white p-8 rounded-lg shadow-lg mt-20">
          <h2 className="mt-10 text-[18px] text-gray-800 text-left mb-6 ">
            Comments
          </h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} postId={postId} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No comments yet. Be the first to leave one!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
