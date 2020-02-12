const { Notification, Post,  } = require("../models/index.js");
module.exports.get = async (req, res) => {
  try {
    var result = await Notification.find({
      receiver: req.user._id,
      community: req.community._id
    })
      .sort({ _id: -1 })
      .populate(["sender", "post", "event", "comment"]);
      res.json({success : true, result})
  }catch(err){
      res.json({success : false, msg : err.mesage})
  }
};

module.exports.likePost = async (req,res,next) =>{
    
    try {
        let receiver = (await Post.findById(req.params.id).distinct("user"))[0];
        var found = await Notification.findOneAndDelete({
            sender: req.user._id,
            receiver,
            post: req.params.id,
            type: "liked",
            community: req.community._id
          });
        if (found) {
            next()
        } else {
                await Notification.create({
                sender: req.user._id,
                receiver,
                post: req.params.id,
                type: "liked",
                community: req.community._id
              });
              next()
        }

    }catch(err){
        console.log(err)
        res.json({success : false, msg:err.message})
    }

}
module.exports.likeEvent = async () =>{
    console.log('sender,receiver,post,event,comment,type,community')
// return await Notification.create({sender,receiver,post,event,comment,type,community})
}
module.exports.dislikeEvent = async () =>{
    console.log('sender,receiver,post,event,comment,type,community')
// return await Notification.create({sender,receiver,post,event,comment,type,community})
}
module.exports.commentPost = async () =>{
    console.log('sender,receiver,post,event,comment,type,community')
// return await Notification.create({sender,receiver,post,event,comment,type,community})
}
module.exports.sharePost = async () =>{
    console.log('sender,receiver,post,event,comment,type,community')
// return await Notification.create({sender,receiver,post,event,comment,type,community})
}

