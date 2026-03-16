import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <p className="subtitle">PAGE NOT FOUND</p>
      <div className="divider"></div>

      <div className="card" style={{ textAlign: "center" }}>
        <p style={{
          color: "#555",
          marginBottom: "20px",
          lineHeight: "1.7",
        }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/"><button>Go Home</button></Link>
      </div>
    </div>
  );
}

export default NotFound;