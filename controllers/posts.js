const { Post, Following, Like, Comment,User } = require("../models/index.js");
const {commentFeatures} = require('./comments.js')
const { cloudinary } = require("../helpers/index.js");
const {NotificationHandler} = require('../helpers/index.js')

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

    let result = await post.save();
    result = (await User.populate(result, {path : 'user'})).toObject()
    await postFeatures([result], req.user)
    res.json({ success: true, result  });
  } catch (err) {
    res.json({ success: false, err:err.message });
  }
};

module.exports.remove = async (req,res)=>{
  try{
    let notifier;
    var post = await Post.findById(req.params.id)
    if(req.user._id.toString() !=  post.user.toString()) return res.json({success : false})
    post.deactivated = true
    if(post.sharedpost){
      notifier = {
        sender : req.user._id,
        receiver : (await Post.findById(post.sharedpost).distinct("user"))[0],
        post: post.sharedpost,
        type: "share",
        community: req.community._id
       }
    }
    await Promise.all([
      post.save(),
      NotificationHandler.remove(notifier)
    ])
    res.json({success : true})
  }catch (err) {
    res.json({ success: false, err:err.message });
  }
}

module.exports.createEventPost = async (req, res) => {
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
      event: req.params.id,
      file: req.body.file
    });
    
    let result = await post.save();
    result = (await User.populate(result, {path : 'user'})).toObject()
    await postFeatures([result], req.user)
    res.json({ success: true, result  });
  } catch (err) {
    res.json({ success: false, err });
  }
};

module.exports.sharePost = async (req, res) => {

  let notifier = {
    sender : req.user._id,
    receiver : (await Post.findById(req.params.id).distinct("user"))[0],
    post: req.params.id,
    type: "share",
    community: req.community._id
   }


  try {
    var post = new Post({
      content: req.body.content,
      user: req.user._id,
      community: req.community._id,
      sharedpost: req.params.id
    });

    let result = await post.save();
    result = await Post.findById(result._id)
    .populate(["user", { path: "sharedpost", populate: { path: "user" } }])
    .lean();
    await Promise.all([
       postFeatures([result], req.user),
       NotificationHandler.push(notifier)

    ])

    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, err:err.message });
  }
};

// using for new users that didn't choose their interrest
module.exports.getPosts = async (req, res, next) => {
  console.log(req.body);
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
          $and: [{ $or: mapped }, { community: communityId, deactivated: false }]
        })
          .sort({ _id: -1 })
          .limit(20)
          .skip(Number(req.query.page || 0))
          .lean()
          .populate([
            "user",
            { path: "sharedpost", populate: { path: "user" } }
          ])
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

module.exports.getPost = async (req, res, next) => {
  try {
    let post = await Post.findOne({_id : req.params.id, deactivated:false})
          .lean()
          .populate(['user', {path : 'sharedpost' , populate:{path : 'user'}}])
    post.comments = await Comment.find({ post: post._id,deactivated: false }).sort({_id : -1}).populate('user')
    .limit(5).lean()
    await Promise.all([postFeatures([post], req.user), commentFeatures(post.comments,req.user)])
    
    res.json({ success : true, result : post });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message
    });
  }
};

//get post by event id
module.exports.getPostsByUserId = async (req, res, next) => {
  try {
    let posts = await Post.find({
      user: req.params.id,
      community: req.community._id,
      deactivated: false
    }).sort({ _id: -1 })
    .lean()
    .limit(5)
    .skip(Number(req.query.page || 0))
    .populate(['user', {path : 'sharedpost' , populate:{path : 'user'}}])
    await postFeatures(posts, req.user)
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
    const posts = await Post.find({ event: req.params.id });
    res.json({
      success: true,
      result: posts
    });
  } catch (err) {
    res.json({
      success: false,
      msg: "failed to retrieve posts",
      err
    });
  }
};
//

module.exports.getPostsByEvent = async (req, res, next) => {
  try {
    const posts = await Post.find({ event: req.params.id })
      .sort({ _id: -1 })
      .lean()
      .populate(["user", { path: "sharedpost", populate: { path: "user" } }]);

    await postFeatures(posts, req.user);
    res.json({ success: true, result: posts });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message
    });
  }
};




async function postFeatures(posts, user) {
  async function commentsCount(post) {
    post.commentsCount = await Comment.count({ post: post._id, deactivated:false });
  }
  async function likesCount(post) {
    post.likesCount = await Like.count({ post: post._id });
  }
  async function isLiked(post) {
    post.isLiked = await Like.exists({ post: post._id, user: user._id });
  }
  async function isShared(post){
    post.isShared = await Post.exists({user:user._id, sharedpost : post._id, deactivated : false })
  }
  async function sharesCount(post){
    post.sharesCount = await Post.count({sharedpost : post._id, deactivated : false })
  }
  await Promise.all(
    posts.map(post => {
      return Promise.all([
        commentsCount(post),
        likesCount(post),
        isLiked(post),
        isShared(post),
        sharesCount(post)
      ]);
    })
  );
}
