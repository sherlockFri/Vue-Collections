const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

;( async () => {
  await connect()
  //运行schema ,生成model
  initSchemas()
  const User = mongoose.model('User')
  let oneUser = new User({userName: 'fri2', password: '2134'})
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