import { Link } from 'react-router-dom';

const CartPage = ({ cart }) => {
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
        {cart.map((item, index) => (
          <li key={index} className="list-group-item">
            <div className="d-flex justify-content-between bg-light p-3">
              <div>
                <h5>{item.name}</h5>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div>{}</div>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/menu">Back to Menu</Link>
    </div>
  );
};

export default CartPage;
