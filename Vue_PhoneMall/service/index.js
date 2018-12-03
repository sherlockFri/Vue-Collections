const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const mongoose = require('mongoose')
const Router = require('koa-router')

app.use(bodyParser())//通过ctx.request.body 获取提交信息
app.use(cors()) //处理跨域问题

let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods.js')

let router = new Router()
//装载子路由
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;( async () => {
  await connect()
  //运行schema ,生成model
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({userName: 'fri123', password: '2134'})
  // oneUser.save().then(()=>{
  //   console.log('chenggong')
  // })
 
})()

app.use( async(ctx) => {
  ctx.body = "HELLO fri123"
})

app.listen(3000, () => {
  console.log('***SERVIECE HAS STARTED AT PROT 3000***')
})