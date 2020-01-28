const Router = module.exports = require("express").Router()
const {CommunititesController} = require('../../controllers/index.js')
const {AuthMiddleware} = require('../../helpers/index.js')

Router.route('/').get(AuthMiddleware, CommunititesController.getCommunities)