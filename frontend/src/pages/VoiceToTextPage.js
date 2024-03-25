import React, { useState } from "react";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";

import "../components/fileUpload.css";

export default function VoiceToTextPage() {
  const [inputText, setInputText] = useState("");

  const handleTextToSpeech = async () => {
    console.log(inputText, "uu");
    if (inputText) {
      const requestText = { text: inputText };

      await axios
        .get(
          `http://localhost:3017/api/Text-to-Speech?text=${requestText.text}`
        )
        .then((response) => {
          console.log("Text Synthesized Successfully");
        })
        .catch((error) => {
          console.error("Text-to-Speech error:", error);
        });
    } else {
      console.error("Text-to-Speech error: No text to synthesize");
    }
  };

  return (
    <div className="pdf-Translate">
      <div className="textToSpeech">
        <div className="transbox inputtext">
          <input
            className="textToSpeech-input"
            type="text"
            name="text"
            placeholder="Enter Text"
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <button
          className="textToSpeech-button"
          onClick={() => handleTextToSpeech()}
        >
          Text to Speech
        </button>
      </div>
      <AudioPlayer />
    </div>
  );
}
