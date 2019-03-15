<template>
    <div>
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card>
            <p slot="title" class="cardTitle">
                <span>酒店订单管理</span>
                <topBtn :btnList="btnList"></topBtn>
            </p>
            <Tabs v-model="params.errorsid">
                <TabPane label="订单查询" name="0">
                    <detail-form1 
                        :isListPage="true"
                        :formDatas="params.formDatasByOrder"
                        :formItemList="formItemListByOrder"
                        :btnLabelWidth="60"
                        @getFormData="handleQuery"
                        @setDay="setDay"
                        @setWeek="setWeek"
                        @setMonth="setMonth"
                        @clearFormData="resetForm1"></detail-form1>
                </TabPane>
                <TabPane label="按订单或联系人查询" name="1">
                    <detail-form1 
                        :isListPage="true"
                        :formDatas="params.formDatasByContact"
                        :formItemList="formItemListByContact"
                        @getFormData="handleQuery"
                        @clearFormData="resetForm2"></detail-form1>
                </TabPane>
            </Tabs>
            <radioTable 
                :colname="colnames"
                :total="total"
                :watchTotal="watchTotal"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                @changePage="handleChangePage"
                @changePageSize="changeSize"></radioTable>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "hotel-order-management",
        data() {
            return {
                isShowLoading: false,
                isLoading: false,
                isRadio: false,
                total: 0,
                watchTotal: 0,
                size: 10,
                tableData: [],
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                params:{
                    errorsid: '0',
                    /* pdtp 参数说明 
                     * 06-酒店订单管理 
                     * 08-商品订单管理 
                     * 07-线路订单管理 
                     * 10-租车订单管理
                    */ 
                    pdtp:'06',
                    formDatasByOrder: {                  
                        iscenicid: 0,
                        radiobutton1: 0,
                        usid: '',
                        radiobutton2: 0,
                        startDate: '',
                        endDate: '',
                        ddzt: ''
                    },
                    formDatasByContact: {
                        radiobutton3: 0,
                        orid: '',
                        ornm: '',
                        orhm: '',
                        payorid: ''
                    }
                },
                formItemListByOrder: [
                    {
                        type: 4,
                        label: '服务商',
                        keyName:'iscenicid',
                        class: 'float-left',
                        labelWidth: 110,
                        optionList: []
                    },
                    {
                        type: 2,
                        label: '',
                        labelWidth: 70,
                        keyName: 'radiobutton2',
                        class: 'float-left',
                        optionList: [
                            {
                                value: 0,
                                labelName: '按消费(游览)日期查询'
                            },
                            {
                                value: 1,
                                labelName: '按下订单日期查询'
                            },
                            {
                                value: 2,
                                labelName: '按订单支付日期查询'
                            }
                        ]
                    },
                    {
                        type: 11,
                        label: '',
                        labelWidth: 10,
                        keyName: 'startDate',
                        keyName1: 'endDate',
                        class: 'float-left',
                        double: true,
                        dateType: 'date',
                        isShowOptions: true
                    },
                    {
                        type: 14,
                        label: '',
                        labelWidth: 50,
                        keyName: 'radiobutton1',
                        class: 'float-left',
                        isAddInput: true,
                        inputKeyName: 'usid',
                        optionList: [
                            {
                                value: 0,
                                labelName: '全部用户'
                            },
                            {
                                value: 1,
                                labelName: '指定下单用户'
                            }
                        ]
                    },
                    {
                        type: 4,
                        label: '订单状态',
                        keyName: 'ddzt',
                        class: 'float-left',
                        labelWidth: 120,
                        optionList: []
                    }
                ],
                formItemListByContact: [
                    {
                        type: 13,
                        label: '',
                        labelWidth: 10,
                        keyName: 'radiobutton3',
                        class: 'float-left',
                        hasDec: '',
                        isRedDec: true,
                        optionList: [
                            {
                                type: 1,
                                value: 0,
                                keyName: 'orid',
                                labelName: '指定订单号'
                            },
                            {
                                type: 1,
                                value: 1,
                                keyName: 'ornm',
                                labelName: '按联系人姓名'
                            },
                            {
                                type: 1,
                                value: 2,
                                keyName: 'orhm',
                                labelName: '按联系人证件号码'
                            },
                            {
                                type: 1,
                                value: 5,
                                keyName: 'payorid',
                                labelName: '支付订单号'
                            },
                            {
                                value: 3,
                                labelName: '逾期未领的订单：'
                            }
                        ]
                    }
                ],
                colnames: [
                    {
                        title: '订单号',
                        width: 170,
                        key: 'orid'
                    },
                    {
                        title: '操作',
                        width: 220,
                        render: (h,params) => {
                            let data = params.row;
                            let field_type = '',
                                field_line1 = '',
                                field_line2 = '';
                            if(data.isUnsubscribe != 1) {
                                if(data.scenictype == '06') {
                                    field_type = '审核';
                                    // 链接不同 hotelorderaudit.action
                                } else if(data.scenictype == '07') {
                                    field_type = '审核';
                                    // 链接不同 lineorderaudit.action
                                } else if(data.scenictype == '06') {
                                    field_type = '送货';
                                    // 链接不同 hotelorderaudit.action
                                }
                            }
                            if(data.scenictype == '07' && data.ddzt == '02' && (data.summont - data.tpmont) != 0) {
                                field_line1 = "强制退订";
                                // permitenter/systemdetailorder.action
                            }
                            if(data.scenictype == '06' && data.ddzt == '02' && (data.summont - data.tpmont) != 0) {
                                field_line2 = "强制退订";
                                // permitenter/systemdetailorder.action
                            }
                            return h('div',[
                                h('a',{
                                    style: {
                                        'margin-right': '10px'
                                    }
                                },'预付款详情'), // reports/queryyfkDetail.action
                                h('a',{
                                    style: {
                                        'margin-right': '10px'
                                    }
                                },field_type),
                                h('a',field_line1),
                                h('a',field_line2)
                            ]);
                        }
                    },
                    {
                        title: '用户编号',
                        width: 110,
                        key: 'usid'               
                    },
                    {
                        title: '用户名',
                        width: 100,
                        key: 'corpname'
                    },
                    {
                        title: '联系人姓名',
                       width: 170,
                        key: 'ornm'              
                    },
                    {
                        title: '证件号码',
                        width: 140,
                        key: 'orhm'                
                    },
                    {
                        title: '联系电话',
                        width: 120,
                        key: 'orph'        
                    },
                    {
                        title: '支付号',
                        width: 100,
                        key: 'payorid'              
                    },
                    {
                        title: '订单总状态',
                        width: 140,
                        render: (h,params) => {
                            let data = params.row;
                                field_orderStatus = '';
                            if(data.scenictype == '06' && data.ddzt == '11') {
                                field_orderStatus = '已入住';
                            } else if(data.scenictype == '08' && data.ddzt == '11') {
                                field_orderStatus = '已验收';
                            } else if(data.scenictype == '06' && data.ddzt == '02' && data.tpmont != null) {
                                field_orderStatus = '已支付（退订已退款）';
                            } else {
                                field_orderStatus = data.strddzt;
                            }
                            return h('span',field_orderStatus);
                        }
                    },
                    {
                        title: '下单日期',
                        width: 100,
                        key: 'orda'
                    },
                    {
                        title: '消费金额',
                        width: 100,
                        render: (h,params) => {
                            return h('span',(params.row.summont - params.row.tpmont).toFixed(3).slice(0,-1));
                        }
                    },
                    {
                        title: '服务商名称',
                        width: 140,
                        key: 'szscenicname'
                    },
                    {
                        title: '产品名称',
                        width: 110,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].sztickettypename);
                            } else {
                                return h('span','');
                            }
                        }
                    },
                    {
                        title: '消费日期',
                        width: 100,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].dtstartdate);
                            } else {
                                return h('span','');
                            }
                        }
                    },
                    {
                        title: '张数',
                        width: 70,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].numb);
                            } else {
                                return h('span','');
                            }
                        }
                    }
                ]
            }
        },
        async created() {
            // 初始化页面
            this.isShowLoading = true;
            const initRes = await this.$api.all([
                {
                    url: this.baseUrl + '/ec/hotelOrder/v1/list',
                    type: 'post',
                    urlParams: {
                        pdtp: '06'
                    },
                    bodyParams: {
                        iscenicid: 0
                    }
                },
                {
                    url: this.baseUrl + '/ec/hotelOrder/v1/lists',
                    type: 'post'
                }
            ]);
            // console.log(initRes);
            if(!initRes) {
                this.isShowLoading = false;
                return;
            }
            let orderStatusList = initRes[0].ddztlist,
                scenicList = initRes[1].list;
            this.formItemListByOrder[4].optionList = orderStatusList.map(item => {
                return {
                    value: item.pmcd,
                    label: item.pmva
                }
            });
            this.formItemListByOrder[0].optionList = scenicList.map(item => {
                return {
                    value: item.iscenicid,
                    label: item.szscenicname
                }
            });
            let today = this.$handle.formatDate(new Date()),
                threeDay = this.$handle.formatDate(new Date(Date.now() - 3*24*60*60*1000));
            this.formItemListByContact[0].hasDec ='有' + initRes[0].yuqinumb + '笔';
            this.params.formDatasByOrder.startDate = threeDay;
            this.params.formDatasByOrder.endDate = today;
            this.params.formDatasByOrder.iscenicid = scenicList[0].iscenicid;
            this.params.formDatasByOrder.ddzt = orderStatusList[0].pmcd;
            this.saveInfo = {
                orderStatusList,
                scenicList
            };
            this.isShowLoading = false;
        },
        methods: {
            // 首次查询
            handleQuery() {
                this.execQuery(1);
            },
            // 切换页码查询
            handleChangePage(num) {
                this.execQuery(num);
            },
            // 设置近三天
            setDay() {
                this.params.formDatasByOrder.startDate = this.$handle.formatDate(new Date(Date.now() - 3*24*60*60*1000));
                this.params.formDatasByOrder.endDate = this.$handle.formatDate(new Date());
            },
            // 设置近一周
            setWeek() {
                this.params.formDatasByOrder.startDate = this.$handle.formatDate(new Date(Date.now() - 7*24*60*60*1000));
                this.params.formDatasByOrder.endDate = this.$handle.formatDate(new Date());
            },
            // 设置近一月
            setMonth() {
                this.params.formDatasByOrder.startDate = this.$handle.formatDate(new Date(Date.now() - 30*24*60*60*1000));
                this.params.formDatasByOrder.endDate = this.$handle.formatDate(new Date());
            },
            // 提交表单查询
            async execQuery(num) {
                let f1 = this.params.formDatasByOrder, // 按订单
                    radio1 = this.params.formDatasByOrder.radiobutton1,
                    usid = this.params.formDatasByOrder.usid,
                    startDate = this.params.formDatasByOrder.startDate,
                    endDate = this.params.formDatasByOrder.endDate,

                    f2 = this.params.formDatasByContact, // 按联系人
                    radio3 = this.params.formDatasByContact.radiobutton3,

                    errorsid = this.params.errorsid, // 公共参数
                    pdtp = this.params.pdtp,
                    url = '',
                    bodyParams = null,
                    urlParams = {
                        pageSize: this.size,
                        page: num,
                        pdtp
                    };

                // 按订单查询
                if(errorsid === '0') {
                    if(!usid && radio1 === 1) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入下单用户编号'
                        });
                        return;
                    }
                    
                    let realMillisecond = endDate - startDate,
                        realDay = realMillisecond / 1000 / 60 / 60 /24;
                    if( realMillisecond < 0) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '起始日期不能大于截止日期'
                        });
                        return;
                    }
                    else if(realDay > 30) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '查询时间间隔不能超过30天！'
                        });
                        return;
                    }
                    // 验证通过执行查询
                    this.isLoading = true;
                    bodyParams = {
                        iscenicid: f1.iscenicid,
                        radiobutton1: radio1,
                        usid,
                        radiobutton2: f1.radiobutton2,
                        startDate: this.$handle.formatDate(startDate),
                        endDate: this.$handle.formatDate(endDate),
                        ddzt: f1.ddzt,
                        errorsid
                    }
                    url = this.baseUrl + '/ec/hotelOrder/v1/list';
                } 

                // 按订单或联系人查询
                if(errorsid === '1') { 
                    if(radio3 === 0 && !f2.orid) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请指定订单编号'
                        });
                        return;
                    }
                    if(radio3 === 1 && !f2.ornm) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入联系人姓名'
                        });
                        return;
                    }
                    if(radio3 === 2 && !f2.orhm) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入联系人证件号码'
                        });
                        return;
                    }
                    if(radio3 === 5 && !f2.payorid) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入支付订单号'
                        });
                        return;
                    }
                    // 验证通过执行查询
                    this.isLoading = true;
                    bodyParams = {
                        errorsid,
                        radiobutton3: radio3,
                        orid: f2.orid,
                        ornm: f2.ornm,
                        orhm: f2.orhm,
                        payorid: f2.payorid
                    };
                    url = this.baseUrl + '/ec/hotelOrder/v1/listBy';
                }

                const queryRes = await this.$api.post(url,urlParams,bodyParams);
                // console.log(queryRes);
                this.tableData = queryRes.data.ps.items;
                this.total = queryRes.data.ps.totalCount;
                this.watchTotal = queryRes.data.ps.totalCount;
                this.isLoading = false;
            },
            // 重置表单-订单查询
            resetForm1() {
                this.params.formDatasByOrder.iscenicid = this.saveInfo.scenicList[0].iscenicid;
                this.params.formDatasByOrder.ddzt = this.saveInfo.orderStatusList[0].pmcd;
                this.params.formDatasByOrder.usid = '';
                this.params.formDatasByOrder.radiobutton1 = 0;
                this.params.formDatasByOrder.radiobutton2 = 0;
                this.params.formDatasByOrder.startDate = new Date();
                this.params.formDatasByOrder.endDate = new Date();
            },
            // 重置表单-联系人查询
            resetForm2() {
                this.params.formDatasByContact.radiobutton3 = 0;
                this.params.formDatasByContact.orid = '';
                this.params.formDatasByContact.ornm = '';
                this.params.formDatasByContact.orhm = '';
                this.params.formDatasByContact.payorid = '';
            },
            // 改变每页展示条数
            changeSize(size) {
                this.size = size;
                this.watchTotal = 0;
                this.execQuery(1);
            }
        }
    }
</script>

<style scoped lang="less">
</style>
