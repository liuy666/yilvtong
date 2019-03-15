<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">短信发送控制</span>
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
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增短信发送设置</span>
                    <span v-if="currentIndex === 13" class="title_span">修改短信发送设置</span>
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
                    <span class="title_span">查看短信发送设置</span>
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
                        url: ''
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    }
                ],
                currentRowData: {},
                colname:[
                    {
                        title: '编号',
                        key: 'conid',
                        width: 100
                    },
                    {
                        title: '发送控制点名称',
                        key: 'controlpoin',
                        width: 150,
                    },
                    {
                        title: '内容模板',
                        key: 'templates',
                        width: 1194
                    },
                    {
                        title: '使用状态',
                        width: 100,
                        render: (h, params) => {
                            return params.row.byisuse ? '启用' : '禁用'
                        }
                    }
                ],
                tableData:[],
                pars:{
                    formDatas:{},
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                formDatas_add: {},
                ruleDatas: {
                    templates: [
                        { required: true, message: '内容模板信息不能为空', trigger: 'blur' }
                    ],
                },
                formItemList_add: [
                    {
                        type: 4,
                        label: '发送控制点名称',
                        keyName: 'controlpoin',
                        optionList: [],
                    },
                    {
                        type: 7,
                        keyName: 'templates',
                        label: '内容模版',
                    },
                    {
                        type: 2,
                        keyName: 'byisuse',
                        label: '使用状态',
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用',
                            },
                            {
                                value: 0,
                                labelName: '禁用',
                            }
                        ],
                    }
                ],
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '编号',
                        keyName: 'conid'
                    },
                    {
                        label: '发送控制点名称',
                        keyName: 'controlpoin'
                    },
                    {
                        label: '内容模板',
                        keyName: 'templates'
                    },
                    {
                        label: '使用状态',
                        keyName: 'byisuse'
                    },
                ],
            }
        },
        methods:{
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '短信发送控制信息新增';
                    this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '短信发送控制信息修改';
                    this.setEditInitData(type)
                } else if (type === 14) {
                    this.tipName = '短信发送';
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.conid;
                this.currentRowData["name"] = 'conid';
                this.btnList[3].url = `${this.baseUrl}/sys/contMessage/v1/delete/${row.conid}`
            },
            changePage(pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/sys/contMessage/v1/list', this, 'get');
            },
            changePageSize(pageSize){
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/sys/contMessage/v1/list', this, 'get');
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/sys/contMessage/v1/list', this, 'get');
            },
            clearFormData(){
                this.pars.formDatas = {}
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/sys/contMessage/v1/list', this, 'get');
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
                if (!this.formItemList_add[0].optionList.length) {
                    let url = `${this.baseUrl}/sys/syspar/v1/retrieveByPmky?pmky=MESG`;
                    const options = await this.$common.getSelectItem(url, this, 0, 'pmcd', 'pmva', true);
                    this.formItemList_add[0].optionList = options
                }
                this.formDatas_add = {
                    controlpoin: this.formItemList_add[0].optionList[0].value,
                    byisuse: 1
                };
                this.spinShow = false;
                this.currentIndex = type;
            },
            async setEditInitData (type) {
                if (!this.formItemList_add[0].optionList.length) {
                    let url = `${this.baseUrl}/sys/syspar/v1/retrieveByPmky?pmky=MESG`;
                    const options = await this.$common.getSelectItem(url, this, 0, 'pmcd', 'pmva', true);
                    this.formItemList_add[0].optionList = options
                }
                this.getSingleData(type)
            },
            setViewInitData (type) {
                this.getSingleData(type,1)
            },
            getSingleData (type,isView) {
                this.$http.get(`${this.baseUrl}/sys/contMessage/v1/detail/${this.currentRowData.id}`, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code=== 200) {
                        if (isView) {
                            this.formDatas_view = res.data.data;
                            this.formDatas_view.byisuse = this.formDatas_view.byisuse ? '启用' : '禁用'
                        } else {
                            let data = res.data.data;
                            let arr = this.formItemList_add[0].optionList;
                            for (let i = 0; i < arr.length; i++) {
                                if (data.controlpoin === arr[i].label) {
                                    data.controlpoin = arr[i].value;
                                    break;
                                }
                            }
                            this.formDatas_add = data;
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                })
            },
            async getFormDataAdd (obj) {
                let aaa = '';
                this.btnLoading = true;
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData('/sys/contMessage/v1/add', this, obj, 'post')
                } else if(this.currentIndex === 13){
                    aaa = await this.$common.editData('/sys/contMessage/v1/update', this, obj, 'post')
                }
                if (aaa) this.$common.currentPageData(this.baseUrl+'/sys/contMessage/v1/list', this, 'get')
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/sys/contMessage/v1/list', this, 'get')
        }
    }
</script>

<style scoped>

</style>
