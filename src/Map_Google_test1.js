import React , {useState } from "react";
import './App.css'
import { GoogleMap , useLoadScript , Marker, InfoWindow} from '@react-google-maps/api';

function App(){
  const [state , setState] = useState({lat:25 , lng:121.5});
  const [desti , setDesti] = useState({lat:null , lng:null});
  const [finFlag , setFin] = useState(0);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  
  const getLocation = () =>{

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getCoordinates , handleLocationError);
      
    }else{
      alert("Geolocaiton is not supported in the browser")
    }
  }
  
  const getCoordinates = (position) => {
      setState({
      lat: position.coords.latitude,
      lng:position.coords.longitude
    })
    setFin(finFlag + 1);
  }

 const setStart = (pros) =>{
    setState({
      lat: pros.lat,
      lng: pros.lng
    })
 }
 const setDestination = (pros) =>{
    setDesti({
      lat: pros.lat,
      lng: pros.lng
    })
  }

  const handleLocationError = (error) =>{
    switch(error.code){
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation")
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.')
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.')
        break;
      default:
        alert('An unknown error occurred.')
    }
  }

  const {isLoaded } = useLoadScript({
    googleMapsApiKey :"AIzaSyAj6NGGgE6guMZsGqLod-WTNXcJGwq-DAs",
    
  });
  
  const markers = [
    {
      id: 1,
      name: "start",
      position: { lat: state.lat, lng: state.lng }
    },
    {
      id: 2,
      name: "desti",
      position: { lat: desti.lat, lng: desti.lng }
    }
  ];

  const center = {lat :state.lat, lng :state.lng};
  
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  
  if(!isLoaded || finFlag === 0){
    getLocation();
    return <div>Loading...</div>;
  } 

  
  return (
    <div >
      <div>
        <h3>起點</h3>
        <button onClick={()=> setStart({lat:25.01387286692449,lng: 121.54281288590185 })}>第一學餐</button>
        <button onClick={()=> setStart({lat:25.0119935 ,lng:121.5409525})}>第三學餐</button>
        <button onClick={getLocation}>現在位置</button>
      </div>
      <div>
        <h3>終點</h3>
        <button onClick={()=> setDestination({lat:25.01387286692449,lng: 121.54281288590185 })}>第一學餐</button>
        <button onClick={()=> setDestination({lat:25.0119935 ,lng:121.5409525})}>第三學餐</button>
        
      </div>
      <GoogleMap 
        zoom={17} 
        center={center}
        mapContainerStyle={containerStyle}
      >
        

        {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
      </GoogleMap>
    </div>
  )
 

}

export default App;