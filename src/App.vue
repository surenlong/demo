<template>
  <div id="app">
    <div class="wrapper" v-if="lookLogin">
      <va-navibar></va-navibar>
      <va-slider></va-slider>
      <va-content-wrap class="content10"></va-content-wrap>
    </div>
    <div v-if="!lookLogin && relogin">
      <va-login></va-login>
    </div>
    <div v-if="!relogin">
      <va-register></va-register>
    </div>
  </div>
</template>

<script>
import VANaviBar from 'NaviBar.vue'
import VASlider from 'Slider.vue'
import VAContentWrap from 'ContentWrap.vue'

import Login from './components/login'
import Register from './components/register'

import {mapState} from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },

  computed:{
    ...mapState(['lookLogin','relogin'])
  },

  components: {
    'va-navibar': VANaviBar,
    'va-slider': VASlider,
    'va-content-wrap': VAContentWrap,
    'va-login': Login,
    'va-register':Register
  },

  mounted () {
    //对xoex数据进行存储，存在sessionStorage里
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{ 
    position: absolute;
    height:100%;
    width:100%;  
    padding:0px;          
    border:0px;        
    margin:0px;                  
  }
  body::-webkit-scrollbar{
    display:none;
  }
</style>
