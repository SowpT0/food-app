import { Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';

const App = () => {
  const  [cart,setCart]  = useState([]);
  return (
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
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
