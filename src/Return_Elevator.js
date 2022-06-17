import React , {useState , useEffect} from "react";
//import request from 'request';

export default function Elevator(){
    const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    //fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&q=test&key=AIzaSyCyQwvOXSM2IwbI-D6ub-u230D7p6NT6u4&type=video&maxResults=3" , 
    fetch("http://127.0.0.1:8000/elevator" , 
        {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(items)
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])



  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  else if (!isLoaded) {
    return <div>Loading...</div>;
  } 
  else {
    return (
      <ul>
        {items['TR'].map(item =>(
          <li>
            {item.Name} {item.Busy_Level} {item['Direction']} {item.Current_Floor}
          </li>
        ))}
          
      </ul>
      
    );
  }



}


