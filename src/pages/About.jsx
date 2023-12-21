import { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const About = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
  
    const filePath = 'gs://food-app-76994.appspot.com/LEGO_60233_WEB_SEC01_1488.jpg';

 
    const fileRef = ref(storage, filePath); 

    
    getDownloadURL(fileRef)
      .then((url) => {
        
        setImageUrl(url);
      })
      .catch((error) => {
        
        console.error('Error getting download URL:', error);
      });
  }, []); 

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 text-white">
          <h1>Donut Town</h1>
          <br></br>
          <p>
            Welcome to Donut Town! Where you can find mouthwatering donuts!
          </p>
          <p>
            Our mission is to provide high-quality, freshly baked donuts with a
            variety of flavors to satisfy every craving. Each donut is crafted with
            love and attention to ensure a delicious experience for our customers.
          </p>
          <p>
            Whether you&apos;re a fan of classic glazed donuts or adventurous enough to
            try unique and creative flavors, we have something for everyone.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={imageUrl}
            alt="Donuts"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default About;