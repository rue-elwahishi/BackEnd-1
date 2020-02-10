const Router = module.exports = require("express").Router()
const {NotificationsController} = require('../../controllers/index.js')
const {AuthMiddleware, CommunityMiddleware} = require('../../helpers/index.js')

Router.route('/').get(AuthMiddleware, CommunityMiddleware, NotificationsController.get)