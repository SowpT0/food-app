import { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { updateProfile, getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfilePage = () => {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const auth = getAuth();
    const user = auth.currentUser;

   
    const storageRef = ref(getStorage(), `profile_images/${user.uid}`);
    await uploadBytes(storageRef, image);

    
    const downloadURL = await getDownloadURL(storageRef);

    
    await updateProfile(user, {
      photoURL: downloadURL,
    });

   
    updateCurrentUser({
      ...currentUser,
      photoURL: downloadURL,
    });

 
    setImage(null);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          {currentUser ? (
            <>
              <h2 className="fw-bold mt-3">Your Profile</h2>
              {currentUser.photoURL && (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              )}
              <p>Name: {currentUser.displayName}</p>
              <p>Email: {currentUser.email}</p>
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleImageUpload}>Upload Image</button>
            </>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;