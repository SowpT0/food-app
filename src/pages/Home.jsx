import '../index.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className = "mt-5">
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-4 text-white">Welcome to Donut Town</h1>
            <p className="lead text-white">Different kinds of donuts for different people</p>
            <p className="text-white">Order online and satisfy your sweet cravings.</p>
            <br></br>
            <Link to="/menu" className="btn btn-primary btn-lg bg-primary hover-bg-danger"style={{ transition: 'background-color 0.3s ease' }}>Explore the Menu</Link>

          </div>
        </div>
      </div>
<br></br>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <img
              src="https://preview.redd.it/a-world-of-donuts-and-one-real-photo-guess-which-v0-658fjt8q5f9b1.jpg?width=1080&crop=smart&auto=webp&s=8d4dd386f6ef0a4f573b63a29f030b1f9e4165fd"  // Replace with your actual image URL
              alt="Donuts"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
