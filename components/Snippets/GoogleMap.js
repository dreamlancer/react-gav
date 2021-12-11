import React from 'react'
import GoogleMapReact from 'google-map-react'
import { FaMapPin } from 'react-icons/fa'

const Marker = () =>  <FaMapPin color="#0044c8" size={50} />

const GoogleMap = ({ places }) => {
    const center = { lat: 34.091158, lng: -118.2795188 }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBUvdMA3NDTy7M50P3oF8KxwYqVvRKdB-4' }}
                defaultCenter={center}
                defaultZoom={10}
            >

                {places.map((place, index) => (
                    <Marker
                        key={index}
                        lat={place.lat}
                        lng={place.lng}
                    />
                ))}
            </GoogleMapReact>
        </div>
    )
}


export default GoogleMap