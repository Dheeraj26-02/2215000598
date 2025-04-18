import axios from "axios";

const BASE_URL = "http://20.244.56.144/eva1uation-service";

export const getUsers = () => axios.get(`${BASE_URL}/users`).then(res => res.data.users);

export const getUserPosts = (userId) =>
  axios.get(`${BASE_URL}/users/${userId}/posts`).then(res => res.data.posts);

export const getPostComments = (postId) =>
  axios.get(`${BASE_URL}/posts/${postId}/comments`).then(res => res.data.comments);

