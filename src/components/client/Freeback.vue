<template>
  <div>
    <div class="freeback-container">
      <div class="freeback-img-box">
        <img src="static/img/freeback.png">
      </div>
      <div class="freeback-box-border">
        <div class="freeback-box">
          <div class="freeback-title">
            <h2>意见反馈</h2>
            <span>感谢你的反馈，我们会积极改善，做出更好的服务的</span>
          </div>
          <div class="freeback-content">
            <div class="freeback-form">
              <Form :model="formItem" :label-width="80">
                <FormItem label="标题">
                  <i-input v-model="formItem.title" placeholder="请输入标题"></i-input>
                </FormItem>
                <FormItem label="反馈信息">
                  <i-input v-model="formItem.content" type="textarea" :autosize="{minRows: 8,maxRows: 10}" placeholder="请输入反馈信息"></i-input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="postFreebackMsg()">提交</Button>&nbsp;&nbsp;&nbsp;
                  <Button type="info" @click="delFreebackMsg()">清空信息</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
    name: 'Freeback',
    computed:{
      ...mapState(['url','user'])
    },

    data () {
      return {
        formItem: {
          name: '',
          title: '',
          content: ''
        }
      };
    },

    methods:{
      //清空意见板
      delFreebackMsg(){
        this.formItem.title = '';
        this.formItem.content = '';
      },
      //上传意见信息
      postFreebackMsg(){
        this.formItem.name = this.user.name;
        this.$axios({
          method: 'post',
          url: `${this.url}/file/FreebackMsg`,
          data: this.formItem,
        }).then(resp => {
          // console.log(resp);
          if(resp.data.err == 0){
            alert(resp.data.msg)
            this.delFreebackMsg()
          }
        }).catch(err => {

        })
      },
    }
};
</script>

<style scoped>
.freeback-container {
  margin: 0 auto;
  width: 90%;
  margin-top: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  /* background-color: #ccc; */
}
.freeback-img-box {
  width: 40%;
  margin-left: 4%;
  margin-right: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-img-box img {
  width: 80%;
}
.freeback-box-border {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.freeback-box {
  width: 480px;
}
.freeback-content {
  margin: 15px auto;
  border: 1px #ccc dotted;
}
.freeback-form {
  margin: 30px auto;
  width: 90%;
}
</style>
