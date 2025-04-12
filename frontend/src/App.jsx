import { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard, { DashboardIndex } from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import UpdateProfile from "./components/UpdateProfile";
import AddNewMenuItem from "./components/AddNewMenuItem";
import MenuLayout from "./components/menuitems/MenuLayout";
import LandingPage from './components/LandingPage';
import ManageMenu from "./components/menuitems/ManageMenu";
import UpdateMenuItem from "./components/UpdateMenuItem";
import Dashboard_plain from "./components/Dashboard_plain";
import QRCodeGenerator from "./components/QRCodeGenerator";


function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            {/* Default dashboard view */}

            <Route index element={<DashboardIndex/>} />
            {/* <Route index element={<Dashboard_plain/>} /> */}
            
            {/* Nested routes */}
            <Route path="update-profile" element={<UpdateProfile />}/>
            <Route path="add-new-menu-item" element={<AddNewMenuItem/>}/>
            <Route path="manage-menu" element={<ManageMenu/>}/>
            <Route path="edit-menu-item/:id" element={<UpdateMenuItem/>}/>
            <Route path="qr-generator/:id" element={<QRCodeGenerator/>}/>

            {/* <Route path="add-new-item" element={<AddNewItem />} /> */}
          </Route>

          {/* Optionally, redirect root to dashboard */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/res/:id" element={<MenuLayout/>}/>

        </Routes>
      </AuthProvider>
    </Router>
  );

}


//   return (
//     <>
//       {/* {}
//     <Signup/> */}
//       <Router>
//         <AuthProvider>
//           <Routes>
//             {/* <Route exact path = "/" Component={Dashboard}/> */}
//             {/* <Route path="/" element={<Dashboard />} /> */}
//             {/* <Route
//               path="/"
//               element={<PrivateRoute element={<Dashboard />} />}
//             /> */}
//             <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
//             <Route path="/login" Component={Login} />
//             <Route path="/signup" Component={Signup} />
//           </Routes>
//         </AuthProvider>
//       </Router>

//       {/* <div className="parent-div flex flex-col h-screen w-screen">
//       <div className="flex h-screen ">
//         <Sidebar
//           userName="Alfen Nishanth S"
//           selectedItem={selectedItem}
//           setSelectedItem={setSelectedItem}
//         />
//       </div>



//       {/* <ToastContainer /> 
//     </div> */}
//     </>
//   );
// }

export default App;
