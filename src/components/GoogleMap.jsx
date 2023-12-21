import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '50%',
  height: '350px',
  margin: '0 auto',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const GoogleMapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyApS7T8U8u9i1P7DjJSnv1w_0g1ik02uF8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;