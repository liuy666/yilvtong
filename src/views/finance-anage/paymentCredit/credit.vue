
<template>
<div>
  <Row>
      <Card>
          <p slot="title" class="slot_title_height">
              <span class="title_span">授信管理</span>
              <top-title-opbtn :btnList="btnList"></top-title-opbtn>
          </p>
            <div class="w_creditInfo">
              <div class="creditInfo">
                  <span class="tit">授信信息</span>
                  <div class="Status">
                      <span>授信状态：</span>
                      <span class="state" :style="{color:info.state=='已开启'?'#1AAD19':'#F00'}">{{info.state}}</span>
                      <span v-if="info.state=='已开启'" class="stateBtn cursor" @click="isOpenCredit('STOPED')">关闭</span>
                      <span v-else class="stateBtn cursor" @click="isOpenCredit('INSERVICE')">开启</span>
                  </div>
                  <div class="w_Settlement">
                     <Row :style="{marginBottom:'20px',marginTop:'20px'}">
                        <Col span="8" :style="{textAlign:'left'}">
                            <span >授信余额：</span>
                            <span >{{info.money}}元</span>
                            <span v-if="info.state=='已开启'" class="adjustment cursor" @click="model.isadjust=true">调整授信额度</span>
                        </Col> 
                          <Col span="8" :style="{textAlign:'left'}">
                              <span >余额预警值：</span>
                              <span >{{info.warnMoney}}元</span>
                        </Col> 
                          <Col span="8" :style="{textAlign:'left'}">
                              <div>
                                <span>结算范围：</span>
                                <span>{{info.cycle}}</span>
                                <span v-if="info.state=='已开启'" class="adjustment cursor" @click="model.isSettleCycle=true" >修改</span>
                              </div>   
                        </Col> 
                      </Row>  
                  </div>
                  <div class="w_Settlement">
                    <div class="cycle" v-if="info.settlementCycle">
                        <span :style="{lineHeight:'25px'}">{{info.settlementCycle}}</span>
                        <span v-if="info.state=='已开启'" class="adjustment cursor" @click="model.isCycleModifi=true">修改</span>
                    </div>
                  </div>
              </div>
          </div>
           <div class="w_query">
              <Row>
                  <Col span="10">
                    <span>日期：</span> 
                    <DatePicker type="date" v-model="buildTimeFrom" :options="buildTimeFromOption"  @on-change="buildTimeFromChange" placement="bottom-start" placeholder="开始日期" style="width: 150px"></DatePicker>
                    <span :style="{margin:'0 10px'}">至</span> 
                    <DatePicker type="date" v-model="buildTimeTo" :options="buildTimeToOption"  @on-change="buildTimeToChange" placeholder="结束日期" style="width: 150px"></DatePicker>
                  </Col>
                  <Col span="7">
                    <span style="margin-right:5px">业务类别：</span>
                    <Select v-model="selectState" style="width:150px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                  <Col span="7" >
                    <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="query">查询</Button>
                    <Button shape="circle" style="width:80px" @click="reset">重置</Button>
                  </Col>
              </Row>
          </div>
          <radio-table
            :colname="columns1"
            :total='objPage.totalPage'
            :tableData="data1"
            :isRadio="false"
            :pageNum="objPage.size"
            :pageCode="objPage.page+1"
            :loading="loading"
            @changePage="changePage"
            @changePageSize="changePageSize"
        ></radio-table>
      </Card>
  </Row>
  <!-- 调整信用额度 -->
  <adjust-credit :isadjust="model.isadjust" :info="info"  @isadjustFn="isadjustFn"/> 
    <!-- 结算周期 -->
  <cycle-modifi :isCycleModifi ="model.isCycleModifi" :info="info" @isCycleModifiFn="isCycleModifiFn"/> 
   <!-- 结算范围 -->
  <settle-cycle :isSettleCycle='model.isSettleCycle' :info="info" :cycle="info._cycle"   @isSettleCycleFn="isSettleCycleFn"/> 
</div>
    
</template>

