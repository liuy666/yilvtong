
<template>
<div >
   <Row>
      <Card>
        <div class="w_query">
          <Row>
            <Col span="10" :style="{marginBottom:'20px'}">
              <span> 支付日期：</span>
              <DatePicker type="date" v-model="payTimeFrom" placeholder="请选择开始时间" :options="payTimeFromOption"  @on-change="payTimeFromChange" style="width: 150px"></DatePicker>
              <span :style="{margin:'0 15px'}">至</span>
              <DatePicker type="date"  v-model="payTimeTo" placeholder="请选择结束时间"  :options="payTimeToOption"  @on-change="payTimeToChange"  style="width: 150px"></DatePicker>
            </Col>
            <Col span="10" :style="{marginBottom:'20px'}">
              <span>创建日期：</span>
              <DatePicker type="date" v-model="buildTimeFrom" :options="buildTimeFromOption"  @on-change="buildTimeFromChange" placement="bottom-start" placeholder="开始日期" style="width: 150px"></DatePicker>
              <span :style="{margin:'0 15px'}">至</span>
              <DatePicker type="date" v-model="buildTimeTo" :options="buildTimeToOption"  @on-change="buildTimeToChange" placeholder="结束日期" style="width: 150px"></DatePicker>
            </Col>
            <Col span="6" :style="{marginBottom:'20px'}">
                <span style="margin-right:5px">交易状态:</span>
                <Select v-model="query.state" style="width:150px">
                    <Option v-for="item in settleStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6" :style="{marginBottom:'20px'}">
                对应结算单号：<Input v-model="query.NO" placeholder="请输入对应结算单号" style="width: 150px" />
            </Col>
            <Col span="6" :style="{marginBottom:'20px'}">
                业务单号：<Input v-model="query.orderNo" placeholder="请输入业务单号" style="width: 150px" />
            </Col>
              <Col span="6" :style="{marginBottom:'20px'}">
                <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="query_fn">查询</Button>
                <Button shape="circle" style="width:80px" @click="reset">重置</Button>
            </Col>
            </Row>
        </div>
         <radio-table
            :colname="columnsTit"
            :tableData="columnsData"
            :isRadio="false"
            :total='objPage.totalPage'
            :pageNum="objPage.size"
            :pageCode="objPage.page+1"
            :loading="loading"
            @changePage="changePage"
            @changePageSize="changePageSize"
        ></radio-table>
      </Card>
   </Row>
