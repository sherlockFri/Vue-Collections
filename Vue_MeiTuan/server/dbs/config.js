export default {
  dbs:'mongodb://127.0.0.1:27017/student',

  //redis 配置
  redis:{
    get host(){
      return '127.0.0.1' // * 根据设置的地方不同填写不同的IP
    },
    get port(){
      return 6379 // redis的连接端口,不建议修改
    }
  },

  smtp:{
    get host(){
      return 'smtp.qq.com' // ~ 腾讯的smtp地址
    },
    get user(){
      return '1120193104@qq.com'
    },
    get pass(){
      return 'zoitkhziogwjijjh' // qq邮箱授权码
    },
    get code(){
      return ()=>{
        // 生成随机的验证码发往邮箱
        // Math.random().toString(16) 生成类似于这样的=> 0.c3dd70a60c0b随机数
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    get expire(){
      // 验证码的过期时间
      return ()=>{
        return new Date().getTime()+60*60*1000
      }
    }
  }
}
