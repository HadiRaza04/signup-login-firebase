import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { auth } from "../Context/FirebaseContext";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("Hello", user);
            setUser(user);
        } else {
            console.log('Logged out');
            setUser(null);
        }
    } )
}, []) 
if(user === null) {
  return (
    <div className="flex flex-col h-[120px] p-2 justify-between">
      <button><Link to="/signin">Sign in</Link></button>
      <button><Link to="/signup">Sign up</Link></button>
    </div>
  )
}
  return (
    <div>
      <button onClick={() => setUser(null)}>Logout</button>
      <h1>Home Page</h1>
      "User", {user.email}  
    </div>
  )
}
export default Home