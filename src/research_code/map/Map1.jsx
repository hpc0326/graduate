import React ,{ useEffect } from "react"
//import { Helmet } from "react-helmet"
//const google = window.google;
function Map() {
    window.google.maps.event.addListener(window, 'load' , initialize);
  useEffect(() => {
   const script = document.createElement("googleMap")

    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAj6NGGgE6guMZsGqLod-WTNXcJGwq-DAs&sensor=false";

    script.async = true
    document.body.appendChild(script)

    return () => {
             // clean up the script when the component in unmounted
              document.body.removeChild(script)
            }

  }, [])

  function initialize()
{
    
    function success(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var yourmap = {
            center:new window.google.maps.LatLng(latitude , longitude),
            zoom:20,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };
        var map = new window.google.maps.Map(document.getElementById("googleMap"), yourmap);
        var marker = new window.google.maps.Marker({position:new window.google.maps.LatLng(latitude,longitude)});
        marker.setMap(map);
        var infowindow = new window.google.maps.InfoWindow({content:"i'm here!"});
        infowindow.open(map,marker);

    };

    function error(){
        alert('the position is not allowed');
    };
    var geo_options = {
        enableHighAccuracy: true,
        maximumAge:30000,
        timeout:27000
    };

    if("geolocation" in navigator){
        navigator.geolocation.watchPosition(success,error,geo_options);
        
    }else{
        alert('the position is not allowed');
    }
    
};


return <div id="googleMap" ></div>
}


export default Map