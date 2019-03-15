<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">组合票</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth = "20"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                        @listPageSelectedChange = "listPageSelectedChange"
                ></detail-form1>
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
                <p slot="title" style="height:32px;">
                    <span v-if="currentIndex === 12" style="display:inline-block;float:left;line-height:32px;">新增组合票</span>
                    <span v-if="currentIndex === 13" style="display:inline-block;float:left;line-height:32px;">修改组合票</span>
                </p>
                <detail-form1
                        ref="groupTicket"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "180"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :btn-loading = "btnLoading"
                        @getFormData = "getFormDataAdd"
                        @addOrsubtractRow = "addOrsubtractRow"
                        @handleMove = "handleMove"
                        @getUploadList="getUploadList"
                        @handleImgRemove="handleImgRemove"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">查看组合票</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas2"
                        :formItemList="formItemList2"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
            <Card v-show="currentIndex === 15">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">二维码</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_code"
                        :formItemList="formItemList_code"
                        :isDownload="true"
                        @downloadCode="downloadCode"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
            <Card v-show="currentIndex === 16">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">管理票务产品属性</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_manage"
                        :ruleDatas = "ruleDatas_manage"
                        :labelWidth = "180"
                        :formItemList = "formItemList_manage"
                        :isClose = "isClose"
                        :btn-loading = "btnLoading"
                        @getFormData = "getFormDataManage"
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
            // const validateSztickettypecode = (rule, value, callback) => {
            //     const reg = /^([A-Z0-9]{3})$/;
            //     if (!value) {
            //         let str = '产品编码不能为空';
            //         callback(new Error(str))
            //     } else if (!reg.test(value)) {
            //         let str = '产品编码格式错误，只能输入由数字或大写英文字母组成的3位字符';
            //         callback(new Error(str))
            //     } else {
            //         callback();
            //     }
            // };
            const validateImgList = (rule, value, callback) => {
                if (!this.formDatas1.imgList.length) {
                    this.$common.showMessageModal(this, '请上传至少一张图片', 2)
                } else {
                    callback();
                }
            };
            return {
                searchCount: 1,   //进页面的第一次请求
                currentIndex: 1,
                isClose: false,
                tipName: '',
                spinShow: true,
                btnLoading: false,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 12,
                        btnlabel: '新增',
                    },
                    {
                        type: 13,
                        btnlabel: '修改',
                    },
                    {
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: '',
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    },
                    {
                        type: 6,
                        btnlabel: '价格管理',
                        icon: 'clipboard',
                        routerName: 'groupprice_management',
                        belongRouterName: this.$route.name
                    }
                ],
                currentRowData: {},
                formItemList: [
                    {
                        type: 4,
                        keyName: 'iscenicid',
                        label: '服务商',
                        labelWidth: 80,
                        optionList:[],
                        selectEvent: true
                    },
                    {
                        type: 4,
                        keyName: 'itickettypeid',
                        label: '产品名称',
                        labelWidth: 80,
                        optionList:[],
                    },
                    {
                        type: 1,
                        keyName: 'searchkey',
                        label: '产品名称模糊查询',
                        labelWidth: 140,
                        placeholder: '请输入产品名称包含字符'
                    },
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'itickettypeid',
                        width: 80
                    },
                    {
                        title: '产品名称',
                        key: 'sztickettypename',
                        width: 250
                    },
                    {
                        title: '类别',
                        key: 'strbycategorytype',
                        width: 100
                    },
                    {
                        title: '有效天数',
                        key: 'validityday',
                        width: 100
                    },
                    {
                        title: '操作',
                        width: 320,
                        render: (h, params) => {
                            return h('span',[
                                h('span', {
                                    'class': {
                                        hover_span: true
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'groupprice_management',
                                                params: {
                                                    id: params.row.itickettypeid,
                                                    ticket: params.row.sztickettypename
                                                }
                                            })
                                        }
                                    }
                                }, '价格管理'),
                                h('span', {
                                    'class': {
                                        hover_span: true
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeIndex(16,params.row.itickettypeid,params.row.sztickettypename);
                                        }
                                    }
                                }, '管理票务产品属性'),
                                h('span', {
                                    'class': {
                                        hover_span: true
                                    },
                                    on: {
                                        click: () => {
                                            this.changeIndex(15,params.row.itickettypeid,params.row.sztickettypename)
                                        }
                                    }
                                }, '二维码生成')
                                // h('span', {
                                //     'class': {
                                //         hover_span: true
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.$router.push({
                                //                 name: 'qr_code_generate',
                                //                 params: {
                                //                     id: params.row.itickettypeid,
                                //                     parentId: this.currentRowData.parentId
                                //                 }
                                //             })
                                //         }
                                //     }
                                // }, '二维码生成')
                            ])
                        }
                    },
                    {
                        title: '出票方式',
                        key: 'strticketway',
                        width: 100
                    },
                    {
                        title: '出票类型',
                        width: 100,
                        render: (h, params) => {
                            return h('span',{},params.row.byusage ? '一票多人' : '一票一人');
                        }
                    },
                    {
                        title: '介质类型',
                        key: 'strmediatype',
                        width: 100
                    },
                    {
                        title: '是否参与入园统计',
                        width: 150,
                        render: (h, params) => {
                            return h('span',{},params.row.bispersontimestat ? '是' : '否');
                        }
                    },
                    {
                        title: '排序',
                        key: 'isequence',
                        width: 100
                    },
                    {
                        title: '是否有效',
                        width: 144,
                        render: (h, params) => {
                            return h('span',{},params.row.byisuse ? '启用' : '禁用');
                        }
                    },
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    formDatas:{},
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                uploadImgList: [],
                formDatas1: {
                    timestock: [
                        {
                            'time_start': '',
                            'time_end': '',
                            'stock': ''
                        }
                    ]
                },
                ruleDatas: {
                    // sztickettypecode: [
                    //     {  required: true, validator: validateSztickettypecode, trigger: 'blur' }
                    // ],
                    sztickettypename: [
                        {  required: true, message: '产品名称不能为空', trigger: 'blur' }
                    ],
                    mnominalfee: [
                        {  required: true, message: '工本费不能为空', trigger: 'blur' }
                    ],
                    validityday: [
                        {  required: true, message: '有效天数不能为空', trigger: 'blur' }
                    ],
                    imgList: [
                        { required: true, validator: validateImgList, trigger: 'blur' }
                    ],
                },
                formItemList1: [
                    {
                        type: 1,
                        label: '服务商名称',
                        disabled: true,
                        keyName: 'szscenicname'
                    },
                    {
                        type: 1,
                        label: '产品编号',
                        disabled: true,
                        keyName: 'itickettypeid',
                        noShow: true,
                        cols: 12,
                    },
                    {
                        type: 1,
                        label: 'IC卡代码',
                        keyName: 'icid',
                        disabled: true,
                        noShow: true,
                        cols: 12,
                    },
                    {
                        type: 1,
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        cols: 12,
                    },
                    {
                        type: 4,
                        label: '产品类别',
                        keyName: 'bycategorytype',
                        optionList: [],
                        cols: 12,
                    },
                    {
                        type: 1,
                        label: '产品编码',
                        keyName: 'sztickettypecode',
                        // hasDec: '(注：输入三位由数字或者大写英文字母组成的编码)',
                        isRedDec: true,
                        noShow: true,
                        disabled: true,
                        cols: 12,
                    },
                    {
                        type: 4,
                        label: '出票类型',
                        keyName: 'byusage',
                        cols: 12,
                        optionList: [
                            {
                                value: 0,
                                label: '一票一人'
                            },
                            {
                                value: 1,
                                label: '一票多人'
                            },
                        ]
                    },
                    {
                        type: 4,
                        label: '使用方式',
                        keyName: 'byuselimit',
                        cols: 12,
                        optionList: [
                            {
                                value: 0,
                                label: '一次性'
                            },
                            {
                                value: 1,
                                label: '长期性'
                            },
                        ]
                    },
                    {
                        type: 4,
                        label: '出票方式',
                        keyName: 'bymaketicketway',
                        cols: 12,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '介质类型',
                        keyName: 'bymediatype',
                        cols: 12,
                        optionList: []
                    },
                    {
                        type: 1,
                        label: '工本费',
                        keyName: 'mnominalfee',
                        cols: 12,
                    },
                    {
                        type: 16,
                        label: '使用有效期',
                        textConBefore: '游玩日期起',
                        textConAfter: '天内有效',
                        keyName: 'validityday',
                        width: '50px',
                        hasDec: '（若填1天内有效则表示游玩当天有效）',
                        cols: 12,
                    },
                    {
                        type: 1,
                        label: '排序',
                        cols: 12,
                        keyName: 'isequence'
                    },
                    {
                        type: 1,
                        label: '印刷代码',
                        disabled: true,
                        keyName: 'szticketprintcode',
                        noShow: true,
                        cols: 12,
                    },
                    {
                        type: 2,
                        label: '是否参与入园统计',
                        keyName: 'bispersontimestat',
                        cols: 12,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },

                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '以出票时开始计算有效时间',
                        keyName: 'int1',
                        cols: 12,
                        noShow: true,
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },

                            {
                                value: 0,
                                labelName: '否'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '是否启用',
                        keyName: 'byisuse',
                        cols: 12,
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用'
                            },
                            {
                                value: 0,
                                labelName: '禁用'
                            },
                        ]
                    },
                    {
                        type: 18,
                        label: '上传图片列表',
                        keyName: 'imgList',
                        keyName1: 'upids',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        uploadDec: ' 推荐图片尺寸400px * 300px，最大可上传5M的文件'
                    },
                    {
                        type: 7,
                        label: '备注',
                        keyName: 'szmemo',
                    },
                    // {
                    //     type: 2,
                    //     label: '是否允许分时预约',
                    //     keyName: 'int3',
                    //     hasDec: '温馨提示：以下分时预约相关设置请谨慎修改',
                    //     isRedDec: true,
                    //     optionList: [
                    //         {
                    //             value: 1,
                    //             labelName: '是'
                    //         },
                    //         {
                    //             value: 0,
                    //             labelName: '否'
                    //         },
                    //     ]
                    // },
                    // {
                    //     type: 11,
                    //     label: '分时预约日期',
                    //     double: true,
                    //     keyName: 'note3',
                    //     keyName1: 'note4',
                    //     noShow: true
                    //
                    // },
                    // {
                    //     type: 9,
                    //     label: '温馨提示',
                    //     keyName: '',
                    //     hasDec: '【分时预约】建议以30分钟或1小时为间隔 【库存】输入-1表示不限量',
                    //     isRedDec: true,
                    //     noShow: true
                    // },
                    // {
                    //     type: 17,
                    //     label: '入园时段',
                    //     keyName: 'timestock',
                    //     noShow: true,
                    //     colList: [
                    //         {
                    //             inputList:[
                    //                 {
                    //                     type: 2,
                    //                     label:'开始时间(含)',
                    //                     keyName: 'time_start',
                    //                     format: 'HH:mm'
                    //                 },
                    //                 {
                    //                     type: 2,
                    //                     label:'结束时间(不含)',
                    //                     keyName: 'time_end',
                    //                     format: 'HH:mm'
                    //                 },
                    //                 {
                    //                     type: 1,
                    //                     label:'库存',
                    //                     keyName: 'stock'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }
                ],
                formDatas2: {},
                formItemList2: [
                    {
                        label: '景区名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '产品编号',
                        keyName: 'itickettypeid',
                        cols: 12
                    },
                    {
                        label: 'IC卡代码',
                        keyName: 'icid',
                        cols: 12
                    },
                    {
                        label: '产品编码',
                        keyName: 'sztickettypecode',
                        cols: 12
                    },
                    {
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        cols: 12
                    },
                    {
                        label: '产品类别',
                        keyName: 'strbycategorytype',
                        cols: 12
                    },
                    {
                        label: '票号规则',
                        keyName: 'strticketrule',
                        cols: 12
                    },
                    {
                        label: '出票类型',
                        keyName: 'byusage',
                        cols: 12
                    },
                    {
                        label: '使用限制',
                        keyName: 'byuselimit',
                        cols: 12
                    },
                    {
                        label: '出票方式',
                        keyName: 'strticketway',
                        cols: 12
                    },
                    {
                        label: '介质类型',
                        keyName: 'strmediatype',
                        cols: 12
                    },
                    {
                        label: '印刷代码',
                        keyName: 'szticketprintcode',
                        cols: 12
                    },
                    {
                        label: '有效天数',
                        keyName: 'validityday',
                        cols: 12
                    },
                    {
                        label: '工本费',
                        keyName: 'mnominalfee',
                        cols: 12
                    },
                    {
                        label: '是否参与入园统计',
                        keyName: 'bispersontimestat',
                        cols: 12
                    },
                    {
                        label: '是否启用',
                        keyName: 'byisuse'
                    },
                    {
                        label: '备注',
                        keyName: 'szmemo'
                    },
                    {
                        label: '是否启用分时预约',
                        keyName: 'int3'
                    }
                ],
                formDatas_code: {},
                formItemList_code: [
                    {
                        label: '景区名称',
                        keyName: 'providername'
                    },
                    {
                        label: '产品名称',
                        keyName: 'ticketname'
                    },
                    {
                        label: '链接地址',
                        keyName: 'content'
                    },
                    {
                        label: '二维码',
                        keyName: 'qrcode',
                        showElement: true,
                        qrCode: true,
                        value: '',//显示的值、跳转的地址
                        size: 250   //中间logo的地址
                    },
                ],
                //----------------
                formDatas_manage: {},
                ruleDatas_manage: {
                    inoteger3: [
                         { required: true, validator: this.$reg.IsNumber, trigger: 'blur' }
                    ]
                },
                formItemList_manage: [
                    {
                        type: 1,
                        label: '景区名称',
                        keyName: 'szscenicname',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        className: 'input-300',
                        disabled: true,
                    },
                    {
                        type: 2,
                        label: '是否首次检票激活',
                        keyName: 'inoteger2',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 1,
                        label: '首次检票间隔时间(分钟)',
                        keyName: 'inoteger3',
                        hasDec: '注：0为不限制',
                        isRedDec: true
                    },
                    {
                        type: 2,
                        label: '指纹登记类型',
                        keyName: 'iszhiwen',
                        optionList: [
                            {
                                value: 0,
                                labelName: '不登记指纹'
                            },
                            {
                                value: 1,
                                labelName: '登记指纹'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否允许自定义价格',
                        keyName: 'inoteger4',
                        optionList: [
                            {
                                value: 0,
                                labelName: '不允许'
                            },
                            {
                                value: 1,
                                labelName: '允许,可随意修改'
                            },
                            {
                                value: 2,
                                labelName: '允许价格增加'
                            },
                            {
                                value: 3,
                                labelName: '允许价格减少'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否为精选打折票',
                        keyName: 'inoteger5',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '套票下的子票是否同时有效入园',
                        keyName: 'noted5',
                        optionList: [
                            {
                                value: '1',
                                labelName: '是'
                            },
                            {
                                value: '0',
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否限时控制',
                        keyName: 'choosetype',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 4,
                        label: '开始时间',
                        keyName: 'dtstartdate',
                        optionList: [
                            { value: '00:00', label: '00:00' },{ value: '6:00', label: '6:00' },
                            { value: '7:00', label: '7:00' },{ value: '7:30', label: '7:30' },
                            { value: '8:00', label: '8:00' },{ value: '8:30', label: '8:30' },
                            { value: '9:00', label: '9:00' },{ value: '9:30', label: '9:30' },
                            { value: '10:00', label: '10:00' },{ value: '10:30', label: '10:30' },
                            { value: '11:00', label: '11:00' },{ value: '11:30', label: '11:30' },
                            { value: '12:00', label: '12:00' },{ value: '12:30', label: '12:30' },
                            { value: '13:00', label: '13:00' },{ value: '13:30', label: '13:30' },
                            { value: '14:00', label: '14:00' },{ value: '14:30', label: '14:30' },
                            { value: '15:00', label: '15:00' },{ value: '15:30', label: '15:30' },
                            { value: '16:00', label: '16:00' },{ value: '16:30', label: '16:30' },
                            { value: '17:00', label: '17:00' },{ value: '17:30', label: '17:30' },
                            { value: '18:00', label: '18:00' },{ value: '18:30', label: '18:30' },
                            { value: '19:00', label: '19:00' },{ value: '19:30', label: '19:30' },
                            { value: '20:00', label: '20:00' },{ value: '20:30', label: '20:30' },
                            { value: '21:00', label: '21:00' },{ value: '24:00', label: '24:00' },
                        ]
                    },
                    {
                        type: 4,
                        label: '结束时间',
                        keyName: 'dtenddate',
                        optionList: [
                            { value: '00:00', label: '00:00' },{ value: '6:00', label: '6:00' },
                            { value: '7:00', label: '7:00' },{ value: '7:30', label: '7:30' },
                            { value: '8:00', label: '8:00' },{ value: '8:30', label: '8:30' },
                            { value: '9:00', label: '9:00' },{ value: '9:30', label: '9:30' },
                            { value: '10:00', label: '10:00' },{ value: '10:30', label: '10:30' },
                            { value: '11:00', label: '11:00' },{ value: '11:30', label: '11:30' },
                            { value: '12:00', label: '12:00' },{ value: '12:30', label: '12:30' },
                            { value: '13:00', label: '13:00' },{ value: '13:30', label: '13:30' },
                            { value: '14:00', label: '14:00' },{ value: '14:30', label: '14:30' },
                            { value: '15:00', label: '15:00' },{ value: '15:30', label: '15:30' },
                            { value: '16:00', label: '16:00' },{ value: '16:30', label: '16:30' },
                            { value: '17:00', label: '17:00' },{ value: '17:30', label: '17:30' },
                            { value: '18:00', label: '18:00' },{ value: '18:30', label: '18:30' },
                            { value: '19:00', label: '19:00' },{ value: '19:30', label: '19:30' },
                            { value: '20:00', label: '20:00' },{ value: '20:30', label: '20:30' },
                            { value: '21:00', label: '21:00' },{ value: '24:00', label: '24:00' },
                        ]
                    },
                    {
                        type: 2,
                        label: '按日控制',
                        keyName: 'iskz',
                        optionList: [
                            {
                                value: '1',
                                labelName: '按星期控制'
                            },
                            {
                                value: '0',
                                labelName: '不控制'
                            }
                        ]
                    },
                    {
                        type: 16,
                        label: '控制星期',
                        keyName: 'kzdate',
                        textConBefore: '星期',
                        isRequired: true,
                        hasDec: '(格式：星期一，星期二，星期三可写成 1#2#3)',
                        isRedDec: true
                    }
                ],
                szscenicname: ''
            }
        },
        methods:{
            //点击新增修改查看按钮跳到对应页面
            async changeIndex (type,id,name) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '组合票新增';
                    this.tabShowOrHide(true);
                    await this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '组合票修改';
                    this.tabShowOrHide(false);
                    await this.setEditInitData(type)
                } else if (type === 14) {
                    this.spinShow = true;
                    await this.setViewInitData(type)
                } else if (type === 15) {
                    this.setCodeInitData(type,id,name);
                } else if (type === 16) {
                    this.tipName = '票务产品属性保存';
                    this.setManageInitData(type,id,name);
                }
            },
            //选中某一行
            selected (row) {
                this.currentRowData["id"] = row.itickettypeid;
                this.currentRowData["name"] = 'itickettypeid';
                this.currentRowData["ticket"] = row.sztickettypename;  //门票名
                this.btnList[3].url = `${this.baseUrl}/ticket/ticket/v1/deleteProduct?itickettypeid=${row.itickettypeid}`
            },
            //选择页码
            changePage(pageCode) {
                this.$common.getParsBeforeSearch(this);
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/ticket/combinationTicket/v1/combinationProductViewList', this, 'get')
            },
            //选择每页条数
            changePageSize(pageSize){
                this.$common.getParsBeforeSearch(this);
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/ticket/combinationTicket/v1/combinationProductViewList', this, 'get')
            },
            //条件查询
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/combinationTicket/v1/combinationProductViewList', this, 'get')
            },
            //查询条件重置
            clearFormData(){
                this.pars.formDatas = {
                    itickettypeid: 0,
                    iscenicid: this.formItemList[0].optionList[0].value
                }
            },
            //删除后更新数据
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/combinationTicket/v1/combinationProductViewList', this, 'get')
            },
            //执行删除时如当页只有一条数据
            isSingle(page){
                this.single = page
            },
            //需要拼接的url后面的参数
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    iscenicId: this.pars.formDatas.iscenicid,
                    itickettypeid: this.pars.formDatas.itickettypeid,
                    searchkey: this.pars.formDatas.searchkey
                };
            },
            //服务商下拉选项改变，请求对应服务商产品
            async listPageSelectedChange (val) {
                let arr = this.formItemList[0].optionList;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].value == val) {
                        this.pars.formDatas['szscenicname'] = arr[i].label;
                        this.currentRowData['parentId'] = `${arr[i].value}-${arr[i].label}`;
                        break;
                    }
                }
                const options = await this.$common.getProductInfoByScenicId(this, val, 1, 1);
                this.formItemList[1].optionList = options;
                this.formItemList[1].optionList.unshift({
                    value: 0,
                    label: '所有票务'
                });
                this.$set(this.pars.formDatas, 'itickettypeid', 0)
            },
            //新增修改保存
            async getFormDataAdd (obj) {
                this.btnLoading = true;
                let [arr,aaa] = [[],''];
                obj = JSON.parse(JSON.stringify(obj));
                if ('timestock' in obj) {
                    obj.timestock.forEach(item => {
                        if (item.time_start != '') {
                            arr.push({
                                'time_start': item.time_start,
                                'time_end': item.time_end,
                                'stock': item.stock
                            })
                        } else {
                            arr.push(obj.timestock)
                        }
                    });
                }
                this.$set(obj, 'timestock', arr);
                if (!obj.int3) {
                    delete obj.timestock;
                    delete obj.note3;
                    delete obj.note4
                } else {
                    obj.timestock = JSON.stringify(obj.timestock);
                    obj.note3 = this.$common.getCurrentDate(obj.note3);
                    obj.note4 = this.$common.getCurrentDate(obj.note4);
                }
                if (this.currentIndex === 12) {
                    aaa = await this.$common.addNewData('/ticket/ticket/v1/productSave?flag=1', this, obj, 'post', true)
                } else if (this.currentIndex === 13) {
                    aaa = await this.$common.editData('/ticket/ticket/v1/productSave?flag=2', this, obj, 'post', true)
                }
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl+'/ticket/combinationTicket/v1/combinationProductViewList', this, 'get')
                }
            },
            //增加或减少行
            addOrsubtractRow (num, index) {
                this.$common.addOrsubtractRow(num, index, 'timestock', this)
            },
            //新增修改组件的显示与否,布尔,true为不显示
            tabShowOrHide (noShow, showLastThree) {
                if (!showLastThree) {
                    this.formItemList1.forEach((obj, index) => {
                        if ('noShow' in obj && index < (this.formItemList1.length - 3)) {
                            obj.noShow = noShow
                        }
                    });
                } else {
                    this.formItemList1.forEach((obj, index) => {
                        if ('noShow' in obj && index >= (this.formItemList1.length - 3)) {
                            obj.noShow = noShow
                        }
                    });
                }
            },
            //初始化新增修改页下拉列表
            getInitSelect () {
                if (this.formItemList1[8].optionList.length < 1) {
                    return new Promise((resolve,reject) => {
                        this.$http.post(this.baseUrl+'/ticket/combinationTicket/v1/queryInitData', this.QS.stringify({
                            access_token: this.Cookies.get('token'),
                            scenicType: '01'
                        })).then(res => {
                            if (res.data.code == 200) {
                                let data = res.data.data;
                                let [a, b, c] = ['', '', ''];
                                for (let i = 0; i < this.formItemList1.length; i++) {
                                    switch (this.formItemList1[i].keyName) {
                                        case 'bycategorytype':
                                            a = i; break;
                                        case 'bymaketicketway':
                                            b = i; break;
                                        case 'bymediatype':
                                            c = i; break;
                                        default: break
                                    }
                                }
                                for (let j in data) {
                                    if (j == 'protype' || j == 'mediatypelist' || j == 'cpfslist') {
                                        let x = '';
                                        switch (j) {
                                            case 'protype':
                                                x = a; break;
                                            case 'cpfslist':
                                                x = b; break;
                                            case 'mediatypelist':
                                                x = c; break;
                                            default: break
                                        }
                                        data[j].forEach(item => {
                                            this.formItemList1[x].optionList.push({
                                                value: item.pmcd,
                                                label: item.pmva,
                                            })
                                        })
                                    }
                                }
                                resolve()
                            } else {
                                this.$common.showMessageModal(this, res, 1);
                                this.spinShow = false;
                                reject()
                            }
                        })
                    });
                }
            },
            //初始化新增页面
            async setAddInitData (type) {
                await this.getInitSelect();
                this.formDatas1 = {
                    timestock: [
                        {
                            time_start: '',
                            time_end: '',
                            stock: ''
                        }
                    ],
                    imgList: [],
                    upids: [],
                    iticketnoruleid: 0,     //隐含参数
                    mcostprice: 0,          //隐含参数
                    iscontrol: 0,           //隐含参数
                    iscontrolsale: 0,       //隐含参数
                    issale: 0,              //隐含参数
                    iscansale: 0,           //隐含参数
                    szscenicname: this.pars.formDatas.szscenicname,
                    iscenicid: this.pars.formDatas.iscenicid,
                    bispersontimestat: 1,
                    int1: 0,     //默认0，页面上不显示该项
                    byisuse: 1,
                    int3: 0,
                    byusage: 0,
                    byuselimit: 0,
                    bycategorytype: this.formItemList1[4].optionList[0].value,  //产品类别
                    bymaketicketway: this.formItemList1[8].optionList[0].value,
                    bymediatype: this.formItemList1[9].optionList[0].value,
                    mnominalfee: '0.0',
                    isequence: 0,
                    validityday: '1'
                };
                this.spinShow = false;
                this.currentIndex = type
            },
            //初始化修改页面
            async setEditInitData (type) {
                this.formItemList1[15].noShow = true;
                await this.getInitSelect();
                let url = `?access_token=${this.Cookies.get('token')}&itickettypeid=${this.currentRowData.id}`;
                this.$http.post(`${this.baseUrl}/ticket/ticket/v1/productEdit${url}`,)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.formDatas1 = res.data.data;
                            this.$set(this.formDatas1, 'iticketnoruleid', 0);
                            this.$set(this.formDatas1, 'mcostprice', 0);
                            this.$set(this.formDatas1, 'iscontrol', 0);
                            this.$set(this.formDatas1, 'iscontrolsale', 0);
                            this.$set(this.formDatas1, 'issale', 0);
                            this.$set(this.formDatas1, 'iscansale', 0);
                            this.formDatas1.mnominalfee += '';
                            this.formDatas1.validityday += '';
                            if (this.formDatas1.list.length) {
                                let [upids,imgList] = [[],[]];
                                this.formDatas1.list.map(item => {
                                    imgList.push({
                                        status: 'finished',
                                        name: item.upfilename,
                                        response: {
                                            code: 200,
                                            data: {
                                                info: {
                                                    url: item.upadder
                                                },
                                                upid: item.upid
                                            }
                                        }
                                    });
                                    upids.push(item.upid);
                                });
                                this.$set(this.formDatas1, 'imgList', imgList);
                                this.$set(this.formDatas1, 'upids', upids);
                                this.uploadImgList = imgList
                            } else {
                                this.$set(this.formDatas1, 'imgList', []);
                                this.$set(this.formDatas1, 'upids', []);
                            }
                            if (!this.formDatas1.timeList) {
                                this.$set(this.formDatas1, 'timestock', [
                                    {
                                        time_start: '',
                                        time_end: '',
                                        stock: ''
                                    }
                                ])
                            } else {
                                this.formDatas1.timeList.map(item => {
                                    this.$set(this.formDatas1, 'timestock', [
                                        {
                                            time_start: item.startDate,
                                            time_end: item.endDate,
                                            time_id: item.productId,
                                            stock: item.tatalStock
                                        }
                                    ]);
                                });
                            }
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                        }
                        this.spinShow = false;
                        this.currentIndex = type
                    })
            },
            //初始化查看页面
            setViewInitData (type) {
                this.$http.get(`${this.baseUrl}/ticket/ticket/v1/productView`,{
                    params: {
                        access_token: this.Cookies.get('token'),
                        itickettypeid: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.byusage = data.byusage ? '一票多人' : '一票一人';
                        data.byuselimit = data.byuselimit ? '长期性' : '一次性';
                        data.bispersontimestat = data.bispersontimestat ? '是' : '否';
                        data.byisuse = data.byisuse ? '启用' : '禁用';
                        data.int3 = data.int3 ? '是' : '否';
                        this.formDatas2 = data;
                    } else {
                        this.$common.showModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                })
            },
            //图片上传成功
            // handleSuccess (arr) {
            //     console.log(arr);
            //     let [imgArr,upids] = [[],[]];
            //     arr.forEach(item => {
            //         if (item.response) {
            //             item.url = item.response.data.info.url;
            //             imgArr.push(item.response.data.info.url)
            //         }
            //     });
            //     this.formDatas1.imgList = imgArr;
            //     // this.formDatas1.upids = upids;
            // },
            //获取上传图片列表
            getUploadList (fileList) {
                let [imgList,upids] = [[],[]];
                this.formDatas1.imgList = fileList;
                fileList.map(item => {
                    if (item.response.code === 200) {
                        upids.push(item.response.data.upid);
                        imgList.push(item)
                    }
                });
                this.formDatas1.upids = upids;
                this.formDatas1.imgList = imgList;
            },
            //移除图片列表中某张图片
            handleImgRemove (index) {
                this.formDatas1.imgList.splice(index,1);
                this.formDatas1.upids.splice(index,1)
            },
            //移动图片位置
            handleMove(index, direction) {
                if (direction === 'left') {
                    this.swapArray(this.formDatas1.imgList, index, index-1);
                    this.swapArray(this.formDatas1.upids, index, index-1)
                } else {
                    this.swapArray(this.formDatas1.imgList, index, index+1);
                    this.swapArray(this.formDatas1.upids, index, index+1)
                }
            },
            //互换数组元素位置
            swapArray(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            },
            //初始化二维码页面
            async setCodeInitData (type,id,name) {
                let szcompanyname = ''
                const res = await this.$http.get(`${this.baseUrl}/ec/home/v1/getGalcompanyName?url=${window.location.hostname}`)
                if (res.data.code === 200) {
                    szcompanyname = res.data.data;
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.$common.getParsBeforeSearch(this);
                this.formDatas_code = {
                    providername: this.pars.formDatas.szscenicname,
                    ticketname: name,
                    content: `http://${window.location.hostname}/webchat/?iticketid=${id}&wxName=${szcompanyname}#/smgIndex`
                };
                this.formItemList_code[3].value = `http://${window.location.hostname}/webchat/?iticketid=${id}&wxName=${szcompanyname}#/smgIndex`;
                this.spinShow = false;
                this.currentIndex = type
            },
            //下载二维码
            downloadCode () {
                let myCanvas = document.getElementsByTagName('canvas');
                let a = document.createElement("a");
                //设置a标签的href属性（将canvas变成png图片）
                a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream');
                //设置下载文件的名字
                a.download = "扫码购二维码.png";
                //点击
                a.click()
            },
            //初始化管理票务产品属性页面
            setManageInitData (type,id,name) {
                this.$http.get(this.baseUrl+'/ticket/ticket/v1/getEdmticketproductByTickettypeid',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        itickettypeid: id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        this.$common.getParsBeforeSearch(this);
                        data.szscenicname = this.pars.formDatas.szscenicname;
                        data.sztickettypename = name;
                        data.iskz = data.iskz ? data.iskz : '0';
                        data.choosetype = data.choosetype ? data.choosetype : 0;
                        data.dtstartdate = data.dtstartdate ? data.dtstartdate : '00:00';
                        data.dtenddate = data.dtenddate ? data.dtenddate : '24:00';
                        this.formDatas_manage = data;
                        this.isShow(data.choosetype, 9);
                        this.isShow(data.choosetype, 10);
                        this.isShow(data.iskz, 12)
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                });
                this.spinShow = false;
                this.currentIndex = type
            },
            isShow (val, index) {   //是否显示某些表单项
                if (val == 1) {
                    this.formItemList_manage[index]['noShow'] = false
                } else {
                    this.formItemList_manage[index]['noShow'] = true
                }
            },
            async getFormDataManage (obj) {
                this.btnLoading = true;
                let url = `/ticket/ticket/v1/productticketSave?itickettypeid=${this.currentRowData.id}`;
                const aaa = await this.$common.editData(url, this, obj, 'post', true);
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/ticket/v1/productViewList', this)
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        async created () {
            let [val,lab,arr] = ['','',this.$store.state.page.listPagePars];
            const options = await this.$common.getScenicList(this, 0);
            this.formItemList[0].optionList = options;
            val = this.formItemList[0].optionList[0].value;
            lab = this.formItemList[0].optionList[0].label;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    val = item.pars.formDatas.iscenicid;
                    lab = item.pars.formDatas.szscenicname;
                    break;
                }
            }
            this.pars.formDatas['iscenicid'] = val;
            this.pars.formDatas['szscenicname'] = lab;
            const option1 = await this.$common.getProductInfoByScenicId(this, val, 1, 1);
            this.formItemList[1].optionList = option1;
            this.formItemList[1].optionList.unshift({
                value: 0,
                label: '所有票务'
            });
            this.$set(this.pars.formDatas,'itickettypeid',0);
            this.currentRowData['parentId'] = `${val}-${lab}`;
            this.$common.currentPageData(this.baseUrl+'/ticket/combinationTicket/v1/combinationProductViewList', this, 'get')
        },
        watch: {
            //是否分时预约，切换下方组件显示与否
            'formDatas1.int3' (val) {
                if (val == 1) {
                    this.tabShowOrHide(false, true)
                } else {
                    this.tabShowOrHide(true, true)
                }
            },
            currentIndex (index) {
                if (index === 1) {
                    this.uploadImgList = []
                }
            },
            'formDatas_manage.iskz' (val) {
                this.isShow(val, 12)
            },
            'formDatas_manage.choosetype' (val) {
                this.isShow(val, 9);
                this.isShow(val, 10)
            },
        },
    }
</script>

<style scoped>

</style>
