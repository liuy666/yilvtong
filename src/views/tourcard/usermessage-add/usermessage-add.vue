<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">身份信息附加</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                            @operate="operate"
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
                        :total="total"
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
                    <span v-if="currentIndex === 12" class="title_span">新增身份信息附加</span>
                    <span v-if="currentIndex === 13" class="title_span">修改身份信息附加</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "100"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 99">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">导入身份信息附加</span>
                </p>
                <detail-form1
                        ref="excel"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_import"
                        :labelWidth = "120"
                        :ruleDatas = "ruleDatas_import"
                        :formItemList = "formItemList_import"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @handleBeforeUpload="handleBeforeUpload"
                        @getFormData = "getFormDataImport"
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
            const validateIDcard = (rule, value, callback) => {
                const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!value) {
                    let str = '身份证不能为空';
                    callback(new Error(str))
                } else if (!reg.test(value)) {
                    callback(new Error('身份证格式不正确'))
                } else {
                    callback();
                }
            };
            return{
                searchCount: 1,   //进页面的第一次请求
                currentIndex: 1,
                isClose: false,
                tipName: '',
                spinShow: true,
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
                        type: 99,
                        btnlabel: '导入',
                    },
                    {
                        type: 11,
                        btnlabel: '返回上级',
                        icon: 'reply'
                    }
                ],
                currentRowData:{},
                formItemList:[
                    {
                        type: 1,
                        label: '身份证号码',
                        keyName:'identityNum',
                        labelWidth: 90
                    },
                    {
                        type: 1,
                        label: '姓名',
                        keyName:'name',
                        labelWidth: 50
                    },
                ],
                colname:[
                    {
                        title: '编号',
                        key: 'id',
                    },
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '身份证号码',
                        key: 'identityNum'
                    }
                ],
                tableData: [],
                total: 0,
                loading: false,
                single: 0,
                btnLoading: false,
                pars: {
                    formDatas:{
                        cardCode: this.$route.params.id
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery: {},
                formDatas1: {},
                ruleDatas: {
                    identityNum: [
                        {  required: true, validator: validateIDcard, trigger: 'blur' }
                    ],
                    name: [
                        {  required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                },
                formItemList1: [
                    {
                        type: 1,
                        label: '身份证号',
                        keyName:'identityNum',
                    },
                    {
                        type: 1,
                        label: '姓名',
                        keyName:'name',
                    }
                ],
                //-------------导入
                file: null,
                formDatas_import: {
                    excel: ''
                },
                ruleDatas_import: {
                    excel: [
                        {  required: true, message: '请上传excel相关文件', trigger: 'change' }
                    ]
                },
                formItemList_import: [
                    {
                        type: 27,
                        label: '导入excel文件',
                        keyName: 'excel',
                        btnLabel: '选择文件',
                        action: `${this.baseUrl}/tourcard/passPeople/v1/importExcel`,
                        data: {
                            access_token: this.Cookies.get('token'),
                            cardCode: this.$route.params.id
                        }
                    }
                ]
            }
        },
        methods:{
            //点击新增修改查看按钮跳到对应页面
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '身份信息附加新增';
                    this.setAddInitData(type);
                } else if (type === 13) {
                    this.tipName = '身份信息附加修改';
                    this.setEditInitData(type);
                } else if (type === 99) {
                    this.tipName = '身份信息附加导入';
                    this.setImportInitData(type);
                }
            },
            selected(row){
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'id';
                this.btnList[3].url = `${this.baseUrl}/tourcard/passPeople/v1/delete/${row.id}`
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
                this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this);
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
                this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this)
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.$set(this.pars.formDatas, 'cardCode', this.$route.params.id);
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this)
            },
            clearFormData(){
                this.pars.formDatas = {
                    cardCode: this.$route.params.id
                }
            },
            //删除后更新数据
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this)
            },
            //执行删除时如当页只有一条数据
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                };
            },
            //返回上一级
            operate (type) {
                if (type === 11) {
                    const routeName = this.$route.name;
                    let pageOpenedList = this.$store.state.app.pageOpenedList;
                    for (let i = 0; i < pageOpenedList.length; i++) {
                        if (pageOpenedList[i].name === routeName) {
                            this.$store.commit('removeTag', routeName);
                            this.$store.commit('closePage', routeName);
                            pageOpenedList = this.$store.state.app.pageOpenedList;
                            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                            this.$router.go(-1);
                            break
                        }
                    }
                }
            },
            setAddInitData (type) {
                this.formDatas1 = {
                    cardCode: this.$route.params.id
                };
                this.spinShow = false;
                this.currentIndex = type;
            },
            setEditInitData (type) {
                this.$http.get(this.baseUrl+'/tourcard/passPeople/v1/get/'+ this.currentRowData.id, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        this.formDatas1 = res.data.data;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            setImportInitData (type) {
                this.spinShow = false;
                this.currentIndex = type
            },
            //新增修改保存
            async getFormDataAdd (obj) {
                let aaa = '';
                this.btnLoading = true;
                if (this.currentIndex === 12) {
                    aaa = await this.$common.addNewData('/tourcard/passPeople/v1/save', this, obj)
                } else if (this.currentIndex === 13) {
                    aaa = await this.$common.editData('/tourcard/passPeople/v1/update', this, obj, 'put')
                }
                if (aaa) {
                    this.currentRowData = {};
                    this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this)
                }
            },
            async handleBeforeUpload (file) {
                this.file = file;
                this.formDatas_import.excel = file.name
            },
            async getFormDataImport () {
                let format = ['xls','xlsx'];
                let arr = this.file.name.split('.');
                if (format.indexOf(arr[arr.length-1]) === -1) {
                    this.$common.showMessageModal(this, '请上传xls、xlsx相关的excel文件', 2);
                    return 0
                }
                this.btnLoading = true;
                let aaa = '';
                let param = new FormData();   // 创建form对象
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                param.append('excelFile ', this.file, this.file.name);   // 通过append向form对象添加数据
                let query = `?cardCode=${this.$route.params.id}`;
                aaa = await this.$common.editData(`/tourcard/passPeople/v1/importExcel${query}`, this, param, 'post', true);
                if (aaa) this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this)
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created(){
            this.$common.currentPageData(this.baseUrl+'/tourcard/passPeople/v1/list', this)
        }
    }
</script>

<style scoped>

</style>
