<template>
    <div>
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>预定订单查询</span>
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
        <Card v-show="currentIndex === 2">
            <p slot="title" class="cardTitle">
                <span>预定订单查询</span>
                <topBtn :btnList="btnList2" ></topBtn>
            </p>
            <div class="table_wrap">
                <div class="table_title">订单详情</div>
                <div class="table_left">编制单位：{{ orderDetail.bzdw }}</div>
                <table>
                    <tr>
                        <td class="bold">订单号：</td>
                        <td colspan="2">{{ orderDetail.order }}</td>
                        <td class="bold">供应商单号</td>
                        <td></td>
                        <td class="bold">支付方式：</td>
                        <td>网上支付</td>
                        <td colspan="2"></td>
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
                        <td class="bold">旅行社：</td>
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
                    <tr>
                        <td>{{ orderDetail.unreg.ORID }}</td>
                        <td>{{ orderDetail.unreg.strpdno }}</td>
                        <td>{{ orderDetail.unreg.strortp }}</td>
                        <td>{{ orderDetail.unreg.ZFMONT }}</td>
                        <td>{{ orderDetail.unreg.TPSX }}</td>
                        <td>{{ orderDetail.unreg.ORTP }}</td>
                        <td>{{ orderDetail.unreg.strddzt }}</td>
                        <td>{{ orderDetail.unreg.TPDATE }}</td>
                        <td>{{ orderDetail.unreg.szemployeename }}</td>
                    </tr>
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
                    <tr>
                        <td>{{ orderDetail.tdProducts.ORID }}</td>
                        <td>{{ orderDetail.tdProducts.strpdno }}</td>
                        <td>{{ orderDetail.tdProducts.strortp }}</td>
                        <td>{{ orderDetail.tdProducts.sztickettypename }}</td>
                        <td>{{ orderDetail.tdProducts.PRIC }}</td>
                        <td>{{ orderDetail.tdProducts.NUMB }}</td>
                        <td>{{ orderDetail.tdProducts.YHNUMB }}</td>
                        <td>{{ amount1 }}</td>
                        <td>{{ orderDetail.tdProducts.DTSTARTDATE }}</td>
                    </tr>
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
                    <tr>
                        <td>{{ orderDetail.unreg2.ORID }}</td>
                        <td>{{ orderDetail.unreg2.strpdno }}</td>
                        <td>{{ orderDetail.unreg2.strortp }}</td>
                        <td>{{ orderDetail.unreg2.ZFMONT }}</td>
                        <td>{{ orderDetail.unreg2.TPSX }}</td>
                        <td>{{ realAmount }}</td>
                        <td>{{ orderDetail.unreg2.strddzt }}</td>
                        <td>{{ orderDetail.unreg2.TPDATE }}</td>
                        <td>{{ orderDetail.unreg2.szemployeename }}</td>
                    </tr>
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
                    <tr>
                        <td>{{ orderDetail.tdProducts2.ORID }}</td>
                        <td>{{ orderDetail.tdProducts2.strpdno }}</td>
                        <td>{{ orderDetail.tdProducts2.strortp }}</td>
                        <td>{{ orderDetail.tdProducts2.sztickettypename }}</td>
                        <td>{{ orderDetail.tdProducts2.PRIC }}</td>
                        <td>{{ orderDetail.tdProducts2.NUMB }}</td>
                        <td>{{ orderDetail.tdProducts2.YHNUMB }}</td>
                        <td>{{ amount2 }}</td>
                        <td>{{ orderDetail.tdProducts2.DTSTARTDATE }}</td>
                    </tr>
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
                    <tr>
                        <td>{{ orderDetail.sale.STRPDNO }}</td>
                        <td>{{ orderDetail.sale.SZTICKETPRINTNO }}</td>
                        <td>{{ orderDetail.sale.SZTICKETTYPENAME }}</td>
                        <td>{{ orderDetail.sale.ZSZTICKETTYPENAME }}</td>
                        <td>{{ orderDetail.sale.SZGARDENGATENAME }}</td>
                        <td>{{ orderDetail.sale.ISVALID }}</td>
                        <td>{{ orderDetail.sale.IPASSEDTIMES }}</td>
                        <td>{{ orderDetail.sale.DTBEGINDATE }}</td>
                        <td>{{ orderDetail.sale.TRIPNAME }}</td>
                    </tr>
                </table>
                <div class="table_footer">
                    <span class="sp1">时间：{{ orderDetail.nowDate }}</span>
                    <span class="sp2">审核：</span>
                    <span class="sp3">制单：{{ orderDetail.user }}</span>
                </div>
                <div style="text-align:center;margin-bottom: 30px;"><Button type="primary" shape="circle" class="addpadding" @click="closePage">关闭</Button></div>
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "reservation-order-search",
        data(){
            return{
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
                    }
                ],
                params: {
                    errorsid: '0',
                    formDatasByOrder: {
                        iscenicid: '',
                        otausid: '',
                        ddzt: '',
                        usid: '',
                        mj: '',
                        mj2: '',
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
                        keyName:'iscenicid',
                        class: 'float-left',
                        labelWidth: 70,
                        optionList: []
                    },
                    {
                        type: 1,
                        label: '公司名称（联系人）模糊查找',
                        keyName: 'strornm',
                        class: 'float-left',
                        labelWidth: 250
                    },
                    {
                        type: 4,
                        label: '订单状态',
                        keyName: 'ddzt',
                        class: 'float-left',
                        labelWidth: 140,
                        optionList: []
                    },
                    {
                        type: 14,
                        label: '',
                        labelWidth: 10,
                        class: 'float-left',
                        keyName: 'radiobutton1',
                        config: [
                            {
                                label: '全部用户',
                                value: 0,
                            },
                            {
                                label: '散客',
                                value: 4,
                            },
                            {
                                label: '指定买家',
                                value: 3,
                                isAddInput: true,
                                inputKeyName: 'usid',
                            },
                            // {
                            //     label: '指定卖家',
                            //     value: 1,
                            //     isAddInput: true,
                            //     inputKeyName: 'mj2',
                            // },
                            // {
                            //     label: '指定下单用户',
                            //     value: 3,
                            //     isAddInput: true,
                            //     inputKeyName: 'usid',
                            // },
                            {
                                label: 'OTA用户',
                                value: 5,
                                isAddSelect: true,
                                selectKeyName: 'otausid',
                                selectOptionList: []
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '',
                        keyName: 'radiobutton2',
                        class: 'float-left',
                        labelWidth: 10,
                        optionList: [
                            {
                                value: 0,
                                labelName: '按首日游览日期'
                            },
                            {
                                value: 1,
                                labelName: '按下订单日期查询'
                            },
                            {
                                value: 2,
                                labelName: '按订单支付日期查询'
                            },
                            {
                                value: 4,
                                labelName: '按订单出票日期'
                            }
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
                            },
                            {
                                type: 1,
                                value: 5,
                                keyName: 'payorid',
                                labelName: '支付订单号'
                            }
                        ]
                    },
                ],
                colnames: [
                    {
                        title: '订单号',
                        width: 170,
                        render: (h,params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                        this.gotoOrderDetail(params.row.orid);
                                    }
                                }
                            },params.row.orid);
                        }
                    },
                    {
                        title: '实名制信息',
                        width: 100,
                        render: (h,params) => {
                            return h('a','实名制信息');
                        }
                    },
                    {
                        title: '用户编号',
                        width: 110,
                        key: 'usid'
                    },
                    {
                        title: '公司名称',
                        width: 140,
                        key: 'corpname'
                    },
                    {
                        title: '联系人姓名',
                        width: 100,
                        key: 'ornm'
                    },
                    {
                        title: '证件号码',
                        width: 140,
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
                        title: '支付号',
                        width: 100,
                        key: 'payorid'
                    },
                    {
                        title: '服务商名称',
                        width: 140,
                        key: 'szscenicname'
                    },
                    {
                        title: '买家',
                        width: 140,
                        key: 'corpname'
                    },
                    {
                        title: '卖家',
                        width: 140,
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
                        render: (h,params) => {
                            return h('span',(params.row.summont - params.row.tpmont).toFixed(3).slice(0,-1));
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
                        render: (h,params) => {
                            if(params.row.ischupiao == 1) {
                                return h('span',{
                                    style: {
                                        'color': 'red'
                                    }
                                },params.row.strddzt + '(锁定)');
                            } else {
                                return h('span',params.row.strddzt);
                            }
                        }
                    },
                    {
                        title: '产品名称',
                        width: 110,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].sztickettypename);
                            } else {
                                return h('span','');
                            }
                        }
                    },
                    {
                        title: '单价',
                        width: 70,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].pric);
                            } else {
                                return h('span','');
                            }
                        }
                    },
                    {
                        title: '消费日期',
                        width: 100,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].dtstartdate);
                            } else {
                                return h('span','');
                            }
                        }
                    },
                    {
                        title: '张数',
                        width: 70,
                        render: (h,params) => {
                            if(params.row.torderlists) {
                                return h('span',params.row.torderlists[0].numb);
                            } else {
                                return h('span','');
                            }
                        }
                    }
                ],
                orderDetail: {
                    bzdw: '', // 编制单位 暂无
                    order: '', // 订单号
                    /* 基本信息 */
                    basicMsg : {
                        ORDA: '',
                        ORTI: '',
                        USID: '', // 姓名
                        DDZT: '',
                        CORPNAME: '', // 旅行社
                        ZFMONT: 0,
                        TPMONT: 0,
                        TPSX: '', // 手续费
                        STRJL: '', // 是否积分订单 
                        BANKDATA: '',
                        BANKTIME: '',
                        NOTE: '', // 客人备注
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
                        NOTEA: '', // 密码 
                    },
                           
                    /* 最新预订明细 */
                    scenMsg: {
                        szscenicname: '', // 服务商名称、卖家
                        sztickettypename: '', // 产品名称
                        szcrowdkindname: '', // 类别
                        PRIC: 0, // 单价 
                        NUMB: 0, // 数量 
                        YHNUMB: 0, // 优惠数量 
                        AMNT: 0, // 金额 
                        YHAMNT: 0, // 优惠金额 
                        DTSTARTDATE: '', // 消费日期 
                        DTENDDATE: '', // 消费截止日期 
                        COMMISION: '',// 佣金
                        CNAME: '',// 买家
                        ZFMONT: '',// 结算金额
                    },

                    /* 出票前订单操作信息 */
                    unreg: {
                        ORID: '', // 订单号 
                        strpdno: '', // 服务商名称
                        strortp: '', // 订单方式 
                        ZFMONT: 0, // 金额 
                        TPSX: 0, // 手续费 
                        ORTP: 0, // 实际金额 
                        strddzt: '', // 状态 
                        TPDATE: '', // 操作时间 
                        szemployeename: '', // 出票员
                    },
                    
                    /* 出票前订单操作明细 */
                    tdProducts: {
                        ORID: '', // 订单号 
                        strpdno: '', // 服务商名称 
                        strortp: '', // 订单方式 
                        sztickettypename: '', // 产品名称 
                        PRIC: 0, // 单价 
                        NUMB: 0, // 数量 
                        YHNUMB: 0, // 优惠数量 
                        DTSTARTDATE: '', // 消费日期
                        AMNT: '',
                        YHAMNT: '',
                    },
                    
                    /* 出票后退订信息 */
                    unreg2: {
                        ORID: '', // 订单号 
                        strpdno: '', // 服务商名称 
                        strortp: '', // 订单方式 
                        ZFMONT: 0, // 金额 
                        TPSX: 0, // 手续费 
                        ZFMONT: 0,
                        TPSX: 0,
                        strddzt: '', // 状态 
                        TPDATE: '', // 操作时间 
                        szemployeename: '', // 出票员 
                    },
                    
                    /* 出票后退订明细 */
                    tdProducts2: {
                        ORID: '', // 订单号 
                        strpdno: '', // 服务商名称 
                        strortp: '', // 订单方式 
                        sztickettypename: '', // 产品名称 
                        PRIC: 0, // 单价 
                        NUMB: 0, // 数量 
                        YHNUMB: 0, // 优惠数量 
                        DTSTARTDATE: '', // 消费日期
                        AMNT: '',
                        YHAMNT: '',
                    },
                    
                    /* 售检票明细sale */
                    sale: {
                        STRPDNO: '', // 服务商名称 
                        SZTICKETPRINTNO: '', // 票号 
                        SZTICKETTYPENAME: '', // 产品名称 
                        ZSZTICKETTYPENAME: '', // 子产品 
                        SZGARDENGATENAME: '', // 园门 
                        ISVALID: '', // 票状态 
                        IPASSEDTIMES: 0, // 通过次数 
                        DTBEGINDATE: '', // 检票开始时间 
                        TRIPNAME: 0, // 趟次 
                    },
                    // 审核
                    nowDate: '', // 时间
                    user: '' // 制单 暂无
                }
            }
        },
        async created() {
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
                        serverNamer: window.location.hostname
                    }
                }
            ]);
            console.log(initRes);
            if(!initRes) {
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
                }
            });

            // 初始化OTA用户下拉列表
            this.formItemListByOrder[3].config[5].selectOptionList = clist.map(item => {
                return {
                    value: item.usid,
                    label: item.corpname
                }
            });

            // 初始化订单状态下拉列表
            this.formItemListByOrder[2].optionList = ddztlist.map(item => {
                return {
                    value: item.pmcd,
                    label: item.pmva
                }
            });

            let today = this.$handle.formatDate(new Date()),
                threeDay = this.$handle.formatDate(new Date(Date.now() - 3*24*60*60*1000));
            this.params.formDatasByOrder.startDate = threeDay;
            this.params.formDatasByOrder.endDate = today;
            this.params.formDatasByOrder.iscenicid = scenicList[0].iscenicid;
            this.params.formDatasByOrder.otausid = clist[0].usid;
            this.params.formDatasByOrder.ddzt = ddztlist[0].pmcd;
            this.saveInfo = {
                ddztlist,
                clist,
                scenicList
            };
            this.isShowLoading = false;
        },
        computed: {
            allMont() { // 订单总金额
                return this.orderDetail.basicMsg.ZFMONT - this.orderDetail.basicMsg.TPMONT;
            },
            payTime() { // 支付时间
                if(!this.orderDetail.basicMsg.BANKDATA) {
                    this.orderDetail.basicMsg.BANKDATA = '';
                }
                if(!this.orderDetail.basicMsg.BANKTIME) {
                    this.orderDetail.basicMsg.BANKTIME = '';
                }
                return this.orderDetail.basicMsg.BANKDATA + ' ' + this.orderDetail.basicMsg.BANKTIME;
            },
            orderDate() { // 下单日期
                return this.orderDetail.basicMsg.ORDA + ' ' + this.orderDetail.basicMsg.ORTI;
            },
            orderStatus() { // 订单状态 '00'未支付 '01'已支付 '02' 已付款
                let val = this.orderDetail.basicMsg.DDZT;
                if(val === '00') {
                    return '未支付';
                }
                if(val === '01') {
                    return '已支付';
                }
                if(val === '02') {
                    return '已付款';
                } 
            },
            amount1() { // 出票前订单操作明细--金额
                return this.orderDetail.tdProducts.AMNT - this.orderDetail.tdProducts.YHAMNT;
            },
            realAmount() { // 出票后退订信息--实际金额
                return this.orderDetail.unreg2.ZFMONT - this.orderDetail.unreg2.TPSX;
            },
            amount2() { // 出票后退订明细--金额
                return this.orderDetail.tdProducts.AMNT - this.orderDetail.tdProducts.YHAMNT;
            },
        },
        methods: {
            // 条件查询
            handleQuery() {
                this.execQuery(1);
            },
            // 切换页码查询
            handleChangePage(num) {
                this.execQuery(num);
            },
            // 设置近三天
            setDay() {
                this.params.formDatasByOrder.startDate = this.$handle.formatDate(new Date(Date.now() - 3*24*60*60*1000));
                this.params.formDatasByOrder.endDate = this.$handle.formatDate(new Date());
            },
            // 设置近一周
            setWeek() {
                this.params.formDatasByOrder.startDate = this.$handle.formatDate(new Date(Date.now() - 7*24*60*60*1000));
                this.params.formDatasByOrder.endDate = this.$handle.formatDate(new Date());
            },
            // 设置近一月
            setMonth() {
                this.params.formDatasByOrder.startDate = this.$handle.formatDate(new Date(Date.now() - 30*24*60*60*1000));
                this.params.formDatasByOrder.endDate = this.$handle.formatDate(new Date());
            },
            // 提交表单查询
            async execQuery(num) {
                let f1 = this.params.formDatasByOrder,
                    radio1 = this.params.formDatasByOrder.radiobutton1,
                    startDate = this.params.formDatasByOrder.startDate,
                    endDate = this.params.formDatasByOrder.endDate,
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
                if(errorsid === '0') {
                   if(!usid && radio1 === 3) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入下单用户编号'
                        });
                        return false;
                    }
                    let realMillisecond = endDate - startDate,
                        realDay = realMillisecond / 1000 / 60 / 60 /24;
                    if( realMillisecond < 0) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '起始日期不能大于截止日期'
                        });
                        return false;
                    }
                    if(realDay > 30) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '查询间隔时间不能超过30天！'
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
                    }
                    if(radio1 === 5) {
                        urlParams = {
                            ...urlParams,
                            otausid: f1.otausid
                        }
                    }
                    url = this.baseUrl + '/ec/allOrderManage/v1/list';
                }

                // 按订单或联系人查询
                if(errorsid === '1') { 
                    if(radio3 === 0 && !f2.orid) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请指定订单编号'
                        });
                        return false;
                    } else if(radio3 === 1 && !f2.ornm) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入联系人姓名'
                        });
                        return false;
                    } else if(radio3 === 2 && !f2.orhm) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请输入证件号码'
                        });
                        return false;
                    } else if(radio3 === 5 && !f2.payorid) {
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
                const queryRes = await this.$api.post(url,urlParams,bodyParams);
                if(!queryRes) {
                    this.isLoading = false;
                    return false;
                }

                this.tableData = queryRes.data.ps.items;
                this.total = queryRes.data.ps.totalCount;
                // this.watchTotal = queryRes.data.ps.totalCount;
                this.currentPage = num;
                this.rowData = null;
                this.isLoading = false;
                console.log(queryRes);
                return true;
            },
            // 选中一行
            handleSelect(rowData) {
                console.log(rowData);
            	this.rowData = rowData;
            },
            // 订单解锁
            async handleOperate(operateNum) {
                if(operateNum === 11) {
                    this.isShowLoading = true;
                    const unlock = await this.$api.get(this.baseUrl + '/ec/allOrderManage/v1/initOrderStatus',{
                        orid: this.rowData.orid,
                        iscenicid: this.rowData.iscenicid
                    });
                    if(!unlock) {
                        // this.$Modal.error({
                        //     title: '温馨提示',
                        //     content: '解锁失败，请刷新后重试'
                        // });
                        this.isShowLoading = false;
                        return;
                    }

                    this.isShowLoading = false;
                    // this.watchTotal = 0;
                    let isSuccess = this.handleChangePage(1);
                    if(isSuccess) {
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
            resetForm1() {
                this.params.formDatasByOrder.iscenicid = this.saveInfo.scenicList[0].iscenicid;
                this.params.formDatasByOrder.otausid = this.saveInfo.clist[0].usid;
                this.params.formDatasByOrder.ddzt = this.saveInfo.ddztlist[0].pmcd;
                this.params.formDatasByOrder.usid = '';
                this.setDay();
            },
            // 重置表单-联系人查询
            resetForm2() {
                this.params.formDatasByContact.orid = '';
                this.params.formDatasByContact.ornm = '';
                this.params.formDatasByContact.orhm = '';
                this.params.formDatasByContact.payorid = '';
            },
            // 改变每页展示条数
            changeSize(size) {
                this.size = size;
                // this.watchTotal = 0;
                this.handleChangePage(1);
            },
            // 查看订单详情
            async gotoOrderDetail(orderId) {
                this.isShowLoading = true;
                const getOrderDetail = await this.$api.get(this.baseUrl + '/ec/allOrderManage/v1/getSysOrderDetail',{
                    orid: orderId
                });
                console.log(getOrderDetail);
                if(!getOrderDetail) {
                    this.isShowLoading = false;
                    return;
                }

                for(let outer in this.orderDetail.basicMsg) {
                    for(let inner in getOrderDetail.data.basicMsg[0]) {
                        if(outer === inner) {
                            this.orderDetail.basicMsg[outer] = getOrderDetail.data.basicMsg[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.reserveMsg) {
                    for(let inner in getOrderDetail.data.reserveMsg[0]) {
                        if(outer === inner) {
                            this.orderDetail.reserveMsg[outer] = getOrderDetail.data.reserveMsg[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.scenMsg) {
                    for(let inner in getOrderDetail.data.scenMsg[0]) {
                        if(outer === inner) {
                            this.orderDetail.scenMsg[outer] = getOrderDetail.data.scenMsg[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.unreg) {
                    for(let inner in getOrderDetail.data.unreg[0]) {
                        if(outer === inner) {
                            this.orderDetail.unreg[outer] = getOrderDetail.data.unreg[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.tdProducts) {
                    for(let inner in getOrderDetail.data.tdProducts[0]) {
                        if(outer === inner) {
                            this.orderDetail.tdProducts[outer] = getOrderDetail.data.tdProducts[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.unreg2) {
                    for(let inner in getOrderDetail.data.unreg[0]) {
                        if(outer === inner) {
                            this.orderDetail.unreg2[outer] = getOrderDetail.data.unreg[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.tdProducts2) {
                    for(let inner in getOrderDetail.data.tdProducts[0]) {
                        if(outer === inner) {
                            this.orderDetail.tdProducts2[outer] = getOrderDetail.data.tdProducts[0][inner];
                            break;
                        }
                    }
                }
                for(let outer in this.orderDetail.sale) {
                    for(let inner in getOrderDetail.data.sale[0]) {
                        if(outer === inner) {
                            this.orderDetail.sale[outer] = getOrderDetail.data.sale[0][inner];
                            break;
                        }
                    }
                }
                this.orderDetail.order = orderId;
                this.orderDetail.nowDate = this.$handle.formatDate(new Date());
                this.currentIndex = 2;
                this.isShowLoading = false;
            },
            closePage() {
                this.currentIndex = 1;
            }
        }
    }
</script>

<style scoped lang="less">
    .table_wrap {
        overflow: auto;
        table, td {
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