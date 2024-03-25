const pdfParse = require('pdf-parse')
const {translateText} = require('../services/translate-api')
const multer = require('multer')

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}) 

//pdf stuff
exports.getPdf = async (req, res) => {   
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const uploadedFile = req.file.buffer;

    try {
        const result = await pdfParse(uploadedFile);
        const translatedText = await translateText(result.text, 'si');
        res.status(200).json({ message: "File Uploaded Successfully", data: translatedText });
    } catch (error) {
        // Handle any errors that occur during parsing or translation
        console.error(error);
        res.status(500).json({ error: 'An error occurred in the reading PDF' });
    }
}

exports.downloadPdf = async(req, res) => {
    res.download('../pdfs/forge.png')
}
