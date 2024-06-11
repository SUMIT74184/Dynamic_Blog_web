import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import BlogPage from "./pages/TagPage";
import CategroyPage from "./pages/Home";
import TagPage from "./pages/CategoryPage";
import Home from "./pages/BlogPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    // if anyother tag is present than the tags are moved to that location
    if (location.pathname.includes("tags")) {
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag);
    } else if (location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category);
    } else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:blogId" element={<BlogPage />} />
      <Route path="/tags/:tag" element={<TagPage />} />
      <Route path="/categories/:category" element={<CategroyPage />} />
    </Routes>
  );
}
