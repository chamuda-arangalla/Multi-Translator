const {Translate} = require('@google-cloud/translate').v2;


//google api credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

//client config
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

//detect language method
const detectLanguage = async (text) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.log(`Error at detect Language --> ${error}`);
    }
}

//translate text method
const translateText = async(text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
}

module.exports = {translateText, detectLanguage}