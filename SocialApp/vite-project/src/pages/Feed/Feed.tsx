import { useContext, useEffect, useState } from "react";
import PostCard from "../../components/Card/PostCard";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import type { Post, PostsResponse } from "../../types/post";

export default function Feed() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!token) return;

    async function getAllPosts() {
      try {
        const { data } = await axios.get<PostsResponse>(
          "https://route-posts.routemisr.com/posts",
          {
            headers: { token },
          },
        );
        setPosts(data.data.posts);
      } catch (error) {
        console.error("Failed to load posts", error);
      }
    }

    getAllPosts();
  }, [token]);
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-600">Your community</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Latest posts</h1>
          <p className="mt-2 text-sm text-slate-500">A little inspiration, a few updates, and everything in between.</p>
        </div>
        <div className="space-y-5">
          {posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
