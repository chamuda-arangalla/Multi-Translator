const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyschema = new Schema({
  userenterdtext: { type: String },
  userenterdtextlanguage: { type: String },
  translatedtext: { type: String },
  translatedtextlanguage: { type: String },
  date: { type: String },
  userid: { type: String}
});

module.exports = mongoose.model("Translation_history", historyschema);