</div>
    
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
import getId from '@/libs/getSettleMerchantId.js';
export default {
    data () {
        return {
            path: {
                marketplaceId: '',
                merchantId: '',
                token: this.Cookies.get('token')
            },
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            }, // 存放页数
            loading: false,
            gatherBtn: false,
            receivablesBtn: false,
            query: {
                state: '',
                NO: '',
                orderNo: ''
            },
            time: {
                fromTime: '',
                toTime: '',
                payFromTime: '',
                payToTime: ''
            },
            buildTimeFrom: '', // 创建时间--开始
            buildTimeTo: '', // 创建时间--结束
            payTimeFrom: '', // 支付时间--开始
            payTimeTo: '', // 支付时间--结束
            buildTimeFromOption: {},
            buildTimeToOption: {},
            payTimeFromOption: {},
            payTimeToOption: {},
            settleStatusList: [
                {
                    value: 'New York',
                    label: ' 全部'
                },
                {
                    value: 'LondSon',
                    label: ' 待付款'
                },
                {
                    value: 'Sydney',
                    label: ' 已付款待确认 '
                },
                {
                    value: 'Ottawaq',
                    label: ' 交易成功'
                },
                {
                    value: 'Londond',
                    label: ' 交易关闭'
                },
                {
                    value: 'Sydneyd',
                    label: ' 退款撤单 '
                },
                {
                    value: 'Ottawa',
                    label: ' 失效'
                }
            ],
            columnsTit: [
                {
                    title: '业务单号',
                    width: 230,
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '创建日期',
                    key: 'buildTime',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '支付时间',
                    key: 'payTime',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '内容信息',
                    width: 250,
                    key: 'info',
                    align: 'center'
                },
                {
                    title: '对应结算单号',
                    key: 'settlenum',
                    width: 220,
                    align: 'center'
                },
                {
                    title: '付款人',
                    key: 'paypersonal',
                    width: 220,
                    align: 'center'
                },
                {
                    title: '金额（元）',
                    key: 'money',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '单据状态',
                    key: 'status',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    color: '#5DB2FF',
                                    marginRight: '10px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'inComeDetail',
                                            query: {
                                                id: this.columnsData[params.index].id,
                                                marketplaceId: this.path.marketplaceId,
                                                merchantId: this.path.merchantId,
                                                isOutCome: true
                                            }
                                        });
                                    }
                                }
                            }, '查看详情')
                        ]);
                    }
                }
            ],
            columnsData: []
        };
    },

    async mounted () {
        let idArr = await getId.getId(this.fm, this.token, 1);
        if (idArr) {
            this.path.marketplaceId = idArr[0];
            this.path.merchantId = idArr[1];
        }
        // 创建日期
        this.buildTimeFromChange(this.buildTimeFrom);
        this.buildTimeToChange(this.buildTimeTo);
        // 付款日期
        this.payTimeFromChange(this.payTimeFrom);
        this.payTimeToChange(this.payTimeTo);
        this.getList();
    },
    methods: {
        changePage (pageCode) {
            this.objPage.page = pageCode - 1;
            this.getList();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.getList();
        },
        buildTimeFromChange (buildTimeFrom) {
            this.time.fromTime = buildTimeFrom;
            this.buildTimeToOption = {
                disabledDate (buildTimeTo) {
                    return buildTimeTo < new Date(new Date(buildTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return buildTimeTo < new Date(buildTimeFrom);
                }
            };
        },
        payTimeFromChange (payTimeFrom, type) {
            this.time.payFromTime = payTimeFrom;
            this.payTimeToOption = {
                disabledDate (payTimeTo) {
                    return payTimeTo < new Date(new Date(payTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return payTimeTo < new Date(payTimeFrom);
                }
            };
        },
        buildTimeToChange (buildTimeTo, type) {
            this.time.toTime = buildTimeTo;
            this.buildTimeFromOption = {
                disabledDate (buildTimeFrom) {
                    return buildTimeFrom > new Date(buildTimeTo);
                }
            };
        },
        payTimeToChange (payTimeTo, type) {
            this.time.payToTime = payTimeTo;
            this.payTimeFromOption = {
                disabledDate (payTimeFrom) {
                    return payTimeFrom > new Date(payTimeTo);
                }
            };
        },
        getList () {
            this.columnsData = [];
            try {
                this.$http.get(`${this.fm}/finance/account/myBack`, {
                    params: {
                        marketplaceId: this.path.marketplaceId,
                        merchantId: this.path.merchantId,
                        access_token: this.path.token,
                        pageNumber: this.objPage.page,
                        pageSize: this.objPage.size,
                        payFromTime: this.time.payFromTime,
                        payToTime: this.time.payToTime,
                        creationFromTime: this.time.fromTime,
                        creationToTime: this.time.toTime,
                        invoiceStatus: this.query.state,
                        outTradeNo: this.query.NO,
                        id: this.query.orderNo
                    }
                }).then(res => {
                    var data = res.data;
                    if (data.return_code === 200) {
                        var dataList = data.content.page;
                        this.objPage.totalPage = data.content.totalNumberOfResults;
                        dataList.map((item, index) => {
                            this.columnsData.push({
                                number: item.outTradeNo, // item.id,s
                                buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                payTime: item.paymentDateTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.paymentDateTime) : '',
                                info: item.description ? item.description : '',
                                settlenum: item.outTradeNo ? item.outTradeNo : '',
                                paypersonal: item.buyerName ? item.buyerName : '',
                                money: item.payedPrice ? item.payedPrice.toFixed(2) : '0.00',
                                status: item.status ? tradState.income(item.status) : '',
                                id: item.id
                            });
                        });
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请求失败'
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        query_fn () {
            this.objPage.page = 0;
            this.getList();
        },
        reset () {
            this.query = {
                state: '',
                NO: '',
                orderNo: ''
            };
            this.time = {
                fromTime: '',
                toTime: '',
                payFromTime: '',
                payToTime: ''
            };
            this.buildTimeFrom = ''; // 创建时间--开始
            this.buildTimeTo = '';// 创建时间--结束
            this.payTimeFrom = ''; // 支付时间--开始
            this.payTimeTo = ''; // 支付时间--结束
            this.getList();
        }
    }
};
</script>

 <style lang="less" scoped>
.w_query {
  padding: 30px 20px;
}
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
// 遮罩层
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>


