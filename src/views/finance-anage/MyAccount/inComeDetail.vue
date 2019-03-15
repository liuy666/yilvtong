
<template>
<div >
  <Row>
      <Card>
        <p slot="title" class="slot_title_height">
            <span class="title_span">{{this.$route.query.isOutCome?'支出详情':'收入详情'}}</span>
            <top-title-opbtn :btnList="btnList"></top-title-opbtn>
        </p>
        <div class="detailBody">
          <div class="detailTit">交易单</div> 
          <div class="body">
          <Row :style="{borderBottom:'1px dashed #dcdee2'}">
              <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
              <span>交易金额：</span>
              <span :style="{color:'#CE3C39'}">{{info.money}}元</span>
              </Col>
          </Row>
        <Row :style="{borderBottom:'1px dashed #dcdee2'}">
              <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                  <span>业务单号：</span>
                  <span >{{info.orderId}}</span>
              </Col>
              <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                  <span>对应结算单号：</span>
                  <span >{{info.systemNo}}</span>
              </Col>
              <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                  <span>订单状态：</span>
                  <span >{{info.state}}</span>
              </Col>
              <Col span="12" :style="{marginBottom:'20px'}">
                  <span>业务类型：</span>
                  <span >{{info.type}}</span>
              </Col>
          </Row>
          <Row :style="{borderBottom:'1px dashed #dcdee2'}">
              <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                  <span>买方：</span>
                  <span >{{info.buyUer}}</span>
              </Col>
              <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                  <span>卖方：</span>
                  <span >{{info.sellUser}}</span>
              </Col>
              <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                  <span>买方名称：</span>
                  <span >{{info.buyName}}</span>
              </Col>
              <Col span="12" :style="{marginBottom:'20px'}">
                  <span>买方名称：</span>
                  <span >{{info.sellName}}</span>
              </Col>
          </Row>
          <Row :style="{borderBottom:'1px dashed #dcdee2'}">
              <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                  <span>创建时间：</span>
                  <span >{{info.buildTime}}</span>
              </Col>
              <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                  <span>支付时间：</span>
                  <span >{{info.payTime}}</span>
              </Col>
              <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                  <span>付款有效期：</span>
                  <span >{{info.payEffectTime}}</span>
              </Col>
              <Col span="12" :style="{marginBottom:'20px'}">
                  <span>交易完成时间：</span>
                  <span >{{info.finshTime}}</span>
              </Col>
          </Row>
          </div>
      </div>
          <div class="table">
            <div class="detailTit" style="margin-top:20px">
                商品信息
            </div>
            <Table border :columns="shopping" :data="shoppingData"></Table>
        </div>
        <div class="table">
            <div class="detailTit" style="margin-top:20px">
                支付信息
            </div>
            <Table border :columns="pay" :data="payData"></Table>
        </div>
        <div class="table">
            <div class="detailTit" style="margin-top:20px">
                退款信息
            </div>
            <Table border :columns="refund" :data="refundData"></Table>
        </div>
        <Row :style="{textAlign:'center'}">
            <Col span="24">
              <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="$router.back(-1)">返回</Button>
            </Col>
        </Row>
      </Card>
  </Row>
    
</div>
    
</template>

