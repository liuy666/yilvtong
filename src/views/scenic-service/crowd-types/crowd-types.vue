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
                    <span style="display:inline-block;float:left;line-height:32px;">人群种类设置</span>
                    <top-btn
                        :btn-list="btnList"
                        :currentRowData="currentRowData"
                        @changeIndex="changeIndex"
                        @refreshData="refreshData"
                    ></top-btn>
                </p>

                <detail-form1
                    :formDatas="pars.formDatas"
                    :formItemList="formItemList_list"
                    :is-list-page="true"
                    :is-mixed="false"
                    :label-width="labelWidth_list"
                    @getFormData="getFormData"
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
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}人群种类</span>
                </p>
                <detail-form1
                    :form-datas="formData_add"
                    :form-item-list="formItemList_add"
                    :rule-datas="ruleDatas_add"
                    :is-list-page="false"
                    :is-mixed="false"
                    :is-close="isClose"
                    :defalut-color="defalutColor"
                    :label-width="labelWidth_add"
                    @getFormData="getFormData_add"
                    @closeCurrentPage="closeCurrentPage"
                    @getSelectColor="getSelectColor"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">查看人群种类</span>
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
        const IsNumber = (rule, value, callback) => {
            const reg = /^[0-9]\d*$/;
            if (value!='' && !reg.test(value)) {
                callback(new Error('请输入数字'))
            } else {
                callback();
            }
        };
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
            //表单部分
            formItemList_list : [
                {
                    label : "人群种类名称",
                    keyName : "szcrowdkindname",
                    type : 1,
                    hasDec : '(支持模糊查询)',
                    isGrayDec : true
                }
            ],
            labelWidth_list : 120,
            //表格部分
            tableColumns : [
                // {
                //     title : '编号',
                //     key : 'icrowdkindid'
                // },
                {
                    title : '编码',
                    key : 'szcrowdkindcode'
                },{
                    title : '名称',
                    key : 'szcrowdkindname'
                },{
                    title : '层级',
                    key : 'ilevel',
                    render : (h,params) => {
                        if(params.row.ilevel)
                            return h('span', params.row.ilevel+"层");
                    }
                },{
                    title : '排序',
                    key : 'ilevelsequence'
                },{
                    title : '是否有效',
                    key : 'byisuse',
                    render : (h,params) => {
                        const row = params.row;
                        const text = row.byisuse == 1 ? "启用" : row.byisuse == 0 ? "禁用" : '';
                        return h('span', text);
                    }
                }
            ],
            tableData: [],
            currentRowData:{},
            tableSize : "small",
            pars:{
                formDatas : {
                    szcrowdkindname : ''
                },
                pageNum:10,
                pageCode:1,
            },
            urlQuery:{},
            total:0,
            loading: false,
            single: 0,
            //新增修改页
            labelWidth_add : 180,
            formData_add : {},
            formItemList_add: [
                {
                    label : '人群种类编码',
                    keyName : 'szcrowdkindcode',
                    type: 1
                },
                {
                    label : '人群种类名称',
                    keyName : 'szcrowdkindname',
                    type : 1
                },{
                    label : '是否启用',
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
                    label : '层级',
                    keyName : 'ilevelText',
                    type : 9
                },{
                    label : '序号',
                    keyName : 'ilevelsequence',
                    type : 1,
                    className : 'input-small',
                    hasDec : "(如不输入，系统自己生成)",
                    isRedDec : true
                },{
                    label : '描述',
                    keyName : 'szmemo',
                    type : 7
                },{
                    label : '选择颜色',
                    keyName : 'ticketcolor',
                    type : 19
                }
            ],
            ruleDatas_add : {
                szcrowdkindcode: [
                    { required: true, message: '人群种类编码不能为空', trigger: 'blur' }
                ],
                szcrowdkindname: [
                    { required: true, message: '人群种类名称不能为空', trigger: 'blur' }
                ],
                ilevelsequence : [
                    { required: false, validator: IsNumber, trigger: 'blur' }
                ]
            },
            pageName : '',
            formName : '',
            tipName : '',
            defalutColor : '#000000',
            //查看页面
            labelWidth_view : 180,
            formDatas_view : {},
            formItemList_view :[
                {
                    label : "产品编号",
                    keyName : "icrowdkindid"
                },{
                    label : "人群种类编码",
                    keyName : 'szcrowdkindcode'
                },{
                    label : "人群种类名称",
                    keyName : "szcrowdkindname"
                },{
                    label : "是否启用",
                    keyName : "byisuse"
                },{
                    label : "层级",
                    keyName : 'ilevel'
                },{
                    label : "序号",
                    keyName : 'ilevelsequence'
                },{
                    label : "备注",
                    keyName : 'szmemo'
                }
            ]
        }
    },
    computed:{
     
    },
    methods:{
        // 点击新增修改查看按钮跳到对应页面
        async changeIndex (type) {
            if (type === 12) {
                this.spinShow = true;
                await this.setAddForm(type);
            } else if (type === 13) {
                this.spinShow = true;
                await this.setEditForm(type);
            }else if(type == 14){
                this.spinShow = true;
                await this.setViewForm(type);
            }
        },
        //表格相关
        getChooseData(row){
            this.currentRowData["id"] = row.icrowdkindid;
            this.currentRowData["name"] = 'icrowdkindid';
            this.btnList[3].url = this.baseUrl+'/ticket/crowdKind/v1/deleteCrowdKind?icrowdkindid='+row.icrowdkindid;
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
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKind/v1/crowdKindViewList', this, 'get')
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
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKind/v1/crowdKindViewList', this, 'get')
        },
        isSingle(page){
            if(page == 1) this.single = 0;
            else this.single = page;
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                szcrowdkindname: this.pars.formDatas.szcrowdkindname
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKind/v1/crowdKindViewList', this, 'get')
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKind/v1/crowdKindViewList', this, 'get')
        },
        //新增修改查询
        setAddForm (type) {
            this.pageName = "新增";
            this.tipName = "新增";
            this.formData_add = {
                szcrowdkindcode : '',
                szcrowdkindname : '',
                byisuse : 1,
                ilevel : 1,
                ilevelText : '1层',
                ilevelsequence : '',
                szmemo :'',
                ticketcolor :'#000000',
                iparentid : 0,
                irootid : 0
            };
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
        getInfo (type,isView) {
            let _this = this;
            return new Promise((resolve,reject) => {
                this.$http.get(this.baseUrl+'/ticket/crowdKind/v1/getCrowdKindInfo?access_token='+this.Cookies.get('token')+'&icrowdkindid='+this.currentRowData.id)
                .then(res => {
                    if(res.data.code == 200){
                        if(isView){
                            _this.formDatas_view = res.data.data;
                            _this.formDatas_view.ilevel = _this.formDatas_view.ilevel + '层';
                            _this.formDatas_view.byisuse = _this.formDatas_view.byisuse == 1 ? '启用' : '禁用';
                        }else{
                            _this.formData_add = res.data.data;
                            _this.formData_add.ilevelText = _this.formData_add.ilevel + '层';
                            _this.defalutColor = _this.formData_add.ticketcolor || '#000000';
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
        getSelectColor(currentColor){
            this.formData_add.ticketcolor = currentColor;
            this.defalutColor = currentColor;
        },
        async getFormData_add (obj) { 
            let isSuccess = '';
            if(this.currentIndex == 12){
                isSuccess = await this.$common.addNewData('/ticket/crowdKind/v1/crowdKindSave?act=1',this,obj,'post',true)
            } else if(this.currentIndex == 13){
                isSuccess = await this.$common.editData('/ticket/crowdKind/v1/crowdKindSave?act=2', this, obj,'post',true)
            }
            if(isSuccess){
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/ticket/crowdKind/v1/crowdKindViewList', this, 'get')
            }
        },
        //关闭新增查看页
        closeCurrentPage() {
            this.currentIndex = 1;
            this.setAddForm();
        }
    },
    created () {
        this.spinShow = true;
        //获取表格数据
        this.$common.currentPageData(this.baseUrl+'/ticket/crowdKind/v1/crowdKindViewList', this, 'get')
    }

}
</script>