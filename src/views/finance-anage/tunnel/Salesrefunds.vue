
<template>
<div >
   <Row>
      <Card :style="{minWidth:'1500px'}">
          <p slot="title" class="slot_title_height">
              <span class="title_span">销售退款 </span>
              <top-btn
                :btnList="btnList"
                :currentRowData="currentRowData"
                @changeIndex="changeIndex"
              ></top-btn>
          </p>
          <div class="w_query">
            <Row>
              <Col span="7" :style="{marginBottom:'20px'}">
                  <span>支付日期：</span>
                  <DatePicker type="date" v-model="payTimeFrom" placeholder="请选择开始时间" :options="payTimeFromOption"  @on-change="payTimeFromChange" style="width: 150px"></DatePicker>
                  <span :style="{margin:'0 10px'}">至</span>
                  <DatePicker type="date"  v-model="payTimeTo" placeholder="请选择结束时间"  :options="payTimeToOption"  @on-change="payTimeToChange"  style="width: 150px"></DatePicker>
              </Col>
              <Col span="7" :style="{marginBottom:'20px'}">
                  <span>创建日期：</span>
                  <DatePicker type="date" v-model="buildTimeFrom" :options="buildTimeFromOption"  @on-change="buildTimeFromChange" placement="bottom-start" placeholder="开始日期" style="width: 150px"></DatePicker>
                  <span :style="{margin:'0 10px'}">至</span>
                  <DatePicker type="date" v-model="buildTimeTo" :options="buildTimeToOption"  @on-change="buildTimeToChange" placeholder="结束日期" style="width: 150px"></DatePicker>
              </Col> 
              <Col span="5" :style="{marginBottom:'20px'}">
                  <span style="margin-right:5px">退款状态:</span>
                  <Select v-model="settleStatus" style="width:150px">
                      <Option v-for="item in settleStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
              </Col>
              <Col span="8" :style="{marginBottom:'20px'}">
                  <span>退款完成时间从：</span>
                  <DatePicker type="date" v-model="finshTimeFrom" :options="finshTimeFromOption"  @on-change="finshTimeFromChange" placement="bottom-start" placeholder="开始日期" style="width: 150px"></DatePicker>
                  <span :style="{margin:'0 10px'}">至</span>
                  <DatePicker type="date" v-model="finshTimeTo" :options="finshTimeToOption"  @on-change="finshTimeToChange" placeholder="结束日期" style="width: 150px"></DatePicker>
              </Col>  
              <Col span="6" :style="{marginBottom:'20px'}">
                  对应结算单号：<Input v-model="oddNum" placeholder="请输入单号" style="width: 150px" />
              </Col>
              <Col span="5" :style="{marginBottom:'20px',marginLeft:'30px'}">
                  <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="query">查询</Button>
                  <Button shape="circle" style="width:80px" @click="reset">重置</Button>
              </Col>
              </Row>
          </div>
          <radio-table
              :colname="columnsTit"
              :total='objPage.totalPage'
              :tableData="columnsData"
              :isRadio="true"
              @selected="getChooseData"
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
            token: this.Cookies.get('token'),
            loading: false,
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                },
                {
                    type: 14,
                    btnlabel: '查看'
                }
            ],
            currentRowData: {},
            path: {
                marketplaceId: '', // '36',
                merchantId: '', // '208',
                id: ''
            },
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            }, // 存放页数
            oddNum: '', // 单号
            agent: '', // 下级代理商
            settleStatus: '全部', // 结算状态
            time: {
                buildTimeFrom: '', // 创建时间--开始
                buildTimeTo: '', // 创建时间--结束
                payTimeFrom: '', // 支付时间--开始
                payTimeTo: '', // 支付时间--结束
                finshTimeFrom: '', // 创建完成时间--开始
                finshTimeTo: '' // 创建完成是时间--结束
            },
            buildTimeFrom: '', // 创建时间--开始
            buildTimeTo: '', // 创建时间--结束
            payTimeFrom: '', // 支付时间--开始
            payTimeTo: '', // 支付时间--结束
            finshTimeFrom: '', // 创建完成时间--开始
            finshTimeTo: '', // 创建完成是时间--结束
            buildTimeFromOption: {},
            buildTimeToOption: {},
            payTimeFromOption: {},
            payTimeToOption: {},
            finshTimeFromOption: {},
            finshTimeToOption: {},
            settleStatusList: [
                {
                    value: '全部',
                    label: ' 全部'
                },
                {
                    value: 'PENDING',
                    label: ' 退款中'
                },
                {
                    value: 'SUCCESS',
                    label: ' 退款成功 '
                },
                {
                    value: 'FAILD',
                    label: ' 退款失败'
                },
                {
                    value: 'INVALID',
                    label: ' 失效'
                }
            ],
            columnsTit: [
                {
                    title: '业务单号',
                    key: 'number',
                    width: 200,
                    align: 'center'
                },
                {
                    title: '创建日期',
                    key: 'buildTime',
                    width: 180,
                    align: 'center'
                },
                {
                    title: '退款完成时间',
                    width: 180,
                    key: 'finshTime',
                    align: 'center'
                },
                {
                    title: '对应结算退款单号',
                    key: 'settlenNo',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '通道来源',
                    key: 'Origin',
                    width: 250,
                    align: 'center'
                },

                {
                    title: '付款人',
                    key: 'paypersonal',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '内容信息',
                    key: 'contnetInfo',
                    width: 250,
                    align: 'center'
                },
                {
                    title: '金额（元）',
                    key: 'money',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '退款状态',
                    key: 'payState',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '本次支付金额(元)',
                    key: 'thisPayMoney',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '支付时间',
                    key: 'payTime',
                    width: 180,
                    align: 'center'
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
        // 创建完成时间
        this.finshTimeFromChange(this.finshTimeFrom);
        this.finshTimeToChange(this.finshTimeTo);
        this.getList();
    },
    methods: {
        changeIndex (type) {
            if (type === 14) {
                this.$router.push({
                    name: 'SalesrefundsDetail',
                    query: this.path
                });
            }
        },
        getChooseData (row) {
            if (!row.settlenNo) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '当前ID无法查询详情'
                });
            } else {
                this.currentRowData['id'] = row.settlenNo;
                this.path.id = row.settlenNo;
            }
        },
        buildTimeFromChange (buildTimeFrom) {
            this.time.buildTimeFrom = buildTimeFrom;
            this.buildTimeToOption = {
                disabledDate (buildTimeTo) {
                    return buildTimeTo < new Date(new Date(buildTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return buildTimeTo < new Date(buildTimeFrom);
                }
            };
        },
        payTimeFromChange (payTimeFrom, type) {
            this.time.payTimeFrom = payTimeFrom;
            this.payTimeToOption = {
                disabledDate (payTimeTo) {
                    return payTimeTo < new Date(new Date(payTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return payTimeTo < new Date(payTimeFrom);
                }
            };
        },
        finshTimeFromChange (finshTimeFrom, type) {
            this.time.finshTimeFrom = finshTimeFrom;
            this.finshTimeToOption = {
                disabledDate (finshTimeTo) {
                    return finshTimeTo < new Date(new Date(finshTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return finshTimeTo < new Date(finshTimeFrom);
                }
            };
        },
        buildTimeToChange (buildTimeTo, type) {
            this.time.buildTimeTo = buildTimeTo;
            this.buildTimeFromOption = {
                disabledDate (buildTimeFrom) {
                    return buildTimeFrom > new Date(buildTimeTo);
                }
            };
        },
        payTimeToChange (payTimeTo, type) {
            this.time.payTimeTo = payTimeTo;
            this.payTimeFromOption = {
                disabledDate (payTimeFrom) {
                    return payTimeFrom > new Date(payTimeTo);
                }
            };
        },
        finshTimeToChange (finshTimeTo, type) {
            this.time.finshTimeTo = finshTimeTo;
            this.finshTimeFromOption = {
                disabledDate (finshTimeFrom) {
                    return finshTimeFrom > new Date(finshTimeTo);
                }
            };
        },
        changePage (pageCode) {
            this.objPage.page = pageCode - 1;
            this.getList();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.getList();
        },
        // 获取列表数据
        getList () {
            try {
                this.columnsData = [];
                this.loading = true;
                // id=12&payFromTime=123&payToTime=1234&status=PENDING&creationFromTime=4343&creationToTime=5454&completeFromTime=676&completeToTime=788&pageNumber=0&pageSize=10                // finance/account/myBack?access_token=86a97552-82a4-435e-8b24-f687ea55bd58&marketplaceId=1&merchantId=16&tunnelPay=true&pageNumber=0&pageSize=10
                this.$http.get(`${this.fm}/finance/tunnel/listRefundBill`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.path.marketplaceId,
                        merchantId: this.path.merchantId,
                        id: this.oddNum,
                        payFromTime: this.time.payTimeFrom,
                        payToTime: this.time.payTimeTo,
                        creationFromTime: this.time.buildTimeFrom,
                        creationToTime: this.time.buildTimeTo,
                        completeFromTime: this.time.finshTimeFrom, // 交易完成
                        completeToTime: this.time.finshTimeTo,
                        // outTradeNo: this.oddNum, // 对应结算单号
                        status: this.settleStatus === '全部' ? '' : this.settleStatus,
                        pageNumber: this.objPage.page,
                        pageSize: this.objPage.size
                        // tunnelPay: true // 是否是通道销售退款
                    }
                }).then(res => {
                    this.loading = false;
                    let data = res.data;
                    if (data.return_code === 200 || data.return_code === 'SUCCESS') {
                        this.objPage.totalPage = data.content.totalNumberOfResults;
                        let items = data.content;
                        if (items.page.length > 0) {
                            items.page ? items.page.map((item, index) => {
                                this.columnsData.push({
                                    number: item.invoice.outTradeNo, // item.id,
                                    buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                    finshTime: item.completeTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.completeTime) : '',
                                    settlenNo: item.id || '',
                                    Origin: item.merchant.legalName,
                                    paypersonal: item.invoice.buyer,
                                    contnetInfo: item.invoice.description,
                                    money: item.amount ? item.amount.toFixed(2) : '0.00',
                                    payState: item.status ? tradState.refund(item.status) : '',
                                    thisPayMoney: item.settlementedAmount ? item.settlementedAmount.toFixed(2) : '0.00',
                                    payTime: item.paymentTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.paymentTime) : ''
                                });
                            }) : this.columnsData = [];
                        }
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: data.msg
                        });
                    }
                });
            } catch (err) {
                this.loading = false;
                console.log(err);
            }
        },
        query () {
            this.objPage.page = 0;
            this.getList();
        },
        reset () {
            this.time.payTimeFrom = '';
            this.time.payTimeTo = '';
            this.settleStatus = '全部';
            this.time.buildTimeFrom = '';
            this.time.buildTimeTo = '';
            this.oddNum = '';// 对应结算单号
            this.time.finshTimeFrom = '';
            this.time.finshTimeTo = '';
            this.buildTimeFrom = ''; // 创建时间--开始
            this.buildTimeTo = ''; // 创建时间--结束
            this.payTimeFrom = ''; // 支付时间--开始
            this.payTimeTo = ''; // 支付时间--结束
            this.finshTimeFrom = ''; // 创建完成时间--开始
            this.finshTimeTo = ''; // 创建完成是时间--结束
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


