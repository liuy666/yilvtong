<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">导游用户管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            dialog-title="登录密码初始化"
                            :dialog-form-datas="dialogFormDatas"
                            :dialog-form-item-list="dialogFormItemList"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth="10"
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
                    <span v-if="currentIndex === 15" class="title_span">审核游客信息</span>
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
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>
<script>
    export default {
    data () {
        return {
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            total: 0,
            loading: false,
            single: 0,
            tipName : '',
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
                }
            ],
            formItemList_list: [
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
                                }
                            ]
                        }
                    ]
                }
            ],
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
                    title : '导游姓名',
                    key : 'lname',
                    width : 200
                },
                {
                    title : '操作',
                    width : 450,
                    render : (h,params) => {
                        return h('span',[
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
                            }, '登录密码初始化'),
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
                            }, '错误登录次数初始化'),
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
                            }, '审核'),
                            h('span',{
                                'class' : 'hover_span',
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.checkUser(params.row, '01', true)
                                    }
                                }
                            }, '快速审核'),
                            h('span',{
                                'class' : 'hover_span',
                                on : {
                                    click : () => {

                                    }
                                }
                            }, '初始化指纹')
                        ])
                    }
                },
                {
                    title : '用户状态',
                    width : 100,
                    render : (h,params) => {
                        const status = params.row.status;
                        return h('span',{},status === '00' ? '未审核用户' : status === '01' ? '有效用户' : '无效用户');
                    }
                },
                {
                    title : '联系人',
                    key : 'lname',
                    width : 120
                },
                {
                    title : '身份证号',
                    key : 'zjhm',
                    width : 180
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
                    ibusinessid: 1,
                    lgtp: '02',
                    ttlb: '02'
                },
                pageNum:10,
                pageCode:1,
            },
            dialogFormDatas : {
                usid : '',
                password : '66666666'
            },
            dialogFormItemList:[
                {
                    type : 9,
                    label : "用户名",
                    keyName : "usid"
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
                    label : "身份证号",
                    keyName : "zjhm",
                    type : 1,
                    divIndex : 0
                },
                {
                    label : "导游证号",
                    keyName : "daoyouno",
                    type : 1,
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
                mobile: [
                    { validator: this.$reg.mobile, trigger: 'blur' }
                ],
                email: [
                    { validator: this.$reg.email, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                szregionalname: [
                    { required: true, message: '所属地不能为空', trigger: 'blur' }
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
                }
            ],
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
                    label : '团队用户类别',
                    keyName : 'ttlb',
                    divIndex : 0
                },
                {
                    label : '是否主用户',
                    keyName : 'ustp',
                    divIndex : 0
                },
                {
                    label : '导游证号',
                    keyName : 'daoyouno',
                    isHidden : false,
                    divIndex : 0
                },
                {
                    label : '身份证号',
                    keyName : 'zjhm',
                    isHidden: false,
                    divIndex : 0
                },
                {
                    label : '业务类型',
                    keyName : 'szbusinessname',
                    isHidden: false,
                    divIndex : 0
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
                    label : '联系人',
                    keyName : 'lname',
                    divIndex : 1
                },
                {
                    label : '身份证号',
                    keyName : 'zjhm',
                    isHidden: true,
                    type: null,
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
                    isHidden: false,
                    divIndex : 1
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
                    label : '企业名称',
                    keyName : 'corpname',
                    divIndex : 2
                },
                {
                    label : '旅行社许可证号',
                    keyName : 'tourlicensecode',
                    isHidden : false,
                    divIndex : 2
                },
                {
                    label : '营业执照号码',
                    keyName : 'businesslicensescode',
                    isHidden : false,
                    divIndex : 2
                },
                {
                    label : '企业传真',
                    keyName : 'faxno',
                    isHidden : false,
                    divIndex : 2
                },
                {
                    label : '企业邮编',
                    keyName : 'postno',
                    isHidden : false,
                    divIndex : 2
                },
                {
                    label : '企业网址',
                    keyName : 'notea',
                    divIndex : 2
                },
                {
                    label : '企业简介',
                    keyName : 'noteb',
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
                }
            ],
            titleList_view : [],
            viewBtnList: []
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
            } else if(type > 13){
                this.setViewForm(type,usid)
            }
            this.currentIndex = type
        },
        //表格相关
        getChooseData(row){
            this.currentRowData["id"] = row.usid;
            this.currentRowData["name"] = 'usid';
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
            this.$common.currentPageData(`${this.baseUrl}/ec/custom/v1/customInfoViewList`, this, 'get');
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
            this.$common.currentPageData(`${this.baseUrl}/ec/custom/v1/customInfoViewList`, this, 'get');
        },
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(`${this.baseUrl}/ec/custom/v1/customInfoViewList`, this, 'get');
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                radiobutton: this.pars.formDatas.radiobutton,
                usid : this.pars.formDatas.usid,
                lname : this.pars.formDatas.lname,
                email : this.pars.formDatas.email,
                status : this.pars.formDatas.status,
                ibusinessid: this.pars.formDatas.ibusinessid,
                lgtp: this.pars.formDatas.lgtp,
                ttlb: this.pars.formDatas.ttlb
            }
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ec/custom/v1/customInfoViewList', this, 'get')
        },
        clearFormData () {
            this.pars.formDatas = {
                radiobutton : 6,
                ibusinessid: 1,
                lgtp: '02',
                ttlb: '02'
            }
        },
        isSingle(page){
            this.single = page
        },
        //输入框聚焦改变单选值
        focusInput (val) {
            this.pars.formDatas.radiobutton = val;
        },
        //下拉框展开改变单选值
        selectOpenChange () {
            this.pars.formDatas.radiobutton = 3;
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
                obj['zjhm'] = this.formDatas_view.zjhm;
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
            this.formDatas_add = {
                status: '01',
                lgtp: '02',
                ustp: '01',
                usqx: '11110001000000000000',
                ttlb: '02',
                susid: '0',
                ibusinessid: 1,
                statusName: '有效用户',
                lgtpName: '散客用户',
                szbusinessname: '散客业务',
                ustpName: '是',
                ttlbName: '导游'
            };
            this.spinShow = false
        },
        async setEditForm () {
            await this.getRoleInfo();
            this.tipName = "修改";
            this.formItemList_add[0].disabled = true;
            this.formItemList_add[0].hasDec = '';
            this.formItemList_add[1].noShow = true;
            this.formItemList_add[6].disabled = true;
        },
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
                this.formItemList_view[5].isHidden = false;
                this.formItemList_view[6].isHidden = false;
                this.formItemList_view[7].isHidden = false;
                this.formItemList_view[11].isHidden = true;
                this.formItemList_view[11].type = null;
                this.formItemList_view[15].isHidden = false;
                this.formItemList_view[19].isHidden = false;
                this.formItemList_view[20].isHidden = false;
                this.formItemList_view[21].isHidden = false;
                this.formItemList_view[22].isHidden = false;
            } else if (type === 15) {
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
                this.formItemList_view[5].isHidden = true;
                this.formItemList_view[6].isHidden = true;
                this.formItemList_view[7].isHidden = true;
                this.formItemList_view[11].isHidden = false;
                this.formItemList_view[11].type = 1;
                this.formItemList_view[15].isHidden = true;
                this.formItemList_view[19].isHidden = true;
                this.formItemList_view[20].isHidden = true;
                this.formItemList_view[21].isHidden = true;
                this.formItemList_view[22].isHidden = true;
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
            this.spinShow = false
        },
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
        //关闭新增查看页
        closeCurrentPage() {
            this.currentIndex = 1;
            this.setAddForm();
        }
    },
    created () {
        console.log(4123496);
        this.$common.currentPageData(`${this.baseUrl}/ec/custom/v1/customInfoViewList`, this, 'get');
    }
}
</script>
