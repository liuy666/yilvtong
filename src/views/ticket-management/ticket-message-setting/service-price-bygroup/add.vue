<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}分销商分组</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas"
                        :formItemList = "formItemList"
                        :rule-datas="ruleDatas_add"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormData"
                        @clearFormData="clearFormData"
                        @chooseBtnEvent = "chooseBtnEvent"
                        @focusInput="focusInput"
                ></detail-form1>
                <div>
                    <Modal v-model="isShow" :mask-closable="false" :closable="false" :width="900">
                        <p slot="header" style="color:#5db2ff;">
                            <span>选择用户</span>
                        </p>
                        <div>
                            <detail-form1
                                    :isListPage="true"
                                    :isMixed="false"
                                    :formName="formName"
                                    :formDatas="pars.formDatas"
                                    :formItemList="formItemList1"
                                    :labelWidth="100"
                                    :btn-label-width="40"
                                    @getFormData="getFormData1"
                                    @clearFormData="clearFormData1"
                            ></detail-form1>
                            <radio-table
                                    :colname="colname"
                                    :total='total'
                                    :tableData="tableData"
                                    :tableSize="'small'"
                                    :isRadio="false"
                                    :pageNum="pars.pageNum"
                                    :pageCode="pars.pageCode"
                                    :loading="loading"
                                    @selectHasChange="selectHasChange"
                                    @changePage="changePage"
                                    @changePageSize="changePageSize"
                            ></radio-table>
                        </div>
                        <div slot="footer" style="text-align:center" >
                            <Button type="primary"  @click="sureEvent">确定</Button>
                            <Button type="ghost" @click="cancelEvent">关闭</Button>
                        </div>
                    </Modal>
                </div>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            // const validateAmount = (rule, value, callback) => {
            //     const reg = /(^\d+$)|(^\d+[\.]{1}[0-9]{1,2}$)/;
            //     if (this.formDatas.commisionType) {
            //         if (!this.formDatas.percentAmount) {
            //             callback(new Error('佣金比例不能为空'))
            //         } else if (!reg.test(this.formDatas.percentAmount)) {
            //             callback(new Error('请输入不小于0的数，可保留两位小数'))
            //         } else {
            //             callback()
            //         }
            //     } else {
            //         if (!this.formDatas.fixedAmount) {
            //             callback(new Error('固定佣金不能为空'))
            //         } else if (!reg.test(this.formDatas.fixedAmount)) {
            //             callback(new Error('请输入不小于0的数，可保留两位小数'))
            //         } else {
            //             callback()
            //         }
            //     }
            // };
            return {
                spinShow: true,
                pageName: '',
                pageName1: '',
                btnLoading: false,
                id: '',
                formName: 'listForm',
                isShow: false,
                formDatas: {},
                ruleDatas_add: {
                    pmcd: [
                        { required: true, message: '价格分组不能为空', trigger: 'blur' }
                    ],
                    // commisionType: [
                    //     { required: true, validator: validateAmount, trigger: 'blur' }
                    // ]
                },
                formItemList: [
                    {
                        type: 4,
                        label: '服务商名称',
                        keyName: 'iscenicid',
                        optionList: [],
                    },
                    {
                        type: 1,
                        label: '价格分组',
                        keyName: 'pmcd',
                        // optionList: [],
                    },
                    // {
                    //     type: 13,
                    //     label: '佣金',
                    //     keyName: 'commisionType',
                    //     errMsg: '',
                    //     optionList: [
                    //         {
                    //             value: 0,
                    //             labelName: '固定佣金',
                    //             keyName: 'fixedAmount',
                    //             className: 'input-tiny',
                    //             dec: '元'
                    //         },
                    //         {
                    //             value: 1,
                    //             labelName: '按佣金比例',
                    //             keyName: 'percentAmount',
                    //             className: 'input-tiny',
                    //             dec: '%'
                    //         },
                    //     ]
                    // },
                    {
                        type: 10,
                        label: '分销商',
                        keyName: 'userIdList',
                        btnLabel: '选择',
                        noshow: false,
                    },
                    {
                        type: 21,
                        label: '',
                        keyName: '',
                        width: '50%',
                        size: 'small',
                        border: true,
                        colname: [
                            {
                                title: '编号',
                                key: 'usid',
                                align: 'center'
                            },
                            {
                                title: '分销商名称',
                                key: 'corpname',
                                align: 'center'
                            },
                            {
                                title: '操作',
                                align: 'center',
                                render: (h, params) => {
                                    return h('span', {
                                        'class': 'hover_span',
                                        on: {
                                            click: () => {
                                                this.removeRow(params.row, params.index)
                                            }
                                        }
                                    }, '删除')
                                }
                            },
                        ],
                        tableData: [],
                        noShow: true
                    },
                    {
                        type: 2,
                        label: '使用状态',
                        keyName: 'byisuse',
                        optionList: [
                            {
                                value: 0,
                                labelName: '禁止'
                            },
                            {
                                value: 1,
                                labelName: '启用'
                            }
                        ]
                    },
                ],
                formItemList1: [
                    {
                        type: 1,
                        label: '名称模糊查询',
                        keyName: 'query'
                    }
                ],
                colname: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'usid'
                    },
                    {
                        title: '分销商名称',
                        key: 'corpname'
                    },
                    {
                        title: '联系人',
                        key: 'lname'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    formDatas: {},
                    pageCode: 1,
                    pageNum: 10,
                },
                urlQuery:{},
                showTable: [],  //多选表格选中确认后下方表格数据
                usidArr: [] //多选表格选中确认后下方表格数据主键
            }
        },
        methods: {
            //多选表格选项变化返回已选项
            selectHasChange (arr) {
                let table = JSON.parse(JSON.stringify(this.tableData));
                table.map(item => {
                    this.$set(item, '_checked', false)
                });
                arr.map(item => {
                    this.$set(item, '_checked', true);
                    if (this.showTable.length > 0) {
                        if (this.usidArr.indexOf(item.usid) === -1) {
                            this.showTable.push(item);
                            this.usidArr.push(item.usid)
                        }
                    } else {
                        this.showTable.push(item);
                        this.usidArr.push(item.usid)
                    }
                    for (let obj of table) {
                        if (item.usid === obj.usid) {
                            this.$set(obj, '_checked', true)
                        }
                    }
                });
                this.tableData = table;
                this.tableData.map(item => {
                    let index = this.usidArr.indexOf(item.usid);
                    if (index > -1 && !item._checked) {
                        this.usidArr.splice(index, 1);
                        this.showTable.splice(index, 1);
                    }
                });
            },
            async getFormData1 (data) {   //对话框条件查询
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                await this.$common.currentPageData(this.baseUrl+'/ec/ec/custom/v1/queryLxsCustomInfo', this, 'get');
                this.checkIschecked();
            },
            clearFormData () {

            },
            clearFormData1 () {
                this.pars.formDatas = {}
            },
            async changePage (pageCode) {
                this.pars.pageCode = pageCode;
                await this.$common.currentPageData(this.baseUrl+'/ec/ec/custom/v1/queryLxsCustomInfo', this, 'get');
                this.checkIschecked();
            },
            async changePageSize (pageSize) {
                this.pars.pageNum = pageSize;
                await this.$common.currentPageData(this.baseUrl+'/ec/ec/custom/v1/queryLxsCustomInfo', this, 'get');
                this.checkIschecked();
            },
            setPageName () {
                if(this.$route.name.indexOf('new') != -1){
                    this.pageName = '新增';
                    this.tipName = '分销商分组新增';
                    this.setAddInitData()
                } else {
                    this.pageName = '修改';
                    this.tipName = '分销商分组修改';
                    this.setEditInitData()
                }
            },
            setAddInitData () {
                this.formDatas = {
                    byisuse: 1,
                    iscenicid: this.formItemList[0].optionList[0].value,
                    commisionType: 0,
                    configStatus: 0,  //隐含参数产品状态
                };
                this.formItemList[0]['disabled'] = false;
                this.spinShow = false
            },
            setEditInitData () {
                this.formItemList[0]['disabled'] = true;
                this.$http.get(this.baseUrl+'/ticket/jgfz/v1/queryJgfzById',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        seq: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        this.formDatas = data;
                        if (this.formDatas.commisionType) {
                            this.formDatas.percentAmount = this.formDatas.commisionNum
                        } else {
                            this.formDatas.fixedAmount = this.formDatas.commisionNum
                        }
                        let arr = JSON.parse(data.customListJson);
                        if (arr.length) {
                            arr = arr.filter(item => {
                                return item !== null
                            });
                            let arr1 = [];
                            arr.map(item => {
                                this.usidArr.push(item.usid)
                            });
                        }
                        this.$set(this.formDatas, 'userIdList', this.usidArr.join(','));
                        this.showTable = JSON.parse(data.customListJson).filter(item => {
                             return item !== null
                        });
                        if (this.showTable.length) {
                            let height = this.showTable.length * 40 + 34;
                            this.formItemList[3].noShow = false;
                            this.showTable.map(item => {
                                this.$set(item, '_checked', true);
                            });
                            this.formItemList[3].tableData = JSON.parse(JSON.stringify(this.showTable));
                            this.formItemList[3].height = height > 434 ? 434 : height;
                        }
                        this.spinShow = false
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                });
            },
            async chooseBtnEvent () {
                this.pars.formDatas = {};
                await this.$common.currentPageData(this.baseUrl+'/ec/ec/custom/v1/queryLxsCustomInfo', this, 'get');
                this.checkIschecked();
                this.isShow = true;
            },
            checkIschecked () {   //判断表格项是否之前被勾选，如果是，赋上_checked:true
                this.tableData.map(item => {
                    if (this.usidArr.length) {
                        let index = this.usidArr.indexOf(item.usid);
                        if (index > -1) {
                            this.$set(item, '_checked', true)
                        }
                    }
                });
            },
            sureEvent () {
                if (this.showTable.length) {
                    this.$set(this.formDatas, 'userIdList', this.usidArr.join(','));
                    let height = this.showTable.length * 40 + 34;
                    this.formItemList[3].noShow = false;
                    this.formItemList[3].tableData = JSON.parse(JSON.stringify(this.showTable));
                    this.formItemList[3].height = height > 434 ? 434 : height;
                    this.isShow = false
                } else {
                    this.$common.showMessageModal(this, '请至少选择一条数据', 2);
                }
            },
            cancelEvent () {
                this.isShow = false
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    query: this.pars.formDatas.query,
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                };
            },
            focusInput (val) {   //输入框聚焦改变对应的单选值
                this.formDatas.commisionType = val
            },
            removeRow (row, index) {   //分销商下方表格行数据
                this.$Modal.confirm({
                    title: `温馨提示`,
                    content: '确定删除该条记录',
                    onOk: () => {
                        this.showTable.splice(index, 1);
                        this.formItemList[3].tableData = JSON.parse(JSON.stringify(this.showTable));
                        if (!this.showTable.length) {
                            this.formItemList[3].noShow = true;
                        }
                        this.formItemList[3].height -= 40;
                        this.usidArr.splice(index, 1);
                        this.$set(this.formDatas, 'userIdList', this.usidArr.join(','));
                        setTimeout(() => {  //不设置延迟或延迟时间太短 ，执行onOK时第二个对话框的确定按钮也会被点击
                            this.$common.showMessageModal(this, '删除成功', 3)
                        }, 300);
                    }
                });
            },
            // //佣金验证
            // formValidation (obj) {   //表单中自定义组件的验证
            //     const reg = /^\d*$/;
            //     if (obj.commisionType) {
            //         if (!obj.percentAmount) {
            //             this.formItemList[2].errMsg = '请输入佣金比例';
            //             return 0
            //         } else if (!reg.test(obj.percentAmount)) {
            //             this.formItemList[2].errMsg = '请输入大于0的佣金比例';
            //             return 0
            //         } else {
            //             this.formItemList[2].errMsg = '';
            //             return 1
            //         }
            //     } else {
            //         if (!obj.fixedAmount) {
            //             this.formItemList[2].errMsg = '请输入佣金值';
            //             return 0
            //         } else if (!reg.test(obj.fixedAmount)) {
            //             this.formItemList[2].errMsg = '请输入大于0的佣金值';
            //             return 0
            //         } else {
            //             this.formItemList[2].errMsg = '';
            //             return 1
            //         }
            //
            //     }
            // },
            getFormData (obj) {
                this.btnLoading = true;
                // if (!this.formValidation(obj)) return;
                obj = JSON.parse(JSON.stringify(obj));
                obj.commisionNum = obj.fixedAmount ? obj.fixedAmount : obj.percentAmount;
                obj.usid = obj.iscenicid;
                delete obj.fixedAmount;
                delete obj.percentAmount;
                if(this.pageName === '新增'){
                    this.$common.addNewData('/ticket/jgfz/v1/saveJgfz?strutsAction=1', this, obj, 'post', true)
                } else if(this.pageName === '修改'){
                    obj['seq'] = this.$route.params.id;
                    this.$common.editData('/ticket/jgfz/v1/saveJgfz?strutsAction=2', this, obj, 'post', true)
                }
            },
        },
        async created () {
            const options = await this.$common.getScenicList(this, 0);
            this.formItemList[0].optionList = options;
            // const option1 = await this.$common.getSelectItem(this.baseUrl+'/sys/syspar/v1/findJSFZSelect',this, 1, 'pmcd', 'pmva', true);
            // this.formItemList[1].optionList = option1;
            this.setPageName();
        },
        watch: {
            '$route' () {
                this.spinShow = true;
                this.setPageName()
            },
            'formDatas.commisionType' (val) {   //监听佣金类型变化清空输入框的值
                if (val) {
                    this.$set(this.formDatas, 'fixedAmount', '');
                } else {
                    this.$set(this.formDatas, 'percentAmount', '');
                }
            }
        }
    }
</script>

<style scoped>

</style>
