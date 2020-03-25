<template>
  <div class="hello">
    <div style="margin: 0 70px">
        <div style="margin: 20px 0">
            <Input v-model="company.company" placeholder="请输入名称" size='default'
                type="text" id="test" style="width: 15%;"/>
            <Input v-model="company.name" placeholder="请输入手机号" size='default'
                type="text" id="test" style="width: 15%;"/>
            <Input v-model="company.phone" placeholder="请输入邮箱地址" size='default'
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
            title="删除客户"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确认删除该（{{delNmae}}）用户吗</p>
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
                delNmae: '',
                search: '',
                columns1: [
                    {
                        title: '名称',
                        width: '90px',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '手机号码',
                        width: '140px',
                        key: 'phone',
                        align: 'center'
                    },
                    {
                        title: '头像地址',
                        key: 'pic',
                        align: 'center'
                    },
                    {
                        title: '邮箱地址',
                        width: '220px',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '角色等级',
                        width: '140px',
                        key: 'roles',
                        align: 'center'
                    },
                    {
                        title: '用户类型',
                        width: '140px',
                        key: 'type',
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
                                            this.delete(params.row.name)
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
                newpage: 0,
                company:{
                    
                }
            }
        },
        
        computed:{
             ...mapState(['url'])
        },

        methods: {
            //获取公司信息
            findByPage(company,pageCode,pageSize){
                  this.$axios({
                    method: 'post',
                    url: `${this.url}/getuser`,
                    data:{
                        document: company,
                        pagConfig: {
                            amout: pageSize,
                            page: pageCode,
                        }
                    }
                    }).then(resp => {                     
                        // console.log(resp);
                        this.pageConf.total = resp.data.num;
                        this.lists = resp.data.msg;
                    }).catch(resp => {
                        console.log('请求失败：' + resp.status + ',' + resp.statusText);
                    });
            },

            //搜索功能函数
            search0() {
                // console.log(this.url)
                this.findByPage(this.company,this.pageConf.pageCode,this.pageConf.pageSize)  
            },
            //刷新显示
            updateMsg(pageCode) {
                this.findByPage(this.company,pageCode,this.pageConf.pageSize)    
            },
            //首次显示
            handleListApproveHistory() {
                this.findByPage(this.company,this.pageConf.pageCode,this.pageConf.pageSize)    
            },
            //切换页码显示
            changePage(pageCode) {
                this.newpage = pageCode
                this.findByPage(this.company,pageCode,this.pageConf.pageSize)
                // this.pageConf.pageCode = pageCode; 
            },
            //切换每页总数显示
            changePageSize(pageSize) {
                this.findByPage(this.company,this.pageConf.pageCode,pageSize)
                this.pageConf.pageSize = pageSize;   
            },
            ok () {
                this.deleteMsg(this.delNmae)
            },
            cancel () {
            },
            //删除用户
            delete(name){
                this.modal1 = true; 
                this.delNmae = name;
            },
            deleteMsg(name){
                this.$axios({
                    method: 'post',
                    url: `${this.url}/userdel`,
                    data:{
                        usr: {username:name},
                        masage: {name:name}
                    }
                }).then(resp => {
                    let msg = resp.data;
                    // console.log(msg);
                    this.updateMsg(this.newpage)
                })
            }

        },
        
        created() {  
            // let data = this.$route.params.data;         
        },

        mounted(){
            this.handleListApproveHistory() 
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
