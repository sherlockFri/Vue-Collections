const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

//注册路由
router.post('/', async(ctx) => {
  ctx.body = "goods"
})


module.exports = router