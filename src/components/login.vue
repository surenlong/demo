<template>
  <div>
    <div class="login">
      <!-- <div class="lgTitle">请您先登录，游客无权限！！！<router-link to="/advancedElements">(注册新的账号)</router-link></div> -->
      <Form class="content" ref="formInline" :model="formInline" :rules="ruleInline" inline>

        <FormItem>
              <RadioGroup v-model="loginType">
                  <Radio label="company">客户账号</Radio>
                  <Radio label="manage">管理员账号</Radio>
              </RadioGroup>
        </FormItem><br>
        <FormItem prop="user">
          <Input class="input" type="text" value="" v-model="formInline.user" placeholder="Username"/>
        </FormItem>
        <br><br>
        <FormItem prop="password">
          <Input class="input" type="password" value="" v-model="formInline.password" placeholder="Password"/>
        </FormItem>
        <br><br>
        <FormItem>
          <Button class="input" type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
        <br><br>
        <div class="register">
          <span @click="register">立即注册</span>
          <span>忘记密码</span>
        </div>
      </Form>
      
    </div>
    <div class="bg">
        <div class="bgLeft">
          <p class="title">二手书交易网站</p>
        </div>
        <div class="bgRight">
          <div class="reading">
            <p class="title0">你想要的书，我都有！！</p>
            <div class="lContent">
              <p>全面、智能的交易平台</p>
              <p>开放、安全的图书资源</p>
              <p>持续、先进的管理机制</p>
            </div>
            <hr>
            <div class="footer">
               <p>感恩有礼，欢迎使用二手书交易网站</p>
               <p>首次购买会员五折！</p>
            </div>
           
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
    export default {
        data () {
            return {
                loginType: 'company',

                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能少于3位', trigger: 'blur' }
                    ]
                },
                shop:{}
            }
        },

        computed:{
          ...mapState(['url','user','relogin'])
        },

        methods: {
            register(){
                let relogin = false;
                this.$store.dispatch('relogin',relogin);
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let psw = this.formInline.password;
                        let name = this.formInline.user;
                        let loginType = this.loginType
                        let shop = this.shop;
                        // this.$Message.success('Success!');
                            let url = `${this.url}/login`;
                            // console.log(url);
                            this.$axios({
                                method: 'post',
                                url: url,
                                data: {
                                  username: name,
                                  password: psw,
                                  type: loginType,
                                }
                            }).then(resp => {
                                // console.log(resp.data);
                                shop = resp.data;
                                if(shop.err == -1){
                                  alert(shop.msg)
                                  return
                                }
                                // sessionStorage.setItem('token',shop.data.token);
                                sessionStorage.setItem('userName',name);
                                this.$store.dispatch('whoLogin',loginType);

                                this.$axios({
                                  method: 'post',
                                  url: `${this.url}/info`,
                                  data:{
                                    name: name
                                  }
                                }).then(resp => {
                                      let newData = resp.data[0];
                                      console.log(newData);
                                      this.$store.dispatch('setUser',newData); 
                                      let lookLogin = true;
                                      this.$store.dispatch('exit',lookLogin);
                                      this.$router.go('/home'); 
                                }).catch(resp => {
                                  console.log('请求失败：' + resp.status + ',' + resp.statusText);
                                });
                            }).catch(resp => {
                                console.log('请求失败：' + resp.status + ',' + resp.statusText);
                            });

                    }
                })
            }
        },
    }
</script>
<style scoped>
  hr{
    margin-top: 50px;
    margin-bottom: 30px;
    border-color: #ccc;
  }
  .register>span{
    display: inline-block;
    margin-right: 20px;
    margin-left: 10px;
  }
  .register>span:hover{
    cursor: pointer;
    color: #2468F2;
  }
  .bg{
    position: absolute;
		top: 0;
	  left: 0;
		width: 100%;
		height: 100%;
    z-index: -1;
    background-color: #2468F2;
  }
  .bgRight{
    position: absolute;
    right: 0;
    width: 72%;
    height: 100%;
    background-color: #F6F8FB;
  }
  .bgLeft{
    position: absolute;
    width: 120px;
    height: 100px;
    left: 320px;
  }
  .reading{
    width: 260px;
    position: absolute;
    left: 35%;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    color: #fff;
    left: -40px;
    margin-top: 50px;
  }
  .title0{
    font-weight: bold;
    font-size: 20px;
    margin-top: 130px;
    margin-bottom: 50px;
  }
  .lContent{
    font-size: 12px;
    color: #999;
  }
  .lContent>p{
    margin-bottom: 5px;
  }
  .footer{
    width: 260px;
    height: 60px;
    border-radius: 5px;
    color: #fff;
    padding-top: 10px;
    background-color:#2D87FC;
  }
  .footer>p{
    margin-left: 13px;
  }
  .footer>p:nth-child(2){
    color: #ccc;
    font-size: 12px;
  }
  .login{
    position: relative;
    top: 100px;
    left: 260px;
    width: 350px;
    height: 460px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .05)
  }
  .content{
    margin: 16px;
  }
  .input{
    width: 280px;
  }
  .lgTitle{
    margin-bottom: 50px;
    font-size: 20px;
    color: #00a7d0;
  }
</style>
