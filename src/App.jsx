import React from "react";
import { Link } from "react-router-dom";

const App = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
    <h1 className="text-4xl font-bold">Social Media Analytics</h1>
    <nav className="space-x-4">
      <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/top-users">Top Users</Link>
      <Link className="bg-green-500 text-white px-4 py-2 rounded" to="/trending-posts">Trending Posts</Link>
      <Link className="bg-purple-500 text-white px-4 py-2 rounded" to="/feed">Feed</Link>
    </nav>
  </div>
);

export default App;
