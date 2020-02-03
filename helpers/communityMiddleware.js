const { Community } = require("../models/index.js");
module.exports = async (req, res, next) => {
  try {
    if (!req.query.community) return res.json({success : false, noCommunity : true}) 
    else {
      req.community = await Community.findOne({ name: req.query.community });
      if (!req.community)  return res.json({success : false, noCommunity : true}) 
    }
    next();
  } catch (err) {
    res.json({ success: false, err });
  }
};
