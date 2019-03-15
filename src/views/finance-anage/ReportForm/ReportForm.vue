
<template>
<div :style="{minWidth:'1300px'}">
   <Row>
      <Card>
         <p slot="title" class="slot_title_height">
              <span class="title_span">应付款账单</span>
              <top-title-opbtn :btnList="btnList"></top-title-opbtn>
          </p>
        <div class="w_query">
          <Row>
            <Col span="6" v-if="isShowTime">
              <span>报表创建时间：</span>
              <Date-picker type="month" placeholder="选择月" v-model="MonthFrom" style="width: 200px" @on-change="changeTime"></Date-picker>
            </Col>
            <Col span="6">
              <span>服务产品：</span>
              <Select v-model="selectState" style="width:200px">
                  <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
             <Col span="6">
              <span>出账状态：</span>
              <Select v-model="outState" style="width:200px" @on-change="changeOutState">
                  <Option v-for="item in outList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6" :style="{marginBottom:'20px'}">
                <Button type="primary" shape="circle" style="margin-right:10px;width:80px" @click="query">查询</Button>
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
import tradState from '@/libs/tradState.js';
import getId from '@/libs/getSettleMerchantId.js';
export default {
    data () {
        return {
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                }
            ],
            path: {
                marketplaceId: '',
                merchantId: '',
                token: this.Cookies.get('token')
            },
            MonthFrom: '',
            time: '',
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            }, // 存放页数
            isShowTime: true,
            selectState: '全部产品',
            outState: '已出账',
            typeList: [
                {
                    value: '通道服务',
                    label: '通道服务'
                },
                {
                    value: '授信服务',
                    label: '授信服务'
                },
                {
                    value: '预付款服务',
                    label: '预付款服务'
                },
                {
                    value: '全部产品',
                    label: '全部产品'
                }
            ],
            outList: [
                {
                    value: '已出账',
                    label: '已出账'
                },
                {
                    value: '未出账',
                    label: '未出账'
                }
            ],
            loading: false,
            columnsTit: [
                {
                    title: '服务提供方',
                    key: 'preuser',
                    align: 'center'
                },
                {
                    title: '结算对象',
                    key: 'user',
                    align: 'center'
                },
                {
                    title: '服务产品',
                    key: 'selectState',
                    align: 'center'
                },
                {
                    title: '商户结算周期',
                    key: 'cycle',
                    align: 'center'
                },
                {
                    title: '交易发生期间',
                    key: 'tradTime',
                    align: 'center'
                },
                {
                    title: '期间交易金额(元)',
                    key: 'tradMoney',
                    align: 'center'
                },
                {
                    title: '服务费金额(元)',
                    key: 'serviceMomey',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 180,
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
                                        var time = this.columnsData[params.index].tradTime;
                                        this.download(time);
                                    }
                                }
                            }, '下载明细')
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
        changeTime (time) {
            this.time = time;
        },
        select_state (type) {
            switch (type) {
                case '通道服务':
                    return 'TUNNEL_PAY';
                    break;
                case '授信服务':
                    return 'CREDIT_PAY';
                    break;
                case '预付款服务':
                    return 'ADVANCE_PAY';
                    break;
                case '全部产品':
                    return 'SUMMARY';
                    break;
            }
        },
        // 下载明细
        download (time) {
            let url = `${this.fm}/finance/tunnel/merchantServiceFrees/realTimeBillItemExport`;
            let params = {
                access_token: this.path.token,
                marketplaceId: this.path.marketplaceId,
                merchantId: this.path.merchantId,
                serviceType: this.select_state(this.selectState) === 'SUMMARY' ? 'ALL' : this.select_state(this.selectState),
                termTxnTime: time
            };
            this.$common.downloadGZIP(params, url);
        },
        // 控制时间显示隐藏
        changeOutState (val) {
            if (val === '未出账') {
                this.isShowTime = false;
                this.MonthFrom = '';
                this.time = '';
            } else {
                this.isShowTime = true;
            }
        },
        getList () {
            this.columnsData = [];
            let params = {
                access_token: this.path.token,
                marketplaceId: this.path.marketplaceId,
                merchantId: this.path.merchantId,
                serviceType: this.select_state(this.selectState),
                // merchant: '', // 商户名
                pageNumber: this.objPage.page,
                pageSize: this.objPage.size
            };
            try {
                let url;
                if (this.outState === '未出账') {
                    url = `${this.fm}/finance/tunnel/merchantServiceFrees/realTimeBill`;
                } else {
                    url = `${this.fm}/finance/tunnel/merchantServiceFrees?creationMonth=${this.time}`;
                }
                this.$http.get(url, { params: params }).then(res => {
                    let data = res.data;
                    if (data.return_code === 200) {
                        var dataList = data.content.page;
                        this.objPage.totalPage = data.content.totalNumberOfResults;
                        dataList.map((item, index) => {
                            this.columnsData.push({
                                preuser: '环球雅图',
                                user: item.merchant.legalName,
                                cycle: tradState.time(item.settlementType),
                                tradTime: item.termTxnTime,
                                tradMoney: item.termTxnAmt ? item.termTxnAmt.toFixed(2) : '0.00',
                                selectState: this.outState === '未出账' ? this.selectState : tradState.serviceType(item.serviceType), // 服务产品
                                serviceMomey: item.totalFeeAmt ? item.totalFeeAmt.toFixed(2) : '0.00'
                            });
                        });
                    } else {
                        this.$Modal.warning({ title: '温馨提示', content: data.msg || '请求失败' });
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
        reset () {
            this.isShowTime = true;
            this.outState = '已出账';
            this.selectState = '全部产品';
            this.MonthFrom = '';
            this.time = ''; // 支付时间--结束
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


