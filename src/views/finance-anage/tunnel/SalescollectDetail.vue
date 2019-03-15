
<template>
<div >
   <Row>
      <Card>
        <p slot="title" class="slot_title_height">
            <span class="title_span">销售收款详情 </span>
            <top-title-opbtn :btnList="btnList"></top-title-opbtn>
        </p>
        <div class="detailBody">
            <div class="detailTit">交易单（销售）</div>
            <div class="body">
              <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>单号：</span>
                    <span >{{saleInfo.No}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>交易时间：</span>
                    <span >{{saleInfo.tradTime}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>创建时间：</span>
                    <span >{{saleInfo.buildTime}}</span>
                </Col>
            </Row>
          <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>对应结算单号：</span>
                    <span >{{saleInfo.systemNo}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>业务类型：</span>
                    <span >{{saleInfo.businessType}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>付款有效期：</span>
                    <span >{{saleInfo.vaildTime}}之前</span>
                </Col>
            </Row>
            <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>买方：</span>
                    <span >{{saleInfo.buyer}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>交易金额：</span>
                    <span >{{saleInfo.tradMoney}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>通道来源：</span>
                    <span >{{saleInfo.origin}}</span>
                </Col>
            </Row>
            <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>订单状态：</span>
                    <span >{{saleInfo.orderState}}</span>
                </Col>
                <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>交易完成时间：</span>
                    <span >{{saleInfo.finishTime}}</span>
                </Col>
            </Row>
            </div>
        </div>
          <div class="table">
        <div class="detailTit" style="margin-top:20px"> 商品信息</div>
            <Table border :columns="shopping" :data="shoppingData"></Table>
        </div>
        <div class="table">
            <div class="detailTit" style="margin-top:20px">支付信息</div>
            <div class="body" style="margin-bottom:20px">
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                        <span>支付类型：</span>
                        <span >{{payInfo.type}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>支付状态：</span>
                        <span >{{payInfo.state}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>支付完成时间：</span>
                        <span >{{payInfo.finishTime}}</span>
                    </Col>
                </Row>
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                        <span>已支付金额：</span>
                        <span >{{payInfo.payedMoney}}元</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>待支付金额：</span>
                        <span >{{payInfo.stayPayMoney}}</span>
                    </Col>
                    
                </Row>
            </div>
            <Table border :columns="pay" :data="payData"></Table>
        </div>
        <div class="table">
            <div class="detailTit" style="margin-top:20px">退款信息</div>
            <div class="body" style="margin-bottom:20px">
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                        <span>已退款金额：</span>
                        <span >{{refundInfo.refundedMoney}}元</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>可退金额：</span>
                        <span >{{refundInfo.RefundableMoney}}元</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>退款状态：</span>
                        <span >{{refundInfo.refundState}}</span>
                    </Col>
                </Row>
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
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            // 销售信息
            saleInfo: {
                No: '',
                tradTime: '',
                buildTime: '',
                systemNo: '',
                businessType: '',
                vaildTime: '',
                buyer: '',
                tradMoney: '',
                origin: '',
                orderState: '',
                finishTime: ''
            },
            // 支付信息
            payInfo: {
                type: '',
                state: '',
                finishTime: '',
                payedMoney: '',
                stayPayMoney: ''
            },
            // 退款信息
            refundInfo: {
                refundedMoney: '',
                RefundableMoney: '',
                refundState: ''
            },
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
                    title: '金额',
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
                    title: '支付金额',
                    key: 'payPrice',
                    align: 'center'
                },
                {
                    title: '收款机构',
                    key: 'organ',
                    align: 'center'
                },
                {
                    title: '机构流水号',
                    key: 'serialNo',
                    align: 'center'
                },
                {
                    title: '收购机构开户名',
                    key: 'serialOrganName',
                    align: 'center'
                },
                {
                    title: '收款机构账号',
                    key: 'serialOrganNo',
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
                    title: '退款金额',
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
        this.getInfo();
        this.getShopp();
        this.getPay();
        this.getRefund();
    },
    methods: {
        getInfo () {
            try {
                this.$http.get(`${this.fm}/finance/tunnel/invoicesObject/${this.$route.query.id}`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.$route.query.marketplaceId,
                        merchantId: this.$route.query.merchantId
                    }
                }).then(res => {
                    let data = res.data;
                    if (data.return_code === 200) {
                        let item = data.content;
                        // 销售信息
                        item ? this.saleInfo = {
                            No: item.outTradeNo || '',
                            tradTime: item.paymentDateTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.paymentDateTime) : '',
                            buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                            systemNo: item.id || '',
                            businessType: tradState.BusinessType(item.businessType),
                            vaildTime: item.validityTimeLimit ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.validityTimeLimit) : '',
                            buyer: item.buyer || '',
                            tradMoney: item.totalPrice || '',
                            origin: item.source.legalName || '',
                            orderState: tradState.income(item.status),
                            finishTime: item.txnCompleteTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.txnCompleteTime) : ''
                        } : this.saleInfo = {
                            No: '',
                            tradTime: '',
                            buildTime: '',
                            systemNo: '',
                            businessType: '',
                            vaildTime: '',
                            buyer: '',
                            tradMoney: '',
                            origin: '',
                            orderState: '',
                            finishTime: ''
                        };
                        // 支付信息
                        item ? this.payInfo = {
                            type: tradState.payStyle(item.paymentType) || '',
                            state: tradState.payState(item.paymentStatus),
                            finishTime: item.paymentDateTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.paymentDateTime) : '',
                            payedMoney: item.payedPrice || '',
                            stayPayMoney: Number(item.totalPrice) - Number(item.payedPrice) || '0元'
                        } : this.payInfo = {
                            type: '',
                            state: '',
                            finishTime: '',
                            payedMoney: '',
                            stayPayMoney: ''
                        };
                        // 退款信息
                        item ? this.refundInfo = {
                            refundedMoney: item.refundedPrice || '0',
                            RefundableMoney: item.refundablePrice === 0 ? '0' : item.refundablePrice,
                            refundState: tradState.refundState(item.refundStatus)
                        } : this.refundInfo = {
                            refundedMoney: '',
                            RefundableMoney: '',
                            refundState: ''
                        };
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        getShopp () {
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
                        let datas = data.content;
                        datas.page ? datas.page.map((item, index) => {
                            this.shoppingData.push({
                                info: item.description || '',
                                price: item.unitPrice ? item.unitPrice.toFixed(2) : '0.00',
                                Account: item.quantity || '',
                                money: item.price ? item.price.toFixed(2) : '0.00'
                            });
                        }
                        ) : this.shoppingData = [];
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: data.return_msg
                        });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        getPay () {
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
                        let datas = data.content;
                        datas.page ? datas.page.map((item, index) => {
                            this.payData.push({
                                payTIme: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                payPrice: item.amount ? item.amount.toFixed(2) : '0.00',
                                organ: item.bankName || '',
                                serialNo: item.paymentTradeNo || '',
                                serialOrganName: item.sellerAccount || '',
                                serialOrganNo: item.sellerId || ''
                            });
                        }) : this.payData = [];
                    }
                });
            } catch (err) {
                console.log(err);
            }
        },
        getRefund () {
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
                        data.content.page ? data.content.page.map((item, index) => {
                            this.refundData.push({
                                refundTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                                refundNo: item.refundBill.id || '',
                                refundPrice: item.amount ? item.amount.toFixed(2) : '0.00',
                                refundState: tradState.refund(item.status)
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


