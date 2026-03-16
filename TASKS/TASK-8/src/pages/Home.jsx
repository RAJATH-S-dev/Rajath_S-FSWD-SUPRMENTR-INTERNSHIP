import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <h1>Welcome to MyBlog</h1>
      <p className="subtitle">THOUGHTS, GUIDES & TUTORIALS</p>
      <div className="divider"></div>

      <div className="card" style={{ textAlign: "center" }}>
        <p style={{
          fontSize: "0.75rem",
          letterSpacing: "2px",
          color: "#888",
          marginBottom: "12px",
        }}>
          ABOUT THIS BLOG
        </p>
        <p style={{ color: "#444", lineHeight: "1.7", marginBottom: "20px" }}>
          A simple blog built with React and React Router. Browse through articles
          on React, routing, hooks, and more. Click any post to read the full article.
        </p>
        <Link to="/blogs">
          <button>Browse All Posts</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;