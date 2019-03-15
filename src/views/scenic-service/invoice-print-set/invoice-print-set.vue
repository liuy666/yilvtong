<style lang="less">
    @import '../../../styles/ectrip.less';
</style>
<style scoped>

</style>
<template>
    <div>
        <Card>
            <p slot="title" style="height:32px;">
                <span style="display:inline-block;float:left;line-height:32px;">发票打印管理</span>
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
                    routerName : 'invoice_print_set_new',
                    belongRouterName: this.$route.name
                },{
                    type : 3,
                    btnlabel : "修改",
                    routerName : 'invoice_print_set_edit',
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
                }
            ],
            labelWidth : 80,
            //表格部分
            tableColumns: [
                {
                    title: '服务商',
                    key: 'szscenicname',
                    align : 'center'
                },
                {
                    title: '打印编号',
                    key: 'printnoname',
                    align : 'center'
                },
                {
                    title: '内容控制类型',
                    key: 'contenttypename',
                    align : 'center'
                    // render : (h,params) => {
                    //     let row = params.row;
                    //     let text = row.contenttypename == 1 ? '程序控制' : row.contenttypename == 0 ? '系统控制' : '';
                    //     return text;
                    // }
                },
                {
                    title : '内容',
                    key : 'content',
                    align : 'center'
                },
                {
                    title : '打印方式',
                    key : 'printtypename',
                    align : 'center'
                    // render : (h,params) => {
                    //     let row = params.row;
                    //     let text = row.printWay == 1 ? '只打印内容' : row.printWay == 0 ? '标题内容一起打印' : '';
                    //     return text;
                    // }
                },
                {
                    title : '行数',
                    key : 'colnum',
                    align : 'center'
                },
                {
                    title: '顺序',
                    key: 'ordernum',
                    align : 'center'
                }
            ],
            tableData: [],
            currentRowData:{},
            tableSize : "small",
            pars:{
                formDatas : {
                    iscenicid : ""
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
                iscenicid : this.pars.formDatas.iscenicid
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/sys/receipt/v1/showReceiptManagerList', this, 'get')
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/sys/receipt/v1/showReceiptManagerList', this, 'get')
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
        //获取表格数据
        this.$common.currentPageData(this.baseUrl+'/sys/receipt/v1/showReceiptManagerList', this, 'get')
    }

}
</script>