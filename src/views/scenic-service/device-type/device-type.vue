<style lang="less">
    @import '../../../styles/ectrip.less';
</style>
<style scoped>

</style>
<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">设备类型管理</span>
                    <top-btn
                        :btn-list="btnList"
                        :currentRowData="currentRowData"
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
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}设备类型</span>
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
                    <span style="display:inline-block;float:left;line-height:32px;">查看设备类型</span>
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
export default {
    data(){
        const iscenicId = (rule, value, callback) => { 
            if (value === undefined || value == "") {
                callback(new Error('所属服务商不能为空'));
            } else {
                callback();
            }
        };
        const szcommmode = (rule, value, callback) => { 
            if (value === undefined || value == "") {
                callback(new Error('通讯方式不能为空'));
            } else {
                callback();
            }
        }
        return{
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            //按钮部分
            btnList :[
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
            tableColumns : [
                {
                    title : '设备类型编号',
                    key : 'iequiptypeid',
                    width : 140
                },{
                    title : '设备类型名称',
                    key : 'szequiptypename',
                    width : 320,
                    render : (h,params) => {
                        const row = params.row;
                        const text = row.szequiptypename;
                        if(!text) return;
                        return h('a',{
                            on : {
                                click : () => {
                                    this.currentRowData["id"] = row.iequiptypeid;
                                    this.changeIndex(14)
                                }
                            }
                        },text)
                    }
                },{
                    title : '所属服务商',
                    key : 'szscenicname',
                    width : 320,
                },{
                    title : '通讯方式',
                    key : 'szcommmode',
                    width : 255
                },{
                    title : '设备种类',
                    key : 'bycategorytype',
                    width : 255,
                    render : (h,params) => {
                        const row = params.row;
                        const text = row.bycategorytype == 1 ? "准进设备" : row.bycategorytype == 0 ? "窗口设备" : '' ;
                        return h('span', text);
                    }
                },{
                    title : '使用状态',
                    key : 'byisuse',
                    width : 254,
                    render : (h,params) => {
                        const row = params.row;
                        const text = row.byisuse == 1 ? "启用" : row.byisuse == 0 ? "禁用" : '' ;
                        return h('span', text);
                    }
                }
            ],
            tableData: [],
            currentRowData:{},
            tableSize : "small",
            pars:{
                pageNum:10,
                pageCode:1,
            },
            total:0,
            loading: false,
            single: 0,
            urlQuery:{},
            //新增 修改
            labelWidth_add : 180,
            formData_add : {},
            formItemList_add: [
                {
                    label : '设备类型型号',
                    keyName : 'szequiptypemodel',
                    type: 1
                },
                {
                    label : '设备类型名称',
                    keyName : 'szequiptypename',
                    type : 1
                },{
                    label : '所属服务商',
                    keyName : 'iscenicid',
                    type : 4,
                    optionList : []
                },{
                    label : '通讯方式',
                    keyName : 'szcommmode',
                    type : 4,
                    optionList : []
                },{
                    label : '设备种类',
                    keyName : 'bycategorytype',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '窗口设备'
                    },{
                        value : 1,
                        labelName : '准进设备'
                    }]
                },{
                    label : '使用状态',
                    keyName : 'byisuse',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '禁用'
                    },{
                        value : 1,
                        labelName : '启用'
                    }]
                },{
                    label : '描述',
                    keyName : 'szmemo',
                    type : 7
                }
            ],
            ruleDatas_add : {
                szequiptypemodel: [
                    { required: true, message: '设备类型型号不能为空', trigger: 'blur' }
                ],
                szequiptypename: [
                    { required: true, message: '设备类型名称不能为空', trigger: 'blur' }
                ],
                iscenicid: [
                    { required: true, validator : iscenicId, trigger: 'select' }
                ],
                szcommmode: [
                    { required: true, validator: szcommmode, trigger: 'select' }
                ]
            },
            pageName : '',
            formName : '',
            tipName : '',
            //查看页面
            labelWidth_view : 180,
            formDatas_view : {},
            formItemList_view :[
                {
                    label : "服务商名称",
                    keyName : "szscenicname"
                },{
                    label : "设备类型型号",
                    keyName : "szequiptypemodel"
                },{
                    label : "设备类型名称",
                    keyName : 'szequiptypename'
                },{
                    label : "通讯方式",
                    keyName : "szcommmodeName" //szcommmode
                },{
                    label : "设备种类",
                    keyName : "bycategorytype"
                },{
                    label : "是否使用",
                    keyName : 'byisuse'
                },{
                    label : "描述",
                    keyName : 'szmemo'
                }
            ]
        }
    },
    computed:{
       
    },
    methods:{
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
            this.currentRowData["id"] = row.iequiptypeid;
            this.currentRowData["name"] = 'iequiptypeid';
            this.btnList[3].url = this.baseUrl+'/ticket/esbequiptypetab/v1/deleteEsbequitype?iequiptypeid='+row.iequiptypeid;
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
            this.$common.currentPageData(this.baseUrl+'/ticket/esbequiptypetab/v1/showAllListesbequitype', this, 'get')
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
            this.$common.currentPageData(this.baseUrl+'/ticket/esbequiptypetab/v1/showAllListesbequitype', this, 'get')
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
            this.$common.currentPageData(this.baseUrl+'/ticket/esbequiptypetab/v1/showAllListesbequitype', this, 'get')
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/ticket/esbequiptypetab/v1/showAllListesbequitype', this, 'get')
        },
        //新增修改查询
        setAddForm (type) {
            this.pageName = "新增";
            this.tipName = "新增";
            this.formData_add = {
                szequiptypemodel : '',
                szequiptypename : '',
                iscenicid : '',
                szcommmode : '',
                bycategorytype : 0,
                byisuse : 1,
                szmemo :''
            }
            this.spinShow = false;
            if(type){
                this.currentIndex = type;
            }
        },
        setEditForm (type) { 
            this.pageName = "修改";
            this.tipName = "修改";
            this.getInfo(type);
        },
        setViewForm (type) {
            this.getInfo(type,true);
        },
        //根据id查询角色信息
        getInfo (type,isView) {
            let _this = this;
            return new Promise((resolve,reject) => {
                this.$http.get(this.baseUrl+'/ticket/esbequiptypetab/v1/viewEsbequitype?access_token='+this.Cookies.get('token')+'&iequiptypeid='+this.currentRowData.id)
                .then(res => {
                    if(res.data.code == 200){
                        if(isView){
                            _this.formDatas_view = res.data.data;
                            _this.formDatas_view.bycategorytype = _this.formDatas_view.bycategorytype == 0 ? '窗口设备' : '准进设备';
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
                isSuccess = await this.$common.addNewData('/ticket/esbequiptypetab/v1/saveEsbequitype?act=1',this,obj,'post',true)
            } else if(this.currentIndex === 13){
                isSuccess = await this.$common.editData('/ticket/esbequiptypetab/v1/saveEsbequitype?act=2', this, obj,'post',true)
            }
            if(isSuccess){
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/ticket/esbequiptypetab/v1/showAllListesbequitype', this, 'get')
            }
        },
        //关闭新增查看页
        closeCurrentPage() {
            this.currentIndex = 1;
            this.setAddForm();
        }
    },
    async created () {
        let iscenicIdOptions = await this.$common.getScenicList(this,2,false);
        this.formItemList_add[2].optionList = iscenicIdOptions;
        let szcommmodeOptions = await this.$common.getSelectItem(this.baseUrl+'/ticket/esbequiptypetab/v1/getCMSESelect',this,3,'code','value',true);
        this.formItemList_add[3].optionList = szcommmodeOptions;
        //获取表格数据
        this.$common.currentPageData(this.baseUrl+'/ticket/esbequiptypetab/v1/showAllListesbequitype', this, 'get')
    }

}
</script>