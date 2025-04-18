import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "../services/api";

const TrendingPosts = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      const allPosts = [];

      await Promise.all(
        Object.keys(users).map(async (userId) => {
          const posts = await getUserPosts(userId);
          allPosts.push(...posts);
        })
      );

      const commentMap = [];
      await Promise.all(
        allPosts.map(async (post) => {
          const comments = await getPostComments(post.id);
          commentMap.push({ post, count: comments.length });
        })
      );

      const maxCount = Math.max(...commentMap.map(e => e.count));
      const topPosts = commentMap.filter(e => e.count === maxCount);

      setTrending(topPosts);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Posts</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {trending.map(({ post, count }) => (
            <li key={post.id} className="p-4 border rounded shadow">
              <p className="font-semibold">Post ID: {post.id}</p>
              <p>{post.content}</p>
              <p>{count} comments</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingPosts;