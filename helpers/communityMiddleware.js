const { Community } = require("../models/index.js");
module.exports = async (req, res, next) => {
  try {
    if (!req.query.community) {
      req.community = await Community.findOne({ name: "Main" });
    } else {
      req.community = await Community.findOne({ name: req.query.community });
      if (!req.community) {
        req.community = await Community.findOne({ name: "Main" });
      }
    }
    next();
  } catch (err) {
    res.json({ success: false, err });
  }
};
