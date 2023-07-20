import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import { useState } from "react";
import Navbar from "./Components/common/Navbar";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route 
          path="/" 
          element={<Home/>}>
        </Route>
        <Route 
          path="/login" 
          element={
            <OpenRoute>
              <Login setIsLoggedIn={setLoggedIn}/>
              </OpenRoute>
          }/>
        
        <Route 
          path="/signup" 
          element={
            <OpenRoute>
                <Signup setIsLoggedIn={setLoggedIn}/>
            </OpenRoute>
          }  
        />
            
        <Route 
          path="/forgot-password" 
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }

        />

        <Route 
          path="/update-password/:id" 
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }

        />

        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }

        />

        <Route 
          path="/about" 
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }

        />
      </Routes>
    </div>
  );
}

export default App;
