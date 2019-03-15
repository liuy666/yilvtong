<template>
    <div id="server">
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">景区信息</span>
                    <top-btn
                            :btn-list="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData = "refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :is-list-page="true"
                        :is-mixed="false"
                        :label-width="labelWidth"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="tableColumns"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="getChooseData"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增服务商</span>
                    <span v-if="currentIndex === 13" class="title_span">修改服务商</span>
                </p>
                <detail-form1
                        ref = "server"
                        :form-datas="formDatas_add"
                        :form-item-list="formItemList_add"
                        :rule-datas="ruleDatas_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :label-width="labelWidth_add"
                        :btn-loading="btnLoading"
                        @getFormData="getFormData_add"
                        @handleMove = "handleMove"
                        @getUploadList="getUploadList"
                        @handleImgRemove="handleImgRemove"
                        @confirmMap="confirmMap"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看服务商</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :label-width="200"
                        :title-list="titleList_view"
                        :showTwoCol = "true"
                        @closeCurrentPage = "closeCurrentPage"
                ></view-del-detail>
            </Card>
            <Card v-show="currentIndex === 15">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">景区属性</span>
                </p>
                <detail-form1
                        :form-datas="formDatas_property"
                        :form-item-list="formItemList_property"
                        :rule-datas="ruleDatas_property"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :label-width="200"
                        :btn-loading="btnLoading"
                        @getFormData="getFormData_property"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 16">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">开户信息管理</span>
                </p>
                <detail-form-area
                        :form-datas="formDatas_account"
                        :form-item-list="formItemList_account"
                        :rule-datas="ruleDatas_account"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :need-save="needSave"
                        :btn-loading="btnLoading"
                        :label-width="200"
                        :title-list="titleList_account"
                        :disabledEndDate="disabledEndDate"
                        :disabledEnd="disabledEnd"
                        @getFormData="getFormData_account"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form-area>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            const validateSzsceniccode = (rule, value, callback) => {
                const reg = /^[A-Z0-9]{2}$/;
                if (!value) {
                    let str = '服务商编码不能为空';
                    callback(new Error(str))
                } else if (!reg.test(value)) {
                    callback(new Error('服务商编码格式有误'))
                } else {
                    callback();
                }
            };
            //开户管理--合约起止时间
            const settlementDays = (rule, value, callback) => {
                if (!this.formDatas_account.contractStartTime && !this.formDatas_account.contractEndTime) {
                    callback(new Error('合约起止时间不能为空'))
                } else if (!this.formDatas_account.contractStartTime && this.formDatas_account.contractEndTime) {
                    callback(new Error('合约起始时间不能为空'))
                } else if (this.formDatas_account.contractStartTime && !this.formDatas_account.contractEndTime) {
                    callback(new Error('合约截止时间不能为空'))
                } else if (Date.parse(this.formDatas_account.contractStartTime) > Date.parse(this.formDatas_account.contractEndTime)) {
                    callback(new Error('合约起始时间不能大于结束时间'))
                } else {
                    callback();
                }
            };
            const validateImgList = (rule, value, callback) => {
                if (!this.formDatas_add.imgList.length) {
                    this.$common.showMessageModal(this, '请上传至少一张图片', 2)
                } else {
                    callback();
                }
            };
            const validateBusinesshours = (rule, value, callback) => {
                if (!this.formDatas_add.businesshours && !this.formDatas_add.businesshoursend) {
                    callback(new Error('营业起止时间不能为空'))
                } else if (!this.formDatas_add.businesshours && this.formDatas_add.businesshoursend) {
                    callback(new Error('营业起始时间不能为空'))
                } else if (this.formDatas_add.businesshours && !this.formDatas_add.businesshoursend) {
                    callback(new Error('营业截止时间不能为空'))
                } else if (this.toTime(this.formDatas_add.businesshours) > this.toTime(this.formDatas_add.businesshoursend)) {
                    callback(new Error('营业起始时间不能大于结束时间'))
                } else {
                    callback();
                }
            };
            return {
                searchCount: 1,
                currentIndex: 1,
                spinShow: true,
                isClose : false,
                btnLoading: false,
                //按钮部分
                btnList:[
                    {
                        type : 1,
                        btnlabel : "刷新"
                    },
                    {
                        type : 12,
                        btnlabel : "新增本级",
                    },
                    {
                        type : 13,
                        btnlabel : "修改",
                    },
                    {
                        type : 4,
                        btnlabel : "删除",
                        dialogType: 'del',
                        url: ''
                    },
                    {
                        type : 14,
                        btnlabel : "查看",
                    },
                ],
                //表单部分
                formItemList : [
                    {
                        type: 13,
                        label: '',
                        keyName: 'radiobuttom',
                        labelWidth : 1,
                        optionList: [
                            {
                                value : 2,
                                labelName : "根据服务商名称模糊查询"
                            },
                            {
                                value : 3,
                                labelName : '查询无效的服务商',
                                type: 1,
                                keyName: 'condition'
                            }
                        ]
                    }
                ],
                labelWidth : 120,
                //表格部分
                tableColumns : [
                    {
                        'title' : '编号',
                        'key' : 'iscenicid',
                        'width' : 70,
                    },{
                        'title' : '编码',
                        'key' : 'szsceniccode',
                        'width' : 80,
                    },{
                        'title' : '名称',
                        'key' : 'szscenicname',
                        'width' : 180,
                    },{
                        'title' : '操作',
                        'key' : 'operate',
                        'width' : 200,
                        'render' : (h,params) => {
                            const row = params.row;
                            return h('span',[
                                h('span',{
                                    'class': 'hover_span',
                                    style: {
                                        marginRight: '10px',
                                    },
                                    on : {
                                        click : () => {
                                            this.changeIndex(15, row.iscenicid, row.szscenicname)
                                        }
                                    }
                                },'景区属性管理'),
                                h('span',{
                                    'class': 'hover_span',
                                    on : {
                                        click : () => {
                                            this.changeIndex(16, row.iscenicid, row.pc)
                                        }
                                    }
                                },'开户管理')
                            ])
                        }
                    },{
                        'title' : '启用状态',
                        'key' : 'byisuse',
                        'width' : 150,
                        'align' : 'center',
                        'render' : (h,params) => {
                            const row = params.row;
                            const color = row.byisuse == 1 ? '#16a951' : row.byisuse == 0 ? '#c00' : 'transparent';
                            const text = row.byisuse == 1 ? '启用' : row.byisuse == 0 ? '禁用' : '';
                            return h('span',{
                                style : {
                                    color : color
                                }
                            },text)
                        }
                    },{
                        'title' : '开户状态',
                        'key' : 'pc',
                        'width' : 150,
                        'align' : 'center',
                        'render' : (h,params) => {
                            const row = params.row;
                            const color = row.pc == 1 ? '#16a951' : row.pc == 0 ? '#c00' : 'transparent';
                            const text = row.pc == 1 ? '已开户' : row.pc == 0 ? '未开户' : '';
                            return h('span',{
                                style : {
                                    color : color
                                }
                            },text)
                        }
                    },{
                        'title' : '服务商类别',
                        'key' : 'strpdtyp',
                        'width' : 150,
                        'align' : 'center'
                    },{
                        'title' : '当天预订截止时间',
                        'key' : 'szlasttime',
                        'width' : 150,
                        'align' : 'center'
                    },{
                        'title' : '最多提前预定天数',
                        'key' : 'imaxdata',
                        'width' : 150,
                        'align' : 'center'
                    },{
                        'title' : '允许强制退订',
                        'key' : 'iscanreturn',
                        'width' : 150,
                        'align' : 'center',
                        'render' : (h,params) => {
                            const row = params.row;
                            const text = row.iscanreturn == 1 ? '是' : row.iscanreturn == 0 ? '否' : '';
                            return h('span', text);
                        }
                    },{
                        'title' : '过了消费日期允许修改',
                        'key' : 'icanmodify',
                        'width' : 200,
                        'align' : 'center',
                        'render' : (h,params) => {
                            const row = params.row;
                            const text = row.icanmodify == 1 ? '是' : row.icanmodify == 0 ? '否' : '';
                            return h('span', text);
                        }
                    },{
                        'title' : '推荐/次序',
                        'key' : 'iordernumber',
                        'width' : 150,
                        'align' : 'center'
                    },{
                        'title' : '启用',
                        'key' : 'byisuse',
                        'width' : 150,
                        'align' : 'center',
                        'render' : (h,params) => {
                            const row = params.row;
                            const text = row.byisuse == 1 ? '启用' : row.byisuse == 0 ? '禁用' : '';
                            return h('span', text);
                        }
                    }
                ],
                tableData: [],
                currentRowData:{},
                pars:{
                    formDatas : {
                        radiobuttom : 0,
                        condition : ''
                    },
                    pageNum:10,
                    pageCode:1,
                },
                total:0,
                loading: false,
                single: 0,
                urlQuery: {},
                //新增修改页面
                uploadImgList: [],
                labelWidth_add : 180,
                formDatas_add : {},
                formItemList_add : [
                    {
                        label : '服务商编号',
                        keyName : 'iscenicid',
                        disabled : true,
                        noShow: true,
                        type : 1,
                    },
                    {
                        label : '服务商编码',
                        keyName : 'szsceniccode',
                        type : 1,
                        hasDec: '输入2位由数字或者大写英文字母组成的代码',
                        isRedDec: true,
                        noShow: true,
                        cols : 12
                    },
                    {
                        label : '服务商名称',
                        keyName : 'szscenicname',
                        type : 1,
                        cols: 12
                    },
                    {
                        label : '服务商类别',
                        keyName : 'scenictype',
                        type : 4,
                        optionList:[
                            {
                                value: '01',
                                label: '景区'
                            }
                        ],
                        cols : 12
                    },
                    {
                        label : '服务商等级',
                        keyName : 'szgrade',
                        type : 4,
                        optionList:[],
                        cols : 12
                    },
                    {
                        type : 22,
                        label : "所属地",
                        keyName : "strregion",
                        keyName1 : 'szregionalid',
                        btnLabel : "选择",
                        title: '选择地区',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        treeData: [],
                        treeType: 4,
                        cols : 12
                    },
                    {
                        label : '推荐次序',
                        keyName : 'iordernumber',
                        type : 1,
                        cols : 12
                    },
                    {
                        label : '联系人',
                        keyName : 'szcontact',
                        type : 1,
                        cols : 12
                    },
                    {
                        label : '联系电话',
                        keyName : 'szphone',
                        type : 1,
                        cols : 12
                    },
                    {
                        label : '营业时间',
                        keyName : 'businesshours',
                        keyName1 : 'businesshoursend',
                        format: 'HH:mm',
                        steps: [1,30],
                        double: true,
                        type : 12,
                        cols : 12
                    },
                    {
                        label : '详细地址',
                        keyName : 'szaddress',
                        className: 'input-middle',
                        type : 1
                    },
                    {
                        label : '地图位置',
                        keyName : 'longitude',
                        btnLabel : "查询经纬度",
                        mapModal: false,
                        isIf: false,
                        className: 'input-middle',
                        type : 25
                    },
                    {
                        label : '交通位置描述',
                        keyName : 'szlocation',
                        type : 6,
                        defaultMsg: '',
                        config : {
                            toolbars: [
                                [
                                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase'
                                ]
                            ],
                            initialFrameWidth: '92%',
                            initialFrameHeight: 200,
                            zIndex : 1
                        },
                        ueId : 'szlocation'
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
                    },
                    {
                        label : '当天预订截止时间',
                        keyName : 'szlasttime',
                        type : 4,
                        cols : 12,
                        optionList : [
                            {
                                value: '01:00',
                                label: '01:00'
                            },
                            {
                                value: '02:00',
                                label: '02:00'
                            },
                            {
                                value: '03:00',
                                label: '03:00'
                            },
                            {
                                value: '04:00',
                                label: '04:00'
                            },
                            {
                                value: '05:00',
                                label: '05:00'
                            },
                            {
                                value: '06:00',
                                label: '06:00'
                            },
                            {
                                value: '07:00',
                                label: '07:00'
                            },
                            {
                                value: '08:00',
                                label: '08:00'
                            },
                            {
                                value: '09:00',
                                label: '09:00'
                            },
                            {
                                value: '10:00',
                                label: '10:00'
                            },
                            {
                                value: '11:00',
                                label: '11:00'
                            },
                            {
                                value: '12:00',
                                label: '12:00'
                            },
                            {
                                value: '13:00',
                                label: '13:00'
                            },
                            {
                                value: '14:00',
                                label: '14:00'
                            },
                            {
                                value: '15:00',
                                label: '15:00'
                            },
                            {
                                value: '16:00',
                                label: '16:00'
                            },
                            {
                                value: '17:00',
                                label: '17:00'
                            },
                            {
                                value: '18:00',
                                label: '18:00'
                            },
                            {
                                value: '19:00',
                                label: '19:00'
                            },
                            {
                                value: '20:00',
                                label: '20:00'
                            },
                            {
                                value: '21:00',
                                label: '21:00'
                            },
                            {
                                value: '22:00',
                                label: '22:00'
                            },
                            {
                                value: '23:00',
                                label: '23:00'
                            },
                            {
                                value: '24:00',
                                label: '24:00'
                            },
                        ]
                    },
                    {
                        label : '是否启用',
                        keyName : 'byisuse',
                        type : 2,
                        cols : 12,
                        optionList : [
                            {
                                value : 1,
                                labelName : '是'
                            },
                            {
                                value : 0,
                                labelName : '否'
                            }
                        ]
                    },
                    {
                        label : '最多提前预订天数',
                        keyName : 'imaxdata',
                        type : 1,
                        hasDec: '输入正整数不大于30天的数',
                        isRedDec: true,
                    },

                    {
                        label : '是否允许强制退订',
                        keyName : 'iscanreturn',
                        type : 2,
                        cols : 12,
                        optionList : [{
                            value : 1,
                            labelName : '是'
                        },{
                            value : 0,
                            labelName : '否'
                        }]
                    },
                    {
                        label : '过了消费日期是否允许修改',
                        keyName : 'icanmodify',
                        type : 2,
                        cols : 12,
                        optionList : [{
                            value : 1,
                            labelName : '是'
                        },{
                            value : 0,
                            labelName : '否'
                        }]
                    },
                    {
                        label : '是否打印回执',
                        keyName : 'printreceipt',
                        type : 2,
                        cols : 12,
                        optionList : [{
                            value : 1,
                            labelName : '是'
                        },{
                            value : 0,
                            labelName : '否'
                        }]
                    },
                    {
                        label : '是否打印发票',
                        keyName : 'printinvoice',
                        type : 2,
                        cols : 12,
                        optionList : [
                            {
                                value : 0,
                                labelName : '不打印'
                            },
                            {
                                value : 1,
                                labelName : '游客打印'
                            },
                            {
                                value : 2,
                                labelName : '旅行社打印'
                            },
                            {
                                value : 3,
                                labelName : '全部打印'
                            }
                        ]
                    },
                    {
                        label : '简介',
                        keyName : 'szsimpleintroduction',
                        type : 7
                    },
                    {
                        label : '预订说明',
                        keyName : 'strbookdescription',
                        type : 6,
                        defaultMsg: '',
                        config : {
                            toolbars: [
                                [
                                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase'
                                ]
                            ],
                            initialFrameWidth: '92%',
                            initialFrameHeight: 200,
                            zIndex : 1
                        },
                        ueId : 'strbookdescription'
                    },
                    {
                        label : '详细介绍',
                        keyName : 'note',
                        type : 6,
                        defaultMsg: '',
                        config : {
                            toolbars: [
                                [
                                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase'
                                ]
                            ],
                            initialFrameWidth: '92%',
                            initialFrameHeight: 350,
                            zIndex : 1
                        },
                        ueId : 'note'
                    },
                    {
                        label : '景区-补充描述',
                        keyName : 'moredescribe',
                        type : 7
                    },
                    {
                        label : '费用包含',
                        keyName : 'cost',
                        type : 7
                    },
                    {
                        label : '退票规则',
                        keyName : 'refundrules',
                        type : 7
                    },
                    {
                        label : '补充说明',
                        keyName : 'moreexplan',
                        type : 7
                    },
                    {
                        label : '入园方式',
                        keyName : 'entermode',
                        type : 7
                    }

                ],
                ruleDatas_add : {
                    // szsceniccode: [
                    //     { required: true, validator: validateSzsceniccode, trigger: 'blur' }
                    // ],
                    szscenicname: [
                        { required: true, message: '服务商名称不能为空', trigger: 'blur' }
                    ],
                    strregion: [
                        { required: true, message: '所属地不能为空', trigger: 'blur' }
                    ],
                    szaddress: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ],
                    businesshours: [
                        { required: true, validator: validateBusinesshours, trigger: 'change' }
                    ],
                    imgList: [
                        { required: true, validator: validateImgList, trigger: 'blur' }
                    ],
                },
                tipName : '',
                //查看
                formDatas_view: {},
                formItemList_view: [
                    {
                        label : '服务商编号',
                        keyName : 'iscenicid',
                        divIndex : 0
                    },
                    {
                        label : '服务商代码',
                        keyName : 'szsceniccode',
                        divIndex : 0
                    },
                    {
                        label : '服务商名称',
                        keyName : 'szscenicname',
                        class: 'one-row-class',
                        divIndex : 0,
                    },
                    {
                        label : '服务商类别',
                        keyName : 'strpdtyp',
                        divIndex : 0
                    },
                    {
                        label : '服务商等级',
                        keyName : 'strgrade',
                        divIndex : 0
                    },
                    {
                        label : '所属地区',
                        keyName : 'strregion',
                        divIndex : 0
                    },
                    {
                        label : '推荐次序',
                        keyName : 'iordernumber',
                        divIndex : 0
                    },
                    {
                        label : '联系人',
                        keyName : 'szcontact',
                        divIndex : 0
                    },
                    {
                        label : '联系电话',
                        keyName : 'szphone',
                        divIndex : 0
                    },
                    {
                        label : '详细地址',
                        keyName : 'szaddress',
                        class: 'one-row-class',
                        divIndex : 0
                    },
                    {
                        label : '网址',
                        keyName : 'sznetaddr',
                        class: 'one-row-class',
                        divIndex : 0
                    },
                    {
                        label : '全景网址',
                        keyName : 'szqjaddr',
                        class: 'one-row-class',
                        divIndex : 0
                    },
                    {
                        label : '交通位置描述',
                        keyName : 'szlocation',
                        class: 'one-row-class',
                        html: true,
                        divIndex : 0
                    },
                    {
                        label : '当天预订截止时间',
                        keyName : 'szlasttime',
                        divIndex : 0
                    },
                    {
                        label : '是否启用',
                        keyName : 'byisuse',
                        divIndex : 0
                    },
                    {
                        label : '最多提前预定天数',
                        keyName : 'imaxdata',
                        divIndex : 0
                    },
                    {
                        label : '景区浏览时数',
                        keyName : 'szdata',
                        divIndex : 0
                    },
                    {
                        label : '地图位置',
                        keyName : 'longitude',
                        class: 'one-row-class',
                        divIndex : 0
                    },
                    {
                        label : '是否允许强制退订',
                        keyName : 'iscanreturn',
                        divIndex : 0
                    },
                    {
                        label : '过了消费日期是否允许修改',
                        keyName : 'icanmodify',
                        divIndex : 0
                    },
                    {
                        label : '预定说明',
                        keyName : 'strbookdescription',
                        class: 'one-row-class',
                        html: true,
                        divIndex : 0
                    },
                    {
                        label : '简介',
                        keyName : 'szsimpleintroduction',
                        class: 'one-row-class',
                        divIndex : 0
                    },
                    {
                        label : '详细介绍',
                        keyName : 'note',
                        class: 'one-row-class',
                        html: true,
                        divIndex : 0
                    },
                    {
                        label : '企业名称',
                        keyName : 'companyName',
                        class: 'one-row-class',
                        divIndex : 1
                    },
                    {
                        label : '企业网站',
                        keyName : 'website',
                        class: 'one-row-class',
                        divIndex : 1
                    },
                    {
                        label : '企业地址',
                        keyName : 'address',
                        class: 'one-row-class',
                        divIndex : 1
                    },
                    {
                        label : '工商注册号',
                        keyName : 'registrationNumber',
                        divIndex : 1
                    },
                    {
                        label : '组织结构代码',
                        keyName : 'organizationCode',
                        divIndex : 1
                    },
                    {
                        label : '法人',
                        keyName : 'corporate',
                        divIndex : 1
                    },
                    {
                        label : '法人身份证',
                        keyName : 'corporateIdentity',
                        divIndex : 1
                    },
                    {
                        label : '业务联系人',
                        keyName : 'businessContact',
                        divIndex : 2
                    },
                    {
                        label : '财务联系人',
                        keyName : 'customerContact',
                        divIndex : 2
                    },
                    {
                        label : '业务联系手机',
                        keyName : 'businessTel',
                        divIndex : 2
                    },
                    {
                        label : '财务联系手机',
                        keyName : 'customerTel',
                        divIndex : 2
                    },
                    {
                        label : '业务联系邮箱',
                        keyName : 'businessContactEmail',
                        divIndex : 2
                    },
                    {
                        label : '财务联系邮箱',
                        keyName : 'customerContactEmail',
                        divIndex : 2
                    },
                    {
                        label : '结算系统商户编号',
                        keyName : 'hqytId',
                        divIndex : 3
                    },
                    {
                        label : '结算系统商户账号',
                        keyName : 'applicationName',
                        divIndex : 3
                    },
                    {
                        label : '合约起始时间',
                        keyName : 'contractStartTime',
                        divIndex : 3
                    },
                    {
                        label : '合约结束时间',
                        keyName : 'contractEndTime',
                        divIndex : 3
                    },
                    {
                        label : '结算银行',
                        keyName : 'bankId',
                        divIndex : 3
                    },
                    {
                        label : '开户城市',
                        keyName : 'city',
                        divIndex : 3
                    },
                    {
                        label : '开户支行',
                        keyName : 'subbranch',
                        divIndex : 3
                    },
                    {
                        label : '银行开户名',
                        keyName : 'settleBankAccountName',
                        divIndex : 3
                    },
                    {
                        label : '银行账号',
                        keyName : 'settleBankAccount',
                        divIndex : 3
                    },
                    {
                        label : '结算周期',
                        keyName : 'settlementDays',
                        divIndex : 3
                    },
                    {
                        label : '结算费率',
                        keyName : 'settlementRate',
                        divIndex : 3
                    },
                    {
                        label : '状态',
                        keyName : 'status',
                        color: '#16a951',
                        divIndex : 3
                    },
                ],
                titleList_view: [
                    {
                        titleName : '服务商信息'
                    },
                    {
                        titleName : '企业信息'
                    },
                    {
                        titleName : '联系信息'
                    },
                    {
                        titleName : '结算信息'
                    }
                ],
                //景区属性
                formDatas_property : {},
                formItemList_property : [
                    {
                        label : 'id',
                        keyName : "iscenicid",
                        type : 9,
                        isHidden : true
                    },
                    {
                        label : '服务商名称',
                        keyName : 'szscenicname',
                        type : 9
                    },
                    {
                        label : '是否通用售票',
                        keyName : 'inoteger4',
                        type : 2,
                        optionList : [
                            {
                                value : 0,
                                labelName : '否'
                            },
                            {
                                value : 1,
                                labelName : '是'
                            }
                        ]
                    },
                    {
                        label : '订单是否可以修改',
                        keyName : 'numter1',
                        type : 2,
                        optionList : [
                            {
                                value : 0,
                                labelName : '否'
                            },
                            {
                                value : 1,
                                labelName : '是'
                            }
                        ]
                    },
                    {
                        label : '是否打印副卷',
                        keyName : 'inoteger1',
                        type : 2,
                        noShow: true,
                        optionList : [
                            {
                                value : 0,
                                labelName : '不打印'
                            },
                            {
                                value : 1,
                                labelName : '是'
                            }
                        ]
                    },
                    {
                        label : '是否直接出票',
                        keyName : 'inoteger3',
                        type : 2,
                        optionList : [{
                            value : 0,
                            labelName : '否'
                        },{
                            value : 1,
                            labelName : '是'
                        }]
                    },{
                        label : 'IC卡是否入库售票',
                        keyName : 'inoteger5',
                        type : 2,
                        noShow: true,
                        optionList : [{
                            value : 0,
                            labelName : '否'
                        },{
                            value : 1,
                            labelName : '是'
                        }]
                    },{
                        label : '预制票退票后是否可再次销售',
                        keyName : 'noted4',
                        type : 2,
                        optionList : [{
                            value : '0',
                            labelName : '不销售'
                        },{
                            value : '1',
                            labelName : '销售'
                        }]
                    },{
                        label : 'IC卡检票方式',
                        keyName : 'noted5',
                        type : 2,
                        noShow: true,
                        optionList : [{
                            value : '0',
                            labelName : '在线'
                        },{
                            value : '1',
                            labelName : '离线数据存服务器(指纹存数据库)'
                        },{
                            value : '2',
                            labelName : '纯离线(全部存卡里)'
                        }]
                    },{
                        label : 'IC卡密码验证模式',
                        keyName : 'meet',
                        type : 2,
                        noShow: true,
                        optionList : [{
                            value : '0',
                            labelName : 'A'
                        },{
                            value : '1',
                            labelName : 'B'
                        }]
                    },{
                        label : '套票是否可单独退子票',
                        keyName : 'inoteger6',
                        type : 2,
                        optionList : [{
                            value : 0,
                            labelName : '否'
                        },{
                            value : 1,
                            labelName : '是'
                        }]
                    },{
                        label : '是否允许现付',
                        keyName : 'inoteger7',
                        type : 2,
                        optionList : [{
                            value : 0,
                            labelName : '否'
                        },{
                            value : 1,
                            labelName : '是'
                        }]
                    },{
                        label : '服务商优惠类型',
                        keyName : 'inoteger8',
                        type : 2,
                        optionList : [{
                            value : 0,
                            labelName : '最高价'
                        },{
                            value : 1,
                            labelName : '最低价'
                        },{
                            value : '2',
                            labelName : '指定产品'
                        }]
                    },
                    // {
                    //     label : '预订成团人数',
                    //     keyName : 'inoteger10',
                    //     type : 1,
                    //     // isRequired : true,
                    //     hasDec : '(0表示不控制人数)',
                    //     isRedDec : true,
                    //     className : 'input-small'
                    // },
                    {
                        label : '可修改游览日期次数控制',
                        keyName : 'inoteger9',
                        type : 1,
                        // isRequired : true,
                        hasDec : '(0表示不控制次数)',
                        isRedDec : true,
                        className : 'input-small'
                    },{
                        label : '二维码自定义网址',
                        keyName : 'noted9',
                        type : 1,
                        // isRequired : true,
                        hasDec : '(可定义票号参数：{1})',
                        isRedDec : true,
                        className : 'input-large'
                    },{
                        label : '景区固有服务',
                        keyName : 'noted1',
                        type : 7,
                        hasDec : '最多输入400字',
                        isRedDec : true
                    },{
                        label : '景区娱乐设施',
                        keyName : 'noted2',
                        type : 7,
                        hasDec : '最多输入400字',
                        isRedDec : true
                    }

                ],
                ruleDatas_property : {
                    noted1 : [
                        { type: 'string', max: 400, message: '最多输入400字', trigger: 'blur' }
                    ],
                    noted2 : [
                        { type: 'string', max: 400, message: '最多输入400字', trigger: 'blur' }
                    ]
                },
                //开户信息
                needSave: true,
                disabledEnd: 0,
                disabledEndDate: [99999,99999],
                titleList_account : [
                    {
                        titleName : '企业信息'
                    },{
                        titleName : '联系信息'
                    },{
                        titleName : '结算信息'
                    }
                ],
                formDatas_account : {
                    settlementDays : 1
                },
                formItemList_account : [
                    {
                        label : 'id',
                        keyName : "iscenicid",
                        type : 9,
                        noShow : true,
                        divIndex : 0
                    },
                    {
                        label : '结算系统商户账号',
                        keyName : 'applicationName',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '企业名称',
                        keyName : 'companyName',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '企业网站',
                        keyName : 'website',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '企业地址',
                        keyName : 'address',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '工商注册号',
                        keyName : 'registrationNumber',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '组织机构代码',
                        keyName : 'organizationCode',
                        type : 1,
                        divIndex : 0,
                        disabled: true
                    },
                    {
                        label : '法人',
                        keyName : 'corporate',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '法人身份证',
                        keyName : 'corporateIdentity',
                        type : 1,
                        divIndex : 0
                    },
                    {
                        label : '行业类别',
                        keyName : 'providerType',
                        type : 4,
                        optionList : [],
                        divIndex : 0
                    },
                    {
                        label : '开户状态',
                        keyName : 'openState',
                        type : 4,
                        disabled: true,
                        noShow: true,
                        divIndex : 0,
                        optionList: [
                            {
                                value: 0,
                                label: '开户中'
                            },
                            {
                                value: 1,
                                label: '成功'
                            },
                            {
                                value: 2,
                                label: '失败'
                            },
                        ]
                    },
                    {
                        label : '结算审核原因',
                        keyName : 'refuseReason',
                        type : 7,
                        disabled: true,
                        noShow: true,
                        divIndex : 0
                    },
                    {
                        label : '业务联系人',
                        keyName : 'businessContact',
                        type : 1,
                        divIndex : 1
                    },
                    {
                        label : '财务联系人',
                        keyName : 'customerContact',
                        type : 1,
                        divIndex : 1
                    },{
                        label : '业务联系手机',
                        keyName : 'businessTel',
                        type : 1,
                        divIndex : 1
                    },{
                        label : '财务联系手机',
                        keyName : 'customerTel',
                        type : 1,
                        divIndex : 1
                    },{
                        label : '业务联系邮箱',
                        keyName : 'businessContactEmail',
                        type : 1,
                        divIndex : 1
                    },{
                        label : '财务联系邮箱',
                        keyName : 'customerContactEmail',
                        type : 1,
                        divIndex : 1
                    },{
                        label : '合约时间',
                        keyName : 'contractStartTime',
                        keyName1 : 'contractEndTime',
                        type : 11,
                        double : true,
                        divIndex : 2
                    },{
                        label : '结算银行',
                        keyName : 'bankId',
                        type : 4,
                        optionList : [],
                        divIndex : 2
                    },{
                        label : '开户城市',
                        keyName : 'city',
                        type : 1,
                        divIndex : 2
                    },{
                        label : '开户支行',
                        keyName : 'subbranch',
                        type : 1,
                        divIndex : 2
                    },{
                        label : '银行开户名',
                        keyName : 'settleBankAccountName',
                        type : 1,
                        divIndex : 2
                    },{
                        label : '银行账号',
                        keyName : 'settleBankAccount',
                        type : 1,
                        divIndex : 2
                    },{
                        label : '结算周期',
                        keyName : 'settlementDays',
                        type : 16,
                        textConBefore : 'T+ ',
                        textConAfter : ' 天',
                        divIndex : 2
                    },{
                        label : '结算费率2',
                        keyName : 'settlementRate',
                        type : 4,
                        optionList : [],
                        divIndex : 2
                    }

                ],
                ruleDatas_account : {
                    applicationName: [
                        { required: true, validator: this.$reg.applicationName, trigger: 'blur' }
                    ],
                    companyName: [
                        { required: true, message: '企业名称不能为空', trigger: 'blur' }
                    ],
                    website: [
                        { validator: this.$reg.website, trigger: 'blur' }
                    ],
                    registrationNumber: [
                        { required: true, message: '工商注册号不能为空', trigger: 'blur' }
                    ],
                    organizationCode: [
                        { required: true, message: '组织机构代码不能为空', trigger: 'blur' }
                    ],
                    corporate: [
                        { required: true, message: '法人信息不能为空', trigger: 'blur' }
                    ],
                    corporateIdentity: [
                        { required: true, validator: this.$reg.IDcard, trigger: 'blur' }
                    ],
                    businessContact: [
                        { required: true, message: '业务联系人不能为空', trigger: 'blur' }
                    ],
                    businessTel: [
                        { required: true, validator: this.$reg.mobile, trigger: 'blur' }
                    ],
                    businessContactEmail: [
                        { required: true, validator: this.$reg.email, trigger: 'blur' }
                    ],
                    contractStartTime: [
                        { required: true, validator: settlementDays, trigger: 'blur' }
                    ],

                    // bankId: [
                    //     { required: true, message: '结算银行不能为空', trigger: 'change' }
                    // ],
                    city: [
                        { required: true, message: '开户城市不能为空', trigger: 'blur' }
                    ],
                    subbranch: [
                        { required: true, message: '开户支行不能为空', trigger: 'blur' }
                    ],
                    settleBankAccountName: [
                        { required: true, message: '银行开户名不能为空', trigger: 'blur' }
                    ],
                    settleBankAccount: [
                        { required: true, message: '银行账号不能为空', trigger: 'blur' }
                    ],
                    settlementDays: [
                        { required: true, validator: this.$reg.settlementDays, trigger: 'blur' }
                    ],
                    // settlementRate: [
                    //     { required: true, message: '结算费率2不能为空', trigger: 'change' }
                    // ]
                },
            }
        },
        methods : {
            // 点击新增修改查看按钮跳到对应页面
            changeIndex (type,id,name) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '服务商信息新增';
                    this.setAddForm(type)
                } else if (type === 13) {
                    this.tipName = '服务商信息修改';
                    this.setEditForm(type)
                } else if(type === 14){
                    this.setViewForm(type)
                } else if(type === 15){
                    this.tipName = '景区属性设置';
                    this.setPropertyForm(type,id,name)
                } else if(type === 16){
                    this.tipName = '开户信息保存';
                    this.setAccountForm(type,id)
                }
            },
            //表格相关
            getChooseData(row){
                console.log(row)
                this.currentRowData["id"] = row.iscenicid;
                this.currentRowData["name"] = 'iscenicid';
                this.currentRowData["szscenicname"] = row.szscenicname;
                this.btnList[3].url = this.baseUrl+'/ticket/provider/v1/deleteProvider?iscenicId='+row.iscenicid;
            },
            changePage(pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
            },
            changePageSize(pageSize){
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
            },
            isSingle(page){
                if(page == 1) this.single = 0;
                else this.single = page;
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    radiobuttom : this.pars.formDatas.radiobuttom,
                    condition : this.pars.formDatas.condition
                };
            },
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
            },
            //表单相关
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
            },
            clearFormData(){
                this.pars.formDatas = {
                    radiobuttom : 0,
                    condition : ''
                }
            },
            //获取经纬度
            confirmMap (center) {
                this.$set(this.formDatas_add, 'longitude', `${center.lng},${center.lat}`)
            },
            //获取上传图片列表
            getUploadList (fileList) {
                let [imgList,upids] = [[],[]];
                this.formDatas_add.imgList = fileList;
                fileList.map(item => {
                    if (item.response.code === 200) {
                        upids.push(item.response.data.upid);
                        imgList.push(item)
                    }
                });
                this.formDatas_add.upids = upids;
                this.formDatas_add.imgList = imgList;
            },
            //移除图片列表中某张图片
            handleImgRemove (index) {
                this.formDatas_add.imgList.splice(index,1);
                this.formDatas_add.upids.splice(index,1)
            },
            //移动图片位置
            handleMove(index, direction) {
                if (direction === 'left') {
                    this.swapArray(this.formDatas_add.imgList, index, index-1);
                    this.swapArray(this.formDatas_add.upids, index, index-1)
                } else {
                    this.swapArray(this.formDatas_add.imgList, index, index+1);
                    this.swapArray(this.formDatas_add.upids, index, index+1)
                }
            },
            //互换数组元素位置
            swapArray(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            },
            //获取服务商等级列表
            async getLevelList () {
                if (this.formItemList_add[4].optionList.length === 0) {
                    let url = `${this.baseUrl}/ticket/provider/v1/getScenicGrades`;
                    const options = await this.$common.getSelectItem(url, this, 4, 'pmcd', 'pmva', true);
                    this.formItemList_add[4].optionList = options
                }
            },
            //根据景区id获取详情
            getDetailMsg (type,isView) {
                this.$http.get(`${this.baseUrl}/ticket/provider/provider/queryByScenicId`, {
                    params: {
                        access_token: this.Cookies.get('token'),
                        scenicId: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        if (isView) {
                            let color = '';
                            data.provider.iscanreturn = data.provider.iscanreturn ? '是' : '否';
                            data.provider.icanmodify = data.provider.icanmodify ? '是' : '否';
                            if (data.pc) {
                                data.pc.contractStartTime = this.$common.getCurrentDate(data.pc.contractStartTime);
                                data.pc.contractEndTime = this.$common.getCurrentDate(data.pc.contractEndTime);
                                data.pc.settlementDays = `T+${data.pc.settlementDays}天`;
                                data.pc.status = data.pc.status ? '已开户' : '未开户';
                                color = data.pc.status ? '#16a951' : '#c00';
                                this.formItemList_view[this.formItemList_view.length-1].color = color;
                            }
                            this.formDatas_view = Object.assign({},data.provider, data.pc);
                        } else {
                            this.formDatas_add = data.provider;
                            let arr = data.provider.businesshours.split('-');
                            this.formDatas_add.businesshours = arr[0];
                            this.$set(this.formDatas_add, 'businesshoursend', arr[1]);
                            if (this.formDatas_add.szlocation) {
                                this.$refs.server.$refs.szlocation[0].setUEContent(this.formDatas_add.szlocation)
                            } else {
                                this.$refs.server.$refs.szlocation[0].setUEContent('')
                            }
                            if (this.formDatas_add.strbookdescription) {
                                this.$refs.server.$refs.strbookdescription[0].setUEContent(this.formDatas_add.strbookdescription)
                            } else {
                                this.$refs.server.$refs.strbookdescription[0].setUEContent('')
                            }
                            if (this.formDatas_add.note) {
                                this.$refs.server.$refs.note[0].setUEContent(this.formDatas_add.note)
                            } else {
                                this.$refs.server.$refs.note[0].setUEContent('')
                            }
                            if (this.formDatas_add.list.length) {
                                let [upids,imgList] = [[],[]];
                                this.formDatas_add.list.map(item => {
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
                                this.$set(this.formDatas_add, 'imgList', imgList);
                                this.$set(this.formDatas_add, 'upids', upids);
                                this.uploadImgList = imgList
                            } else {
                                this.$set(this.formDatas_add, 'imgList', []);
                                this.$set(this.formDatas_add, 'upids', []);
                            }
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            async setAddForm (type) {
                await this.getLevelList();
                this.formItemList_add[0].noShow = true;
                this.$refs.server.$refs.szlocation[0].setUEContent('');    //富文本编辑器内容清空
                this.$refs.server.$refs.strbookdescription[0].setUEContent('');
                this.$refs.server.$refs.note[0].setUEContent('');
                this.formDatas_add = {
                    imgList: [],
                    upids: [],
                    irootid: 0,      //隐含参数
                    iparentid: 0,      //隐含参数
                    ilevel: 1,      //隐含参数
                    ilevelsequence: 1,      //隐含参数
                    bisleaf: 0,      //隐含参数
                    isjd: 0,      //隐含参数
                    pdtp: '01',     //隐含参数
                    szdata: 0,     //隐含参数
                    istogetherbooking: 1,    //隐含参数
                    istogetherticket: 1,     //隐含参数
                    szinnerid: 0,     //隐含参数
                    szinnercode: 0,     //隐含参数
                    szinnername: 0,     //隐含参数
                    scenictype: '01',
                    szgrade: '99',
                    iordernumber: 1,
                    szlasttime: '01:00',
                    byisuse: 1,
                    imaxdata: 15,
                    iscanreturn: 0,
                    icanmodify: 0,
                    printreceipt: 0,
                    printinvoice: 0,
                };
                this.spinShow = false;
                this.currentIndex = type
            },
            async setEditForm (type) {
                await this.getLevelList();
                this.formItemList_add[0].noShow = false;
                this.getDetailMsg(type)
            },
            async setViewForm (type) {
                this.getDetailMsg(type,1)
            },
            async getFormData_add (obj) {
                this.btnLoading = true;
                let aaa = '';
                this.formDatas_add.szlocation = this.$refs.server.$refs.szlocation[0].getUEContent();
                this.formDatas_add.strbookdescription = this.$refs.server.$refs.strbookdescription[0].getUEContent();
                this.formDatas_add.note = this.$refs.server.$refs.note[0].getUEContent();
                obj = JSON.parse(JSON.stringify(obj));
                obj.businesshours = obj.businesshours + '-' + obj.businesshoursend;
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData('/ticket/provider/v1/providerSave?flag=1', this, obj, 'post', true)
                } else if (this.currentIndex === 13){
                    aaa = await this.$common.editData('/ticket/provider/v1/providerSave?flag=2', this, obj, 'post', true)
                }
                this.currentRowData = {};
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
                }
            },
            setPropertyForm (type,id,name) {
                this.$http.get(this.baseUrl+'/ticket/provider/v1/queryScenicProvider?access_token='+this.Cookies.get('token')+'&iscenicId='+ id)
                    .then(res => {
                        if(res.data.code === 200){
                            this.formDatas_property = res.data.data;
                        }else{
                            this.formDatas_property = {
                                szscenicname : name,
                                inoteger4 : 0,
                                numter1 : 1,
                                inoteger1 : 0,
                                inoteger3 : 1,
                                inoteger5 : 1,
                                noted4 : '0',
                                noted5 : '0',
                                meet : '1',
                                inoteger6 : 0,
                                inoteger7 : 0,
                                inoteger8 : 0,
                                inoteger10 : 0,
                                inoteger9 : 0
                            }
                        }
                        this.spinShow = false;
                        this.currentIndex = type
                    })
            },
            getFormData_property (obj) {
                this.btnLoading = true;
                this.$common.editData('/ticket/provider/v1/saveScenicprovider', this, obj,'post')
            },
            //获取银行列表 结算费率列表
            getSelectData() {
                return new Promise((resolve,reject) => {
                    this.$http.get(this.baseUrl+'/ticket/provider/v1/queryProviderCompanySelectDataInit?access_token='+this.Cookies.get('token'))
                        .then(res => {
                            if(res.data.code === 200){
                                let options1= [], options2 = [], options3 = [];
                                res.data.data.banks.forEach(element => {
                                    let oneOption = {};
                                    oneOption["value"] = element.id;
                                    oneOption["label"] = element.name;
                                    options1.push(oneOption);
                                });
                                res.data.data.rates.forEach(element => {
                                    let oneOption = {};
                                    oneOption["value"] = element.id;
                                    oneOption["label"] = element.memo;
                                    options2.push(oneOption);
                                });
                                res.data.data.parameters.forEach(element => {
                                    let oneOption = {};
                                    oneOption["value"] = element.id;
                                    oneOption["label"] = element.name;
                                    options3.push(oneOption);
                                });
                                this.formItemList_account[9].optionList = options3;
                                this.formItemList_account[19].optionList = options1;
                                this.formItemList_account[25].optionList = options2;
                                resolve()
                            }else{
                                this.$common.showMessageModal(this, res, 1);
                                this.spinShow = false;
                                reject();
                            }
                        })
                })
            },
            async setAccountForm (type,id) {
                const obj = {
                    access_token: this.Cookies.get('token'),
                    scenicId: id
                };
                let szbankaccount = '';
                const res = await this.$http.get(`${this.baseUrl}/sys/company/v1/getOrganizitionCode`, { params: obj});
                if (res.data.code === 200) {
                    if (!res.data.data.szbankaccount) {
                        this.$common.showMessageModal(this, '请先填写企业信息的组织机构代码', 2);
                        this.spinShow = false;
                        return false
                    } else {
                        szbankaccount = res.data.data.szbankaccount
                    }
                } else {
                    this.$common.showMessageModal(this, res, 1);
                    this.spinShow = false;
                    return false
                }
                await this.getSelectData();
                this.$http.get(this.baseUrl+'/ticket/provider/v1/queryCreateAccount', {
                    params: {
                        access_token: this.Cookies.get('token'),
                        scenicidOrUsid: id,
                        type: '02'
                    }
                }).then(res => {
                    if(res.data.code === 200){
                        this.needSave = res.data.data.openState === 1 ? false : true
                        this.formDatas_account = res.data.data;
                        /**
                         * @since liuy 修改于 2018-9-15 14:30:39
                         * 景区信息的开户管理和分销管理的开户管理，后端用的是同一个接口，现在只有分销商才有usid，
                         * 所以景区信息这里的开户管理不需要usid，给了个空字符串
                         */ 
                        // this.$set(this.formDatas_account, 'usid', id);
                        this.$set(this.formDatas_account, 'usid', '');
                        this.$set(this.formDatas_account, 'type', '02');
                        this.formDatas_account.providerType = parseInt(this.formDatas_account.providerType);
                        if (!this.formDatas_account.bankId) {
                            this.formDatas_account.bankId = this.formItemList_account[19].optionList[0].value
                        }
                        if (!this.formDatas_account.settlementRate) {
                            this.formDatas_account.settlementRate = this.formItemList_account[25].optionList[0].value
                        }
                        if (!this.formDatas_account.providerType) {
                            this.formDatas_account.providerType = this.formItemList_account[9].optionList[0].value
                        }
                        this.formDatas_account.organizationCode = szbankaccount;
                        const openState = this.formDatas_account.openState;
                        if (typeof openState !== 'number') {
                            this.formItemList_account[10].noShow = true;
                        } else {
                            this.formItemList_account[10].noShow = false;
                        }
                        if (openState === 2 && this.formDatas_account.refuseReason) {
                            this.formItemList_account[11].noShow = false
                        } else {
                            this.formItemList_account[11].noShow = true
                        }
                        if (this.formDatas_account.settleBankAccount) {
                            this.formItemList_account[23]['disabled'] = true
                        } else {
                            this.formItemList_account[23]['disabled'] = false
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                });
            },
            async getFormData_account (obj) {
                this.btnLoading = true;
                this.$set(obj, 'type', '02');       //景区开户type为02
                obj = JSON.parse(JSON.stringify(obj));
                obj.contractStartTime = this.$common.getCurrentDate(obj.contractStartTime);
                obj.contractEndTime = this.$common.getCurrentDate(obj.contractEndTime);
                // 测试参数是否正确
                // console.log(obj);
                // return;
                const aaa = await this.$common.editData('/ticket/provider/v1/saveAccount', this, obj,'post',false);
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
            },
            //关闭新增查看页
            closeCurrentPage () {
                this.currentIndex = 1;
            },
            //时间转化
            toTime (time) {
                let timeArr = time.split(':');
                return parseInt(timeArr[0] * 60) + parseInt(timeArr[1])
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
        },
        watch: {
            'formDatas_account.contractStartTime' (val) {
                this.disabledEnd = Date.parse(val);
                this.disabledEndDate = [-1,99999];
            }
        }
    }
</script>

<style>
    #server .edui-editor-toolbarbox{
        line-height: 0;
    }
</style>
