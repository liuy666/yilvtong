
<template>
<div>
  <Row>
      <Card :style="{minWidth:'1450px'}">
          <p slot="title" class="slot_title_height">
              <span class="title_span">收款设置</span>
              <top-btn
                :btnList="btnList"
                :currentRowData="currentRowData"
                @changeIndex="changeIndex"
              ></top-btn>
          </p>
          <div class="w_query">
          <Row>
            <Col span="6" :style="{marginBottom:'20px'}">
                <span >支付渠道:</span>
                <Select v-model="selectChannelPay" style="width:150px">
                    <Option v-for="item in channelPay" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
             <Col span="6" :style="{marginBottom:'20px'}">
                <span >应用场景:</span>
                <Select v-model="selectAppScene" style="width:150px">
                    <Option v-for="item in AppScene" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
             <Col span="6" :style="{marginBottom:'20px'}">
                <span >状态:</span>
                <Select v-model="selectState" style="width:150px">
                    <Option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                    type: 12,
                    btnlabel: '新增'
                },
                {
                    type: 13,
                    btnlabel: '修改'
                },
                {
                    type: 14,
                    btnlabel: '查看'
                }
            ],
            currentRowData: {},
            path: {
                marketplaceId: '',
                merchantId: '',
                id: '',
                channelCode: ''
            },
            objPage: {
                totalPage: 0,
                page: 0,
                size: 10
            }, // 存放页数
            selectChannelPay: '全部', // 支付通道
            channelPay: [
                {
                    value: '全部',
                    label: ' 全部'
                },
                {
                    value: 'ALIPAY',
                    label: ' 支付宝'
                },
                {
                    value: 'WXPAY',
                    label: ' 微信支付 '
                },
                {
                    value: 'WXMPPAY',
                    label: ' 微信公众号支付'
                },
                {
                    value: 'CPCN',
                    label: ' 中金支付'
                },
                {
                    value: 'UNIONPAY',
                    label: '银联'
                }
            ],
            selectAppScene: '不限', // 应用场景
            AppScene: [
                {
                    value: '不限', // ALL
                    label: '不限'
                },
                {
                    value: 'B2B',
                    label: '企业网银'
                },
                {
                    value: 'B2C',
                    label: '个人网银'
                },
                {
                    value: 'QPAY',
                    label: '快捷支付'
                }
            ],
            selectState: '全部', // 状态
            state: [
                {
                    value: '全部',
                    label: ' 全部'
                },
                {
                    value: '不限',
                    label: '不限'
                },
                {
                    value: 'OPENED',
                    label: ' 已开通'
                },
                {
                    value: 'NONACTIVEED',
                    label: ' 未开通 '
                }
            ],
            columnsTit: [
                {
                    title: '支付渠道',
                    key: 'payChannel',
                    align: 'center'
                },
                {
                    title: '应用场景',
                    key: 'AppScene',
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'state',
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
                                        let id = this.columnsData[params.index].id;
                                        let state = '';
                                        if (this.columnsData[params.index].state === '已开通') {
                                            state = 'NONACTIVEED';
                                        } else {
                                            state = 'OPENED';
                                        }
                                        this.isOpenSate(id, state);
                                    }
                                }
                            }, this.columnsData[params.index].state === '已开通' ? '停用' : '启用')
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
            // this.path.marketplaceId = 36;
            // this.path.merchantId = 208;
        }

        this.getList();
    },
    methods: {
        changeIndex (type) {
            if (type === 12) {
                this.$router.push({
                    name: 'dueSettingAdd',
                    query: this.path
                });
            }
            if (type === 13) {
                this.$router.push({
                    name: 'dueSettingModify',
                    query: this.path
                });
            }
            if (type === 14) {
                this.$router.push({
                    name: 'dueSettingDetail',
                    query: this.path
                });
            }
        },
        getChooseData (row) {
            if (!row.id) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '当前ID无法查询详情'
                });
            } else {
                this.currentRowData['id'] = row.id;
                this.path.id = row.id;
                this.path.channelCode = row.channelCode;
            }
        },
        changePage (pageCode) {
            this.objPage.page = pageCode - 1;
            this.getList();
        },
        changePageSize (pageSize) {
            this.objPage.size = pageSize;
            this.getList();
        },
        // 启用、停用
        isOpenSate (id, state) {
            try {
                this.$http.post(`${this.fm}/finance/tunnel/merchantChannel/${id}/${state}?access_token=${this.token}&marketplaceId=${this.path.marketplaceId}&merchantId=${this.path.merchantId}`)
                    .then(res => {
                        var data = res.data;
                        if (data.return_code === 200) {
                            this.$Modal.warning({
                                title: '温馨提示',
                                content: '操作成功'
                            });
                            this.getList();
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
        // 获取列表数据
        getList () {
            try {
                this.columnsData = [];
                this.loading = true;
                let selectState;
                switch (this.selectState) {
                    case '全部':
                        selectState = '';
                        break;
                    case '不限':
                        selectState = '';
                        break;
                    default:
                        selectState = this.selectState;
                }
                this.$http.get(`${this.baseUrl}/finance/tunnel/payChannel`, {
                    params: {
                        access_token: this.token,
                        marketplaceId: this.path.marketplaceId,
                        merchantId: this.path.merchantId,
                        pageNumber: this.objPage.page,
                        pageSize: this.objPage.size,
                        channel: this.selectChannelPay === '全部' ? '' : this.selectChannelPay,
                        type: this.selectAppScene === '不限' ? 'ALL' : this.selectAppScene,
                        status: selectState
                    }
                }).then(res => {
                    this.loading = false;
                    let data = res.data;
                    if (data.return_code === 200) {
                        this.objPage.totalPage = data.content?data.content.totalNumberOfResults:0;
                        let items = data.content;
                        items.page ? items.page.map((item, index) => {
                            this.columnsData.push({
                                payChannel: item.paymentChannel.channelName,
                                channelCode: item.paymentChannel.channelCode,
                                AppScene: tradState.AppScene(item.application),
                                state: tradState.state(item.openStatus),
                                id: item.id || ''
                            });
                        }) : this.columnsData = [];
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
        // 重置
        reset () {
            this.selectChannelPay = '';
            this.selectAppScene = '';
            this.selectState = '全部';
            this.getList();
        }
    }
};
</script>

 <style lang="less" scoped>
.w_query {
  padding: 30px 20px;
}
</style>


