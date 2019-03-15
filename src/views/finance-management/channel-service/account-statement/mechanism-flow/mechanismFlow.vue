<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1" :style="{minWidth:'1500px'}">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">机构流水</span>
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
    name: 'mechanismFlow',
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
                    title: '机构流水号',
                    key: 'paymentTradeNo',
                    width: 289
                },
                {
                    title: '创建时间',
                    // key:'creationDate',
                    render: (h, params) => {
                        return h('div', this.$common.getCurrentDate(params.row.dateTime));
                    },
                    width: 160
                },
                {
                    title: '机构',
                    key: 'channelName',
                    width: 130
                },

                {
                    title: '机构开户名',
                    key: 'sellerAccount',
                    width: 240
                },
                {
                    title: '机构开户账号',
                    key: 'sellerId',
                    width: 220
                },
                {
                    title: '业务类型',
                    render: (h, params) => {
                        return h('div', this.$vfilters.businessTypeStatusFilter(params.row.businessType));
                    },
                    width: 230
                },
                {
                    title: '金额(元)',
                    key: 'amount',
                    width: 150
                },
                {
                    title: '关联业务单号',
                    key: 'outTradeNo',
                    width: 255
                },
                {
                    title: '对应结算订单号',
                    key: 'orderId',
                    width: 180
                }
            ],
            formItemList: [
                {
                    type: 4,
                    keyName: 'businessType',
                    label: '业务类型',
                    labelWidth: 100,
                    optionList: totalList.businessTypeStatusList
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
                    businessType: '1',
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
            if (params.businessType === '1') {
                params.businessType = '';
            }
            if (flag) {
                params.pageNumber = 0;
            }
            this.$common.emptyObj(params);
            for (let key in params) {
                if (key === 'fromTime' || key === 'toTime') {
                    params[key] = this.$common.getCurrentDate(params[key]);
                }
            }
            this.$bApi.get.MechanismFlow(params)
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
                    // this.pars.formDatas.marketplaceId = 1;
                    // this.pars.formDatas.merchantId = 16;
                })
                .finally(() => {
                    this.spinShow = false;
                });
        },
        clearFormData () {
            this.pars.formDatas.fromTime = '';
            this.pars.formDatas.toTime = '';
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







