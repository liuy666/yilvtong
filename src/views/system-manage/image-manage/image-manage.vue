<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">首页风景图管理</span>
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
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增图片信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改图片信息</span>
                </p>
                <detail-form1
                        ref = "image"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "120"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFile = "getFile"
                        @removeImage = "removeImage"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看图片信息</span>
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
                formItemList: [
                    {
                        type: 4,
                        label: '所属企业',
                        keyName: 'companyInfoId',
                        labelWidth: 80,
                        optionList: []
                    }
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'seq',
                        width: 80
                    },
                    {
                        title: '所属企业',
                        key: 'szcompanyname'
                    },
                    {
                        title: '描述',
                        width: 500,
                        render: (h, params) => {
                            return h('div', {
                                domProps: {
                                    innerHTML: params.row.logoMark
                                }
                            },)
                        }
                    },
                    {
                        title: '图片',
                        key: 'logoPic'
                    }
                ],
                tableData:[],
                pars: {
                    formDatas: {},
                    pageNum: 10,
                    pageCode: 1,
                    type: 1
                },
                urlQuery: {},
                formDatas_add: {},
                ruleDatas: {
                    domainUrl: [
                        { required: true, message: '域名名称不能为空', trigger: 'blur' }
                    ],
                },
                formItemList_add: [
                    {
                        type: 4,
                        label: '企业',
                        keyName: 'icompanyinfoid',
                        disabled: false,
                        optionList: []
                    },
                    {
                        type: 6,
                        label: '描述',
                        keyName: 'logoMark',
                        defaultMsg: '',
                        config: {
                            initialFrameWidth: '80%',
                            initialFrameHeight: 350,
                            zIndex: 1
                        },
                        ueId: 'UE'
                    },
                    {
                        type: 5,
                        label: '图片上传',
                        keyName: 'logoPic',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        hasDec: '*注：风景图轮播需要新增5次，每次按指定顺序上传1张图片，尺寸大小为416x520、448x560、480x600、448x560、416x520（同等比例下的大尺寸图片也可以）',
                        isRedDec: true
                    },
                ],
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '图片编号',
                        keyName: 'seq'
                    },
                    {
                        label: '对应企业',
                        keyName: 'szcompanyname'
                    },
                    {
                        label: '描述',
                        keyName: 'logoMark',
                        html: true
                    },
                    {
                        label: '图片展示',
                        keyName: 'logoPic',
                        showElement: true,
                        showImage: true
                    },
                ]
            }
        },
        methods: {
            //点击新增修改查看按钮跳到对应页面
            async changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '图片新增';
                    await this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '图片修改';
                    await this.setEditInitData(type)
                } else if (type === 14) {
                    await this.setViewInitData(type)
                }
            },
            //选中某一行
            selected (row) {
                this.currentRowData["id"] = row.seq;
                this.currentRowData["name"] = 'seq';
                this.btnList[3].url = `${this.baseUrl}/ec/resourceManager/v1/delResourceManager?seq=${row.seq}`
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
                this.$common.currentPageData(this.baseUrl + '/ec/resourceManager/v1/showListResourceManagerTab', this, 'get')
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
                this.$common.currentPageData(this.baseUrl + '/ec/resourceManager/v1/showListResourceManagerTab', this, 'get')
            },
            getFormData (data) {
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl + '/ec/resourceManager/v1/showListResourceManagerTab', this, 'get')
            },
            clearFormData(){
                this.pars.formDatas = {}
            },
            //删除后更新数据
            refreshData () {
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl + '/ec/resourceManager/v1/showListResourceManagerTab', this, 'get')
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
                    companyInfoId: this.pars.formDatas.companyInfoId,
                }
            },
            //新增页面初始化
            async setAddInitData (type) {
                // if (this.formItemList_add[0].optionList.length === 0) {
                //     await this.getCompanySelectItem()
                // }
                this.formItemList_add[0].disabled = false;
                this.$refs.image.$refs.UE[0].setUEContent('');
                this.formDatas_add = {
                    icompanyinfoid: this.formItemList_add[0].optionList[0].value,
                    logoMark: '',
                    logoPic: '',
                    type: 1
                };
                this.spinShow = false;
                this.currentIndex = type
            },
            //修改页面初始化
            async setEditInitData (type) {
                // if (this.formItemList_add[0].optionList.length === 0) {
                //     await this.getCompanySelectItem()
                // }
                this.formItemList_add[0].disabled = true;
                this.getSingleData(type)
            },
            //查看页面初始化
            setViewInitData (type) {
                this.getSingleData(type,true)
            },
            //获取单条数据详细信息
            async getSingleData (type,isView) {
                this.$http(`${this.baseUrl}/ec/resourceManager/v1/viewResourceManagerTab`, {
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
                            this.formDatas_add.icompanyinfoid = parseInt(this.formDatas_add.icompanyinfoid);
                            this.$refs.image.$refs.UE[0].setUEContent(this.formDatas_add.logoMark || '')
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
                const arr = await this.$common.getSelectItem(url, this, 0, 'icompanyinfoid', 'szcompanyname', true);
                this.formItemList[0].optionList = arr;
                this.formItemList_add[0].optionList = arr;
            },
            //获取上传图片信息
            getFile (file) {
                this.formDatas_add.logoPic = file.url;
            },
            //移除图片
            removeImage (keyName) {
                this.formDatas_add[keyName] = ''
            },
            //新增修改保存
            async getFormDataAdd (obj) {
                this.btnLoading = true;
                let aaa = '';
                this.formDatas_add.logoMark = this.$refs.image.$refs.UE[0].getUEContent();
                if (this.currentIndex === 12) {
                    aaa = await this.$common.addNewData('/ec/resourceManager/v1/addResourceManager', this, obj, 'post')
                } else if (this.currentIndex === 13) {
                    aaa = await this.$common.editData('/ec/resourceManager/v1/updateResourceManager', this, obj, 'put')
                }
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl + '/ec/resourceManager/v1/showListResourceManagerTab', this, 'get')
                }
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        async created () {
            await this.getCompanySelectItem();
            this.$common.currentPageData(this.baseUrl + '/ec/resourceManager/v1/showListResourceManagerTab', this, 'get')
        }
    }
</script>

<style scoped>

</style>
