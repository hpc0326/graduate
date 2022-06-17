//img tag to show the map
import React , {useState} from "react";
//import request from 'request';

export default function Map(){
    const [delivery , setDelivery] = useState({
      lat:null,
      lng:null
    })

    const [place , setPlace] = useState({
      lat:25.012552936947003, 
      lng :121.5405250609415
    })

    const site={
      url : 'http://127.0.0.1:8000/map/?lat='+place.lat+'&lng='+place.lng
    }

  const map = {
    width :'100%',
    height : '100vh'
    
  }
  const getValue = () => {
    const lat_text = document.getElementById("lat_text").value
    const lng_text = document.getElementById("lng_text").value
    setPlace({lat: lat_text , lng : lng_text})
  }
  
  if ((delivery.lat || delivery.lng) == null){
    return (
        
        <div className ={map} >
          <button onClick={getValue}>new dest</button> <br/>
          <input id="lat_text" placeholder="lat"></input>
          <input id="lng_text" placeholder="lng"></input>
          <div>
            <h5>學餐：</h5>
            <button onClick={()=> setPlace({lat:25.01387286692449,lng: 121.54281288590185 })}>第一學餐</button>
            <button onClick={()=> setPlace({lat:25.0120073600045, lng:121.54098863137558})}>第三學餐</button>
            <button onClick={()=> setPlace({lat:25.014229966528152 ,lng:121.54136190068499})}>RB</button>
            <button onClick={()=> setPlace({lat:25.014050489891847 ,lng:121.54166918316649})}>貝殼聽</button>
            <button onClick={()=> setPlace({lat:25.011976749737887, lng:121.54151956449694})}>EE</button>
            <button onClick={()=> setPlace({lat:25.013281305547366, lng:121.5403459659688})}>IB</button>
            <button onClick={()=> setPlace({lat:25.015153349835774, lng:121.54268069839854})}>TR</button>
          </div>
          <h3>success</h3>
        <img src={site.url} alt= ' ' width={map.width}/>
      </div> 
        
      );
  }
  else{
    return <h3>wait</h3>;
  }
  
 



}


