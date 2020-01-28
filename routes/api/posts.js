const Router = module.exports = require("express").Router()
const { HobbyMiddleWare, AuthMiddleWare } = require('../../helpers/index.js');
const {Post} = require('../../controllers/index')


Router.post('/', AuthMiddleWare, HobbyMiddleWare, Post.createPost) 
