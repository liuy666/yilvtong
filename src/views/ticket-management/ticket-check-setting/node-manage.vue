<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">验票节点查询</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
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
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}验票节点</span>
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
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentIndex: 1,
                spinShow: false,
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
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: '',
                    }
                ],                
                //列表页 表格部分
                currentRowData: {},
                colname : [
                    {
                        title : '节点编码',
                        key : 'code'
                    },
                    {
                        title : '节点名称',
                        key : 'name'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
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
                        label: '节点编码',
                        keyName: 'code'
                    },
                    {
                        type: 1,
                        label: '节点名称',
                        keyName: 'name'
                    }
                ],
                ruleDatas_add : {
                    code: [
                        { required: true, message: '节点编码不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '节点名称不能为空', trigger: 'blur' }
                    ]
                },
                pageName : '',
                formName : '',
                tipName : '',
            }
        },
        methods:{
            // 点击新增修改查看按钮跳到对应页面
            async changeIndex (type) {
                if (type === 12) {
                    this.spinShow = true;
                    await this.setAddForm();
                    this.currentIndex = type
                } 
                /*else if (type === 13) {
                    this.spinShow = true;
                    await this.setEditForm();
                    this.currentIndex = type
                }*/
            },
            //表格相关
            getChooseData(row){
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'id';
                this.btnList[2].url = this.baseUrl+'/ticket/checkSchedule/deleteNode?id='+row.id;
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
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryNodeList', this, 'get')
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
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryNodeList', this, 'get')
            },
            isSingle(page){
                this.single = page
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
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryNodeList', this, 'get')
            },
            getFormData(data){ 
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryNodeList', this, 'get')
            },
            setAddForm () {
                this.pageName = "新增";
                this.tipName = "新增";
                this.formData_add = {
                    code : '',
                    name : '',
                    id : ''
                }
                this.spinShow = false;
            },
            
            async getFormData_add (obj) {  
                await this.$common.addNewData('/ticket/checkSchedule/updateNode',this,obj,'post',false)
                this.currentRowData = {};
                this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryNodeList', this, 'get')
            },
            //关闭新增查看页
            closeCurrentPage() {
                this.currentIndex = 1;
                this.setAddForm();
            }
        },
        created () {
            this.spinShow = true;
            this.$common.currentPageData(this.baseUrl+'/ticket/checkSchedule/queryNodeList', this, 'get')
        }
    }
</script>

<style scoped>

</style>
