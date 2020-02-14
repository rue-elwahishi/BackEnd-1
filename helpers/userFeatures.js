const Following = require("../models/following.js");

module.exports = async (users, community, you) => {
  function isYou(user) {
    return user.username === you.username;
  }

  async function followersCount(user) {
    user.followersCount = await Following.count({
      followed: user._id,
      community: community._id
    });
  }
  async function followingsCount(user) {
    user.followingsCount = await Following.count({
      follower: user._id,
      community: community._id
    });
  }
  async function followsYou(user) {
    user.followsYou = await Following.exists({
      followed: you._id,
      follower: user._id,
      community: community._id
    });
  }
  async function followedByYou(user) {
    user.followedByYou = await Following.exists({
      followed: user._id,
      follower: you._id,
      community: community._id
    });
  }

  return await Promise.all(
    users.map(user => {
      return Promise.all([
        followersCount(user),
        followingsCount(user),
        isYou(user) ? null : followsYou(user),
        isYou(user) ? null : followedByYou(user)
      ]);
    })
  );
};
