import { Link, useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  // Retrieve cart data from the location state
  const location = useLocation();
  const cart = location.state && location.state.cart ? location.state.cart : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">Checkout</h1>
      

    <div className="mt-4">
        <h4 className="text-white">Selected Products:</h4>
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item">
              <div>
                <h5>{item.name}</h5>
                <p>{formatPrice(item.price)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: {formatPrice(item.price * item.quantity)}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-white">Thank you for shopping with us!</p>

        </div>
    

      <div className="text-right">
        <p className="text-white">Total Amount: {formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</p>
       
        <button className="btn btn-success" onClick={() => console.log('Payment logic goes here')}>
          Confirm Payment
        </button>
      </div>

      
     

      <Link to="/menu">Back to Menu</Link>
    </div>
  );
};

export default CheckoutPage;
