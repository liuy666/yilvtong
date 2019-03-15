<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">用户权限管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
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
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}角色</span>
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
                    <span style="display:inline-block;float:left;line-height:32px;">查看角色</span>
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
                spinShow: true,
                isClose : false,
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
                        keyName: 'rolename',
                        label: '角色名称'
                    },
                ],
                //列表页 表格部分
                currentRowData: {},
                colname : [
                    {
                        title : '角色ID',
                        key : 'roleid',
                        align : 'center'
                    },
                    {
                        title : '角色名称',
                        key : 'rolename',
                        align : 'center'
                    },
                    {
                        title : '备注信息',
                        key : 'rolemark',
                        align : 'center'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    formDatas:{
                        rolename : ''
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                
                //新增修改页面
                labelWidth_add : 180,
                formData_add : {},
                formItemList_add: [
                    {
                        type: 1,
                        label: '角色名称',
                        keyName: 'rolename',
                        isRequired : true
                    },
                    {
                        type: 7,
                        label: '角色备注',
                        keyName: 'rolemark'
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
                        label : '角色ID',
                        keyName : 'roleid'
                    },{
                        label : '角色名称',
                        keyName : 'rolename'
                    },{
                        label : '角色备注',
                        keyName : 'rolemark'
                    }
                ]
            }
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
                this.currentRowData["id"] = row.roleid;
                this.currentRowData["name"] = 'roleid';
                this.btnList[3].url = this.baseUrl+'/ec/userCenterRole/v1/deleteUserCenterRole?roleId='+row.roleid;
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
                this.$common.currentPageData(this.baseUrl+'/ec/userCenterRole/v1/showAllUserCenterRole', this, 'get')
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
                this.$common.currentPageData(this.baseUrl+'/ec/userCenterRole/v1/showAllUserCenterRole', this, 'get')
            },
            isSingle(page){
                if(page == 1) this.single = 0;
                else this.single = page;
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    roleName : this.pars.formDatas.rolename
                };
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ec/userCenterRole/v1/showAllUserCenterRole', this, 'get')
            },
            getFormData(data){ 
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ec/userCenterRole/v1/showAllUserCenterRole', this, 'get')
            },
            setAddForm (type) {
                this.pageName = "新增";
                this.tipName = "新增";
                this.formData_add = {
                    rolename : '',
                    rolemark : ''
                }
                this.spinShow = false;
                if(type){
                    this.currentIndex = type;
                }
            },
            setEditForm (type) { 
                this.pageName = "修改";
                this.tipName = "修改";
                this.getRoleInfo(type);
            },
            setViewForm (type) {
                this.getRoleInfo(type,true);
            },
            //根据id查询角色信息
            getRoleInfo (type,isView) {
                let _this = this;
                return new Promise((resolve,reject) => {
                    this.$http.get(this.baseUrl+'/ec/userCenterRole/v1/getUserCenterRoleById?access_token=' + this.Cookies.get('token') + '&roleId=' + this.currentRowData.id )
                    .then(res => {
                        if (res.data.code == 200) { 
                            if(isView){
                                _this.formDatas_view = res.data.data;
                            }else{
                                _this.formData_add = res.data.data;
                            }
                            resolve()
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                        }
                        _this.spinShow = false;
                        _this.currentIndex = type;
                    })
                });
            },
            async getFormData_add (obj) { 
                let isSuccess = '';
                if(this.currentIndex == 12){
                    isSuccess = await this.$common.addNewData('/ec/userCenterRole/v1/saveOperatorUserCenterRole?flag=1',this,obj,'post',true)
                } else if(this.currentIndex == 13){
                    isSuccess = await this.$common.editData('/ec/userCenterRole/v1/saveOperatorUserCenterRole?flag=2', this, obj,'post',true)
                }
                if(isSuccess){
                    this.currentRowData = {};
                    this.$common.currentPageData(this.baseUrl+'/ec/userCenterRole/v1/showAllUserCenterRole', this, 'get')
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
            this.$common.currentPageData(this.baseUrl+'/ec/userCenterRole/v1/showAllUserCenterRole', this, 'get')
        }
        /*beforeRouteLeave (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            this.$store.commit('setPageTabList',{name : 'userCenterMenu', tabList : this.tabList});
            this.$store.commit('setPageCurrentQuery',{name : 'userCenterMenu', query : this.urlQuery});
            this.$store.commit('setPageParentQuery',{name : 'userCenterMenu', query : this.pageCodeList});
            next();
        }*/
    }
</script>

<style scoped>

</style>
