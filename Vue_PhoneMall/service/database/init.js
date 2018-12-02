const mongoose = require('mongoose')
const DB_URL = "mongodb://localhost/phonemallDB"
const glob = require('glob') // 允许你使用 * 等符号,node版本高可以不安装,自带
const { resolve } = require('path')

//一次性输出所有 (schema) 文件
exports.initSchemas = () => {
  //一次性引入所有 (schema) 文件
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = () => {
  mongoose.connect(DB_URL, { useCreateIndex: true })
  let maxConnectTime = 0

  return new Promise( (resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('***数据库断开***')
      if (maxConnectTime < 3) {
        maxConnectTime++
        console.log(`***数据库正在进行第${maxConnectTime}次重连***`)
        mongoose.connect(DB_URL, { useCreateIndex: true })
      } else {
        reject()
        throw new Error('***数据库出现问题，程序无法搞定，请人为修理***')
      }
     
    })
  
    mongoose.connection.on('error', (err) => {
      console.log('***数据库出错***')
      if (maxConnectTime < 3) {
        maxConnectTime++
        console.log(`***数据库正在进行第${maxConnectTime}次重连***`)
        mongoose.connect(DB_URL, { useCreateIndex: true })
      } else {
        reject( err )
        throw new Error('***数据库出现问题，程序无法搞定，请人为修理***')
      }
    })
  
    mongoose.connection.once('open', () => {
      console.log('***数据库连接成功***')
      resolve()
    })
  })
  
}