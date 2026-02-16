import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import UserDashboard from "./component/userD";
// import AdminDashboard from "./component/Admin";
import Protected from "./component/proctectRouter";
import ProductDetails from "./products/ProductDetails";
import Products from "./products/products";
import AddProduct from "./products/addProduct";
import Cart from "./products/cart";


function App(){


return(<>
<BrowserRouter>

<Routes>


  <Route path="/login"  element={<Login/>}></Route>
  <Route path="/" element={<Signup/>} ></Route>
  <Route
path="/user"element={
  <Protected role="user">
    <UserDashboard/>
  </Protected>}>
  </Route>

    {/* <Route
path="/admin"element={
  <Protected role="admin">
    <AdminDashboard/>
  </Protected>}>
  </Route> */}

      <Route
path="/add-product"element={
  <Protected role="admin">
    <AddProduct/>
  </Protected>}>
  </Route>


<Route path="/products" element={<Products/>}></Route>
<Route path="/products/:slug" element={<ProductDetails/>}></Route>
<Route path="/cart" element={<Cart/>} />

</Routes>

</BrowserRouter>

</>)


}
export default App