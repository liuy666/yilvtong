<template>
    <div>
        <Row>
        <Card v-show="currentIndex === 1">
            <p slot="title" style="height:32px;">
                <span style="display:inline-block;float:left;line-height:32px;">票号规则管理（预制票用）</span>
                <top-btn
                    :btn-list="btnList"
                    :current-row-data="currentRowData"
                    @changeIndex="changeIndex"
                    @refreshData="refreshData"
                ></top-btn>
            </p>
            
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
            <p slot="title" style="height:32px;">
                <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}票号规则</span>
            </p>
            <detail-form1
                :form-datas="formData_add"
                :form-item-list="formItemList_add"
                :rule-datas="ruleDatas_add"
                :is-list-page="false"
                :is-mixed="false"
                :is-close="isClose"
                :label-width="labelWidth_add"
                @getFormData="getFormData_add"
                @closeCurrentPage="closeCurrentPage"
            ></detail-form1>

        </Card>
        <Card v-show="currentIndex === 14">
            <p slot="title" style="height:32px;">
                <span style="display:inline-block;float:left;line-height:32px;">查看票号规则</span>
            </p>
            <view-del-detail
                :formDatas="formDatas_view"
                :formItemList="formItemList_view"
                :label-width="labelWidth_view"
                :is-view="true"
                :is-show="true"
                :is-close="isClose"
                @closeCurrentPage="closeCurrentPage"
            ></view-del-detail>
        </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>
