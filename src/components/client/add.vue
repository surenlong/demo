<template>
  <div class="add">
    <button @click="topmsg" type="submit">提交</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['url'])
        },
        methods:{
            topmsg(){
                let file = document.getElementById('file').files[0];
                let formdata = new FormData()
                formdata.append('hehe', file)
                console.log(file);
                this.$axios({
                    method: 'post',
                    url: `http://localhost:8000/file/upload`,
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).then(resp => {
                    console.log(resp.data);  
                }).catch(resp => {
                    console.log('请求失败');
                });
            }
        }
    }
</script>

<style scoped>

</style>
