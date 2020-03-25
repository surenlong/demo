<template>
    <div  style="margin: 0 120px; position: relative;">
        <div class="title">商品详情页</div>
        <ul class="nav">
            <li>商品列表</li>
            <li>{{ShopDitail.title}}</li>
            <li>商品详情</li>
        </ul>
        <div>
            <div class="image">
                <img :src="url + ShopDitail.url" alt="">
            </div>
            <div class="shopDitail">
                <ul>
                    <li class="ditail"><span class="fee aquamarinecolor">邮费/{{ShopDitail.fee}}元</span><span> {{ShopDitail.description}}</span></li>
                    <li>单价：￥{{ShopDitail.price}}</li>
                    <li><span>收藏：{{ShopDitail.collect}}</span></li>
                    <li><span>销量：{{ShopDitail.sales}}</span></li>
                    <li><span>好评：{{evaluateContent.good}}</span> <span style="margin-left:30px">差评：{{evaluateContent.bad}}</span></li>
                    <li class="byplay">
                        <span class="fee margin" @click="postShopping(ShopDitail)">加入购物车</span>
                        <span class="fee margin" @click="buyShop(ShopDitail)">立即购买</span>
                    </li>
                </ul>
            </div>
        </div>
        <div>
        <Modal
            v-model="modal1"
            title="确认支付信息"
            @on-ok="ok"
            @on-cancel="cancel">
            <p class="pay">商品名称：{{buyshopMsg.title}}</p>
            <p class="pay">商品价格：{{buyshopMsg.price}}元</p>
            <p class="pay">快递邮费：{{buyshopMsg.fee}}元</p>
            <p class="pay">支付金额：{{buyshopMsg.all}}元</p>
            <p class="pay">输入密码：<input v-model="password" type="password"></p>
        </Modal>
    </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['url','user'])
    },
    data(){
        return{
            ShopDitail: '',
            modal1: false,
            password: '',
            buyshopMsg: {},
            evaluateContent: {},
        }
    },
    methods:{
        //加入购物车
        postShopping(item){
            // console.log(item);
            this.$axios({
                method: 'post',
                url: `${this.url}/file/postShopping`,
                data:{
                    name: this.user.name,
                    shopMsg: item
                }
            }).then(resp => {
                let msg = resp.data;
                alert(msg.msg)
            })
        },
        //购买商品
        ok () {
            this.$axios({
                method: 'post',
                url: `${this.url}/pay`,
                data: {
                    username: this.user.name,
                    password: this.password,
                }
            }).then(res => {
                // console.log(this.buyshopMsg);
                if(res.data.err == 1){
                    this.$axios({
                        method: 'post',
                        url: `${this.url}/addimg/boughtGoods`,
                        data: {
                            name: this.user.name,
                            boughtGoods: this.buyshopMsg
                        }
                    }).then(resp => {
                        console.log(resp);
                    })
                    this.$Message.info(res.data.msg);
                }else{
                    this.$Message.info(res.data.msg);
                }
            })
           
        },
        //取消支付
        cancel () {
            this.$Message.info('取消支付');
        },
        //弹出支付页
        buyShop(item){
            this.modal1 = true;
            this.buyshopMsg = item;
            this.buyshopMsg.all = parseInt(item.price) + parseInt(item.fee)
        },
        //获取评价
        getEvaluateContent(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/getEvaluateContent`,
                data: {
                    _id: this.ShopDitail._id
                }
            }).then(resp => {
                // console.log(resp);
                this.evaluateContent = resp.data.msg
            })
        }
    },
    mounted(){
        this.ShopDitail = this.$route.params;
        this.getEvaluateContent();
    }
}
</script>
<style scoped>
    .pay{
        line-height: 30px;
    }
    .title{
        height: 30px;
        line-height: 30px;
        font-size: 20px;
    }
    .nav{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #999; 
        margin-bottom: 15px;
    }
    .nav>li{
        float: left;
        margin-right: 15px;
    }
    .image{
        height:362px;
        width: 360px;
        display: inline-block;
        position: relative;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .image>img{
        height: 360px;
        display: block;
        position: relative;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        margin: 0 auto;
    }
    .shopDitail{
        display: inline-block;
        width: 500px;
        height: 362px;
        position: absolute;
        left: 400px;
    }
    .shopDitail>ul>li{
        height: 40px;
        line-height: 40px;
    }
    .ditail{
        font-size: 18px;
    }
    .fee{
        font-size: 14px;
        border: 1px solid #ccc;
        display: inline-block;
        height: 25px;
        line-height: 25px;
        padding: 0 5px;
        border-radius: 3px;
      
    }
    .evaluate:hover{
        color: #26f;
        border: 1px solid #26f;
        cursor: pointer;
    }
    .byplay{
        position: absolute;
        left: -10px;
        bottom: 10px;
    }
    .aquamarinecolor{
          background-color: aquamarine;
    }
    .margin{
        margin-right: 30px;
        font-size: 18px;
        height: 34px;
        line-height: 34px;
        border: 1px solid #26f;
    }
    .margin:hover{
        color: #26f;
        cursor: pointer;
    }
    li{
        list-style: none;
    }
</style>