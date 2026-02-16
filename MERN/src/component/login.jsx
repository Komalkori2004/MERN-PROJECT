import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/add-products");
      } else {
        navigate("/products");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("User not found");
      } else if (error.response?.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div>
        <h2>Login Form</h2>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your Email"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your Password"
            onChange={handleChange}
          />
          <br />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
