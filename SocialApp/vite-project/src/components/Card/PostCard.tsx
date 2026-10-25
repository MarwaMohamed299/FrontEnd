import { useState } from "react";
import { HiOutlineChatBubbleOvalLeft, HiOutlineGlobeAlt, HiOutlineHeart } from "react-icons/hi2";
import type { Post } from "../../types/post";
import TopComment from "./TopComment";


export default function PostCard({ post }: { post: Post }) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const initials = post.user.name.trim().split(/\s+/).slice(0, 2).map((name) => name[0]).join("");
  const likes = post.likes?.length ?? 0;
  const comments = post.commentsCount ?? 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
      <header className="flex items-center gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        {post.user.photo && !avatarFailed ? (
          <img
            src={post.user.photo}
            alt=""
            onError={() => setAvatarFailed(true)}
            className="size-12 shrink-0 rounded-full border border-slate-100 object-cover"
          />
        ) : (
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600" aria-hidden="true">
            {initials || "?"}
          </span>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">{post.user.name}</h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
           <span className="text-grey-600" >{new Date(post.createdAt).toLocaleDateString('en-us',{
            year:'numeric',
            month:'short',
            day:'numeric'
           })}</span>
            <span aria-hidden="true">·</span>
            <HiOutlineGlobeAlt className="size-3.5" aria-hidden="true" />
            <span>Public</span>
          </div>
        </div>
      </header>

      {post.body && (
        <p className="whitespace-pre-wrap break-words px-5 pt-4 text-[15px] leading-7 text-slate-700 sm:px-6">
          {post.body}
        </p>
      )}

      {post.image && (
        <div className="mx-5 mt-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:mx-6">
          {imageFailed ? (
            <p className="px-4 py-12 text-center text-sm text-slate-500">Image unavailable</p>
          ) : (
            <img
              src={post.image}
              alt={`Photo shared by ${post.user.name}`}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="max-h-[560px] w-full object-contain"
            />
          )}
        </div>
      )}

      <footer className="mx-5 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 py-4 text-xs font-medium text-slate-500 sm:mx-6 sm:text-sm">
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-rose-50 p-1.5 text-rose-500"><HiOutlineHeart className="size-4" aria-hidden="true" /></span>
          {likes.toLocaleString()} {likes === 1 ? "like" : "likes"}
        </span>
        <span className="flex items-center gap-2">
          <HiOutlineChatBubbleOvalLeft className="size-4" aria-hidden="true" />
          {comments.toLocaleString()} {comments === 1 ? "comment" : "comments"}
        </span>
      </footer>
      {post.topComment && <TopComment key={post.topComment._id} comment={post.topComment} />}
    </article>
  );
}
