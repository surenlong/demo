<template>
    <div>
        <div class="theMain" @click="BgCl">
            <router-link v-if="aside.yes" :to="aside.src">
                <ul style="padding: 10px">
                    <li>
                        <Icon :type="aside.type" style="padding: 0 10px 0 10px"/>
                        <span class="msg">{{aside.name}}</span>
                    </li>
                </ul>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data(){
            return{
                look: true,
                ok:false
            }
        },
        props:{
            aside:Object,
        },
        computed:{
            ...mapState(['loginType'])
        },
        methods:{
            run(){
                let newName = 'theMain aside1 bgcl';
                let oulName = 'theMain aside1';
                let bg = document.getElementsByClassName("theMain");
                // bg[0].className = newName;
                for(let i = 0; i<bg.length; i++){
                    bg[i].onclick = function () {
                        for(let i = 0; i<bg.length; i++){
                            bg[i].className = oulName;
                        }
                        this.className = newName;
                    }
                }
            },
            BgCl(){
                this.run();
                this.ok = !this.ok
            },
            //控制平台或客户端展示
            changeUsr(){
                let usrUrl0 = this.aside.src === '/manage'||this.aside.src === '/shoplist'||this.aside.src ==='/userFreeback';
                let usrUrl1 = this.aside.src === '/shoplists'||this.aside.src === '/hotshop'
                            ||this.aside.src === '/collect'||this.aside.src === '/evaluate'
                            ||this.aside.src === '/personage'||this.aside.src === '/freeback'
                            ||this.aside.src === '/indent';
                if(this.loginType == 'manage'){
                    if (usrUrl0){
                        this.aside.yes = true;
                    }else if(usrUrl1){
                        this.aside.yes = false;
                    }
                }else {
                    if (usrUrl0){
                        this.aside.yes = false;
                    }else if(usrUrl1){
                        this.aside.yes = true;
                    }
                }
            }
        },
        mounted(){
            this.run();
            this.changeUsr();
        }
    }
</script>

<style scoped>
  .theMain{
    font-size: 16px;
  }
  .bgcl{
    background-color: #0d6aad;
  }
  .msg{
    display: inline-block;
    width: 60%;
  }
  .content1{
      font-size: 16px;
      color: #ccc;
      line-height: 30px;
  }
  .content1 li{
      padding-left: 50px;
      line-height: 35px;
  }
  .content1 li:hover{
      background-color: #0F253C;
  }
  li{
    list-style: none;
  }
</style>
