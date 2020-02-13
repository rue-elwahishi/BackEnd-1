const { Community } = require("../models/index.js");

module.exports.getCommunities = async (req, res) => {
  try {
    const result = await Community.find({deactivated: false});
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: true, msg: err.message });

  }}

module.exports.valid = async (req, res) =>
  res.json({ success: true, community: req.community });
