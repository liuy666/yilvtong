<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">服务商价格分组</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @refreshData = "refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :labelWidth="labelWidth"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spinShow: true,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 2,
                        btnlabel: '新增',
                        isAdd : true,
                        routerName : 'service_price_bygroup_new',
                        belongRouterName: this.$route.name
                    },
                    {
                        type: 3,
                        btnlabel: '修改',
                        routerName : 'service_price_bygroup_edit',
                        belongRouterName: this.$route.name
                    },
                    {
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: ''
                    },
                    {
                        type: 5,
                        btnlabel: '查看',
                        routerName : 'service_price_bygroup_view',
                        belongRouterName: this.$route.name
                    }
                ],
                currentRowData: {},
                labelWidth: 10,
                formItemList: [
                    {
                        type: 4,
                        keyName: 'iscenicid',
                        label: '所属服务商',
                        labelWidth: 100,
                        optionList: []
                    },
                    {
                        type: 2,
                        keyName: 'flag',
                        label: '',
                        optionList: [
                            {
                                value: 0,
                                labelName: '按用户名'
                            },
                            {
                                value: 1,
                                labelName: '按旅行社名称模糊查询'
                            }
                        ]
                    },
                    {
                        type: 1,
                        keyName: 'query',
                        labelWidth: 80,
                        label: '关键字'
                    }
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'seq'
                    },
                    {
                        title: '服务商名称',
                        key: 'szscenicname'
                    },
                    {
                        title: '价格分组名称',
                        key: 'pmva'
                    },
                    {
                        title: '用户',
                        key: 'corpname'
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            return h('span',{},params.row.byisuse ? '启用' : '禁用');
                        }
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    formDatas:{},
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{}
            }
        },
        methods:{
            selected(row){
                this.currentRowData["id"] = row.seq;
                this.currentRowData["name"] = 'seq';
                this.btnList[3].url = `${this.baseUrl}/ticket/jgfz/v1/deleteJgfz?seq=${row.seq}`
            },
            changePage(pageCode) {
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showAllJgfz', this, 'get')
            },
            changePageSize(pageSize){
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showAllJgfz', this, 'get')
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showAllJgfz', this, 'get')
            },
            clearFormData(){
                this.pars.formDatas = {
                    iscenicid: 0,
                    flag: 0
                }
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showAllJgfz', this, 'get')
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    iscenicid: this.pars.formDatas.iscenicid,
                    query: this.pars.formDatas.query,
                    flag: this.pars.formDatas.flag
                }
            }
        },
        created () {
            this.$common.getScenicList(this, 0, true).then(() => {
                this.pars.formDatas = {
                    iscenicid: 0,
                    flag: 0
                };
                this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showAllJgfz', this, 'get')
            });

        }
    }
</script>

<style scoped>

</style>
