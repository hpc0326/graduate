//img tag to show the map
import React , {useState } from "react";
//import request from 'request';
import './Interface.css'
import { Button, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from "react-router-dom"




const LinkPage = () => {

    return (
        <div>
          <Navbar fixed="top" expand="lg" className='bg-nav' style={{ height: '50px' }}>
            <Nav.Item className='align-baseleine'>
              <Nav.Link style={{color: 'black', fontSize: '25px'}} href="/">TDE</Nav.Link>
            </Nav.Item>
          </Navbar>
        </div>
    )
}

export default LinkPage;

function Map(){
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

  const al = () =>{
      alert('hello')
  }
 
  const getValue = () => {
    const lat_text = document.getElementById("lat_text").value
    const lng_text = document.getElementById("lng_text").value
    setPlace({lat: lat_text , lng : lng_text})
  }
  
  if ((delivery.lat || delivery.lng) == null){
    return (
    <div>    
        <div>
            
            <img src={site.url} alt= ' ' className='Lower' />
            <input 
            type='image' 
            src={require('./img/back.png')} 
            className='Upper' 
            onClick={al} 
            alt='upper'/>

        </div>
        <div>
             <button>
                 hello
             </button>
        </div>
    </div>
       
        
      );
  }
  else{
    return (
    
        <div className ={map} >
          
          
        <img src={site.url} alt= ' ' width={map.width}/>

    <button onClick={getValue}>new dest</button> <br/>
      <input id="lat_text" placeholder="lat"></input>
      <input id="lng_text" placeholder="lng"></input>
      <h3>wait</h3>
  </div> );
  }
  
 



}


