const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

//注册路由
router.get('/', async(ctx) => {
  ctx.body = "123"
})


module.exports =router