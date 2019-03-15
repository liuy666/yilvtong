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
                    <span style="display:inline-block;float:left;line-height:32px;">服务商退票规则管理</span>
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
                    :label-width="labelWidth"
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
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}服务商退票规则</span>
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
                    <span style="display:inline-block;float:left;line-height:32px;">查看服务商退票规则</span>
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
        const bussnessType = (rule, value, callback) => { 
            if (value === undefined || value == "") {
                callback(new Error('业务种类不能为空'));
            } else {
                callback();
            }
        };
        const numberFloat = (rule, value, callback) => {
            let EgName = ['tptj', 'tdfl'];
            let ChName = ['退票条件费率', '退票手续费率'];
            let dec = '';
            const reg = /^\d+(\.\d+)?$/;
            EgName.forEach((item, index) => {
                if (item == rule.field) {
                    dec = ChName[index];
                }
            })
            if (!value) {
                callback(new Error(dec + '不能为空'))
            } else if (!reg.test(value)) {
                callback(new Error(dec + '为数字，不能为字符'))
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
                    label : "所属服务商",
                    keyName : "iscenicid",
                    type : 4,
                    optionList : []
                }
            ],
            labelWidth : 100,
            //表格部分
            tableColumns: [
                {
                    title : '编号',
                    key : 'seq',
                    align : 'center',
                    width : 70
                },
                {
                    title: '服务商名称',
                    key: 'szscenicname',
                    align : 'center',
                    width : 279
                },
                {
                    title: '业务类型',
                    key: 'ibusinessid',
                    align : 'center',
                    width : 275,
                    render : (h,params) => {
                        let row = params.row;
                        let text = '';
                        if(this.formItemList_add[1].optionList.length>0){ 
                            this.formItemList_add[1].optionList.forEach(v => {
                                if(row.ibusinessid == v.value){
                                    text = v.label
                                }
                            })
                        }
                        return h('span', text);
                    }
                },
                {
                    title: '退票方式',
                    key: 'tptype',
                    align : 'center',
                    width : 230,
                    render : (h,params) => {
                        let row = params.row;
                        let text = row.tptype == '1' ? '金额' : row.tptype == '2' ? '数量' : '';
                        return h('span', text);
                    }
                },
                {
                    title : '退票条件费率',
                    key : 'tptj',
                    align : 'center',
                    width : 230
                },
                {
                    title : '退票手续费率',
                    key : 'tdfl',
                    align : 'center',
                    width : 230
                },
                {
                    title : '使用状态',
                    key : 'byisuse',
                    align : 'center',
                    width : 230,
                    render : (h,params) => {
                        return h('span', params.row.byisuse == '1' ? '启用' : params.row.byisuse == '0' ? '禁用' : '');
                    }
                }
            ],
            tableData: [],
            currentRowData:{},
            tableSize : "small",
            pars:{
                formDatas : {
                    iscenicid : 0
                },
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
                    label : '服务商',
                    keyName : 'iscenicid',
                    type : 4,
                    optionList : []
                },{
                    label : '业务类型',
                    keyName : 'ibusinessid',
                    type : 4,
                    optionList : []
                },{
                    label : '退票方式',
                    keyName : 'tptype',
                    type : 2,
                    optionList : [{
                        value : '1',
                        labelName : '金额'
                    },{
                        value : '2',
                        labelName : '数量'
                    }]
                },{
                    label : '退票条件费率',
                    keyName : 'tptj',
                    type : 1
                },{
                    label : '退票手续费率',
                    keyName : 'tdfl',
                    type : 1
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
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
            ],
            ruleDatas_add : {
                iscenicid: [
                    { required: true, validator : iscenicId, trigger: 'select' }
                ],
                ibusinessid: [
                    { required: true, validator: bussnessType, trigger: 'select' }
                ],
                tptj: [
                    { required: true, validator: numberFloat, trigger: 'blur' }
                ],
                tdfl: [
                    { required: true, validator: numberFloat, trigger: 'blur' }
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
                    label : "编号",
                    keyName : "seq"
                },{
                    label : "服务商名称",
                    keyName : "szscenicname"
                },{
                    label : "业务类型",
                    keyName : "ibusinessName"
                },{
                    label : "退票方式",
                    keyName : "tptype"
                },{
                    label : "退票条件费率",
                    keyName : "tptj"
                },{
                    label : "退票手续费率",
                    keyName : "tdfl"
                },{
                    label : "使用状态",
                    keyName : "byisuse"
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
            this.currentRowData["id"] = row.seq;
            this.currentRowData["name"] = 'seq';
            this.btnList[3].url = this.baseUrl+'/ticket/esbrefundrules/v1/deteteRefundRules?seq='+row.seq;
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
            this.$common.currentPageData(this.baseUrl+'/ticket/esbrefundrules/v1/showListRefundrule', this, 'get')
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
            this.$common.currentPageData(this.baseUrl+'/ticket/esbrefundrules/v1/showListRefundrule', this, 'get')
        },
        isSingle(page){
            if(page == 1) this.single = 0;
            else this.single = page;
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                iscenicid : this.pars.formDatas.iscenicid
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ticket/esbrefundrules/v1/showListRefundrule', this, 'get')
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/ticket/esbrefundrules/v1/showListRefundrule', this, 'get')
        },
        //新增修改查询
        setAddForm (type) {
            this.pageName = "新增";
            this.tipName = "新增";
            this.formData_add = {
                iscenicid : '',
                ibusinessid : '',
                tptype : '1',
                tptj : '',
                tdfl : '',
                byisuse : 1,
                szmemo : ''
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
                this.$http.get(this.baseUrl+'/ticket/esbrefundrules/v1/preformViewrefundRule?access_token='+this.Cookies.get('token')+'&seq='+this.currentRowData.id)
                .then(res => {
                    if(res.data.code == 200){
                        if(isView){
                            _this.formDatas_view = res.data.data;
                            _this.formDatas_view.tptype = _this.formDatas_view.tptype == '1' ? '金额' : '数量';
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
                isSuccess = await this.$common.addNewData('/ticket/esbrefundrules/v1/saveRefundRules?flag=1',this,obj,'post',true)
            } else if(this.currentIndex === 13){
                isSuccess = await this.$common.editData('/ticket/esbrefundrules/v1/saveRefundRules?flag=2', this, obj,'post',true)
            }
            if(isSuccess){
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/ticket/esbrefundrules/v1/showListRefundrule', this, 'get')
            }
        },
        //关闭新增查看页
        closeCurrentPage() {
            this.currentIndex = 1;
            this.setAddForm();
        }
    },
    async created () {
        //获取查询条件下拉框的数据
        let options = await this.$common.getScenicList(this,0,true);
        this.formItemList_list[0].optionList = options;
        let options1 = options.slice(1);
        this.formItemList_add[0].optionList = options1;
        let bussnessType = await this.$common.getSelectItem(this.baseUrl+'/ticket/business/v1/businessSelect',this,1,'ibusinessid','szbusinessname',1);
        this.formItemList_add[1].optionList = bussnessType;
        console.log(bussnessType);
        //获取表格数据
        this.$common.currentPageData(this.baseUrl+'/ticket/esbrefundrules/v1/showListRefundrule', this, 'get')
    }

}
</script>