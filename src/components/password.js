import React, { useState } from "react";
import "../css_files/password.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Home from "./home";

function Password() {
  const [redirecttohome, setredirecttohome] = useState(false);
  function generatePassword() {
    const length = parseInt(document.getElementById("passwordLength").value);
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSpecialChars = document.getElementById("specialChars").checked;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?";

    let validChars = "";

    if (includeUppercase) {
      validChars += uppercaseChars;
    }

    if (includeLowercase) {
      validChars += lowercaseChars;
    }

    if (includeNumbers) {
      validChars += numberChars;
    }

    if (includeSpecialChars) {
      validChars += specialChars;
    }

    if (validChars === "") {
      alert("Please select at least one character type.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars.charAt(randomIndex);
    }
    // document.getElementById("generated_id").style.display = "flex";
    document.getElementById("password_output").textContent = password;
  }
  const go_back = () => {
    setredirecttohome(true);
    };
    if (redirecttohome) {
      return <Home />;
  }

  return (
    <>
    <div onClick={go_back} className="back_button"><ArrowBackIcon/></div>
      <p className="pass_head">Password Generator</p>
      <p className="pass_details">
        It helps enhance online security by generating complex passwords that
        are difficult for hackers to guess, thereby protecting sensitive
        accounts and data. You can customize password length and include various
        character types such as uppercase letters, lowercase letters, numbers,
        and special characters to meet specific security requirements.
      </p>
    
      <div className="parent_pass_back">
      <div className="parent_password">
        <div className="row_div">
          <label className="length" htmlFor="passwordLength">
            Password Length :
          </label>
          <input
            className="length_box"
            type="number"
            id="passwordLength"
            min="1"
            defaultValue="12"
          />
        </div>

        <br />
        <br />

        <div className="row_div">
          <input className="checkbox" type="checkbox" id="uppercase" />
          <label className="label_checkbox" htmlFor="uppercase">
            Include Uppercase Letters
          </label>
        </div>

        <br />

        <div className="row_div">
          <input className="checkbox" type="checkbox" id="lowercase" />
          <label className="label_checkbox" htmlFor="lowercase">
            Include Lowercase Letters
          </label>
        </div>

        <br />

        <div className="row_div">
          <input className="checkbox" type="checkbox" id="numbers" />
          <label className="label_checkbox" htmlFor="numbers">
            Include Numbers
          </label>
        </div>

        <br />

        <div className="row_div">
          <input className="checkbox" type="checkbox" id="specialChars" />
          <label className="label_checkbox" htmlFor="specialChars">
            Include Special Characters
          </label>
        </div>

        <br />
        <br />

        <button onClick={generatePassword} className="generate">
          Generate Password
        </button>
        </div>

        <br />
        <br />

        <div className="result">
          <p id="generated_id" className="generated">
            Generated Password 
          </p>
          <textarea
            id="password_output"
            rows="4"
            cols="40"
            readOnly
          ></textarea>
        </div>
        </div>
    </>
  );
}
export default Password;