<script>
import AdjustCredit from '../Modal/AdjustCredit';// 调整信用额度
import SettleCycle from '../Modal/SettleCycle';// 结算范围
import cycleModifi from '../Modal/cycleModifi';// 结算周期
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
export default {
    components: {
        AdjustCredit,
        SettleCycle,
        cycleModifi
    },
    data () {
        return {
            token: this.Cookies.get('token'),
            loading: false,
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            // 存放页数
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            },
            // 模态框
            model: {
                isadjust: false, // 信用额度调整
                isConfirm: false, // 支付页面
                isCycleModifi: false, // 结算周期
                isSettleCycle: false // 结算范围
            },
            // 授信信息
            info: {
                settlementCycle: '', // 结算周期--汉字
                _settlementCycle: '', // 结算周期--字段
                _settlementType: '', // 结算周期--类型
                _marketPlaceList: '', // 'All'
                state: '', // 状态  开启/关闭
                money: 0, // 授信余额
                warnMoney: '', // 授信预警值
                cycle: '', // 结算范围--汉字
                _cycle: '', // 结算范围--字段
                userName: this.$route.query.userName,
                marketplaceId: this.$route.query.marketplaceId, // 平台号
                merchantId: this.$route.query.merchantId,
                consumerId: this.$route.query.consumerId,
                scenicareacode: this.$route.query.scenicareacode,
                agentCode: this.$route.query.agentCode,
                id: '' // 账户id
            },
            mofit: {
                adjustVal: '', // 修改---结算范围--调整参数
                creditMoney: 0,
                confirmVal: {}
            },
            selectState: '全部',
            buildTimeFromOption: {},
            buildTimeToOption: {},
            buildTimeFrom: '', // 创建时间--开始
            buildTimeTo: '', // 创建时间--结束
            changeTime: {
                From: '',
                To: ''
            },
            cityList: [
                {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: 'TRADE',
                    label: '交易'
                },
                {
                    value: 'REFUND',
                    label: '退款'
                },
                {
                    value: 'CREDITADD',
                    label: '授信增额'
                },
                {
                    value: 'CREDITREDUCE',
                    label: '授信减额'
                },
                {
                    value: 'SETTLECYCLE',
                    label: '结算确认循环授信'
                }
            ],
            columns1: [
                {
                    title: '日期',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '业务单号', // 为景区的交易单号退款单号
                    align: 'center',
                    key: 'businessNo'
                },
                {
                    title: '关联结算系统单号', // 结算系统传过来的单号
                    align: 'center',
                    key: 'systemNo'
                },
                {
                    title: '收/支', // 结算系统传过来的单号
                    align: 'center',
                    key: 'inAndOut'
                },
                {
                    title: '变动前余额(元)', // 结算系统传过来的单号
                    align: 'center',
                    key: 'money'
                },
                {
                    title: '变动金额(元)', // 结算系统传过来的单号
                    align: 'center',
                    key: 'changeMoney'
                },
                {
                    title: '业务类别', // 结算系统传过来的单号
                    align: 'center',
                    key: 'businessStyle'
                },
                {
                    title: '变动后余额(元)', // 结算系统传过来的单号
                    align: 'center',
                    key: 'finshMoney'
                }
            ],
            data1: []
        };
    },
    mounted () {
    // 创建日期
        this.buildTimeFromChange(this.buildTimeFrom);
        this.buildTimeToChange(this.buildTimeTo);
        this.creditInfo();
    },
    methods: {
        buildTimeFromChange (buildTimeFrom) {
            this.changeTime.From = buildTimeFrom;
            this.buildTimeToOption = {
                disabledDate (buildTimeTo) {
                    return buildTimeTo < new Date(new Date(buildTimeFrom).getTime() - 24 * 60 * 60 * 1000);
                    // return buildTimeTo < new Date(buildTimeFrom);
                }
            };
        },
        buildTimeToChange (buildTimeTo, type) {
            this.changeTime.To = buildTimeTo;
            this.buildTimeFromOption = {
                disabledDate (buildTimeFrom) {
                    return buildTimeFrom > new Date(buildTimeTo);
                }
            };
        },
        changePage (pageCode) {
            this.objPage.page = pageCode - 1;
            this.queryList();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.queryList();
        },
        // 授信管理信息
        creditInfo () {
            try {
                this.$http.get(`${this.fm}/finance/credit/creditAccountsInfo`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.info.marketplaceId, // this.$route.query.marketplaceId, // '1',//平台号
                        merchantId: this.info.merchantId, // this.$route.query.merchantId, // '1',
                        consumerId: this.info.consumerId,
                        type: '1', // 1:后台管理，2：供应商管理，3：分销商管理
                        pageNumber: 0,
                        pageSize: 1
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 'SUCCESS') {
                        if (data.content.page.length > 0) {
                            this.info.settlementCycle = publicMethod.settlementCycle(data.content.page[0]);
                            this.info._settlementCycle = data.content.page[0].settlementCycle;
                            this.info._settlementType = data.content.page[0].settlementType;
                            this.info._marketPlaceList = data.content.page[0].marketPlaceList;
                            this.info.state = data.content.page[0].accountStatus === 'INSERVICE' ? '已开启' : '未开启';// 状态
                            this.info.money = data.content.page[0].balance ? data.content.page[0].balance : 0;// 授信余额 1
                            this.info.warnMoney = data.content.page[0].warningAmount ? data.content.page[0].warningAmount : 0;// 预警余额 1
                            this.info.cycle = data.content.page[0].settlementRange === 'PAIED' ? '已支付订单' : '已核销订单';// 结算范围
                            this.info._cycle = data.content.page[0].settlementRange;// 结算范围---字段
                            this.info.id = data.content.page[0].id;// 账户id
                            this.queryList();
                        }
                    } else {
                        let errMsg = data.return_msg ? data.return_msg : data.msg;
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: errMsg
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        // 授信账户启用\禁止
        isOpenCredit (openStatus) {
            try {
                this.$http.put(`${this.fm}/finance/basis/over/${this.info.marketplaceId}/${this.info.merchantId}/${this.info.id}/${openStatus}?access_token=${this.Cookies.get('token')},`)
                    .then(res => {
                        let data = res.data;
                        if (data.return_code === 'SUCCESS') {
                            this.creditInfo();
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        },
        // 查询列表
        queryList () {
            this.data1 = [];
            ;
            try {
                this.$http.get(`${this.fm}/finance/credit/creditEntrys`, {
                    params: {
                        access_token: this.Cookies.get('token'),
                        creditAccountId: this.info.id,
                        marketplaceId: this.info.marketplaceId, // this.$route.query.marketplaceId, // '1',//平台号
                        merchantId: this.info.merchantId, // this.$route.query.merchantId, // '1',
                        creationFromTime: this.changeTime.From,
                        creationToTime: this.changeTime.To,
                        businssType: this.selectState === '全部' ? '' : this.selectState,
                        pageNumber: this.objPage.page,
                        pageSize: this.objPage.size
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 'SUCCESS') {
                        this.objPage.totalPage = data.content.totalNumberOfResults;
                        data.content.page.map((item, index) => {
                            this.data1.push(
                                {
                                    date: publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate),
                                    businessNo: item.outTradeNo, // 业务单号
                                    systemNo: item.orderId, // 关联结算系统单号
                                    inAndOut: item.entryType === 'OUTCOME' ? '支' : '收',
                                    money: item.beforeBalance ? item.beforeBalance.toFixed(2) : '0.00',
                                    changeMoney: item.entryType === 'OUTCOME' ? `-${item.amount.toFixed(2)}` : `+${item.amount.toFixed(2)}`,
                                    businessStyle: tradState.credit(item.businessType),
                                    finshMoney: item.afterBalance ? item.afterBalance.toFixed(2) : '0.00'
                                }
                            );
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        query () {
            this.objPage.page = 0;
            this.queryList();
        },
        // 重置
        reset () {
            this.changeTime.From = '';
            this.changeTime.To = '';
            this.selectState = '全部';
            this.buildTimeFrom = ''; // 创建时间--开始
            this.buildTimeTo = ''; // 创建时间--结束
            this.queryList();
        },
        // 修改--授信额度
        isadjustFn (TF) {
            this.model.isadjust = TF;
        },
        // 修改---结算范围
        isSettleCycleFn (TF) {
            this.model.isSettleCycle = TF;
            this.creditInfo();
        },
        // 修改---结算周期
        isCycleModifiFn (TF) {
            this.model.isCycleModifi = TF;
            this.creditInfo();
        }
    }
};
</script>

 <style lang="less" scoped>
.cursor {
  cursor: pointer;
}
.ivu-modal-body {
  padding: 0px;
}
.creditInfo {
  border: 1px solid #5db2ff;
  min-height: 156px;
  position: relative;
  .tit {
    font-size: 16px;
    color: #5db2ff;
    padding: 10px 20px;
    position: absolute;
    top: -22px;
    background: #fff;
    left: 50px;
  }
  .Status {
    font-size: 14px;
    color: #666666;
    text-align: right;
    line-height: 40px;
    span {
      margin-right: 10px;
    }
    .state {
      color: #1aad19;
    }
    .stateBtn {
      color: #5db2ff;
    }
  }
}
.w_Settlement {
  padding: 0 80px 0 140px;
  .adjustment {
    color: #5db2ff;
    margin-left: 14px;
  }
  .cycle {
    text-align: left;
    font-size: 14px;
    color: #666666;
    span {
      margin-right: 10px;
    }
  }
}
.w_query {
  height: 100px;
  padding: 30px 20px;
}
.table {
  padding: 30px 20px;
}
</style>


