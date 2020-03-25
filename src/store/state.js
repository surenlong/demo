/*
* 多组件共用数据存储库
*
* */

export default {

  lookLogin: false,     //登录状态
  relogin: true,        //注册状态
  loginType: '',        //谁登录的

  url:'//127.0.0.1:8000',   //地址头部
  
  //客户信息存储
  user:{
    name:'',
    description:'',
    roles:'',
  }
}
