const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const cors = require('cors'); 
const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'POST', 
};

app.use(cors(corsOptions)); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Create an instance of the Express Router
const uploadRouter = express.Router();

// Client config
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

uploadRouter.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageBuffer = req.file.buffer;

  try {
    const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');

    // Translate the text to Sinhala using the Google Cloud Translation API
    const [translation] = await translate.translate(text, 'si');

    res.json({ text: translation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred during text extraction.' });
  }
});

module.exports = uploadRouter;
