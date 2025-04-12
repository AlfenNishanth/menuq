// import { useRef, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const { login, currentUser } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log(currentUser);
//     try {
//       setError("");
//       setLoading(true);
//       await login(emailRef.current.value, passwordRef.current.value);
//       console.log(currentUser);
//       navigate("/dashboard/");
//     } catch (err) {
//       setError("Failed to Sign In " + err.message.replace("Firebase", ""));
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         {/* {currentUser && currentUser.email} */}
//         <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
//         {error && <div style={{ color: "red" }}>{error}</div>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             ref={emailRef}
//             placeholder="Email"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <input
//             type="password"
//             ref={passwordRef}
//             placeholder="Password"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition"
//             disabled={loading}
//           >
//             Log In{" "}
//           </button>
//         </form>
//         <div className="flex justify-center">
//           New User? {""}{" "}
//           <Link to="/signup" className="text-blue-800 underline ml-2">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




//new login page

import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSun, FaMoon, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, socialLogin, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      toast.success("Login Successful!");
      navigate("/dashboard/");
    } catch (err) {
      setError("Failed to Sign In " + (err.message ? err.message.replace("Firebase", "") : ""));
      toast.error("Failed to Sign In. Ensure your email and password are correct.");
    }
    setLoading(false);
  }

  async function handleResetPassword() {
    if (!emailRef.current.value) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      await resetPassword(emailRef.current.value);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error("Failed to send reset email");
      console.log(err)
    }
  }

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="absolute top-5 right-5 flex gap-3">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition flex items-center"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-400" />}
        </button>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="p-2 rounded-lg bg-gray-700 text-white"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className={`p-8 rounded-2xl shadow-xl w-96 transform transition-transform duration-300 backdrop-blur-lg ${darkMode ? 'bg-gray-800 bg-opacity-30' : 'bg-white'}`}>
        <h2 className="text-3xl font-extrabold mb-6 text-center">Log In</h2>
        {error && <div className="text-red-500 text-center mb-4 animate-shake">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="email" 
            ref={emailRef} 
            placeholder="Email Address" 
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
            required 
            autoFocus 
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              ref={passwordRef} 
              placeholder="Password" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
              required 
            />
            <button
              type="button"
              className={`absolute right-3 top-3 ${
                darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="mt-1.5"/> : <FaEye className="mt-1.5"/>}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} 
              />
              <span className="ml-2 text-sm">Remember Me</span>
            </label>
            <button 
              type="button" 
              className="text-sm text-teal-500 underline hover:text-teal-700" 
              onClick={handleResetPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
            disabled={loading}
          >
            {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Log In"}
          </button>
        </form>

        {socialLogin && (
          <>
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className={`mx-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <div className="flex justify-center mt-4 space-x-3">
              <button className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700" onClick={() => socialLogin('google')}><FaGoogle /></button>
              <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700" onClick={() => socialLogin('facebook')}><FaFacebook /></button>
              <button className="p-3 bg-black text-white rounded-full hover:bg-gray-800" onClick={() => socialLogin('apple')}><FaApple /></button>
            </div>
          </>
        )}

        <div className="flex justify-center mt-4 text-gray-500">
          New User?
          <Link to="/signup" className="text-teal-500 underline ml-2 hover:text-teal-700 transition">
            Sign Up
          </Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme={darkMode ? "dark" : "light"} />
    </div>
  );
};

export default Login;