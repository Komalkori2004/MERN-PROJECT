import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/products?keyword=${search}`
        )
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));

    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="products-page">

      {/* Hero Section */}
      <div className="hero">
        <h1>Discover Amazing Products</h1>
        <p>Find the best deals at Komal Store</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && <p className="loading">Loading...</p>}

      {/* Products */}
      {!loading && products.length === 0 ? (
        <p className="empty">No products found 😔</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              <img
                src={`${import.meta.env.VITE_API_URL}/${p.thumbnail}`}
                alt={p.title}
              />

              <h3>
                <Link to={`/products/${p.slug}`}>
                  {p.title}
                </Link>
              </h3>

              <p className="price">₹{p.finalPrice}</p>

              <Link to={`/products/${p.slug}`}>
                <button className="details-btn">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Products;