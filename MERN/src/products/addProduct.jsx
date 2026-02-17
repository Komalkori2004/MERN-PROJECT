import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("thumbnail", image);
    await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Product Added");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <input name="title" placeholder="Title" onChange={handleChange} /><br/>
        <input name="brand" placeholder="Brand" onChange={handleChange} /><br/>
        <input name="category" placeholder="Category" onChange={handleChange} /><br/>
        <input name="price" placeholder="Price" type="number" onChange={handleChange} /><br/>
        <input
          name="discountPercentage"
          placeholder="Discount"
          type="number"
          onChange={handleChange}
        /><br/>
        <input
          name="countInStock"
          placeholder="Stock"
          type="number"
          onChange={handleChange}
        /><br/>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        /><br/>

        <input type="file" onChange={(e) => setImage(e.target.files[0])} /><br/>

        <button>Add Product</button>
      </form>
    </>
  );
};
export default AddProduct;
