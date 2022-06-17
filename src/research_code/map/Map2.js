import React ,{useMemo} from 'react';
import { GoogleMap , useLoadScript , Marker} from '@react-google-maps/api';

class Direct extends React.Component{
  constructor(props){
    super(props);
    this.state={
      latitude:0,
      longitude:0,
      userAddress:null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.getCoordinates , this.handleLocationError);

    }else{
      alert("Geolocaiton is not supported in the browser")
    }
  }

  getCoordinates(position){
    this.setState({
      latitude: position.coords.latitude,
      longitude:position.coords.longitude
    })
  }


  handleLocationError(error){
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

  render(){
    const {isLoaded } = useLoadScript({
      googleMapsApiKey :"AIzaSyAj6NGGgE6guMZsGqLod-WTNXcJGwq-DAs",
      
    });
    
    
    if(!isLoaded) return <div>Loading...</div>;

    const center = useMemo(() => ({lat : this.state.latitude, lng :this.state.longitude}) , []);
    
    const containerStyle = {
      width: '100%',
      height: '100vh'
    };
    
    return(
      <GoogleMap 
        zoom={18} 
        center={center}
        mapContainerStyle={containerStyle}
      >
        <Marker key={Math.random()} position= {{lat : this.state.latitude, lng :this.state.longitude}}/>
    
       </GoogleMap> );
  }
}


const direct = new Direct();

export default function App(){

  
  const {isLoaded } = useLoadScript({
    googleMapsApiKey :"AIzaSyAj6NGGgE6guMZsGqLod-WTNXcJGwq-DAs",
    
  });
  
  

  const center = useMemo(() => ({lat : direct.latitude, lng :direct.longitude}) , []);
  
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  
  if(!isLoaded) return <div>Loading...</div>;

  return(
  <GoogleMap 
    zoom={18} 
    center={center}
    mapContainerStyle={containerStyle}
  >
    <Marker key={Math.random()} position= {{lat : 24.1502478, lng :120.7159799}}/>

   </GoogleMap> );

}



