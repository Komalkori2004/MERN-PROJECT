import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProducts] = useState(null);
const navigate=useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then((res) => setProducts(res.data));
  }, [slug]);
  if (!product) return <p>Loading....</p>;




  // to add product in cart
  const addToCart = async () => {

    const token=localStorage.getItem("token")
    if(!token){
      navigate("/login",{state:{from:`/products/${slug}`}})
      return
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Product added to cart 🛒");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "50px",
          padding: "40px",
        }}
      >
        {/* LEFT SIDE IMAGE */}
        <div>
          <img
            src={`${import.meta.env.VITE_API_URL}/${product.thumbnail}`}
            width="400"
            style={{ borderRadius: "10px" }}
          />
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div style={{ maxWidth: "500px" }}>
          <h1>{product.title}</h1>

          <p style={{ color: "gray" }}>{product.description}</p>

          <hr />

          {/* PRICE SECTION */}
          <div>
            <h2 style={{ color: "#B12704" }}>₹{product.finalPrice}</h2>

            {product.discountPercentage > 0 && (
              <>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  ₹{product.price}
                </span>

                <span
                  style={{
                    color: "green",
                    marginLeft: "10px",
                  }}
                >
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <p style={{ marginTop: "15px" }}>Stock: {product.countInStock}</p>

          {/* BUTTONS */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={addToCart}
                disabled={product.countInStock === 0}
              style={{
                padding: "10px 20px",
                background: "#FFD814",
                border: "none",
                marginRight: "10px",
              }}
            >
              {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              style={{
                padding: "10px 20px",
                background: "#FFA41C",
                border: "none",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
