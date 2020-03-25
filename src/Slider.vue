<template>
  <aside id="slider" class="mai_sidebar">
    <section class="sidebar">

      <div v-show="!lookLogin" class="user-panel">
        <div class="pull-left image" style="width: 45px;height: 45px;border-radius: 23px;background-color: #fff"></div>
        <div class="pull-left info">
          <p><router-link to="/login">暂无权限，请登录</router-link></p>

          <a href="#"><i class="fa fa-circle" style="color: #666666"></i> 离线</a>
        </div>
      </div>

      <div v-show="lookLogin" class="user-panel">
        <div class="pull-left image">
          <img :src='url+user.pic' class="img-circle" alt="userImg">
        </div>
        <div class="pull-left info">
<!--      最后用vuex实现数据共享和刷新-->
          <p>{{user.name}}</p>
          <a href="#"><i class="fa fa-circle" style="color: #3c763d"></i> 在线</a>
        </div>
      </div>

      <div  class="user-panel" style="padding: 10px; background-color: #0f253c">书城</div>

      <TheLabel class="aside1" v-for="(aside,index) in asides" :key="index" :aside="aside"/>

      <ul @click="modal1 = true" class="exit user-panel" style="padding: 10px">
        <li>
          <Icon type="ios-hammer-outline" style="padding: 0 10px 0 10px"/>
          <span>退出登录</span>
        </li>
      </ul>

      <Modal
          v-model="modal1"
          title="尊敬的用户"
          @on-ok="ok"
          @on-cancel="cancel">
          <p>您确定要退出登录吗？？</p>
      </Modal>
    </section>
  </aside>
</template>

<script>
import TheLabel from './components/theLabel'
import {mapState} from 'vuex'
export default {
    data (){
        return{
            modal1: false,
            asides:[
                {
                    name:'客户信息管理',
                    type:'md-contacts',
                    src: '/manage',
                    yes: false,
                },
                {
                    name:'商品信息管理',
                    type:'ios-basket-outline',
                    src: '/shoplist',
                    yes: false,
                },
                {
                    name:'客户意见管理',
                    type:'ios-chatbubbles-outline',
                    src: '/userFreeback',
                    yes: false,
                },
                {
                    name:'商品列表',
                    type:'ios-basket-outline',
                    src: '/shoplists',
                    yes: false,
                },
                {
                    name:'热门商品',
                    type:'ios-sunny-outline',
                    src: '/hotshop',
                    yes: false,
                },
                {
                    name:'收藏夹',
                    type:'ios-star-outline',
                    src: '/collect',
                    yes: false,
                },
                // {
                //     name:'评价管理',
                //     type:'ios-infinite-outline',
                //     src: '/evaluate',
                //     yes: false,
                // },
                {
                    name:'意见反馈',
                    type:'ios-chatbubbles-outline',
                    src: '/freeback',
                    yes: false,
                },
                {
                    name:'我的订单',
                    type:'ios-book-outline',
                    src: '/indent',
                    yes: false,
                },
                {
                    name:'个人中心',
                    type:'ios-contact-outline',
                    src: '/personage',
                    yes: false,
                },
            ],
        }
    },
    computed:{
        ...mapState(['url', 'lookLogin','user'])
    },
    components:{
        TheLabel
    },
    methods:{
        exitLogin() {
            let lookLogin = false;
            this.$store.dispatch('exit',lookLogin)
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userName')
            sessionStorage.removeItem('store')
        },
        ok () {
            this.exitLogin();
        },
       cancel () {
        }
    },
    mounted(){

    }
}
</script>
<style>
  .mai_sidebar{
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 50px;
    height: 100%;
    width: 230px;
    z-index: 10;
  }
  .aside1{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    /*padding: 10px;*/
    overflow: hidden;
    white-space: nowrap;
  }
  li{
    list-style: none;
  }
  .exit{
    color: #ccc;
    font-size: 16px;
  }
  .exit:hover{
    cursor: pointer;
  }
</style>
