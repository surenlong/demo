<template>
    <div class="indent">
        <!-- 导航部分 -->
        <div class="navone">
            <ul>
                <li @click="who(0)" :class="{'colordisplay': display.display0}">待发货</li>
                <li @click="who(1)" :class="{'colordisplay': display.display1}">待收货</li>
                <li @click="who(2)" :class="{'colordisplay': display.display2}">待评价</li>
                <li @click="who(3)" :class="{'colordisplay': display.display3}">店长快发货</li>
            </ul>
        </div>

        <!-- 主体 -->
        <div v-if="display.display0">
            <Table border :columns="columns0" :data="deliverList"></Table>
        </div>
        <div v-if="display.display1">
            <Table border :columns="columns1" :data="takeList"></Table>
        </div>
        <div v-if="display.display2">
            <Table border :columns="columns2" :data="evaluateList"></Table>
        </div>
        <div v-if="display.display3">
            <Table border :columns="columns3" :data="managerDeliverList"></Table>
        </div>

        <!-- 友情提示 -->
        <Modal
            v-model="modal0"
            title="确认发货"
            @on-ok="ok0"
            @on-cancel="cancel0">
            <p>确认已经发货了吗</p>
        </Modal>
        <Modal
            v-model="modal1"
            title="确认收货"
            @on-ok="ok1"
            @on-cancel="cancel1">
            <p>确认已经收货了吗</p>
        </Modal>
        <Modal
            v-model="modal2"
            title="评价"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <Rate v-model="value" />
        </Modal>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['url', 'user'])
    },
    data(){
        return{
            modal0: false,
            _id: '',
            modal1: false,
            modal2: false,
            dbid: '',
            value: 0,
            display:{
                display0: true,
                display1: false,
                display2: false,
                display3: false,
            },
            deliverList: [],
            takeList: [],
            evaluateList: [],
            managerDeliverList: [],
            columns0: [
                {
                    title: '商品名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '图片',
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
                    title: '价格',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '邮费',
                    key: 'fee',
                    align: 'center'
                },
                {
                    title: '描述',
                    width: 380,
                    key: 'description',
                    align: 'center'
                }
            ],
            columns1: [
                {
                    title: '商品名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '图片',
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
                    title: '价格',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '邮费',
                    key: 'fee',
                    align: 'center'
                },
                {
                    title: '描述',
                    key: 'description',
                    width: 380,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
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
                                        this.delTakeList(params.row._id)
                                    }
                                }
                            }, '确认收货')
                        ]);
                    }
                },
            ],
            columns2: [
                {
                    title: '商品名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '图片',
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
                    title: '价格',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '邮费',
                    key: 'fee',
                    align: 'center'
                },
                {
                    title: '描述',
                    key: 'description',
                    width: 380,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
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
                                        this.postEvaluateList(params.row._id)
                                    }
                                }
                            }, '评价')
                        ]);
                    }
                },
            ],
            columns3: [
                {
                    title: '商品名称',
                    key: 'title',
                    align: 'center'
                },
                {
                    title: '图片',
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
                    title: '价格',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '邮费',
                    key: 'fee',
                    align: 'center'
                },
                {
                    title: '描述',
                    key: 'description',
                    width: 380,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
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
                                        this.delManagerDeliverList(params.row._id)
                                    }
                                }
                            }, '确认发货')
                        ]);
                    }
                },
            ],
        }
    },
    methods:{
        //展示哪个
        who(num){
            this.display.display0 = false;
            this.display.display1 = false;
            this.display.display2 = false;
            this.display.display3 = false;
            this.display[`display${num}`] = true;
        },

        //获取代发货列表
        getDeliverList(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/deliverList`,
                data: {
                    name: this.user.name
                }
            }).then((res) => {
                // console.log(res);
                this.deliverList = res.data
            })
        },

        //获取店长快发货
        getManagerDeliverList(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/managerDeliverList`,
                data: {
                    name: this.user.name
                }
            }).then((res) => {
                // console.log(res);
                this.managerDeliverList = res.data
            })
        },
        //店长确认发货
        delManagerDeliverList(_id){
            this.modal0 = true
            this._id = _id;
        },
        //再次确认才发货
        ok0(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/delManagerDeliverList`,
                data: {
                    _id: this._id
                }
            }).then((res) => {
                // console.log(res);
                if(res.data.err == 1){
                    this.getDeliverList();
                    this.getManagerDeliverList();
                    this.getTakeList();
                }
            })
            this.$Message.info('发货成功');
        },
        cancel0(){
            this.$Message.info('取消成功');
        },

        //获取客户待收货信息
        getTakeList(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/getTakeList`,
                data: {
                    name: this.user.name
                }
            }).then((res) => {
                // console.log(res);
                this.takeList = res.data;
            })
        },
        //确认收货
        delTakeList(_id){
            this.modal1 = true
            this._id = _id;
        },
        ok1(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/delTakeList`,
                data: {
                    _id: this._id
                }
            }).then((res) => {
                console.log(res);
                if(res.data.err == 1){
                    this.getTakeList();
                    this.getEvaluateList();
                }
            })
            this.$Message.info('收货成功');
        },
        cancel1(){
            this.$Message.info('取消成功');
        },

        //获取待评价的商品
        getEvaluateList(){
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/getEvaluateList`,
                data: {
                    name: this.user.name
                }
            }).then((res) => {
                // console.log(res);
                this.evaluateList = res.data;
            })
        },

        //评价
        postEvaluateList(_id){
            this.modal2 = true;
            this.dbid = _id;
        },
        ok2(){
            // console.log(this.value);
            this.$axios({
                method: 'post',
                url: `${this.url}/addimg/evaluateContent`,
                data: {
                    _id: this.dbid,
                    evaluate: this.value
                }
            }).then((res) => {
                console.log(res);
                // this.evaluateList = res.data;
                this.getEvaluateList();
            })
            this.$Message.info('评价成功');
        },
        cancel2(){
            this.$Message.info('取消成功');
        },
    },
    mounted(){
        this.getDeliverList();
        this.getManagerDeliverList();
        this.getTakeList();
        this.getEvaluateList();
    }
}
</script>
<style scoped>
    .indent{
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
</style>