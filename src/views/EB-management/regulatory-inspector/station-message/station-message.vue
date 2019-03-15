<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">站内短信公告</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
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
                ></radio-table>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 2,
                        btnlabel: '新增',
                        isAdd: true
                    },
                    {
                        type: 3,
                        btnlabel: '修改'
                    },
                    {
                        type: 4,
                        btnlabel: '删除'
                    },
                    {
                        type: 5,
                        btnlabel: '查看'
                    },
                ],
                currentRowData: {},
                formItemList: [
                    {
                        type: 2,
                        label: '',
                        keyName: 'flag',
                        labelWidth: 10,
                        optionList: [
                            {
                                value: 0,
                                labelName: '按接收人名称'
                            },
                            {
                                value: 1,
                                labelName: '按发送人名称'
                            }
                        ]
                    },
                    {
                        type: 6,
                        label: '查询关键字',
                        keyName: 'szemployeename',
                        keyName1: 'employeeid',
                        btnLabel: '查询',
                        title: '选择员工',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        treeData: [],
                        treeType: 3,
                    }
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'seq'
                    },
                    {
                        title: '接收人名称',
                        key: 'szempname',
                    },
                    {
                        title: '发送人名称',
                        key: 'szemployeename'
                    },
                    {
                        title: '发送信息',
                        key: 'szmemo'
                    },
                    {
                        title: '日期',
                        key: 'reminddate'
                    },
                ],
                tableData: [],
                total: 0,
                loading: false,
                pars:{
                    formDatas:{
                        flag: 0
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{}
            }
        },
        methods:{
            selected(row){
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'cardId'
            },
            changePage(pageCode) {
                this.pars.pageCode = pageCode;
                this.refreshUrlQuery();
                this.$common.currentPageData(this.baseUrl+'/sys/webinfo/v1/list', this, 'get');
            },
            changePageSize(pageSize){
                this.pars.pageNum = pageSize;
                this.refreshUrlQuery();
                this.$common.currentPageData(this.baseUrl+'/sys/webinfo/v1/list', this, 'get')
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.refreshUrlQuery();
                this.$common.currentPageData(this.baseUrl+'/sys/webinfo/v1/list', this, 'get')
            },
            clearFormData(){
                this.pars.formDatas = {
                    flag: 0
                }
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.refreshUrlQuery();
                this.$common.currentPageData(this.baseUrl+'/sys/webinfo/v1/list', this, 'get')
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    flag: this.pars.formDatas.flag,
                    employeeid: this.pars.formDatas.employeeid,
                };
            }
        },
        created () {
            this.refreshUrlQuery();
            this.$common.currentPageData(this.baseUrl+'/sys/webinfo/v1/list', this, 'get');
        }
    }
</script>

<style scoped>

</style>
