<template>
  <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <span class="logo-mini">shop</span>
      <span class="logo-lg"><i>welcome to </i><b>bookShop</b></span>
    </a>
    <!-- 标题导航栏:样式可以在Header .less中找到 -->
    <nav class="navbar navbar-static-top">

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav" >
          <li>
            <a>欢迎 {{user.name}} 访问全国高校二手书交易平台</a>
          </li>
          <li v-show="!lookLogin">
            <router-link to="/login">暂无权限，请您先登录</router-link>
          </li>

          <!-- 控件侧边栏切换按钮 -->
          <li style="padding-right: 40px">
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>

    <Modal
          v-model="modal2"
          title="尊敬的用户"
          @on-ok="ok"
          @on-cancel="cancel">
          <p>您确定要退出登录吗？？</p>
      </Modal>

  </header>
</template>

<script>

  import {mapState} from 'vuex'
export default {
    data(){
        return{
            modal1: false,
            modal2: false,
        }
    },
    computed:{
        ...mapState(['lookLogin','user'])
    },
    methods: {
        spread() {
            function getTime() {
                let date1 = new Date();
                let year = date1.getFullYear();
                let month = date1.getMonth() + 1;
                let day = date1.getDate();
                let hours = date1.getHours();
                let minutes = date1.getMinutes();
                let seconds = date1.getSeconds();
                return year + "年" + month + "月" + day + "日" + " - " + hours + "时" + minutes + "分" + seconds + "秒"
            }

            this.main.getTime = getTime();
        },
        introduction() {
            this.modal1 = true;
        },
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
    }
}

</script>

<style scoped>
  .introduction{
    width: 100%;
    /* height: 150px; */
  }
  .introduction p{
    line-height: 30px;
  }
  .introduction p>img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    position: absolute;
  }
  .image{
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-top: 10px;
  }
  .main-header{
    z-index: 1;
  }
</style>
