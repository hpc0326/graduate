import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react'
const containerStyle = {
  width: '1400px',
  height: '800px'
};

const [center , setCenter] = React.useState({lat: 25.013625, lng: 121.540470})
function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAj6NGGgE6guMZsGqLod-WTNXcJGwq-DAs"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {setMap(null)}, [])
  const num = 0;
  return isLoaded ? (
    <body>
      <div><h1>hello</h1><button onClick={(num) => num +1}>{num}</button></div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
      
      </body>
  ) : <></>
  
}

export default MyComponent;