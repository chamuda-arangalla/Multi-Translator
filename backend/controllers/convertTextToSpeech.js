const {convertTextToMp3} = require('../services/textToSpeech');
const path = require('path');


const convertTextToSpeech = async(req, res) => {
    const { text } = req.query;
    try {
        await convertTextToMp3(text);
        res.status(200).json({ message: "Text was synthesized"});
    } catch (error) {
        console.log(error)
    }
    
}

const getSpeech = async(req, res) => {
    try {
        const filePath = path.join(__dirname, '../output.mp3');
        res.sendFile(filePath);
    } catch (error) {
        console.log("Error||Speech-to-Text-Route||", error)
    }
}


module.exports = {convertTextToSpeech, getSpeech};
