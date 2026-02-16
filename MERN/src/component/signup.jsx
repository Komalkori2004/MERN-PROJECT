import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setform] = useState({
    name: "",
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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);
      alert("Signup successful");

      console.log(res.data);
          navigate("/login"); 
    } catch (error) {
      alert("Signup failed");
      console.log(error);
    }


  };

    

  return (
    <>
      <div>
        <h1>Sigup Form</h1>

        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          /><br/>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={handleChange}
                 required
          /><br/>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter your password"
            onChange={handleChange}
                 required
          /><br/>
         

          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
