import React, { useState } from 'react'
import axios from 'axios'
import { PDFDocument, rgb} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import './fileUpload.css'
import AudioPlayer from './AudioPlayer'

function FileUpload() {
    const [file, setFile] = useState(null)
    const [translatedText, setTranslatedText] = useState("")
    

    const handleFile = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            console.log(formData)
            await axios.post('http://localhost:3017/api/translate-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log('File uploaded successfully: ', response.data);
                setTranslatedText(response.data.data)
                console.log(translatedText)
            }).catch(error => {
                console.error("Error uploading file", error)
            })

        }
    }


    const handleDownload = async (e) => {

        const fontResponse = await fetch('/fonts/NotoSansSinhala-Regular.ttf');
        if (!fontResponse.ok) {
            console.error('Failed to fetch the font file');
            return;
        }
        const fontBytes = await fontResponse.arrayBuffer();

        const pdfDoc = await PDFDocument.create();

        pdfDoc.registerFontkit(fontkit)
        const customFont = await pdfDoc.embedFont(fontBytes);
        const page = pdfDoc.addPage([595.276, 841.890]);

        const fontSize = 14;

        page.drawText(translatedText, {
            x: 50,
            y: 841.890 - 50 - fontSize,
            size: fontSize,
            color: rgb(0, 0, 0),
            font: customFont,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sinhala_text.pdf';
        a.click();
    }



    return (
        <div>
        <div className='pdf-Translate'>
            <h2>File Translation</h2>
            <div className='getpdf'>
                {/* <div className="file-input">
                    <input className='file-input-choose-file' type='file' name='file' onChange={handleFile} />
                </div> */}
                <label className="file-input-label">
                    <span className="file-input-label-text">Choose File</span>
                    <input className='file-input-choose-file' type='file' name='file' onChange={handleFile} />
                </label>
                <div className="handle-upload">
                    <button className="handle-upload-upload-button" onClick={(e) => handleUpload(e)}>Upload</button>
                </div>
            </div>
            <div className="displayTransaltedText">
                <p>{translatedText}</p>
            </div>
            <div className="download-Pdf">
                <button className='download-Pdf-button' onClick={(e) => handleDownload(e)}>Download</button>
            </div>
            
            
        </div>
    </div>
    )
}

export default FileUpload