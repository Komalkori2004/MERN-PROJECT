import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h2>User Dashboard</h2>
      {data && <p>{data.message}</p>}
    </div>
  );
}
