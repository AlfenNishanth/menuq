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
import HeaderLayout from "./layouts/HeaderLayout";
import PrivacyPolicy from "./components/MenuQPrivacyPolicy"
import TermsOfService from "./components/MenuQTermsOfService"
import CookiePolicyPage from "./components/MenuQCookiePolicyPage"
import AboutUs from "./components/MenuQAboutUs"
import Careers from "./components/MenuQCareers"
import ContactUs from "./components/MenuQContactUs"

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Apply HeaderLayout to LandingPage, Login, and Signup */}
          <Route path="/" element={<HeaderLayout><LandingPage /></HeaderLayout>} />
          <Route path="/login" element={ <HeaderLayout><Login /></HeaderLayout>} />
          <Route path="/signup" element={<HeaderLayout><Signup /></HeaderLayout>} />
          {/* ✅ Legal policy routes */}
          <Route path="/privacy" element={<HeaderLayout><PrivacyPolicy /></HeaderLayout>} />
          <Route path="/terms" element={<HeaderLayout><TermsOfService /></HeaderLayout>} />
          <Route path="/cookies" element={<HeaderLayout><CookiePolicyPage /></HeaderLayout>} />
          <Route path="/aboutus" element={<HeaderLayout><AboutUs /></HeaderLayout>} />
          <Route path="/careers" element={<HeaderLayout><Careers /></HeaderLayout>} />
          <Route path="/contactus" element={<HeaderLayout><ContactUs /></HeaderLayout>} />
          

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
            <Route path="qr-generator" element={<QRCodeGenerator/>}/>

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
//         <
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
