const  {User} = require('../../models/index.js')
const Router = (module.exports = require("express").Router());
const {
  CommunityMiddleware,
  AuthMiddleware,
  uploadMiddleware
} = require("../../helpers/index.js");
const { PostsController } = require("../../controllers/index");

Router.post(
  "/",
  AuthMiddleware,
  CommunityMiddleware,
  uploadMiddleware.single("file"),
  PostsController.createPost
);

Router.get("/", AuthMiddleware, CommunityMiddleware, PostsController.getPosts);

// Router.get('/try' , CommunityMiddleware, async (req,res)=>{
//   res.json(await User.aggregate([
//     {$lookup :  {
//       from: 'posts',
//       localField: '_id',
//       foreignField: 'user',
//       as: 'posts'
//     }},
//     {$match : {"posts.community" : req.community._id}},
//     {$project:
//          {
//            _id: "$_id",
//            posts: { $size: "$posts" },
//           //  count: { $sum: 1 }
//          }}
//   ]))
  
// })