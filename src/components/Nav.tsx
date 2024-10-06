import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages

  const currentPage = useLocation().pathname;

  return (
    <nav className="nav">
      <ul className="nav">
        <Link
          to="/"
          className={currentPage === "/" ? "nav-link active" : "nav-link"}
        >
          <li className="nav-item">Home</li>
        </Link>
        <Link
          to="/SavedCandidates"
          className={
            currentPage === "/SavedCandidates" ? "nav-link active" : "nav-link"
          }
        >
          <li className="nav-item">Saved Candidates</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
