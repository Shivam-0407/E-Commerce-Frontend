import { Route,Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Collection from "./pages/collection/Collection";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/categorySlice";
import Payments from "./components/payments/Payments";


function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCategories())
  },[])
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/category/:categoryId?" element={<Collection />} ></Route>
          <Route path="products/:productId" element={<ProductDetail />} ></Route>
          <Route path="payments/:status" element={<Payments />} ></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
