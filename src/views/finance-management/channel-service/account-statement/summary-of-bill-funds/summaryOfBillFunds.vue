<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1" :style="{minWidth:'1500px'}">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">账单资金汇总</span>
                    <top-btn
                            :btnList="btnList"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth = "20"
                        :mFlag="true"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :disabledStartDate="disabledStartDate"
                        :disabledStart="disabledStart"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
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
    name: 'summaryOfBillFunds',
    data () {
        let today = this.$common.getCurrentDate().toString();
        let totalList = this.$$totalList;
        return {
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            currentIndex: 1,
            colname: [
                {
                    title: '时间',
                    render: (h, params) => {
                        return h('span', params.row.billDate.toString().indexOf('-') > -1 ? params.row.billDate : this.$common.getCurrentDate(params.row.billDate));
                    }
                    // key: 'billDate',
                },
                {
                    title: '销售（笔）',
                    key: 'paymentCount'
                },

                {
                    title: '销售退款（笔）',
                    key: 'paymentrejectCount'
                },
                {
                    title: '收入(元)',
                    key: 'inCome'
                },
                {
                    title: '支出(元)',
                    key: 'outCome'
                },
                {
                    title: '收支差额(元)',
                    key: 'balance'
                }
            ],
            formItemList: [
                {
                    type: 4,
                    keyName: 'type',
                    label: '账单汇总方式',
                    labelWidth: 120,
                    optionList: totalList.billStatusList
                },
                {
                    type: 11,
                    label: '查询日期',
                    double: true,
                    keyName: 'fromStartTime',
                    keyName1: 'toEndTime',
                    noShow: true,
                    labelWidth: 84,
                    clearable: true
                }
            ],
            pars: {
                formDatas: {
                    marketplaceId: '',
                    merchantId: '',
                    type: 'BY_DAY',
                    fromStartTime: '',
                    toEndTime: ''
                },
                pageNum: 10,
                pageCode: 1
            },
            total: 0,
            tableData: [],
            loading: false,
            spinShow: true,
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
            let obj1 = this.pars,
                obj = this.pars.formDatas,
                Common = this.$common;

            let params = {
                pageNumber: obj1.pageCode - 1,
                pageSize: obj1.pageNum,
                ...obj
            };
            if (flag) {
                params.pageNumber = 0;
            }
            this.$common.emptyObj(params);
            if (params.type === 'BY_MONTH') {
                // obj.toEndTime = Common.getCurrentDate1(obj.toEndTime,-4)[0];
                params.toEndTime = params.toEndTime ? params.toEndTime.toString().substr(0, params.toEndTime.length - 3) : '';
                params.fromStartTime = params.fromStartTime ? params.fromStartTime.toString().substr(0, params.fromStartTime.length - 3) : '';
            }

            this.$bApi.get.SummaryOfBillFunds(params)
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
            this.pars.formDatas.fromStartTime = '';
            this.pars.formDatas.toEndTime = '';
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
    },
    watch: {
        'pars.formDatas.fromStartTime' (val) {
            if (!val) {
                this.disabledEnd = 0;
                this.disabledEndDate = [9999, 0];
                return;
            }
            let obj = this.$common.changeDisabledEndDate(val, this.disabledEnd, this.disabledEndDate);
            this.disabledEnd = obj.disabledEnd;
            this.disabledEndDate = obj.disabledEndDate;
        },
        'pars.formDatas.toEndTime' (val) {
            if (!val) {
                this.disabledStart = 0;
                return;
            }
            let obj = this.$common.changeDisabledEndDate(val, this.disabledStart, this.disabledStartDate);
            this.disabledStart = obj.disabledEnd;
        },
        'pars.formDatas.type' (val) {
            let totalList = this.$$totalList;
            this.pars.formDatas.fromStartTime = '';
            this.pars.formDatas.toEndTime = '';
            switch (val) {
                case 'BY_DAY':
                    this.formItemList = [
                        {
                            type: 4,
                            keyName: 'type',
                            label: '账单汇总方式',
                            labelWidth: 100,
                            optionList: totalList.billStatusList
                        },
                        {
                            type: 11,
                            label: '查询日期',
                            double: true,
                            keyName: 'fromStartTime',
                            keyName1: 'toEndTime',
                            noShow: true,
                            labelWidth: 84
                        }
                    ];
                    break;
                case 'BY_MONTH':
                    this.formItemList = [
                        {
                            type: 4,
                            keyName: 'type',
                            label: '账单汇总方式',
                            labelWidth: 100,
                            optionList: totalList.billStatusList
                        },
                        {
                            type: 11,
                            label: '查询月份',
                            double: true,
                            keyName: 'fromStartTime',
                            keyName1: 'toEndTime',
                            dateType: 'month',
                            noShow: true,
                            labelWidth: 84
                        }
                    ];
                    this.pars.formDatas.fromStartTime = new Date();
                    this.pars.formDatas.toEndTime = new Date();
                    break;
                default:
                    break;
            }
        }
    }

};
</script>

<style scoped>
</style>

