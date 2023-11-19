import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "../css_files/triple_des.css"; // Make sure to import your CSS file
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Home from "./home";

function Des() {
  const [redirecttohome, setredirecttohome] = useState(false);
  
  const [encryptText, setEncryptText] = useState("");
  // eslint-disable-next-line
  const [encryptMode, setEncryptMode] = useState("ECB");
  const [encryptKey, setEncryptKey] = useState("");
  const [outputFormat, setOutputFormat] = useState("Base64");
  const [encryptResult, setEncryptResult] = useState("");

  const [decryptText, setDecryptText] = useState("");
  // eslint-disable-next-line
  const [decryptMode, setDecryptMode] = useState("ECB");
  const [decryptKey, setDecryptKey] = useState("");
  const [inputFormat, setInputFormat] = useState("Base64");
  const [decryptResult, setDecryptResult] = useState("");

  const encrypt = () => {
    const keyArray = CryptoJS.enc.Utf8.parse(encryptKey);
    const encrypted = CryptoJS.TripleDES.encrypt(encryptText, keyArray, {
      mode: CryptoJS.mode[encryptMode],
      padding: CryptoJS.pad.Pkcs7,
      keySize: 192 / 32, // 192 bits key size for Triple DES
    });

    let encryptedResult;

    if (outputFormat === "Base64") {
      encryptedResult = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    } else if (outputFormat === "Hex") {
      encryptedResult = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    }

    setEncryptResult(encryptedResult);
  };

  const decrypt = () => {
    const keyArray = CryptoJS.enc.Utf8.parse(decryptKey);

    let decryptedResult;

    if (inputFormat === "Base64") {
      decryptedResult = CryptoJS.TripleDES.decrypt(
        { ciphertext: CryptoJS.enc.Base64.parse(decryptText) },
        keyArray,
        {
          mode: CryptoJS.mode[decryptMode],
          padding: CryptoJS.pad.Pkcs7,
          keySize: 192 / 32, // 192 bits key size for Triple DES
        }
      );
    } else if (inputFormat === "Hex") {
      decryptedResult = CryptoJS.TripleDES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(decryptText) },
        keyArray,
        {
          mode: CryptoJS.mode[decryptMode],
          padding: CryptoJS.pad.Pkcs7,
          keySize: 192 / 32, // 192 bits key size for Triple DES
        }
      );
    }

    setDecryptResult(decryptedResult.toString(CryptoJS.enc.Utf8));
  };
  const go_back = () => {
    setredirecttohome(true);
    };
    if (redirecttohome) {
      return <Home />;
  }

  return (
    <div>
      <div onClick={go_back} className="go_back_des"><ArrowBackIcon/></div>
      <div className="parent_des">
        <h1 className="des_head">Triple DES Encryption/Decryption</h1>
        <p className="des_head_desc">
          Triple DES (Data Encryption Standard) is a symmetric-key block cipher
          algorithm used for encryption and decryption of electronic data. It is
          an enhanced version of the original DES algorithm, designed to provide
          a higher level of security. DES was widely used for many years, but as
          computers became more powerful, it became susceptible to brute-force
          attacks.
        </p>
        <div className="en_de_div_back">
          {/* Encryption Section */}
          <div className="in_en_de_des">
            <p className="desc_des">
              <h2 className="des_en_de_head">Encryption</h2>
              Triple DES (3DES) is a symmetric-key block cipher that enhances
              security by applying the Data Encryption Standard (DES) algorithm
              three times successively with three separate 56-bit keys. This
              triple-layered encryption process provides improved resistance
              against cryptographic attacks. Despite its history, Triple DES is
              phased out for more efficient encryption like AES.
            </p>

            <label className="label label2" htmlFor="encrypt-text">
              Enter text to be Encrypted
            </label>
            <textarea
              className="box_input"
              id="encrypt-text"
              rows="3"
              cols="50"
              value={encryptText}
              onChange={(e) => setEncryptText(e.target.value)}
              placeholder="Enter Plain Text..."
            ></textarea>

            <label className="label" htmlFor="secret-key">
              Enter Secret Key
            </label>
            <input
              className="simple_input"
              type="text"
              id="secret-key"
              value={encryptKey}
              onChange={(e) => setEncryptKey(e.target.value)}
              placeholder="Enter Secret Key"
            />

            <label className="label" htmlFor="output-format">
              Output Text Format:
            </label>
            <select
              className="simple_input simple2"
              id="output-format"
              onChange={(e) => setOutputFormat(e.target.value)}
              value={outputFormat}
            >
              <option value="Base64">Base64</option>
              <option value="Hex">Hex</option>
            </select>

            <button className="output_des" onClick={encrypt}>
              Triple DES Encrypted Output
            </button>
            <textarea
              className="box_input"
              id="encrypt-result"
              rows="3"
              cols="50"
              value={encryptResult}
              placeholder="Encryption Result..."
              readOnly
            ></textarea>
          </div>
          {/* <hr /> */}

          {/* Decryption Section */}
          <div className="in_en_de_des">
            <p className="desc_des">
              <h2 className="des_en_de_head">Decryption</h2>
              Triple DES decryption, the reverse sequence is applied: decryption
              with the third key, encryption with the second key, and finally,
              decryption with the first key. This triple-layered approach
              strengthens security, but Triple DES is gradually being replaced
              by more efficient and modern encryption standards like the
              Advanced Encryption Standard (AES).
            </p>

            <label className="label label2" htmlFor="decrypt-text">
              Enter text to be Decrypted
            </label>
            <textarea
              className="box_input"
              id="decrypt-text"
              rows="3"
              cols="50"
              value={decryptText}
              onChange={(e) => setDecryptText(e.target.value)}
              placeholder="Enter Encrypted Text..."
            ></textarea>

            <label className="label" htmlFor="decrypt-key">
              Enter Secret Key
            </label>
            <input
              className="simple_input"
              type="text"
              id="decrypt-key"
              value={decryptKey}
              onChange={(e) => setDecryptKey(e.target.value)}
              placeholder="Enter Secret Key"
            />

            <label className="label" htmlFor="input-format">
              Input Text Format:
            </label>
            <select
              className="simple_input simple2"
              id="input-format"
              onChange={(e) => setInputFormat(e.target.value)}
              value={inputFormat}
            >
              <option value="Base64">Base64</option>
              <option value="Hex">Hex</option>
            </select>

            <button className="output_des" onClick={decrypt}>
              Triple DES Decrypted Output
            </button>
            <textarea
              className="box_input"
              id="decrypt-result"
              rows="3"
              cols="50"
              value={decryptResult}
              placeholder="Decryption Result..."
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Des;
