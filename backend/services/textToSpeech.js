const textToSpeech = require('@google-cloud/text-to-speech')

//dot env

require('dotenv').config()

const fs = require('fs')

const util = require('util')

const client = new textToSpeech.TextToSpeechClient()

exports.convertTextToMp3 = async(text) => {
    //const text = "Valar Mugulis"

    const request = {
        input: {text: text},
        voice: {languageCode: 'en-US', ssmlGender:'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'}
    }

    const [response] = await client.synthesizeSpeech(request)
    const writeFile = util.promisify(fs.writeFile)

    await writeFile("output.mp3", response.audioContent, 'binary')

    console.log("Text to Speech has completed. Audio File has been saved.")
}



