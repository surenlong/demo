<template>
  <div id="content-wrap" class="content-wrapper">
    <section class="content">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
      <Footer/>
    </section>
  </div>
</template>

<script>
import Footer from './components/footer'
export default {
    name: 'va-content-wrap',
    components:{
      Footer
    },
    methods:{
    },
    created () {

    }
}
</script>

<style scoped>
  .content{
    width: auto;
    position: absolute;
    left: 230px;
    display: block;
    box-sizing: border-box;
    top: 55px;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .content::-webkit-scrollbar-button {
    display:none
  }
</style>
