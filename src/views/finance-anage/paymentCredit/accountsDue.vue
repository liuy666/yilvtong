
<template>
<div :style="{minWidth:'1150px'}">
   <Row>
     <Card>
      <div class="w_query" >
          <Row :style="{marginBottom:'20px'}">
            <Col span="8">
            <span>单号：</span>
            <Input v-model="form.oddNum" placeholder="请输入单号" style="width: 150px" />
            </Col>  
              <!-- <Col span="6">
                <span>对应结算系统单号：</span>
                <Input v-model="form.stytemNo" placeholder="请输入对应结算系统单号" style="width: 150px" />
            </Col>   -->
            <Col span="8">
                <span>应付款代理商：</span>
                <Input v-model="form.agent" placeholder="请输入应付款代理商" style="width: 150px" />
            </Col>  
            <Col span="8">
                <span style="margin-right:5px">结算状态：</span>
                <Select v-model="form.settleStatus" style="width:150px">
                    <Option v-for="item in settleStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            </Row>
            <Row :style="{marginBottom:'20px'}">
                <Col span="10">
                  <span>创建日期：</span>
                  <DatePicker type="date" v-model="buildTimeFrom" :options="buildTimeFromOption"  @on-change="buildTimeFromChange" placement="bottom-start" placeholder="开始日期" :style="{maxWidth:'150px'}"></DatePicker>
                  <span :style="{margin:'0 10px'}">至</span>
                  <DatePicker type="date" v-model="buildTimeTo" :options="buildTimeToOption"  @on-change="buildTimeToChange" placeholder="结束日期" :style="{maxWidth:'150px'}"></DatePicker>
                </Col>
                <Col span="10">
                  <span>付款日期：</span>
                  <DatePicker type="date" v-model="payTimeFrom" placeholder="请选择开始时间" :options="payTimeFromOption"  @on-change="payTimeFromChange" :style="{maxWidth:'150px'}"></DatePicker>
                  <span :style="{margin:'0 10px'}">至</span>
                  <DatePicker type="date"  v-model="payTimeTo" placeholder="请选择结束时间"  :options="payTimeToOption"  @on-change="payTimeToChange"  :style="{maxWidth:'150px'}"></DatePicker>
                </Col>
                 <Col span="4">
                    <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="query">查询</Button>
                    <Button shape="circle" style="width:80px" @click="reset">重置</Button>
                </Col>
              </Row> 
          </div>
          <radio-table
            :colname="columnsTit"
            :total='objPage.totalPage'
            :tableData="columnsData"
            :isRadio="false"
            :pageNum="objPage.size"
            :pageCode="objPage.page+1"
            :loading="loading"
            @changePage="changePage"
            @changePageSize="changePageSize"
        ></radio-table>
     </Card>
       <!-- 收款详情  -->
      <gather-a  :gatherBtn="this.gatherBtn" :id="id"  v-on:gatherBtnFn="gatherBtnFn"/> 
   </Row>
</div>
</template>

<script>
import gatherA from '../Modal/gatherDetail';// 收款详情
import publicMethod from '@/libs/publicMethod.js';
import getId from '@/libs/getSettleMerchantId.js';
import tradState from '@/libs/tradState.js';

