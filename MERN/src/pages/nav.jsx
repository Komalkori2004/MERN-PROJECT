import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import "../style/nav.css";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ShopSphere</Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        {/* <Link to="/products" className="nav-item">Products</Link> */}
      </div>

      <div className="nav-right">
        {/* Dark Mode Toggle */}
        <button className="icon-btn" onClick={toggleDark}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Cart */}
        <Link to="/cart" className="icon-btn">
          <FaShoppingCart />
        </Link>

        {/* User Dropdown */}
        <div className="user-menu">
          <FaUserCircle
            className="icon-btn"
            onClick={() => setDropdown(!dropdown)}
          />

          {dropdown && (
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar