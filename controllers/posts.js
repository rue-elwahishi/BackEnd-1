const { Post, Following, Like, Comment } = require("../models/index.js");

const { cloudinary } = require("../helpers/index.js");

module.exports.createPost = async (req, res) => {
  try {
    if (req.file) {
      let file;
      if (req.file.mimetype.match(/mp4|mkv|avi/i)) {
        file = await cloudinary.v2.uploader.upload(req.file.path, {
          resource_type: "video"
        });
      } else if (req.file.mimetype.match(/jpg|jpeg|png|gif/i)) {
        file = await cloudinary.v2.uploader.upload(req.file.path);
      }
      req.body.file = file.url;
    }
    var post = new Post({
      content: req.body.content,
      user: req.user._id,
      community: req.community._id,
      file: req.body.file
    });

    const result = await post.save();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, err });
  }
};
// using for new users that didn't choose their interrest
module.exports.getPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const communityId = req.community._id;
    let users = await Following.find({
      follower: userId,
      community: communityId
    }).select("followed");
    var mapped = users.map(one => {
      return { user: one.followed };
    });

    mapped.push({ user: userId });
    let posts = mapped.length
      ? await Post.find({
          $and: [{ $or: mapped }, { community: communityId }]
        })
          .sort({ _id: -1 })
          .lean()
          .populate("user")
      : [];
    await postFeatures(posts, req.user);
    res.json({ posts });
  } catch (err) {
    res.json({
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
      success: true,
      result: posts
    });
  } catch (err) {
    res.json({ success: false, msg: "failed to fetch posts", err });
  }
};
//
module.exports.getPostByEvent = async (req, res, next) => {
  try {
    let event = req.event;
    const posts = await Post.find({ event }).populate("Event");
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
    let hobby = req.community;
    const posts = await Post.find({ community })
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
    let user = req.user;
    let hobby = req.community;
    const posts = await Post.find({ user, community })
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
  // try {
  //   let user = req.params._user;
  //   let event = req.params._event;
  //   const posts = await Post.find({ user: user, event: event })
  //     // .populate(["User"])
  //     .exec((err, posts) => console.log(posts));
  //   res.status(200).json({
  //     success: false,
  //     msg: err.message
  //   });
  // } catch {
  //   res.status(400).json({
  //     success: false,
  //     msg: err.message
  //   });
  // }
};

async function postFeatures(posts, user) {
  async function commentsCount(post) {
    post.commentsCount = await Comment.count({ post: post._id });
  }
  async function likesCount(post) {
    post.likesCount = await Like.count({ post: post._id });
  }
  async function isLiked(post) {
    post.isLiked = await Like.exists({ post: post._id, user: user._id });
  }
  await Promise.all(posts.map(post => {
    return Promise.all([
          commentsCount(post),
          likesCount(post),
          isLiked(post)
        ])
  }))
  // let Promises = []
  // for (let i = 0; i < posts.length; i++) {
  //   console.log('hi')
  //  await Promise.all([
  //         commentsCount(posts[i]),
  //         likesCount(posts[i]),
  //         isLiked(posts[i])
  //       ])
  // }
  // for (let i = 0; i < posts.length; i++) {
  //   Promises.push(Promise.all([
  //     commentsCount(posts[i]),
  //     likesCount(posts[i]),
  //     isLiked(posts[i])
  //   ]));
  // }
  // await Promise.all(Promises)
}
