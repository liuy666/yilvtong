<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">退票规则管理</span>
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
                    <span v-if="currentIndex === 12" class="title_span">新增退订规则信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改退订规则信息</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "160"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
                        @selectedChange = "selectedChange"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card  v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看退票规则信息</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :labelWidth="140"
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
            const reg = /^(0\.[0-9]{0,2}|0|1|1\.[0]{0,2})$/;
            const validateTdfl = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('退票费率不能为空'))
                } else if (!reg.test(value)) {
                    callback(new Error('退票费率不能大于1或者小于0,可保留两位小数'))
                } else {
                    callback();
                }
            };
            // const validateChangebackrate = (rule, value, callback) => {
            //     if (this.formDatas1.jsfs === '0003') {
            //         this.formDatas1.changebackrate.map((item,index) => {
            //             if (!item.tdfl) {
            //                 callback(new Error('退票费率不能为空'))
            //             } else if (!reg.test(item.tdfl)) {
            //                 callback(new Error('过期票退票费率不能大于1或者小于0,可保留两位小数'))
            //             } else if (index === this.formDatas1.changebackrate.length - 1) {
            //                 callback()
            //             }
            //         })
            //     } else {
            //         const regTime = /^[1-9]\d*$/;
            //         this.formDatas1.changebackrate.map((item,index) => {
            //             if (!item.time) {
            //                 callback(new Error('时间不能为空'))
            //             } else if (!regTime.test(item.time)) {
            //                 callback(new Error('请输入正整数'))
            //             } else if (!item.tdfl) {
            //                 callback(new Error('退票费率不能为空'))
            //             } else if (!reg.test(item.tdfl)) {
            //                 callback(new Error('过期票退票费率不能大于1或者小于0,可保留两位小数'))
            //             } else if (index === this.formDatas1.changebackrate.length - 1) {
            //                 callback()
            //             }
            //         })
            //     }
            // };
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
                labelWidth: 10,
                formItemList: [
                    {
                        type: 4,
                        keyName: 'iscenicid',
                        label: '所属服务商',
                        labelWidth: 90,
                        optionList: []
                    }
                ],
                colname: [
                    {
                        title: '退票规则名称',
                        key: 'gzname'
                    },
                    {
                        title: '服务商名称',
                        key: 'szscenicname'
                    },
                    {
                        title: '产品名称',
                        key: 'sztickettypename'
                    },
                    {
                        title: '出票前后',
                        render: (h, params) => {
                            return h('span',{},params.row.xyjs4 ? '出票后' : '出票前');
                        }
                    },
                    // {
                    //     title: '过期费率',
                    //     key: 'xyrate2'
                    // },
                    {
                        title: '使用状态',
                        render: (h, params) => {
                            return h('span',{},params.row.isvalid ? '启用' : '禁用');
                        }
                    },
                    {
                        title: '计算方式',
                        key: 'jsfs',
                    },
                    {
                        title: '可退票日期',
                        render: (h, params) => {
                            return h('span',{},params.row.changlist[0].time);
                        }
                    },
                    {
                        title: '退票费率',
                        render: (h, params) => {
                            return h('span',{},params.row.changlist[0].tdfl);
                        }
                    },
                    // {
                    //     title: '退订率详情',
                    //     render: (h, params) => {
                    //         let style = {
                    //             display: 'inline-block',
                    //             width: '50%',
                    //             height: '48px',
                    //             lineHeight: '48px'
                    //         };
                    //         let arr = [];
                    //         params.row.changlist.forEach(obj => {
                    //             if (!obj.time) {
                    //                 obj.time = 0;
                    //                 style['opacity'] = 0
                    //             }
                    //             arr.push(h('div', {
                    //                 style: {
                    //                     margin: '0 -18px',
                    //                     height: '48px',
                    //                     lineHeight: '48px',
                    //                     borderBottom: '1px solid #e9eaec',
                    //                 }
                    //             }, [
                    //                 h('div', {
                    //                     style: style
                    //                 }, obj.time),
                    //                 h('div', {
                    //                     style: {
                    //                         display: 'inline-block',
                    //                         width: '50%',
                    //                         height: '48px',
                    //                         lineHeight: '48px',
                    //                         borderLeft: '1px solid #e9eaec',
                    //                     }
                    //                 }, obj.tdfl)
                    //             ]))
                    //         });
                    //         arr[arr.length-1].data.style.border = 'none';
                    //         return h('div', arr)
                    //     }
                    // },
                ],
                tableData:[],
                pars:{
                    formDatas:{
                        iscenicid: 0
                    },
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                //----------新增修改
                formDatas1: {},
                ruleDatas: {
                    gzname: [
                        { required: true, message: '退票规则名称不能为空', trigger: 'blur' }
                    ],
                    time: [
                        { required: true, message: '退票日期不能为空', trigger: 'blur' }
                    ],
                    tdfl: [
                        { required: true, validator: validateTdfl, trigger: 'blur' }
                    ]
                },
                formItemList1: [
                    {
                        type: 1,
                        label: '退票规则名称',
                        keyName:'gzname',
                    },
                    {
                        type: 4,
                        label: '服务商名称',
                        keyName:'iscenicid',
                        selectEvent: true,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '产品名称',
                        keyName:'itickettypeid',
                        optionList: []
                    },
                    {
                        type: 2,
                        label: '计算方式',
                        keyName:'jsfs',
                        optionList: [
                            {
                                value: '0002',
                                labelName: '按天'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '出票前后',
                        keyName:'xyjs4',
                        optionList: [
                            {
                                value: 0,
                                labelName: '出票前'
                            },
                            {
                                value: 1,
                                labelName: '出票后'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '使用状态',
                        keyName:'isvalid',
                        optionList: [
                            {
                                value: 0,
                                labelName: '禁用'
                            },
                            {
                                value: 1,
                                labelName: '启用'
                            }
                        ]
                    },
                    {
                        type: 16,
                        label: '可退票日期',
                        keyName: 'time',
                        textConBefore: '在游玩日期前',
                        textConAfter: '天可退'
                    },
                    {
                        type: 1,
                        label: '退票费率',
                        keyName:'tdfl',
                        hasDec: '不大于1,比如:0.34或1.0',
                        isRedDec: true,
                    },
                    // {
                    //     type: 15,
                    //     label: '选择项',
                    //     keyName:'changebackrate',
                    //     hasDec: '时间输入整数,当计算方式为常年时,不用输入；退订费率不大于1,比如:0.34或1.0',
                    //     isRedDec: true,
                    //     colList: [
                    //         {
                    //             inputList: [
                    //                 {
                    //                     label: '时间',
                    //                     keyName: 'time',
                    //                 },
                    //                 {
                    //                     label: '退订费率',
                    //                     keyName: 'tdfl',
                    //                 },
                    //             ]
                    //         }
                    //     ]
                    // },
                    {
                        type: 7,
                        label: '备注',
                        keyName:'sznote'
                    }
                ],
                //---------查看
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '退订规则名称',
                        keyName: 'gzname'
                    },
                    {
                        label: '服务商名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '产品名称',
                        keyName: 'sztickettypename'
                    },
                    {
                        label: '计算方式',
                        keyName: 'jsfs'
                    },
                    {
                        label: '出票前后',
                        keyName: 'xyjs4'
                    },
                    {
                        label: '使用状态',
                        keyName: 'isvalid'
                    },
                    // {
                    //     label: '过期票是否允许出票口直接退票',
                    //     keyName: 'xyjs2'
                    // },
                    {
                        label: '可退票日期',
                        keyName: 'time'
                    },
                    {
                        label: '退票费率',
                        keyName: 'tdfl'
                    },
                    {
                        label: '备注',
                        keyName: 'sznote'
                    },
                ],
            }
        },
        methods:{
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '退订规则新增';
                    this.setAddInitData(type)
                } else if (type === 13) {
                    this.tipName = '退订规则修改';
                    this.setEditInitData(type)
                } else if (type === 14) {
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData['id'] = row.gzid;
                this.currentRowData['name'] = 'gzid';
                this.currentRowData['iscenicid'] = row.iscenicid;
                this.btnList[3].url = `${this.baseUrl}/ticket/ticketXgz/v1/deleteTicketBackRule?gzid=${row.gzid}`
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
                this.$common.currentPageData(this.baseUrl+'/ticket/ticketXgz/list', this, 'get')
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
                this.$common.currentPageData(this.baseUrl+'/ticket/ticketXgz/list', this, 'get')
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/ticketXgz/list', this, 'get')
            },
            clearFormData(){
                this.pars.formDatas = {
                    iscenicid: 0
                }
            },
            refreshData(){
                this.currentRowData = {};
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/ticketXgz/list', this, 'get')
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    iscenicid: this.pars.formDatas.iscenicid
                }
            },
            async setAddInitData (type) {
                // if (this.formItemList1[7].colList.length > 1) {
                //     this.formItemList1[7].colList.splice(1, this.formItemList1[7].colList.length-1)
                // }
                this.formDatas1 = {
                    changebackrate: [
                        {
                            time: '',
                            tdfl: ''
                        }
                    ],
                    lgtp: '01',
                    jstp: '0002',
                    gztype: '0001',
                    jsfs: '0002',
                    xyjs4: 0,
                    isvalid: 1,
                    iscenicid: this.formItemList1[1].optionList[0].value
                };
                const options1 = await this.getAllticketProduct(this.formDatas1.iscenicid);
                /**
                 * @since liuy 修改于 2018-9-15 15:09:08
                 */
                if(!options1.length) {
                    this.spinShow = false;
                    return;
                }
                this.formItemList1[2].optionList = options1;
                this.$set(this.formDatas1, 'itickettypeid', this.formItemList1[2].optionList[0].value);
                this.spinShow = false;
                this.currentIndex = type
            },
            async setEditInitData (type) {
                const options = await this.getAllticketProduct(this.currentRowData.iscenicid);
                this.formItemList1[2].optionList = options;
                this.getSingleData(type)
            },
            setViewInitData (type) {
                this.getSingleData(type, 1)
            },
            getSingleData (type,isView) {
                this.$http.get(this.baseUrl+'/ticket/ticketXgz/v1/ticketbackruleView', {
                    params:{
                        access_token: this.Cookies.get('token'),
                        gzid: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        if (isView) {
                            data.xyjs4 = data.xyjs4 ? '出票后' : '出票前';
                            data.isvalid = data.isvalid ? '启用' : '禁用';
                            data.xyjs2 = data.xyjs2 ? '能退票' : '不能退票';
                            data.time = `在游玩日期前${data.changebackrate[0].time}天可退`;
                            data.tdfl = data.changebackrate[0].tdfl;
                            // data.changebackrate.forEach(obj => {
                            //     arr.push([
                            //         {
                            //             label: '时间',
                            //             keyName: obj.time
                            //         },
                            //         {
                            //             label: '退订费率',
                            //             keyName: obj.tdfl
                            //         }
                            //     ])
                            // });
                            // this.formItemList_view[8].cycle = arr;
                            this.formDatas_view = data;
                        } else {
                            // switch (data.jsfs) {
                            //     case '按小时': data.jsfs = '0001'; break;
                            //     case '按天': data.jsfs = '0002'; break;
                            //     case '常年': data.jsfs = '0003'; break;
                            //     default: break
                            // }
                            // for (let i = 1; i < data.changebackrate.length; i++) {
                            //     this.formItemList1[7].colList.push({
                            //         inputList: [
                            //             {
                            //                 label: '时间',
                            //                 keyName: 'time'
                            //             },
                            //             {
                            //                 label: '退订费率',
                            //                 keyName: 'tdfl'
                            //             },
                            //         ]
                            //     })
                            // }
                            data.jsfs = '0002';
                            data.time = data.changebackrate[0].time + '';
                            data.tdfl = data.changebackrate[0].tdfl;
                            this.formDatas1 = data;
                            this.formDatas1.lgtp = '01';
                            this.formDatas1.jstp = '0002';
                            this.formDatas1.gztype = '0001';
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            // addOrsubtractRow (num, index) {    //增加或减少文本输入行
            //     this.$common.addOrsubtractRow(num, index, 'changebackrate', this);
            //     if (num === 1) {    //减掉一行时，使减掉行表单验证消失
            //         let tdfl = this.formDatas1.changebackrate[index-1].tdfl;
            //         this.formDatas1.changebackrate[index-1].tdfl = '';
            //         setTimeout(() => {   //异步重新赋值，不然表单验证不会消失
            //             this.formDatas1.changebackrate[index-1].tdfl = tdfl;
            //         },1)
            //     }
            // },
            async selectedChange (val) {   //服务商下拉选项改变，请求对应服务商产品
                const options = await this.getAllticketProduct(val);
                this.formItemList1[2].optionList = options;
                if (this.formItemList1[2].optionList.length > 0) {
                    this.formDatas1.itickettypeid = this.formItemList1[2].optionList[0].value
                } else {
                    this.formDatas1.itickettypeid = undefined;
                    this.$common.showMessageModal(this, '该服务商还没有产品，请先新建产品', 2)
                }
            },
            async getFormDataAdd (obj) {
                if (!obj.itickettypeid) {
                    this.$common.showMessageModal(this, '该服务商还没有产品，请先新建产品', 2);
                    return;
                }
                obj = JSON.parse(JSON.stringify(obj));
                obj.changebackrate = [
                    {
                        time: obj.time,
                        tdfl: obj.tdfl
                    }
                ];
                delete obj.time;
                delete obj.tdfl;
                let aaa = '';
                this.btnLoading = true;
                if(this.currentIndex === 12){
                    aaa = await this.$common.addNewData('/ticket/ticketXgz/act?flag=1', this, obj, 'post', true)
                } else if(this.currentIndex === 13){
                    aaa = await this.$common.editData('/ticket/ticketXgz/act?flag=2', this, obj, 'post', true)
                }
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/ticketXgz/list', this, 'get')
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            },
            getAllticketProduct (iscenicid) {
                return new Promise((resolve, reject) => {
                    this.$http.get(this.baseUrl + '/ticket/ticket/v1/getAllProductInfoByScenicId', {
                        params: {
                            access_token: this.Cookies.get('token'),
                            iscenicid: iscenicid
                        }
                    }).then(res => {
                        if (res.data.code == 200) {
                            let options = [];
                            res.data.data.forEach(element => {
                                let oneOption = {};
                                oneOption['value'] = element.itickettypeid;
                                oneOption['label'] = element.sztickettypename;
                                options.push(oneOption);
                            });
                            resolve(options)
                        } else {
                            this.$Modal.error({
                                title: "温馨提示",
                                content: res.data.msg
                            });
                            this.spinShow = false
                        }
                    }).catch(err => {
                        console.log(err);
                        this.spinShow = false
                    })
                })
            }
        },
        async created () {
            let options = await this.$common.getScenicList(this, 0, true);
            this.formItemList[0].optionList = options;
            options = JSON.parse(JSON.stringify(options));
            options.shift();
            this.formItemList1[1].optionList = options;
            this.$common.currentPageData(this.baseUrl+'/ticket/ticketXgz/list', this, 'get')
        }
    }
</script>

<style scoped>

</style>
