import { useState, useEffect } from 'react'
import './App.css'
import Register from './Compos/Register/Register'
import Home from "./Compos/Home/Home"


function getCookie(name: string) {
  const cookieString = decodeURIComponent(document.cookie);
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if the cookie name matches
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return "";
}

function App() {
  const [activeTab, setActiveTab] = useState("")
  const [user, setUser] = useState<string>("")

  useEffect(()=>{
    const accessToken:string = getCookie("user");
    console.log(accessToken);
    if (accessToken){
      setUser(accessToken)
      setActiveTab("home")
    }else{
      setActiveTab("register")
    }
  }, [])


  let pages:any = {
    "register": <Register />,
    "home": <Home user={user} />

  }

  return (
    <>
      {pages[activeTab]}
    </>
  )
}

export default App
