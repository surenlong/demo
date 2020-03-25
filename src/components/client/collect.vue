<template>
  <div class="hello">
    <div style="margin: 0 70px">
        <div style="margin: 20px 0">
            <Input v-model="shopMsg.title" placeholder="请输入书名" size='default'
                type="text" id="test" style="width: 15%;"/>
            <Button type="primary" icon="ios-search" size='default'
                @click="search0()">搜索
            </Button>
            <!-- <button @click="aaaa">按钮</button> -->
        </div>

        <Table border :columns="columns1" :data="lists"></Table>
        <Page :total="pageConf.total" show-sizer
            style="margin-left: 0; margin-top: 5px"
            :page-size-opts="pageConf.pageOption"
            @on-change="changePage"
            @on-page-size-change="changePageSize"/>

        <Modal
            v-model="modal1"
            title="取消收藏"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确认取消收藏该商品吗？</p>
        </Modal>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        name: 'collect',
        data() {
            return {
                modal1: false,
                delShopMsg: {},
                search: '',
                columns1: [
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
                        title: '所属商家',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '单件价格/元',
                        key: 'price',
                        align: 'center',
                    },
                    {
                        title: '库存数量',
                        key: 'number',
                        align: 'center',
                    },
                    {
                        title: '邮费',
                        key: 'fee',
                        align: 'center',
                    },
                    {
                        title: '描述',
                        width: 260,
                        key: 'description',
                        align: 'center',
                    },
                    {
                        title: '查看详情',
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
                                    on: {
                                        click: () => {
                                            this.showDitail(params.row)
                                        }
                                    }
                                }, '点击查看'),
                            ]);
                        }
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
                                    on: {
                                        click: () => {
                                            this.delete(params.row)
                                        }
                                    }
                                }, '取消收藏'),
                            ]);
                        }
                    },
                ],
                // 初始化信息总条数
                // 每页显示多少条
                searchData: [],
                newMsg:{},
                lists:[],
                pageConf: {//设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 10, //每页显示的记录数
                    total:10,  //初始信息条数，后跟数据库对应
                    pageOption: [10,20,50], //分页选项
                },
                shopMsg:{
                   
                }
            }
        },
        
        computed:{
             ...mapState(['url', 'user'])
        },

        methods: {

            //获取商品信息
            getSelfShopList(){
                  this.$axios({
                    method: 'post',
                    url: `${this.url}/file/getSelfShopList`,
                    data:{
                            name: this.user.name
                        }
                    }).then(resp => {
                        // console.log(resp.data);
                        this.lists = resp.data;
                    }).catch(resp => {
                        console.log('请求失败：' + resp.status + ',' + resp.statusText);
                    });
            },

            //搜索功能函数
            search0() {
                // console.log(this.url)
                this.getSelfShopList(this.shopMsg,this.pageConf.pageCode,this.pageConf.pageSize)  
            },

            //首次显示
            oneGetShopMsg() {
                this.getSelfShopList(this.shopMsg,this.pageConf.pageCode,this.pageConf.pageSize)    
            },
            //切换页码显示
            changePage(pageCode) {
                this.getSelfShopList(this.shopMsg,pageCode,this.pageConf.pageSize)
                // this.pageConf.pageCode = pageCode; 
            },
            //切换每页总数显示
            changePageSize(pageSize) {
                this.getSelfShopList(this.shopMsg,this.pageConf.pageCode,pageSize)
                this.pageConf.pageSize = pageSize;   
            },

            ok () {
                this.deleteShopMsg(this.delShopMsg)
            },
            cancel () {
            },
            //删除商品
            delete(delShopMsg){
                console.log(delShopMsg);
                this.delShopMsg._id = delShopMsg._id;
                this.delShopMsg.name = delShopMsg.name;
                this.delShopMsg.title = delShopMsg.title;
                this.delShopMsg.price = delShopMsg.price;
                this.delShopMsg.number = delShopMsg.number;
                this.delShopMsg.fee = delShopMsg.fee;
                this.delShopMsg.description = delShopMsg.description;
                this.delShopMsg.evaluate = delShopMsg.evaluate;
                this.delShopMsg.collect = delShopMsg.collect;
                this.delShopMsg.sales = delShopMsg.sales;
                this.delShopMsg.url = delShopMsg.url;
                // delete delShopMsg._index;
                // delete delShopMsg._rowKey;
                console.log(this.delShopMsg);
                this.modal1 = true; 
                // this.delShopMsg = delShopMsg;
            },
            deleteShopMsg(delShopMsg){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/file/collectShop`,
                    data:{
                        name: this.user.name,
                        shopMsg: delShopMsg
                    }
                }).then(resp => {
                    let msg = resp.data;
                    console.log(msg);
                    this.oneGetShopMsg()
                })
            },
            showDitail(item){
                // console.log(item);
                this.$router.push({name:'ShopDitail', params: item})
            },
        },
        
        mounted(){
            this.getSelfShopList() 
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .change {
    position: relative;
    width: 90px;
    margin-bottom: 10px;
  }

  .change:hover {
    cursor: pointer;
  }
</style>
