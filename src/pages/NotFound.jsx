import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found-page">
      <div className="panel not-found-panel">
        <h1>404</h1>
        <p className="page-subtitle">
          Page not found.
        </p>

        <Link
          className="btn btn-primary"
          to="/"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
