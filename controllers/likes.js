const { Like, Dislike, Post, Notification } = require("../models/index.js");
const {NotificationHandler} = require('../helpers/index.js')
module.exports.likePost = async (req, res) => {
  try {
    let notifier = {
      sender : req.user._id,
      receiver : (await Post.findById(req.params.id).distinct("user"))[0],
      post: req.params.id,
      type: "like",
      community: req.community._id
     }
    let found = await Like.findOneAndDelete({
      post: req.params.id,
      user: req.user._id
    });
    if (found) {
      await NotificationHandler.remove(notifier)
      res.json({ success: true, removed: true });
    } else {
      await Promise.all([
         NotificationHandler.push(notifier),
         Like.create({ post: req.params.id, user: req.user._id })
      ])
      res.json({ success: true, created: true });
    }
  } catch (err) {
    res.json({ success: false, msg: "couldn't like", err });
  }
};

module.exports.likeEvent = async (req, res) => {
  try {
    var found = await Like.findOneAndDelete({
      event: req.params.id,
      user: req.user._id
    });
    if (found) {
      res.json({ success: true, removed: true });
    } else {
      await Promise.all([
        Like.create({ event: req.params.id, user: req.user._id }),
        Dislike.findOneAndDelete({ event: req.params.id, user: req.user._id })
      ]);

      res.json({ success: true, created: true });
    }
  } catch (err) {
    res.json({ success: false, msg: "couldn't like", err });
  }
};

module.exports.dislikeEvent = async (req, res) => {
  try {
    var found = await Dislike.findOneAndDelete({
      event: req.params.id,
      user: req.user._id
    });
    if (found) {
      res.json({ success: true, removed: true });
    } else {
      await Promise.all([
        Dislike.create({ event: req.params.id, user: req.user._id }),
        Like.findOneAndDelete({ event: req.params.id, user: req.user._id })
      ]);
      res.json({ success: true, created: true });
    }
  } catch (err) {
    res.json({ success: false, msg: "couldn't like", err });
  }
};

module.exports.likeComment = async (req, res) => {
  try {
    var found = await Like.findOneAndDelete({
      comment: req.params.id,
      user: req.user._id
    });
    if (found) {
      res.json({ success: true, removed: true });
    } else {
      await Like.create({ comment: req.params.id, user: req.user._id });
      res.json({ success: true, created: true });
    }
  } catch (err) {
    res.json({ success: false, msg: "couldn't like", err });
  }
};