export default {
    components: {
        gatherA
    },
    data () {
        return {
            loading: false,
            token: this.Cookies.get('token'),
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            }, // 存放页数
            id: {
                marketplaceId: '',
                merchantId: '',
                consumerId: '',
                gatherId: '', // 收款详情ID
                isSurePay: false,
                isAccountsPay: false
            },
            gatherBtn: false,
            // receivablesBtn: false,
            form: {
                oddNum: '', // 单号
                stytemNo: '', // 系统单号
                agent: '', // 应付款代理商
                settleStatus: '全部' // 结算状态
            },
            buildTime: {
                from: '',
                to: ''
            },
            payTime: {
                from: '',
                to: ''
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
                    value: '全部',
                    label: '全部'
                },
                {
                    value: 'PENDING',
                    label: '待结算'
                },
                {
                    value: 'PARTIAL_PAY',
                    label: '已部分付款'
                },
                {
                    value: 'FULL_PAY',
                    label: '已付款 '
                },
                {
                    value: 'FINISHED',
                    label: '确认完成'
                }
            ],
            columnsTit: [
                {
                    title: '单号',
                    key: 'stytemNo',
                    align: 'center'
                },
                {
                    title: '创建日期',
                    key: 'buildTime',
                    align: 'center'
                },
                {
                    title: '应付款代理商',
                    key: 'agent',
                    align: 'center'
                },
                {
                    title: '应结算金额(元)',
                    key: 'SettleAmount',
                    align: 'center'
                },
                {
                    title: '结算状态',
                    key: 'settleStatus',
                    align: 'center'
                },
                {
                    title: '预付时间',
                    key: 'PrepayTime',
                    align: 'center'
                },
                {
                    title: '已付款金额(元)',
                    key: 'AmountPaid',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
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
                                            path: '/accountsDueDetail',
                                            query: {
                                                orderId: this.columnsData[params.index].stytemNo,
                                                marketplaceId: this.id.marketplaceId,
                                                merchantId: this.id.merchantId
                                            }
                                        });
                                    }
                                }
                            }, '结算详情'),
                            h('span', {
                                style: {
                                    color: '#5DB2FF',
                                    marginRight: '10px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.gatherBtn = true;
                                        this.id.isSurePay = false;
                                        this.id.isAccountsPay = false;
                                        this.id.gatherId = this.columnsData[params.index].stytemNo;
                                    }
                                }
                            }, ' 收款详情'),
                            h('span', {
                                style: {
                                    color: '#5DB2FF',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.gatherBtn = true;
                                        this.id.isSurePay = true;
                                        this.id.isAccountsPay = false;
                                        this.id.gatherId = this.columnsData[params.index].stytemNo;
                                    }
                                }
                            }, this.columnsData[params.index]._settleStatus === 'FULL_PAY' ? '收款确认' : ' ')
                        ]);
                    }
                }
            ],
            columnsData: []
        };
    },
    async  mounted () {
        let idArr = await getId.getId(this.fm, this.token, 1);
        if (idArr) {
            this.id.marketplaceId = idArr[0];
            this.id.merchantId = idArr[1];
            this.id.consumerId = idArr[2];
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
        gatherBtnFn (TF) {
            this.gatherBtn = TF;
        },
        changePage (pageCode) {
            this.objPage.page = pageCode - 1;
            this.getList();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.getList();
        },
        buildTimeFromChange (buildTimeFrom) {
            this.buildTime.from = buildTimeFrom;
            this.buildTimeToOption = {
                disabledDate (buildTimeTo) {
                    return buildTimeTo < new Date(new Date(buildTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return buildTimeTo < new Date(buildTimeFrom);
                }
            };
        },
        payTimeFromChange (payTimeFrom, type) {
            this.payTime.from = payTimeFrom;
            this.payTimeToOption = {
                disabledDate (payTimeTo) {
                    return payTimeTo < new Date(new Date(payTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return payTimeTo < new Date(payTimeFrom);
                }
            };
        },
        buildTimeToChange (buildTimeTo, type) {
            this.buildTime.to = buildTimeTo;
            this.buildTimeFromOption = {
                disabledDate (buildTimeFrom) {
                    return buildTimeFrom > new Date(buildTimeTo);
                }
            };
        },
        payTimeToChange (payTimeTo, type) {
            this.payTime.to = payTimeTo;
            this.payTimeFromOption = {
                disabledDate (payTimeFrom) {
                    return payTimeFrom > new Date(payTimeTo);
                }
            };
        },
        // 获取卖家列表
        getList () {
            this.columnsData = [];
            try {
                var url = `${this.fm}/finance/credit/creditProviderSettlements`;
                url += '?' + this.QS.stringify({
                    access_token: this.token,
                    marketplaceId: this.id.marketplaceId,
                    merchantId: this.id.merchantId,
                    // providerId: this.id.consumerId, // 授信方id
                    pageNumber: this.objPage.page,
                    pageSize: this.objPage.size,
                    id: this.form.oddNum, // 结算单号
                    providerName: this.form.agent, // 授信方名称
                    settlementStatus: this.form.settleStatus === '全部' ? '' : this.form.settleStatus, // 结算状态
                    creationFromDate: this.buildTime.from, // 创建起始时间
                    creationToDate: this.buildTime.to, // 创建终止时间
                    payedFromDate: this.payTime.from, // 付款起始时间
                    payedToDate: this.payTime.to // 付款截止时间
                });
                this.$http.get(url).then(res => {
                    var data = res.data;
                    if (data.return_code === 'SUCCESS') {
                        this.objPage.totalPage = data.content.totalNumberOfResults;
                        if (data.content.page.length > 0) {
                            data.content.page.map((item, index) => {
                                this.columnsData.push({
                                    // number: item.sourceBillNo,
                                    stytemNo: item.id,
                                    buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                    agent: item.consumeLegalName,
                                    SettleAmount: item.amount ? item.amount.toFixed(2) : '0.00',
                                    settleStatus: tradState.account(item.settlementStatus),
                                    _settleStatus: item.settlementStatus,
                                    PrepayTime: item.payedDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.payedDate) : '',
                                    AmountPaid: item.payedAmount ? item.payedAmount.toFixed(2) : '0.00'
                                });
                            });
                        }
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
        query () {
            this.objPage.page = 0;
            this.getList();
        },
        // 重置
        reset () {
            this.form.oddNum = '';// 结算单号
            this.form.agent = '';// 授信方名称
            this.form.stytemNo = '';// 对应结算系统单号
            this.form.settleStatus = '全部';// 结算状态
            this.buildTime.from = '';// 创建起始时间
            this.buildTime.to = '';// 创建终止时间
            this.payTime.from = '';// 付款起始时间
            this.payTime.to = '';// 付款截止时间
            this.buildTimeFrom = ''; // 创建时间--开始
            this.buildTimeTo = ''; // 创建时间--结束
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


