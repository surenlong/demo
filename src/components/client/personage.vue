<template>
  <div class="personage">
       <!-- 导航部分 -->
       <div class="navone">
           <ul>
               <li @click="who(0)" :class="{'colordisplay': display.display0}">首页</li>
               <li @click="who(1)" :class="{'colordisplay': display.display1}">我的购物车</li>
               <li @click="who(2)" :class="{'colordisplay': display.display2}">我要当店长</li>
               <li @click="who(3)" :class="{'colordisplay': display.display3}">我的商品列表</li>
           </ul>
       </div>

       <!-- 个人信息 -->
       <div v-if="display.display0" class="main">
            <div style="background:#eee;">
                <Card :bordered="false" style="position: relative">
                    <p slot="title" style="font-weight: bold">您的基础信息:
                        <span class="complete" @click="complete">完善或修改个人信息</span>
                    </p>
                    <p style="padding: 0 30px">
                        <ul style="width: 50%;">
                            <li>会员名: {{user.name}}</li>
                            <li>邮箱地址: {{user.email}}</li>
                            <li>手机号码: {{user.phone}}</li>
                        </ul>
                        <p class="msg">
                            <ul>
                                <li>头像:
                                    <img :src='url+user.pic' alt="">
                                </li>
                            </ul>
                        </p>
                    </p>
                </Card>
            </div>
            <div class="take">收货地址: <span class="address" @click="address">新增地址</span></div>
            <Table border :columns="columns1" :data="takelist"></Table>
       </div>

        <Modal
            v-model="modal1"
            title="请输入个人信息"
            @on-ok="ok"
            @on-cancel="cancel">
            <!-- 会员名称：<Input type="text" v-model="userMsg.name" style="width: 300px" /><br><br> -->
            邮箱地址：<Input type="text" v-model="userMsg.email" style="width: 300px" /><br><br>
            手机号码：<Input type="text" v-model="userMsg.phone" style="width: 300px" /><br><br>
            个人头像：<input type="file" id="pic" class="file" style="width: 300px" />
        </Modal>

        <Modal
            v-model="modal2"
            title="请输入个人信息"
            @on-ok="addressOk"
            @on-cancel="addressCancel">&nbsp;&nbsp;&nbsp;
            收件人：<Input type="text" v-model="addressMsg.addressee" style="width: 300px" /><br><br>
            所在地区：<Input type="text" v-model="addressMsg.area" style="width: 300px" /><br><br>
            详细地址：<Input type="text" v-model="addressMsg.address" style="width: 300px" /><br><br>
            手机号码：<Input type="text" v-model="addressMsg.phone" style="width: 300px" /><br><br>
        </Modal>

       <!-- 购物车 -->
       <div v-if="display.display1" class="shopping">
           <Alert show-icon class="tips-box">
                小提示<template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击付款即可。</template>
            </Alert>
            <br><br>
            <Table border :columns="columns" :data="shoppingCart"
                @on-select-all-cancel="handleCancelSelectAll"
                @on-select-all="handleSelectAll"
                @on-select="handleSelect"
                @on-select-cancel="handleCancel"
                no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>
            <br><br>
            <div style="background:#eee;">
                <Card :bordered="false" style="position: relative">
                    <p slot="title" style="font-weight: bold">收货人信息:</p>
                    <p style="padding: 0 30px">
                        <ul style="width: 50%;" v-if="takelist[0]">
                            <li>收件人: {{takelist[0].addressee}}</li>
                            <li>手机号码: {{takelist[0].phone}}</li>
                            <li>收货地址: {{takelist[0].address}}</li>
                        </ul>
                    </p>
                </Card>
            </div>
            <br><br>
            <div class="invoices-container">
                <div>发票信息</div>
                <p>该商品不支持开发票</p>
            </div>
            <div class="pay-container">
                <div class="pay-box">
                <p><span>提交订单应付总额：</span> <span class="money">{{shopValue}} 元</span></p>
                <div class="pay-btn">
                    <Button type="error" size="large" @click="buyShop()">支付订单</Button>
                </div>
                </div>
            </div>
       </div>

       <!-- 我要当店长 -->
       <div v-if="display.display2" class="manager">
            <div class="taketitle">请上传您需要出售的课本</div>
            <br>
            <ul>
                <li>  商品名称: <input type="text" v-model="shopMsg.title"/></li>
                <li>  商品图片: <input type="file" id="file" class="file"/></li>
                <li>  商品价格: <input type="text" v-model="shopMsg.price"/></li>
                <li>  出售数量: <input type="text" v-model="shopMsg.number"/></li>
                <li>  商品邮费: <input type="text" v-model="shopMsg.fee"/></li>
                <li>  商品描述: <textarea v-model="shopMsg.description" id="" cols="60" rows="6"></textarea></li>
                <li><br/>
                    <button @click="postShop" type="submit" class="btn btn-default">提交</button>
                </li>
            </ul>
       </div>

       <!-- 我的商品列表 -->
       <div v-if="display.display3" class="wyShopList">
            <Table border :columns="wyShopListTitle" :data="wyShopList"
                no-data-text="您暂时没有商品出售，请您先上传需要出售的商品"></Table>
            <Page :total="pageConf.total" show-sizer
            style="margin-left: 0; margin-top: 5px"
            :page-size-opts="pageConf.pageOption"
            @on-change="changePage"
            @on-page-size-change="changePageSize"/>
       </div>
       <div>
        <Modal
            v-model="modal3"
            title="确认支付信息"
            @on-ok="buyok"
            @on-cancel="buycancel">
            <p class="pay">商品名称：购物车商品</p>
            <p class="pay">支付金额：{{shopValue}}元</p>
            <p class="pay">输入密码：<input v-model="password" type="password"></p>
        </Modal>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data(){
            return{
                userMsg:{
                    email: '',
                    phone: '',
                    pic: '',
                },
                addressMsg:{
                    name: '',
                    addressee: '',
                    area: '',
                    address: '',
                    phone: '',
                },
                modal1: false,
                modal2: false,
                takelist:[],
                display:{
                    display0: true,
                    display1: false,
                    display2: false,
                    display3: false,
                },
                //收货地址
                columns1: [
                    {
                        title: '收货人',
                        key: 'addressee',
                    },
                    {
                        title: '所在地区',
                        key: 'area',
                    },
                    {
                        title: '详细地址',
                        key: 'address',
                    },
                    {
                        title: '电话/手机',
                        key: 'phone',
                    },
                    {
                        title: '默认地址',
                        key: 'chose',
                        align: 'center',
                        render: (h, params) => {
                            let status = params.row.status;
                            let id = params.row._id;
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        value: status,
                                        size: 'small'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.choseAddress(id)
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeMsg(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                shoppingCart: [],
                shopValue: 0,
                //购物车
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '商品名称',
                        width: 120,
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '图片',
                        key: 'url',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                            h('img', {
                                style:{
                                    width: "40px",
                                },
                                attrs: {
                                src: `${this.url}${params.row.url}`
                                }
                            })
                        ]);
                    },
                        align: 'center'
                    },
                    {
                        title: '价格',
                        width: 120,
                        key: 'price',
                        align: 'center'
                    },
                    {
                        title: '邮费',
                        key: 'fee',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'description',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: '120px',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteShopping(params.row._id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                //我的商品列表
                wyShopList: [],
                shopMsg: { 
                    name: '',
                    title: '',
                    price: '',
                    number: '',
                    fee: '',
                    description: '',
                    evaluate: 0,
                    collect: 0,
                    sales: 0,
                },
                //我的商品列表
                wyShopListTitle:[
                    {
                        title: '商品名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '商品图片',
                        key: 'url',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    style:{
                                        width: "40px",
                                    },
                                    attrs: {
                                    src: `${this.url}${params.row.url}`
                                    }
                                })
                            ]);
                        }, 
                    },
                    {
                        title: '商品价格',
                        key: 'price',
                        align: 'center'
                    },
                    {
                        title: '出售数量',
                        key: 'number',
                        align: 'center'
                    },
                    {
                        title: '商品邮费',
                        key: 'fee',
                        align: 'center'
                    },
                    {
                        title: '商品描述',
                        width: 250,
                        key: 'description',
                        align: 'center'
                    },
                     {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: '160px',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '20px',
                                    },
                                    on: {
                                        click: () => {
                                            this.updateShopMsg(params.row._id, params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        // marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.name)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                pageConf: {//设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 10, //每页显示的记录数
                    total:10,  //初始信息条数，后跟数据库对应
                    pageOption: [10,20,50], //分页选项
                },
                modal3: false,
                password: '',
                buyshopMsg: {},
            }
        },
        computed:{
            ...mapState(['url', 'user'])
        },
        methods:{
            complete(){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/info`,
                    data:{
                        name: this.user.name
                    }
                }).then(resp => {
                    let newData = resp.data[0];
                    this.userMsg.email = newData.email;
                    this.userMsg.phone = newData.phone;
                    // this.$store.dispatch('setUser',newData); 
                })
                this.modal1 = true;
            },
            //修改个人信息
            ok () {
                let file = document.getElementById('pic').files[0];
                let formdata = new FormData()
                formdata.append('hehe', file)
                this.$axios({
                    method: 'post',
                    url: `${this.url}/addimg/userImg`,
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).then(resp => {
                    // console.log(resp);
                    this.$axios({
                        method: 'post',
                        url: `${this.url}/addimg/updateUserMsg`,
                        data:{
                            name: {name: this.user.name},
                            content: this.userMsg
                        }
                    }).then(res => {
                        // console.log(res);
                        console.log(this.user);
                        this.$axios({
                            method: 'post',
                            url: `${this.url}/info`,
                            data:{
                                name: this.user.name
                            }
                        }).then(resp => {
                            let newData = resp.data[0];
                            console.log(newData);
                            this.$store.dispatch('setUser',newData); 
                        })
                    }).catch(resp => {
                        console.log('请求失败：');
                    });
                }).catch(resp => {
                    console.log('请求失败');
                }); 
                this.$Message.info('修改成功');
            },
            cancel () {
                this.$Message.info('取消成功');
            },

            choseAddress(id){
                // console.log(id);
            },
            //获取收货地址
            getAddress(){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/addimg/gatAddress`,
                    data: {
                        name: this.user.name
                    },
                }).then(resp => {
                    // console.log(resp.data);
                    this.takelist = resp.data;
                }).catch(resp => {
                    console.log('请求失败');
                });
            },
            address(){
                this.modal2 = true;
            },
            addressOk(){
                this.addressMsg.name = this.user.name;
                this.$axios({
                    method: 'post',
                    url: `${this.url}/addimg/address`,
                    data: this.addressMsg,
                }).then(resp => {
                    // console.log(resp);
                    this.getAddress();
                }).catch(resp => {
                    console.log('请求失败');
                });
                this.$Message.info('添加成功');
            },
            addressCancel(){
                this.$Message.info('取消成功');
            },

            //上架商品
            postShop(){
                let file = document.getElementById('file').files[0];
                let formdata = new FormData()
                formdata.append('hehe', file)
                this.$axios({
                    method: 'post',
                    url: `${this.url}/file/upload`,
                    cache: false,
                    data: formdata,
                    processData: false,
                    contentType: false,
                }).then(resp => {
                    // console.log(resp.data);
                    this.shopMsg.name = this.user.name;  
                    this.$axios({
                        method: 'post',
                        url: `${this.url}/file/shopMsg`,
                        data: this.shopMsg,
                    }).then(resp => {
                        // console.log(resp.data);
                        this.who(3);
                        this.getMyShopMsg(this.pageConf.pageCode,this.pageConf.pageSize)  
                    }).catch(resp => {
                        console.log('请求失败');
                    });
                }).catch(resp => {
                    console.log('请求失败');
                }); 
            },
            //切换次级导航
            who(num){
                this.display.display0 = false;
                this.display.display1 = false;
                this.display.display2 = false;
                this.display.display3 = false;
                this.display[`display${num}`] = true;
            },
            //获取我的商品列表
            getMyShopMsg(pageCode,pageSize){
                  this.$axios({
                    method: 'post',
                    url: `${this.url}/file/getOneShopMsg`,
                    data:{
                            name: {
                                name:this.user.name
                            },
                            pagConfig: {
                                amout: pageSize,
                                page: pageCode,
                            }
                        }
                    }).then(resp => {
                        console.log(resp.data);
                        this.pageConf.total = resp.data.num;
                        this.wyShopList = resp.data.msg;
                    }).catch(resp => {
                        console.log('请求失败：' + resp.status + ',' + resp.statusText);
                    });
            },
             //切换我的商品列表页码显示
            changePage(pageCode) {
                this.getShopMsg(pageCode,this.pageConf.pageSize)
                // this.pageConf.pageCode = pageCode; 
            },
            //切换我的商品列表每页总数显示
            changePageSize(pageSize) {
                this.getShopMsg(this.pageConf.pageCode,pageSize)
                this.pageConf.pageSize = pageSize;   
            },

            //获取我的购物车
            getshopping(){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/file/getshopping`,
                    data: {
                        name: this.user.name
                    }
                }).then(resp => {
                    this.shoppingCart = resp.data;
                    // console.log(resp.data);
                })
            },
            //多选算价格
            handleCancel(selection, row) {
                // console.log(selection); 
                this.buyshopMsg = selection               
                this.shopValue -= (parseInt(row.price) + parseInt(row.fee));
            },
            handleSelect(selection, row) {
                // console.log(selection);
                this.buyshopMsg = selection
                this.shopValue = 0;
                for(let i = 0; i < selection.length; i++){
                    this.shopValue += (parseInt(selection[i].price) + parseInt(selection[i].fee));
                }
            },
            handleSelectAll(selection) {
                // console.log(selection);
                this.buyshopMsg = selection
                this.shopValue = 0;
                for(let i = 0; i < selection.length; i++){
                    this.shopValue += (parseInt(selection[i].price) + parseInt(selection[i].fee));
                }
            },
            handleCancelSelectAll(selection) {
                // console.log(selection);
                this.buyshopMsg = selection
                this.shopValue = 0;
            },
            //删除购物车商品
            deleteShopping(_id){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/file/delshopping`,
                    data: {
                        id: _id
                    }
                }).then(resp => {
                    console.log(resp);
                    if(resp.data.err == 1){
                        this.getshopping();
                        alert(resp.data.msg)
                    }
                })
            },
            buyok () {
                this.$axios({
                    method: 'post',
                    url: `${this.url}/pay`,
                    data: {
                        username: this.user.name,
                        password: this.password,
                    }
                }).then(res => {
                    console.log(this.buyshopMsg);
                    if(res.data.err == 1){
                        for(let i = 0; i < this.buyshopMsg.length; i++){
                            this.$axios({
                                method: 'post',
                                url: `${this.url}/addimg/boughtGoods`,
                                data: {
                                    name: this.user.name,
                                    boughtGoods: this.buyshopMsg[i]
                                }
                            }).then(resp => {
                                // console.log(resp);
                                this.$axios({
                                    method: 'post',
                                    url: `${this.url}/file/delshopping`,
                                    data: {
                                        id: this.buyshopMsg[i]._id,
                                    }
                                }).then((res => {
                                    console.log(res);
                                    if(res.err = 1){
                                        this.getshopping();
                                        this.shopValue = 0;
                                    }
                                }))
                            })
                        }
                        this.$Message.info(res.data.msg);
                    }else{
                        this.$Message.info(res.data.msg);
                    }
                })
            
            },
            buycancel () {
                this.$Message.info('取消支付');
            },
            buyShop(){
                this.modal3 = true;
            }
        },
        mounted(){
            this.getMyShopMsg(this.pageConf.pageCode,this.pageConf.pageSize);
            this.getshopping();
            this.getAddress();
        }
    }
