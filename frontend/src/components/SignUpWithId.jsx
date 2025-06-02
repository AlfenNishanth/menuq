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

  const { currentUser, userData, isSigningUp } = useAuth();

  useEffect(() => {
    if (currentUser && !isSigningUp && userData) {
      alert(
        "You are already signed in. Please logout first to signup with a new user."
      );
      navigate("/dashboard/");
    } else {
      const qrCode = id?.startsWith("RQ") ? id : null;
      if (!qrCode) {
        navigate("/");
        return;
      }

      const askPassword = async () => {
        const password = prompt(
          "Enter password to proceed with QR-based signup:"
        );
        if (!password) {
          alert("Signup cancelled: no password provided.");
          navigate("/");
          return;
        }

        const result = await validateQrSignup(qrCode, password);

        if (result.success) {
          setQrId(qrCode);
          setAuthenticated(true);
        } else {
          alert(result.message || "Invalid QR or password.");
          navigate("/");
        }
      };

      askPassword();
    }
  }, [id, currentUser, isSigningUp, userData, navigate]);

  if (!authenticated)
    return (
      <>
        <p>Signup with Id failed</p>
      </>
    );

  return (
    <HeaderLayout>
      <Signup qrId={qrId} />
      <ToastContainer />
    </HeaderLayout>
  );
};

export default SignupWithQr;
