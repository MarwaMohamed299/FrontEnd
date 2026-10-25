import { useState } from "react";
import type { PostComment } from "../../types/post";

export default function TopComment({ comment }: { comment: PostComment }) {
  const [avatarFailed, setAvatarFailed] = useState(false);
  const author = comment.commentCreator;

  return (
    <section aria-label="Top comment" className="flex items-start gap-3 border-t border-slate-100 px-5 py-4 sm:px-6">
        {author.photo && !avatarFailed ? (
          <img
            src={author.photo}
            alt=""
            loading="lazy"
            onError={() => setAvatarFailed(true)}
            className="size-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            {author.name.charAt(0).toUpperCase() || "?"}
          </span>
        )}
        <div className="min-w-0 flex-1 rounded-xl bg-slate-50 px-3 py-2">
            <p className="break-words text-sm font-semibold text-slate-900">{author.name}</p>
            {comment.content && (
              <p className="mt-0.5 whitespace-pre-wrap text-sm leading-6 text-slate-600 [overflow-wrap:anywhere]">{comment.content}</p>
            )}
            {comment.image && (
                <img
                  src={comment.image}
                  alt={`Image attached to ${author.name}'s comment`}
                  loading="lazy"
                  className="mt-2 max-h-48 max-w-full rounded-lg object-contain"
                />
            )}
        </div>
    </section>
  );
}
