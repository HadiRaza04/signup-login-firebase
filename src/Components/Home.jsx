import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { auth, useFirebase } from "../Context/FirebaseContext";

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("Hello", user);
            setUser(user);
        } else {
            console.log('Logged out', user);
            setUser(null);
        }
    } )
  }, [])

  const firebase = useFirebase();
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
      "User", {user.email}  <br />
      <button onClick={firebase.writeData} className="mt-1">Write Data</button> <br />
      <button onClick={firebase.writeSubData} className="mt-1">Write SubData</button><br />
      <button onClick={firebase.getDocument} className="mt-1">Get Document</button><br />
      <button onClick={firebase.getDocumentByQuery} className="mt-1">Get Document By Query</button><br />
      <button onClick={firebase.updateDocument} className="mt-1">Update Document</button><br />
      <button onClick={firebase.deleteDocument} className="mt-1">Delete Document</button><br />
    </div>
  )
}
export default Home