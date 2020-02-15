const { Notification } = require("../models/index.js");
module.exports.push = async ({
  sender,
  receiver,
  post,
  event,
  type,
  community,
  comment,
  reply
}) => {
  if (sender.toString() != receiver.toString()) {
    await Notification.create({
      sender,
      receiver,
      post,
      event,
      type,
      community,
      comment,
      reply
    });
  }
};
module.exports.remove = async ({
  sender,
  receiver,
  post,
  event,
  type,
  community,
  comment,
  reply
}) => {
    await Notification.findOneAndDelete({
      sender,
      receiver,
      post,
      event,
      type,
      community,
      comment,
      reply
    });
  
};
