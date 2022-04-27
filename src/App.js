import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddProduct from "./components/AddProduct/AddProduct";
import AllProducts from "./components/AllProducts/AllProducts";
import Sidebar from "./components/Sidebar/Sidebar";


function App() {
  return (
    <div className="flex bg-green-200">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
