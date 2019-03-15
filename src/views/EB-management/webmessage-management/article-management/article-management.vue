<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">栏目文章管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @refreshData = "refreshData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :label-width="80"
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
                    <span v-if="currentIndex === 12" class="title_span">新增文章信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改文章信息</span>
                </p>
                <detail-form1
                        ref = "article"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "160"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFile="getFile"
                        @getFile1="getFile1"
                        @removeImage = "removeImage"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看文章信息</span>
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
            const validateAmnote = (rule, value, callback) => {
                let val = this.$refs.article.$refs.UE[0].getUEContent();
                if (!val) {
                    callback(new Error('内容不能为空'))
                }  else {
                    callback();
                }
            };
            const validateAmtopics = (rule, value, callback) => {
                if (!this.formDatas_add.amtopics) {
                    this.$common.showMessageModal(this, '请上传文章缩略图', 2)
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
                    },
                ],
                currentRowData: {},
                formItemList:[
                    {
                        type: 4,
                        label: '所属企业',
                        keyName: 'companyInfoId',
                        labelWidth: 80,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '所属栏目',
                        keyName: 'cmid',
                        labelWidth: 80,
                        optionList: []
                    }
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'amid',
                        width: 100,
                    },
                    {
                        title: '文章主标题',
                        width: 380,
                        render: (h, params) => {
                            const obj = {
                                cmid: params.row.cmid,
                                amid: params.row.amid,
                                type: 'article'
                            };
                            return h('span', {}, [
                                h('span', {
                                    style: {
                                        marginRight: '10px'
                                    }
                                }, params.row.amtopicf),
                                h('a', {
                                    'class': 'hover_span',
                                    attrs: {
                                       href: `http://${window.location.hostname}/#/links?obj=${JSON.stringify(obj)}`,    //跳转前台电商相关文章页面
                                       target: '_blank'
                                    },
                                }, '浏览')
                            ])
                        },
                    },
                    {
                        title: '文章缩略图',
                        key: 'amtopics',
                        width: 400,
                    },
                    {
                        title: '栏目',
                        key: 'cmzhtopic',
                        width: 110
                    },
                    {
                        title: '是否启用',
                        width: 90,
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '是' : '否')
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'dtmakedate',
                        width: 222
                    },
                    {
                        title: '企业域名',
                        key: 'domainurl',
                        width: 242
                    },
                ],
                tableData:[],
                pars:{
                    formDatas:{
                        cmid: '',
                        companyInfoId: ''
                    },
                    pageNum:10,
                    pageCode:1,
                    serverUrl: window.location.hostname
                },
                urlQuery:{},
                //----------新增修改
                formDatas_add: {},
                ruleDatas: {
                    amtopicf: [
                        { required: true, message: '文章主标题不能为空', trigger: 'blur' }
                    ],
                    amtopics: [
                        { required: true, validator: validateAmtopics, trigger: 'change' }
                    ],
                    amnote: [
                        { required: true, validator: validateAmnote, trigger: 'blur' }
                    ],
                },
                formItemList_add: [
                    {
                        type: 1,
                        label: '文章主标题',
                        keyName: 'amtopicf',
                        className: 'input-middle'
                    },
                    {
                        type: 5,
                        label: '文章缩略图',
                        keyName: 'amtopics',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
                        hasDec: '推荐图片尺寸1440px * 1198px',
                        isRedDec: true,
                    },
                    {
                        type: 4,
                        label: '栏目',
                        keyName:'cmid',
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '景区企业',
                        keyName:'groupid',
                        optionList: []
                    },
                    {
                        type: 7,
                        label: '描述',
                        keyName:'amdesc',
                    },
                    {
                        type : 6,
                        label : '内容',
                        keyName : 'amnote',
                        defaultMsg: '',
                        config : {
                            toolbars: [
                                [
                                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                                    'emotion', 'insertvideo', 'music', 'map', 'gmap', 'insertframe','insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
                                    'print', 'preview', 'searchreplace', 'help'
                                ]
                            ],
                            autoHeightEnabled: false,//自动高度
                            allowDivTransToP: false,
                            autoFloatEnabled: false,// //是否保持toolbar的位置不动
                            maximumWords: 100000,//最大字数
                            initialFrameWidth: '80%',
                            initialFrameHeight: 400,
                            zIndex : 1
                        },
                        ueId : 'UE'
                    },
                    {
                        type: 26,
                        label: '内容图片',
                        keyName: 'picture',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        },
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
                        label: '编号',
                        keyName: 'amid'
                    },
                    {
                        label: '文章主标题',
                        keyName: 'amtopicf'
                    },
                    {
                        label: '文章副标题',
                        keyName: 'amtopics'
                    },
                    {
                        label: '栏目',
                        keyName: 'cmzhtopic'
                    },
                    {
                        label: '描述',
                        keyName: 'amdesc'
                    },
                    {
                        label: '内容',
                        keyName: 'amnote',
                        html: true
                    },
                    {
                        label: '使用状态',
                        keyName: 'byisuse'
                    },
                    {
                        label: '创建时间',
                        keyName: 'dtmakedate'
                    },
                ]
            }
        },
        methods: {
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '文章新增';
                    this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '文章修改';
                    this.setEditInitData(type)
                } else if (type === 14) {
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.amid;
                this.currentRowData["name"] = 'amid';
                this.btnList[3].url = `${this.baseUrl}/ec/articleManager/v1/delete/${row.amid}`;
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
                this.$common.currentPageData(this.baseUrl+'/ec/articleManager/v1/list', this, 'get');
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
                this.$common.currentPageData(this.baseUrl+'/ec/articleManager/v1/list', this, 'get');
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ec/articleManager/v1/list', this, 'get');
            },
            clearFormData(){
                this.pars.formDatas = {
                    cmid: this.$route.params.id || undefined,
                    companyInfoId: ''
                }
            },
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ec/articleManager/v1/list', this, 'get');
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    cmid: this.pars.formDatas.cmid,
                    serverUrl: this.pars.serverUrl,
                    companyInfoId: this.pars.formDatas.companyInfoId,
                };
            },
            //获取上传图片信息
            getFile (file) {
                this.formDatas_add.amtopics = file.url;
            },
            //插入图片到编辑器中
            getFile1 (file) {
                const img = `<img src=${file.url} style="max-width: 1024px">`;
                let content = this.$refs.article.$refs.UE[0].getUEContent();
                content += img;
                this.$refs.article.$refs.UE[0].setUEContent(content)
            },
            //移除图片
            removeImage (keyName) {
                this.formDatas_add[keyName] = ''
            },
            async setAddInitData (type) {
                // if (!this.formItemList_add[3].optionList.length) {
                //     const url = `${this.baseUrl}/sys/company/v1/getScenicCompanyInfoList`;
                //     const options = await this.$common.getSelectItem(url, this, 3, 'icompanyinfoid', 'szcompanyname', true);
                //     this.formItemList_add[3].optionList = options
                // }
                this.$refs.article.$refs.UE[0].setUEContent('');
                this.formDatas_add = {
                    cmid: this.formItemList_add[2].optionList[0].value,
                    groupid: this.formItemList_add[3].optionList[0].value,
                    byisuse: 1,
                    amtopics: '',
                    amnote: '',
                };
                this.spinShow = false;
                this.currentIndex = type
            },
            async setEditInitData(type) {
                // if (!this.formItemList_add[3].optionList.length) {
                //     const url = `${this.baseUrl}/sys/company/v1/getScenicCompanyInfoList`;
                //     const options = await this.$common.getSelectItem(url, this, 3, 'icompanyinfoid', 'szcompanyname', true);
                //     this.formItemList_add[3].optionList = options
                // }
                this.getSingleData(type)
            },
            async setViewInitData(type) {
                this.getSingleData(type, 1)
            },
            getSingleData (type, isView) {
                this.$http.get(`${this.baseUrl}/ec/articleManager/v1/detail/${this.currentRowData.id}`, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        if (isView) {
                            data.byisuse = data.byisuse ? '启用' : '禁用';
                            this.formDatas_view = data;
                        } else {
                            data.groupid = data.groupid ?  parseInt(data.groupid) : this.formItemList_add[3].optionList[0].value;
                            this.formDatas_add = data;
                            this.$refs.article.$refs.UE[0].setUEContent(data.amnote || '')
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
                this.formDatas_add.amnote = this.$refs.article.$refs.UE[0].getUEContent();
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData(`/ec/articleManager/v1/add`, this, obj, 'post')
                } else if(this.currentIndex === 13){
                    aaa = await this.$common.editData(`/ec/articleManager/v1/update`, this, obj, 'post')
                }
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ec/articleManager/v1/list', this, 'get')
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        async created () {
            const url = `${this.baseUrl}/sys/company/v1/getScenicCompanyInfoList`;
            const arr = await this.$common.getSelectItem(url, this, 3, 'icompanyinfoid', 'szcompanyname', true);
            this.formItemList[0].optionList = arr;
            this.formItemList_add[3].optionList = arr;
            const options = await this.$common.getSelectItem(this.baseUrl+'/ec/columnManager/v1/select', this, 0, 'cmid', 'cmzhtopic', true);  //获取栏目下拉列表
            this.formItemList[1].optionList = options;
            this.formItemList_add[2].optionList = options;
            this.pars.formDatas.cmid = this.$route.params.id ? parseInt(this.$route.params.id) : undefined;
            this.$common.currentPageData(this.baseUrl+'/ec/articleManager/v1/list', this, 'get')
        }
    }
</script>

<style>
    #UE .edui-editor-toolbarbox{
        line-height: 0
    }
</style>
