import { useState, useContext, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from './AuthProvider';

const Login = () => {
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        console.log('Logging in with:', email, password);
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
        setLoginSuccessful(true);
        setButtonClicked(true);
        setNotification('Login Successful!');
      } catch (error) {
        console.error('Login Error:', error.message);
        setNotification('Login Failed. Please check your credentials.');
      }
    };
  
    const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('Google Sign-In successful', result.user);
        setLoginSuccessful(true);
        setButtonClicked(true);
        setNotification('Google Sign-In Successful!');
      } catch (error) {
        console.error('Google Sign-In Error:', error.message);
        setNotification('Google Sign-In Failed. Please try again.');
      }
    };
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('Logout successful');
        setNotification('Logout Successful!');
      } catch (error) {
        console.error('Logout Error:', error.message);
        setNotification('Logout Failed. Please try again.');
      }
    };
  
    useEffect(() => {
      if (buttonClicked && loginSuccessful) {
        console.log('Navigating to homepage');
        navigate('/Home'); // Replace with your desired homepage route
      }
    }, [buttonClicked, loginSuccessful, navigate]);
  
    const handleClick = () => {
      // If currentUser is present, trigger logout; otherwise, trigger login
      currentUser ? handleLogout() : handleLogin();
    };
  
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  {currentUser ? 'Logout' : 'Login'}
                </h2>
                <form>
                  {!currentUser && (
                    <>
                      <div className="form-group">
                        <label>Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleClick}
                  >
                    {currentUser ? 'Logout' : 'Login with Email/Password'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={handleGoogleSignIn}
                  >
                    Login with Google
                  </button>
                </form>
                {notification && <p className="mt-3 text-center">{notification}</p>}
                <Link to="/register" className="btn btn-link">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;