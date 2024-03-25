const {getPdf, downloadPdf} = require('../controllers/pdfController')
const {convertTextToSpeech,getSpeech} = require('../controllers/convertTextToSpeech')

const router = require('express').Router()
//multer config
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}) 


//Routes
//pdf 
router.post('/api/translate-pdf', upload.single('file'),getPdf)
router.get('/api/download-pdf', downloadPdf)
router.get('/api/SpeechFromText', getSpeech)
router.get('/api/Text-to-Speech', convertTextToSpeech)

module.exports = router;