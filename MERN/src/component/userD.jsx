import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHeart, FaBox, FaSignOutAlt } from "react-icons/fa";

export default function UserDashboard() {

const [data, setData] = useState(null);
const navigate = useNavigate();

useEffect(() => {
const fetchProfile = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setData(res.data);

  } catch (error) {
    navigate("/login");
  }
};

fetchProfile();


}, []);

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("role");
navigate("/login");
};

return (

<div className="container-fluid">
  <div className="row">

    {/* Sidebar */}

    <div className="col-md-2 bg-dark text-white min-vh-100 p-4">

      <h4 className="mb-4">User Panel</h4>

      <ul className="list-unstyled">

        <li className="mb-3">
          <FaUser className="me-2" />
          Profile
        </li>

        <li className="mb-3">
          <FaShoppingCart className="me-2" />
          Orders
        </li>

        <li className="mb-3">
          <FaHeart className="me-2" />
          Wishlist
        </li>

        <li className="mb-3">
          <FaBox className="me-2" />
          Products
        </li>

        <li className="mt-4 text-danger" onClick={handleLogout} style={{cursor:"pointer"}}>
          <FaSignOutAlt className="me-2"/>
          Logout
        </li>

      </ul>

    </div>


    {/* Main Content */}

    <div className="col-md-10 p-5">

      <h2 className="mb-4">Dashboard</h2>

      {data && (
        <div className="alert alert-success">
          Welcome {data.user?.name || "User"} 👋
        </div>
      )}

      <div className="row g-4 mt-3">

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <FaShoppingCart size={28} />
            <h5 className="mt-3">My Orders</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <FaHeart size={28} />
            <h5 className="mt-3">Wishlist</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <FaBox size={28} />
            <h5 className="mt-3">Products</h5>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <FaUser size={28} />
            <h5 className="mt-3">Profile</h5>
          </div>
        </div>

      </div>

    </div>

  </div>
</div>


);
}
