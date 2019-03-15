<style lang="less">

</style>
<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">旅游卡销售订单</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看销售订单信息详情</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                searchCount: 1,
                currentIndex: 1,
                isClose: false,
                spinShow: true,
                btnList:[
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    }
                ],
                currentRowData: {},
                formItemList:[
                    {
                        type: 1,
                        label: '单号',
                        keyName:'orderID',
                    },
                    {
                        type: 1,
                        label: '旅游卡名称',
                        keyName:'cardName'
                    },
                    {
                        type: 1,
                        label: '买家账号',
                        keyName:'userId'
                    },
                    {
                        type: 1,
                        label: '旅游卡卡号',
                        keyName:'cardNum'
                    },
                    {
                        type: 1,
                        label: '分润协议号',
                        keyName:'profitNum'
                    },
                    {
                        type: 1,
                        label: '姓名',
                        keyName:'userName'
                    },
                    {
                        type: 1,
                        label: '身份证号码',
                        keyName:'identityNum'
                    },
                    {
                        type: 4,
                        label: '开通状态',
                        keyName:'openingStatus',
                        optionList:[
                            {
                                value : -99,
                                label : '全部'
                            },
                            {
                                value : -1,
                                label : '未开通'
                            },
                            {
                                value : 0,
                                label : '正常'
                            },
                            {
                                value : 1,
                                label : '已过期'
                            }
                        ]
                    },
                    {
                        type: 4,
                        label: '支付状态',
                        keyName:'payStatus',
                        optionList:[
                            {
                                value : -99,
                                label : '全部'
                            },
                            {
                                value : 0,
                                label : '未支付'
                            },
                            {
                                value : 1,
                                label : '已支付'
                            }

                        ]
                    },
                    {
                        type: 11,
                        label: '旅游卡有效日期',
                        double: true,
                        dateType: 'date',
                        keyName: 'csti',
                        keyName1: 'ceti',
                    },
                    {
                        type: 11,
                        label: '创建日期',
                        double: true,
                        dateType: 'date',
                        keyName: 'fsti',
                        keyName1: 'feti',
                    }
                ],
                colname:[
                    {
                        title: '单号',
                        width: 150,
                        render: (h, params) => {
                            return h('span',{
                                'class': 'hover_span',
                                on: {
                                    click: () => {
                                        this.changeIndex(14, params.row.orderID)
                                    }
                                }
                            }, params.row.orderID)
                        }
                    },
                    {
                        title: '创建日期',
                        width: 150,
                        render: (h, params) => {
                            return h('span', `${this.$common.getCurrentDate(params.row.createDate)} ${this.$common.getCurrentTime(params.row.createDate)}`)
                        }
                    },
                    {
                        title: '买家账号',
                        key: 'userId',
                        width: 100,
                    },
                    {
                        title: '旅发委发行',
                        key: 'tourCommission',
                        width: 120,
                    },
                    {
                        title: '旅游卡代码',
                        key: 'cardCode',
                        width: 120,
                    },
                    {
                        title: '旅游卡名称',
                        key: 'cardName',
                        width: 120,
                    },
                    {
                        title: '分润协议号',
                        key: 'profitNum',
                        width: 120,
                    },
                    {
                        title: '旅游卡卡号',
                        key: 'cardNum',
                        width: 150,
                    },
                    {
                        title: '姓名',
                        key: 'userName',
                        width: 90,
                    },
                    {
                        title: '身份证',
                        key: 'identityNum',
                        width: 150,
                    },
                    {
                        title: '手机号',
                        key: 'mobileNum',
                        width: 120,
                    },
                    {
                        title: '旅游卡生效时间',
                        key: 'periodStartDate',
                        width: 150,
                    },
                    {
                        title: '旅游卡截止时间',
                        key: 'periodEndDate',
                        width: 150,
                    },
                    {
                        title: '单价',
                        width: 100,
                        render: (h, params) => {
                            return h('span', `${params.row.price}元`)
                        }
                    },
                    {
                        title: '支付状态',
                        width: 100,
                        render: (h, params) => {
                            return h('span', params.row.payStatus ? '已支付' : '未支付')
                        }
                    },
                    {
                        title: '旅游卡状态',
                        width: 100,
                        render: (h, params) => {
                            return h('span', params.row.openingStatus == 0 ? '正常' : (params.row.openingStatus == 1 ? '已过期' : '未开通'))
                        }
                    },
                    {
                        title: '可使用景区',
                        key: 'isSenicids',
                        width: 180,
                    },
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    formDatas:{
                        payStatus: -99,
                        openingStatus: -99,
                        fsti: this.$common.getCurrentDate(),
                        feti: this.$common.getCurrentDate(),
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery: {},
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '单号',
                        keyName: 'orderID',
                        cols: 12
                    },
                    {
                        label: '创建时间',
                        keyName: 'createDate',
                        cols: 12
                    },
                    {
                        label: '买家账号',
                        keyName: 'userId',
                        cols: 12
                    },
                    {
                        label: '旅发委发行',
                        keyName: 'tourCommission',
                        cols: 12
                    },
                    {
                        label: '旅游卡代码',
                        keyName: 'cardCode',
                        cols: 12
                    },
                    {
                        label: '旅游卡名称',
                        keyName: 'cardName',
                        cols: 12
                    },
                    {
                        label: '旅游卡卡号',
                        keyName: 'cardNum',
                        cols: 12
                    },
                    {
                        label: '分润协议名称',
                        keyName: 'profitNum',
                        cols: 12
                    },
                    {
                        label: '姓名',
                        keyName: 'userName',
                        cols: 12
                    },
                    {
                        label: '身份证号',
                        keyName: 'markedIdentityNum',
                        cols: 12
                    },
                    {
                        label: '手机号',
                        keyName: 'mobileNum',
                        cols: 12
                    },
                    {
                        label: '银行卡发行',
                        keyName: 'bankCardPublishAddr',
                        cols: 12
                    },
                    {
                        label: '身份信息归属地',
                        keyName: 'bankCardBelongAddr',
                        cols: 12
                    },
                    {
                        label: '旅游卡生效时间',
                        keyName: 'periodStartDate',
                        cols: 12
                    },
                    {
                        label: '旅游卡截止时间',
                        keyName: 'periodEndDate',
                        cols: 12
                    },
                    {
                        label: '旅游卡有效次数',
                        keyName: 'effectiveTimes',
                        cols: 12
                    },
                    {
                        label: '单价',
                        keyName: 'price',
                        cols: 12
                    },
                    {
                        label: '支付状态',
                        keyName: 'payStatus',
                        cols: 12
                    },
                    {
                        label: '开通状态',
                        keyName: 'openingStatus',
                        cols: 12
                    },
                    {
                        label: '可使用景区',
                        keyName: 'isSenicids',
                        cols: 12
                    },
                    {
                        label: '说明',
                        keyName: 'descpt',
                    }
                ]
            }
        },
        methods:{
            //点击新增修改查看按钮跳到对应页面
            changeIndex (type,id) {
                this.spinShow = true;
                if (type === 14) {
                    this.setViewInitData(type,id)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.orderID;
                this.currentRowData["name"] = 'orderID';
            },
            changePage(pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.currentRowData = {};
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardOrder/v1/list', this);
            },
            changePageSize(pageSize){
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.currentRowData = {};
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardOrder/v1/list', this)
            },
            getFormData(data){
                if (!(data.fsti instanceof Date)) {
                    data.fsti = new Date(data.fsti.replace(/-/g,'/'))
                }
                if (!(data.feti instanceof Date)) {
                    data.feti = new Date(data.feti.replace(/-/g,'/'))
                }
                if (data.fsti && data.feti) {
                    if (data.fsti.getTime() > data.feti.getTime()) {
                        this.$common.showMessageModal(this, '旅游卡有效期开始日期不能大于结束日期', 2);
                        return
                    }
                } else if (!data.csti && data.ceti) {
                    this.$common.showMessageModal(this, '请输入旅游卡有效期开始日期', 2);
                    return
                } else if (data.csti && !data.ceti) {
                    this.$common.showMessageModal(this, '请输入旅游卡有效期结束日期', 2);
                    return
                }
                if (data.fsti.getTime() > data.feti.getTime()) {
                    this.$common.showMessageModal(this, '创建日期开始日期不能大于结束日期', 2);
                    return
                }
                this.pars.formDatas = data;
                this.pars.formDatas.fsti = this.$common.getCurrentDate(this.pars.formDatas.fsti);
                this.pars.formDatas.feti = this.$common.getCurrentDate(this.pars.formDatas.feti);
                if (this.pars.formDatas.csti) {
                    this.pars.formDatas.csti = this.$common.getCurrentDate(this.pars.formDatas.csti)
                }
                if (this.pars.formDatas.ceti) {
                    this.pars.formDatas.ceti = this.$common.getCurrentDate(this.pars.formDatas.ceti)
                }
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardOrder/v1/list', this)
            },
            clearFormData(){
                this.pars.formDatas = {
                    payStatus: -99,
                    openingStatus: -99,
                    fsti: this.$common.getCurrentDate(),
                    feti: this.$common.getCurrentDate()
                }
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                }
            },
            setViewInitData (type,id) {
                id = id ? id : this.currentRowData.id;
                this.$http.get(`${this.baseUrl}/tourcard/tourCardOrder/v1/get/${id}`,{
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.createDate = `${this.$common.getCurrentDate(data.createDate)} ${this.$common.getCurrentTime(data.createDate)}`
                        data.effectiveTimes = data.effectiveTimes ? data.effectiveTimes : '不限';
                        data.payStatus = data.payStatus ? '已支付' : '未支付';
                        data.openingStatus = data.openingStatus === 0 ? '正常' : (data.openingStatus === 1 ? '已过期' : '未开通');
                        this.formDatas_view = data;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardOrder/v1/list', this);
        },
        mounted () {
            this.pars.formDatas.fsti = this.$common.getCurrentDate(this.pars.formDatas.fsti);
            this.pars.formDatas.feti = this.$common.getCurrentDate(this.pars.formDatas.feti);
            if (this.pars.formDatas.csti) {
                this.pars.formDatas.csti = this.$common.getCurrentDate(this.pars.formDatas.csti)
            }
            if (this.pars.formDatas.ceti) {
                this.pars.formDatas.ceti = this.$common.getCurrentDate(this.pars.formDatas.ceti)
            }
        }
    }
</script>

<style>

</style>
