import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discountPercentage: "",
    countInStock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Categories
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 Frontend Validation
    if (!form.title || !form.brand || !form.category) {
      alert("Please fill all required fields and select category");
      return;
    }

    if (!image) {
      alert("Please upload product image");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("thumbnail", image);

      console.log("Category sending:", form.category);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added Successfully 🎉");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
        required
      />
      <br />

      {/* ✅ Category Dropdown */}
      <select
        name="category"
        onChange={handleChange}
        value={form.category}
        required
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />

      <input
        name="price"
        placeholder="Price"
        type="number"
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="discountPercentage"
        placeholder="Discount"
        type="number"
        onChange={handleChange}
      />
      <br />

      <input
        name="countInStock"
        placeholder="Stock"
        type="number"
        onChange={handleChange}
        required
      />
      <br />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <br />

      <button disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;