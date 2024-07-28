import { useState } from 'react';
import './App.css';
import { app } from './firebase';
import { getDatabase, ref, set, get, child } from "firebase/database";
import Login from './componets/Login';


function App() {
  const database = getDatabase();
  const [data, setData] = useState([])
  const [showLogin, setShowLogin] = useState(0)
  const [user, setUser] = useState("")
  
  return (
    <div className="App">
      <h2>Vasara</h2>
      <button onClick={()=>setShowLogin(showLogin===1?0:1)}>Login</button>
      <Login showLogin={showLogin} setShowLogin={setShowLogin}/>
    </div>
  );
}

export default App;
