import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer1, Footer2, Success } from './components'
import { About, Cart,  Checkout,  Contact,  Home, MyOrders, ProductDetails, Shop, Signup } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import './App.css'
function App() {
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/shop" element={<Shop/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/makeorder" element={<Checkout/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/myorders" element={<MyOrders/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer1 />
        <Footer2 />
      </Router>
    </>
  )
}

export default App