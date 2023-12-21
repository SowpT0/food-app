import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../index.css';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logout successful');
      
    } catch (error) {
      console.error('Logout Error:', error.message);
      
    }
  };

  return (
    <nav className="navbar navbar-expand-lg cyan-bg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          D Town
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              {currentUser ? (
                <Link className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profilepage">
                ProfilePage
              </Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
