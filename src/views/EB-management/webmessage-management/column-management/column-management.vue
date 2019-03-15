<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">网站栏目管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData = "refreshData"
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
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增栏目信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改栏目信息</span>
                </p>
                <detail-form1
                        ref = "card"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "160"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看栏目信息</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        @closeCurrentPage = "closeCurrentPageAdd"
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
                searchCount: 1,
                currentIndex: 1,
                isClose: false,
                tipName: '',
                spinShow: true,
                total: 0,
                loading: false,
                single: 0,
                btnLoading: false,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    // {
                    //     type: 12,
                    //     btnlabel: '新增',
                    // },
                    // {
                    //     type: 13,
                    //     btnlabel: '修改',
                    // },
                    // {
                    //     type: 4,
                    //     btnlabel: '删除',
                    //     dialogType: 'del',
                    //     url: ''
                    // },
                    {
                        type: 14,
                        btnlabel: '查看',
                    },
                ],
                currentRowData: {},
                colname: [
                    {
                        title: '编号',
                        key: 'cmid',
                    },
                    {
                        title: '栏目名称',
                        key: 'cmzhtopic'
                    },
                    {
                        title: '栏目类别',
                        key: 'cmentopic',
                        render: (h, params) => {
                            let cmentopic = '';
                            switch (params.row.cmentopic) {
                                case 'default': cmentopic = '普通栏目';break;
                                case 'news': cmentopic = '新闻资讯';break;
                                case 'information': cmentopic = '资讯';break;
                                case 'strategy': cmentopic = '攻略';break;
                                case 'restaurant': cmentopic = '餐厅';break;
                                case 'dishes': cmentopic = '菜品';break;
                                case 'guide': cmentopic = '目的地指南';break;
                                case 'help': cmentopic = '帮助中心';break;
                                default: break
                            }
                            return h('span', cmentopic)
                        }
                    },
                    {
                        title: '是否启用',
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '是' : '否')
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'dtmakedate'
                    },
                    {
                        title: '管理',
                        render: (h, params) => {
                            return h('span', {
                                'class': {
                                    hover_span: true
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'article-management',
                                            params: {
                                                id : params.row.cmid
                                            }
                                        });
                                    }
                                }
                            }, '文章管理')
                        }
                    }
                ],
                tableData:[],
                pars:{
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                formDatas_add: {},
                ruleDatas: {
                    cmzhtopic: [
                        { required: true, message: '栏目名称名称不能为空', trigger: 'blur' }
                    ],
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: '栏目名称',
                        keyName: 'cmzhtopic',
                    },
                    {
                        type: 4,
                        label: '栏目类别',
                        keyName:'cmentopic',
                        optionList: [
                            {
                                value: 'default',
                                label: '普通栏目'
                            },
                            {
                                value: 'news',
                                label: '新闻资讯'
                            },
                            {
                                value: 'information',
                                label: '资讯'
                            },
                            {
                                value: 'strategy',
                                label: '攻略'
                            },
                            {
                                value: 'restaurant',
                                label: '餐厅'
                            },
                            {
                                value: 'dishes',
                                label: '菜品'
                            },
                            {
                                value: 'guide',
                                label: '目的地指南'
                            },
                            {
                                value: 'help',
                                label: '帮助中心'
                            },
                        ]
                    },
                    {
                        type: 7,
                        label: '描述',
                        keyName:'cmdesc',
                    },
                    {
                        type: 2,
                        label: '是否启用',
                        keyName:'byisuse',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    }
                ],
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '栏目编号',
                        keyName: 'cmid'
                    },
                    {
                        label: '栏目名称',
                        keyName: 'cmzhtopic'
                    },
                    {
                        label: '栏目类别',
                        keyName: 'cmentopic'
                    },
                    {
                        label: '描述',
                        keyName: 'cmdesc'
                    },
                    {
                        label: '使用状态',
                        keyName: 'byisuse'
                    },
                    {
                        label: '创建时间',
                        keyName: 'dtmakedate'
                    },
                ],
            }
        },
        methods: {
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '栏目新增';
                    this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '栏目修改';
                    this.setEditInitData(type)
                } else if (type === 14) {
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.cmid;
                this.currentRowData["name"] = 'cmid';
                this.btnList[3].url = `${this.baseUrl}/ec/columnManager/v1/delete/${row.cmid}`
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
                this.$common.currentPageData(this.baseUrl+'/ec/columnManager/v1/list', this, 'get');
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
                this.$common.currentPageData(this.baseUrl+'/ec/columnManager/v1/list', this, 'get')
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ec/columnManager/v1/list', this, 'get')
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
            async setAddInitData (type) {
                this.formDatas_add = {
                    cmentopic: this.formItemList_add[1].optionList[0].value,
                    byisuse: 1
                };
                this.spinShow = false;
                this.currentIndex = type
            },
            async setEditInitData (type) {
                this.getSingleData(type)
            },
            setViewInitData (type) {
                this.getSingleData(type,1)
            },
            getSingleData (type,isView) {
                this.$http.get(`${this.baseUrl}/ec/columnManager/v1/detail/${this.currentRowData.id}`, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        if (isView) {
                            let data = res.data.data;
                            let cmentopic = '';
                            switch (data.cmentopic) {
                                case 'default': cmentopic = '普通栏目';break;
                                case 'news': cmentopic = '新闻资讯';break;
                                case 'information': cmentopic = '资讯';break;
                                case 'strategy': cmentopic = '攻略';break;
                                case 'restaurant': cmentopic = '餐厅';break;
                                case 'dishes': cmentopic = '菜品';break;
                                case 'guide': cmentopic = '目的地指南';break;
                                case 'help': cmentopic = '帮助中心';break;
                                default: break
                            }
                            data.cmentopic = cmentopic;
                            data.byisuse = data.byisuse ? '是' : '否';
                            this.formDatas_view = res.data.data
                        } else {
                            this.formDatas_add = res.data.data
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            async getFormDataAdd (obj) {
                let aaa = '';
                this.btnLoading = true;
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData('/ec/columnManager/v1/add', this, obj)
                } else if(this.currentIndex === 13){
                    aaa = await this.$common.editData('/ec/columnManager/v1/update', this, obj)
                }
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ec/columnManager/v1/list', this, 'get')
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            },
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/ec/columnManager/v1/list', this, 'get')
        }
    }
</script>

<style scoped>

</style>
