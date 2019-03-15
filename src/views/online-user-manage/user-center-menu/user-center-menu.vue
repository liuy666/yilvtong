<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">用户中心菜单</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            :parent-id="this.iparentid"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :labelWidth="80"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList_list"
                        @getFormData="getFormData"
                ></detail-form1>
                <Tabs type="card" :animated="false" v-model="currentTab" @on-click="delChildTab">
                    <TabPane v-for="(item,index) in tabList"  :key="index" :label="item.label" :name="item.name" >
                        <radio-table
                            :colname="colname"
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
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}菜单信息</span>
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
                    <span style="display:inline-block;float:left;line-height:32px;">查看菜单信息</span>
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
                isClose : false,
                currentTab : '1',
                labelCount : 1,
                currentIndex: 1,
                spinShow: true,
                //列表页 按钮部分
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
                //列表页 表单部分
                formItemList_list: [
                    {
                        type: 1,
                        keyName: 'itemname',
                        label: '菜单名称'
                    },
                ],
                //列表页 表格部分
                currentRowData: {},
                colname : [
                    {
                        title : '菜单ID',
                        key : 'itemid',
                        align : 'center'
                    },
                    {
                        title : '菜单名称',
                        key : 'itemname',
                        align : 'center'
                    },
                    {
                        title : '菜单链接',
                        key : 'itemurl',
                        align : 'center'
                    },
                    {
                        title : '是否启用',
                        key : 'itemstatus',
                        align : 'center',
                        render : (h,params) => {
                            return h('span',{},params.row.itemstatus == 1 ? '启用' : params.row.itemstatus == 0 ? '禁用' : '');
                        }
                    },
                    {
                        title : '备注信息',
                        key : 'itemmark',
                        align : 'center'
                    },
                    {
                        title : '操作',
                        key : 'options',
                        align : 'center',
                        render : (h,params) => {
                            return params.row.itemid ?  h('div',[
                                h('a',{
                                    on : {
                                        click : (ev) => { 
                                            this.spinShow = true;

                                            let oev = ev || event;
                                            ev.cancelBubble = true;
                                            
                                            //记录上一级的查询条件
                                            this.pageCodeList.push(this.urlQuery);

                                            //记录查询条件所需 父id  记录对应的label 
                                            this.labelCount = this.labelCount + 1;
                                            this.iparentid = params.row.itemid;
                                            this.currentLabel = params.row.itemname;
                                            
                                            //重置新的页码为1作为查询条件
                                            this.pars.pageCode = 1;

                                            this.getListData();
                                            this.currentTab = this.labelCount +'';
                                        }
                                    }
                                },'[下一级] ')])  : '';
                        }
                    }
                ],
                tableData:[],
                tabList : [],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    formDatas:{
                        itemname : ''
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                iparentid : null,
                currentLabel : '第一级列表',
                pageCodeList : [],
                
                //新增修改页面
                labelWidth_add : 180,
                formData_add : {},
                formItemList_add: [
                    {
                        type: 1,
                        label: '菜单名称',
                        keyName: 'itemname',
                        isRequired : true
                    },
                    {
                        type: 1,
                        label: '菜单链接',
                        keyName: 'itemurl',
                        isRequired: true
                    },
                    {
                        type: 2,
                        label: '菜单状态',
                        keyName: 'itemstatus',
                        optionList : [{
                            value : '1',
                            labelName : '启用'
                        },{
                            value : '0',
                            labelName : '禁用'
                        }]
                    },
                    {
                        type: 3,
                        label: '所属角色',
                        keyName: 'itemauthority',
                        isRequired : true,
                        optionList : []
                    },
                    {
                        type: 7,
                        label: '备注信息',
                        keyName: 'itemmark'
                    }
                ],
                ruleDatas_add : {

                },
                pageName : '',
                formName : '',
                tipName : '',
                //查看页面
                labelWidth_view : 180,
                formDatas_view : {},
                formItemList_view :[
                    {
                        label : '菜单名称',
                        keyName : 'itemname'
                    },{
                        label : '菜单链接',
                        keyName : 'itemurl'
                    },{
                        label : '菜单状态',
                        keyName : 'itemstatus'
                    },{
                        label : '所属角色',
                        keyName : 'itemauthority',
                        showElement : true,
                        optionList : []
                    },{
                        label : '备注信息',
                        keyName : 'itemmark'
                    }
                ]
            }
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
                this.currentRowData["id"] = row.itemid;
                this.currentRowData["name"] = 'itemid';
                this.btnList[3].url = this.baseUrl+'/ec/userCenterItem/v1/deleteUserCenterItem?itemId='+row.itemid;
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
                    itemId : this.iparentid,
                    itemName : this.pars.formDatas.itemname
                };
            },
            refreshData(){ debugger
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.getListData();
            },
            getFormData(data){ 
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.getListData();

            },

            //点击tab标签回退上一级
            delChildTab (name) { 
                if(this.tabList.length > 1){
                    this.spinShow = true;
                    this.currentLabel = this.tabList[parseInt(name)-1].label;
                    this.tabList = this.tabList.slice(0,parseInt(name)-1);//删掉所点击的tab页之后的数据
                    
                    //根据存起来的查询条件 设置回退后的当前查询参数  并删除后续的查询条件
                    this.setUrlQueryParams(this.pageCodeList[parseInt(name)-1]);
                    this.pageCodeList = this.pageCodeList.slice(0,parseInt(name)-1); 
                    this.labelCount = parseInt(name);
                    this.getListData();
                }
            },
            getListData () { 
                let _this = this;
                this.$common.currentPageData(this.baseUrl+'/ec/userCenterItem/v1/showAllUserCenterItem', this, 'get')
                .then(() => { 
                    let newTab = {};
                    newTab["tableData"] = _this.tableData;
                    newTab["label"] = _this.currentLabel;
                    newTab["name"] = _this.labelCount + '';
                    _this.tabList.splice(_this.labelCount-1,1,newTab);
                    _this.spinShow = false;
                })
            },
            setUrlQueryParams (queryObj) { 
                this.itemname = queryObj.itemName
                this.iparentid = queryObj.itemId;
                this.pars.pageNum = queryObj.pageSize;
                this.pars.pageCode = queryObj.page
            },
            async setAddForm (type) {
                await this.addEditInitRoles(true);
                this.pageName = "新增";
                this.tipName = "新增";
                this.formData_add = {
                    itemname : '',
                    itemurl : '',
                    itemstatus : '1',
                    itemauthority : [],
                    itemmark:'',
                    itemparent: this.iparentid
                }
                this.spinShow = false;
                if(type){
                    this.currentIndex = type;
                }
            },
            async setEditForm (type) { 
                this.pageName = "修改";
                this.tipName = "修改";
                await this.addEditInitRoles(false);
                this.currentIndex = type;
            },
            async setViewForm (type) {
                await this.addEditInitRoles(false,true);
                this.currentIndex = type;
            },
            //初始化所属角色
            addEditInitRoles (isAdd,isView) {
                let _this = this;
                return new Promise((resolve,reject) => {
                    let itemid = isAdd ? '' : '&itemId='+this.currentRowData.id
                    this.$http.get(this.baseUrl+'/ec/userCenterItem/v1/initUserCenterItemAddAndUpdateData?access_token=' + this.Cookies.get('token') + itemid )
                    .then(res => {
                        if (res.data.code == 200) { 
                            let data = res.data.data;
                            let options = [];
                            data.allRole.forEach(element => {
                                let oneOption = {};
                                oneOption["value"] = element.roleid+'';
                                oneOption["labelName"] = element.rolename;
                                options.push(oneOption);
                            });
                            _this.formItemList_add[3].optionList = options;
                            if(isView) _this.formItemList_view[3].optionList = options;
                            if(!isAdd){
                                let roleArr = data.userCenterItem.itemauthority;
                                roleArr = roleArr.split(",");
                                let newRoleArr = roleArr.map(element => {
                                    return element.replace(" ",'');
                                })  
                                data.userCenterItem.itemauthority = newRoleArr;
                                if(isView){
                                    this.formDatas_view = data.userCenterItem;
                                }else{
                                    this.formData_add = data.userCenterItem;
                                }
                            }
                            resolve()
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                        }
                        this.spinShow = false;
                    })
                });
            },
            async getFormData_add (obj) { 
                let isSuccess = '';
                let newObj = Object.assign({},obj);
                newObj.itemauthority = newObj.itemauthority.join(",");
                if(this.currentIndex == 12){
                   isSuccess = await this.$common.addNewData('/ec/userCenterItem/v1/saveOperatorUserCenterItem?flag=1',this,newObj,'post',true)
                } else if(this.currentIndex == 13){
                   isSuccess = await this.$common.editData('/ec/userCenterItem/v1/saveOperatorUserCenterItem?flag=2', this, newObj,'post',true)
                }
                if(isSuccess){
                    this.currentRowData = {};
                    this.getListData();
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
            if(this.$store.state.app.pageTabList['userCenterMenu']){ 
                this.tabList = this.$store.state.app.pageTabList['userCenterMenu'];
                this.currentTab = this.tabList.length  + ''; 
                this.currentLabel = this.tabList[this.tabList.length-1].label;
                this.labelCount = this.tabList.length;
                this.tabList.pop();
                this.pageCodeList = this.$store.state.app.pageParentQuery['userCenterMenu'];
                this.setUrlQueryParams(this.$store.state.app.pageCurrentQuery['userCenterMenu']);
                this.getListData();
            }else{
                this.getListData();
            }
        },
        beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            this.$store.commit('setPageTabList',{name : 'userCenterMenu', tabList : this.tabList});
            this.$store.commit('setPageCurrentQuery',{name : 'userCenterMenu', query : this.urlQuery});
            this.$store.commit('setPageParentQuery',{name : 'userCenterMenu', query : this.pageCodeList});
            next();
        }
    }
</script>

<style scoped>

</style>
