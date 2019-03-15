
<template>
<div style="cursor:default;padding:20px">
    <header-a title="支出详情"></header-a>
    <div class="detailBody">
        <div class="detailTit">
            交易单
        </div>
        <div class="body">
        <Row :style="{borderBottom:'1px dashed #dcdee2'}">
            <Col span="24" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
            <span>交易金额：</span>
            <span :style="{color:'#CE3C39'}">80元</span>
            </Col>
        </Row>
       <Row :style="{borderBottom:'1px dashed #dcdee2'}">
            <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                <span>业务单号：</span>
                <span >193</span>
            </Col>
            <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>对应结算单号：</span>
                <span >193</span>
            </Col>
            <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                <span>订单状态：</span>
                <span >退款成功</span>
            </Col>
            <Col span="12" :style="{marginBottom:'20px'}">
                <span>业务类型：</span>
                <span >193</span>
            </Col>
        </Row>
        <Row :style="{borderBottom:'1px dashed #dcdee2'}">
            <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                <span>买方：</span>
                <span >193</span>
            </Col>
            <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>卖方：</span>
                <span >193</span>
            </Col>
            <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                <span>买方名称：</span>
                <span >退款成功</span>
            </Col>
            <Col span="12" :style="{marginBottom:'20px'}">
                <span>买方名称：</span>
                <span >193</span>
            </Col>
        </Row>
        <Row :style="{borderBottom:'1px dashed #dcdee2'}">
            <Col span="12" :style="{marginBottom:'20px',marginTop:'20px',textIndent:'100px'}">
                <span>创建时间：</span>
                <span >193</span>
            </Col>
            <Col span="12" :style="{marginBottom:'20px',marginTop:'20px'}">
                <span>支付时间：</span>
                <span >193</span>
            </Col>
            <Col span="12" :style="{textIndent:'100px',marginBottom:'20px'}">
                <span>付款有效期：</span>
                <span >退款成功</span>
            </Col>
            <Col span="12" :style="{marginBottom:'20px'}">
                <span>交易完成时间：</span>
                <span >193</span>
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
</div>
    
</template>

<script>
import headerA from '@/components/tables/tableHeader';// 头部
export default {
    components: {

    },
    data () {
        var _this = this;
        return {
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
            shoppingData: [
                {
                    info: '1',
                    price: '张三',
                    Account: 'Lake Park',
                    money: '服务商',
                    settleStatus: '审核状态'
                }
            ],
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
                }
            ],
            payData: [
                {
                    payTIme: '1',
                    payPrice: '张三'
                }
            ],
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
            refundData: [
                {
                    refundTime: '1',
                    refundNo: '张三',
                    refundPrice: 'Lake Park',
                    refundState: '服务商'
                }
            ]
        };
    },
    mounted () {

    },
    methods: {

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


