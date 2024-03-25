import React, { useState, useEffect } from "react";
import { IoLanguage } from "react-icons/io5";
import { FaExchangeAlt } from "react-icons/fa";
import Spineer from "../components/Spinner";
import "./translationsarindu.css";

const Translationsarindu = () => {
  const [inputText, setInputText] = useState("");
  const [inputTextLanguage, setInputTextLanguage] = useState("");
  const [translatedtext, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(localStorage.getItem('userid'));

  },[])

  const handleTranslate = (e) => {
    if(targetLang != 0){
    e.preventDefault();
    setIsTranslating(true);

    fetch("http://localhost:3017/api/translaterhistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userenterdtext: inputText,
        translatedtextlanguage: targetLang,
        userid: user,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTranslatedText(data.translatedText);
        setInputTextLanguage(data.userEnterdTextLanguage); // Update the translated text and language

        console.log(data.translatedText); // Log the translated text
        console.log(data.userEnterdTextLanguage); // Log the translated text

        setIsTranslating(false);
      })
      .catch((error) => console.error("Translation error:", error));

      setErrorMessage('');
    }
    else{
      setErrorMessage('Please select language before translate.');
    }
  };

  const changetext = () => {
    const userinputtext = inputText;
    const userinputtextlanguage = inputTextLanguage;

    setInputText(translatedtext);
    setInputTextLanguage(targetLang);
    setTranslatedText(userinputtext);
    setTargetLang(userinputtextlanguage);
  };

  return (
    <div>
      {isTranslating && <Spineer />}
      <div className="translater-tlitle-text-box">
        <h1 className="translater-tlitle-text">Multi Translater</h1>
      </div>

      <div className="container">
        <div className="transinputtext">
          <div className="transinputtextpart1">
            {/* User entered Language: {inputTextLanguage} */}
            {errorMessage && <p>{errorMessage}</p>}

          </div>

          <div className="transinputtextpart1 gg222">
            <div className="transbox inputtext">
              <textarea
                value={inputText}
                placeholder="Enter Text here"
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          
          </div>
        </div>

        <div className="chand_button-box">
          <button
            className="btn-ad-changebutton"
            onClick={() => {
              changetext();
            }}
          >
            <FaExchangeAlt />
          </button>
        </div>

        <div className="transinputtext">
          <div className="transinputtextpart1">
            <div className="transbox1">
              <label>Target Language:</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option disabled={true} value="">
                  Choose a language
                </option>
                <option value="si">Sinhala</option>
                <option value="en">English</option>
              </select>
            </div>
            
          </div>

          <div className="transinputtextpart1 gg222">
            <div className="transbox inputtext">
              <textarea
                disabled={true}
                placeholder="Translated Text"
                value={translatedtext}
                onChange={(e) => setInputText(e.target.value)}
              />

            </div>
          </div>
        </div>
      </div>

      <button
        className={`center-button ${isTranslating ? "translating" : ""}`}
        style={{ backgroundColor: "black", color: "white" }}
        onClick={handleTranslate}
      >
        {isTranslating ? <IoLanguage className="icon" /> : "Translate"}
      </button>
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn"
            style={{ backgroundColor: "grey", color: "white" ,boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'}}
          >
            View Example Image
          </button>
      </div>
    </div>
  );
};

export default Translationsarindu;
