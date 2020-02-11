const Router = module.exports = require("express").Router()
const {DashboardController} = require('../../controllers/index.js')
const {AuthMiddleware, CommunityMiddleware, AdminMiddlware} = require('../../helpers/index.js')

Router.route('/posts').get(AuthMiddleware, AdminMiddlware, DashboardController.getPosts)
Router.route('/events').get(AuthMiddleware, AdminMiddlware, DashboardController.getEvents)

