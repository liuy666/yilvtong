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
                    <span style="display:inline-block;float:left;line-height:32px;">客源地管理</span>
                    <top-btn
                        :btn-list="btnList"
                        :current-row-data="currentRowData"
                        :parent-id="this.iparentid"
                        :level="this.ilevel"
                        :parent-name="this.currentLabel"
                        @refreshData="refreshData"
                        @changeIndex="changeIndex"
                    ></top-btn>
                </p>

                <Tabs type="card" :animated="false" v-model="currentTab" @on-click="delChildTab">
                    <TabPane v-for="(item,index) in tabList"  :key="index" :label="item.label" :name="item.name" >
                        <radio-table
                            :colname="tableColumns"
                            :total='total'
                            :tableData="item.tableData"
                            :isRadio="true"
                            :pageNum="pars.pageNum"
                            :pageCode="pars.pageCode"
                            :loading="loading"
                            @selected="getChooseData"
                            @changePage="changePage"
                            @changePageSize="changePageSize"
                            @isSingle="isSingle"
                        ></radio-table>

                    </TabPane>
                </Tabs>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}客源地</span>
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
                    <span style="display:inline-block;float:left;line-height:32px;">查看客源地</span>
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
    data () {
        return {
            currentIndex: 1,
            spinShow : true,
            isClose : false,
            currentTab : '1',
            //按钮部分
            btnList :[
                {
                    type: 1,
                    btnlabel: '刷新'
                },
                {
                    type: 12,
                    btnlabel: '新增本级',
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
                    title : '编号',
                    key : 'iregionalid',
                    align : 'center',
                    width : 256
                },
                {
                    title : '客源地编码',
                    key : 'szregionalcode',
                    align : 'center',
                    width : 256
                },
                {
                    title : '客源地名称',
                    key : 'szregionalname',
                    align : 'center',
                    width : 257
                },
                {
                    title : '层级',
                    key : 'ilevel',
                    align : 'center',
                    width : 257,
                    render : (h,params) => {
                        return h('span', params.row.ilevel ? params.row.ilevel + ' 级' : '');
                    }
                },
                {
                    title : '是否使用',
                    key : 'byisuse',
                    align : 'center',
                    width : 258,
                    render : (h,params) => {
                        return h('span', params.row.byisuse == 1 ? '启用' : params.row.byisuse == 0 ? '禁用' : '');
                    }
                },
                {
                    title : '操作',
                    key : 'options',
                    align : 'center',
                    width : 260,
                    render : (h,params) => {
                        return params.row.iregionalid ?  h('div',[
                            h('a',{
                                on : {
                                    click : (ev) => { 
                                        let oev = ev || event;
                                        ev.cancelBubble = true;
                                        this.spinShow = true;
                                        //记录上一级的查询条件
                                        this.pageCodeList.push(this.urlQuery);

                                        //记录查询条件所需 级别 父id  记录对应的label 
                                        this.ilevel = params.row.ilevel + 1;
                                        this.iparentid = params.row.iregionalid;
                                        this.currentLabel = params.row.szregionalname;
                                        this.parentName = params.row.szregionalname;
                                        this.newLevel = params.row.ilevel + 1;
                                        this.newParentId = params.row.iregionalid;
                                        
                                        //重置新的页码为1作为查询条件
                                        this.pars.pageCode = 1;

                                        this.getListData();
                                        this.currentTab = this.ilevel +'';
                                    }
                                }
                            },'[下一级] '),
                            h('a',{
                                on : {
                                    click : () => {
                                        this.newLevel = params.row.ilevel + 1; 
                                        this.newParentId = params.row.iregionalid;
                                        this.parentName = params.row.szregionalname;
                                        //this.currentIndex = 12;
                                        this.spinShow = true;
                                        this.setAddForm(true,12);
                                    }
                                }
                            },' [新增下级]')
                        ])  : '';
                    }
                }
            ],
            tableData : [],
            tabList : [],
            tableSize : 'small',
            currentRowData : {},
            pars:{
                pageNum:10,
                pageCode:1
            },
            total:0,
            loading: false,
            single: 0,
            iparentid : 0, //当前父id 
            newLevel : 1,  //用于新增页 新增第几级的记录  
            newParentId : 0, //用于新增页 父级id的记录
            parentName : '',      
            ilevel : 1, //当前级别
            currentLabel : '第一级列表',
            pageCodeList : [],
            //新增页部分
            pageName : '',
            tipName : '',
            labelWidth_add : 180,
            formItemList_add : [
                {
                    label : '客源地代码',
                    keyName : 'szregionalcode',
                    type : 1
                },{
                    label : '客源地名称',
                    keyName : 'szregionalname',
                    type : 1
                },{
                    label : '上级名称',
                    keyName : 'szinnername',
                    type : 9,
                    noShow : true
                },{
                    label : '层级',
                    keyName : 'currentLevel',
                    type : 9
                },{
                    label : '是否使用',
                    keyName : 'byisuse',
                    type : 2,
                    optionList : [{
                        value : 1,
                        labelName : '是'
                    },{
                        value : 0,
                        labelName : '否'
                    }]
                },{
                    label : '序号',
                    keyName : 'ilevelsequence',
                    type : 1,
                    hasDec : '(如不输入，则系统自动生成)'
                },{
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
            ],
            ruleDatas_add : {
                szregionalcode: [
                    { required: true, message: '客源地代码不能为空', trigger: 'blur' }
                ],
                szregionalname: [
                    { required: true, message: '客源地名称不能为空', trigger: 'blur' }
                ]
            },
            formData_add : {},
            //查看页部分
            labelWidth_view : 180,
            formItemList_view : [
                {
                    label : "客源地代码",
                    keyName : "szregionalcode"
                },{
                    label : "客源地名称",
                    keyName : "szregionalname"
                },{
                    label : "上级名称",
                    keyName : "szinnername",
                    noShow : true
                },{
                    label : "层级",
                    keyName : "ilevel"
                },{
                    label : "是否使用",
                    keyName : "byisuse"
                },{
                    label : "序号",
                    keyName : "ilevelsequence"
                },{
                    label : "备注",
                    keyName : "szmemo"
                }
            ],
            formDatas_view : {}
        }
    },
    computed:{
        
    },
    methods:{
        changeIndex (type) {
            if (type === 12) {
                this.spinShow = true;
                this.setAddForm(false,type);
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
            this.currentRowData["id"] = row.iregionalid;
            this.currentRowData["name"] = 'iregionalid';
            this.currentRowData["parentId"] = row.iregionalid;
            this.btnList[3].url = this.baseUrl+'/sys/sourceRegion/v1/delSourceRegion?iregionalid='+row.iregionalid;
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
            this.refreshUrlQuery();
            this.getListData();
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
            this.refreshUrlQuery();
            this.getListData();
        },
        isSingle(page){
            if(page == 1) this.single = 0;
            else this.single = page;
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                iparentid : this.iparentid,
                ilevel : this.ilevel
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.refreshUrlQuery();
            this.getListData();
        },

        //点击tab标签回退上一级
        delChildTab (name) { 
            if(this.tabList.length > 1){
                this.spinShow = true;
                this.currentLabel = this.tabList[parseInt(name)-1].label;
                this.parentName = this.currentLabel;
                this.tabList = this.tabList.slice(0,parseInt(name)-1);//删掉所点击的tab页之后的数据
                
                //根据存起来的查询条件 设置回退后的当前查询参数  并删除后续的查询条件
                this.setUrlQueryParams(this.pageCodeList[parseInt(name)-1]);
                this.pageCodeList = this.pageCodeList.slice(0,parseInt(name)-1); 
                this.getListData();
            }
        },
        getListData () {
            let _this = this;
            this.$common.currentPageData(this.baseUrl+'/sys/sourceRegion/v1/viewListSourceRegion', this, 'get')
            .then(() => { 
                let newTab = {};
                newTab["tableData"] = _this.tableData;
                newTab["label"] = _this.currentLabel;
                newTab["name"] = _this.ilevel + '';
                _this.tabList.splice(_this.ilevel-1,1,newTab);
                _this.spinShow = false;
            })
        },
        setUrlQueryParams (queryObj) { 
            this.ilevel = queryObj.ilevel;
            this.iparentid = queryObj.iparentid;
            this.pars.pageNum = queryObj.pageSize;
            this.pars.pageCode = queryObj.page;
            this.newLevel = queryObj.ilevel;
            this.newParentId = queryObj.iparentid;
        },
        //新增 修改 查询
        setAddForm (isNext,type) {
            this.pageName = "新增";
            this.tipName = "新增";
            if(isNext){
                if(this.newLevel>1) this.formItemList_add[2].noShow = false;
                else this.formItemList_add[2].noShow = true;
                this.formData_add = {
                    szregionalcode : '',
                    szregionalname : '',
                    szinnername : this.parentName,
                    ilevel : this.newLevel,
                    currentLevel : this.newLevel + '级',
                    byisuse : 1,
                    ilevelsequence : '',
                    szmemo : '',
                    iparentid : this.newParentId
                }
            }else{
                if(this.ilevel>1) this.formItemList_add[2].noShow = false;
                else this.formItemList_add[2].noShow = true;
                this.formData_add = {
                    szregionalcode : '',
                    szregionalname : '',
                    szinnername : this.currentLabel,
                    ilevel : this.ilevel,
                    currentLevel : this.ilevel + '级',
                    byisuse : 1,
                    ilevelsequence : '',
                    szmemo : '',
                    iparentid : this.iparentid
                }
            }
            this.spinShow = false;
            if(type){
                this.currentIndex = type;
            }
        },
        setEditForm (type) { 
            this.pageName = "修改";
            this.tipName = "修改";  
            this.getOriginInfo(type);
        },
        setViewForm (type) {
            this.getOriginInfo(type,true);
        },
        getOriginInfo (type,isView) {
            let _this = this;
            return new Promise((resolve,reject) => {
                this.$http.get(this.baseUrl+'/sys/sourceRegion/v1/getSourceregionById?access_token='+this.Cookies.get('token')+'&iregionalid='+this.currentRowData.id)
                .then(res => {
                    if(res.data && res.status == 200){
                        if(isView){
                            _this.formDatas_view = res.data;
                            if(_this.formDatas_view.ilevel > 1){
                                _this.formItemList_view[2].noShow = false;
                            }
                            _this.formDatas_view.ilevel = _this.formDatas_view.ilevel + '级';
                            _this.formDatas_view.byisuse = _this.formDatas_view.byisuse == 1 ? '启用' : '禁用';
                        }else{
                            _this.formData_add = res.data;
                            if(_this.formData_add.ilevel > 1){
                                _this.formItemList_add[2].noShow = false;
                            }
                            _this.formData_add["currentLevel"] = _this.formData_add.ilevel + '级';
                        }
                        resolve()
                    }
                    else{
                        this.$common.showMessageModal(this, res, 1);
                    }
                    _this.spinShow = false;
                    _this.currentIndex = type;
                })
                .catch(error => {

                })
            });
        },
        async getFormData_add (obj) {
            let isSuccess = '';
            if(this.currentIndex == 12){
                if(obj.ilevel == 1) obj.szinnername = obj.szregionalname;
                isSuccess = await this.$common.addNewData('/sys/sourceRegion/v1/saveSourceRegion?flag=1',this,obj,'post',true)
            } else if(this.currentIndex == 13){
                isSuccess = await this.$common.editData('/sys/sourceRegion/v1/saveSourceRegion?flag=2', this, obj,'post',true)
            }
            if(isSuccess){
                this.currentRowData = {};
                this.getListData();
            }
        },
        closeCurrentPage() {
            this.currentIndex = 1;
            this.setAddForm();
        }
    },
    created () { 
        if(this.$store.state.app.pageTabList['originManage'] && this.$store.state.app.pageTabList['originManage'].length>0){ 
            this.tabList = this.$store.state.app.pageTabList['originManage'];
            this.currentTab = this.tabList.length  + ''; 
            this.currentLabel = this.tabList[this.tabList.length-1].label;
            this.tabList.pop();
            this.pageCodeList = this.$store.state.app.pageParentQuery['originManage'];
            this.setUrlQueryParams(this.$store.state.app.pageCurrentQuery['originManage']);
            this.getListData();
        }else{
            this.getListData();
        }
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        this.$store.commit('setPageTabList',{name : 'originManage', tabList : this.tabList});
        this.$store.commit('setPageCurrentQuery',{name : 'originManage', query : this.urlQuery});
        this.$store.commit('setPageParentQuery',{name : 'originManage', query : this.pageCodeList});
        next();
    }

}
</script>