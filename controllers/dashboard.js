const { Post, Community, Event } = require("../models/index.js");

module.exports.getPosts = async (req, res) => {
  try {
    res.json(
      await Community.populate(
        await Post.aggregate()
          .group({
            _id: "$community",
            posts: { $sum: 1 }
          })
          .match({ _id: { $ne: null } }),
        { path: "_id" }
      )
    );
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

module.exports.getEvents = async (req, res) => {
  try {
    res.json(
      await Community.populate(
        await Event.aggregate().group({
          _id: "$community",
          events: { $sum: 1 }
        }),
        { path: "_id" }
      )
    );
  } catch (err) {
      res.json({success:false, msg: err.message})
  }
};
