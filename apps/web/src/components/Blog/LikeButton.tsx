"use client";

import { useState } from "react";

export function LikeButton({ postId, initialLikes }: { postId: number; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);

  async function handleClick() {
  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },  // 👈 add this
    body: JSON.stringify({ postId }),
  });
  
  if (!res.ok) return;  
  
  const data = await res.json();
  setLikes(data.likes);
}

return (
  <button
    data-testid="like-button"
    onClick={handleClick}
    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-500 rounded-full transition font-medium"
  >
    ❤️ {likes} Likes
  </button>
);
}