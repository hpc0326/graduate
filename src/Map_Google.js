//google map api show the position
import React , {useState } from "react";
import './App.css'
import { GoogleMap , useLoadScript , Marker} from '@react-google-maps/api';

function App(){
  const [state , setState] = useState({lat:25 , lng:121.5});
  const [finFlag , setFin] = useState(0);

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

 const setRestaurant = (pros) =>{
    setState({
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
        <button onClick={()=> setRestaurant({lat:25.01387286692449,lng: 121.54281288590185 })}>第一學餐</button>
        <button onClick={()=> setRestaurant({lat:25.0119935 ,lng:121.5409525})}>第三學餐</button>
        <button onClick={()=> getLocation()}>現在位置</button>
      </div>
      <div>
        <h3>終點</h3>
        <button onClick={()=> setRestaurant({lat:25.01387286692449,lng: 121.54281288590185 })}>第一學餐</button>
        <button onClick={()=> setRestaurant({lat:25.0119935 ,lng:121.5409525})}>第三學餐</button>
        <button onClick={()=> getLocation()}>現在位置</button>
      </div>
      <GoogleMap 
        zoom={19} 
        center={center}
        mapContainerStyle={containerStyle}
      >
        <Marker  position= {center}/>

      </GoogleMap>
    </div>
  )
 

}

export default App;