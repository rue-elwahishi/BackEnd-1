const { Following } = require("../models/index.js");

module.exports.follow = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id)
      res.json({ success: false, msg: "u can't follow yourself" });
    const user = req.user._id;
    const friend = req.params.id;
    const alreadyFollowing = await Following.exists({
      follower: user,
      followed: friend,
      community: req.community._id
    });
    if (!alreadyFollowing) {
      await Following.create({
        follower: user,
        followed: friend,
        community: req.community._id
      });
      res.json({ success: true });
    } else return;
  } catch (err) {
    res.json({ success: false, msg: "following failed" });
  }
};
module.exports.unfollow = async (req, res) => {
  try {
    const user = req.user._id;
    const unfollowed = req.params.id;
    await Following.findOneAndDelete({
      follower: user,
      followed: unfollowed,
      community: req.community._id
    });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, msg: "unfollowing failed" });
  }
};

module.exports.getFollowings = async (req, res) => {
  try {
    const follower = req.params.id;
    const result = await Following.find({
      follower,
      community: req.community._id
    }).populate("followed");
    res.json({ success: true, msg: "got all following", result });
  } catch (err) {
    res.json({ success: false, msg: "failed to fetch" });
  }
};
module.exports.getFollowers = async (req, res) => {
  try {
    const followed = req.params.id;
    const result = await Following.find({
      followed,
      community: req.community._id
    }).populate("follower");
    res.json({ success: true, msg: "got all followers", result });
  } catch (err) {
    res.json({ success: false });
  }
};
