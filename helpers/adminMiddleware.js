module.exports = async (req, res, next) => {
try {
    if(req.user.isAdmin) next()
    else res.json({success: false, msg: "you're not authorized"})
    
}
catch(err) {
    res.json({success: false, msg: err.message})
}
}