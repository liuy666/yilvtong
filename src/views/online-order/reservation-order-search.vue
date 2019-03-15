<template>
    <div>
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>订单查询</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <Tabs v-model="params.errorsid">
                <TabPane label="订单查询" name="0">
                    <detail-form1
                        :isListPage="true"
                        :formDatas="params.formDatasByOrder"
                        :formItemList="formItemListByOrder"
                        :btnLabelWidth="60"
                        @getFormData="handleQuery"
                        @setDay="setDay"
                        @setWeek="setWeek"
                        @setMonth="setMonth"
                        @clearFormData="resetForm1"></detail-form1>
                </TabPane>
                <TabPane label="按订单或联系人查询" name="1">
                    <detail-form1
                        :isListPage="true"
                        :formDatas="params.formDatasByContact"
                        :formItemList="formItemListByContact"
                        @getFormData="handleQuery"
                        @clearFormData="resetForm2"></detail-form1>
                </TabPane>
            </Tabs>
            <radioTable
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage"
                @changePage="handleChangePage"
                @selected="handleSelect"
                @changePageSize="changeSize"></radioTable>
        </Card>
        <Card v-show="currentIndex === 2" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span></span>
                <topBtn :btnList="btnList2" @operate="handleOperate3"></topBtn>
            </p>
            <div class="table_wrap">
                <div class="table_title">订单详情</div>
                <div class="table_left">编制单位：{{ orderDetail.bzdw }}</div>
                <table>
                    <tr>
                        <td class="bold">订单号：</td>
                        <td colspan="2">{{ orderDetail.order }}</td>
                        <td class="bold">支付方式：</td>
                        <td>网上支付</td>
                        <td colspan="4"></td>
                    </tr>
                    <tr class="row_title">
                        <td colspan="9">基本信息</td>
                    </tr>
                    <tr>
                        <td class="bold">下单日期：</td>
                        <td>{{ orderDate }}</td>
                        <td class="bold">姓名：</td>
                        <td>{{ orderDetail.basicMsg.USID }}</td>
                        <td class="bold">订单状态：</td>
                        <td>{{ orderStatus }}</td>
                        <td class="bold">分销商：</td>
                        <td colspan="2">{{ orderDetail.basicMsg.CORPNAME }}</td>
                    </tr>
                    <tr>
                        <td class="bold">订单总金额：</td>
                        <td>{{ allMont }}</td>
                        <td class="bold">手续费：</td>
                        <td>{{ orderDetail.basicMsg.TPSX }}</td>
                        <td class="bold">是否积分订单：</td>
                        <td>{{ orderDetail.basicMsg.STRJL }}</td>
                        <td class="bold">支付时间：</td>
                        <td colspan="2">{{ payTime }}</td>
                    </tr>
                    <tr>
                        <td class="bold">客人备注：</td>
                        <td colspan="8">{{ orderDetail.basicMsg.NOTE }}</td>
                    </tr>
                    <tr class="row_title">
                        <td colspan="9">最新预订信息</td>
                    </tr>
                    <tr>
                        <td class="bold">服务商名称</td>
                        <td class="bold">联系人姓名</td>
                        <td class="bold">证件号码</td>
                        <td class="bold">联系电话</td>
                        <td class="bold">金额</td>
                        <td class="bold">状态</td>
                        <td class="bold">出票员</td>
                        <td class="bold">出票时间</td>
                        <td class="bold">密码</td>
                    </tr>
                    <tr>
                        <td>{{ orderDetail.reserveMsg.strpdno }}</td>
                        <td>{{ orderDetail.reserveMsg.ORNM }}</td>
                        <td>{{ orderDetail.reserveMsg.ORHM }}</td>
                        <td>{{ orderDetail.reserveMsg.ORPH }}</td>
                        <td>{{ orderDetail.reserveMsg.ZFMONT }}</td>
                        <td>{{ orderDetail.reserveMsg.strddzt }}</td>
                        <td>{{ orderDetail.reserveMsg.szemployeename }}</td>
                        <td>{{ orderDetail.reserveMsg.NOTEC }}</td>
                        <td>{{ orderDetail.reserveMsg.NOTEA }}</td>
                    </tr>
                    <tr class="row_title">
                        <td colspan="9">最新预订明细</td>
                    </tr>
                    <tr>
                        <td class="bold">服务商名称</td>
                        <td class="bold">产品名称</td>
                        <td class="bold">类别</td>
                        <td class="bold">单价</td>
                        <td class="bold">数量</td>
                        <td class="bold">优惠数量</td>
                        <td class="bold">金额</td>
                        <td class="bold">优惠金额</td>
                        <td class="bold">消费日期</td>
                    </tr>
                    <tr>
                        <td>{{ orderDetail.scenMsg.szscenicname }}</td>
                        <td>{{ orderDetail.scenMsg.sztickettypename }}</td>
                        <td>{{ orderDetail.scenMsg.szcrowdkindname }}</td>
                        <td>{{ orderDetail.scenMsg.PRIC }}</td>
                        <td>{{ orderDetail.scenMsg.NUMB }}</td>
                        <td>{{ orderDetail.scenMsg.YHNUMB }}</td>
                        <td>{{ orderDetail.scenMsg.AMNT }}</td>
                        <td>{{ orderDetail.scenMsg.YHAMNT }}</td>
                        <td>{{ orderDetail.scenMsg.DTSTARTDATE }}</td>
                    </tr>
                    <tr>
                        <td class="bold">消费截止日期</td>
                        <td class="bold">佣金</td>
                        <td class="bold">买家</td>
                        <td class="bold">卖家</td>
                        <td class="bold">结算金额</td>
                        <td colspan="4"></td>
                    </tr>
                    <tr>
                        <td>{{ orderDetail.scenMsg.DTENDDATE }}</td>
                        <td>{{ orderDetail.scenMsg.COMMISION }}</td>
                        <td>{{ orderDetail.scenMsg.CNAME }}</td>
                        <td>{{ orderDetail.scenMsg.szscenicname }}</td>
                        <td>{{ orderDetail.scenMsg.ZFMONT }}</td>
                        <td colspan="4"></td>
                    </tr>
                    <tr class="row_title">
                        <td colspan="9">出票前订单操作信息</td>
                    </tr>
                    <tr>
                        <td class="bold">订单号</td>
                        <td class="bold">服务商名称</td>
                        <td class="bold">订单方式</td>
                        <td class="bold">金额</td>
                        <td class="bold">手续费</td>
                        <td class="bold">实际金额</td>
                        <td class="bold">状态</td>
                        <td class="bold">操作时间</td>
                        <td class="bold">出票员</td>
                    </tr>
                    <template v-if="orderDetail.unregList.length">
                        <tr v-for="(item,idx) of orderDetail.unregList" :key="'1-' + idx">
                            <td>{{ item.ORID }}</td>
                            <td>{{ item.strpdno }}</td>
                            <td>{{ item.strortp }}</td>
                            <td>{{ item.ZFMONT }}</td>
                            <td>{{ item.TPSX }}</td>
                            <td>{{ item.ORTP }}</td>
                            <td>{{ item.strddzt }}</td>
                            <td>{{ item.TPDATE }}</td>
                            <td>{{ item.szemployeename }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                    <tr class="row_title">
                        <td colspan="9">出票前订单操作明细</td>
                    </tr>
                    <tr>
                        <td class="bold">订单号</td>
                        <td class="bold">服务商名称</td>
                        <td class="bold">订单方式</td>
                        <td class="bold">产品名称</td>
                        <td class="bold">单价</td>
                        <td class="bold">数量</td>
                        <td class="bold">优惠数量</td>
                        <td class="bold">金额</td>
                        <td class="bold">消费日期</td>
                    </tr>
                    <template v-if="orderDetail.tdProductsList.length">
                        <tr v-for="(item,idx) of orderDetail.tdProductsList" :key="'2-' + idx">
                            <td>{{ item.ORID }}</td>
                            <td>{{ item.strpdno }}</td>
                            <td>{{ item.strortp }}</td>
                            <td>{{ item.sztickettypename }}</td>
                            <td>{{ item.PRIC }}</td>
                            <td>{{ item.NUMB }}</td>
                            <td>{{ item.YHNUMB }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.DTSTARTDATE }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                    <tr class="row_title">
                        <td colspan="9">出票后退订信息</td>
                    </tr>
                    <tr>
                        <td class="bold">订单号</td>
                        <td class="bold">服务商名称</td>
                        <td class="bold">订单方式</td>
                        <td class="bold">金额</td>
                        <td class="bold">手续费</td>
                        <td class="bold">实际金额</td>
                        <td class="bold">状态</td>
                        <td class="bold">操作时间</td>
                        <td class="bold">出票员</td>
                    </tr>
                    <template v-if="orderDetail.unregList2.length">
                        <tr v-for="(item,idx) of orderDetail.unregList2" :key="'3-' + idx">
                            <td>{{ item.ORID }}</td>
                            <td>{{ item.strpdno }}</td>
                            <td>{{ item.strortp }}</td>
                            <td>{{ item.ZFMONT }}</td>
                            <td>{{ item.TPSX }}</td>
                            <td>{{ item.realAmount }}</td>
                            <td>{{ item.strddzt }}</td>
                            <td>{{ item.TPDATE }}</td>
                            <td>{{ item.szemployeename }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                    <tr class="row_title">
                        <td colspan="9">出票后退订明细</td>
                    </tr>
                    <tr>
                        <td class="bold">订单号</td>
                        <td class="bold">服务商名称</td>
                        <td class="bold">订单方式</td>
                        <td class="bold">产品名称</td>
                        <td class="bold">单价</td>
                        <td class="bold">数量</td>
                        <td class="bold">优惠数量</td>
                        <td class="bold">金额</td>
                        <td class="bold">消费日期</td>
                    </tr>
                    <template v-if="orderDetail.tdProductsList2.length">
                        <tr v-for="(item,idx) of orderDetail.tdProductsList2" :key="'4-' + idx">
                            <td>{{ item.ORID }}</td>
                            <td>{{ item.strpdno }}</td>
                            <td>{{ item.strortp }}</td>
                            <td>{{ item.sztickettypename }}</td>
                            <td>{{ item.PRIC }}</td>
                            <td>{{ item.NUMB }}</td>
                            <td>{{ item.YHNUMB }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.DTSTARTDATE }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                    <tr class="row_title">
                        <td colspan="9">售检票明细</td>
                    </tr>
                    <tr>
                        <td class="bold">服务商名称</td>
                        <td class="bold">票号</td>
                        <td class="bold">产品名称</td>
                        <td class="bold">子产品</td>
                        <td class="bold">园门</td>
                        <td class="bold">票状态</td>
                        <td class="bold">通过次数</td>
                        <td class="bold">检票开始时间</td>
                        <td class="bold">趟次</td>
                    </tr>
                    <template v-if="orderDetail.saleList.length">
                        <tr v-for="(item,idx) of orderDetail.saleList" :key="'5-' + idx">
                            <td>{{ item.STRPDNO }}</td>
                            <td>{{ item.SZTICKETPRINTNO }}</td>
                            <td>{{ item.SZTICKETTYPENAME }}</td>
                            <td>{{ item.ZSZTICKETTYPENAME }}</td>
                            <td>{{ item.SZGARDENGATENAME }}</td>
                            <td>{{ item.isvalid }}</td>
                            <td>{{ item.IPASSEDTIMES }}</td>
                            <td>{{ item.DTBEGINDATE }}</td>
                            <td>{{ item.TRIPNAME }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                </table>
                <div class="table_footer">
                    <span class="sp1">时间：{{ orderDetail.nowDate }}</span>
                    <span class="sp2">审核：</span>
                    <span class="sp3">制单：{{ orderDetail.user }}</span>
                </div>
                <div style="text-align:center;margin-bottom: 30px;"><Button type="primary" shape="circle" class="addpadding" @click="closePage">关闭</Button></div>
            </div>
        </Card>
        <Card v-show="currentIndex === 3" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>实名制信息</span>
                <topBtn :btnList="btnList2" @operate="handleOperate3"></topBtn>
            </p>
            <radioTable
                :colname="colnames3"
                :total="total3"
                :tableData="tableData3"
                :pageCode="currentPage"></radioTable>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'reservation-order-search',
    data () {
        return {
            currentIndex: 1,
            isShowLoading: false,
            isLoading: false,
            isRadio: true,
            rowData: null,
            total: 0,
            // watchTotal: 0,
            currentPage: 1,
            size: 10,
            tableData: [],
            btnList: [
                {
                    type: 1,
                    btnlabel: '刷新'
                },
                {
                    type: 11,
                    btnlabel: '订单解锁',
                    icon: 'ios-locked-outline'
                }
            ],
            btnList2: [
                {
                    type: 1,
                    btnlabel: '刷新'
                },
                {
                    type: 11,
                    btnlabel: '返回',
                    icon: 'reply'
                }
            ],
            params: {
                errorsid: '0',
                formDatasByOrder: {
                    iscenicid: '',
                    otausid: '',
                    ddzt: '',
                    usid: '',
                    strornm: '',
                    radiobutton1: 0,
                    radiobutton2: 0,
                    startDate: '',
                    endDate: ''
                },
                formDatasByContact: {
                    radiobutton3: 0,
                    orid: '',
                    ornm: '',
                    orhm: '',
                    payorid: ''
                }
            },
            saveInfo: null,
            formItemListByOrder: [
                {
                    type: 4,
                    label: '服务商',
                    keyName: 'iscenicid',
                    class: 'float-left',
                    labelWidth: 70,
                    optionList: []
                },
                {
                    type: 14,
                    label: '',
                    labelWidth: 60,
                    class: 'float-left',
                    keyName: 'radiobutton1',
                    config: [
                        {
                            label: '全部用户',
                            value: 0
                        },
                        {
                            label: '散客',
                            value: 4
                        },
                        {
                            label: '指定买家编号',
                            value: 3,
                            isAddInput: true,
                            inputKeyName: 'usid'
                        },
                        // {
                        //     label: '指定下单用户',
                        //     value: 3,
                        //     isAddInput: true,
                        //     inputKeyName: 'usid',
                        // },
                        {
                            label: '分销商用户',
                            value: 5,
                            isAddSelect: true,
                            selectKeyName: 'otausid',
                            selectOptionList: []
                        }
                    ]
                },
                {
                    type: 1,
                    label: '公司名称（联系人）模糊查找',
                    keyName: 'strornm',
                    class: 'float-left',
                    labelWidth: 190
                },
                {
                    type: 2,
                    label: '',
                    keyName: 'radiobutton2',
                    class: 'float-left',
                    labelWidth: 10,
                    optionList: [
                        // {
                        //     value: 0,
                        //     labelName: '按首日游览日期'
                        // },
                        {
                            value: 1,
                            labelName: '按下单日期查询'
                        }
                        // {
                        //     value: 2,
                        //     labelName: '按订单支付日期查询'
                        // },
                        // {
                        //     value: 4,
                        //     labelName: '按订单出票日期'
                        // }
                    ]
                },
                {
                    type: 11,
                    labelWidth: 10,
                    label: '',
                    keyName: 'startDate',
                    keyName1: 'endDate',
                    class: 'float-left',
                    double: true,
                    dateType: 'date',
                    isShowOptions: true
                },
                {
                    type: 4,
                    label: '订单状态',
                    keyName: 'ddzt',
                    class: 'float-left',
                    labelWidth: 163,
                    optionList: []
                }
            ],
            formItemListByContact: [
                {
                    type: 13,
                    labelWidth: 10,
                    label: '',
                    keyName: 'radiobutton3',
                    class: 'float-left',
                    optionList: [
                        {
                            type: 1,
                            value: 0,
                            keyName: 'orid',
                            labelName: '指定订单号'
                        },
                        {
                            type: 1,
                            value: 1,
                            keyName: 'ornm',
                            labelName: '按联系人姓名'
                        },
                        {
                            type: 1,
                            value: 2,
                            keyName: 'orhm',
                            labelName: '按联系人证件号码'
                        }
                        // {
                        //     type: 1,
                        //     value: 5,
                        //     keyName: 'payorid',
                        //     labelName: '支付订单号'
                        // }
                    ]
                }
            ],
            colnames: [
                {
                    title: '订单号',
                    width: 170,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.gotoOrderDetail(params.row.orid);
                                }
                            }
                        }, params.row.orid);
                    }
                },
                {
                    title: '实名制信息',
                    width: 100,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.gotoRealName(params.row.orid);
                                }
                            }
                        }, '实名制信息');
                    }
                },
                {
                    title: '买家编号',
                    width: 110,
                    key: 'usid'
                },
                {
                    title: '公司名称',
                    width: 160,
                    key: 'corpname'
                },
                {
                    title: '联系人姓名',
                    width: 100,
                    key: 'ornm'
                },
                {
                    title: '证件号码',
                    width: 160,
                    key: 'orhm'
                },
                {
                    title: '联系电话',
                    width: 120,
                    key: 'orph'
                },
                {
                    title: '下单日期',
                    width: 100,
                    key: 'orda'
                },
                {
                    title: '结算订单号',
                    minWidth: 220,
                    key: 'payorid'
                },
                {
                    title: '服务商名称',
                    width: 160,
                    key: 'szscenicname'
                },
                {
                    title: '买家',
                    width: 160,
                    key: 'corpname'
                },
                {
                    title: '卖家',
                    width: 160,
                    key: 'szscenicname'
                },
                {
                    title: '客源地',
                    width: 140,
                    key: 'szinnername'
                },
                {
                    title: '消费金额',
                    width: 100,
                    render: (h, params) => {
                        return h('span', (params.row.summont - params.row.tpmont).toFixed(3).slice(0, -1));
                    }
                },
                {
                    title: '手续费',
                    width: 80,
                    key: 'tpsx'
                },
                {
                    title: '订单状态',
                    width: 140,
                    render: (h, params) => {
                        if (params.row.ischupiao == 1) {
                            return h('span', {
                                style: {
                                    'color': 'red'
                                }
                            }, params.row.strddzt + '(锁定)');
                        } else {
                            return h('span', params.row.strddzt);
                        }
                    }
                },
                {
                    title: '产品名称',
                    minWidth: 170,
                    render: (h, params) => {
                        if (params.row.torderlists) {
                            return h('span', params.row.torderlists[0].sztickettypename);
                        } else {
                            return h('span', '');
                        }
                    }
                },
                {
                    title: '单价',
                    width: 70,
                    render: (h, params) => {
                        if (params.row.torderlists) {
                            return h('span', params.row.torderlists[0].pric);
                        } else {
                            return h('span', '');
                        }
                    }
                },
                {
                    title: '消费日期',
                    width: 100,
                    render: (h, params) => {
                        if (params.row.torderlists) {
                            return h('span', params.row.torderlists[0].dtstartdate);
                        } else {
                            return h('span', '');
                        }
                    }
                },
                {
                    title: '张数',
                    width: 70,
                    render: (h, params) => {
                        if (params.row.torderlists) {
                            return h('span', params.row.torderlists[0].numb);
                        } else {
                            return h('span', '');
                        }
                    }
                }
            ],
            orderDetail: {
                bzdw: '', // 编制单位 暂无
                order: '', // 订单号
                /* 基本信息 */
                basicMsg: {
                    ORDA: '',
                    ORTI: '',
                    USID: '', // 姓名
                    DDZT: '',
                    CORPNAME: '', // 旅行社
                    ZFMONT: '',
                    TPMONT: '',
                    TPSX: '', // 手续费
                    STRJL: '', // 是否积分订单
                    BANKDATA: '',
                    BANKTIME: '',
                    NOTE: '' // 客人备注
                },

                /* 最新预订信息 */
                reserveMsg: {
                    strpdno: '', // 服务商名称
                    ORNM: '', // 联系人姓名
                    ORHM: '', // 证件号码
                    ORPH: '', // 联系电话
                    ZFMONT: '', // 金额
                    strddzt: '', // 状态
                    szemployeename: '', // 出票员
                    NOTEC: '', // 出票时间
                    NOTEA: '' // 密码
                },

                /* 最新预订明细 */
                scenMsg: {
                    szscenicname: '', // 服务商名称、卖家
                    sztickettypename: '', // 产品名称
                    szcrowdkindname: '', // 类别
                    PRIC: '', // 单价
                    NUMB: '', // 数量
                    YHNUMB: '', // 优惠数量
                    AMNT: '', // 金额
                    YHAMNT: '', // 优惠金额
                    DTSTARTDATE: '', // 消费日期
                    DTENDDATE: '', // 消费截止日期
                    COMMISION: '', // 佣金
                    CNAME: '', // 买家
                    ZFMONT: '' // 结算金额
                },

                /* 出票前订单操作信息 */
                unregList: [],

                /* 出票前订单操作明细 */
                tdProductsList: [],

                /* 出票后退订信息 */
                unregList2: [],

                /* 出票后退订明细 */
                tdProductsList2: [],

                /* 售检票明细sale */
                saleList: [],

                /* 审核 */
                nowDate: '', // 时间
                user: '' // 制单 暂无
            },
            QueryBuilder: null,
            isInitQuery: true, // 用于判断当前翻页查询时条件查询还是初始化的无条件查询
            isvalid: undefined,
            colnames3: [
                {
                    title: '服务商',
                    minWidth: 170,
                    key: 'szscenicname'
                },
                {
                    title: '票名称',
                    minWidth: 170,
                    render: (h, params) => {
                        return h('span', params.row.sztickettypename + '(' + params.row.szcrowdkindname + ')');
                    }
                },
                {
                    title: '姓名',
                    minWidth: 140,
                    key: 'cname'
                },
                {
                    title: '证件类别',
                    minWidth: 140,
                    render: (h, params) => {
                        if (params.row.ischild == 0) {
                            return h('span', '');
                        } else {
                            return h('span', params.row.pmva);
                        }
                    }
                },
                {
                    title: '证件号码/出生日期',
                    minWidth: 140,
                    key: 'idcard'
                },
                {
                    title: '是否小孩',
                    minWidth: 100,
                    render: (h, params) => {
                        if (params.row.ischild == 0) {
                            return h('span', '是');
                        } else {
                            return h('span', '否');
                        }
                    }
                },
                {
                    title: '手机号码',
                    minWidth: 140,
                    key: 'mbnumber'
                }
            ],
            tableData3: [],
            total3: 0,
            currentPage: 1
        };
    },
    async created () {
    // 初始化页面
        this.isShowLoading = true;
        const initRes = await this.$api.all([
            {
                url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
                type: 'get',
                queryParams: {
                    url: window.location.hostname
                }
            },
            {
                url: this.baseUrl + '/ec/allOrderManage/v1/list',
                type: 'post',
                urlParams: {
                    serverNamer: window.location.hostname,
                    page: 1,
                    pageSize: this.size
                }
            }
        ]);
        // console.log(initRes);
        if (!initRes) {
            this.isShowLoading = false;
            return;
        }

        let ddztlist = initRes[1].ddztlist,
            clist = initRes[1].clist,
            scenicList = initRes[0];

        // 初始化服务商下拉列表
        this.formItemListByOrder[0].optionList = scenicList.map(item => {
            return {
                value: item.iscenicid,
                label: item.szscenicname
            };
        });

        // 初始化OTA用户下拉列表
        this.formItemListByOrder[1].config[3].selectOptionList = clist.map(item => {
            return {
                value: item.usid,
                label: item.corpname
            };
        });

        // 初始化订单状态下拉列表
        this.formItemListByOrder[5].optionList = ddztlist.map(item => {
            return {
                value: item.pmcd,
                label: item.pmva
            };
        });

        this.handleTimeInterval(3);
        this.params.formDatasByOrder.iscenicid = scenicList[0].iscenicid;
        this.params.formDatasByOrder.otausid = clist[0].usid;
        this.params.formDatasByOrder.ddzt = ddztlist[0].pmcd;
        this.saveInfo = {
            ddztlist,
            clist,
            scenicList
        };

        this.tableData = initRes[1].ps.items;
        this.total = initRes[1].ps.totalCount;
        this.QueryBuilder = {
            serverNamer: window.location.hostname,
            page: 1,
            pageSize: this.size
        };
        this.currentPage = 1;
        this.isShowLoading = false;
    },
    computed: {
        allMont () { // 订单总金额
            return this.orderDetail.basicMsg.ZFMONT - this.orderDetail.basicMsg.TPMONT;
        },
        payTime () { // 支付时间
            if (!this.orderDetail.basicMsg.BANKDATA) {
                this.orderDetail.basicMsg.BANKDATA = '';
            }
            if (!this.orderDetail.basicMsg.BANKTIME) {
                this.orderDetail.basicMsg.BANKTIME = '';
            }
            return this.orderDetail.basicMsg.BANKDATA + ' ' + this.orderDetail.basicMsg.BANKTIME;
        },
        orderDate () { // 下单日期
            return this.orderDetail.basicMsg.ORDA + ' ' + this.orderDetail.basicMsg.ORTI;
        },
        orderStatus () { // 订单状态 '00'未付款 '01'未付款 '02' 已支付 '11'已出票
            let val = this.orderDetail.basicMsg.DDZT;
            if (val === '00') {
                return '未付款';
            }
            if (val === '01') {
                return '未付款';
            }
            if (val === '02') {
                return '已支付';
            }
            if (val === '11') {
                return '已出票';
            }
        }
    },
    methods: {
    // 条件查询
        handleQuery () {
            this.isInitQuery = false;
            this.execQuery(1);
        },
        // 切换页码查询
        async handleChangePage (num) {
            if (this.isInitQuery) {
                this.isLoading = true;
                let queryParams = { ...this.QueryBuilder };
                queryParams.pageSize = this.size;
                queryParams.page = num;
                this.currentPage = num;
                const changePageRes = await this.$api.post(this.baseUrl + '/ec/allOrderManage/v1/list', queryParams);
                // console.log(changePageRes);
                if (!changePageRes) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = changePageRes.data.ps.items;
                this.total = changePageRes.data.ps.totalCount;
                this.isLoading = false;
            } else {
                this.execQuery(num);
            }
        },
        // 设置近三天
        setDay () {
            this.handleTimeInterval(3);
        },
        // 设置近一周
        setWeek () {
            this.handleTimeInterval(7);
        },
        // 设置近一月
        setMonth () {
            this.handleTimeInterval(30);
        },
        handleTimeInterval (interval) {
            // 处理当天时间
            let today1 = this.$handle.formatDate(new Date()), // 格式化当天时间，舍去时分秒
                today2 = new Date(today1 + 'T00:00:00'), // 重新转成日期标准格式
                today3 = today2.getTime(); // 得到具体毫秒值

            // 处理间隔时间
            let threeDay3 = today3 - interval * 24 * 60 * 60 * 1000,
                threeDay2 = new Date(threeDay3),
                threeDay1 = this.$handle.formatDate(threeDay2);

            this.params.formDatasByOrder.startDate = threeDay1;
            this.params.formDatasByOrder.endDate = today1;
        },
        // 提交表单查询
        async execQuery (num) {
            let f1 = this.params.formDatasByOrder,
                radio1 = this.params.formDatasByOrder.radiobutton1,
                // 再强制转一次日期格式，解决iview日期组件在第一次快捷选择之后，会变成UTC时间格式
                startDate = this.$handle.formatDate(this.params.formDatasByOrder.startDate),
                endDate = this.$handle.formatDate(this.params.formDatasByOrder.endDate),
                usid = this.params.formDatasByOrder.usid,

                f2 = this.params.formDatasByContact,
                radio3 = this.params.formDatasByContact.radiobutton3,
                errorsid = this.params.errorsid,

                url = '',
                bodyParams = null,
                urlParams = {
                    pageSize: this.size,
                    page: num,
                    serverNamer: window.location.hostname
                };

            // 按订单查询
            if (errorsid === '0') {
                if (!usid && radio1 === 3) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入指定买家的名称'
                    });
                    return false;
                }
                let startMillisecond = Date.parse(startDate + 'T00:00:00'),
                    endMillisecond = Date.parse(endDate + 'T00:00:00');
                if (endMillisecond - startMillisecond < 0) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '查询起始时间不能超过大于末尾时间'
                    });
                    return false;
                }
                // console.log(startDate,endDate)
                let interval = (endMillisecond - startMillisecond) / 1000 / 3600 / 24;
                if (interval > 30) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '查询间隔时间不能超过30天'
                    });
                    return false;
                }
                // 验证通过执行查询
                this.isLoading = true;
                bodyParams = {
                    iscenicid: f1.iscenicid,
                    ddzt: f1.ddzt,
                    usid,
                    // dyusid: f1.dyusid,
                    strornm: f1.strornm,
                    radiobutton1: radio1,
                    radiobutton2: f1.radiobutton2,
                    startDate: this.$handle.formatDate(startDate),
                    endDate: this.$handle.formatDate(endDate),
                    errorsid
                };
                if (radio1 === 5) {
                    urlParams = {
                        ...urlParams,
                        otausid: f1.otausid
                    };
                }
                url = this.baseUrl + '/ec/allOrderManage/v1/list';
            }

            // 按订单或联系人查询
            if (errorsid === '1') {
                if (radio3 === 0 && !f2.orid) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请指定订单编号'
                    });
                    return false;
                } else if (radio3 === 1 && !f2.ornm) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入联系人姓名'
                    });
                    return false;
                } else if (radio3 === 2 && !f2.orhm) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入证件号码'
                    });
                    return false;
                } else if (radio3 === 5 && !f2.payorid) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请输入支付订单号'
                    });
                    return false;
                }
                // 验证通过执行查询
                this.isLoading = true;
                bodyParams = {
                    ...f2,
                    errorsid
                };
                url = this.baseUrl + '/ec/allOrderManage/v1/listBy';
            }
            const queryRes = await this.$api.post(url, urlParams, bodyParams);
            if (!queryRes) {
                this.isLoading = false;
                return false;
            }

            this.tableData = queryRes.data.ps.items;
            this.total = queryRes.data.ps.totalCount;
            // this.watchTotal = queryRes.data.ps.totalCount;
            this.currentPage = num;
            this.rowData = null;
            this.isLoading = false;
            // console.log(queryRes);
            return true;
        },
        // 选中一行
        handleSelect (rowData) {
            // console.log(rowData);
            this.rowData = rowData;
        },
        // 订单解锁
        async handleOperate (operateNum) {
            if (this.rowData.ischupiao !== 1) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '该订单不是锁定状态，无需解锁！'
                });
                return;
            }
            if (operateNum === 11) {
                this.isShowLoading = true;
                const unlock = await this.$api.get(this.baseUrl + '/ec/allOrderManage/v1/initOrderStatus', {
                    orid: this.rowData.orid,
                    iscenicid: this.rowData.iscenicid
                });
                if (!unlock) {
                    this.isShowLoading = false;
                    return;
                }

                this.isShowLoading = false;
                // this.watchTotal = 0;
                let isSuccess = this.handleChangePage(1);
                if (isSuccess) {
                    this.$Modal.success({
                        title: '操作成功',
                        content: '解锁成功，你刚才解锁的订单号为：' + this.rowData.orid
                    });
                } else {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '订单解锁已经成功，解锁的订单号为：' + this.rowData.orid + '，但重新查询时遇到异常，请刷新后查看'
                    });
                }
            }
        },
        // 重置表单-订单查询
        resetForm1 () {
            this.params.formDatasByOrder.iscenicid = this.saveInfo.scenicList[0].iscenicid;
            this.params.formDatasByOrder.otausid = this.saveInfo.clist[0].usid;
            this.params.formDatasByOrder.ddzt = this.saveInfo.ddztlist[0].pmcd;
            this.params.formDatasByOrder.usid = '';
            this.setDay();
        },
        // 重置表单-联系人查询
        resetForm2 () {
            this.params.formDatasByContact.orid = '';
            this.params.formDatasByContact.ornm = '';
            this.params.formDatasByContact.orhm = '';
            this.params.formDatasByContact.payorid = '';
        },
        // 改变每页展示条数
        changeSize (size) {
            this.size = size;
            // this.watchTotal = 0;
            this.handleChangePage(1);
        },
        // 查看订单详情
        async gotoOrderDetail (orderId) {
            this.isShowLoading = true;
            const getOrderDetail = await this.$api.get(this.baseUrl + '/ec/allOrderManage/v1/getSysOrderDetail', {
                orid: orderId
            });
            // console.log(getOrderDetail);
            if (!getOrderDetail) {
                this.isShowLoading = false;
                return;
            }

            /**
 * 基本信息
 */
            for (let outer in this.orderDetail.basicMsg) {
                for (let inner in getOrderDetail.data.basicMsg[0]) {
                    if (outer === inner) {
                        this.orderDetail.basicMsg[outer] = getOrderDetail.data.basicMsg[0][inner];
                        break;
                    }
                }
            }

            /**
 * 最新预订信息
 */
            for (let outer in this.orderDetail.reserveMsg) {
                for (let inner in getOrderDetail.data.reserveMsg[0]) {
                    if (outer === inner) {
                        this.orderDetail.reserveMsg[outer] = getOrderDetail.data.reserveMsg[0][inner];
                        break;
                    }
                }
            }

            /**
 * 最新预订明细
 */
            for (let outer in this.orderDetail.scenMsg) {
                for (let inner in getOrderDetail.data.scenMsg[0]) {
                    if (outer === inner) {
                        this.orderDetail.scenMsg[outer] = getOrderDetail.data.scenMsg[0][inner];
                        break;
                    }
                }
            }

            if (getOrderDetail.data.unreg.length) {
                /**
 * 出票前订单操作信息
 */
                this.orderDetail.unregList = [];
                getOrderDetail.data.unreg.forEach(item => {
                    this.orderDetail.unregList.push({
                        ORID: item.ORID, // 订单号
                        strpdno: item.strpdno, // 服务商名称
                        strortp: item.strortp, // 订单方式
                        ZFMONT: item.ZFMONT, // 金额
                        TPSX: item.TPSX, // 手续费
                        ORTP: item.ORTP === '02' ? (item.ZFMONT - item.TPSX) : item.ZFMONT, // 实际金额  如果是退票（02）则减去手续费
                        strddzt: item.strddzt, // 状态
                        TPDATE: item.TPDATE, // 操作时间
                        szemployeename: item.szemployeename // 出票员
                    });
                });

                /**
 * 出票后退订信息
 */
                this.orderDetail.unregList2 = [];
                getOrderDetail.data.unreg.forEach(item => {
                    this.orderDetail.unregList2.push({
                        ORID: item.ORID, // 订单号
                        strpdno: item.strpdno, // 服务商名称
                        strortp: item.strortp, // 订单方式
                        ZFMONT: item.ZFMONT, // 金额
                        TPSX: item.TPSX, // 手续费
                        strddzt: item.strddzt, // 状态
                        TPDATE: item.TPDATE, // 操作时间
                        szemployeename: item.szemployeename, // 出票员
                        realAmount: item.ZFMONT - item.TPSX // 实际金额
                    });
                });
            }

            if (getOrderDetail.data.tdProducts.length) {
                /**
 * 出票前订单操作明细
 */
                this.orderDetail.tdProductsList = [];
                getOrderDetail.data.tdProducts.forEach(item => {
                    this.orderDetail.tdProductsList.push({
                        ORID: item.ORID, // 订单号
                        strpdno: item.strpdno, // 服务商名称
                        strortp: item.strortp, // 订单方式
                        sztickettypename: item.sztickettypename, // 产品名称
                        PRIC: item.PRIC, // 单价
                        NUMB: item.NUMB, // 数量
                        YHNUMB: item.YHNUMB, // 优惠数量
                        DTSTARTDATE: item.DTSTARTDATE, // 消费日期
                        amount: item.AMNT - item.YHAMNT // 金额
                    });
                });

                /**
 * 出票后退订明细
 */
                this.orderDetail.tdProductsList2 = [];
                getOrderDetail.data.tdProducts.forEach(item => {
                    this.orderDetail.tdProductsList2.push({
                        ORID: item.ORID, // 订单号
                        strpdno: item.strpdno, // 服务商名称
                        strortp: item.strortp, // 订单方式
                        sztickettypename: item.sztickettypename, // 产品名称
                        PRIC: item.PRIC, // 单价
                        NUMB: item.NUMB, // 数量
                        YHNUMB: item.YHNUMB, // 优惠数量
                        DTSTARTDATE: item.DTSTARTDATE, // 消费日期
                        amount: item.AMNT - item.YHAMNT // 金额
                    });
                });
            }

            /**
 * 售检票明细sale
 */
            if (getOrderDetail.data.sale.length) {
                this.orderDetail.saleList = [];
                getOrderDetail.data.sale.forEach(item => {
                    // 票状态  1 有效 -1 无效
                    let isvalid = '';
                    if (item.ISVALID === 1) {
                        isvalid = '有效';
                    } else if (item.ISVALID === -1) {
                        isvalid = '无效';
                    } else {
                        isvalid = '';
                    }
                    this.orderDetail.saleList.push({
                        STRPDNO: item.STRPDNO, // 服务商名称
                        SZTICKETPRINTNO: item.SZTICKETPRINTNO, // 票号
                        SZTICKETTYPENAME: item.SZTICKETTYPENAME, // 产品名称
                        ZSZTICKETTYPENAME: item.ZSZTICKETTYPENAME, // 子产品
                        SZGARDENGATENAME: item.SZGARDENGATENAME, // 园门
                        isvalid, // 票状态
                        IPASSEDTIMES: item.IPASSEDTIMES, // 通过次数
                        DTBEGINDATE: item.DTBEGINDATE, // 检票开始时间
                        TRIPNAME: item.TRIPNAME // 趟次
                    });
                });
            }

            this.orderDetail.order = orderId;
            this.orderDetail.nowDate = this.$handle.formatDate(new Date());
            this.currentIndex = 2;
            this.isShowLoading = false;
        },
        closePage () {
            this.currentIndex = 1;
        },
        async gotoRealName (orderId) {
            this.isShowLoading = true;
            const getRealInfo = await this.$api.get(this.baseUrl + '/ec/allOrderManage/v1/queryRealNameList', {
                orid: orderId,
                page: 1,
                pageSize: 10
            });
            // console.log(getRealInfo);
            if (!getRealInfo) {
                this.isShowLoading = false;
                return;
            }
            this.tableData3 = getRealInfo.data.realname.items;
            this.total3 = 1;
            this.currentPage = 1;
            this.currentIndex = 3;
            this.isShowLoading = false;
        },
        handleOperate3 (operateNum) {
            if (operateNum === 11) {
                this.currentIndex = 1;
            }
        }
    }
};
</script>

<style scoped lang="less">
.table_wrap {
  overflow: auto;
  table,
  td {
    border: 1px solid #000;
  }
  table {
    width: 1280px;
    margin: 0 auto;
    border-collapse: collapse;
    font-size: 12px;
    tr {
      height: 40px;
      td {
        text-align: center;
        &:nth-of-type(1) {
          width: 170px;
        }
        &:nth-of-type(2) {
          width: 200px;
        }
        &:nth-of-type(8) {
          width: 180px;
        }
      }
    }
    .row_title {
      background-color: #c0c0c0;
      font-size: 14px;
      font-weight: 600;
      color: #000;
    }
  }
  div {
    width: 1280px;
    margin: 0 auto;
  }
  .table_title {
    text-align: center;
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
  }
  .table_left {
    line-height: 24px;
  }
  .table_footer {
    overflow: hidden;
    margin-bottom: 30px;
    span {
      float: right;
      line-height: 45px;
    }
    .sp2 {
      margin-right: 140px;
    }
    .sp3 {
      margin-right: 30px;
    }
  }
  .bold {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
