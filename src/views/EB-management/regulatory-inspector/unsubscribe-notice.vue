<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">退订通知查询</span>
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
                        :disabledStartDate="disabledStartDate"
                        :disabledEndDate="disabledEndDate"
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
                <common-dialog
                        :modal="modal"
                        :content-type="dialogContentType"
                        dialog-title="登录密码初始化"
                        :form-datas="dialogFormDatas"
                        dialog-message="确定要重置退订通知吗？"
                        @changeModal="changeModal"
                        :modal-loading="modal_loading"
                        :is-from-btn-components="isFromBtnComponents"
                        :current-data="currentRowData"
                ></common-dialog>
            </Card>
            <Card v-show="currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">修改消费通知</span>
                </p>
                <detail-form1
                        ref = "card"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "120"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                searchCount: 1,
                currentIndex: 1,
                isClose: false,
                tipName: '操作',
                spinShow: true,
                total: 0,
                loading: false,
                btnLoading: false,
                disabledStartDate: [9999,0],
                disabledEndDate: [9999,0],
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    // {
                    //     type: 13,
                    //     btnlabel: '修改',
                    // }
                ],
                currentRowData: {},
                formItemList: [
                    {
                        type: 1,
                        label: '订单号',
                        keyName:'code',
                        labelWidth: 70
                    },
                    {
                        type: 4,
                        label: '状态',
                        keyName:'status',
                        labelWidth: 55,
                        optionList: [
                            {
                                value: 0,
                                label: '未通知'
                            },
                            {
                                value: 1,
                                label: '已通知'
                            },
                            {
                                value: 9,
                                label: '失败'
                            },
                        ]
                    },
                    {
                        type: 11,
                        label: '日期',
                        double: true,
                        keyName:'dateStart',
                        keyName1:'dateEnd',
                        labelWidth: 55
                    }
                ],
                colname:[
                    {
                        title: '订单号',
                        key: 'orid'
                    },
                    {
                        title: '分销商订单号',
                        key: 'distributorOrderId',
                    },
                    {
                        title: '供应商名称',
                        key: 'supplierName'
                    },
                    {
                        title: '分销商名称',
                        key: 'distributorName'
                    },
                    {
                        title: '退订流水号',
                        key: 'refundSeq'
                    },
                    {
                        title: '申请时间',
                        render: (h, params) => {
                            return h('span', `${this.$common.getCurrentDate(params.row.createDate)} ${this.$common.getCurrentTime(params.row.createDate)}`)
                        }
                    },
                    {
                        title: '退订数量',
                        key: 'refundQuantity'
                    },
                    {
                        title: '退订金额',
                        key: 'orderRefundPrice'
                    },
                    {
                        title: '退订手续费',
                        key: 'orderRefundCharge'
                    },
                    {
                        title: '通知次数',
                        key: 'notifyCount'
                    },
                    // {
                    //     title: '消费时间',
                    //     render: (h, params) => {
                    //         return `${this.$common.getCurrentDate(params.row.createDate)} ${this.$common.getCurrentTime(params.row.createDate)}`
                    //     }
                    // },
                    {
                        title: '当前状态',
                        render: (h, params) => {
                            return h('span', params.row.status === 0 ? '未通知' : (params.row.status === 1 ? '已通知' : '失败'))
                        }
                    },
                    // {
                    //     title: '更新时间',
                    //     render: (h, params) => {
                    //         return `${this.$common.getCurrentDate(params.row.updateTime)} ${this.$common.getCurrentTime(params.row.updateTime)}`
                    //     }
                    // },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('span', {
                                'class': 'hover_span',
                                on: {
                                    click: () => {
                                        this.modal = true;
                                        this.dialogFormDatas.id = params.row.id;
                                    }
                                }
                            }, '重置退订通知')
                        }
                    },
                ],
                tableData:[],
                pars:{
                    formDatas:{
                        dateStart: this.$common.getCurrentDate(),
                        dateEnd: this.$common.getCurrentDate(),
                    },
                    pageNum:10,
                    pageCode:1
                },
                urlQuery:{},
                //弹窗
                modal:false,
                dialogFormDatas: {
                    id: ''
                },
                dialogContentType:0,
                modal_loading:false,
                isFromBtnComponents:false,
                //--------------
                formDatas_add: {},
                ruleDatas: {},
                formItemList_add: [
                    {
                        type: 1,
                        label: '订单号',
                        keyName: 'orid',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '下单用户',
                        keyName: 'orderuserid',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '消费数量',
                        keyName: 'useQuantity',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '消费时间',
                        keyName: 'consumedate',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '企业编码',
                        keyName: 'oto_code',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '消费流水号',
                        keyName: 'sign',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '发送次数',
                        keyName: 'printNum',
                    },
                    {
                        type: 2,
                        label: '状态',
                        keyName: 'state',
                        optionList: [
                            {
                                value: 1,
                                labelName: '成功'
                            },
                            {
                                value: 0,
                                labelName: '失败'
                            },
                        ]
                    },
                ],
            }
        },
        methods: {
            changeIndex (type) {
                this.spinShow = true;
                if (type === 13) {
                    this.setEditInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.orid;
                this.currentRowData["name"] = 'orid';
            },
            changePage(pageCode) {
                this.$common.getParsBeforeSearch(this);
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/ec/orderNotify/v1/refund/page', this, 'get');
            },
            changePageSize(pageSize){
                this.$common.getParsBeforeSearch(this);
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/ec/orderNotify/v1/refund/page', this, 'get');
            },
            getFormData(data){
                if (!this.$common.validateDate(this, data.dateStart, data.dateEnd)) return;
                this.pars.formDatas = data;
                this.pars.formDatas.dateStart = this.$common.getCurrentDate(this.pars.formDatas.dateStart);
                this.pars.formDatas.dateEnd = this.$common.getCurrentDate(this.pars.formDatas.dateEnd);
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ec/orderNotify/v1/refund/page', this, 'get');
            },
            clearFormData(){
                this.pars.formDatas = {
                    dateStart: this.$common.getCurrentDate(),
                    dateEnd: this.$common.getCurrentDate()
                }
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    startInt: this.pars.pageCode,
                    dateStart: this.pars.formDatas.dateStart,
                    dateEnd: this.pars.formDatas.dateEnd,
                    code: this.pars.formDatas.code,
                    status: this.pars.formDatas.status,
                };
            },
            setEditInitData (type) {
                this.$http.get(`${this.baseUrl}/ec/cytConsumeManager/v1/detail/${this.currentRowData.id}`, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        this.formDatas_add = res.data.data
                    } else {
                        this.$common.showMessageModal(this, res ,1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                })
            },
            async getFormDataAdd (obj) {
                let aaa = '';
                this.btnLoading = true;
                aaa = await this.$common.editData('/ec/cytConsumeManager/v1/update', this, obj);
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ec/cytConsumeManager/v1/list', this);
            },
            async changeModal (e) {
                if (e) {
                    this.modal_loading = true;
                    this.tipName = '重置退订通知';
                    const aaa = await this.$common.editData(`/ec/orderNotify/v1/refund/reset?id=${this.dialogFormDatas.id}`, this, {}, 'get', true);
                    if (aaa) this.$common.currentPageData(this.baseUrl+'/ec/orderNotify/v1/refund/page', this, 'get');
                    this.modal_loading = false;
                }
                this.modal = false;
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/ec/orderNotify/v1/refund/page', this, 'get');
        },
        mounted () {
            this.pars.formDatas.dateStart = this.$common.getCurrentDate(this.pars.formDatas.dateStart);
            this.pars.formDatas.dateEnd = this.$common.getCurrentDate(this.pars.formDatas.dateEnd);
        },
        watch: {
            'pars.formDatas.dateStart' (val) {
                let time = 0;
                this.disabledEnd = Date.parse(val);
                time = Math.floor((new Date().getTime() - this.disabledEnd)/86400000);
                this.disabledEndDate = [time,0]
            }
        }
    }
</script>

<style scoped>

</style>
