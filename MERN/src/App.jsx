import { Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import UserDashboard from "./component/userD";
import AdminDashboard from "./component/Admin";
import Protected from "./component/proctectRouter";
import ProductDetails from "./products/ProductDetails";
import Products from "./products/products";
import AddProduct from "./products/addProduct";
import Cart from "./products/cart";
import Layout from "./pages/layout";
import Home from "./pages/home";
// import Navbar from "./pages/nav";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route path="/products/:slug" element={<ProductDetails />} />

          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Protected role="user">
                <UserDashboard />
              </Protected>
            }
          />
        </Route>
         <Route
          path="/add-page"
          element={
            <Protected role="admin">
              <AdminDashboard />
            </Protected>
          }
        />
        <Route
          path="/add-product"
          element={
            <Protected role="admin">
              <AddProduct />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}
export default App;
