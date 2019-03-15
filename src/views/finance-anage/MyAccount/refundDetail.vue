
<template>
<div >
  <Row>
      <Card>
        <p slot="title" class="slot_title_height">
            <span class="title_span">退款详情</span>
            <top-title-opbtn :btnList="btnList"></top-title-opbtn>
        </p>
        <div class="detailBody">
            <div class="detailTit">
                退款单
            </div>
            <div class="body">
            <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                <span>退款金额：</span>
                <span :style="{color:'#CE3C39'}">{{info.money}}元</span>
                </Col>
            </Row>
          <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>单号：</span>
                    <span >{{info.orderId}}</span>
                </Col>
                <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>对应结算单号：</span>
                    <span >{{info.systemNo}}</span>
                </Col>
                <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                    <span>退款状态：</span>
                    <span >{{info.state}}</span>
                </Col>
                <Col span="12" :style="{marginBottom:'20px'}">
                    <span>退款节点</span>
                    <span >{{info.node}}</span>
                </Col>
            </Row>
            <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                    <span>退款原因：</span>
                    <span >{{info.successCause}}</span>
                </Col>
                <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>失败原因：</span>
                    <span >{{info.failCause}}</span>
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
                    <span>申请时间：</span>
                    <span >{{info.applyTime}}</span>
                </Col>
                <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                    <span>退款完成时间：</span>
                    <span >{{info.refundTime}}</span>
            </Col>
            </Row>
            </div>
        </div>

        <div class="table">
            <div class="detailTit" style="margin-top:20px">
                退款单信息
            </div>
            <Table border :columns="columnsTit" :data="columnsData"></Table>
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
            info: {
                money: '',
                orderId: '',
                systemNo: '',
                state: '',
                node: '',
                successCause: '',
                failCause: '',
                buyUer: '',
                sellUser: '',
                buyName: '',
                sellName: '',
                applyTime: '',
                refundTime: ''
            },
            columnsTit: [
                {
                    title: '返回机构',
                    key: 'organ',
                    align: 'center'
                },
                {
                    title: '返回机构开户名',
                    key: 'organName',
                    align: 'center'
                },
                {
                    title: '返回账号',
                    key: 'Account',
                    align: 'center'
                },
                {
                    title: '退款金额(元)',
                    key: 'money',
                    align: 'center'
                },
                {
                    title: '退款状态',
                    key: 'settleStatus',
                    align: 'center'
                }

            ],
            columnsData: []
        };
    },
    mounted () {
        this.OrderInfo();
        this.refundInfo();
    },
    methods: {
        OrderInfo () {
            this.$http.get(`${this.fm}/finance/account/myRefundDetails/${this.$route.query.id}`, {
                params: {
                    access_token: this.token,
                    marketplaceId: this.$route.query.marketplaceId,
                    merchantId: this.$route.query.merchantId
                }
            }).then(res => {
                var data = res.data;
                if (data.return_code === 200) {
                    let item = data.content.page[0];
                    this.info = {
                        money: item.amount.toFixed(2) || '0.00',
                        orderId: item.outTradeNo || '',
                        systemNo: item.id || '',
                        state: tradState.refund(item.status),
                        node: tradState.refund(item.status),
                        successCause: item.refundBill.reason || '',
                        failCause: '',
                        buyUer: item.buyer || '',
                        sellUser: item.seller || '',
                        buyName: item.buyerName || '',
                        sellName: item.sellerName || '',
                        applyTime: item.amount || '',
                        refundTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : ''
                    };
                } else {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请求失败'
                    });
                }
            });
        },
        // 退款信息
        refundInfo () {
            this.columnsData = [];
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
                            this.columnsData.push({
                                organ: item.bankName || '',
                                organName: item.bankAccountName || '',
                                Account: item.bankAccountNo || '',
                                money: item.amount ? item.amount.toFixed(2) : '0.00',
                                settleStatus: tradState.refund(item.status)
                            });
                        }) : this.columnsData = [];
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


