import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card fade-up">
      <img
        src={`${import.meta.env.VITE_API_URL}/${product.thumbnail}`}
        alt={product.title}
      />

      <h3>
        <Link to={`/products/${product.slug}`}>{product.title}</Link>
      </h3>

      <p className="price">₹{product.finalPrice}</p>
    </div>
  );
};

export default ProductCard;