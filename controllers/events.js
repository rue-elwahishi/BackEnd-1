const {cloudinary} = require("../helpers/index.js")
const {Event, Like, Dislike} = require('../models/index.js')
module.exports.makeEvent = async (req,res)=>{
    try {
        if(req.file){
          let file;
          if(req.file.mimetype.match(/jpg|jpeg|png|gif/i)){
        file = await cloudinary.v2.uploader.upload(req.file.path)
          }
          req.body.file = file.url
        }
        req.body.community = req.community._id
        req.body.location =  JSON.parse(req.body.location)
        
        res.json({ success: true, result: await Event.create(req.body)});
      } catch (err) {
        res.json({ success: false, err });
  }
};

module.exports.showEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    await eventFeatures([event] , req.user)
    res.json({
      success: true,
      result: event
    });
  } catch (err) {
    res.json({
      success: false,
      msg: "failed to retrieve event",
      err
    });
  }
};
module.exports.showEvents = async (req, res, next) => {
  try {
    const events = await Event.find({community: req.community._id}).sort({_id : -1}).lean();
    await eventFeatures(events , req.user)

    res.json({
      success: true,
      result: events
    });
  } catch (err) {
    res.json({
      success: false,
      msg: "failed to retrieve events",
      err
    });
  }
};

module.exports.nearby = async (req, res) => {
  try {
    let result = await Event.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [36.77429914811174, 10.19528999023441]
          },
          distanceField: "dist.calculated",
          maxDistance: 2,
          includeLocs: "dist.location",
          spherical: true
        }
      },
      { $match: { community: req.community._id } }
    ]);
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, msg: "not working", err });
  }
};


async function eventFeatures(events, user) {
  async function likesCount(event) {
    event.likesCount = await Like.count({ event: event._id });
  }
  async function dislikesCount(event) {
    event.dislikesCount = await Dislike.count({ event: event._id });

  }
  async function isLiked(event) {
    event.isLiked = await Like.exists({ event: event._id, user: user._id });

  }
  async function isDisliked(event) {
    event.isDisliked = await Dislike.exists({ event: event._id, user: user._id });

  }
  
  await Promise.all(events.map(event => {
    return Promise.all([
          likesCount(event),
          isLiked(event),
          dislikesCount(event),
          isDisliked(event),
        ])
  }))

}