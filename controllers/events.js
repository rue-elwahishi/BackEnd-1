const {cloudinary} = require("../helpers/index.js")
const {Event, Like, Dislike, Participation} = require('../models/index.js')
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
        let event = (await Event.create(req.body)).toObject()
        await eventFeatures([event], req.user)
        res.json({ success: true, result:event });
      } catch (err) {
        res.json({ success: false, err });
  }
};

module.exports.showEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).lean();
    console.log(event)
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
    const events = await Event.find({community: req.community._id, end: {$gte: new Date() }}).sort({start : -1}).lean();
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
    console.log(req.body.coordinates)
    let result = (await Event.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: req.body.coordinates
          },
          distanceField: "dist.calculated",
          // maxDistance: 1340000,
          includeLocs: "dist.location",
          spherical: true
        }
      },
      { $match: { community: req.community._id, end: {$gte: new Date() } } },
      { $sort: { "distance": 1 } },

    ]))
    await eventFeatures(result , req.user)
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, msg: "not working", err: err.message });
  }
};

module.exports.toggleEnrollment = async (req,res)=>{
  try{
    var found = await Participation.findOneAndDelete({event: req.params.id , participant : req.user._id})
    if(found){
        res.json({success : true,removed: true})
    }else{
        await Participation.create({event : req.params.id, participant:req.user._id}),
        res.json({success : true,created: true})
}
}catch(err){
    res.json({success : false, msg:err.message})
}
}

async function eventFeatures(events, user) {
  async function likesCount(event) {
    event.likesCount = await Like.count({ event: event._id });
  }
  async function dislikesCount(event) {
    event.dislikesCount = await Dislike.count({ event: event._id });

  }
  async function enrollsCount(event) {
    event.enrollsCount = await Participation.count({ event: event._id });

  }
  async function isLiked(event) {
    event.isLiked = await Like.exists({ event: event._id, user: user._id });

  }
  async function isDisliked(event) {
    event.isDisliked = await Dislike.exists({ event: event._id, user: user._id });
  }
  async function isEnrolled(event) {
    event.isEnrolled = await Participation.exists({ event: event._id, participant: user._id });
  }
  
  await Promise.all(events.map(event => {
    return Promise.all([
          likesCount(event),
          isLiked(event),
          dislikesCount(event),
          isDisliked(event),
          isEnrolled(event),
          enrollsCount(event)
        ])
  }))

}