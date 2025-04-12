import React from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import { useAuth } from "../contexts/AuthContext";

const Dashboard_plain = () => {

  const { userData } = useAuth();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
      <QRCodeGenerator 
          url={`http://localhost:5173/res/${userData?.restaurantId}`}
          size={250}
          logoSize={50}
          labelText={`Restaurant Id: ${userData?.restaurantId}`}
          fgColor="#225588"
        />

      {/* Add additional dashboard content as needed */}
    </div>
  );
};

export default Dashboard_plain;

export const DashboardIndex = () => {
  return <h1>Dashboard Index</h1>;
};



