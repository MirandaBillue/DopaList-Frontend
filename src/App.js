import { useEffect, useState } from "react";
import { auth } from './services/firebase'
import "./styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";



function App() {
  //firebase user
  const [ user, setUser] = useState(null);

  useEffect(() => {

   const unsubscribe = auth.onAuthStateChanged(user => {
    setUser(user)
   });

   return unsubscribe;//cleanup effect
  }, []);
  
  return (
    <div className="App">
      <Header user={user} />
      <Main user={user} /> 
      <Footer />    
    </div>
  );
}

export default App;
