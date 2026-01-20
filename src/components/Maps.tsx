"use client";

// components/Map.js
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 52.6350331,
  lng: -0.3451894,
};

export default function Map() {
    if(!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY){
        throw new Error("Google API key not set")
    }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
