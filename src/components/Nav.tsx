import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <ul className="nav">
        <Link to="/" className="nav-item nav-link">
          <li>Home</li>
        </Link>
        <Link to="/SavedCandidates" className="nav-item nav-link">
          <li>Saved Candidates</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
