import { Link } from "react-router-dom";
import "../style/nav.css"

function Nav() {
  return (
    <nav className="navbar">
      <h2 className="logo">Komal Store</h2>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </div>
    </nav>
  );
}

export default Nav;