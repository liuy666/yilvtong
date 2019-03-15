<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">旅行社用户管理</span>
                    <top-btn
                            :btn-list="btnList"
                            :current-row-data="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :is-list-page="true"
                        :is-mixed="false"
                        :label-width="10"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList_list"
                        @getFormData="getFormData"
                        @refreshData="refreshData"
                        @clearFormData="clearFormData"
                        @focusInput = "focusInput"
                        @selectOpenChange = "selectOpenChange"
                ></detail-form1>
                <radio-table
                        :colname="colname"
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
                <common-dialog
                        :modal="modal"
                        :content-type="dialogContentType"
                        :dialog-title="dialogTitle"
                        :modal_width="modal_width"
                        :form-datas="dialogFormDatas"
                        :dialog-form-item-list="dialogFormItemList"
                        :dialog-message="dialogMessage"
                        @changeModal="changeModal"
                        @refreshData="refreshData"
                        :modal-loading="modal_loading"
                        :is-from-btn-components="isFromBtnComponents"
                        :current-data="currentRowData"
                ></common-dialog>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增团体用户</span>
                    <span v-if="currentIndex === 13" class="title_span">修改团体用户</span>
                </p>
                <detail-form-area
                        :form-datas="formDatas_add"
                        :form-item-list="formItemList_add"
                        :rule-datas="ruleDatas_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :is-close="isClose"
                        :label-width="labelWidth_add"
                        :title-list="titleList_add"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form-area>
            </Card>
            <Card v-show="currentIndex === 14 || currentIndex === 15">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 14" class="title_span">查看用户信息</span>
                    <span v-if="currentIndex === 15" class="title_span">审核团队用户</span>
                </p>
                <view-del-detail
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :label-width="labelWidth_view"
                        :title-list="titleList_view"
                        :view-btn-list="viewBtnList"
                        :is-view="true"
                        :is-show="true"
                        :showTwoCol = "true"
                        :is-close="isClose"
                        @getFormData = "checkUser"
                        @closeCurrentPage="closeCurrentPage"
                ></view-del-detail>
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
                        :label-width="labelWidth_account"
                        :title-list="titleList_account"
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
        return {
            searchCount: 1,
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            total:0,
            loading: false,
            single: 0,
            //按钮部分
            btnList : [
                {
                    type : 1,
                    btnlabel : "刷新"
                },{
                    type : 12,
                    btnlabel : "新增",
                },{
                    type : 13,
                    btnlabel : "修改",
                },
                {
                    type : 4,
                    btnlabel : "删除",
                    dialogType : 'del'
                },
                {
                    type : 14,
                    btnlabel : "查看",
                }
            ],
            //表单部分
            formItemList_list : [
                {
                    label : "",
                    keyName : "radiobutton",
                    type : 13,
                    class: 'float_option_big',
                    optionList: [
                        {
                            value: 0,
                            type: 1,
                            keyName: 'usid',
                            labelName: '按用户编号查询'
                        },
                        {
                            value: 1,
                            type: 1,
                            keyName: 'lname',
                            labelName: '按联系人姓名查询（模糊查询）'
                        },
                        {
                            value: 5,
                            type: 1,
                            keyName: 'email',
                            labelName: '按邮箱或手机号码查询'
                        },
                        {
                            value: 2,
                            type: 1,
                            keyName: 'corpname',
                            labelName: '按公司名（模糊查询）'
                        },
                        {
                            value: 3,
                            type: 2,
                            keyName: 'status',
                            labelName: '按用户有效类型查询',
                            optionList: [
                                {
                                    value: '01',
                                    label: '有效用户'
                                },
                                {
                                    value: '02',
                                    label: '无效用户'
                                },
                                {
                                    value: '00',
                                    label: '未审核用户'
                                },
                                {
                                    value: '03',
                                    label: '审核未通过用户'
                                },
                            ]
                        }
                    ]
                }
            ],
            //表格部分
            currentRowData : {},
            colname : [
                {
                    title : '用户编号',
                    key : 'usid',
                    width : 150
                },
                {
                    title : '用户昵称',
                    key : 'note6',
                    width : 150
                },
                {
                    title : '公司名称',
                    key : 'corpname',
                    width : 200
                },
                {
                    title : '分社个数',
                    key : 'susidnum',
                    width : 90
                },
                {
                    title : '操作',
                    width : 500,
                    render : (h,params) => {
                        const row = params.row;
                        return h('span',[
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.changeIndex(16,row.usid)
                                    }
                                }
                            },'开户管理'),
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogFormDatas.usid = params.row.usid;
                                        this.dialogContentType = 2;
                                    }
                                }
                            },'账户信息配置'),
                            // h('span',{
                            //     'class' : 'hover_span',
                            //     style: {
                            //         marginRight: '10px'
                            //     },
                            //     on : {
                            //         click : () => {
                            //             this.$router.push({
                            //                 name: 'travel_branch_manage',
                            //                 params: {
                            //                     id : row.usid
                            //                 }
                            //             })
                            //         }
                            //     }
                            // },'分社管理'),
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogFormDatas.usid = params.row.usid;
                                        this.dialogContentType = 2;
                                    }
                                }
                            },'登录密码初始化'),
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogFormDatas.usid = params.row.usid;
                                        this.dialogMessage = '您确定要初始化错误登录次数吗？';
                                        this.dialogContentType = 0;
                                    }
                                }
                            },'错误登录次数初始化'),
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.changeIndex(15, params.row.usid);
                                    }
                                }
                            },'审核'),
                            h('span',{
                                'class' : 'hover_span',
                                on : {
                                    click : () => {
                                        this.checkUser(params.row, '01', true)
                                    }
                                }
                            },'快速审核')
                        ])
                    }
                },
                {
                    title : '用户状态',
                    width : 130,
                    render : (h,params) => {
                        const row = params.row;
                        switch (row.status) {
                            case '00': row.status = '未审核用户'; break;
                            case '01': row.status = '有效用户'; break;
                            case '02': row.status = '无效用户'; break;
                            case '03': row.status = '审核未通过用户'; break;
                            default: break
                        }
                        return row.status;
                    }
                },
                {
                    title : '联系人',
                    key : 'lname',
                    width : 120
                },
                {
                    title : '手机号码',
                    key : 'mobile',
                    width : 150
                },
                {
                    title : '邮箱地址',
                    key : 'email',
                    width : 200
                },
                {
                    title : '联系电话',
                    key : 'telno',
                    width : 150
                },
                {
                    title : '注册时间',
                    key : 'ldate',
                    width : 150
                },
                {
                    title : '最后一次登录时间',
                    key : 'cdate',
                    width : 200
                }
            ],
            tableData : [],
            pars:{
                formDatas : {
                    radiobutton : 6,
                    ibusinessid: 2,
                    lgtp: '02',
                    ttlb: '01'
                },
                pageNum:10,
                pageCode:1,
            },
            urlQuery:{},
            //弹窗部分
            dialogFormDatas : {
                usid : '',
                password : '66666666'
            },
            dialogFormItemList: [
                {
                    type : 1,
                    label : "用户名",
                    keyName : "usid",
                    // cols: 12
                },
                {
                    type : 1,
                    label : "密码",
                    keyName : "password",
                    // cols: 12
                }
            ],
            dialogTitle: '登录密码初始化',
            dialogMessage: '您确定要初始化错误登录次数吗？',
            modal: false,
            modal_width: 0,
            dialogContentType: 0,
            modal_loading: false,
            isFromBtnComponents: false,
            //新增修改页面
            labelWidth_add : 180,
            formDatas_add : {},
            formItemList_add: [
                {
                    label : "用户名",
                    keyName : "usid",
                    type : 1,
                    hasDec : "由数字、26个英文字母组成,最少4位",
                    isRedDec : true,
                    divIndex : 0
                },
                {
                    label : "登录密码",
                    keyName : "password",
                    type : 1,
                    hasDec : "只能输入数字",
                    isRedDec : true,
                    noShow: false,
                    inputType: 'password',
                    divIndex : 0
                },
                {
                    label : "用户状态",
                    keyName : "statusName",
                    type : 1,
                    disabled : true,
                    divIndex : 0
                },
                {
                    label : "用户注册类型",
                    keyName : "lgtpName",
                    type : 1,
                    disabled : true,
                    divIndex : 0
                },
                {
                    label : "团队用户类别",
                    keyName : "ttlbName",
                    type : 1,
                    disabled : true,
                    divIndex : 0
                },
                {
                    label : "是否主用户",
                    keyName : "ustpName",
                    type : 1,
                    disabled : true,
                    divIndex : 0
                },
                {
                    label : "业务类型",
                    keyName : "szbusinessname",
                    type : 1,
                    disabled : true,
                    divIndex : 0
                },
                {
                    type : 22,
                    label : "所属地",
                    keyName : "szregionalname",
                    keyName1 : 'iregionalid',
                    btnLabel : "选择",
                    title: '选择地区',
                    multiple: false,
                    showCheckBox: false,
                    treeModal: false,
                    treeData: [],
                    treeType: 4,
                    divIndex : 0
                },
                {
                    label : "电子邮件",
                    keyName : "email",
                    type : 1,
                    divIndex : 0
                },
                {
                    label : "内部编号",
                    keyName : "bname",
                    type : 1,
                    hasDec : "注：输入大于0的整数",
                    isRedDec : true,
                    divIndex : 0
                },
                {
                    label : "联系人",
                    keyName : "lname",
                    type : 1,
                    divIndex : 1
                },
                {
                    label : "地址",
                    keyName : "addr",
                    type : 1,
                    divIndex : 1
                },
                {
                    label : "手机号码",
                    keyName : "mobile",
                    type : 1,
                    hasDec : "",
                    isRedDec : true,
                    divIndex : 1
                },
                {
                    label : "联系电话",
                    keyName : "telno",
                    type : 1,
                    divIndex : 1
                },
                {
                    label : "QQ",
                    keyName : "qq",
                    type : 1,
                    divIndex : 1
                },
                {
                    label : "MSN",
                    keyName : "msn",
                    type : 1,
                    divIndex : 1
                },
                {
                    label : "企业名称",
                    keyName : "corpname",
                    type : 1,
                    divIndex : 2
                },
                {
                    label : "旅行社许可证号",
                    keyName : "tourlicensecode",
                    type : 1,
                    divIndex : 2
                },
                {
                    label : "营业执照号码",
                    keyName : "businesslicensescode",
                    type : 1,
                    divIndex : 2
                },
                {
                    label : "企业传真",
                    keyName : "faxno",
                    type : 1,
                    divIndex : 2
                },
                {
                    label : "企业邮编",
                    keyName : "postno",
                    type : 1,
                    divIndex : 2
                },
                {
                    label : "企业网址",
                    keyName : "notea",
                    type : 1,
                    divIndex : 2
                },
                {
                    label : "企业简介",
                    keyName : "noteb",
                    type : 7,
                    class : 'one-row-class',
                    divIndex : 2
                }
            ],
            ruleDatas_add : {
                usid: [
                    { validator: this.$reg.usid, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                mobile: [
                    { validator: this.$reg.mobile, trigger: 'blur' }
                ],
                email: [
                    { validator: this.$reg.email, trigger: 'blur' }
                ],
                szregionalname: [
                    { required: true, message: '所属地不能为空', trigger: 'blur' }
                ],
                bname: [
                    { validator: this.$reg.bname, trigger: 'blur' }
                ],
                tourlicensecode: [
                    { required: true, message: '旅行社许可证号不能为空', trigger: 'blur' }
                ],
                businesslicensescode: [
                    { required: true, message: '营业执照号码不能为空', trigger: 'blur' }
                ],
                corpname: [
                    { required: true, message: '企业名称不能为空', trigger: 'blur' }
                ],
                lname: [
                    { required: true, message: '联系人不能为空', trigger: 'blur' }
                ],
                addr: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                telno: [
                    { validator: this.$reg.telno, trigger: 'blur' }
                ],
                postno: [
                    { validator: this.$reg.postno, trigger: 'blur' }
                ],
            },
            titleList_add : [
                {
                    titleName : '基本资料'
                },
                {
                    titleName : '联系信息'
                },
                {
                    titleName : '企业信息'
                },
            ],
            tipName : '',
            //查看页面
            labelWidth_view : 180,
            formDatas_view : {},
            formItemList_view :[
                {
                    label : '用户编号',
                    keyName : 'usid',
                    divIndex : 0
                },
                {
                    label : '用户状态',
                    keyName : 'statusName',
                    divIndex : 0
                },
                {
                    label : '用户注册类型',
                    keyName : 'lgtpName',
                    divIndex : 0
                },
                {
                    label : "团队用户类别",
                    keyName : "ttlbName",
                    divIndex : 0
                },
                {
                    label : "是否主用户",
                    keyName : "ustpName",
                    divIndex : 0
                },
                {
                    label : '业务类型',
                    keyName : 'szbusinessname',
                    type: null,
                    divIndex : 0,
                    optionList : []
                },
                {
                    label : '所属地',
                    keyName : 'szregionalname',
                    divIndex : 0
                },
                {
                    label : '电子邮件',
                    keyName : 'email',
                    divIndex : 0
                },
                {
                    label : '内部编号',
                    keyName : 'bname',
                    isHidden: true,
                    type: 1,
                    divIndex: 0
                },
                {
                    label: '用户级别',
                    keyName: 'note2',
                    isHidden: true,
                    type: 4,
                    optionList: [],
                    divIndex: 0,
                },
                {
                    label : '联系人',
                    keyName : 'lname',
                    divIndex : 1
                },
                {
                    label : '地址',
                    keyName : 'addr',
                    divIndex : 1
                },
                {
                    label : '手机号码',
                    keyName : 'mobile',
                    divIndex : 1
                },
                {
                    label : '联系号码',
                    keyName : 'telno',
                    divIndex : 1
                },
                {
                    label : '身份证',
                    keyName : 'note10',
                    divIndex : 1,
                    isHidden: false
                },
                {
                    label : 'QQ',
                    keyName : 'qq',
                    divIndex : 1
                },
                {
                    label : 'MSN',
                    keyName : 'msn',
                    divIndex : 1
                },
                {
                    label : "企业名称",
                    keyName : "corpname",
                    divIndex : 2
                },
                {
                    label : "旅行社许可证号",
                    keyName : "tourlicensecode",
                    divIndex : 2
                },
                {
                    label : "营业执照号码",
                    keyName : "businesslicensescode",
                    divIndex : 2
                },
                {
                    label : "企业传真",
                    keyName : "faxno",
                    isHidden : false,
                    divIndex : 2
                },
                {
                    label : "企业邮编",
                    keyName : "postno",
                    isHidden : false,
                    divIndex : 2
                },
                {
                    label : "企业网址",
                    keyName : "notea",
                    divIndex : 2
                },
                {
                    label : "企业简介",
                    keyName : "noteb",
                    divIndex : 2
                },
                {
                    label : '结算系统用户编号',
                    keyName : 'hqytId',
                    divIndex : 3
                },
                {
                    label : '结算系统用户账号',
                    keyName : 'usid',
                    divIndex : 3
                },
            ],
            titleList_view : [],
            viewBtnList: [],
            //开户页面
            labelWidth_account : 180,
            formDatas_account : {},
            formItemList_account: [
                {
                    type: 1,
                    label: '结算系统商户账号',
                    keyName: 'applicationName',
                    class: 'one-row-class',
                    className: 'input-large',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '企业名称',
                    keyName: 'companyName',
                    class: 'one-row-class',
                    className: 'input-large',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '企业网站',
                    keyName: 'website',
                    class: 'one-row-class',
                    className: 'input-large',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '企业网站',
                    keyName: 'website',
                    class: 'one-row-class',
                    className: 'input-large',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '工商注册号',
                    keyName: 'registrationNumber',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '组织结构代码',
                    keyName: 'organizationCode',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '法人',
                    keyName: 'corporate',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '法人身份证',
                    keyName: 'corporateIdentity',
                    divIndex: 0
                },
                {
                    type: 4,
                    label: '行业类别',
                    keyName: 'providerType',
                    optionList: [],
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '业务联系人',
                    keyName: 'businessContact',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '客服联系人',
                    keyName: 'customerContact',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '业务联系手机',
                    keyName: 'businessTel',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '客服联系手机',
                    keyName: 'customerTel',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '业务联系邮箱',
                    keyName: 'businessContactEmail',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '客服联系邮箱',
                    keyName: 'customerContactEmail',
                    divIndex: 1
                },
                {
                    type: 4,
                    label: '结算银行',
                    keyName: 'bankId',
                    optionList: [],
                    divIndex: 2
                },
                {
                    type: 1,
                    label: '开户城市',
                    keyName: 'city',
                    divIndex: 2
                },
                {
                    type: 1,
                    label: '开户支行',
                    keyName: 'subbranch',
                    divIndex: 2
                },
                {
                    type: 1,
                    label: '银行开户名',
                    keyName: 'settleBankAccountName',
                    divIndex: 2
                },
                {
                    type: 1,
                    label: '银行账号',
                    keyName: 'settleBankAccount',
                    divIndex: 2
                },
            ],
            ruleDatas_account : {},
            titleList_account : [
                {
                    titleName : '企业信息'
                },
                {
                    titleName : '联系信息'
                },
                {
                    titleName : '结算信息'
                },
            ],
        }
    },
    methods : {
         // 点击新增修改查看按钮跳到对应页面
         changeIndex (type, usid) {
             this.spinShow = true;
             if (type === 12) {
                 this.setAddForm()
             } else if (type === 13) {
                 this.setEditForm()
             } else if (type > 13 && type < 16) {
                 this.setViewForm(type,usid)
             } else if (type === 16) {
                 this.setAccountForm(usid)
             }
             this.currentIndex = type
         },
         getChooseData (row) {
             this.currentRowData['id'] = row.usid;
             this.currentRowData['name'] = 'usid';
             this.btnList[3].url = `${this.baseUrl}/ec/custom/v1/deleteCustom?usid=${row.usid}`;
         },
         changePage(pageCode) {
             let arr = this.$store.state.page.listPagePars;
             for (let item of arr) {
                 if (item.path == this.$route.path && item.index == 1) {
                     this.pars = item.pars;
                     break;
                 }
             }
             this.currentRowData = {};
             this.pars.pageCode = pageCode;
             this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
         },
         changePageSize(pageSize){
             let arr = this.$store.state.page.listPagePars;
             for (let item of arr) {
                 if (item.path == this.$route.path && item.index == 1) {
                     this.pars = item.pars;
                     break;
                 }
             }
             this.currentRowData = {};
             this.pars.pageNum = pageSize;
             this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
         },
         getFormData(data){
             this.pars.formDatas = data;
             this.pars.pageCode = 1;
             this.pars.pageNum = 10;
             this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
         },
         refreshUrlQuery () {
             this.urlQuery = {
                 pageSize: this.pars.pageNum,
                 page: this.pars.pageCode,
                 radiobutton: this.pars.formDatas.radiobutton,
                 usid : this.pars.formDatas.usid,
                 lname : this.pars.formDatas.lname,
                 email : this.pars.formDatas.email,
                 corpname : this.pars.formDatas.corpname,
                 status : this.pars.formDatas.status,
                 ibusinessid: this.pars.formDatas.ibusinessid,
                 lgtp: this.pars.formDatas.lgtp,
                 ttlb: this.pars.formDatas.ttlb
             };
         },
         refreshData(){
             this.pars.pageCode = this.pars.pageCode - this.single;
             this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
         },
         clearFormData(){
             this.pars.formDatas = {
                 radiobutton : 6,
                 ibusinessid: 2,
                 lgtp: '02',
                 ttlb: '01'
             }
         },
         isSingle(page){
             this.single = page
         },
         focusInput (val) {
             this.pars.formDatas.radiobutton = val
         },
         selectOpenChange () {
             this.pars.formDatas.radiobutton = 3
         },
         async checkUser (row, status, isQuick) {
             let [aaa,url] = ['',''];
             let obj = {
                 usid: row.usid,
                 lgtp: row.lgtp,
                 ustp: row.ustp,
                 ttlb: row.ttlb,
                 status: status
             };
             switch (status) {
                 case '00': this.tipName = `用户：${row.usid}取消审核！`; break;
                 case '01': this.tipName = `用户：${row.usid}审核通过！`; break;
                 case '02': this.tipName = `用户：${row.usid}为无效用户！`; break;
                 case '03': this.tipName = `用户：${row.usid}未通过审核！`; break;
                 default: break
             }
             if (isQuick) {   //是否为快速审核
                 url = '/ec/custom/v1/quickPassCustom';
             } else {
                 obj['ibusinessid'] = this.formDatas_view.ibusinessid;
                 obj['note2'] = this.formDatas_view.note2;
                 obj['bname'] = this.formDatas_view.bname;
                 url = '/ec/custom/v1/passCustom';
             }
             aaa = await this.$common.editData(url, this, obj, 'post');
             if (aaa) {
                 this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
             }
         },
        async changeModal(e, type){
            if (e) {
                this.modal_loading = true;
                await this.passwordInit(type);    //0或2
                this.modal_loading = false;
            }
            this.modal = false;
        },
        //密码初始化或者初始化错误登录次数
        passwordInit (isInitPwd) {
            let url = '/ec/custom/v1/initCustomPwdSave?';
            let params = {
                usid: this.dialogFormDatas.usid
            };
            if (isInitPwd) {
                params['flag'] = 1;
                params['pwd'] = this.dialogFormDatas.password;
            } else {
                params['flag'] = 2;
            }
            for (let i in params) {
                url += `${i}=${params[i]}&`
            }
            url = url.substr(0,url.length-1);
            this.$common.editData(url, this, {}, 'post', true);
        },
         //新增页初始化
         setAddForm () {
             this.tipName = "新增";
             this.formItemList_add[0].hasDec = '由数字、26个英文字母组成,最少4位';
             this.formItemList_add[1].noShow = false;
             this.formItemList_add[12].hasDec = '';
             this.formDatas_add = {
                 status: '01',
                 lgtp: '02',
                 ustp: '01',
                 usqx: '11110001000000000000',
                 ttlb: '01',
                 ibusinessid: 2,
                 susid: '0',
                 ustpName: '是',
                 statusName: '有效用户',
                 lgtpName: '团体用户',
                 ttlbName: '旅行社',
                 szbusinessname: '旅行社业务'
             };
             this.spinShow = false;
         },
         //修改页初始化
         async setEditForm () {
             await this.getRoleInfo();
             this.tipName = "修改";
             this.formItemList_add[0].hasDec = '';
             this.formItemList_add[1].noShow = true;
             this.formItemList_add[12].hasDec = '如需修改手机号或邮箱请拨打客服电话：40088-11138';
         },
        //查看页初始化
        async setViewForm (type,usid) {
            await this.getRoleInfo(true, usid);
            if (type === 14) {
                this.titleList_view = [
                    {
                        titleName : '基本资料'
                    },
                    {
                        titleName : '联系信息'
                    },
                    {
                        titleName : '企业信息'
                    },
                    {
                        titleName : '结算信息'
                    }
                ];
                this.formItemList_view[5].type = null;
                this.formItemList_view[5].keyName = 'szbusinessname';
                this.formItemList_view[8].isHidden = true;
                this.formItemList_view[9].isHidden = true;
                this.formItemList_view[14].isHidden = false;
                this.formItemList_view[20].isHidden = false;
                this.formItemList_view[21].isHidden = false;
                this.viewBtnList = [];
            } else if (type === 15) {
                this.getSelectItem();
                this.titleList_view = [
                    {
                        titleName : '基本资料'
                    },
                    {
                        titleName : '联系信息'
                    },
                    {
                        titleName : '企业信息'
                    }
                ];
                this.formItemList_view[5].type = 4;
                this.formItemList_view[5].keyName = 'ibusinessid';
                this.formItemList_view[8].isHidden = false;
                this.formItemList_view[9].isHidden = false;
                this.formItemList_view[14].isHidden = true;
                this.formItemList_view[20].isHidden = true;
                this.formItemList_view[21].isHidden = true;
                if (this.formDatas_view.status === '00' || this.formDatas_view.status === '02') {
                    this.viewBtnList = [
                        {
                            status: '01',
                            btnLabel: '有效用户',
                        },
                        {
                            status: '03',
                            btnLabel: '审核不通过'
                        }
                    ]
                } else if (this.formDatas_view.status === '01') {
                    this.viewBtnList = [
                        {
                            status: '00',
                            btnLabel: '取消审核'
                        },
                        {
                            status: '02',
                            btnLabel: '无效用户'
                        }
                    ]
                } else {
                    this.viewBtnList = []
                }
            }
        },
        //审核页面初始化下拉列表
        async getSelectItem () {
            let url = `${this.baseUrl}/ticket/crowdKindPrice/v1/getCrowdKindPriceSelectData`;
            this.$http.get(url, {
                params: {
                    access_token: this.Cookies.get('token')
                }
            }).then(res => {
                if (res.data.code === 200) {
                    res.data.data.businessList.map(item => {
                        this.formItemList_view[5].optionList.push({
                            value: item.ibusinessid,
                            label: item.szbusinessname
                        })
                    });
                    res.data.data.retrieve.map(item => {
                        this.formItemList_view[9].optionList.push({
                            value: item.pmcd,
                            label: item.pmva
                        })
                    });
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
            })
        },
        //根据id查询角色信息
        getRoleInfo (isView,usid) {
            return new Promise(resolve => {
                this.$http.get(this.baseUrl+'/ec/custom/v1/getCustomInfoById',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        usid: usid || this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data.custom;
                        switch (data.status) {
                            case '00': data.statusName = '未审核用户'; break;
                            case '01': data.statusName = '有效用户'; break;
                            case '02': data.statusName = '无效用户'; break;
                            case '03': data.statusName = '审核未通过用户'; break;
                            default: break
                        }
                        data.lgtpName = data.lgtp === '01' ? '散客用户' : '团体用户';
                        data.ttlbName = data.ttlb === '01' ? '旅行社' : '导游';
                        data.ustpName = data.ustp === '01'? '是' : '否';
                        if (isView) {
                            this.formDatas_view = data;
                        } else {
                            this.formDatas_add = data;
                        }
                        this.spinShow = false;
                        resolve()
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            })
        },
         //新增修改保存
         async getFormData_add (obj) {
             let aaa = '';
             obj = JSON.parse(JSON.stringify(obj));
             delete obj.statusName;
             delete obj.lgtpName;
             delete obj.szbusinessname;
             delete obj.ttlbName;
             delete obj.ustpName;
             if(this.currentIndex === 12){
                 aaa = await this.$common.addNewData('/ec/custom/v1/CustomInfoSave?flag=1', this, obj, 'post', true)
             } else if(this.currentIndex === 13){
                 aaa = await this.$common.editData('/ec/custom/v1/CustomInfoSave?flag=2', this, obj, 'post', true)
             }
             this.currentRowData = {};
             if (aaa) {
                 this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
             }
         },
        //开户信息页面初始化
        setAccountForm (usid) {
            this.formDatas_account = {
                applicationName: usid
            };
            this.spinShow = false
        },
        //开户信息保存
        getFormData_account (obj) {

        },
         //关闭新增查看页
         closeCurrentPage() {
             this.currentIndex = 1;
         }
    },
    created () {
        console.log(12123);
        this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
    }
}
</script>
