import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/product.css";
;
import Sidebar from "../pages/sidebar";


const Products = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/products?keyword=${search}&category=${category}`,
        )
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [search, category]);

  // fetch category
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
      <div className="products-page">
      {/* <Hero /> */}

      {/* Search + Filter Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search premium products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="filter-btn"
          onClick={() => setShowSidebar(true)}
        >
          Filters
        </button>
      </div>

      <h2 className="section-title">New Arrivals</h2>

      {loading && <p className="loading">Loading...</p>}

      {!loading && products.length === 0 ? (
        <p className="empty">No products found 😔</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card fade-up">
              <img
                src={`${import.meta.env.VITE_API_URL}/${p.thumbnail}`}
                alt={p.title}
              />
              <h3>
                <Link to={`/products/${p.slug}`}>{p.title}</Link>
              </h3>
              <p className="price">₹{p.finalPrice}</p>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 Sidebar Drawer */}
      {showSidebar && (
        <Sidebar
          categories={categories}
          category={category}
          setCategory={setCategory}
          closeSidebar={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Products;
