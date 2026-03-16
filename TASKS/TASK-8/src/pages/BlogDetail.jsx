import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs";

function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="container">
        <h1>Post Not Found</h1>
        <p className="subtitle">THIS POST DOES NOT EXIST</p>
        <div className="divider"></div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ color: "#b94040", marginBottom: "16px" }}>
            No blog post found with that ID.
          </p>
          <Link to="/blogs"><button>Back to Blogs</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <p className="subtitle">{blog.category.toUpperCase()}</p>
      <div className="divider"></div>

      <div className="card">
        <p style={{
          fontSize: "0.75rem",
          letterSpacing: "2px",
          color: "#888",
          marginBottom: "16px",
        }}>
          By {blog.author} · {blog.date}
        </p>

        <div style={{
          borderTop: "1px solid #ccc",
          marginBottom: "16px",
        }}></div>

        <p style={{
          fontSize: "0.95rem",
          color: "#333",
          lineHeight: "1.8",
          marginBottom: "24px",
        }}>
          {blog.content}
        </p>

        <Link to="/blogs"><button>← Back to Blogs</button></Link>
      </div>
    </div>
  );
}

export default BlogDetail;