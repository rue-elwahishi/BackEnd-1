const Post = require("../models/post");
const Event = require("../models/event");
const User = require("../models/user");

module.exports.createPost = async (req, res) => {
  try {
    var post = new Post({
      content: req.body.content,
      user: req.user._id,
      community: req.community._id,
      file: req.body.file
    });
    const onePost = await post.save();
    res.json({ success: true, result: onePost });
  } catch (err) {
    res.json({ success: false, err });
  }
};
// using for new users that didn't choose their interrest
module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostsByUserId = async (req, res, next) => {
  try {
    const posts = await Post.find({
      user: req.params.id,
      community: req.community._id
    }).populate("user");
    res.json({
      success: false,
      msg: "something went wrong",
      err
    });
  }
};
//
module.exports.getPostByEvent = async (req, res, next) => {
  try {
    let event = req.params._event;
    const posts = await Post.find({ _event: event })
      .populate("Event")
      .exec((err, posts) => console.log("posts"));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostByHobby = async (req, res, next) => {
  try {
    let hobby = req.params._hobby;
    const posts = await Post.find({ _hobby: hobby })
      .populate("Hobby")
      .exec((err, posts) => console.log("posts"));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostByUserInHobby = async (req, res, next) => {
  try {
    let user = req.params._user;
    let hobby = req.params._hobby;
    const posts = await Post.find({ _user: user, _hobby: hobby })
      .populate("User")
      .populate("Hobby")
      .exec((err, posts) => console.log(posts));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
//
module.exports.getPostByUserInEvent = async (req, res, next) => {
  try {
    let user = req.params._user;
    let event = req.params._event;
    const posts = await Post.find({ _user: user, _event: event })
      .populate("User")
      .populate("Event")
      .exec((err, posts) => console.log(posts));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }
};
