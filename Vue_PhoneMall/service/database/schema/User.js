const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // 加密插件
const SALT_WORK_FACTOR = 10 //加密等级
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  UserId : {type: ObjectId},
  userName : {type: String, unique: true},
  password: {type: String},
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()},
})

// 在存储用户信息之前加盐加密 密码
userSchema.pre('save', function(next){
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt,(err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      })
  })
})

mongoose.model('User', userSchema)