const Post = require("../models/post");
const Event = require("../models/Event")
const User = require("../models/user")

// using for new users that didn't choose their interrest
exports.getPosts = async (req, res, next) => {
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
exports.getPostsByUser = async (req, res, next) => {
  try {
    let user_id = req.params.id;
    const posts = await Post.find({_user:user_id})
      .populate("User")
      .exec((err, posts) => console.log("posts"));
    res.status(200).json({
        success = ture,
        data: posts 
    });
  } catch {
      res.status(400).json({
          success: false,
          msg: err.message
      })
  }
};
// 
exports.getPostByEvent = async (req, res, next) => {
  try { let event = req.params._event ;
    const posts = await Post.find({_event: event})
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
    })
}
};
// 
exports.getPostByHobby = async (req, res, next) => {
  try{
    let hobby = req.params._hobby;
    const posts = await Post.find({_hobby:hobby})
    .populate("Hobby")
    .exec((err, posts) => console.log("posts"));
    res.status(200).json({
      success: false,
      msg: err.message
    });
  } catch{
    res.status(400).json({
      success: false,
      msg: err.message
  })
  }

};
// 
exports.getPostByUserInHobby = async (req, res, next) => {
  try{
    let user = req.params._user;
    let hobby = req.params._hobby ;
    const posts = await Post.find({_user: user , _hobby: hobby})
    .populate("User")
    .populate("Hobby")
    .exec((err, posts)=> console.log(posts))
    res.status(200).json({
      success: false,
      msg: err.message
    });

  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
  })
  }
};
// 
exports.getPostByUserInEvent = async (req, res, next) => {
  try{
    let user = req.params._user;
    let event = req.params._event ;
    const posts = await Post.find({_user: user , _event: event})
    .populate("User")
    .populate("Event")
    .exec((err, posts)=> console.log(posts))
    res.status(200).json({
      success: false,
      msg: err.message
    });

  } catch {
    res.status(400).json({
      success: false,
      msg: err.message
  })
  }
};
