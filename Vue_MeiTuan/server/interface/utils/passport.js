import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'


passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if(result!=null){
    if(result.password===password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))

//用户登录成功后,把用户的信息存到 session 中
passport.serializeUser(function(user,done){
  done(null,user)
})

// 用户退出后, 把用户的session 清除
passport.deserializeUser(function(user,done){
  return done(null,user)
})

export default passport
