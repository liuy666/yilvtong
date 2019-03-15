<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span v-if="$route.name.indexOf('group') > -1" class="title_span">组合票价格管理</span>
                    <span v-else class="title_span">基础票价格管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @operate="operate"
                            @changeIndex="changeIndex"
                            @refreshData = "refreshData"
                    ></top-btn>
                </p>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增价格</span>
                    <span v-if="currentIndex === 13" class="title_span">修改价格</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :labelWidth = "220"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :btn-loading = "btnLoading"
                        :disabledEnd="disabledEnd"
                        :disabledStartDate = "disabledStartDate"
                        :disabledEndDate = "disabledEndDate"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                        @selectHasChanged = "selectHasChanged"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看价格</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas2"
                        :formItemList="formItemList2"
                        :labelWidth = "180"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
            <Card v-show="currentIndex === 15 || currentIndex === 16">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 15" class="title_span">新增员工销售权限</span>
                    <span v-if="currentIndex === 16" class="title_span">新增窗口销售权限</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :labelWidth = "80"
                        :isClose = "isClose"
                        :btn-loading = "btnLoading"
                        :formDatas = "formDatas_access"
                        :formItemList = "formItemList_access"
                        @getFormData = "getFormData_access"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            const validateListingprice = (rule, value, callback) => {
                const reg = /^\d+(?:\.\d{1,2})?$/;
                if (value === '') {
                    callback(new Error('实际售价必须大于0，可保留两位小数'));
                } else if (!reg.test(value)) {
                    callback(new Error('实际售价必须大于0，可保留两位小数'));
                } else {
                    callback();
                }
            };
            const validateDate = (rule, value, callback) => {
                if (!this.formDatas1.startdata && !this.formDatas1.enddata) {
                    callback(new Error('价格起止日期不能为空'));
                } else if (!this.formDatas1.startdata && this.formDatas1.enddata) {
                    callback(new Error('价格开始日期不能为空'));
                } else if (this.formDatas1.startdata && !this.formDatas1.enddata) {
                    callback(new Error('价格结束日期不能为空'));
                } else if (Date.parse(this.formDatas1.startdata) > Date.parse(this.formDatas1.enddata)) {
                    callback(new Error('价格开始日期不能大于结束日期'));
                } else {
                    callback();
                }
            };
            return {
                searchCount: 1, // 进页面的第一次请求，列表
                currentIndex: 1,
                isClose: false,
                tipName: '',
                spinShow: true,
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
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: ''
                    },
                    {
                        type: 14,
                        btnlabel: '查看'
                    },
                    {
                        type: 15,
                        btnlabel: '分配员工销售权限'
                    },
                    {
                        type: 16,
                        btnlabel: '分配窗口销售权限'
                    },
                    {
                        type: 6,
                        btnlabel: '门票打印设置',
                        icon: 'clipboard',
                        routerName: 'ticket_print_setting',
                        belongRouterName: this.$route.name
                    },
                    {
                        type: 11,
                        btnlabel: '返回上级',
                        icon: 'reply'
                    }
                ],
                currentRowData: {},
                colname: [
                    {
                        title: '价格编码',
                        key: 'icrowdkindpricecode',
                        width: 190
                    },
                    {
                        title: '产品',
                        key: 'sztickettypename',
                        width: 194
                    },
                    {
                        title: '业务',
                        key: 'szbusinessname',
                        width: 120
                    },
                    {
                        title: '人群种类',
                        key: 'szcrowdkindname',
                        width: 100
                    },
                    {
                        title: '价格开始日期',
                        key: 'startdata',
                        width: 120,
                        render: (h, params) => {
                            console.log();
                            if (Date.parse(params.row.enddata) < Date.parse(new Date())) {
                                return h('span', {
                                    style: {
                                        color: 'red'
                                    }
                                }, params.row.startdata);
                            } else {
                                return h('span', params.row.startdata);
                            }
                        }
                    },
                    {
                        title: '价格结束日期',
                        key: 'enddata',
                        width: 120,
                        render: (h, params) => {
                            if (Date.parse(params.row.enddata) < Date.parse(new Date())) {
                                return h('span', {
                                    style: {
                                        color: 'red'
                                    }
                                }, params.row.enddata);
                            } else {
                                return h('span', params.row.enddata);
                            }
                        }
                    },
                    {
                        title: '挂牌价',
                        key: 'listingprice',
                        width: 90
                    },
                    {
                        title: '实际售价',
                        key: 'mactualsaleprice',
                        width: 90
                    },
                    // {
                    //     title: '用户级别',
                    //     key: 'note1',
                    //     width: 90
                    // },
                    {
                        title: '是否网上销售',
                        width: 110,
                        render: (h, parama) => {
                            return h('span', {}, parama.row.isnet ? '是' : '否');
                        }
                    },
                    {
                        title: '是否现场销售',
                        width: 110,
                        render: (h, parama) => {
                            return h('span', {}, parama.row.isscene ? '是' : '否');
                        }
                    },
                    {
                        title: '是否扫码购票',
                        width: 110,
                        render: (h, parama) => {
                            return h('span', {}, parama.row.isscancode ? '是' : '否');
                        }
                    },
                    {
                        title: '排序',
                        width: 90,
                        key: 'isequence'
                    },
                    {
                        title: '是否有效',
                        width: 100,
                        render: (h, parama) => {
                            return h('span', {}, parama.row.byisuse ? '启用' : '禁用');
                        }
                    }
                ],
                tableData: [],
                total: 0,
                loading: false,
                single: 0,
                btnLoading: false,
                pars: {
                    pageNum: 10,
                    pageCode: 1
                },
                urlQuery: {},
                formDatas1: { // 新增修改
                    composePriceJson: []
                },
                ruleDatas: {
                    mactualsaleprice: [
                        { required: true, validator: validateListingprice, trigger: 'blur' }
                    ],
                    startdata: [
                        { validator: validateDate, trigger: 'blur' }
                    ]
                },
                formItemList1: [
                    {
                        type: 1,
                        label: '价格编号',
                        keyName: 'icrowdkindpriceid',
                        disabled: true,
                        noShow: true
                    },
                    {
                        type: 1,
                        label: '所属产品',
                        keyName: 'strtickettype',
                        className: 'input-300',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '价格代码',
                        keyName: 'icrowdkindpricecode',
                        noShow: true,
                        disabled: true
                        // hasDec: '(注：建议输入1至10位由数字或者小大写英文字母组成的值)[此作为前台售票软件的快捷代码]',
                        // isRedDec: true
                    },
                    {
                        type: 4,
                        label: '人群种类',
                        keyName: 'icrowdkindid',
                        optionList: [],
                        cols: 12
                    },
                    {
                        type: 4,
                        label: '业务类型',
                        keyName: 'ibusinessid',
                        optionList: [],
                        cols: 12
                    },
                    {
                        type: 11,
                        label: '价格开始至结束日期',
                        double: true,
                        keyName: 'startdata',
                        keyName1: 'enddata',
                        hasDec: '(日期格式：yyyy-mm-dd,如：2011-10-01)',
                        isRedDec: true,
                        errMsg: ''
                    },
                    {
                        type: 2,
                        label: '是否实名制',
                        keyName: 'ipeoplenumrange',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '是否售票登记指纹',
                        keyName: 'inote1',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            },
                            {
                                value: 2,
                                labelName: '登记在卡内'
                            }
                        ],
                        noShow: true,
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '周末挂牌价',
                        keyName: 'note4',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '挂牌价',
                        keyName: 'listingprice',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '实际售价',
                        keyName: 'mactualsaleprice',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '结算价',
                        keyName: 'jsprice',
                        hasDec: '(注：如果不输入，则与实际售价相同)',
                        isRedDec: true,
                        noShow: true,
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '环球雅途结算价',
                        keyName: 'hqytprice',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '排序',
                        keyName: 'isequence',
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '是否网上销售',
                        keyName: 'isnet',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '是否现场销售',
                        keyName: 'isscene',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '是否扫码购票',
                        keyName: 'isscancode',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ],
                        cols: 12,
                        noShow: false
                    },
                    {
                        type: 2,
                        label: '是否旅游卡购票',
                        keyName: 'note3',
                        optionList: [
                            {
                                value: '1',
                                labelName: '是'
                            },
                            {
                                value: '0',
                                labelName: '否'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '最大有效期是否以价格有效期为准',
                        keyName: 'inote2',
                        hasDec: '(使用于年卡,其它产品慎用)',
                        isRedDec: true,
                        noShow: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '是否允许成团人数控制',
                        keyName: 'inote3',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 4,
                        label: '用户级别',
                        keyName: 'note1',
                        optionList: [],
                        noShow: true
                    },
                    {
                        type: 2,
                        label: '是否启用',
                        keyName: 'byisuse',
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用'
                            },
                            {
                                value: 0,
                                labelName: '禁用'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '语音提示',
                        keyName: 'note2',
                        noShow: true,
                        cols: 12
                    },
                    {
                        type: 7,
                        label: '备注',
                        keyName: 'szmemo'
                    },
                    {
                        type: 21,
                        label: '价格组成',
                        keyName: 'composePriceJson',
                        colname: [
                            {
                                type: 'selection',
                                width: 60,
                                align: 'center'
                            },
                            {
                                title: '服务商',
                                key: 'szscenicname',
                                align: 'center'
                            },
                            {
                                title: '产品名称',
                                key: 'sztickettypename',
                                align: 'center'
                            },
                            {
                                title: '数量',
                                align: 'center',
                                render: (h, params) => {
                                    if (params.row._disabled) {
                                        return h('Input', {
                                            props: {
                                                value: params.row.numb
                                            },
                                            attrs: {
                                                disabled: true
                                            },
                                            style: {
                                                width: '80px'
                                            },
                                            on: { // render无法双向绑定，故用此方法伪双向
                                                input: (val) => {
                                                    params.row.numb = val;
                                                    this.formItemList1[24].tableData[params.index] = params.row;
                                                    this.changeInput(this.formItemList1[24].tableData);
                                                }
                                            }
                                        });
                                    } else {
                                        return h('Input', {
                                            props: {
                                                value: params.row.numb
                                            },
                                            style: {
                                                width: '80px'
                                            },
                                            on: { // render无法双向绑定，故用此方法伪双向
                                                input: (val) => {
                                                    params.row.numb = val;
                                                    this.formItemList1[24].tableData[params.index] = params.row;
                                                    this.changeInput(this.formItemList1[24].tableData);
                                                }
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                title: '价格',
                                align: 'center',
                                render: (h, params) => {
                                    return h('Input', {
                                        props: {
                                            value: params.row.mactualsaleprice
                                        },
                                        style: {
                                            width: '80px'
                                        },
                                        on: { // render无法双向绑定，故用此方法伪双向
                                            input: (val) => {
                                                params.row.mactualsaleprice = val;
                                                this.formItemList1[24].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList1[24].tableData);
                                            }
                                        }
                                    });
                                }
                            },
                            {
                                title: '子产品结算价格',
                                align: 'center',
                                render: (h, params) => {
                                    return h('Input', {
                                        props: {
                                            value: params.row.jsprice
                                        },
                                        style: {
                                            width: '80px'
                                        },
                                        on: { // render无法双向绑定，故用此方法伪双向
                                            input: (val) => {
                                                params.row.jsprice = val;
                                                this.formItemList1[24].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList1[24].tableData);
                                            }
                                        }
                                    });
                                }
                            }
                        ],
                        tableData: [],
                        height: '',
                        noshow: true
                    }
                ], // 新增修改
                disabledEnd: 0,
                disabledStartDate: [0, 9999],
                disabledEndDate: [0, 9999],
                // status: 0,
                formDatas2: {}, // 查看
                formItemList2: [
                    {
                        label: '价格编号',
                        keyName: 'icrowdkindpriceid'
                    },
                    {
                        label: '所属产品',
                        keyName: 'strtickettype',
                        cols: 12
                    },
                    {
                        label: '价格代码',
                        keyName: 'icrowdkindpricecode',
                        cols: 12
                    },
                    {
                        label: '人群种类',
                        keyName: 'strcrowdkind',
                        cols: 12
                    },
                    {
                        label: '业务类型',
                        keyName: 'strbusiness',
                        cols: 12
                    },
                    {
                        label: '价格开始日期',
                        keyName: 'startdata',
                        cols: 12
                    },
                    {
                        label: '价格结束日期',
                        keyName: 'enddata',
                        cols: 12
                    },
                    {
                        label: '是否实名制',
                        keyName: 'ipeoplenumrange',
                        cols: 12
                    },
                    {
                        label: '挂牌价',
                        keyName: 'listingprice',
                        cols: 12
                    },
                    {
                        label: '实际售价',
                        keyName: 'mactualsaleprice',
                        cols: 12
                    },
                    {
                        label: '环球雅途结算价',
                        keyName: 'hqytprice',
                        cols: 12
                    },
                    {
                        label: '排序',
                        keyName: 'isequence',
                        cols: 12
                    },
                    {
                        label: '是否启用',
                        keyName: 'byisuse',
                        cols: 12
                    },
                    {
                        label: '是否网上销售',
                        keyName: 'isnet',
                        cols: 12
                    },
                    {
                        label: '是否现场销售',
                        keyName: 'isscene',
                        cols: 12
                    },
                    {
                        label: '是否扫码购票',
                        keyName: 'isscancode',
                        cols: 12
                    },
                    {
                        label: '是否旅游卡购票',
                        keyName: 'note3',
                        cols: 12
                    },
                    {
                        label: '是否允许成团人数控制',
                        keyName: 'inote3',
                        cols: 12
                    },
                    {
                        label: '用户级别',
                        keyName: 'note1',
                        cols: 12,
                        noShow: true
                    },
                    {
                        label: '语音提示',
                        keyName: 'note2'
                    },
                    {
                        label: '备注',
                        keyName: 'szmemo'
                    },
                    {
                        label: '价格组成',
                        keyName: 'composePriceJson',
                        colname: [
                            {
                                title: '服务商',
                                key: 'szscenicname',
                                align: 'center'
                            },
                            {
                                title: '产品名称',
                                key: 'sztickettypename',
                                align: 'center'
                            },
                            {
                                title: '数量',
                                key: 'numb',
                                align: 'center'
                            },
                            {
                                title: '价格',
                                key: 'mactualsaleprice',
                                align: 'center'
                            },
                            {
                                title: '子产品结算价格',
                                key: 'jsprice',
                                align: 'center'
                            }
                        ],
                        tableData: [],
                        noShow: true,
                        table: true,
                        showElement: true
                    }
                ], // 查看
                // 员工权限/窗口权限
                formDatas_access: {},
                formItemList_access: [
                    {
                        type: 9,
                        label: '产品信息',
                        keyName: 'productMsg'
                    },
                    {
                        type: 20,
                        label: '',
                        keyName: '',
                        indeterminate: false,
                        checkAll: false,
                        optionList: []
                    }
                ]
            };
        },
        methods: {
            // 点击新增修改查看按钮跳到对应页面
            changeIndex (type, icon) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '价格新增';
                    this.tabShowOrHide(0, true);
                    this.tabShowOrHide(2, true);
                    this.setAddInitData(type);
                } else if (type === 13) {
                    this.tipName = '价格修改';
                    this.tabShowOrHide(0, false);
                    this.tabShowOrHide(2, false);
                    this.setEditInitData(type);
                } else if (type === 14) {
                    this.setViewInitData(type);
                } else if (type === 15) {
                    this.tipName = '员工销售权限新增';
                    this.setAccessInitData(type);
                } else if (type === 16) {
                    this.tipName = '窗口销售权限新增';
                    this.setAccessInitData(type);
                }
            },
            // 选中某一行
            selected (row) {
                this.currentRowData['id'] = row.icrowdkindpriceid;
                this.currentRowData['name'] = 'icrowdkindpriceid';
                this.currentRowData['sztickettypename'] = row.sztickettypename;
                this.currentRowData['szbusinessname'] = row.szbusinessname;
                this.currentRowData['szcrowdkindname'] = row.szcrowdkindname;
                this.btnList[3].url = `${this.baseUrl}/ticket/crowdKindPrice/v1/crowdKindPriceDel?iCrowdKindPriceId=${row.icrowdkindpriceid}`;
            },
            // 选择页码
            changePage (pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get');
            },
            // 选择每页条数
            changePageSize (pageSize) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get');
            },
            // 删除后更新数据
            refreshData () {
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get');
            },
            // 执行删除时如当页只有一条数据
            isSingle (page) {
                this.single = page;
            },
            // 需要拼接的url后面的参数
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    itickettypeid: this.$route.params.id
                };
            },
            // 返回上一级
            operate (type) {
                if (type === 11) {
                    // let name = '';
                    // const companytype = JSON.parse(sessionStorage.getItem('companytype'));
                    const routeName = this.$route.name;
                    // if (companytype === '01') {
                    //     if (routeName === 'baseprice_management') {
                    //         name = 'base-ticket'
                    //     } else {
                    //         name = 'group-ticket'
                    //     }
                    // } else if (companytype === '02') {
                    //     if (routeName === 'baseprice_management') {
                    //         name = 'base-product'
                    //     } else {
                    //         name = 'group-product'
                    //     }
                    // }
                    let pageOpenedList = this.$store.state.app.pageOpenedList;
                    for (let i = 0; i < pageOpenedList.length; i++) {
                        if (pageOpenedList[i].name === routeName) {
                            this.$store.commit('removeTag', routeName);
                            this.$store.commit('closePage', routeName);
                            pageOpenedList = this.$store.state.app.pageOpenedList;
                            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                            this.$router.go(-1);
                            break;
                        }
                    }
                }
            },
            // //新增修改页表单验证
            // formValidation (obj) {   //表单中自定义组件的验证
            //     if (new Date(obj.startdata).getTime() > new Date(obj.enddata).getTime()) {
            //         this.formItemList1[5].errMsg = '开始日期不能大于结束日期';
            //         return
            //     } else {
            //         this.formItemList1[5].errMsg = ''
            //     }
            //     this.status = 1
            // },
            // 新增修改保存
            async getFormDataAdd (obj) {
                // this.formValidation(obj);
                let data = JSON.parse(JSON.stringify(obj));
                data.startdata = this.$common.getCurrentDate(data.startdata);
                data.enddata = this.$common.getCurrentDate(data.enddata);
                data.composePriceJson = JSON.stringify(data.composePriceJson);
                this.btnLoading = true;
                let aaa = '';
                if (this.currentIndex === 12) {
                    aaa = await this.$common.addNewData('/ticket/crowdKindPrice/v1/crowdKindPriceSave?act=1', this, data, 'post', true);
                } else if (this.currentIndex === 13) {
                    aaa = await this.$common.editData('/ticket/crowdKindPrice/v1/crowdKindPriceSave?act=2', this, data, 'post', true);
                }
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get');
                }
            },
            // 初始化新增页面
            async setAddInitData (type) {
                await this.getInitSelect();
                if (!this.formItemList1[24].noShow) {
                    await this.groupTableInit();
                }
                this.formDatas1 = {
                    itickettypeid: this.$route.params.id,
                    strtickettype: this.$route.params.ticket,
                    // icrowdkindpricecode: 'T03',
                    icrowdkindid: this.formItemList1[3].optionList[0].value,
                    ibusinessid: this.formItemList1[4].optionList[0].value,
                    note1: this.formItemList1[20].optionList[0].value,
                    startdata: this.$common.getCurrentDate(),
                    enddata: this.$common.getCurrentDate('', 1),
                    ipeoplenumrange: 0,
                    inote1: 0,
                    listingprice: '',
                    mactualsaleprice: '0.0',
                    jsprice: '0.0',
                    weekendprice: '0.0',
                    isequence: 0,
                    isnet: 1,
                    isscene: 1,
                    isscancode: 0,
                    note3: '0',
                    inote3: 0,
                    byisuse: 1
                };
                this.spinShow = false;
                this.currentIndex = type;
            },
            // 初始化修改页面
            async setEditInitData (type) {
                await this.getInitSelect();
                if (!this.formItemList1[24].noShow) {
                    await this.groupTableInit(1);
                }
                this.$http.get(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceEditInitData', {
                    params: {
                        access_token: this.Cookies.get('token'),
                        iCrowdKindPriceid: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let table = JSON.parse(JSON.stringify(this.formItemList1[24].tableData));
                        this.formDatas1 = res.data.data;
                        this.$set(this.formDatas1, 'composePriceJson', table);
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                });
            },
            // 初始化查看页面
            async setViewInitData (type) {
                if (!this.formItemList2[21].noShow) {
                    await this.groupTableInit(1, 1);
                }
                this.$http.get(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceView', {
                    params: {
                        access_token: this.Cookies.get('token'),
                        iCrowdKindPriceId: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.byisuse = data.byisuse ? '启用' : '禁用';
                        data.ipeoplenumrange = data.ipeoplenumrange ? '是' : '否';
                        data.isnet = data.isnet ? '是' : '否';
                        data.isscene = data.isscene ? '是' : '否';
                        data.isscancode = data.isscancode ? '是' : '否';
                        data.note3 = data.note3 === 1 ? '是' : '否';
                        data.inote3 = data.inote3 ? '是' : '否';
                        this.formDatas2 = data;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                });
            },
            // 新增修改组件的显示与否,布尔,true为不显示
            tabShowOrHide (index, noShow) { // 组件显示与否
                this.formItemList1[index].noShow = noShow;
            },
            // 初始化下拉列表
            getInitSelect () { // 初始化下拉列表
                if (!this.formItemList1[3].optionList.length) {
                    return new Promise((resolve, reject) => {
                        this.$http.get(this.baseUrl + '/ticket/crowdKindPrice/v1/getCrowdKindPriceSelectData', {
                            params: {
                                access_token: this.Cookies.get('token')
                            }
                        }).then(res => {
                            if (res.data.code === 200) {
                                let data = res.data.data;
                                let [a, b, c] = ['', '', ''];
                                for (let i = 0; i < this.formItemList1.length; i++) {
                                    switch (this.formItemList1[i].keyName) {
                                        case 'icrowdkindid':
                                            a = i; break;
                                        case 'ibusinessid':
                                            b = i; break;
                                        case 'note1':
                                            c = i; break;
                                        default: break;
                                    }
                                }
                                data['crowdkindList'].forEach(item => {
                                    this.formItemList1[a].optionList.push({
                                        value: item.icrowdkindid,
                                        label: item.szcrowdkindname
                                    });
                                });
                                data['businessList'].forEach(item => {
                                    this.formItemList1[b].optionList.push({
                                        value: item.ibusinessid,
                                        label: item.szbusinessname
                                    });
                                });
                                data['retrieve'].forEach(item => {
                                    this.formItemList1[c].optionList.push({
                                        value: item.pmcd,
                                        label: item.pmva
                                    });
                                });
                                resolve();
                            } else {
                                this.$common.showMessageModal(this, res, 1);
                                this.spinShow = false;
                                reject();
                            }
                        });
                    });
                }
            },
            // 组合票价格管理表格初始化
            async groupTableInit (isEdit, isView) {
                let obj = {
                    access_token: this.Cookies.get('token'),
                    ticketTypeId: this.$route.params.id
                };
                if (isEdit) {
                    obj.crowdkindPriceId = this.currentRowData.id;
                }
                return new Promise(resolve => {
                    this.$http.get(`${this.baseUrl}/ticket/crowdKindPrice/v1/getComposepriceListForAddAndUpdate`, {
                        params: obj
                    }).then(res => {
                        if (res.data.code === 200) {
                            if (isView) {
                                this.formItemList2[21].tableData = res.data.data;
                            } else {
                                let height = res.data.data.length * 48 + 40;
                                this.formItemList1[24].tableData = res.data.data;
                                this.formItemList1[24].height = height > 280 ? 280 : height;
                                if (isEdit) { // 修改页面禁止多选表格
                                    // this.formItemList1[24].colname[0]._disabled = true;
                                    this.formItemList1[24].tableData.map(item => {
                                        item.ischecked = true;
                                        item._checked = true;
                                        item._disabled = true;
                                    });
                                }
                            }
                            resolve();
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            this.spinShow = false;
                        }
                    });
                });
            },
            // 多选表格选中项一旦发生变化
            selectHasChanged (arr) {
                let table = JSON.parse(JSON.stringify(this.formItemList1[24].tableData));
                for (let obj of table) {
                    obj.ischecked = false;
                    obj._checked = false;
                }
                if (arr.length > 0) {
                    for (let item of arr) {
                        item.ischecked = true;
                        item._checked = true;
                        for (let obj of table) {
                            if (item.itickettypeid === obj.itickettypeid) {
                                obj.ischecked = true;
                                obj._checked = true;
                            }
                        }
                    }
                }
                this.formItemList1[24].tableData = table;
                this.formDatas1.composePriceJson = arr;
            },
            // 子产品输入框值改变，更新选中行的数据
            changeInput (data) {
                let arr = [];
                for (let item of data) {
                    if (item.ischecked) {
                        item['_checked'] = true;
                        arr.push(item);
                    } else {
                        item['_checked'] = false;
                    }
                }
                this.formDatas1.composePriceJson = arr;
            },
            // 新增员工/窗口销售权限初始化
            async setAccessInitData (type) {
                this.formDatas_access = {};
                this.formItemList_access[1].optionList = [];
                const data = this.currentRowData;
                let productMsg = `${data.sztickettypename}-${data.szbusinessname}-${data.szcrowdkindname}`;
                this.$set(this.formDatas_access, 'icrowdkindpriceid', this.currentRowData.id);
                this.$set(this.formDatas_access, 'productMsg', productMsg);
                if (type === 15) {
                    this.formItemList_access[1].keyName = 'iempids';
                    const url = this.baseUrl + '/ticket/crowdKindPrice/v1/crowPriceAddsalelimitsPage';
                    this.getAccessList(url, type, 'iemployeeid', 'stremployee', 'iempids', 'iempTemp');
                } else if (type === 16) {
                    this.formItemList_access[1].keyName = 'iwinids';
                    const url = this.baseUrl + '/ticket/crowdKindPrice/v1/crowPricePerformAddWinsale';
                    this.getAccessList(url, type, 'iticketwinid', 'strticketwin', 'iwinids', 'iwinTemp');
                }
            },
            // 获取权限列表
            getAccessList (url, type, value, labelName, keyName, select) {
                this.$http.get(url, {
                    params: {
                        access_token: this.Cookies.get('token'),
                        icrowdkindpriceid: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        let arr = [];
                        data.map(item => {
                            this.formItemList_access[1].optionList.push({
                                value: item[value],
                                labelName: item[labelName]
                            });
                            if (item[select]) {
                                arr.push(item[value]);
                            }
                        });
                        this.$set(this.formDatas_access, keyName, arr);
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                });
            },
            // 保存新增员工/窗口销售权限
            async getFormData_access (obj) {
                this.btnLoading = true;
                obj = JSON.parse(JSON.stringify(obj));
                delete obj.productMsg;
                let aaa = '';
                if (this.currentIndex === 15) {
                    this.$common.addNewData('/ticket/crowdKindPrice/v1/crowPriceAddsalelimits', this, obj);
                } else if (this.currentIndex === 16) {
                    this.$common.addNewData('/ticket/crowdKindPrice/v1/crowPriceSaveWinlimit', this, obj);
                }
            },
            // 关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1;
            }
        },
        created () {
            if (this.$route.name.indexOf('base') > -1) {
                // this.formItemList1[16].noShow = false;
                this.formItemList1[24].noShow = true;
                this.formItemList2[21].noShow = true;
            } else {
                // this.formItemList1[16].noShow = true;
                this.formItemList1[24].noShow = false;
                this.formItemList2[21].noShow = false;
            }
            this.$common.currentPageData(this.baseUrl + '/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get');
            this.currentRowData['parentId'] = `${this.$route.params.id}-${this.$route.params.ticket}`;
        },
        watch: {
            '$route' (to) {
                if (to.name === 'baseprice_management') {
                    this.formItemList1[24].noShow = true;
                    // this.formItemList1[16].noShow = false;
                    this.formItemList2[21].noShow = true;
                } else {
                    this.formItemList1[24].noShow = false;
                    // this.formItemList1[16].noShow = true;
                    this.formItemList2[21].noShow = false;
                }
            },
            'formDatas1.startdata' (val) {
                this.disabledEnd = Date.parse(val);
                this.disabledEndDate = [-1, 99999];
            }
        }
    };
</script>

<style scoped>

</style>
