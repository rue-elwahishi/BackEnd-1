const {Community} = require('../models/index.js')

module.exports.getCommunities = async (req,res)=>{
   try{res.json({success: true, result: await Community.find({})})}
   catch(err){res.json({success : false, msg : "something went wrong", err})}
}