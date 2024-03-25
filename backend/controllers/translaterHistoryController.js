const translaterhistory = require("../models/translaterHistoryModel");
const translater = require("../services/translate-api");
const { format } = require("date-fns");

//-------------------------------------------- create history --------------------------------------------
const setTranslaterHistory = async (req, res) => {
  let userenterdtextlanguage;
  let translatedtext;

  const { userenterdtext, translatedtextlanguage, userid } = req.body;

  try {
    userenterdtextlanguage = await translater.detectLanguage(userenterdtext);
    console.log(
      "\n##### User entered text language : " + userenterdtextlanguage
    );

    translatedtext = await translater.translateText(
      userenterdtext,
      translatedtextlanguage
    );
    console.log("##### Translated text : " + translatedtext + "\n");
  } catch (error) {
    console.log(error);
  }

  const currentDate = new Date();

  const dateOnly = format(currentDate, "yyyy-MM-dd");

  const createdHistory = new translaterhistory({
    userenterdtext,
    userenterdtextlanguage,
    translatedtext,
    translatedtextlanguage,
    date: dateOnly,
    userid,
  });

  console.log(createdHistory);

  try {
    await createdHistory.save();
    console.log("object created");
  } catch (err) {
    console.log(err);
    console.log("error in create history");
  }

  res.status(201).json({
    translaterhistory: createdHistory,
    translatedText: translatedtext,
    userEnterdTextLanguage: userenterdtextlanguage,
  });
};

// -------------------------------------------- read history --------------------------------------------
const getTranslaterHistory = async (req, res) => {
  let items;
  const { userid } = req.query;
  console.log(userid)
  try {
    // items = await translaterhistory.find({});
    items = await translaterhistory.find({ userid: userid });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
  res.json({
    items: items.map((translaterhistory) =>
      translaterhistory.toObject({ getters: true })
    ),
  });
};

// -------------------------------------------- read one part --------------------------------------------
const getOneTranslaterHistory = async (req, res, next) => {
  const hitoryId = req.params.itemid;

  let item;
  try {
    item = await translaterhistory.findById(hitoryId);
  } catch (err) {
    console.log(err);
  }

  res.json({ item: item.toObject({ getters: true }) });
};

// -------------------------------------------- edit history --------------------------------------------

const updateTranslaterHistory = async (req, res, next) => {
  let translated_text;

  const { userenterdtext } = req.body;

  const historyId = req.params.itemid;
  let item;

  try {
    item = await translaterhistory.findById(historyId);
  } catch (err) {
    console.log(err);
  }

  let translated_text_language = item.translatedtextlanguage;

  try {
    translated_text = await translater.translateText(
      userenterdtext,
      translated_text_language
    );
    console.log("##### Translated text : " + translated_text + "\n");
  } catch (error) {
    console.log(error);
  }

  item.userenterdtext = userenterdtext;
  item.translatedtext = translated_text;

  try {
    await item.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    item: item.toObject({ getters: true }),
    translatedText: translated_text,
  });
};

// -------------------------------------------- delete one part --------------------------------------------

const deleteOneTranslationHistory = async (req, res, next) => {
  const hitoryId = req.params.itemid;

  let item;
  try {
    item = await translaterhistory.findById(hitoryId);
  } catch (err) {
    console.log(err);
  }

  try {
    await item.deleteOne();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ message: "Deleted item." });
};

// -------------------------------------------- delete all --------------------------------------------

const deleteAllTranslationHistory = async (req, res, next) => {
  try {
    await translaterhistory.deleteMany({});
  } catch (err) {
    console.log("delete error");
  }

  res.status(200).json({ message: "Deleted all items." });
};

module.exports = {
  setTranslaterHistory,
  getTranslaterHistory,
  getOneTranslaterHistory,
  updateTranslaterHistory,
  deleteOneTranslationHistory,
  deleteAllTranslationHistory,
};
