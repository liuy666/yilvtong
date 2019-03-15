<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">二级分销商管理</span>
                    <top-btn
                            :btn-list="btnList"
                            :current-row-data="currentRowData"
                            dialog-title="登录密码初始化"
                            :dialog-form-datas="dialogFormDatas"
                            :dialog-form-item-list="dialogFormItemList"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                            @operate="operate"
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
                        @selected="getChooseData"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
                <common-dialog
                        :modal="modal"
                        :content-type="dialogContentType"
                        dialog-title="登录密码初始化"
                        :form-datas="dialogFormDatas"
                        :dialog-form-item-list="dialogFormItemList"
                        dialog-message="您确定要初始化错误登录次数吗？"
                        @changeModal="changeModal"
                        @refreshData="refreshData"
                        :modal-loading="modal_loading"
                        :is-from-btn-components="isFromBtnComponents"
                        :current-data="currentRowData"
                ></common-dialog>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增二级分销商</span>
                    <span v-if="currentIndex === 13" class="title_span">修改二级分销商</span>
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
                        :btn-loading="btnLoading"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form-area>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看二级分销商</span>
                </p>
                <view-del-detail
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :label-width="labelWidth_view"
                        :title-list="titleList_view"
                        :is-view="true"
                        :is-show="true"
                        :showTwoCol = "true"
                        :is-close="isClose"
                        @closeCurrentPage="closeCurrentPage"
                ></view-del-detail>
            </Card>
            <Card v-show="currentIndex === 15">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">开户信息管理</span>
                </p>
                <detail-form-area
                        :form-datas="formDatas_account"
                        :form-item-list="formItemList_account"
                        :rule-datas="ruleDatas_account"
                        :is-list-page="false"
                        :is-mixed="false"
                        :need-save="needSave"
                        :is-close="isClose"
                        :label-width="labelWidth_account"
                        :title-list="titleList_account"
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
        return {
            searchCount: 1,
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            total:0,
            loading: false,
            single: 0,
            btnLoading: false,
            //按钮部分
            btnList : [
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 12,
                    btnlabel : "新增",
                },
                {
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
                },
                {
                    type: 11,
                    btnlabel: '返回上级',
                    icon: 'reply'
                }
            ],
            //表格部分
            currentRowData : {},
            colname : [
                {
                    title : '用户名',
                    key : 'usid',
                    width : 150
                },
                {
                    title : '公司名称',
                    key : 'corpname',
                    width : 200
                },
                {
                    title : '分销商个数',
                    key : 'susidnum',
                    width : 110
                },
                {
                    title : '操作',
                    width : 400,
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
                                        this.$router.push({
                                            name: 'travel_operator_manage',
                                            params: {
                                                id : row.usid
                                            }
                                        })
                                    }
                                }
                            },'三级分销商管理'),
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.changeIndex(15,row.usid)
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
                            },'登录密码初始化'),
                            h('span',{
                                'class' : 'hover_span',
                                on : {
                                    click : () => {
                                        this.modal = true;
                                        this.dialogFormDatas.usid = params.row.usid;
                                        this.dialogMessage = '您确定要初始化错误登录次数吗？';
                                        this.dialogContentType = 0;
                                    }
                                }
                            },'错误登录次数初始化')
                        ])
                    }
                },
                {
                    title : '开户状态',
                    width : 100,
                    render : (h,params) => {
                        return h('span', params.row.pc ? '已开户' : '未开户');
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
                        return h('span', row.status);
                    }
                },
                {
                    title : '用户等级',
                    key : 'ustp',
                    width : 100
                },
                // {
                //     title : '内部编号',
                //     key : 'bname',
                //     width : 100
                // },
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
                // {
                //     title : '联系电话',
                //     key : 'telno',
                //     width : 150
                // },
                {
                    title : '注册时间',
                    key : 'ldate',
                    width : 150
                },
                {
                    title : '登录次数',
                    key : 'logtimes',
                    width : 150
                },
                {
                    title : '最后一次登录时间',
                    key : 'lastdate',
                    width : 200
                }
            ],
            tableData : [],
            pars:{
                pageNum: 10,
                pageCode: 1,
                susid: this.$route.params.id
            },
            urlQuery:{},
            //弹窗部分
            dialogFormDatas : {
                usid : '',
                password : '66666666'
            },
            dialogFormItemList:[
                {
                    type : 1,
                    label : "用户名",
                    keyName : "usid",
                    disabled: true,
                },
                {
                    type : 1,
                    label : "密码",
                    keyName : "password"
                }
            ],
            modal:false,
            dialogContentType:0,
            dialogMessage :'',
            modal_loading:false,
            isFromBtnComponents:false,
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
                    disabled : false,
                    divIndex : 0
                },
                {
                    label : "登录密码",
                    keyName : "password",
                    type : 1,
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
                    noShow: true,
                    divIndex : 0
                },
                {
                    label : "客户等级",
                    keyName : "note8",
                    type : 4,
                    optionList: [
                        {
                            value: '0000',
                            label: '无'
                        },
                        {
                            value: '0001',
                            label: 'A级'
                        },
                        {
                            value: '0002',
                            label: 'B级'
                        },
                        {
                            value: '0003',
                            label: 'C级'
                        },
                    ],
                    divIndex : 0
                },
                // {
                //     label : "景区企业",
                //     keyName : "icompanyinfoid",
                //     type : 4,
                //     divIndex : 0,
                //     optionList: []
                // },
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
                // {
                //     label : "联系电话",
                //     keyName : "telno",
                //     type : 1,
                //     divIndex : 1
                // },
                {
                    label : "QQ",
                    keyName : "qq",
                    type : 1,
                    divIndex : 1
                },
                // {
                //     label : "MSN",
                //     keyName : "msn",
                //     type : 1,
                //     divIndex : 1
                // },
                {
                    label : "企业名称",
                    keyName : "corpname",
                    type : 1,
                    divIndex : 2
                },
                // {
                //     label : "旅行社许可证号",
                //     keyName : "tourlicensecode",
                //     type : 1,
                //     divIndex : 2
                // },
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
                    { required: true, validator: this.$reg.usid, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, validator: this.$reg.mobile, trigger: 'blur' }
                ],
                email: [
                    { required: true, validator: this.$reg.email, trigger: 'blur' }
                ],
                szregionalname: [
                    { required: true, message: '所属地不能为空', trigger: 'blur' }
                ],
                // bname: [
                //     { required: true, validator: this.$reg.bname, trigger: 'blur' }
                // ],
                // tourlicensecode: [
                //     { required: true, message: '旅行社许可证号不能为空', trigger: 'blur' }
                // ],
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
                // telno: [
                //     { required: true, validator: this.$reg.telno, trigger: 'blur' }
                // ],
                postno: [
                    { validator: this.$reg.postno, trigger: 'blur' }
                ]
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
                // {
                //     label : '联系号码',
                //     keyName : 'telno',
                //     divIndex : 1
                // },
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
                // {
                //     label : 'MSN',
                //     keyName : 'msn',
                //     divIndex : 1
                // },
                {
                    label : "企业名称",
                    keyName : "corpname",
                    divIndex : 2
                },
                // {
                //     label : "旅行社许可证号",
                //     keyName : "tourlicensecode",
                //     divIndex : 2
                // },
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
            titleList_view : [
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
            ],
            //开户页面
            needSave: true,
            disabledEnd: 0,
            disabledEndDate: [99999,99999],
            labelWidth_account : 180,
            ruleDatas_account: {
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
                city: [
                    { required: true, message: '开户城市不能为空', trigger: 'blur' }
                ],
                subbranch: [
                    { required: true, message: '开户支行不能为空', trigger: 'blur' }
                ],
                settleBankAccount: [
                    { required: true, message: '银行账号不能为空', trigger: 'blur' }
                ],
                settleBankAccountName: [
                    { required: true, message: '银行开户名不能为空', trigger: 'blur' }
                ],
                settlementDays: [
                    { required: true, validator: this.$reg.settlementDays, trigger: 'blur' }
                ],
                contractStartTime: [
                    { required: true, validator: settlementDays, trigger: 'change' }
                ]
            },
            formDatas_account : {},
            formItemList_account: [
                {
                    type: 1,
                    label: '结算系统商户账号',
                    keyName: 'applicationName',
                    // class: 'one-row-class',
                    // className: 'input-50',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '企业名称',
                    keyName: 'companyName',
                    // class: 'one-row-class',
                    // className: 'input-50',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '企业网站',
                    keyName: 'website',
                    // class: 'one-row-class',
                    // className: 'input-50',
                    divIndex: 0
                },
                {
                    type: 1,
                    label: '企业地址',
                    keyName: 'address',
                    // class: 'one-row-class',
                    // className: 'input-50',
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
                    type: 1,
                    label: '业务联系人',
                    keyName: 'businessContact',
                    // class: 'one-three-class',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '财务联系人',
                    keyName: 'customerContact',
                    // class: 'one-three-class',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '业务联系人手机',
                    keyName: 'businessTel',
                    // class: 'one-three-class',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '财务联系人手机',
                    keyName: 'customerTel',
                    // class: 'one-three-class',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '业务联系人邮箱',
                    keyName: 'businessContactEmail',
                    // class: 'one-three-class',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '财务联系人邮箱',
                    keyName: 'customerContactEmail',
                    // class: 'one-three-class',
                    divIndex: 1
                },
                {
                    type: 1,
                    label: '技术联系人',
                    keyName: '',
                    class: 'one-three-class',
                    divIndex: 1,
                    noShow: true,
                },
                {
                    type: 1,
                    label: '技术联系人手机',
                    keyName: '',
                    class: 'one-three-class',
                    divIndex: 1,
                    noShow: true,
                },
                {
                    type: 1,
                    label: '技术联系人邮箱',
                    keyName: '',
                    class: 'one-three-class',
                    divIndex: 1,
                    noShow: true,
                },
                {
                    label : '合约时间',
                    keyName : 'contractStartTime',
                    keyName1 : 'contractEndTime',
                    type : 11,
                    double : true,
                    divIndex : 2
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
                {
                    type: 4,
                    label: '结算费率',
                    keyName: 'settlementRate',
                    optinonList: [],
                    divIndex: 2
                },
                {
                    type: 16,
                    label: '结算周期',
                    keyName: 'settlementDays',
                    textConBefore: 'T+',
                    textConAfter: '天',
                    divIndex: 2
                },
            ],
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
                this.setAddForm(type)
            } else if (type === 13) {
                this.setEditForm(type)
            } else if (type === 14) {
                this.setViewForm(type)
            } else if (type === 15) {
                this.setAccountForm(type,usid)
            }
        },
        getChooseData (row) {
            this.currentRowData['id'] = row.usid;
            this.currentRowData['name'] = 'usid';
            this.btnList[3].url = `${this.baseUrl}/ec/custom/v1/deleteCustom?usid=${row.usid}`;
        },
        changePage(pageCode) {
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/querySonUser', this, 'get')
        },
        changePageSize(pageSize){
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/querySonUser', this, 'get')
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                susid: this.pars.susid
            }
        },
        refreshData(){
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/querySonUser', this, 'get')
        },
        isSingle(page){
            this.single = page
        },
        //返回上一级
        operate (type) {
            if (type === 11) {
                const routeName = this.$route.name;
                let pageOpenedList = this.$store.state.app.pageOpenedList;
                for (let i = 0; i < pageOpenedList.length; i++) {
                    if (pageOpenedList[i].name === routeName) {
                        this.$store.commit('removeTag', routeName);
                        this.$store.commit('closePage', routeName);
                        pageOpenedList = this.$store.state.app.pageOpenedList;
                        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                        this.$router.go(-1);
                        break
                    }
                }
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
        async setAddForm (type) {
            // if (!this.formItemList_add[11].optionList.length) {
            //     const url = `${this.baseUrl}/sys/company/v1/getScenicCompanyInfoList`;
            //     const options = await this.$common.getSelectItem(url, this, 11, 'icompanyinfoid', 'szcompanyname', true);
            //     this.formItemList_add[11].optionList = options
            // }
            this.tipName = "二级分销商新增";
            this.formItemList_add[0].hasDec = '由数字、26个英文字母组成,最少4位';
            this.formItemList_add[0].disabled = false;
            this.formItemList_add[1].noShow = false;
            this.formItemList_add[13].hasDec = '';
            this.formDatas_add = {
                status: '01',
                lgtp: '02',
                ustp: '02',
                usqx: '11110001000000000000',
                ttlb: '01',
                ibusinessid: 2,
                susid: this.$route.params.id,
                note8: '0000',
                ustpName: '否',
                statusName: '有效用户',
                lgtpName: '团体用户',
                ttlbName: '分销商',
                szbusinessname: '分销商业务',
                // icompanyinfoid: this.formItemList_add[11].optionList[0].value
            };
            this.spinShow = false;
            this.currentIndex = type
        },
        //修改页初始化
        async setEditForm (type) {
            // if (!this.formItemList_add[11].optionList.length) {
            //     const url = `${this.baseUrl}/sys/company/v1/getScenicCompanyInfoList`;
            //     const options = await this.$common.getSelectItem(url, this, 11, 'icompanyinfoid', 'szcompanyname', true);
            //     this.formItemList_add[11].optionList = options
            // }
            this.tipName = "二级分销商修改";
            this.formItemList_add[0].hasDec = '';
            this.formItemList_add[0].disabled = true;
            this.formItemList_add[1].noShow = true;
            // this.formItemList_add[14].hasDec = '如需修改手机号或邮箱请拨打客服电话：40088-11138';
            this.getRoleInfo(type);
        },
        //查看页初始化
        setViewForm (type) {
            this.getRoleInfo(type,true);
        },
        //根据id查询角色信息
        getRoleInfo (type,isView) {
            this.$http.get(this.baseUrl+'/ec/custom/v1/getCustomInfoById',{
                params: {
                    access_token: this.Cookies.get('token'),
                    usid: this.currentRowData.id
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = {
                        ...res.data.data.custom,
                        hqytId: res.data.data.pc ? res.data.data.pc.hqytId : '',
                        applicationName: res.data.data.pc ? res.data.data.pc.applicationName : '',
                        note10: res.data.data.pc ? res.data.data.pc.corporateIdentity : ''
                    };
                    switch (data.status) {
                        case '00': data.statusName = '未审核用户'; break;
                        case '01': data.statusName = '有效用户'; break;
                        case '02': data.statusName = '无效用户'; break;
                        case '03': data.statusName = '审核未通过用户'; break;
                        default: break
                    }
                    data.lgtpName = data.lgtp === '01' ? '散客用户' : '团体用户';
                    data.ttlbName = data.ttlb === '01' ? '分销商' : '导游';
                    data.ustpName = data.ustp === '01'? '是' : '否';
                    if (isView) {
                        this.formDatas_view = data;
                    } else {
                        this.formDatas_add = data;
                    }
                } else {
                    this.$common.showMessageModal(this, res, 1);
                }
                this.spinShow = false;
                this.currentIndex = type
            })
        },
        //新增修改保存
        async getFormData_add (obj) {
            this.btnLoading = true;
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
                this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/querySonUser', this, 'get')
            }
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
                            this.formItemList_account[8].optionList = options3;
                            this.formItemList_account[21].optionList = options1;
                            this.formItemList_account[26].optionList = options2;
                            // this.formItemList_account[26].optionList = [{
                            //     value: 2,
                            //     label: '零费率'
                            // }];
                            resolve()
                        }else{
                            this.$common.showMessageModal(this, res, 1);
                            this.spinShow = false;
                            reject();
                        }
                    })
            })
        },
        //开户信息页面初始化
        async setAccountForm (type,usid) {
            await this.getSelectData();
            this.tipName = '分销商开户';
            this.$http.get(this.baseUrl+'/ticket/provider/v1/queryCreateAccount', {
                params: {
                    access_token: this.Cookies.get('token'),
                    scenicidOrUsid: usid,
                    type: '01'
                }
            }).then(res => {
                if(res.data.code === 200){
                    this.needSave = res.data.data.openState === 1 ? false : true
                    this.formDatas_account = res.data.data;
                    this.$set(this.formDatas_account, 'usid', usid);
                    this.$set(this.formDatas_account, 'type', '01');
                    if (!this.formDatas_account.bankId) {
                        this.formDatas_account.bankId = this.formItemList_account[21].optionList[0].value
                    }
                    if (!this.formDatas_account.settlementRate) {
                        this.formDatas_account.settlementRate = this.formItemList_account[26].optionList[0].value
                    }
                    if (!this.formDatas_account.providerType) {
                        this.formDatas_account.providerType = this.formItemList_account[8].optionList[0].value
                    }
                    const openState = this.formDatas_account.openState;
                    if (typeof openState !== 'number') {
                        this.formItemList_account[9].noShow = true;
                    } else {
                        this.formItemList_account[9].noShow = false;
                    }
                    if (openState === 2 && this.formDatas_account.refuseReason) {
                        this.formItemList_account[10].noShow = false
                    } else {
                        this.formItemList_account[10].noShow = true
                    }
                    if (this.formDatas_account.settleBankAccount) {
                        this.formItemList_account[25]['disabled'] = true
                    } else {
                        this.formItemList_account[25]['disabled'] = false
                    }
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.spinShow = false;
                this.currentIndex = type
            });
        },
        //开户信息保存
        async getFormData_account (obj) {
            this.btnLoading = true;
            this.$set(obj, 'type', '01');
            obj = JSON.parse(JSON.stringify(obj));
            obj.contractStartTime = this.$common.getCurrentDate(obj.contractStartTime);
            obj.contractEndTime = this.$common.getCurrentDate(obj.contractEndTime);
            const aaa = await this.$common.editData('/ticket/provider/v1/saveAccount', this, obj,'post');
            if (aaa) this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/querySonUser', this, 'get')
        },
        //关闭新增查看开户页
        closeCurrentPage() {
            this.currentIndex = 1;
        }
    },
    created () {
        // const companytype = JSON.parse(sessionStorage.getItem('companytype'));
        // if (companytype === '01') {
        //     this.btnList[1].isHidden = true;
        //     this.btnList[2].isHidden = true;
        //     this.btnList[3].isHidden = true;
        // } else if (companytype === '02') {
        //     this.btnList[1].isHidden = false;
        //     this.btnList[2].isHidden = false;
        //     this.btnList[3].isHidden = false;
        // }
        this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/querySonUser', this, 'get')
    },
}
</script>
