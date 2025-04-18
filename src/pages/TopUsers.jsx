import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "../services/api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      const userComments = [];

      await Promise.all(
        Object.entries(users).map(async ([id, name]) => {
          const posts = await getUserPosts(id);
          let commentCount = 0;

          await Promise.all(
            posts.map(async (post) => {
              const comments = await getPostComments(post.id);
              commentCount += comments.length;
            })
          );

          userComments.push({ id, name, commentCount });
        })
      );

      const sorted = userComments.sort((a, b) => b.commentCount - a.commentCount).slice(0, 5);
      setTopUsers(sorted);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Users by Comments</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {topUsers.map((user, i) => (
            <li key={i} className="p-4 border rounded shadow">
              <p className="font-semibold">{user.name}</p>
              <p>{user.commentCount} comments on posts</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopUsers;