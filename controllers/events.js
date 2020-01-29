const { cloudinary } = require("../helpers/index.js");
const { Event } = require("../models/index.js");
module.exports.makeEvent = async (req, res) => {
  try {
    if (req.file) {
      let file;
      if (req.file.mimetype.match(/jpg|jpeg|png|gif/i)) {
        file = await cloudinary.v2.uploader.upload(req.file.path);
      }
      req.body.file = file.url;
    }
    req.body.location = JSON.parse(req.body.location);

    res.json({ success: true, result: await Event.create(req.body) });
  } catch (err) {
    res.json({ success: false, err });
  }
};

module.exports.showEvent = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};

module.exports.showEvent = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
