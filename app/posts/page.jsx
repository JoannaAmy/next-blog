import { Suspense } from 'react';
import FetchPosts from '../../lib/FetchPosts'

export default async function Posts() {

  

  return (
    <main className="text-center pt-15 px-7">
      <p className="text-3xl md:text-4xl font-bold mb-5">All posts</p>
     
     <Suspense fallback='LOADING...'>
      <FetchPosts />
     </Suspense>
    </main>
  );
}
