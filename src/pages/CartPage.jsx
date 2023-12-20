import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from the API
    fetch('https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart')
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

  const handleDeleteItem = (itemId) => {
    // Delete item from the cart using the API
    fetch(`https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh the cart after deleting
        fetch('https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart')
          .then((response) => response.json())
          .then((data) => setCart(data))
          .catch((error) =>
            console.error('Error fetching cart items after delete:', error)
          );
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    // Update the quantity of an item in the cart using the API
    fetch(`https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh the cart after updating quantity
        fetch('https://capstone-project-api-shaunteoh1.sigma-school-full-time-capst.repl.co/api/cart')
          .then((response) => response.json())
          .then((data) => setCart(data))
          .catch((error) =>
            console.error('Error fetching cart items after quantity update:', error)
          );
      })
      .catch((error) => console.error('Error updating quantity:', error));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">Shopping Cart</h1>
      <ul className="list-group">
        {cart.map((item) => {
          const itemTotal = item.price * item.quantity;

          return (
            <li key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between bg-light p-3">
                <div>
                  <h5>{item.name}</h5>
                  <p>{formatPrice(item.price)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: {formatPrice(itemTotal)}</p>
                </div>
                <div>
                  <div className="input-group">
                    <input
                      type="number"
                      value={item.quantity || 0}
                      onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                      min="1"
                      className="form-control"
                    />

                    <div className="input-group-append">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="text-right mt-3">
        <p>Total: {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</p>
      </div>
      <Link to="/menu">Back to Menu</Link>
    </div>
  );
};

export default CartPage;
