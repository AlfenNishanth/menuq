import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser)
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log(currentUser)
      navigate('/dashboard')
    } catch(err) {
      setError("Failed to Sign In " + err.message.replace("Firebase",""));
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* {currentUser && currentUser.email} */}
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition"
            disabled={loading}
          >
Log In          </button>
        </form>
        <div className="flex justify-center">
          New User?  {""} <Link to="/signup" className="text-blue-800 underline ml-2">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
