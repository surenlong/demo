<template>
  <div class="hello">
    <div style="margin: 0 70px">
        <div style="margin: 20px 0">
            <h2>客户的意见反馈：</h2>
        </div>

        <Table border :columns="columns1" :data="lists"></Table>
        <Page :total="pageConf.total" show-sizer
            style="margin-left: 0; margin-top: 5px"
            :page-size-opts="pageConf.pageOption"
            @on-change="changePage"
            @on-page-size-change="changePageSize"/>

        <Modal
            v-model="modal1"
            title="删除意见"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确认删除该意见？</p>
        </Modal>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        name: 'hello',
        data() {
            return {
                modal1: false,
                delNmae:'',
                search: '',
                columns1: [
                    {
                        title: '反馈标题',
                        key: 'title',
                        align: 'center',
                    },
                    {
                        title: '所属客户',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '反馈内容',
                        width: 600,
                        key: 'content',
                        align: 'center',
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
                                            this.delete(params.row._id)
                                        }
                                    }
                                }, '删除')
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
             ...mapState(['url'])
        },

        methods: {

            //获取商品信息
            getFreebackMsg(shopMsg,pageCode,pageSize){
                  this.$axios({
                    method: 'post',
                    url: `${this.url}/file/getFreebackMsg`,
                    data:{
                            document: shopMsg,
                            pagConfig: {
                                amout: pageSize,
                                page: pageCode,
                            }
                        }
                    }).then(resp => {
                        console.log(resp.data);
                        this.pageConf.total = resp.data.num;
                        this.lists = resp.data.msg;
                    }).catch(resp => {
                        console.log('请求失败：' + resp.status + ',' + resp.statusText);
                    });
            },

            //搜索功能函数
            search0() {
                // console.log(this.url)
                this.getFreebackMsg(this.shopMsg,this.pageConf.pageCode,this.pageConf.pageSize)  
            },

            //首次显示
            oneGetShopMsg() {
                this.getFreebackMsg(this.shopMsg,this.pageConf.pageCode,this.pageConf.pageSize)    
            },
            //切换页码显示
            changePage(pageCode) {
                this.getFreebackMsg(this.shopMsg,pageCode,this.pageConf.pageSize)
                // this.pageConf.pageCode = pageCode; 
            },
            //切换每页总数显示
            changePageSize(pageSize) {
                this.getFreebackMsg(this.shopMsg,this.pageConf.pageCode,pageSize)
                this.pageConf.pageSize = pageSize;   
            },

            ok () {
                this.deleteFreebackMsg(this.delNmae)
            },
            cancel () {
            },
            //删除用户
            delete(name){
                this.modal1 = true; 
                this.delNmae = name;
            },
            deleteFreebackMsg(name){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/file/deleteFreebackMsg`,
                    data:{
                        _id: name
                    }
                }).then(resp => {
                    let msg = resp.data;
                    console.log(msg);
                    this.oneGetShopMsg()
                })
            }
        },
        
        created() {   
        },

        mounted(){
            this.oneGetShopMsg() 
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
