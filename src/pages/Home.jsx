import { useState, useEffect } from 'react';
import { storage } from '../firebase.jsx';
import { ref, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';
import GoogleMapComponent from '../components/GoogleMap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    
    const filePath = 'gs://food-app-76994.appspot.com/a-world-of-donuts-and-one-real-photo-guess-which-v0-658fjt8q5f9b1.webp';

    
    const fileRef = ref(storage, filePath); 
    
    getDownloadURL(fileRef)
      .then((url) => {
        
        setImageUrl(url);
      })
      .catch((error) => {
        
        console.error('Error getting download URL:', error);
      });
  }, []);

  const donutNames = ['Custard Donut', 'Strawberry Donut', 'Chocolate Donut'];

  const getRandomDonuts = () => {
    const randomDonuts = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * donutNames.length);
      randomDonuts.push(donutNames[randomIndex]);
    }
    return randomDonuts;
  };

  const handleButtonClick = () => {
    const randomDonuts = getRandomDonuts();
    const randomDonut = randomDonuts[Math.floor(Math.random() * randomDonuts.length)];
    toast.success(`Get the ${randomDonut}!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  return (
    <div className="mt-5">
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-4 text-white">Welcome to Donut Town</h1>
            <p className="lead text-white">Different kinds of donuts for different people</p>
            <p className="text-white">Order online and satisfy your sweet cravings.</p>
            <br></br>
            <Link
              to="/menu"
              className="btn btn-primary btn-lg bg-primary hover-bg-danger"
              style={{ transition: 'background-color 0.3s ease' }}
            >
              Explore the Menu
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Donuts"
                className="img-fluid rounded"
                style={{ marginBottom: '50px' }}
              />
            )}
          </div>
        </div>
      </div>

      
<br></br>
      <GoogleMapComponent />
      <br></br>
      {/* Random Donut Button */}
      <div className="container mt-5">
  <div className="row">
    <div className="col-md-6 offset-md-3 text-center text-white">
      <div>
        <p>Not sure what to get? Click here!</p>
      </div>
      <button
        className="btn btn-secondary"
        onClick={handleButtonClick}
      >
        <FontAwesomeIcon icon={faStroopwafel} />
      </button>
    </div>
  </div>
</div>
      <ToastContainer />
    </div>
  );
};


export default Home;
