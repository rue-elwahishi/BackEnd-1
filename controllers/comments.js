
const commentSchema = require("../models/comment");

const {Comment, User, Like,Post} = require("../models/index.js");
const {NotificationHandler} = require('../helpers/index.js')


//create new comment
module.exports.createComment = async (req, res) => {
  try {
    if(!req.body.content) throw new Error('you have to write something')
    var comment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: req.params.id
    });
    let result = await comment.save();
    result.user = await User.findById(result.user)
        let notifier = {
          sender : req.user._id,
          receiver : (await Post.findById(req.params.id).distinct("user"))[0],
          post: req.params.id,
          type: "comment",
          comment:result,
          community: req.community._id
         }
    await NotificationHandler.push(notifier),

    res.json({ success: true, result });
  } catch (err) {
    console.log(err)
    res.json({ success: false, err });
  }
};


module.exports.createReply = async (req, res) => {
  try {
    if(!req.body.content) throw new Error('you have to write something')
    var comment = new Comment({
      content: req.body.content,
      user: req.user._id,
      parentComment: req.params.id
    });
    let result = await comment.save();
    result.user = await User.findById(result.user)
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, message : err.message });
  }
};


//display comment
module.exports.displayAll = async (req, res) => {
  try {
    var comments = await Comment.find({ post: req.params.id, deactivated: false })
      .limit(10)
      .populate('user')
      .sort({_id : -1})
      .skip(Number(req.query.skip || 0))
      .lean();
      await commentFeatures(comments, req.user)
    res.json({ success: true, result: comments });
  } catch (err) {
    res.json({ success: false, msg : err.message });
  }
};

module.exports.displayReply = async (req, res) => {
  try {
    var comments = await Comment.find({ parentComment: req.params.id })
      .limit(10)
      .populate('user')
      .sort({_id : -1})
      .skip(Number(req.query.skip || 0))
      .lean();
      await commentFeatures(comments, req.user)
    res.json({ success: true, result: comments });
  } catch (err) {
    res.json({ success: false, msg : err.message });
  }
};

//update comment
module.exports.updateComment = (req, res) => {
  try {
    var comments = Comment.update(
      { id: req.params.id },
      { $set: { content: req.body.content } }
    );
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ success: false, err });
  }
};

//delete comment
module.exports.remove = async (req,res)=>{
  try{
    
    let comment = await Comment.findById(req.params.id)
    if(req.user._id.toString() !=  comment.user.toString()) return res.json({success : false})
    comment.deactivated = true
     let notifier = {
      sender : req.user._id,
      receiver : (await Post.findById(comment.post).distinct("user"))[0],
      post: comment.post,
      type: "comment",
      comment:comment._id,
      community: req.community._id
     }
    
    await Promise.all([
      comment.save(),
      NotificationHandler.remove(notifier)
    ])
    res.json({success : true})
  }catch (err) {
    res.json({ success: false, err:err.message });
  }
}



var commentFeatures = module.exports.commentFeatures = async (comments, user)=> {
  async function commentsCount(comment) {
    comment.commentsCount = await Comment.count({ parentComment: comment._id });
  }
  async function likesCount(comment) {
    comment.likesCount = await Like.count({ comment: comment._id });
  }
  async function isLiked(comment) {
    comment.isLiked = await Like.exists({ comment: comment._id, user: user._id });
  }

  await Promise.all(comments.map(comment => {
    return Promise.all([
          commentsCount(comment),
          likesCount(comment),
          isLiked(comment),
        ])
  }))

}

