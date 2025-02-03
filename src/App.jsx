import { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      {/* {}
    <Signup/> */}
      <Router>
        <AuthProvider>
          <Routes>
            {/* <Route exact path = "/" Component={Dashboard}/> */}
            {/* <Route path="/" element={<Dashboard />} /> */}
            {/* <Route
              path="/"
              element={<PrivateRoute element={<Dashboard />} />}
            /> */}
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
          </Routes>
        </AuthProvider>
      </Router>

      {/* <div className="parent-div flex flex-col h-screen w-screen">
      <div className="flex h-screen ">
        <Sidebar
          userName="Alfen Nishanth S"
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>



      {/* <ToastContainer /> 
    </div> */}
    </>
  );
}

export default App;
