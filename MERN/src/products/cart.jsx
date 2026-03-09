import { useEffect, useState } from "react";
import axios from "axios";
import "../style/cart.css";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    FetchCart();
  }, []);

  // get cart
  const FetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data || { items: [] });
    } catch (error) {
      console.log("error", error);
    }
  };

  // ✅ safe total calculation
  const totalPrice = cart.items.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.finalPrice * item.quantity;
  }, 0);

  const shipping = totalPrice > 1000 ? 0 : 100;
  const grandTotal = totalPrice + shipping;

  // update quantity
  const updateQty = async (productId, quantity) => {
    if (quantity < 1) {
      await Remove(productId);
      return;
    }

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/cart/update`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    FetchCart();
  };

  // remove item
  const Remove = async (productId) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    FetchCart();
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart 🛒</h1>

      {cart.items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Your Cart is Empty</h2>
          <p>Add products to continue shopping</p>
        </div>
      ) : (
        <>
          {/* ✅ filter null products */}
          {cart.items
            .filter((item) => item.product)
            .map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${item.product?.thumbnail}`}
                  alt={item.product?.title}
                />

                <div className="cart-details">
                  <h3>{item.product?.title}</h3>
                  <p>Price: ₹{item.product?.finalPrice}</p>

                  <p>
                    Subtotal: ₹
                    {(item.product?.finalPrice || 0) * item.quantity}
                  </p>

                  <div className="qty-box">
                    <button
                      onClick={() =>
                        updateQty(item.product._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQty(item.product._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => Remove(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          <div className="cart-summary">
            <p>Subtotal: ₹{totalPrice}</p>
            <p>Shipping: ₹{shipping}</p>
            <hr />
            <h2>Grand Total: ₹{grandTotal}</h2>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;