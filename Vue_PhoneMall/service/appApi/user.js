const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()


//注册路由
router.post('/register', async(ctx) => {
  let  regisUser = ctx.request.body
  const UserModel = mongoose.model('User')
  let hasUser = await UserModel.findOne({userName:regisUser.userName})
  if (hasUser) {
    ctx.body = {
      code: 201,
      message: '用户名已存在'
    }
  } else {
    let newUser = new UserModel(regisUser)
    await newUser.save().then( () => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    }).catch( err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })
  }
})

router.post('/login', async(ctx) => {
  let loginUer = ctx.request.body
  let loginUserName = loginUer.userName
  let loginUserpassword = loginUer.password
  const UserModel = mongoose.model('User')

  try {
    let result = await UserModel.findOne({userName: loginUserName})
    if (result) {
      let User = new UserModel()
      let isMatch = await User.comparePassword(loginUserpassword, result.password)
      if (isMatch) {
        ctx.body={code:200,massage:isMatch}
      } else {
        ctx.body={code:202,massage:'密码错误'}
      }
    } else {
      ctx.body = {
        code: 203,
        massage: '用户名不存在'
      }
    }
  } catch (error){
    console.log(error)
    ctx.body = {
      code: 500,
      massage: error
    }
  }

})

module.exports = router