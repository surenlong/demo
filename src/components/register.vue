<template>
  <div class="register">
       <div class="title">
           <div>
                <span>bookShop</span> | 
                <span>注册书城账号</span>
           </div>
           <div>
               <span>我已注册</span>
               <span class="login" @click="login">登录</span>
           </div>
       </div>
       <hr>
       <div class="content">
           <Input class="input" type="text" value="" v-model="username" placeholder="请输入用户名"/><br>
           <Input class="input" type="text" value="" v-model="phone" placeholder="请输入手机号"/><br>
           <Input class="input" type="password" value="" v-model="password" placeholder="请输入密码"/><br>
           <Button class="input" type="primary" @click="register">注册</Button>
       </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data(){
            return{
                username: '',
                phone: '',
                password: '',
            }
        },
        computed:{
            ...mapState(['url'])
        },
        methods:{
            login(){
                let relogin = true;
                this.$store.dispatch('relogin',relogin);
            },
            register(){
                let usr = {
                    username: this.username,
                    password: this.password,
                    type: 'company',
                };
                let masage = {
                    name: this.username,
                    phone: this.phone,
                    roles: '普通会员',
                    type: 'company',
                };
                this.$axios({
                    method: 'post',
                    url: `${this.url}/init`,
                    data:{
                        usr: usr,
                        masage: masage
                    }
                }).then(resp => {
                    let newData = resp.data;
                    if(newData.err == 0){
                        alert(newData.msg)
                        let relogin = true;
                        this.$store.dispatch('relogin',relogin);
                    };
                    if(newData.err == -1){
                        alert(newData.msg)
                    }
                }).catch(resp => {
                    console.log('请求失败：' + resp.status + ',' + resp.statusText);
                });
            }
        }
    }
</script>

<style scoped>
    hr{
        width: 110%;
        margin-left: -5%;
    }
    .register{
        width: 65%;
        margin: 40px auto 10px;
    }
    .title{
        height: 40px;
    }
    .title>div:nth-child(1){
        font-size: 18px;
        font-weight: bold;
        color: #888;
        float: left;
    }
    .title>div:nth-child(2){
        float: right;
    }
    .login{
        margin-left: 10px;
        display: inline-block;
        padding: 2px 10px;
        border: 1px solid #aaa;
        border-radius: 3px;
    }
    .login:hover{
        cursor: pointer;
        color: #55f
    }
    .input{
        width: 340px;
        margin-top: 40px;
    }
</style>
