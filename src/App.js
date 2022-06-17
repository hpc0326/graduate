//import logo from './logo.svg';
import './App.css';
import React ,{useState , useEffect} from 'react';
//import { Button } from 'react-bootstrap';
import Table from './Table'




const App = () => {

  const [num,setNum] = useState(0);

  useEffect(()=>{
    alert(`button clicked ${num}`);
  });

  return (
    <div>
      <button onClick={()=>{
        setNum (num +1);
      }}>Click number {num}
      </button>
    </div>
  )
}

export default App;

