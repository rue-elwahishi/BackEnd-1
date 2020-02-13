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
    res.json({ success: false, msg: err.message });
  }
};

module.exports.createCommunity = async (req, res) => {
  try {
    const community = await Community.findOne({ name: req.body.name });
    if (community) {
      return res.json("community available");
    } else {
      const result = await Community.create({ name: req.body.name });
      res.json({ success: true, result });
    }
  } catch (err) {
    res.json({ success: true, err: err.message });
  }
};

module.exports.deactivate = async (req, res) => {
  try {
    const result = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: { deactivated: true }
      },
      { new: true }
    );
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: true, msg: err.message });
  }
};

module.exports.activate = async (req, res) => {
  try {
    const result = await Community.findByIdAndUpdate(
      req.params.id,
      {
        $set: { deactivated: false }
      },
      { new: true }
    );
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};
module.exports.getCommunities = async (req, res) => {
  try {
    res.json({ success: true, result: await Community.find({}) });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err });
  }
};
