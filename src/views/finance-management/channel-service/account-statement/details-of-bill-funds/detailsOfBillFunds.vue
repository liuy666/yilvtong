<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1" :style="{minWidth:'1500px'}">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">账单资金明细</span>
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
    name: 'detailsOfBillFunds',
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
                    // key:'creationDate',
                    render: (h, params) => {
                        return h('div', this.$common.getCurrentDate(params.row.creationDate));
                    },
                    width: 240
                },
                {
                    title: '业务单号',
                    key: 'outTradeNo'
                },

                {
                    title: '对应结算订单号',
                    key: 'orderId'
                },
                {
                    title: '类型',
                    render: (h, params) => {
                        return h('div', this.$vfilters.accountsStatusFilter(params.row.businessType));
                    }
                },
                {
                    title: '对方账号',
                    key: 'buyerAccount'
                },
                {
                    title: '金额(元)',
                    key: 'orderAmount'
                }
            ],
            formItemList: [
                {
                    type: 4,
                    keyName: 'type',
                    label: '账务类型',
                    labelWidth: 100,
                    optionList: totalList.accountsStatusList
                },
                {
                    type: 11,
                    label: '查询日期',
                    double: true,
                    keyName: 'fromTime',
                    keyName1: 'toTime',
                    noShow: true,
                    labelWidth: 84,
                    clearable: true
                }
            ],
            pars: {
                formDatas: {
                    marketplaceId: '',
                    merchantId: '',
                    type: '1',
                    fromTime: '',
                    toTime: ''
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
            if (params.type === '1') {
                params.type = '';
            }
            this.$common.emptyObj(params);

            this.$bApi.get.DetailsOfBillFunds(params)
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
            this.pars.formDatas.fromTime = '';
            this.pars.formDatas.toTime = '';
            this.pars.formDatas.type = '1';
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
        'pars.formDatas.fromTime' (val) {
            if (!val) {
                this.disabledEnd = 0;
                this.disabledEndDate = [9999, 0];
                return;
            }
            let obj = this.$common.changeDisabledEndDate(val, this.disabledEnd, this.disabledEndDate);
            this.disabledEnd = obj.disabledEnd;
            this.disabledEndDate = obj.disabledEndDate;
        },
        'pars.formDatas.toTime' (val) {
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



