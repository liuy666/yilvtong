<style lang="less">
    @import '../../../styles/ectrip.less';
</style>
<style scoped>

</style>
<template>
    <div>
        <Card>
            <p slot="title" style="height:32px;">
                <span style="display:inline-block;float:left;line-height:32px;">副券打印管理</span>
                <top-btn
                    :btn-list="btnList"
                    :currentRowData="currentRowData"
                    @refreshData = "refreshData"
                ></top-btn>
            </p>

            <detail-form1
                :formDatas="pars.formDatas"
                :formItemList="formItemList"
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            //按钮部分
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },{
                    type : 2,
                    btnlabel : "新增",
                    isAdd : true,
                    routerName : 'conpon_print_set_new',
                    belongRouterName: this.$route.name
                },{
                    type : 3,
                    btnlabel : "修改",
                    routerName : 'conpon_print_set_edit',
                    belongRouterName: this.$route.name
                }
            ],
            //表单部分
            formItemList : [
                {
                    label : "服务商",
                    keyName : "iscenicid",
                    type : 4,
                    isRequired : true,
                    optionList : []
                },{
                    label : "业务",
                    keyName : "businesstype",
                    type : 4,
                    isRequired : true,
                    optionList : []
                }
            ],
            labelWidth : 80,
            //表格部分
            tableColumns: [
                {
                    title: '服务商',
                    key: 'serviceProviders',
                    align : 'center'
                },
                {
                    title: '业务',
                    key: 'business',
                    align : 'center'
                },
                {
                    title: '打印编号',
                    key: 'printNum',
                    align : 'center'
                },
                {
                    title: '顺序',
                    key: 'order',
                    align : 'center'
                }
            ],
            tableData: [],
            currentRowData:{},
            tableSize : "small",
            pars:{
                formDatas : {
                    iscenicid : "",
                    businesstype : ''
                },
                pageNum:10,
                pageCode:1,
            },
            total:0,
            loading: false,
            single: 0,
            className : ''
        }
    },
    methods : {
        //表格相关
        getChooseData(row){
            this.currentRowData["id"] = row.iscenicid;
            this.currentRowData["name"] = 'iscenicid';
            this.currentRowData["szscenicname"] = row.szscenicname;
            this.btnList[3].url = this.baseUrl+'/ticket/provider/v1/deleteProvider?iscenicId='+row.iscenicid;
        },
        changePage(pageCode) {
            this.pars.pageCode = pageCode;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
        },
        changePageSize(pageSize){
            this.pars.pageNum = pageSize;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
        },
        isSingle(page){
            if(page == 1) this.single = 0;
            else this.single = page;
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                iscenicid : this.pars.formDatas.iscenicid,
                businesstype : this.pars.formDatas.businesstype
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
        },
        clearFormData(){
            this.pars.formDatas = {
                radiobuttom : 0,
                condition : ''
            }
        }
    },
    created () {
        //获取景区服务商列表
        this.$common.getScenicList(this,0,true);
        //获取业务类型列表
        this.$common.getSelectItem(this.baseUrl+'/ticket/business/v1/businessSelect',this,1,'businesstype','szbusinessname',true);
        //获取表格数据
        this.$common.currentPageData(this.baseUrl+'/ticket/provider/v1/queryProviderList', this, 'get')
    }

}
</script>