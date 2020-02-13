const { Post, Community, Event, User } = require("../models/index.js");

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

module.exports.usersCount = async (req, res) => {
  try {
    res.json({
      success: true,
      result: await User.aggregate().project({
        _id: {
          $dateFromParts: {
            year: { $year: "$_id" },
            month: { $month: "$_id" },
            day: { $dayOfMonth: "$_id" }
          }
        }
      }).group({
        _id : "$_id",
        users : {$sum : 1}

      }).sort({_id : 1})
    });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};


// _id: {
//   $dateFromParts: {
//     year: { $year: "$_id" },
//     month: { $month: "$_id" },
//     day: { $dayOfMonth: "$_id" }
//   }
// }