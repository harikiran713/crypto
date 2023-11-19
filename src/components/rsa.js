import React, { useState } from "react";
import JSEncrypt from "jsencrypt";
import "../css_files/rsa.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Home from "./home";

function Rsa() {
  const [redirecttohome, setredirecttohome] = useState(false);

  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [keySize, setKeySize] = useState(512); // Set a default key size
  const [manualPublicKey, setManualPublicKey] = useState("");
  const [plainText, setPlainText] = useState("");
  const [manualPrivateKey, setManualPrivateKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [result, setResult] = useState("");

  const generateKeys = () => {
    const encryptor = new JSEncrypt({ default_key_size: keySize });

    const publicKey = encryptor
      .getPublicKey()
      .replace(/\r?\n|\r/g, "")
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "");

    const privateKey = encryptor
      .getPrivateKey()
      .replace(/\r?\n|\r/g, "")
      .replace("-----BEGIN RSA PRIVATE KEY-----", "")
      .replace("-----END RSA PRIVATE KEY-----", "");

    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`${text} copied to clipboard!`);
      })
      .catch((error) => {
        console.error("Copy to clipboard failed: ", error);
      });
  };

  const copyPublicKey = () => {
    copyToClipboard(publicKey);
  };

  const copyPrivateKey = () => {
    copyToClipboard(privateKey);
  };

  const setManualPublicKeyHandler = (e) => {
    setManualPublicKey(e.target.value);
  };

  const setPlainTextHandler = (e) => {
    setPlainText(e.target.value);
  };

  const setManualPrivateKeyHandler = (e) => {
    setManualPrivateKey(e.target.value);
  };

  const setEncryptedTextHandler = (e) => {
    setEncryptedText(e.target.value);
  };

  const copyResult = () => {
    copyToClipboard(result);
  };

  const encrypt = () => {
    const encryptor = new JSEncrypt({ default_key_size: keySize });
    encryptor.setPublicKey(manualPublicKey);

    const plainText = document.getElementById("plain-text").value;
    const encryptedText = encryptor.encrypt(plainText);

    setEncryptedText(encryptedText);
    setResult(encryptedText);
  };

  const decrypt = () => {
    const rsaDecryptor = new JSEncrypt();
    rsaDecryptor.setPrivateKey(manualPrivateKey);

    const encryptedText = document.getElementById("encrypted-text").value;
    const decryptedText = rsaDecryptor.decrypt(encryptedText);

    if (decryptedText === false) {
      alert(
        "Decryption failed. Please check your private key and encrypted text."
      );
    } else {
      setEncryptedText(encryptedText);
      setResult(decryptedText);
    }
  };
  const go_back = () => {
    setredirecttohome(true);
    };
    if (redirecttohome) {
      return <Home />;
  }

  return (
    <>
    <div onClick={go_back} className="go_back_rsa"><ArrowBackIcon/></div>
      <div className="overall_back_div">
        <div className="key_gen_back">
          <h2 className="key_generate_head">Generate RSA Keys</h2>
          <label className="select_size" id="key_size" htmlFor="key-size">
            Select RSA Key Size
          </label>
          <select
            className="select_bar"
            id="key-size"
            onChange={(e) => setKeySize(parseInt(e.target.value))}
          >
            <option value="512">512 bits</option>
            <option value="1024">1024 bits</option>
            <option value="2048">2048 bits</option>
            <option value="3072">3072 bits</option>
            <option value="4096">4096 bits</option>
          </select>
          <button className="generate_key" onClick={generateKeys}>
            Generate RSA Key Pair
          </button>

          <div className="key_gen_pub_pri">
            <div className="inner_key_gen">
              <div className="row_copy_gen">
                <label className="key_head" htmlFor="public-key">
                  Public Key
                </label>
                <button className="copy" onClick={copyPublicKey}>
                  Copy
                </button>
              </div>
              <textarea
                className="key_box box1"
                id="public-key"
                readOnly
                value={publicKey}
                placeholder="Your public key will appear here"
              ></textarea>
            </div>

            <div className="inner_key_gen">
              <div className="row_copy_gen">
                <label className="key_head" htmlFor="private-key">
                  Private Key
                </label>
                <button className="copy" onClick={copyPrivateKey}>
                  Copy
                </button>
              </div>
              <textarea
                className="key_box box1"
                id="private-key"
                readOnly
                value={privateKey}
                placeholder="Your private key will appear here"
              ></textarea>
            </div>
          </div>
          <p className="desc_rsa">
            <h2 className="desc_head">Encryption</h2>
            <br></br>
            RSA encryption uses the recipient's public key to transform plaintext into secure ciphertext. The sender obtains the public key, breaks the message into numerical blocks, and applies modular arithmetic to generate the encrypted data.
            <br></br>
            <h2 className="desc_head">Decryption</h2>
            <br></br>
            RSA decryption, done with the recipient's private key, reverses the process. The ciphertext is decrypted using the private key, revealing the original plaintext. RSA's security rests on the challenge of factoring large primes, ensuring secure communication and data protection.
          </p>
        </div>

        <div className="temp">
          <h1 className="encrypt_decrypt_head">
            RSA Encryption and Decryption
          </h1>

          <div className="rsa_enc_dec_back">
            <div className="rsa_enc_dec_in">
              <h2 className="rsa_en_de_head">RSA Encryption</h2>
              <label className="select_size label2" htmlFor="manual-public-key">
                Enter Public Key
              </label>
              <textarea
                className="key_box size2"
                id="manual-public-key"
                rows="1"
                cols="50"
                value={manualPublicKey}
                onChange={setManualPublicKeyHandler}
                placeholder="Enter Public Key"
              ></textarea>

              <label className="select_size label2" htmlFor="plain-text">
                Plain Text
              </label>
              <textarea
                className="key_box size2"
                id="plain-text"
                rows="4"
                cols="50"
                value={plainText}
                onChange={setPlainTextHandler}
                placeholder="Enter Plain Text..."
              ></textarea>
              <button className="generate_key second" onClick={encrypt}>
                Encrypt
              </button>
            </div>

            <div className="rsa_enc_dec_in">
              <h2 className="rsa_en_de_head">RSA Decryption</h2>
              <label
                className="select_size label2"
                htmlFor="manual-private-key"
              >
                Enter Private Key
              </label>
              <textarea
                className="key_box size2"
                id="manual-private-key"
                rows="1"
                cols="50"
                value={manualPrivateKey}
                onChange={setManualPrivateKeyHandler}
                placeholder="Enter Private Key"
              ></textarea>

              <label className="select_size label2" htmlFor="encrypted-text">
                RSA Encrypted Text
              </label>
              <textarea
                className="key_box size2"
                id="encrypted-text"
                rows="4"
                cols="50"
                value={encryptedText}
                onChange={setEncryptedTextHandler}
                placeholder="Enter Encrypted Text..."
              ></textarea>
              <button className="generate_key second" onClick={decrypt}>
                Decrypt
              </button>
            </div>
          </div>
          <h2 className="label_output">Result</h2>
          <textarea
            className="result_output"
            id="result"
            rows="4"
            cols="40"
            readOnly
            value={result}
          ></textarea>
          <button className="result_but" onClick={copyResult}>
            Copy Result
          </button>
        </div>
      </div>
    </>
  );
}

export default Rsa;
