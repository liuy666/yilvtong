<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">旅游卡</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData = "refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :labelWidth="0"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
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
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增旅游卡</span>
                    <span v-if="currentIndex === 13" class="title_span">修改旅游卡</span>
                </p>
                <detail-form1
                        ref = "card"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "160"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFile = "getFile"
                        @removeImage = "removeImage"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看旅游卡</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            const reg = /^[1-9]\d*$/;
            const validateArea = (rule, value, callback) => {
                if (this.formDatas_add.identityCardFlag === 0) {
                    if (!value) {
                        let str = '可使用景区不能为空';
                        callback(new Error(str))
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const validatePeriodType = (rule, value, callback) => {
                if (!this.formDatas_add.periodNumber) {
                    let str = '旅游卡有效期不能为空';
                    callback(new Error(str))
                } else if (!reg.test(this.formDatas_add.periodNumber)) {
                    callback(new Error('请输入正整数的旅游卡有效期'))
                } else {
                    callback();
                }
            };
            const validateTimesFlag = (rule, value, callback) => {
                if (!this.formDatas_add.effectiveTimes && this.formDatas_add.timesFlag === 0) {
                    let str = '旅游卡有效次数不能为空';
                    callback(new Error(str))
                } else if (!reg.test(this.formDatas_add.effectiveTimes) && this.formDatas_add.timesFlag === 0) {
                    callback(new Error('请输入正整数的旅游卡有效次数'))
                } else if (this.formDatas_add.timesFlag === -1) {
                    callback();
                } else {
                    callback();
                }
            };
            return {
                searchCount: 1,
                currentIndex: 1,
                isClose: false,
                tipName: '',
                spinShow: true,
                total: 0,
                loading: false,
                single: 0,
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
                        url: ''
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    },
                    {
                        type: 6,
                        btnlabel: '上架',
                        icon: 'clipboard',
                        dialogType: 'message',
                        dialogMessage : '您确定要执行此操作吗？',
                        requestType: 'put',
                        url: '',
                    },
                    {
                        type: 6,
                        btnlabel: '下架',
                        icon: 'clipboard',
                        dialogType: 'message',
                        dialogMessage: '您确定要执行此操作吗？',
                        requestType: 'put',
                        url: ''
                    }
                ],
                currentRowData: {},
                formItemList:[
                    {
                        type: 1,
                        label: '旅游卡名称',
                        keyName:'name',
                        labelWidth: 100
                    },
                    {
                        type: 4,
                        label: '通用时间',
                        labelWidth: 80,
                        optionList:[
                            {
                                value: -1,
                                label: '不限制'
                            },
                            {
                                value: 0,
                                label: '周六周日不能使用'
                            },
                            {
                                value: 1,
                                label: '节假日不能使用'
                            },
                        ],
                        keyName:'usePeriod'
                    },
                    {
                        type: 1,
                        label: '分润协议号',
                        keyName:'profitNum',
                        labelWidth: 100
                    },
                    {
                        type: 2,
                        label: '旅游卡有效期',
                        keyName:'periodType',
                        labelWidth: 110,
                        optionList:[
                            {
                                value: 0,
                                labelName: '按年'
                            },
                            {
                                value: 1,
                                labelName: '按月'
                            },
                            {
                                value: 2,
                                labelName: '按天'
                            }
                        ]
                    }
                ],
                colname:[
                    {
                        title: '旅游卡代码',
                        key: 'code',
                        width: 120
                    },
                    {
                        title: '旅游卡名称',
                        key: 'name',
                        width: 150
                    },
                    {
                        title: '展示图片',
                        width: 120,
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.imageAddr,
                                    style: 'width:100%;margin:3px 0;display:block'
                                },
                            }, '');
                        }
                    },
                    {
                        title: '旅发委',
                        key: 'tourCommission',
                        width: 150
                    },
                    {
                        title: '分润协议号',
                        key: 'profitNum',
                        width: 120
                    },
                    {
                        title: '单价',
                        key: 'price',
                        width: 120,
                    },
                    {
                        title: '可使用景区',
                        key: 'scenics',
                        width: 200
                    },
                    {
                        title: '身份信息附加',
                        width: 130,
                        key: 'usermessage-add',
                        render: (h, params) => {
                            return h('span', {
                                'class': {
                                    hover_span: true
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'usermessage_add',
                                            params: {
                                                id : params.row.code
                                            }
                                        })
                                    }
                                }
                            }, '身份信息附加')
                        }
                    },
                    {
                        title: '购买权限',
                        width: 100,
                        render: (h, params) => {
                            let aaa = '';
                            if(params.row.bankCardFlag===-1){
                                aaa = '不限'
                            }
                            return h('span', {}, aaa);
                        }
                    },
                    {
                        title: '旅游卡有效期',
                        width: 120,
                        render: (h, params) => {
                            let aaa = '';
                            switch (params.row.periodType) {
                                case 0 : aaa = '年';break;
                                case 1 : aaa = '月';break;
                                case 2 : aaa = '天';break;
                                default : break;
                            }
                            return h('span', {}, params.row.periodNumber+aaa);
                        }
                    },
                    {
                        title: '旅游卡通用时间',
                        width: 150,
                        render: (h, params) => {
                            let aaa = '';
                            switch (params.row.usePeriod) {
                                case -1 : aaa = '不限制';break;
                                case 0 : aaa = '周六周日不能使用';break;
                                case 1 : aaa = '节假日不能使用';break;
                                default : break;
                            }
                            return h('span', {}, aaa);
                        }
                    },
                    {
                        title: '旅游卡上下架',
                        width: 120,
                        render: (h, params) => {
                            let aaa = '';
                            switch (params.row.status) {
                                case -1 :
                                    aaa = '删除';
                                    break;
                                case 0 :
                                    aaa = '下架';
                                    break;
                                case 1 :
                                    aaa = '上架';
                                    break;
                                default :
                                    break;
                            }
                            return h('span', {}, aaa);
                        }
                    },
                ],
                tableData:[],
                pars:{
                    formDatas:{
                        periodType: 0,
                        usePeriod: -1
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                //----------新增修改
                formDatas_add: {},
                ruleDatas: {
                    name: [
                        { required: true, message: '旅游卡名称不能为空', trigger: 'blur' }
                    ],
                    profitNum: [
                        { required: true, message: '分润协议号不能为空', trigger: 'blur' }
                    ],
                    tourCommission: [
                        { required: true, message: '旅发委不能为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '旅游卡单价不能为空', trigger: 'blur' }
                    ],
                    scenics: [
                        { required: true, message: '可使用景区不能为空', trigger: 'blur' }
                    ],
                    identityCardAreas: [
                        { validator: validateArea, trigger: 'blur' }
                    ],
                    periodType: [
                        { required: true, validator: validatePeriodType, trigger: 'blur' }
                    ],
                    timesFlag: [
                        { required: true, validator: validateTimesFlag, trigger: 'change' }
                    ]
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: '旅游卡代码',
                        keyName: 'code',
                        disabled: true,
                        noShow: true,
                    },
                    {
                        type: 1,
                        label: '旅游卡名称',
                        keyName:'name',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '分润协议号',
                        keyName:'profitNum',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '旅发委',
                        keyName:'tourCommission',
                        cols: 12
                    },
                    {
                        type: 1,
                        label: '旅游卡单价',
                        keyName:'price',
                        cols: 12
                    },
                    {
                        type: 5,
                        label: '旅游卡展示图片',
                        keyName: 'imageAddr',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        }
                    },
                    {
                        type: 8,
                        label: '可使用景区',
                        keyName:'scenics',
                        keyName1: 'iscenicids',
                        btnLabel: '选择',
                        title: '选择景区',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        hasSelected: [],
                        treeData: [],
                        treeType: 1,      //1为景区，2为地区，3为人员，如果是3，请使用自定义render树形控件
                    },
                    {
                        type: 2,
                        label: '银行卡购买权限',
                        keyName:'bankCardFlag',
                        optionList:[
                            {
                                value: -1,
                                labelName: '不限银行卡',
                            }
                        ],
                    },
                    {
                        type: 2,
                        label: '身份信息购买权限',
                        keyName:'identityCardFlag',
                        optionList:[
                            {
                                value: -1,
                                labelName: '不限'
                            },
                            {
                                value: 0,
                                labelName: '指定地区'
                            }
                        ],
                    },
                    {
                        type: 8,
                        label: '',
                        keyName: 'identityCardAreas',
                        keyName1:'identityCardIds',
                        btnLabel: '选择',
                        title: '选择地区',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        treeData: [],
                        hasSelected: [],
                        treeType: 2,      //1为景区，2为地区，3员工权限
                        noShow: true,
                    },
                    {
                        type: 14,
                        label: '旅游卡有效期',
                        keyName : 'periodType',
                        keyName1 : 'periodNumber',
                        dec: '年',
                        isChildShow: true,
                        className: 'input-tiny',
                        optionList: [
                            {
                                value: 0,
                                labelName: '按年',
                            },
                            {
                                value: 1,
                                labelName: '按月',
                            },
                            {
                                value: 2,
                                labelName: '按天',
                            },
                        ],
                        cols: 12
                    },
                    {
                        type: 14,
                        label: '旅游卡有效次数',
                        keyName:'timesFlag',
                        keyName1: 'effectiveTimes',
                        dec: '',
                        isChildShow: false,
                        className: 'input-tiny',
                        optionList:[
                            {
                                value: -1,
                                labelName: '不限'
                            },
                            {
                                value: 0,
                                labelName: '限定次数'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 4,
                        label: '旅游卡通用时间',
                        keyName:'usePeriod',
                        optionList: [
                            {
                                value:-1,
                                label:'不限',
                            },
                            {
                                value:0,
                                label:'周六周日不能使用',
                            },
                            {
                                value:1,
                                label:'节假日不能使用',
                            },
                        ],
                        cols: 12
                    },
                    {
                        type: 2,
                        label: '旅游卡上下架',
                        keyName:'status',
                        optionList:[
                            {
                                value: 1,
                                labelName: '上架'
                            },
                            {
                                value: 0,
                                labelName: '下架'
                            }
                        ],
                        cols: 12
                    },
                    {
                        type: 7,
                        label: '旅游卡说明',
                        keyName:'descpt'
                    }
                ],
                //---------查看
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '旅游卡代码',
                        keyName: 'code'
                    },
                    {
                        label: '旅游卡名称',
                        keyName: 'name'
                    },
                    {
                        label: '展示图片',
                        keyName: 'imageAddr',
                        showElement: true,
                        showImage: true
                    },
                    {
                        label: '分润协议号',
                        keyName:'profitNum'
                    },
                    {
                        label: '旅发委',
                        keyName:'tourCommission'
                    },
                    {
                        label: '旅游卡单价',
                        keyName:'price'
                    },
                    {
                        label: '可使用景区',
                        keyName:'scenics',
                    },
                    {
                        label: '银行卡购买权限',
                        keyName:'bankCardFlag',
                    },
                    {
                        label: '身份信息购买权限',
                        keyName:'identityCardFlag',
                    },
                    {
                        label: '旅游卡有效次数',
                        keyName:'timesFlag',
                    },
                    {
                        label: '旅游卡通用时间',
                        keyName:'usePeriod',
                    },
                    {
                        label: '旅游卡上下架',
                        keyName:'status',
                    },
                    {
                        label: '旅游卡说明',
                        keyName:'descpt'
                    }
                ],
            }
        },
        methods:{
            //点击新增修改查看按钮跳到对应页面
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '旅游卡新增';
                    this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '旅游卡修改';
                    this.setEditInitData(type)
                } else if (type === 14) {
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'cardId';
                this.btnList[3].url = `${this.baseUrl}/tourcard/tourcard/v1/delete/${row.id}`;
                this.btnList[5].url = this.baseUrl+'/tourcard/tourcard/v1/upDown/'+row.id+'/up';
                this.btnList[6].url = this.baseUrl+'/tourcard/tourcard/v1/upDown/'+row.id+'/down';
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
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this);
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
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
            },
            clearFormData(){
                this.pars.formDatas = {
                    periodType: 0,
                    usePeriod: -1
                }
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {    //需要拼接在url后面的参数
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                };
            },

            //-----------------------------------------------------

            //获取上传图片信息
            getFile (file) {
                this.formDatas_add.imageAddr = file.url;
            },
            //移除图片
            removeImage (keyName) {
                this.formDatas_add[keyName] = ''
            },
            setAddInitData (type) {
                this.formItemList_add[0].noShow = true;
                this.formDatas_add = {
                    imageAddr: '',
                    bankCardFlag: -1,
                    identityCardFlag: -1,
                    periodType: 0,
                    status: 1,
                    timesFlag: -1,
                    usePeriod: -1,
                };
                this.spinShow = false;
                this.currentIndex = type;
            },
            setEditInitData (type) {
                this.formItemList_add[0].noShow = false;
                this.getSingleData(type)
            },
            setViewInitData (type) {
                this.getSingleData(type,1);
            },
            getSingleData (type,isView) {
                this.$http.get(this.baseUrl + '/tourcard/tourcard/v1/get/' + this.currentRowData.id, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if(res.data.code === 200) {
                        if (isView) {
                            let data = res.data.data;
                            data.bankCardFlag = '不限';
                            data.identityCardFlag = data.identityCardFlag === 0 ? data.identityCardAreas : '不限';
                            data.timesFlag = data.timesFlag === 0 ? data.effectiveTimes : '不限';
                            data.usePeriod = data.usePeriod ? '节假日不能使用' : data.usePeriod === 0 ? '周六周日不能使用' : '不限';
                            data.status = data.status ? '上架' : data.status === 0 ? '下架' : '删除';
                            this.formDatas_view = data;
                        } else {
                            this.formDatas_add = res.data.data;
                            this.formDatas_add.price = this.formDatas_add.price + '';   //不转字符串的话输入框有值表单验证也过不了(不知道原因)
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            async getFormDataAdd (obj) {
                let aaa = '';
                this.btnLoading = true;
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData('/tourcard/tourcard/v1/save', this, obj)
                } else if(this.currentIndex === 13){
                    aaa = await this.$common.editData('/tourcard/tourcard/v1/update', this, obj, 'put')
                }
                if (aaa) this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this)
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourcard/v1/list', this);
        },
        watch: {
            'formDatas_add.identityCardFlag' (val) {    //身份购买权限单选值变化，切换下方多行输入框的显示
                this.formItemList_add[9].noShow = val === -1 ? true : false;
            },
            'formDatas_add.periodType' (val) {    //旅游卡有效期单选值变化，切换输入框后面的字（年、月、日）
                this.formItemList_add[10].dec = val ? (val === 1 ? '月' : '天')  : '年'
            },
            'formDatas_add.timesFlag' (val) {    //旅游卡有效次数单选值变化，切换输入框的显示
                this.formItemList_add[11].isChildShow = val === -1 ? false : true;
                this.formItemList_add[11].dec = val === -1 ? '' : '次';
                if (val === -1) this.formDatas_add.effectiveTimes = '';
            },
        }
    }
</script>

<style scoped>

</style>
