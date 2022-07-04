//img tag to show the map
import React , {useState} from "react";
//import request from 'request';

export default function Map(){
  //get the lat and lng of user
  const [restaurant , setRestaurant] = useState({
    number: null
  })

  const [deliver, setDeliver] = useState({
    lat:25.014049566011995, lng:121.54165618773283
  })

  const [place , setPlace] = useState({
    lat: null ,lng: null , name : null
  })

  const getLocation = () =>{

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getCoordinates , handleLocationError);
      
    }else{
      alert("Geolocaiton is not supported in the browser")
    }
  }
  
  const getCoordinates = (position) => {
      setPlace({
      lat: position.coords.latitude,
      lng:position.coords.longitude
    })

  }
  //to log the error record of navigator
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
    

  const site={
    LatLngUrl : 'http://127.0.0.1:8000/?start='+restaurant.number+'&end=['+place.lat+','+place.lng+']',
    NameUrl : 'http://127.0.0.1:8000/?start='+restaurant.number+'&end='+place.name,
    LLDUrl : 'http://127.0.0.1:8000/?start='+restaurant.number+'&end=['+place.lat+','+place.lng+']'+'&deliver=['+deliver.lat+','+deliver.lng+']'
  }

  const map = {
    width :'100%',
    height : '100vh'
  }

  const getValue = () => {
    const building = document.getElementById("building").value
    setPlace({name : building})
  }


  
  if (restaurant.number == null || place.lat ==null || place.lng == null){
    return (
    <div>
      <h3>Click the button to set the restaurant and destination</h3><br/>
      <h5>set Restaurant</h5><br/>
      <h6>{restaurant.number}</h6>
        <div>
          <button onClick={()=> setRestaurant({number:1 })}>第一學餐</button>
          <button onClick={()=> setRestaurant({number:3})}>第三學餐</button><br/><br/><br/>
        </div>
      <h5>set the deliver destinastion</h5><br/>
      <h6>lat: {place.lat} lng: {place.lng} name: {place.name}</h6>
        <div>
          <button onClick={()=> setPlace({lat:25.014229966528152, lng:121.54136190068499})}>RB</button>
          <button onClick={()=> setPlace({lat:25.011976749737887, lng:121.54151956449694})}>EE</button>
          <button onClick={()=> setPlace({lat:25.013281305547366, lng:121.5403459659688})}>IB</button>
          <button onClick={()=> setPlace({lat:25.015153349835774, lng:121.54268069839854})}>TR</button>
        </div>
      <h5>type in the building abbreviation</h5><br/>
      <button onClick={getValue}>new dest</button> <br/>
      <input id="building" placeholder="building"></input>

    </div>);
  }
  else{
    if(deliver.lat == null){
      return(
      <div >
        <h3>success1</h3>
        
        <h5>Deliver position</h5>
        <button onClick={() => setDeliver({lat:25.013577283783587, lng:121.54115405232888})}>LB</button>
        <button onClick={() => setDeliver({lat:25.012860193815552, lng:121.54151673012862})}>Dorm2</button>
        <img src={site.LLDUrl} alt= '1' width={map.width}/>
      </div> ) 
    }
    else{
      return(
        <div className ={map} >
          <h3>success2</h3>
          <button onClick={() => alert('hello')}>Delete</button>
          <img src={site.LLDUrl} alt= '2' width={map.width}/>
        </div> ) 
    }
  }
  
 



}


