const { Community } = require("../models/index.js");

module.exports.getCommunities = async (req, res) => {
  console.log(req.header);
  try {
    res.json({ success: true, result: await Community.find({}) });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err });
  }
};
module.exports.valid = async (req, res) =>
  res.json({ success: true, community: req.community });
