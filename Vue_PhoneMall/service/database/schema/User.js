const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // 加密插件
const SALT_WORK_FACTOR = 10 //加密等级
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  UserId     : { type: ObjectId },
  userName   : { type: String, unique: true },
  password   : { type: String },
  createAt   : { type: Date, default : Date.now() },
  lastLoginAt: { type: Date, default : Date.now() },
}, {
  collection: 'user' //加上collection 数据库的collectons 就不会有 's' 结尾了
})

// 在存储用户信息之前加盐加密 密码
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  // comparePassword: (_password, password) => {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.compare(_password, password, (err, isMatch) => {
  //       if (!err) resolve(isMatch)
  //       else reject(err)
  //     })
  //   })
  // }

  comparePassword: async (_password, password) => {
    try{
      const isMatch = await bcrypt.compare(_password, password)
      return isMatch
    } catch (err) {
      console.log(err)
    }
  }
}


mongoose.model('User', userSchema)