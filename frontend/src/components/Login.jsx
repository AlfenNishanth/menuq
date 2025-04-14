import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, socialLogin, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
    <div className="flex items-center justify-center min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>

      <div className="p-8 rounded-2xl shadow-xl w-96 transform transition-transform duration-300 backdrop-blur-lg bg-white/80">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Log In</h2>
        {error && <div className="text-red-500 text-center mb-4 animate-shake">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="email" 
            ref={emailRef} 
            placeholder="Email Address" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
            required 
            autoFocus 
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              ref={passwordRef} 
              placeholder="Password" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required 
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-700 hover:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="mt-1.5"/> : <FaEye className="mt-1.5"/>}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" 
                checked={rememberMe} 
                onChange={() => setRememberMe(!rememberMe)} 
              />
              <span className="ml-2 text-sm">Remember Me</span>
            </label>
            <button 
              type="button" 
              className="text-sm text-amber-600 underline hover:text-amber-700" 
              onClick={handleResetPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-amber-600 text-white p-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
            disabled={loading}
          >
            {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Log In"}
          </button>
        </form>

        {socialLogin && (
          <>
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-4 text-sm text-gray-500">OR</span>
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
          <Link to="/signup" className="text-amber-600 underline ml-2 hover:text-amber-700 transition">
            Sign Up
          </Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default Login;