</script>

<style scoped>
    .pay{
        line-height: 30px;
    }
    .complete{
        margin-left: 398px;
        font-weight: 500;
    }
    .address{
        margin-left: 430px;
        font-weight: 500;
        border: 1px solid #26f;
        padding: 5px 10px;
        border-radius: 3px;
    }
    .complete:hover, .address:hover{
        cursor: pointer;
        color: #26f;
    }
    .personage{
        margin: 10px 100px;
    }
    .navone{
        width: 100%;
        height: 40px;  
    }
    .navone>ul>li{
        float: left;
        font-size: 18px;
        margin-left: 30px;
    }
    .colordisplay{
        color: #26f;
    }
    .navone>ul>li:hover{
        cursor: pointer;
        color: #26f;
    }
    .main, .shopping, .manager, .wyShopList{
        margin: 20px;
    }
    li{
        list-style: none;
        padding: 6px 0;
    }
    .msg{
        width: 50%;
        position: absolute;
        left: 50%;
        top: 68px;
    }
    img{
        width: 60px;
        border-radius: 50%
    }
    .take{
        font-size: 16px;
        font-weight: bold;
        margin: 40px 12px 10px;
        color: #000;
    }
    .invoices-container{
        margin-left: 12px;
    }
    .invoices-container>div{
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
    .invoices-container p{
        font-size: 12px;
        line-height: 30px;
        margin-left: 32px;
        color: #999;
    }
    .pay-container {
        margin: 15px;
        display: flex;
        justify-content: flex-end;
    }
    .pay-box {
        font-size: 18px;
        font-weight: bolder;
        color: #495060;
    }
    .money {
        font-size: 26px;
        color: #f90013;
    }
    .pay-btn {
        margin: 15px 0px;
        display: flex;
        justify-content: flex-end;
    }
    .taketitle{
        color: #f40;
        font-size: 18px;
        font-weight: bold;
    }
    .manager>ul>li{
        padding: 8px;
    }
    .file{
        display: inline-block;
    }
</style>