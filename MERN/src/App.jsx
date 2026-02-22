import {  Routes, Route } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import UserDashboard from "./component/userD";
// import AdminDashboard from "./component/Admin";
import Protected from "./component/proctectRouter";
import ProductDetails from "./products/ProductDetails";
import Products from "./products/products";
import AddProduct from "./products/addProduct";
import Cart from "./products/cart";
import Navbar from "./pages/nav";


function App() {
  return (
    <>
     <Navbar></Navbar>
   
     
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Products />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user"
            element={
              <Protected role="user">
                <UserDashboard />
              </Protected>
            }
          ></Route>

          {/* <Route
path="/admin"element={
  <Protected role="admin">
    <AdminDashboard/>
  </Protected>}>
  </Route> */}

          <Route
            path="/add-product"
            element={
              <Protected role="admin">
                <AddProduct />
              </Protected>
            }
          ></Route>

          <Route path="/products/:slug" element={<ProductDetails />}></Route>
          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />
        </Routes>
 
    </>
  );
}
export default App;
