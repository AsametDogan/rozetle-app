import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loading = ({ label }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
      {/* The spinner */}
      <Spinner color="blue" size="3xl" />

      {/* Optional: Add a message */}
      <p className="text-white text-lg ml-2">{label || "Yükleniyor..."}</p>
    </div>
  );
};

export default Loading;
