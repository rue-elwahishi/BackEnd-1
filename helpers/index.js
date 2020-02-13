module.exports = {
  AuthMiddleware: require("./auth.js"),
  CommunityMiddleware: require("./communityMiddleware.js"),
  uploadMiddleware: require("./uploadMiddleware"),
  cloudinary: require("./cloudinary.js"),
  UserFeatures: require("./userFeatures.js"),
  AdminMiddlware: require('./adminMiddleware'),
  NotificationHandler : require('./notificationHandler.js')
};
