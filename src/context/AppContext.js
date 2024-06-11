import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

  // Fetch Blog Data
  const fetchBlogPosts = async (page = 1, tag = null, category = null) => {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (category) {
      url += `&category=${category}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.posts || data.posts.length === 0) {
        throw new Error("No posts found");
      }

      console.log("API Response", data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in fetching blog posts:", error.message);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // Handle When Next and Previous button are clicked
  const handlePageChange = (page) => {
    setPage(page);
    console.log(page);
    navigate({ search: `?page=${page}` });
    fetchBlogPosts(page);
  };

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
