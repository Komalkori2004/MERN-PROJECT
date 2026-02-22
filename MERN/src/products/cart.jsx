import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    FetchCart();
  }, []);

  //   to get cart
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

  // total price
  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.product.finalPrice * item.quantity;
  }, 0);

  const shipping = totalPrice > 1000 ? 0 : 100;
  const grandTotal = totalPrice + shipping;
  if (!cart) return <p>Cart is Empty</p>;

  //   to incress or decress quntity of product

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
      },
    );
    FetchCart();
  };

  //   to remove items

  const Remove = async (productId) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    FetchCart();
  };

  return (
    <>
      <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
        <h1>My Cart 🛒</h1>

        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
              >
                {/* IMAGE */}
                <img
                  src={`${import.meta.env.VITE_API_URL}/${item.product.thumbnail}`}
                  alt={item.product.title}
                  width="120"
                  style={{ borderRadius: "10px", marginRight: "20px" }}
                />

                {/* DETAILS */}
                <div style={{ flex: 1 }}>
                  <h3>{item.product.title}</h3>
                  <p>Price: ₹{item.product.finalPrice}</p>
                  <p>Subtotal: ₹{item.product.finalPrice * item.quantity}</p>
                  <button
                    onClick={() =>
                      updateQty(item.product._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    onClick={() =>
                      updateQty(item.product._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <br />
                  <button onClick={() => Remove(item.product._id)}>
                    remove
                  </button>
                </div>
              </div>
            ))}

            {/* TOTAL SECTION */}
            <div
              style={{
                borderTop: "2px solid #000",
                paddingTop: "20px",
                textAlign: "right",
              }}
            >
              <p>Subtotal: ₹{totalPrice}</p>
              <p>Shipping: ₹{shipping}</p>
              <hr />
              <h2>Grand Total: ₹{grandTotal}</h2>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cart;
