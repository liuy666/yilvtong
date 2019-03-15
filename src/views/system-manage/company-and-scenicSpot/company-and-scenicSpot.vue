<style scoped lang="less">

</style>

<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">企业与景区关联</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :labelWidth = "55"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="false"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 13">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">景区属性</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas1"
                        :labelWidth = "120"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchCount: 1,   //进页面的第一次请求
            currentIndex: 1,
            isClose: false,
            tipName: '操作',
            spinShow: true,
            total: 0,
            loading: false,
            btnLoading: false,
            btnList:[
                {
                    type : 1,
                    btnlabel : "刷新"
                }
            ],
            currentRowData:{},
            formItemList: [
                {
                    type: 1,
                    label: "景区",
                    keyName: "szscenicnamesss"

                }
            ],
            colname: [
            {
                title: '企业名称',
                key: 'szcompanyname'
            },
            {
                title: '景区名称',
                key: 'szscenicnamesss'
            },
            {
                title: '易旅宝标识',
                render : (h,params) => {
                    return params.row.cytonly ? '是' : '否'
                }
            },
            {
                title: '操作',
                render : (h,params) => {
                    return h('a',{
                            'class': {
                                hover_span: true
                            },
                            on: {
                                click : () => {
                                    this.changeIndex(13, params.row)
                                }
                            }
                        }, '易旅宝标识')
                }
            }],
            tableData: [],
            pars: {
                pageNum:10,
                pageCode:1,
                formDatas:{}
            },
            urlQuery: {},
            formDatas1: {},
            formItemList1: [
                {
                    type: 9,
                    label: '企业名称',
                    keyName: 'szcompanyname'
                },
                {
                    type: 9,
                    label: '景区名称',
                    keyName: 'szscenicnamesss'
                },
                {
                    type: 2,
                    label: '易旅宝标识',
                    keyName: 'cytonly',
                    optionList: [
                        {
                            value: '1',
                            labelName: '打印'
                        },
                        {
                            value: '',
                            labelName: '不打印'
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        //点击新增修改查看按钮跳到对应页面
        changeIndex (type, row) {
            this.spinShow = true;
            this.tipName = '';
            this.setEditInitData(type,row);
        },
        //选择页码
        changePage (pageCode) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.currentRowData = {};
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/sys/companyscenic/v1/queryCompanyscenicInfo', this, 'get')
        },
        //选择每页条数
        changePageSize (pageSize) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.currentRowData = {};
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/sys/companyscenic/v1/queryCompanyscenicInfo', this, 'get')
        },
        //条件查询
        getFormData (data) {
            this.currentRowData = {};
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/sys/companyscenic/v1/queryCompanyscenicInfo', this, 'get')
        },
        //需要拼接的url后面的参数
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                szscenicname: this.pars.formDatas.szscenicnamesss
            }
        },
        //查询条件重置
        clearFormData () {
            this.currentRowData = {};
            this.pars.formDatas = {
                szscenicname: ''
            }
        },
        async getFormDataAdd (obj) {
            this.btnLoading = true;
            let aaa = '';
            aaa = await this.$common.editData('/sys/companyscenic/v1/updateCompanyscenicInfo', this, obj, 'put');
            if (aaa) {
                this.$common.currentPageData(this.baseUrl+'/sys/companyscenic/v1/queryCompanyscenicInfo', this, 'get')
            }
        },
        //编辑页面初始化
        setEditInitData (type,row) {
            row = JSON.parse(JSON.stringify(row));
            row['id'] = {
                iscenicid: row.iscenicid,
                icompanyinfoid: row.icompanyinfoid,
            };
            row.cytonly = row.cytonly ? '1' : '';
            this.formDatas1 = row;
            this.spinShow = false;
            this.currentIndex = type
        },
        //关闭新增修改查看页
        closeCurrentPageAdd () {
            this.currentIndex = 1
        }
    },
    created () {
        this.$common.currentPageData(this.baseUrl+'/sys/companyscenic/v1/queryCompanyscenicInfo', this, 'get')
    }
}
</script>
