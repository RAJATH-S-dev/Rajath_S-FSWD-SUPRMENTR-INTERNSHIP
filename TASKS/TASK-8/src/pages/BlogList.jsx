import { Link } from "react-router-dom";
import blogs from "../data/blogs";

function BlogList() {
  return (
    <div className="container">
      <h1>All Blogs</h1>
      <p className="subtitle">BROWSE ALL POSTS</p>
      <div className="divider"></div>

      <p className="section-title">{blogs.length} POSTS</p>

      {blogs.map((blog) => (
        <div className="card" key={blog.id} style={{ marginBottom: "14px" }}>
          <p style={{
            fontSize: "0.65rem",
            letterSpacing: "2px",
            color: "#888",
            marginBottom: "6px",
            textTransform: "uppercase",
          }}>
            {blog.category} · {blog.date}
          </p>
          <h2 style={{
            fontSize: "1.1rem",
            color: "#111",
            marginBottom: "8px",
          }}>
            {blog.title}
          </h2>
          <p style={{
            fontSize: "0.9rem",
            color: "#555",
            lineHeight: "1.6",
            marginBottom: "14px",
          }}>
            {blog.summary}
          </p>
          <p style={{
            fontSize: "0.8rem",
            color: "#888",
            marginBottom: "12px",
          }}>
            By {blog.author}
          </p>
          <Link to={`/blog/${blog.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;