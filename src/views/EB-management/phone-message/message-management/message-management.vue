<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">信息管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData = "refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth="labelWidth"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :disabledStartDate="disabledStartDate"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                        @setFastDay="setFastDay"
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
            <Card v-show="currentIndex === 13 || currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 13" class="title_span">短信内容重发</span>
                    <span v-if="currentIndex === 14" class="title_span">修改短信内容重发</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "160"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataResend"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 12">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">指定客户发送新短信</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_view"
                        :ruleDatas = "ruleDatas_view"
                        :labelWidth = "160"
                        :formItemList = "formItemList_view"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataSend"
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
                tipName: '',
                spinShow: true,
                total: 0,
                loading: false,
                btnLoading: false,
                labelWidth: 80,
                disabledEnd: 0,
                disabledStartDate: [9999,0],
                disabledEndDate: [9999,0],
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 13,
                        btnlabel: '重发',
                    },
                    {
                        type: 14,
                        btnlabel: '修改内容重发',
                    },
                    {
                        type: 12,
                        btnlabel: '指定客户发送新短信',
                    }
                ],
                currentRowData: {},
                formItemList: [
                    {
                        type: 11,
                        label: '日期段',
                        double: true,
                        keyName: 'rzti',
                        keyName1: 'ldti',
                        class: 'float_option_50',
                        isShowFiveOptions: true,
                    }
                ],
                colname:[
                    {
                        title: '接收手机号',
                        key: 'revmbno',
                        width: 150
                    },
                    {
                        title: '短信内容',
                        key: 'note',
                        width: 1100
                    },
                    {
                        title: '短信生成时间',
                        key: 'dtime',
                        width: 200
                    },
                    {
                        title: '短信发送时间',
                        key: 'stime',
                        width: 200
                    },
                    {
                        title: '是否发送成功',
                        width: 120,
                        render: (h, params) => {
                            return h('span', params.row.isok ? '成功' : '失败')
                        }
                    },
                    {
                        title: '已发送次数',
                        key: 'quantity',
                        width: 120
                    }
                ],
                tableData:[],
                pars:{
                    formDatas:{
                        rzti: this.$common.getCurrentDate(),
                        ldti: this.$common.getCurrentDate(),
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                formDatas_add: {},
                ruleDatas: {
                    note: [
                        { required: true, message: '发送内容不能为空', trigger: 'blur' }
                    ]
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: '短信流水号',
                        keyName: 'seq',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '接收手机号',
                        keyName:'revmbno',
                        disabled: true,
                    },
                    {
                        type: 7,
                        label: '发送内容',
                        keyName:'note',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '短信生成时间',
                        keyName:'dtime',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '短信发送时间',
                        keyName:'stime',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '发送状态',
                        keyName:'isok',
                        disabled: true,
                    },
                ],
                formDatas_view: {
                    isok: '失败'
                },
                ruleDatas_view: {
                    revmbno: [
                        { required: true, validator: this.$reg.mobile, trigger: 'blur' }
                    ],
                    note: [
                        { required: true, message: '发送内容不能为空', trigger: 'blur' }
                    ]
                },
                formItemList_view: [
                    {
                        type: 1,
                        label: '接受手机号',
                        keyName:'revmbno',
                    },
                    {
                        type: 7,
                        label: '发送内容',
                        keyName:'note',
                    },
                    {
                        type: 1,
                        label: '发送状态',
                        keyName:'isok',
                        disabled: true,
                    },
                ],
            }
        },
        methods: {
            //点击新增修改查看按钮跳到对应页面
            changeIndex (type) {
                this.spinShow = true;
                if (type === 13) {
                    this.tipName = '短信重发';
                    this.setViewInitData(type)
                } else if (type === 14) {
                    this.tipName = '短信重发';
                    this.setEditInitData(type)
                } else if (type === 12) {
                    this.tipName = '短信发送';
                    this.setAddInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.seq;
                this.currentRowData["name"] = 'seq';
            },
            changePage(pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        console.log(JSON.parse(JSON.stringify(item.pars)));
                        this.pars = item.pars;
                        break;
                    }
                }
                this.currentRowData = {};
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get');
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
                this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get');
            },
            getFormData(data){
                if (!this.$common.validateDate(this, data.rzti, data.ldti)) return;
                data.rzti = this.$common.getCurrentDate(data.rzti);
                data.ldti = this.$common.getCurrentDate(data.ldti);
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get');
            },
            clearFormData(){
                this.pars.formDatas = {
                    rzti: this.$common.getCurrentDate(),
                    ldti: this.$common.getCurrentDate(),
                }
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get');
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    rzti: this.$common.getCurrentDate(this.pars.formDatas.rzti),
                    ldti: this.$common.getCurrentDate(this.pars.formDatas.ldti),
                };
            },
            setFastDay (day) {  //近多少多少天
                this.pars.formDatas.rzti = this.$common.getCurrentDate();
                this.pars.formDatas.ldti = this.$common.getCurrentDate();
                if (day === -1) {
                    this.pars.formDatas.rzti = this.$common.getCurrentDate(this.pars.formDatas.rzti,day);
                    this.pars.formDatas.ldti = this.$common.getCurrentDate(this.pars.formDatas.ldti,day);
                } else if (day < -1){
                    this.pars.formDatas.rzti = this.$common.getCurrentDate(this.pars.formDatas.rzti,day+1);
                    this.pars.formDatas.ldti = this.$common.getCurrentDate(this.pars.formDatas.ldti);
                }
            },
            getSingleMessage (type) {
                this.$http.get(`${this.baseUrl}/sys/message/v1/detail/${this.currentRowData.id}`, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.isok = data.isok ? '成功' : '失败';
                        this.formDatas_add = data
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                })
            },
            setViewInitData (type) {
                this.formItemList_add[2].disabled = true;
                this.getSingleMessage(type)
            },
            setEditInitData (type) {
                this.formItemList_add[2].disabled = false;
                this.getSingleMessage(type)
            },
            async getFormDataResend (obj) {
                let aaa = '';
                this.btnLoading = true;
                if(this.currentIndex === 13){
                    aaa = await this.$common.editData(`/sys/message/v1/repeatSend/${obj.seq}`, this, {}, 'get')
                } else if(this.currentIndex === 14){
                    aaa = await this.$common.editData(`/sys/message/v1/updateAndrepeatSend`, this, obj, 'post')
                }
                if (aaa) this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get')
            },
            setAddInitData (type) {
                this.spinShow = false;
                this.currentIndex = type;
            },
            async getFormDataSend (obj) {
                let aaa = '';
                this.btnLoading = true;
                aaa = await this.$common.editData(`/sys/message/v1/customMessage`, this, obj, 'post');
                if (aaa) this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get');
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/sys/message/v1/list', this, 'get');
        },
        watch: {
            'pars.formDatas.rzti' (val) {
                let time = 0;
                this.disabledEnd = Date.parse(val);
                time = Math.floor((new Date().getTime() - this.disabledEnd)/86400000);
                time = time > 29 ? 29 : time;
                this.disabledEndDate = [-1,time];
            }
        }
    }
</script>

<style scoped>

</style>
