const { Hobby } = require("../models/index.js");
module.exports = async (req, res, next) => {
  try {
    if (!req.query.hobby) {
      req.hobby = await Hobby.findOne({ name: "Main" });
    } else {
      req.hobby = await Hobby.findOne({ name: req.query.hobby });
      if (!req.hobby) {
        req.hobby = await Hobby.findOne({ name: "Main" });
      }
    }
    next();
  } catch (err) {
    res.json({ success: false, err });
  }
};
