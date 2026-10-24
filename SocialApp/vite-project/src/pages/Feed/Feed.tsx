import { useContext, useEffect, useState } from "react";
import SideBar from "../../components/LayOut/SideBar/SideBar";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import type { Post, PostsResponse } from "../../types/post";

export default function Feed() {

  const {token} = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!token) return;

    async function getAllPosts() {
      try {
        const { data } = await axios.get<PostsResponse>('https://route-posts.routemisr.com/posts', {
          headers: { token },
        });
        setPosts(data.data.posts);
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    }

    getAllPosts();
  }, [token]);
  return (
    <div className="container mx-auto mt-3">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 left-ide">
          <SideBar />
        </div>
        <div className="col-span-6 left-ide">
          <p>{posts.length} posts</p>
          {posts.map((item) => (
            <p key={item._id}>{item.body}</p>
          ))}
        </div>
        <div className="col-span-3  left-ide">
          friends
        </div>
      </div>
    </div>
  );
}