<script>
import publicMethod from '@/libs/publicMethod.js';
import tradState from '@/libs/tradState.js';
export default {

    data () {
        return {
            token: this.Cookies.get('token'),
            info: {
                money: '',
                orderId: '',
                systemNo: '',
                state: '',
                type: '',
                buyUer: '',
                sellUser: '',
                buyName: '',
                sellName: '',
                buildTime: '',
                payTime: '',
                payEffectTime: '',
                finshTime: ''
            },
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            shopping: [
                {
                    title: '商品信息',
                    key: 'info',
                    align: 'center'
                },
                {
                    title: '单价',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'Account',
                    align: 'center'
                },
                {
                    title: '金额(元)',
                    key: 'money',
                    align: 'center'
                }
            ],
            shoppingData: [],
            pay: [
                {
                    title: '支付时间',
                    key: 'payTIme',
                    align: 'center'
                },
                {
                    title: '支付金额(元)',
                    key: 'payPrice',
                    align: 'center'
                }
            ],
            payData: [],
            refund: [
                {
                    title: '退款申请时间',
                    key: 'refundTime',
                    align: 'center'
                },
                {
                    title: '退款单号',
                    key: 'refundNo',
                    align: 'center'
                },
                {
                    title: '退款金额(元)',
                    key: 'refundPrice',
                    align: 'center'
                },
                {
                    title: '退款状态',
                    key: 'refundState',
                    align: 'center'
                }
            ],
            refundData: []
        };
    },
    mounted () {
        this.OrderInfo();
        this.shoppInfo();
        this.payInfo();
        this.refundInfo();
    },
    methods: {
        OrderInfo () {
            this.$http.get(`${this.fm}/finance/account/myInvoicesDetails/${this.$route.query.id}`, {
                params: {
                    access_token: this.token,
                    marketplaceId: this.$route.query.marketplaceId,
                    merchantId: this.$route.query.merchantId
                }
            }).then(res => {
                var data = res.data;
                if (data.return_code === 200) {
                    let infoData = JSON.parse(data.content).content;
                    this.info = {
                        money: infoData.payedPrice.toFixed(2) || '0.00',
                        orderId: infoData.outTradeNo || '',
                        systemNo: infoData.id || '',
                        state: tradState.income(infoData.status) || '',
                        type: tradState.income(infoData.status) || '',
                        buyUer: infoData.buyer || '',
                        sellUser: infoData.seller || '',
                        buyName: infoData.buyerName || '',
                        sellName: infoData.sellerName || '',
                        buildTime: infoData.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', infoData.creationDate) : '',
                        payTime: infoData.paymentDateTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', infoData.paymentDateTime) : '',
                        payEffectTime: infoData.validityTimeLimit ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', infoData.validityTimeLimit) : '',
                        finshTime: infoData.txnCompleteTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', infoData.txnCompleteTime) : ''
                    };
                } else {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请求失败'
                    });
                }
            });
        },
        // 商品信息
        shoppInfo () {
            this.shoppingData = [];
            try {
                this.$http.get(`${this.fm}/finance/tunnel/offers/${this.$route.query.id}`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.$route.query.marketplaceId,
                        merchantId: this.$route.query.merchantId
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 200) {
                        let items = data.content;
                        items.page ? items.page.map((item, index) => {
                            this.shoppingData.push(
                                {
                                    info: item.description,
                                    price: item.unitPrice ? item.unitPrice.toFixed(2) : '0.00',
                                    Account: item.quantity,
                                    money: item.price ? item.price.toFixed(2) : '0.00'
                                });
                        }) : this.shoppingData = [];
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
        // 支付信息
        payInfo () {
            this.payData = [];
            try {
                this.$http.get(`${this.fm}/finance/tunnel/payments/${this.$route.query.id}`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.$route.query.marketplaceId,
                        merchantId: this.$route.query.merchantId
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 200) {
                        let items = data.content;
                        items.page ? items.page.map((item, index) => {
                            this.payData.push({
                                payTIme: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                payPrice: item.amount ? item.amount.toFixed(2) : '0.00'
                            });
                        }) : this.payData = [];
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        // 退款信息
        refundInfo () { // id=230&marketplaceId=1&merchantId=3
            this.refundData = [];
            try {
                this.$http.get(`${this.fm}/finance/tunnel/refundsObject/${this.$route.query.id}`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.$route.query.marketplaceId,
                        merchantId: this.$route.query.merchantId
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 200) {
                        let items = data.content;
                        items.page ? items.page.map((item, index) => {
                            this.refundData.push({
                                refundTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                refundNo: item.bankAccountNo || '',
                                refundPrice: item.amount ? item.amount.toFixed(2) : '0.00',
                                refundState: tradState.income(item.status)
                            });
                        }) : this.refundData = [];
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

 <style lang="less" scoped>
.detailBody {
  margin-top: 20px;
  .body {
    padding: 20px;
    border: 1px solid #dcdee2;
    border-top: 0px;
  }
}
.detailTit {
  text-indent: 30px;
  font-size: 16px;
  line-height: 50px;
  color: #333;
  border: 1px solid #dcdee2;
  background: #f8f8f9;
}
.w_query {
  padding: 30px 20px;
}
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


