const { Following } = require("../models/index.js");
const { NotificationHandler, UserFeatures } = require('../helpers/index.js')

module.exports.follow = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id)
      res.json({ success: false, msg: "u can't follow yourself" });
    const user = req.user._id;
    const friend = req.params.id;
    const alreadyFollowing = await Following.exists({
      follower: user,
      followed: friend,
      community: req.community._id
    });
    if (!alreadyFollowing) {
      let notifier = {
        sender : user,
        receiver : friend,
        type: "follow",
        community: req.community._id
       }
       await Promise.all([
        Following.create({
           follower: user,
           followed: friend,
           community: req.community._id
         }),
         NotificationHandler.push(notifier),


       ])
      res.json({ success: true });
    } else return res.json({success:false, msg : 'already followin him'});
  } catch (err) {
    res.json({ success: false, msg: "following failed" });
  }
};
module.exports.unfollow = async (req, res) => {
  try {
    const user = req.user._id;
    const unfollowed = req.params.id;
    var found = await Following.findOneAndDelete({
      follower: user,
      followed: unfollowed,
      community: req.community._id
    });
    if(found){
      let notifier = {
        sender : user,
        receiver : unfollowed,
        type: "follow",
        community: req.community._id
       }
      await NotificationHandler.remove(notifier)

    }
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, msg: "unfollowing failed", err });
  }
};

module.exports.getFollowings = async (req, res) => {
  try {
    const follower = req.params.id;
    const result = await Following.find({
      follower,
      community: req.community._id
    })
      .populate("followed")
      .lean();
    await UserFeatures(
      result.map(following => following.followed),
      req.community,
      req.user
    );
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, msg: "failed to fetch", err : err.message });
  }
};
module.exports.getFollowers = async (req, res) => {
  try {
    const followed = req.params.id;

    const result = await Following.find({
      followed,
      community: req.community._id
    })
      .populate("follower")
      .lean();
    await UserFeatures(
      result.map(followings => followings.follower),
      req.community,
      req.user
    );

    res.json({ success: true, result});
    console.log(result);
  } catch (err) {
    res.json({ success: false, err : err.message });
  }
};

module.exports.getFriends = async (req, res) => {
  try {
    let result = await Following.aggregate().match({
      follower : req.user._id,
      community: req.community._id
    }).project({follower : "$followed", _id: false})
    result = await Following.find({$and : [{
      followed : req.user._id,
      community: req.community._id
    } , {$or : result.length? result : [{_id : null}]}]})

      .populate("follower")
      .lean();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, msg: "failed to fetch", err:err.message });
  }
};