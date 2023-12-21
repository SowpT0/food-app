import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MenuPage = ({ cart, setCart }) => {
  const [menuItems] = useState([
    { id: 1, name: 'Custard Donut', price: 5.0, image: 'https://www.danielsdonuts.com.au/cdn/shop/products/TraceyAh-Kee_CustardDonut_TransparentBackground_Whole_SideShot_Landscape_1200x1200.png?v=1653567665' },
    { id: 2, name: 'Strawberry Donut', price: 6.0, image: 'https://www.yum.com.au/media/catalog/product/a/d/ads_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=504&width=848&canvas=848:504' },
    { id: 3, name: 'Chocolate Donut', price: 6.0, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Dunkin-Donuts-Chocolate-Glazed.jpg/1167px-Dunkin-Donuts-Chocolate-Glazed.jpg' },
  ]);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    
    fetch('https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart')
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error('Error fetching cart items:', error));
  }, [setCart]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = async (item) => {
    try {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        await fetch(`https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
        });
      } else {
        await fetch('https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...item, quantity: 1 }),
        });
      }

      
      const response = await fetch('https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart');
      const data = await response.json();
      setCart(data);

      
      setNotification('Item added to cart successfully');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    } catch (error) {
      console.error('Error updating quantity:', error);
      
      setNotification('Failed to add item to cart');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">Donut Selection</h1>
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 d-flex">
            <div className="card flex-column" style={{ height: '100%', width: '100%' }}>
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top img-fluid"
                style={{
                  objectFit: 'cover',
                  height: '200px',
                  zoom: item.id === 3 ? '150%' : '150%',
                }}
              />
              <div className="card-body " style={{ backgroundColor: 'lightgray' }}>
                <h5 className="card-title ">{item.name}</h5>
                <p className="card-text ">{formatPrice(item.price)}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notification && (
        <div className="alert alert-success mt-3" role="alert">
          {notification}
        </div>
      )}

      <div className="container-fluid">
        <div className="row fixed-bottom">
          <div className="col-12 text-right mb-3">
            <Link to="/cart" className="btn btn-primary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;