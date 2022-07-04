//only show one picture
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
    top:'0px',
    left:'0px',
    width: '100%',
    height: '50vh'
  };
  
  /*if(!isLoaded || finFlag === 0){
    getLocation();
    return <div>Loading...</div>;
  } */

  
  return (
    <div >
        <div id='divWithPic'>
          <div id>
            <img src={require("./img/placeholder.png")} alt=" " id='placeHolder' />
          </div>
          

        </div>
    </div>
  )
 

}

export default App;