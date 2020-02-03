const {Like} = require('../models/index.js')
module.exports.likePost = async (req,res)=>{
    try{
        var found = await Like.findOneAndDelete({post: req.params.id , user : req.user._id})
        if(found){
            res.json({success : true,removed: true})
        }else{
            await Like.create({post : req.params.id, user:req.user._id})
            res.json({success : true,created: true})

        }
    }catch(err){
        res.json({success : false, msg:"couldn't like", err})
    }
}