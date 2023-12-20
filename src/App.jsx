import { Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/MenuPage';
import Login from './components/Login';
import CartPage from './pages/CartPage';
import {AuthProvider} from "./components/AuthProvider";
import Register from './components/Register'

const App = () => {
  const  [cart,setCart]  = useState([]);
  return (
    <AuthProvider>
    <div className = "pink-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Menu"
          element={<MenuPage cart={cart} setCart={setCart} />}
        />
        <Route
          path="/Cart"
          element={<CartPage cart={cart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
    </AuthProvider>
  );
};

export default App;
