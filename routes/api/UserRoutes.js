const Router = module.exports = require("express").Router()

Router.get("/test", UserController.test)