//show the map include fetch

import React , {useState  } from "react";
//import request from 'request';

export default function Map(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    const place = {
      lat:25.012552936947003, 
      lng :121.5405250609415
    }

    const site={
      url : 'http://127.0.0.1:8000/map/?lat='+place.lat+'&lng='+place.lng
    }

    const option = {
      method:  "GET",
      headers: {
      'Content-Type': 'image/jpg',
      }
    }
    const [imageObjectURL , setimageObjectURL]  = useState(null);

 
    
    fetch("http://127.0.0.1:8000/map/?lat=25.013362460447322&lng=121.54140203728495" , option)
      .then(res => res.blob())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setimageObjectURL( URL.createObjectURL(result));
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )




const map = {
  width :'100%',
  height : '100vh'
  
}

  if (error) {
    return (

    <div className ={map} >
      <h3>errorrrr</h3>
      <h3>{imageObjectURL}</h3>
      <img src={imageObjectURL} alt= ' ' width={map.width}/>
    </div>

    )
  } 
  else if (!isLoaded) {
    return <div>Loading...</div>;
  } 
  else {
    return (
      
      <div className ={map} >
        <h3>success</h3>
      <img src={site.url} alt= ' ' width={map.width}/>
    </div>
      
      
    );
  }



}


