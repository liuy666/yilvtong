<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">旅游卡入园订单</span>
                    <top-title-opbtn :btnList="btnList"></top-title-opbtn>
                </p>
                <Tabs :value="pars.formDatas.errorsid" :animated="false" @on-click="switchTabs">
                    <TabPane label="订单查询" name="0">
                        <detail-form1
                                :isListPage="true"
                                :isMixed="false"
                                :labelWidth = "labelWidth"
                                :formDatas="pars.formDatas"
                                :formItemList="formItemList"
                                @getFormData="getFormData"
                                @clearFormData="clearFormData"
                        ></detail-form1>
                    </TabPane>
                    <TabPane label="按订单或联系人查询" name="1">
                        <detail-form1
                                :isListPage="true"
                                :isMixed="true"
                                :labelWidth = "labelWidth"
                                :formDatas="pars.formDatas"
                                :formItemList="formItemList1"
                                @getFormData="getFormData"
                                @clearFormData="clearFormData"
                        ></detail-form1>
                    </TabPane>
                </Tabs>
                <radio-table
                        :colname="colname"
                        :total = 'total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                searchCount: 1,
                spinShow: true,
                labelWidth: 100,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                currentRowData: {},
                formItemList:[
                    {
                        type: 4,
                        label: '服务商',
                        keyName:'iscenicid',
                        labelWidth: 70,
                        optionList: []
                    },
                    {
                        type: 1,
                        label: '导游',
                        labelWidth: 50,
                        keyName:'dyusid'
                    },
                    {
                        type: 1,
                        label: '公司名称(联系人模糊查询)',
                        keyName:'strornm',
                        labelWidth:170
                    },
                    {
                        type: 13,
                        label: '',
                        labelWidth: 10,
                        keyName: 'radiobutton1',
                        class: 'float_option_66',
                        optionList: [
                            {
                                value: 0,
                                labelName: '全部用户'
                            },
                            {
                                value: 1,
                                labelName: '游客'
                            },
                            // {
                            //     value: 2,
                            //     labelName: '指定总社'
                            // },
                            // {
                            //     value: 3,
                            //     labelName: '指定分社'
                            // },
                            {
                                value: 4,
                                labelName: '指定下单用户',
                                type: 1,
                                keyName: 'usid'
                            },
                            {
                                value: 5,
                                labelName: 'OTA用户',
                                type: 2,
                                keyName: 'otausid',
                                optionList: [
                                    {
                                        value: '',
                                        label: '全部OTA用户'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        type: 4,
                        label: '订单状态',
                        keyName: 'ddzt',
                        optionList: []
                    },
                    {
                        type: 2,
                        label: '',
                        keyName:'radiobutton2',
                        // class: 'float_option_66',
                        labelWidth: 10,
                        optionList:[
                            {
                                value: 0,
                                labelName: '按首日游览日期'
                            },
                            {
                                value: 1,
                                labelName: '按下单日期查询'
                            },
                            {
                                value: 2,
                                labelName: '按订单支付日期查询'
                            },
                            {
                                value: 3,
                                labelName: '按订单出票日期查询'
                            }
                        ]
                    },
                    {
                        type: 11,
                        label: '',
                        double: true,
                        labelWidth: 10,
                        keyName:'startDate',
                        keyName1:'endDate',
                    },
                    {
                        type: 1,
                        label: '旅游卡卡号',
                        keyName: 'cardNumber'
                    },
                    {
                        type: 1,
                        label: '旅游卡名称',
                        keyName: 'cardName'
                    },
                    {
                        type: 1,
                        label: '分润协议号',
                        keyName: 'profitNum'
                    },
                ],
                formItemList1: [
                    {
                        type: 6,
                        label: '',
                        radioValue: 0,
                        radioLabel: '指定订单号',
                        labelWidth: 10,
                        keyName: 'orid'
                    },
                    {
                        type: 6,
                        label: '',
                        radioValue: 1,
                        radioLabel: '按联系人姓名',
                        labelWidth: 10,
                        keyName: 'ornm'
                    },
                    {
                        type: 6,
                        label: '',
                        radioValue: 2,
                        radioLabel: '按联系人证件号码',
                        labelWidth: 10,
                        keyName: 'orhm'
                    },
                    {
                        type: 6,
                        label: '',
                        radioValue: 3,
                        radioLabel: '支付订单号',
                        labelWidth: 10,
                        keyName: 'payorid'
                    },
                ],
                colname:[
                    {
                        title: '订单号',
                        width: 180,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#57a3f3'
                                },
                                on: {
                                    click: () => {
                                        // this.$router.push({
                                        //     name: 'usermessage_add',
                                        //     params: {
                                        //         id : params.row.orid
                                        //     }
                                        // });
                                    }
                                }
                            }, params.row.orid);
                        }
                    },
                    {
                        title: '预付款详情',
                        width: 150,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#57a3f3'
                                },
                                on: {
                                    click: () => {
                                        // this.$router.push({
                                        //     name: 'usermessage_add',
                                        //     params: {
                                        //         id : params.row.orid
                                        //     }
                                        // });
                                    }
                                }
                            }, '预付款详情');
                        }
                    },
                    {
                        title: '实名制信息',
                        width: 150,
                        render: (h, params) => {
                            return h('span', {
                                style: {
                                    color: '#57a3f3'
                                },
                                on: {
                                    // click: () => {
                                    //     this.$router.push({
                                    //         name: 'usermessage_add',
                                    //         params: {
                                    //             id : params.row.orid
                                    //         }
                                    //     });
                                    // }
                                }
                            }, '实名制信息');
                        }
                    },
                    {
                        title: '用户编号',
                        key: 'usid',
                        width: 150,
                    },
                    {
                        title: '公司名称',
                        key: 'corpname',
                        width: 150,
                    },
                    {
                        title: '旅游卡卡号',
                        key: 'cardNumber',
                        width: 150,
                    },
                    {
                        title: '分润协议号',
                        key: 'profitNum',
                        width: 150,
                    },
                    {
                        title: '联系人姓名',
                        key: 'ornm',
                        width: 150,
                    },
                    {
                        title: '证件号码',
                        key: 'orhm',
                        width: 180,
                    },
                    {
                        title: '联系电话',
                        key: 'orph',
                        width: 150,
                    },
                    {
                        title: '下单日期',
                        key: 'orda',
                        width: 150,
                    },
                    {
                        title: '支付号',
                        key: 'payorid',
                        width: 150,
                    },
                    {
                        title: '服务商名称',
                        key: 'szscenicname',
                        width: 150,
                    },
                    {
                        title: '客源地',
                        key: 'szinnername',
                        width: 100,
                    },
                    {
                        title: '消费金额',
                        key: 'summont',
                        width: 100,
                    },
                    {
                        title: '手续费',
                        key: 'o',
                        width: 100,
                    },
                    {
                        title: '订单状态',
                        key: 'ddzt',
                        width: 100,
                    },
                    {
                        title: '产品名称',
                        key: 'sztickettypename',
                        width: 100,
                    },
                    {
                        title: '单价',
                        key: 'r',
                        width: 100,
                    },
                    {
                        title: '消费日期',
                        key: 'dtstartdate',
                        width: 100,
                    },
                    {
                        title: '张数',
                        key: 'numb',
                        width: 100,
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    formDatas:{
                        radiobutton3: 0,
                        errorsid: '0',
                        ddzt: '99',
                        otausid: '',
                        iscenicid: 0,
                        radiobutton1: 0,
                        radiobutton2: 0,
                        startDate: this.$common.getCurrentDate(),
                        endDate: this.$common.getCurrentDate(),
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                requestUrl: '',
            }
        },
        methods: {
            changePage(pageCode) {
                this.pars.pageCode = pageCode;
                this.pars.formDatas.startDate = this.$common.getCurrentDate(this.pars.formDatas.startDate);
                this.pars.formDatas.endDate = this.$common.getCurrentDate(this.pars.formDatas.endDate);
                this.$common.currentPageData(this.requestUrl, this)
            },
            changePageSize(pageSize){
                this.pars.pageNum = pageSize;
                this.pars.formDatas.startDate = this.$common.getCurrentDate(this.pars.formDatas.startDate);
                this.pars.formDatas.endDate = this.$common.getCurrentDate(this.pars.formDatas.endDate);
                this.$common.currentPageData(this.requestUrl, this)
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.formDatas.startDate = this.$common.getCurrentDate(this.pars.formDatas.startDate);
                this.pars.formDatas.endDate = this.$common.getCurrentDate(this.pars.formDatas.endDate);
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.requestUrl, this)
            },
            clearFormData(){
                if (this.pars.formDatas.errorsid == '0') {
                    this.pars.formDatas.ddzt = '99';
                    this.pars.formDatas.iscenicid = 0;
                    this.pars.formDatas.radiobutton1 = 0;
                    this.pars.formDatas.radiobutton2 = 0;
                    this.pars.formDatas.startDate = this.$common.getCurrentDate();
                    this.pars.formDatas.endDate = this.$common.getCurrentDate();
                } else if (this.pars.formDatas.errorsid == '1') {
                    this.pars.formDatas.radiobutton3 = 0;
                }
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    cardNumber: this.pars.formDatas.cardNumber,
                    cardName: this.pars.formDatas.cardName,
                    profitNum: this.pars.formDatas.profitNum,
                }
            },
            switchTabs (val) {
                this.pars.formDatas.errorsid = val;
                if (val == '0') {
                    this.requestUrl = this.baseUrl+'/ec/tourcardTicketOrder/v1/listSearch';
                } else if (val == '1') {
                    this.requestUrl = this.baseUrl+'/ec/tourcardTicketOrder/v1/queryAllOrderBySearch';
                }
            },
            async getSelectItem () {
                return this.$http.get(`${this.baseUrl}/ec/tourcardTicketOrder/v1/list`,{
                    params: {
                        access_token: this.Cookies.get('token'),
                        serverNamer: window.location.hostname
                    }
                })
            },
        },
        async created () {
            const res = await this.getSelectItem();
            if (res.data.code === 200) {
                let data = res.data.data;
                for(let obj of data.scenictList) {
                    this.formItemList[0].optionList.push({
                        value: obj.iscenicid,
                        label: obj.szscenicname
                    })
                }
                for (let obj of data.ddztlist) {
                    this.formItemList[4].optionList.push({
                        value: obj.pmcd,
                        label: obj.pmva
                    })
                }
                for (let obj of data.clist) {
                    this.formItemList[3].optionList[3].optionList.push({
                        value: obj.usid,
                        label: obj.corpname
                    });
                }
            } else {
                this.$common.showMessageModal(this, res, 1);
                this.spinShow = false
            }
            this.switchTabs('0');
            this.$common.currentPageData(this.requestUrl, this);
        },
        mounted () {
            this.pars.formDatas.startDate = this.$common.getCurrentDate(this.pars.formDatas.startDate);
            this.pars.formDatas.endDate = this.$common.getCurrentDate(this.pars.formDatas.endDate);
        }
    }
</script>

<style scoped>

</style>
