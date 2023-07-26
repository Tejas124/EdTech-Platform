import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Navbar from "./Components/common/Navbar";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";

function App() {

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
              <Login/>
              </OpenRoute>
          }/>
        
        <Route 
          path="/signup" 
          element={
            <OpenRoute>
                <Signup />
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

        {/* <Route path="/contact" element={<Contact/>}/> */}

        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }

        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>} />
        </Route>

        
      </Routes>
    </div>
  );
}

export default App;
