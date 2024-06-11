import React, { useContext, useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom"; // Corrected imports
import { AppContext } from "../context/AppContext";
import { baseUrl } from "../baseUrl";
import Pagination from "../components/Pagination";
import Blogs from "../components/Blogs";

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedblogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Corrected useNavigation to useNavigate
  const { loading, setLoading } = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}?blogId=${blogId}`;

    try {
      const res = await fetch(url);
      const data = await res.json(); //converted my response into the json format

      setBlog(data.blog);
      setRelatedBlogs(data.relatedblogs);
    } catch (error) {
      console.log("Error in fetching the data");
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div>
        <button onClick={() => navigate(-1)}>Back</button>{" "}
        {/* Corrected navigation to navigate */}
      </div>
      {loading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : blog ? (
        <div>
          <BlogDetails post={blog} />
          <h2>Related Blogs</h2>

          {/* all blogs are mapped inside the  */}
          {relatedblogs.map((post) => (
            <div key={post.id}>
              <BlogDetails post={post} /> {/* Corrected blog to post */}
            </div>
          ))}
        </div>
      ) : (
        <div>No Blog Found</div>
      )}
      <Blogs />
      <Pagination />
    </div>
  );
};

export default BlogPage;
