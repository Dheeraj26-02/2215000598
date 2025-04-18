import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts } from "../services/api";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const users = await getUsers();
    const newPosts = [];
    await Promise.all(
      Object.keys(users).map(async (userId) => {
        const userPosts = await getUserPosts(userId);
        userPosts.forEach(post => newPosts.push(post));
      })
    );
    newPosts.sort((a, b) => b.id - a.id); // assuming higher ID means newer
    setPosts(newPosts);
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Live Feed</h2>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.id} className="p-4 border rounded shadow">
            <p className="font-semibold">User ID: {post.userid}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
