import Link from "next/link";

export default async function FetchPosts() {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch("https://dummyjson.com/posts?limit=12");
  const data = await res.json();

  return (
     <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 pb-9">
      {data.posts.map((post) => (
        <li key={post.id} className="bg-white p-10 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <Link href={`/posts/${post.id}`} className="text-xl font-semibold text-blue-950 hover:text-blue-400">
            {post.title}
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            Tags: {post.tags.join(", ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
