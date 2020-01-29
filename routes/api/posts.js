const Router = module.exports = require("express").Router()
const { CommunityMiddleware, AuthMiddleware } = require('../../helpers/index.js');
const {PostsController} = require('../../controllers/index')


Router.post('/', AuthMiddleware, CommunityMiddleware, PostsController.createPost) 
