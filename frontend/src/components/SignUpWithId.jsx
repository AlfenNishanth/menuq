import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderLayout from "../layouts/HeaderLayout";
import Signup from "./Signup";
import { validateQrSignup } from "../api/restaurant";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const SignupWithQr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qrId, setQrId] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  const { currentUser, userData, isSigningUp } = useAuth();

  useEffect(() => {
    if (currentUser && !isSigningUp && userData) {
      // Show elegant notification instead of alert
      toast.error("You are already signed in. Please logout first to signup with a new user.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "toast-custom"
      });
      setTimeout(() => navigate("/dashboard/"), 2000);
    } else {
      const qrCode = id?.startsWith("RQ") ? id : null;
      if (!qrCode) {
        navigate("/");
        return;
      }

      // Show password modal instead of prompt
      setShowPasswordModal(true);
    }
  }, [id, currentUser, isSigningUp, userData, navigate]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.warn("Please enter a password to proceed.", {
        position: "top-center",
        className: "toast-custom"
      });
      return;
    }

    setIsLoading(true);
    const qrCode = id?.startsWith("RQ") ? id : null;

    try {
      const result = await validateQrSignup(qrCode, password);

      if (result.success) {
        setQrId(qrCode);
        setAuthenticated(true);
        setShowPasswordModal(false);
        toast.success("QR validation successful! Welcome to MenuQ.", {
          position: "top-center",
          className: "toast-custom"
        });
      } else {
        toast.error(result.message || "Invalid QR or password. Please try again.", {
          position: "top-center",
          className: "toast-custom"
        });
      }
    } catch (error) {
      toast.error("An error occurred during validation. Please try again.", {
        position: "top-center",
        className: "toast-custom"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowPasswordModal(false);
    toast.info("Signup cancelled.", {
      position: "top-center",
      className: "toast-custom"
    });
    navigate("/");
  };

  // Password Modal Component
  const PasswordModal = () => (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
        {/* Decorative header */}
        <div className="relative bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-3xl p-6 sm:p-8">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-3xl opacity-10">
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-amber-300 mix-blend-multiply"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-amber-200 mix-blend-multiply"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
              </div>
              <div className="mx-4 text-2xl sm:text-3xl font-serif font-bold bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 bg-clip-text text-transparent">
                MenuQ
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2">
              QR Access Required
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your password to proceed with exclusive QR-based signup
            </p>
          </div>
        </div>

        {/* Form content */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Access Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-amber-600 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-amber-700 group-hover:translate-x-0 group-disabled:translate-x-full"></span>
                <span className="relative flex items-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Validating...
                    </>
                  ) : (
                    <>
                      Proceed
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </span>
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 text-base font-medium text-amber-700 bg-transparent border border-amber-600 rounded-xl hover:bg-amber-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (showPasswordModal) {
    return (
      <>
        <PasswordModal />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
        />
      </>
    );
  }

  // Authentication failed state
  if (!authenticated) {
    return (
      <HeaderLayout>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
          <div className="max-w-md w-full mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 sm:p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2">
                  Access Denied
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Unable to proceed with QR-based signup
                </p>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 text-center">
                <p className="text-gray-600 mb-6">
                  The QR code or password provided was invalid. Please verify your credentials and try again.
                </p>
                
                <button
                  onClick={() => navigate("/")}
                  className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-amber-600 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-amber-700 group-hover:translate-x-0"></span>
                  <span className="relative flex items-center">
                    Return to Home
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="toast-container"
        />
      </HeaderLayout>
    );
  }

  // Successful authentication - render signup
  return (
    <HeaderLayout>
      <Signup qrId={qrId} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
      />
      
      {/* Custom Toast Styles */}
      <style jsx>{`
        .toast-container {
          font-family: 'Inter', sans-serif;
        }
        
        .toast-custom {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          color: #92400e;
          border: 1px solid #f59e0b;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .Toastify__toast--error.toast-custom {
          background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
          color: #991b1b;
          border-color: #ef4444;
        }
        
        .Toastify__toast--success.toast-custom {
          background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%);
          color: #166534;
          border-color: #22c55e;
        }
        
        .Toastify__toast--warning.toast-custom {
          background: linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%);
          color: #9a3412;
          border-color: #f97316;
        }
        
        .Toastify__toast--info.toast-custom {
          background: linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%);
          color: #1e40af;
          border-color: #3b82f6;
        }
      `}</style>
    </HeaderLayout>
  );
};

export default SignupWithQr;