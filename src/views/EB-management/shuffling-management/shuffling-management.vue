<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">首页轮播图管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
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
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增banner广告图</span>
                    <span v-if="currentIndex === 13" class="title_span">修改banner广告图</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "140"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFile = "getFile"
                        @removeImage = "removeImage"
                        @selectedChange="selectedChange"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看banner广告图</span>
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
            const validateUrl = (rule, value, callback) => {
                if (!this.formDatas_add.url) {
                    this.$common.showMessageModal(this, '请上传图片', 2)
                } else {
                    callback();
                }
            };
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
                labelWidth: 80,
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
                formItemList: [
                    {
                        type: 4,
                        label: '选择类型',
                        keyName: 'providerType',
                        optionList: [
                            {
                                value: '01',
                                label: '景区'
                            },
                            // {
                            //     value: '06',
                            //     label: '酒店'
                            // }
                        ]
                    }
                ],
                colname: [
                    {
                        title: 'banner标题',
                        key: 'title',
                    },
                    {
                        title: '类型',
                        render: (h, params) => {
                            return h('span', params.row.providerType === '01' ? '景区' : '酒店')
                        }
                    },
                    {
                        title: '服务商',
                        key: 'providerName',
                    },
                    {
                        title: '图片',
                        render: (h, params) => {
                            return h('img', {
                                attrs: {
                                    src: params.row.url,
                                    style: 'width:187px; height: 110px;margin:3px auto;display:block'
                                }
                            })
                        }
                    },
                ],
                tableData:[],
                pars:{
                    formDatas:{
                        providerType : '01'
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                formDatas_add: {},
                ruleDatas: {
                    title: [
                        { required: true, message: 'banner标题不能为空', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, validator: validateUrl, trigger: 'change' }
                    ]
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: 'banner标题',
                        keyName: 'title'
                    },
                    {
                        type: 4,
                        label: '所属类型',
                        keyName:'providerType',
                        disabled: false,
                        selectEvent: true,
                        optionList: [
                            {
                                value: '01',
                                label: '景区'
                            },
                            // {
                            //     value: '06',
                            //     label: '酒店'
                            // }
                        ]
                    },
                    {
                        type: 4,
                        label: '服务商',
                        keyName:'providerId',
                        disabled: false,
                        optionList: []
                    },
                    {
                        type: 5,
                        label: '展示图片',
                        keyName:'url',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        hasDec: '推荐图片尺寸750px * 400px',
                        isRedDec: true
                    },
                ],
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: 'banner标题',
                        keyName: 'title'
                    },
                    {
                        label: '所属类型',
                        keyName: 'providerType'
                    },
                    {
                        label: '服务商',
                        keyName:'providerName'
                    },
                    {
                        label: '展示图片',
                        keyName: 'url',
                        showElement: true,
                        showImage: true
                    },
                ],
            }
        },
        methods:{
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = 'banner广告图新增';
                    this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = 'banner广告图修改';
                    this.setEditInitData(type)
                } else if (type === 14) {
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'id';
                this.currentRowData['type'] = row.providerType;
                this.btnList[3].url = `${this.baseUrl}/ticket/banner/v1/delete/${row.id}`;
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
                this.$common.currentPageData(this.baseUrl+'/ticket/banner/v1/list', this, 'get');
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
                this.$common.currentPageData(this.baseUrl+'/ticket/banner/v1/list', this, 'get');
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/banner/v1/list', this, 'get');
            },
            clearFormData(){
                this.pars.formDatas = {
                    providerType : '01'
                }
            },
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/banner/v1/list', this, 'get');
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    providerType: this.pars.formDatas.providerType
                };
            },
            //获取上传图片信息
            getFile (file) {
                this.formDatas_add.url = file.url;
            },
            //移除图片
            removeImage (keyName) {
                this.formDatas_add[keyName] = ''
            },
            async setAddInitData (type) {
                this.formItemList_add[1].disabled = false;
                this.formItemList_add[2].disabled = false;
                await this.selectedChange('01');
                this.formDatas_add = {
                    providerType: '01',
                    providerId: this.formItemList_add[2].optionList[0].value,
                    url: ''
                };
                this.spinShow = false;
                this.currentIndex = type;
            },
            async setEditInitData (type) {
                this.formItemList_add[1].disabled = true;
                this.formItemList_add[2].disabled = true;
                await this.selectedChange(this.currentRowData.type);
                await this.getSingleData(type);
                this.currentIndex = type;
            },
            setViewInitData (type) {
                this.getSingleData(type, 1)
            },
            getSingleData (type,isView) {
                this.$http.get(`${this.baseUrl}/ticket/banner/v1/detail/${this.currentRowData.id}`, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        if (isView) {
                            let data = res.data.data;
                            data.providerType = data.providerType === '01' ? '景区' : '酒店';
                            this.formDatas_view = res.data.data;
                        } else {
                            this.formDatas_add = res.data.data;
                        }
                    } else {
                        this.$common.showMessageModal(this, res ,1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            async selectedChange (val) {
                let options = [];
                if (val === '01') {
                    options = await this.$common.getScenicList(this, 2);
                } else if (val === '06') {
                    options = await this.$common.getHotel(this, 2);
                }
                this.formItemList_add[2].optionList = options;
                this.formDatas_add.providerId = options.length ? options[0].value : ''
            },
            async getFormDataAdd (obj) {
                let aaa = '';
                this.btnLoading = true;
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData('/ticket/banner/v1/add', this, obj, 'post')
                } else if(this.currentIndex === 13){
                    aaa = await this.$common.editData('/ticket/banner/v1/update', this, obj, 'post')
                }
                this.$common.currentPageData(this.baseUrl+'/ticket/banner/v1/list', this, 'get');
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/ticket/banner/v1/list', this, 'get');
        },
    }
</script>

<style scoped>

</style>
