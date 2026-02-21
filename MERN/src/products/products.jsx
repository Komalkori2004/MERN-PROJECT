import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => setProduct(res.data));
  }, []);


  const handleSearch=()=>{
      console.log("Searching:", search)
    axios.get(`${import.meta.env.VITE_API_URL}/api/products?keyword=${search}`)
    .then((res)=> {console.log("Response:", res.data)
      setProduct(res.data)})
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {products.map((p) => (
          <div key={p._id}>
            <img
              src={`${import.meta.env.VITE_API_URL}/${p.thumbnail}`}
              width="150"
            />
            <h3>
              <Link to={`/products/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>₹{p.finalPrice}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
