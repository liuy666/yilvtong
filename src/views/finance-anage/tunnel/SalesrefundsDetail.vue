
<template>
<div >
  <Row>
      <Card>
           <p slot="title" class="slot_title_height">
              <span class="title_span">销售退款详情 </span>
              <top-title-opbtn :btnList="btnList"></top-title-opbtn>
          </p>
          <div class="detailBody">
          <div class="detailTit">退款单（销售）</div>
            <div class="body">
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                  <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                      <span>单号：</span>
                      <span >{{info.No}}</span>
                  </Col>
                  <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                      <span>申请时间：</span>
                      <span >{{info.tradTime}}</span>
                  </Col>
                  <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                      <span>创建时间：</span>
                      <span >{{info.buildTime}}</span>
                  </Col>
              </Row>
              <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                        <span>对应结算退款单号：</span>
                        <span >{{info.systemNo}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>退款节点：</span>
                        <span >{{info.node}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>原买方：</span>
                        <span >{{info.buyer}}</span>
                    </Col>
                </Row>
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                        <span>退款金额：</span>
                        <span >{{info.refundMoney}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>关联交易号：</span>
                        <span >{{info.tradNo}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>退款原因：</span>
                        <span >{{info.refundCause}}</span>
                    </Col>
                </Row>
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                        <span>退款完成时间：</span>
                        <span >{{info.fishTime}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>退款状态：</span>
                        <span >{{info.refundState}}</span>
                    </Col>
                    <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                        <span>失败原因：</span>
                        <span >{{info.failCause}}</span>
                    </Col>
                </Row>
                <Row :style="{borderBottom:'1px dashed #dcdee2'}">
                  <!-- <Col span="8" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                      <span>摘要：</span>
                      <span >{{info.remark}}</span>
                  </Col>
                  <Col span="8" :style="{marginBottom:'20px',marginTop:'20px'}">
                      <span>通道来源：</span>
                      <span >{{info.orign}}</span>
                  </Col>   -->
              </Row>
            </div>
          </div>
          <div class="table">
        <div class="detailTit" style="margin-top:20px">退款信息</div>
           <radio-table
            :colname="refund"
            :total='objPage.totalPage'
            :tableData="refundData"
            :isRadio="false"
            :pageNum="objPage.size"
            :pageCode="objPage.page+1"
            :loading="loading"
            @changePage="changePage"
            @changePageSize="changePageSize"
        ></radio-table>
        <!-- <Table border :columns="refund" :data="refundData"></Table> -->
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
            loading: false,
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            },
            info: {
                No: '',
                tradTime: '',
                buildTime: '',
                systemNo: '',
                node: '',
                buyer: '',
                refundMoney: '',
                tradNo: '',
                refundCause: '',
                fishTime: '',
                refundState: '',
                failCause: '',
                remark: '',
                orign: ''
            },
            refund: [
                {
                    title: '退回机构',
                    key: 'refundOrgan',
                    align: 'center'
                },
                // {
                //     title: '机构流水号',
                //     key: 'organNo',
                //     align: 'center'
                // },
                {
                    title: '退回机构开户名',
                    key: 'refundOrganName',
                    align: 'center'
                },
                {
                    title: '退回账号',
                    key: 'refundNo',
                    align: 'center'
                },
                {
                    title: '退款金额(元)',
                    key: 'refundMoney',
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
    },
    methods: {
        changePage (pageCode) {
            this.objPage.page = pageCode - 1;
            this.getInfo();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.getInfo();
        },
        getInfo () {
            this.$http.get(`${this.fm}/finance/tunnel/refundBills/${this.$route.query.id}`, {
                params: {
                    access_token: this.token,
                    marketplaceId: this.$route.query.marketplaceId,
                    merchantId: this.$route.query.merchantId
                }
            }).then(res => {
                let data = res.data;
                if (data.return_code === 200) {
                    let item = data.content;
                    console.log(item);
                    item ? this.info = {
                        No: item.outRefundNo || '',
                        tradTime: item.invoice.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.invoice.creationDate) : '',
                        buildTime: item.creationDate ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.creationDate) : '',
                        systemNo: item.id || '',
                        node: tradState.refundNode(item.refundNodeType),
                        buyer: item.invoice.buyer || '',
                        refundMoney: item.amount ? item.amount.toFixed(2) : '0.00',
                        tradNo: item.invoice.id || '',
                        refundCause: item.reason || '',
                        fishTime: item.completeTime ? publicMethod.fmt('yyyy-MM-dd hh:mm:ss', item.completeTime) : '',
                        refundState: tradState.refund(item.status),
                        failCause: item.auditReason || '',
                        remark: item.outRefundNo || '',
                        orign: item.outRefundNo || ''
                    } : this.info = {
                        No: '',
                        tradTime: '',
                        buildTime: '',
                        systemNo: '',
                        node: '',
                        buyer: '',
                        refundMoney: '',
                        tradNo: '',
                        refundCause: '',
                        fishTime: '',
                        refundState: '',
                        failCause: '',
                        remark: '',
                        orign: ''

                    };
                    this.objPage.totalPage = item.refunds.length;
                    item.refunds.map((subItem, index) => {
                        this.refundData.push({
                            refundOrgan: subItem.bankName || '',
                            // organNo: subItem.paymentTradeNo || '',
                            refundOrganName: subItem.bankAccountName || '',
                            refundNo: subItem.bankAccountNo,
                            refundMoney: subItem.amount ? subItem.amount.toFixed(2) : '0.00',
                            refundState: tradState.refund(subItem.status)
                        });
                    });
                }
            });
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
.table {
  padding: 0px 20px 30px;
  .ivu-table-cell {
    padding: 0;
  }
}
</style>


