//experiment file
import React ,{Component}from 'react';
//var macaddress = require('macaddress');
//const macc = macaddress.networkInterfaces() ;
//let getMacAddress = require("get-mac-address")
import { NetworkInfo } from "react-network-info";



const FunctionalComponent=()=>{
    const [count, setCount] = React.useState(5);
  
    
        const increase = () => {
            if(count > 9){
               setCount(0) ;
           }else{
            setCount(count+1);}
        }
    
    
  
    return (
        <div style={{margin:'50px'}}>
            <h1>Welcome to Geeks for Geeks </h1>
            <h2>Welcome to Geeks for Geeks </h2>
            <h3>Welcome to Geeks for Geeks </h3>
            <h4>Welcome to Geeks for Geeks </h4>
            <h5>Welcome to Geeks for Geeks </h5>
            <h6>Welcome to Geeks for Geeks </h6>
            <h3>Counter App using Functional Component  : </h3>
           
          <h2>{count}</h2>
          <textarea placeholder='type in the word'></textarea>
            <button onClick={increase}>Add</button>
            <a href='https://www.google.com' target='_blank'>google</a>
            <h6></h6>
        </div>
    )
}  

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    )
  }
  

  
  const TableBody = () => {
    return (
      <tbody>
        <tr>
          <td>Charlie</td>
          <td>Janitor</td>
        </tr>
        <tr>
          <td>Mac</td>
          <td>Bouncer</td>
        </tr>
        <tr>
          <td>Dee</td>
          <td>Aspiring actress</td>
        </tr>
        <tr>
          <td>Dennis</td>
          <td>Bartender</td>
        </tr>
      </tbody>
    )
  }

  const Warn = () => alert('hello');
 // let nameArray = ['Alex ,' , 'Jason ,'];

 const Addname = () =>{
    let [item, setState] = React.useState(['Alex ,' , 'Jason ,']);
    const [i , seti] = React.useState(2);
 
  
   const save =() => {
    let newitem = document.getElementById("nameInput").value;
    
     setState([item , newitem+' ,'] );
     //nameArray = item;
      seti(i+1);
   // alert(newitem)
   }

    return(
      <div style={{margin:'50px'}}>
        <label>type in a name</label>
        <input id ='nameInput' type='text' name='nameArray' placeholder='EX : Alex'/>
        <input id  = 'nameSubmit' type='submit' value='submit' onClick={save}/>
        <p>the {i} Names are : {item.map(name=><p>{name}</p>)}</p>
      </div>
    )
  }


  class Table extends Component {
    render() {
      return (
        <div>
          
        <table>
          <TableHeader />
          <TableBody />
        </table>
        
        <span>
      
          <FunctionalComponent />
       
          <button onClick={() => Warn()}>warning</button>
     
            <Addname />
      
          <br/><br/>
          <span>

          <h6>The name of number {} is : {}</h6>
            <input type='text' />
            <input type='submit' />
          </span>
          </span>
        </div>
      )
    }
  }

  export default Table;