import {  RouterProvider } from "react-router-dom"
import { Router } from "./router"
import { useEffect } from "react";

import './App.css'; 



const App = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
}, []);
  return (
    <>
   <RouterProvider router={Router} />
   </>
  )
}

export default App
