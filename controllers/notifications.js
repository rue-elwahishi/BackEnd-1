const { Notification, Post,  } = require("../models/index.js");
module.exports.get = async (req, res) => {
  try {
    var result = await Notification.find({
      receiver: req.user._id,
      community: req.community._id
    })
      .sort({ _id: -1 })
      .populate(["sender", "post", "event", "comment", "reply"])
      .lean();
      var unseenCount = await Notification.count({
        receiver: req.user._id,
        community: req.community._id,
        seen : false
      })
      res.json({success : true, result, unseenCount})
  }catch(err){
      res.json({success : false, msg : err.mesage})
  }
};


module.exports.seen = async (req, res) => {
    try {
        await Notification.updateMany({receiver : req.user._id, community: req.community._id},{$set : {seen:true}})
        res.json({success : true})
    }catch(err){
        res.json({success : false, msg : err.mesage})
    }
  };
  
  module.exports.invite = async (req, res) => {
    try {
      await Notification.create(req.body.invite.map(one => {
        return {
          sender : req.user._id,
          receiver : one,
          event : req.params.id,
          type: "invite",
          community: req.community._id
         }
      }))
        res.json({success : true})
    }catch(err){
        res.json({success : false, msg : err.mesage})
    }
  };