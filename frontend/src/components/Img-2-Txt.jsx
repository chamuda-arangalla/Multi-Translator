import React, { useState } from 'react';
import Spineer from "./Spinner";

function ImgToTxt() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file before translating.');
      return;
    }

    setIsTranslating(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:3017/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setText(result.text);
        setError('');
        setIsTranslating(false);
      } else {
        const errorMessage = await response.text();
        setError('Error uploading image: ' + errorMessage);
        console.error('Error uploading image:', errorMessage);
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="App">
      {isTranslating && <Spineer />}

      <div className="translater-tlitle-text-box">
        <h1 className='translater-tlitle-text'>Image to Text Translator</h1>
      </div>

      <div className="container">
        <div className='transinputtext'>
          <div className='transinputtextpart1 imagtotextpage'>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <div className='transinputtext'>
          <div className='transinputtextpart1 gg222'>
            {error && <p className="error">{error}</p>}
            <div className='transbox inputtext'>
              <textarea disabled="true" placeholder="Translated Text :" value={text}/>
            </div>
          </div>
        </div>
      </div>

      <button className="center-button" onClick={handleUpload}> Translate </button>
    </div>
  );
}

export default ImgToTxt;
