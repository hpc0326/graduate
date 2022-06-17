//main file
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
//import App from './Map_Google_test1'
//import Elevator from './Return_Elevator'
import Map from './Return_Map'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Map/>
  </StrictMode>

);


