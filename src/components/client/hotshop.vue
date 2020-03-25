<template>
<div style="margin: 0 40px 0 120px">
    <div style="margin: 20px 0">
        <Input v-model="bookname" placeholder="请输入书本名称" size='default'
            type="text" id="test" style="width: 25%;"/>
        <Button type="primary" icon="ios-search" size='default'@click="search0()">搜索</Button>
    </div>
    <div class="goods-list">
        <div @dblclick="showDitail(item)" class="goods-show-info" v-for="(item, index) in orderGoodsList" :key="index">
            <div class="goods-show-img">
                <img :src="url + item.url"/>
            </div>
            <div class="goods-show-detail">
                <span>{{item.description}}</span>
            </div>
            <div class="evaluation collect">
                <span>评价&nbsp;{{item.evaluate}}</span>
                <span @click="collect(item)">收藏&nbsp;{{item.collect}}</span>
            </div>
            <div class="evaluation">
                <span>销量&nbsp;{{item.sales}}</span><br>
            </div>
            <div class="goods-show-seller">
                <span>商家：{{item.name}}</span>
            </div>
            <div class="bookValue">
                <span class="qian">￥
                    <span style="font-size: 16px">{{item.price}}</span>
                </span>
                <span class="buyShop" @click="buyShop(item)">立即购买</span>
            </div>
        </div>
    </div>
    <Page :total="pageConf.total" show-sizer
        style="margin-left: 0; margin-top: 5px"
        :page-size="pageConf.pageSize"
        :page-size-opts="pageConf.pageOption"
        @on-change="changePage"
        @on-page-size-change="changePageSize"/>

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
            modal1: false,
            password: '',
            buyshopMsg: {},
            bookname: '',
            orderGoodsList: [],
            collectShopList: [],
            pageConf: {//设置一些初始值(会被覆盖)
                pageCode: 1, //当前页
                pageSize: 12, //每页显示的记录数
                total:10,  //初始信息条数，后跟数据库对应
                pageOption: [12,24,48], //分页选项
            },
            shopMsg:{
                   
            }
        }
    },
    methods:{
        getShopMsg(shopMsg,pageCode,pageSize){
            this.$axios({
                method: 'post',
                url: `${this.url}/file/getHotShopMsg`,
                data:{
                    name: shopMsg,
                    pagConfig: {
                        amout: pageSize,
                        page: pageCode,
                    }
                }
            }).then(resp => {
                // console.log(resp.data);
                this.pageConf.total = resp.data.num;
                this.orderGoodsList = resp.data.msg;
            }).catch(resp => {
                console.log('请求失败');
            });
        },
        search0(){
            this.getShopMsg(this.bookname,this.pageCode,this.pageConf.pageSize)
            console.log(this.bookname);
        },
        //切换页码显示
        changePage(pageCode) {
            this.getShopMsg(this.shopMsg,pageCode,this.pageConf.pageSize)
            // this.pageConf.pageCode = pageCode; 
        },
        //切换每页总数显示
        changePageSize(pageSize) {
            this.getShopMsg(this.shopMsg,this.pageConf.pageCode,pageSize)
            this.pageConf.pageSize = pageSize;   
        },
        //收藏或取消商品
        collect(item){
            console.log(item);
            this.$axios({
                method: 'post',
                url: `${this.url}/file/collectShop`,
                data:{
                    name: this.user.name,
                    shopMsg: item
                }
            }).then(resp => {
                let msg = resp.data;
                console.log(msg);
                this.getShopMsg(this.shopMsg, this.pageConf.pageCode, this.pageConf.pageSize);
            })
        },
        //显示商品详情
        showDitail(item){
            // console.log(item);
            this.$router.push({name:'ShopDitail', params: item})
        },
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
        cancel () {
            this.$Message.info('取消支付');
        },
        buyShop(item){
            this.modal1 = true;
            this.buyshopMsg = item;
            this.buyshopMsg.all = parseInt(item.price) + parseInt(item.fee)
        }
    },
    mounted(){
        this.getShopMsg(this.shopMsg, this.pageConf.pageCode, this.pageConf.pageSize);
        // this.getcollectShopNum()
    },
}
</script>

<style scoped>
.pay{
    line-height: 30px;
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.goods-show-img{
    width: 120px;
    position: relative;
    height: 120px;
    left: 10px;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    margin: 0 auto;
}
.goods-show-img img{
    height: 110px;
    margin: 0 auto;
}
.goods-show-info>div{
    margin: 5px 0;
}
.goods-show-info{
  width: 180px;
  padding: 10px 15px;
  margin-bottom: 40px;
  margin-right: 80px;
  border: 1px solid #fff;
  cursor: pointer;
}
.goods-show-info:hover{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-price{
  margin-top: 6px;
}
.goods-show-detail{
  font-size: 12px;
  height: 38px;
  overflow: hidden;
  margin: 6px 0px;
}
.goods-show-num{
  font-size: 12px;
  color: #009688;
}
.goods-show-num span{
  color: #005AA0;
  font-weight: bold;
}
.goods-show-seller{
  font-size: 12px;
  color:#E4393C;
}
.collect>span:hover{
    color: #48f;
}
.evaluation{
  font-size: 12px;
  color: #999;
}
.evaluation>span{
  margin-right: 10px;
}
.bookValue{
  font-size: 12px;
  /* margin-left: 20px; */
}
.buyShop{
    display: inline-block;
    width: 60px;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    text-align: center;
    margin-left: 30px;
    border-radius: 3px;
    border: 1px solid #48f;
}
.buyShop:hover{
    color: #48f;
}
.qian{
    display: inline-block;
    color: #f40; 
    width: 50px
}
</style>