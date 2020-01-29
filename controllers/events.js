const Event = require("../models/event");

//create new event
module.exports.createEvent = (req, res) => {
  try {
    var event = new Event({
      user: req.params.id,
      title: req.body.title,
      description: req.body.description,
      community: req.body.community,
      file: req.body.file
    });
    event.save();
    res.json({ success: true, event });
  } catch (err) {
    res.json({ success: false, err });
  }
};

//display events
module.exports.displayAll = async (req, res) => {
  try {
    var page = req.query.page;
    var events = await Event.find({ community: req.community._id })
      .limit(30)
      .skip(page * 30);
    res.json({ success: true, events });
  } catch (err) {
    res.json({ success: false, err });
  }
};
