<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1" :style="{minWidth:'1500px'}">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">待审批</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <detail-form1
                        :mFlag="true"
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth = "20"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :disabledStartDate="disabledStartDate"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
                        :disabledStart="disabledStart"
                        :ruleDatas="ruleDatas1"
                        @getFormData="get(1)"
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

            <Card v-show="currentIndex === 2"  >
                <p slot="title" style="height:32px;">
                    <span v-if="currentIndex === 2" style="display:inline-block;float:left;line-height:32px;">{{shenpiTitle}}</span>

                </p>
                <p>业务单号：【{{currentRowData.id}}】</p>
                <detail-form1
                        ref="baseTicket"
                        :formDatas = "formDatas1"
                        :labelWidth = "0"
                        :ruleDatas="ruleDatas"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :btn-loading = "btnLoading"

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
    name: 'tobeExaminationApproval',
    data () {
        let today = this.$common.getCurrentDate().toString();
        return {
            shenpiID: '',
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                },
                {
                    type: 17,
                    btnlabel: '审批'
                }
            ],
            currentIndex: 1,
            colname: [
                {
                    title: '退款单号',
                    key: 'outRefundNo',
                    width: 195
                },
                {
                    title: '创建日期',
                    render: (h, params) => {
                        return h('div', this.$common.getCurrentDate(params.row.creationDate));
                    },
                    width: 150
                },
                {
                    title: '对应结算单号',
                    key: 'id',
                    width: 125
                },
                {
                    title: '来源',
                    render: (h, params) => {
                        return h('div', '环球汇通');
                    },
                    width: 150
                },
                {
                    title: '关联交易号',
                    render: (h, params) => {
                        return h('div', params.row.invoice.outTradeNo);
                    },
                    width: 195
                },
                {
                    title: '买家',
                    render: (h, params) => {
                        return h('div', params.row.invoice.buyer);
                    },
                    width: 155
                },
                {
                    title: '原交易内容',
                    render: (h, params) => {
                        return h('div', params.row.invoice.description);
                    },
                    width: 250
                },
                {
                    title: '退款金额(元)',
                    key: 'amount',
                    width: 165
                },
                {
                    title: '退款原因',
                    key: 'reason',
                    width: 369
                }
            ],
            formItemList: [
                {
                    type: 1,
                    keyName: 'outRefundNo',
                    label: '退款单号',
                    labelWidth: 80,
                    inputType: 'number',
                    optionList: []
                },
                {
                    type: 1,
                    keyName: 'outTradeNo',
                    label: '关联交易号',
                    labelWidth: 100,
                    optionList: []
                },
                {
                    type: 1,
                    keyName: 'id',
                    label: '对应结算单号',
                    inputType: 'number',
                    maxlength: 2,
                    labelWidth: 120
                },
                {
                    type: 1,
                    keyName: 'invoiceBuyer',
                    label: '买家',
                    labelWidth: 80
                },
                {
                    type: 11,
                    label: '创建日期从',
                    double: true,
                    keyName: 'creatStartTime',
                    keyName1: 'creatEndTime',
                    noShow: true,
                    labelWidth: 100,
                    clearable: true
                }
            ],
            pars: {
                formDatas: {
                    id: '',
                    marketplaceId: '',
                    merchantId: '',
                    invoiceId: '',
                    outRefundNo: '',
                    invoiceBuyer: '',
                    creatStartTime: '',
                    creatEndTime: ''
                },
                pageNum: 10,
                pageCode: 1
            },
            total: 0,
            tableData: [],
            loading: false,
            currentRowData: {},
            spinShow: true,
            formItemList1: [
                {
                    label: '',
                    keyName: 'passFlag',
                    type: 2,
                    optionList: [
                        {
                            value: 'PASSED',
                            labelName: '审批通过'
                        },
                        {
                            value: 'DENIED',
                            labelName: '审批不通过'
                        }
                    ]
                },
                {
                    label: '',
                    keyName: 'auditReason',
                    type: 7,
                    placeholder: '请输入不通过原因',
                    singleIsHidden: true
                }
            ],
            btnLoading: false,
            isClose: true,
            formDatas1: {
                passFlag: ''
            },
            ruleDatas: {
                passFlag: [
                    { required: true, message: '请选择审批是否通过', trigger: 'blur' }
                ]
            },
            ruleDatas1: {
                id: [
                    { pattern: /^\d{0,18}$/, message: '对应结算单号最多可输入18位', trigger: 'blur' }
                ]
            },
            shenpiTitle: '退款审批',
            success: '成功',
            disabledStartDate: [9999, 0],
            disabledEndDate: [9999, 0],
            disabledEnd: 0,
            disabledStart: 0
        };
    },
    mounted () {
        this.getParams().then(() => {
            this.get();
        });
    },
    methods: {
        get (flag) {
            let obj1 = this.pars;
            let obj = this.pars.formDatas;

            let params = {
                pageNumber: obj1.pageCode - 1,
                pageSize: obj1.pageNum,
                ...obj
            };
            if (flag) {
                params.pageNumber = 0;
            }
            let applicationStatus = 'PENDING';
            this.$common.emptyObj(params);
            this.$bApi.get.TobeExaminationApproval(applicationStatus, params)
                .then((response) => {
                    let data = response.content;
                    this.tableData = data.page;
                    this.total = data.totalNumberOfResults;
                    this.pars.pageNum = data.pageSize;
                    this.pars.pageCode = data.pageNumber + 1;
                });
        },
        getParams () {
            let params = { type: '1' };

            return this.$bApi.get.SettleMerchantId(params).then((response) => {
                this.pars.formDatas.marketplaceId = response.platformId;
                this.pars.formDatas.merchantId = response.merchantId;
                // this.pars.formDatas.marketplaceId = 36;
                // this.pars.formDatas.merchantId = 208;
            }).finally(() => {
                this.spinShow = false;
            });
        },
        clearFormData () {
            this.pars.formDatas.creatStartTime = '';
            this.pars.formDatas.creatEndTime = '';
            this.get(1);
        },
        selected (row) {
            this.currentRowData['id'] = row.outRefundNo;
            this.currentRowData['shenpiID'] = row.id;
        },
        changePage (pageCode) {
            this.pars.pageCode = pageCode;
            this.get();
        },
        changePageSize (pageSize) {
            this.pars.pageNum = pageSize;
            this.get();
        },
        changeIndex (type) {
            if (type !== 17) return;
            this.formDatas1.passFlag = '';
            this.formDatas1.auditReason = '';
            this.currentIndex = 2;
            this.isClose = false;
        },
        closeCurrentPageAdd () {
            this.currentIndex = 1;
        },
        getFormDataAdd (data) {
            this.btnLoading = true;
            let urlend = this.currentRowData.shenpiID;
            let formDatas = this.pars.formDatas;
            let common = this.$common;
            let urlParams = {
                marketplaceId: formDatas.marketplaceId,
                merchantId: formDatas.merchantId
            };
            let bodyParams = {
                auditReason: data.passFlag === 'DENIED' ? data.auditReason : '',
                applicationStatus: data.passFlag
            };
            common.emptyObj(bodyParams);
            this.$bApi.put.RefundAudit(urlend, urlParams, bodyParams)
                .then(async res => {
                    if (data.passFlag !== 'PASSED') {
                        this.currentIndex = 1;
                        this.get(1);
                        return;
                    }
                    // let originUrl = null;
                    // if (window.location.origin === 'http://www.yilvbao.cn') {
                    //     originUrl = 'https://www.upaypal.cn';
                    // } else if (window.location.origin === 'http://jcp.yilvbao.cn') {
                    //     originUrl = 'https://jicheng.upaypal.cn';
                    // } else if (window.location.origin === 'http://zscp.yilvbao.cn') {
                    //     originUrl = 'https://www.upaypal.net';
                    // }
                    // 上面的结算跳转地址均是写死的，现改为接口获取
                    const urlRes = await this.$http.get(`${this.fm}/sys/syspar/v1/getSysparInfoById`, {
                        params: {
                            access_token: this.Cookies.get('token'),
                            pmky: 'HQYT',
                            pmcd: '0002'
                        }
                    });
                    if (urlRes.data.code === 200) {
                        window.location.href = `${urlRes.data.data.pmvd}/ppcounter?${this.QS.stringify(res.content)}&returnUrl=${encodeURIComponent(window.location.href)}`;
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '跳转失败'
                        });
                    }
                })
                .finally(() => {
                    this.btnLoading = false;
                });
        }
    },
    watch: {
        formDatas1: {
            handler (curVal, oldVal) {
                if (this.formDatas1.passFlag === 'DENIED') {
                    this.formItemList1[1].singleIsHidden = false;
                    this.ruleDatas.auditReason = [];
                    this.ruleDatas.auditReason.push({ required: true, message: '请输入不通过原因', trigger: 'blur' });
                } else {
                    this.formItemList1[1].singleIsHidden = true;
                    delete this.ruleDatas.auditReason;
                }
            },
            deep: true
        },
        'pars.formDatas.creatStartTime' (val) {
            if (!val) {
                this.disabledEnd = 0;
                this.disabledEndDate = [9999, 0];
                return;
            }
            let obj = this.$common.changeDisabledEndDate(val, this.disabledEnd, this.disabledEndDate);
            this.disabledEnd = obj.disabledEnd;
            this.disabledEndDate = obj.disabledEndDate;
        },
        'pars.formDatas.creatEndTime' (val) {
            if (!val) {
                this.disabledStart = 0;
                return;
            }
            let obj = this.$common.changeDisabledEndDate(val, this.disabledStart, this.disabledStartDate);
            this.disabledStart = obj.disabledEnd;
        }
    }

};
</script>

<style scoped>
</style>
