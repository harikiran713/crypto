import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "./home";

function Sha256() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const hash256 = async (text) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    } catch (error) {
      console.error("Error generating hash:", error);
    }
  };

  const handleChange = async (event) => {
    const text = event.target.value;
    setInput(text);
    if (text.trim()) {
      const hash = await hash256(text);
      setOutput(hash);
    } else {
      setOutput(""); 
    }
  };

  const goBack = () => {
    setRedirectToHome(true);
  };

  if (redirectToHome) {
    return <Home />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-100 p-8 flex flex-col items-center justify-center">
   
      <div
        onClick={goBack}
        className="self-start mb-6 text-gray-600 hover:text-gray-800 cursor-pointer transition duration-200 ease-in-out"
      >
        <ArrowBackIcon fontSize="large" />
      </div>

     
      <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
        SHA-256 Hash Generator
      </h1>

      <p className="text-lg text-gray-600 text-center max-w-2xl mb-6">
        SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that outputs a unique 256-bit value for any input. It's widely used in securing data, verifying integrity, and supporting applications like blockchain technology and digital certificates.
      </p>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 space-y-6">
       
        <textarea
          onChange={handleChange}
          value={input}
          className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-50 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out resize-none"
          placeholder="Enter text to hash..."
          rows="8"
        />

        
        <textarea
          value={output}
          className="w-full p-4 text-lg rounded-lg border-2 border-gray-300 bg-gray-100 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out resize-none"
          placeholder="Generated SHA-256 hash..."
          readOnly
          rows="8"
        />
      </div>
    </div>
  );
}

export default Sha256;
