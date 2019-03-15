<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1" :style="{minWidth:'1500px'}">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">审批通过</span>
                    <top-btn
                            :btnList="btnList"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth = "20"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :disabledStartDate="disabledStartDate"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
                        :ruleDatas="ruleDatas1"
                        @getFormData="get(1)"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="false"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
export default {
    name: 'approvalAndApproval',
    data () {
        let today = this.$common.getCurrentDate().toString();
        return {
            ruleDatas1: {
                id: [
                    { pattern: /^\d{0,18}$/, message: '对应结算单号最多可输入18位', trigger: 'blur' }
                ]
            },
            disabledStartDate: [9999, 0],
            disabledEndDate: [9999, 0],
            disabledEnd: 0,
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
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
                    width: 195
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
                    width: 220
                },
                {
                    title: '退款金额(元)',
                    key: 'amount',
                    width: 165
                },
                {
                    title: '退款原因',
                    key: 'reason',
                    width: 135
                },
                {
                    title: '审批人',
                    key: 'auditOperator',
                    width: 120
                },
                {
                    title: '审批时间',
                    render: (h, params) => {
                        return h('div', this.$common.fmt('yyyy-MM-dd hh:mm:ss', params.row.auditDate));
                    },
                    width: 174
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
                    labelWidth: 120
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
                },
                {
                    type: 1,
                    keyName: 'invoiceBuyer',
                    label: '买家',
                    labelWidth: 80
                },
                {
                    type: 11,
                    label: '审批时间从',
                    double: true,
                    keyName: 'auditStartTime',
                    keyName1: 'auditEndTime',
                    noShow: true,
                    labelWidth: 100,
                    clearable: true
                },
                {
                    type: 1,
                    keyName: 'auditOperator',
                    label: '审批人',
                    labelWidth: 80
                }
            ],
            pars: {
                formDatas: {
                    marketplaceId: '',
                    merchantId: '',
                    id: '',
                    invoiceId: '',
                    outRefundNo: '',
                    invoiceBuyer: '',
                    creatStartTime: '',
                    creatEndTime: '',
                    auditStartTime: '',
                    auditEndTime: '',
                    auditOperator: ''
                },
                pageNum: 10,
                pageCode: 1
            },
            total: 0,
            tableData: [],
            loading: false,
            spinShow: true
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
            let applicationStatus = 'PASSED';
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
            return this.$bApi.get.SettleMerchantId(params)
                .then((response) => {
                    this.pars.formDatas.marketplaceId = response.platformId;
                    this.pars.formDatas.merchantId = response.merchantId;
                    // this.pars.formDatas.marketplaceId = 36;
                    // this.pars.formDatas.merchantId = 208;
                })
                .finally(() => {
                    this.spinShow = false;
                });
        },
        clearFormData () {
            this.pars.formDatas.creatStartTime = '';
            this.pars.formDatas.creatEndTime = '';
            this.pars.formDatas.auditStartTime = '';
            this.pars.formDatas.auditEndTime = '';
            this.get(1);
        },
        changePage (pageCode) {
            this.pars.pageCode = pageCode;
            this.get();
        },
        changePageSize (pageSize) {
            this.pars.pageNum = pageSize;
            this.get();
        }
    }

};
</script>

<style scoped>
</style>
