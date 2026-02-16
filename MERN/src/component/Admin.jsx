import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        await axios.get(
          "http://localhost:5000/api/auth/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      } catch (error) {

        if (error.response?.status === 403) {
          alert("Admin only");
        }

        navigate("/login");
      }
    };

    fetchAdmin();

  }, []);

return (
  <>
    <h2>Admin Dashboard</h2>
  </>
);
}