<script>
import commonMethod from '@/libs/common.js';
export default {
    name : 'exchange-rules',
    data () {
        const iscenicId = (rule, value, callback) => { 
            if (value === undefined || value == "") {
                callback(new Error('所属服务商不能为空'));
            } else {
                callback();
            }
        }
        return {
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            //按钮部分
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
            //表格部分
            currentRowData : {},
            tableColumns : [
                {
                    title : '名称',
                    key : 'szticketnorulename',
                    width : 200
                },{
                    title :'所属服务商',
                    key : 'szscenicname',
                    width : 214
                },{
                    title :'票号总长度',
                    key : 'iticketnolen',
                    width : 170
                },{
                    title:'票号前缀长度',
                    key : 'intons2',
                    width : 170
                },{
                    title:'票代码长度',
                    key : 'itickettypecodepos',
                    width : 170
                },{
                    title:'流水号长度',
                    key : 'iserialnolen',
                    width : 170
                },{
                    title:'票号后缀长度',
                    key : 'szticketnosuffix',
                    width : 170
                },{
                    title:'计算方式',
                    key : 'intons1',
                    width : 140,
                    render : (h,params) => {
                        const row = params.row;
                        const text = row.intons1 == 1 ? "十进制" : row.intons1 == 0 ? "三十六进制" : '';
                        return h('span',{},text);
                    }
                },{
                    title:'是否有效',
                    key : 'byisuse',
                    width : 140,
                    render : (h,params) => {
                        const row = params.row;
                        const text = row.byisuse == 1 ? "启用" : row.byisuse == 0 ? "禁用" : '';
                        return h('span',{},text);
                    }
                }
            ],
            tableData : [],
            tableSize : 'small',
            pars:{
                pageNum:10,
                pageCode:1
            },
            total:0,
            loading: false,
            single: 0,
            urlQuery:{},
            //新增
            labelWidth_add : 180,
            formData_add : {},
            formItemList_add: [
                 {
                    label : '票号规则编号',
                    keyName : 'iticketnoruleid',
                    type: 9,
                    noShow : true
                },
                {
                    label : '票号规则代码',
                    keyName : 'szticketnorulecode',
                    type : 1
                },{
                    label : '票号规则名称',
                    keyName : 'szticketnorulename',
                    type : 1
                },{
                    label : '所属服务商',
                    keyName : 'iscenicid',
                    type : 4,
                    optionList : []
                },{
                    label : '票号总长度',
                    keyName : 'iticketnolen',
                    type : 1
                },{
                    label : '票号前缀长度',
                    keyName : 'intons2',
                    type : 1
                },{
                    label : '票号前缀字符',
                    keyName : 'szticketnoprefix',
                    type : 1
                },{
                    label : '票代码长度',
                    keyName : 'itickettypecodepos',
                    type : 1,
                    hasDec : '（注:与产品编码一样）',
                    isRedDec : true
                },{
                    label : '流水号长度',
                    keyName : 'iserialnolen',
                    type : 1
                },{
                    label : '票号后缀长度',
                    keyName : 'szticketnosuffix',
                    type : 1
                },{
                    label : '票号后缀字符',
                    keyName : 'sztron1',
                    type : 1
                },{
                    label : '',
                    type : 9,
                    labelWidth : 75,
                    hasDec : '注：票号规则组成：票号前缀 + 票代码 + 票流水号 + 票号后缀',
                    isRedDec : true
                },{
                    label : '使用状态',
                    keyName : 'byisuse',
                    type : 2,
                    optionList : [{
                        value : 1,
                        labelName : '启用'
                    },{
                        value : 0,
                        labelName : '禁用'
                    }]
                },{
                    label : '计算方式',
                    keyName : 'intons1',
                    type : 2,
                    optionList : [{
                        value : 1,
                        labelName : '十进制'
                    },{
                        value : 0,
                        labelName : '三十六进制'
                    }]
                },{
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
            ],
            ruleDatas_add : {
                szticketnorulecode: [
                    { required: true, message: '票号规则代码不能为空', trigger: 'blur' }
                ],
                szticketnorulename: [
                    { required: true, message: '票号规则名称不能为空', trigger: 'blur' }
                ],
                iscenicid: [
                    { required: true, validator : iscenicId, trigger: 'select' }
                ],
                iticketnolen: [
                    { required: true, validator: this.$reg.positiveInt, trigger: 'blur' }
                ],
                intons2: [
                    { required: true, validator: this.$reg.positiveInt, trigger: 'blur' }
                ],
                szticketnoprefix: [
                    { required: true, message: '票号前缀字符不能为空', trigger: 'blur' }
                ],
                itickettypecodepos: [
                    { required: true, validator: this.$reg.positiveInt, trigger: 'blur' }
                ],
                iserialnolen: [
                    { required: true, validator: this.$reg.positiveInt, trigger: 'blur' }
                ],
                szticketnosuffix: [
                    { required: true, validator: this.$reg.positiveInt, trigger: 'blur' }
                ],
                sztron1: [
                    { required: true, message: '票号后缀字符不能为空', trigger: 'blur' }
                ],
            },
            pageName : '',
            formName : '',
            tipName : '',
            //查看页面
            labelWidth_view : 180,
            formDatas_view : {},
            formItemList_view :[
                {
                    label : "票号规则代码",
                    keyName : "szticketnorulecode"
                },{
                    label : "票号规则名称",
                    keyName : "szticketnorulename"
                },{
                    label : "所属服务商",
                    keyName : 'szscenicname'
                },{
                    label : "票号总长度",
                    keyName : "iticketnolen"
                },{
                    label : "票号前缀长度",
                    keyName : "intons2"
                },{
                    label : "票号前缀",
                    keyName : 'szticketnoprefix'
                },{
                    label : "票代码长度",
                    keyName : 'itickettypecodepos'
                },{
                    label : "流水号位置",
                    keyName : "iserialnopos"
                },{
                    label : "流水号长度",
                    keyName : 'iserialnolen'
                },{
                    label : "票号后缀长度",
                    keyName : 'szticketnosuffix'
                },{
                    label : "票号后缀字符",
                    keyName : 'sztron1'
                },{
                    label : "使用状态",
                    keyName : "byisuse"
                },{
                    label : "计算方式",
                    keyName : 'intons1'
                },{
                    label : "备注",
                    keyName : 'szmemo'
                }
            ]
        }
    },
    methods : {
        // 点击新增修改查看按钮跳到对应页面
        changeIndex (type) {
            if (type === 12) {
                this.spinShow = true;
                this.setAddForm(type);
            } else if (type === 13) {
                this.spinShow = true;
                this.setEditForm(type);
            }else if(type == 14){
                this.spinShow = true;
                this.setViewForm(type);
            }
        },
        //表格相关
        getChooseData(row){
            this.currentRowData["id"] = row.iticketnoruleid;
            this.currentRowData["name"] = 'iticketnoruleid';
            this.btnList[3].url = this.baseUrl+'/ticket/ticketRule/v1/deleteTicketRule?iticketnoruleid='+row.iticketnoruleid;
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
            this.$common.currentPageData(this.baseUrl+'/ticket/ticketRule/v1/ticketruleViewList', this, 'get')
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
            this.$common.currentPageData(this.baseUrl+'/ticket/ticketRule/v1/ticketruleViewList', this, 'get')
        },
        isSingle(page){
            if(page == 1) this.single = 0;
            else this.single = page;
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ticket/ticketRule/v1/ticketruleViewList', this, 'get')
        },
        setAddForm (type) {
            this.pageName = "新增";
            this.tipName = "新增";
            this.formItemList_add[0].noShow = true;
            this.formData_add = {
                szticketnorulecode : '',
                szticketnorulename : '',
                iscenicid : '',
                iticketnolen : 14,
                intons2 : '',
                szticketnoprefix : '',
                itickettypecodepos :'',
                iserialnolen:'',
                szticketnosuffix:2,
                sztron1:'',
                byisuse:1,
                intons1:1,
                szmemo:'',
                iserialnopos : 0
            }
            this.spinShow = false;
            if(type){
                this.currentIndex = type;
            }
        },
        setEditForm (type) { 
            this.pageName = "修改";
            this.tipName = "修改";
            this.formItemList_add[0].noShow = false;
            this.getInfo(type);
        },
        setViewForm (type) {
            this.getInfo(type,true);
        },
        //根据id查询角色信息
        getInfo (type,isView) {
            let _this = this;
            return new Promise((resolve,reject) => {
                this.$http.get(this.baseUrl+'/ticket/ticketRule/v1/getTicketruleById?access_token='+this.Cookies.get('token')+'&iticketnoruleid='+this.currentRowData.id)
                .then(res => {
                    if(res.data.code == 200){
                        if(isView){
                            _this.formDatas_view = res.data.data;
                            _this.formDatas_view.intons1 = _this.formDatas_view.intons1 == 1 ? '十进制' : '三十六进制';
                            _this.formDatas_view.byisuse = _this.formDatas_view.byisuse == 1 ? '启用' : '禁用';
                        }else{
                            _this.formData_add = res.data.data;
                        }
                        resolve()
                    }else{
                        this.$common.showMessageModal(this, res, 1);
                    }
                    _this.spinShow = false;
                    _this.currentIndex = type
                })
            });
        },
        async getFormData_add (obj) { 
            let isSuccess = '';
            if(this.currentIndex === 12){
                isSuccess = await this.$common.addNewData('/ticket/ticketRule/v1/ticketruleSave?flag=1',this,obj,'post',true)
            } else if(this.currentIndex === 13){
                isSuccess = await this.$common.editData('/ticket/ticketRule/v1/ticketruleSave?flag=2', this, obj,'post',true)
            }
            if(isSuccess){
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/ticket/ticketRule/v1/ticketruleViewList', this, 'get')
            }
        },
        //关闭新增查看页
        closeCurrentPage() {
            this.currentIndex = 1;
            this.setAddForm();
        }
    },
    async created () {
        let options = await this.$common.getScenicList(this,3,false);
        this.formItemList_add[3].optionList = options;
        this.$common.currentPageData(this.baseUrl+'/ticket/ticketRule/v1/ticketruleViewList', this, 'get');
    },
    computed:{
        
    }
}
</script>
