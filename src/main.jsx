import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/top-users" element={<TopUsers />}/>
        <Route path="/trending-posts" element={<TrendingPosts />}/>
        <Route path="/feed" element={<Feed />}/>
      </Routes>
    </BrowserRouter>
);