const multer            = require("multer"),
      storage           = multer.diskStorage({})
module.exports  = multer({storage,fileFilter: (req,file,callback)=>{
    if(!file.mimetype.match(/jpg|jpeg|png|mp4|mkv|avi|gif/i))
    callback(new Error("file is not supported"), false)
    else callback(null, true)
}})