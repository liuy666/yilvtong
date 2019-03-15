<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">域名管理</span>
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
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增域名信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改域名信息</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "120"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFile="getFile"
                        @getFile99="getFile99"
                        @removeImage="removeImage"
                        @getFormData="getFormDataAdd"
                        @closeCurrentPage="closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看域名信息</span>
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
                        url: '',
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    }
                ],
                currentRowData: {},
                colname: [
                    {
                        title: '编号',
                        key: 'seq',
                        width: 80
                    },
                    {
                        title: '域名',
                        key: 'domainUrl',
                        width: 382
                    },
                    {
                        title: '描述',
                        key: 'logoMark',
                        width: 700
                    },
                    {
                        title: '企业',
                        key: 'szcompanyname',
                        width: 382
                    }
                ],
                tableData:[],
                pars: {
                    pageNum: 10,
                    pageCode: 1,
                    type: 1,
                    category: '00'
                },
                urlQuery: {},
                formDatas_add: {},
                ruleDatas: {
                    domainUrl: [
                        { required: true, message: '域名名称不能为空', trigger: 'blur' }
                    ],
                    // logoMark: [
                    //     { required: true, message: '描述不能为空', trigger: 'blur' }
                    // ],
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: '域名名称',
                        keyName: 'domainUrl'
                    },
                    {
                        type: 4,
                        label: '企业',
                        keyName: 'groupId',
                        disabled: false,
                        optionList: []
                    },
                    {
                        type: 7,
                        label: '描述',
                        keyName: 'logoMark',
                    },
                    {
                        type: 5,
                        label: '网站logo',
                        keyName: 'logoPic',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        hasDec: '推荐图片尺寸262px * 32px',
                        isRedDec: true
                    },
                    {
                        type: 5,
                        label: '登录logo',
                        keyName: 'loginLogo',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        showTwoUpload: true,
                        hasDec: '推荐图片尺寸262px * 32px',
                        isRedDec: true
                    },
                ],
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '域名编号',
                        keyName: 'seq'
                    },
                    {
                        label: '域名名称',
                        keyName: 'domainUrl'
                    },
                    {
                        label: '对应企业',
                        keyName: 'szcompanyname'
                    },
                    {
                        label: '状态',
                        keyName: 'type'
                    }
                ]
            }
        },
        methods: {
            //点击新增修改查看按钮跳到对应页面
            async changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '域名新增';
                    await this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '域名修改';
                    await this.setEditInitData(type)
                } else if (type === 14) {
                    await this.setViewInitData(type)
                }
            },
            //选中某一行
            selected (row) {
                this.currentRowData["id"] = row.seq;
                this.currentRowData["name"] = 'seq';
                this.btnList[3].url = `${this.baseUrl}/ec/domain/v1/delDomain?seq=${row.seq}`
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
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl + '/ec/domain/v1/showListDomain', this, 'get')
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
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl + '/ec/domain/v1/showListDomain', this, 'get')
            },
            //删除后更新数据
            refreshData () {
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl + '/ec/domain/v1/showListDomain', this, 'get')
            },
            //执行删除时如当页只有一条数据
            isSingle (page) {
                this.single = page
            },
            //需要拼接的url后面的参数
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    type: this.pars.type,
                    category: this.pars.category
                }
            },
            //新增页面初始化
            async setAddInitData (type) {
                if (this.formItemList_add[1].optionList.length === 0) {
                    await this.getCompanySelectItem()
                }
                this.formItemList_add[1].disabled = false;
                this.formDatas_add = {
                    groupId: this.formItemList_add[1].optionList[0].value,
                    logoPic: '',
                    loginLogo: '',
                    type: 1,
                    category: '00'
                };
                this.spinShow = false;
                this.currentIndex = type
            },
            //修改页面初始化
            async setEditInitData (type) {
                if (this.formItemList_add[1].optionList.length === 0) {
                    await this.getCompanySelectItem()
                }
                this.formItemList_add[1].disabled = true;
                this.getSingleData(type)
            },
            //查看页面初始化
            setViewInitData (type) {
                this.getSingleData(type,true)
            },
            //获取单条数据详细信息
            async getSingleData (type,isView) {
                this.$http(`${this.baseUrl}/ec/domain/v1/viewDomain`, {
                    params: {
                        access_token: this.Cookies.get('token'),
                        seq: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        if (isView) {
                            this.formDatas_view = res.data.data;
                        } else {
                            this.formDatas_add = res.data.data;
                            this.formDatas_add.groupId = parseInt(this.formDatas_add.groupId);
                            this.$set(this.formDatas_add, 'category', '00')
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                });
            },
            //获取企业下拉列表
            async getCompanySelectItem () {
                let url = `${this.baseUrl}/sys/company/v1/getAllGalCompanyInfo`;
                const arr = await this.$common.getSelectItem(url, this, 1, 'icompanyinfoid', 'szcompanyname', true);
                this.formItemList_add[1].optionList = arr;
            },
            //获取上传图片信息
            getFile (file) {
                this.formDatas_add.logoPic = file.url
            },
            getFile99 (file) {
                this.formDatas_add.loginLogo = file.url
            },
            //移除图片
            removeImage (keyName) {
                this.formDatas_add[keyName] = ''
            },
            //新增修改保存
            async getFormDataAdd (obj) {
                this.btnLoading = true;
                let aaa = '';
                if (this.currentIndex === 12) {
                    aaa = await this.$common.addNewData('/ec/domain/v1/insertDomain', this, obj, 'post')
                } else if (this.currentIndex === 13) {
                    aaa = await this.$common.editData('/ec/domain/v1/updateDomain', this, obj, 'post')
                }
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl + '/ec/domain/v1/showListDomain', this, 'get')
                }
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl + '/ec/domain/v1/showListDomain', this, 'get')
        }
    }
</script>

<style scoped>

</style>
