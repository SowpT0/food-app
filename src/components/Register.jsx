import {useState, useContext} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from './AuthProvider';

const Register = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const handleRegister = async () => {
    try {
      console.log('Registering with:', email, password);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful');
      setNotification('Registration Successful! You can now login.');
    } catch (error) {
      console.error('Registration Error:', error.message);
      setNotification('Registration Failed. Please check your credentials.');
    }
  };

  const handleClick = () => {
    // Only allow registration if there is no current user
    if (!currentUser) {
      handleRegister();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form>
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
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleClick}
                >
                  Register
                </button>
              </form>
              {notification && <p className="mt-3 text-center">{notification}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;