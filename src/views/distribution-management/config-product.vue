<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">配置产品信息</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @refreshData="refreshData"
                            @changeIndex="changeIndex"
                            @operate="operate"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList_list"
                        :needListBtn="false"
                        @getFormData="getFormData"
                        @refreshData="refreshData"
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
                        @selected="getChooseData"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">添加产品信息</span>
                </p>
                <!-- <detail-form1
                        :form-datas="formDatas_add"
                        :is-list-page="false"
                        :is-mixed="false"
                        :needReset="false"
                        :is-close="isClose"
                        :btn-loading="btnLoading"
                        :form-item-list="formItemList_add"
                        @getFormData="getFormData_add"
                        @closeCurrentPage="closeCurrentPage"
                        @selectHasChanged="selectHasChanged"
                ></detail-form1> -->
                <radio-table
                        :needCLickRow="false"
                        :colname="colname_add"
                        :total='total_add'
                        :tableData="tableData_add"
                        :pageNum="pageNum_add"
                        :pageCode="pageCode_add"
                        :loading="loading_add"
                        @changePage="changePage_add"
                        @changePageSize="changePageSize_add"
                        @selectHasChange="selectHasChange"
                ></radio-table>
                <div style="margin: 20px 0 0 140px">
                    <Button :loading="btnLoading" type="primary"  @click="getFormData_add(formDatas_add)" class="op-btns searchbtn">保存</Button>
                    <Button type="ghost"  @click="closeCurrentPage" class="op-btns closebtn" >关闭</Button>
                </div>
            </Card>
            <Card v-show="currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">修改产品信息</span>
                </p>
                <detail-form1
                        :form-datas="formDatas_edit"
                        :is-list-page="false"
                        :is-mixed="false"
                        :needReset="false"
                        :is-close="isClose"
                        :ruleDatas="ruleDatas_edit"
                        :btn-loading="btnLoading"
                        :form-item-list="formItemList_edit"
                        @getFormData="getFormData_edit"
                        @closeCurrentPage="closeCurrentPage"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            const validateAmount = (rule, value, callback) => {
                const reg = /(^\d+$)|(^\d+[\.]{1}[0-9]{1,2}$)/;
                if (!value) {
                    callback(new Error('佣金比例不能为空'))
                } else if (!reg.test(value)) {
                    callback(new Error('请输入不小于0的数，可保留两位小数'))
                } else {
                    callback()
                }
            };
            return {
                scenicId: '',
                fzId: '',
                searchCount: 1,
                currentIndex: 1,
                spinShow: true,
                isClose : false,
                btnLoading: false,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 12,
                        btnlabel: '新增',
                        // isHidden: true,
                    },
                    {
                        type: 13,
                        btnlabel: '修改',
                        // isHidden: true,
                    },
                    {
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: '',
                        // isHidden: true,
                    },
                    {
                        type: 11,
                        btnlabel: '返回上级',
                        icon: 'reply'
                    }
                ],
                formItemList_list: [
                    {
                        type: 1,
                        label: '服务商名称',
                        keyName: 'szscenicname',
                        disabled: true,
                        labelWidth: 90
                    },
                    {
                        type: 1,
                        label: '价格分组',
                        keyName: 'pmcd',
                        disabled: true,
                        labelWidth: 80
                    },
                    // {
                    //     type: 1,
                    //     label: '佣金',
                    //     keyName: 'commisionNum',
                    //     disabled: true,
                    //     labelWidth: 50
                    // },
                    // {
                    //     type: 1,
                    //     label: '产品名称模糊查询',
                    //     keyName: 'radiobutton',
                    //     labelWidth: 125
                    // }
                ],
                currentRowData: {},
                colname: [
                    {
                        title: '价格编码',
                        key: 'icrowdkindpricecode',
                        width: 160,
                    },
                    {
                        title: '服务商',
                        key: 'szscenicname',
                        width: 200,
                        render: (h, params) => {
                            return h('span', this.pars.formDatas.szscenicname)
                        }
                    },
                    {
                        title: '产品',
                        key: 'sztickettypename',
                        width: 273
                    },
                    {
                        title: '人群种类',
                        key: 'szcrowdkindname',
                        width: 90,
                    },
                    {
                        title: '价格开始日期',
                        key: 'startdata',
                        width: 110
                    },
                    {
                        title: '价格结束日期',
                        key: 'enddata',
                        width: 110
                    },
                    {
                        title: '挂牌价',
                        key: 'listingprice',
                        width: 80
                    },
                    {
                        title: '实际售价',
                        key: 'mactualsaleprice',
                        width: 90
                    },
                    {
                        title: '佣金',
                        width: 140,
                        render: (h, params) => {
                            const num = params.row.commisionNum;
                            return h('span', params.row.commisionType ? `按比例${num}%` : `固定佣金${num}元`)
                        }
                    },
                    {
                        title: '是否网上销售',
                        width: 110,
                        render: (h, params) => {
                            return h('span', params.row.isnet ? '是' : '否')
                        }
                    },
                    {
                        title: '是否现场销售',
                        width: 110,
                        render: (h, params) => {
                            return h('span', params.row.isscene ? '是' : '否')
                        }
                    },
                    {
                        title: '是否扫码购票',
                        width: 110,
                        render: (h, params) => {
                            return h('span', params.row.isscancode ? '是' : '否')
                        }
                    },
                    {
                        title: '排序',
                        width: 80,
                        key: 'isequence'
                    },
                    {
                        title: '是否有效',
                        width: 90,
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '启用' : '禁用')
                        }
                    },
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    formDatas : {},
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                //新增---------------
                // labelWidth_add : 0,
                colname_add: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '价格编码',
                        key: 'icrowdkindpricecode',
                        width: 160,
                        align: 'center'
                    },
                    {
                        title: '服务商',
                        key: 'szscenicname',
                        width: 200,
                        align: 'center'
                    },
                    {
                        title: '产品',
                        key: 'sztickettypename',
                        width: 273,
                        align: 'center'
                    },
                    {
                        title: '人群种类',
                        key: 'szcrowdkindname',
                        width: 90,
                        align: 'center'
                    },
                    {
                        title: '价格开始日期',
                        key: 'startdata',
                        width: 110,
                        align: 'center'
                    },
                    {
                        title: '价格结束日期',
                        key: 'enddata',
                        width: 110,
                        align: 'center'
                    },
                    {
                        title: '实际售价',
                        key: 'mactualsaleprice',
                        width: 90,
                        align: 'center'
                    },
                    {
                        title: '佣金类型',
                        width: 170,
                        align: 'center',
                        render: (h,params) => {
                            let arr = [
                                {
                                    value: 0,
                                    label: '固定佣金(元)',
                                },
                                {
                                    value: 1,
                                    label: '按比例(%)',
                                }
                            ];
                            return h('Select', {
                                props: {
                                    value: params.row.commisionType
                                },
                                style: {
                                    width: '120px'
                                },
                                on: {
                                    'on-change': (val) => {   //render无法双向绑定，故用此方法伪双向
                                        params.row.commisionType = val;
                                        this.tableData_add[params.index] = params.row;
                                        this.changeInput(this.tableData_add)
                                    }
                                }
                            }, arr.map(item => {
                                return h('Option',{
                                    props:{
                                        value:item.value,
                                        label:item.label
                                    }
                                })
                            }))
                        }
                    },
                    {
                        title: '佣金数值',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('Input', {
                                props: {
                                    value: params.row.commisionNum
                                },
                                style: {
                                    width: '60px',
                                },
                                on: {    //render无法双向绑定，故用此方法伪双向
                                    input: (val) => {
                                        params.row.commisionNum = val;
                                        this.tableData_add[params.index] = params.row;
                                        this.changeInput(this.tableData_add)
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '是否网上销售',
                        width: 110,
                        align: 'center',
                        render: (h, parama) => {
                            return h('span', parama.row.isnet ? '是' : '否')
                        }
                    },
                    {
                        title: '是否现场销售',
                        width: 110,
                        align: 'center',
                        render: (h, parama) => {
                            return h('span', parama.row.isscene ? '是' : '否')
                        }
                    },
                    // {
                    //     title: '是否扫码购票',
                    //     width: 110,
                    //     align: 'center',
                    //     render: (h, parama) => {
                    //         return parama.row.isscancode ? '是' : '否'
                    //     }
                    // },
                    {
                        title: '是否有效',
                        width: 90,
                        align: 'center',
                        render: (h, parama) => {
                            return h('span', parama.row.byisuse ? '启用' : '禁用')
                        }
                    },
                ],
                tableData_add: [],
                formDatas_add : {},
                total_add: 0,
                pageNum_add: 10,
                pageCode_add: 1,
                loading_add: false,
                pageSelectd: [],
                // formItemList_add: [
                //     {
                //         type: 21,
                //         label: '',
                //         keyName: 'crowKingPriceIds',
                //         labelWidth: 1,
                //         tableData: [],
                //         // height: '',
                //         border: true,
                //         colname: [
                //             {
                //                 type: 'selection',
                //                 width: 60,
                //                 align: 'center',
                //                 fixed: 'left'
                //             },
                //             {
                //                 title: '价格编码',
                //                 key: 'icrowdkindpricecode',
                //                 width: 160,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '服务商',
                //                 key: 'szscenicname',
                //                 width: 200,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '产品',
                //                 key: 'sztickettypename',
                //                 width: 273,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '人群种类',
                //                 key: 'szcrowdkindname',
                //                 width: 90,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '价格开始日期',
                //                 key: 'startdata',
                //                 width: 110,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '价格结束日期',
                //                 key: 'enddata',
                //                 width: 110,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '实际售价',
                //                 key: 'mactualsaleprice',
                //                 width: 90,
                //                 align: 'center'
                //             },
                //             {
                //                 title: '佣金类型',
                //                 width: 170,
                //                 align: 'center',
                //                 render: (h,params) => {
                //                     let arr = [
                //                         {
                //                             value: 0,
                //                             label: '固定佣金(元)',
                //                         },
                //                         {
                //                             value: 1,
                //                             label: '按比例(%)',
                //                         }
                //                     ];
                //                     return h('Select', {
                //                         props: {
                //                             value: params.row.commisionType
                //                         },
                //                         style: {
                //                             width: '120px'
                //                         },
                //                         on: {
                //                             'on-change': (val) => {   //render无法双向绑定，故用此方法伪双向
                //                                 params.row.commisionType = val;
                //                                 this.formItemList_add[0].tableData[params.index] = params.row;
                //                                 this.changeInput(this.formItemList_add[0].tableData)
                //                             }
                //                         }
                //                     }, arr.map(item => {
                //                         return h('Option',{
                //                             props:{
                //                                 value:item.value,
                //                                 label:item.label
                //                             }
                //                         })
                //                     }))
                //                 }
                //             },
                //             {
                //                 title: '佣金数值',
                //                 width: 100,
                //                 align: 'center',
                //                 render: (h, params) => {
                //                     return h('Input', {
                //                         props: {
                //                             value: params.row.commisionNum
                //                         },
                //                         style: {
                //                             width: '60px',
                //                         },
                //                         on: {    //render无法双向绑定，故用此方法伪双向
                //                             input: (val) => {
                //                                 params.row.commisionNum = val;
                //                                 this.formItemList_add[0].tableData[params.index] = params.row;
                //                                 this.changeInput(this.formItemList_add[0].tableData)
                //                             }
                //                         }
                //                     })
                //                 }
                //             },
                //             {
                //                 title: '是否网上销售',
                //                 width: 110,
                //                 align: 'center',
                //                 render: (h, parama) => {
                //                     return h('span', parama.row.isnet ? '是' : '否')
                //                 }
                //             },
                //             {
                //                 title: '是否现场销售',
                //                 width: 110,
                //                 align: 'center',
                //                 render: (h, parama) => {
                //                     return h('span', parama.row.isscene ? '是' : '否')
                //                 }
                //             },
                //             // {
                //             //     title: '是否扫码购票',
                //             //     width: 110,
                //             //     align: 'center',
                //             //     render: (h, parama) => {
                //             //         return parama.row.isscancode ? '是' : '否'
                //             //     }
                //             // },
                //             {
                //                 title: '是否有效',
                //                 width: 90,
                //                 align: 'center',
                //                 render: (h, parama) => {
                //                     return h('span', parama.row.byisuse ? '启用' : '禁用')
                //                 }
                //             },
                //         ],
                //     }
                // ],
                tipName : '添加产品信息',
                formDatas_edit: {},
                ruleDatas_edit: {
                    commisionNum: [
                        { required: true, validator: validateAmount, trigger: 'blur' }
                    ]
                },
                formItemList_edit: [
                    {
                        type: 1,
                        label: '服务商',
                        keyName: 'szscenicname',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '产品',
                        keyName: 'sztickettypename',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '实际售价',
                        keyName: 'mactualsaleprice',
                        disabled: true
                    },
                    {
                        type: 2,
                        label: '佣金类型',
                        keyName: 'commisionType',
                        optionList: [
                            {
                                value: 0,
                                labelName: '固定佣金(元)'
                            },
                            {
                                value: 1,
                                labelName: '按比例(%)'
                            }
                        ]
                    },
                    {
                        type: 1,
                        label: '佣金',
                        keyName: 'commisionNum',
                    },
                ],
            }
        },
        methods: {
            changeIndex (type) {
                this.spinShow = true;
                if (type === 12) {
                    this.setAddForm(type)
                } else if (type === 13) {
                    this.setEditForm(type)
                }
            },
            getChooseData(row){
                let baseUrl = `${this.baseUrl}/ticket/crowdKindPrice/v1/deletePriceInfoByJgfzAndPriceId`;
                this.currentRowData["id"] = row.icrowdkindpriceid;
                this.currentRowData["name"] = 'icrowdkindpriceid';
                this.currentRowData["szscenicname"] = row.szscenicname;
                this.currentRowData["sztickettypename"] = row.sztickettypename;
                this.currentRowData["mactualsaleprice"] = row.mactualsaleprice;
                this.currentRowData["commisionType"] = row.commisionType;
                this.currentRowData["commisionNum"] = row.commisionNum;
                this.btnList[3].url = `${baseUrl}?groupId=${this.$route.params.id}&priceId=${row.icrowdkindpriceid}`;
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
                this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
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
                this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    fzId: this.$route.params.id
                }
            },
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            clearFormData () {
                this.pars.formDatas = {}
            },
            isSingle(page){
                if (page == 1) this.single = 0;
                return;
                this.single = page
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
            async getAddTableData (type) {
                this.loading_add = true;
                let params = {
                    access_token: this.Cookies.get('token'),
                    scenicId: this.scenicId,
                    page: this.pageCode_add,
                    pageSize: this.pageNum_add
                }
                try {
                    const res = await this.$http.get(`${this.baseUrl}/ticket/crowdKindPrice/v1/getAllCrowKindPriceByScenicId`, { params });
                    if (res.data.code === 200) {
                        let data = res.data.data.items;
                        if (!data.length) {
                            this.loading_add = false;
                            this.spinShow = false;
                            this.$common.showMessageModal(this, '该景区服务商暂时无产品可配,请先创建产品', 2);
                            return 0
                        }
                        // let height = (data.length * 48 + 40) > 524 ? 524 : data.length * 48 + 40;
                        data.map(item => {
                            item.szscenicname = this.pars.formDatas.szscenicname;
                            item.commisionType = 0;
                            item.commisionNum = '';
                        });
                        this.tableData_add = data;
                        this.total_add = res.data.data.totalCount
                    } else {
                        this.$common.showMessageModal(this, res ,1);
                    }
                    this.loading_add = false;
                    this.spinShow = false;
                } 
                catch (err) {
                    this.loading_add = false;
                    this.spinShow = false;
                }
            },
            async setAddForm (type) {
                this.formDatas_add = {};
                this.pageSelectd = [];
                await this.getAddTableData(type);
                this.currentIndex = type;
                // this.$http.get(`${this.baseUrl}/ticket/crowdKindPrice/v1/getAllCrowKindPriceByScenicId`, {
                //     params: {
                //         access_token: this.Cookies.get('token'),
                //         scenicId: this.scenicId
                //     }
                // }).then(res => {
                //     if (res.data.code === 200) {
                //         let data = res.data.data.items;
                //         if (!data.length) {
                //             this.spinShow = false;
                //             this.$common.showMessageModal(this, '该景区服务商暂时无产品可配,请先创建产品', 2);
                //             return 0
                //         }
                //         // let height = (data.length * 48 + 40) > 524 ? 524 : data.length * 48 + 40;
                //         data.map(item => {
                //             item.szscenicname = this.pars.formDatas.szscenicname;
                //             item.commisionType = 0;
                //             item.commisionNum = '';
                //         });
                //         this.formItemList_add[0].tableData = data;
                //         // this.formItemList_add[0].height = height;
                //     } else {
                //         this.$common.showMessageModal(this, res ,1);
                //     }
                //     this.spinShow = false;
                //     this.currentIndex = type
                // });
            },
            async changePage_add (pageCode) {
                this.pageCode_add = pageCode;
                await this.getAddTableData();
                this.tableData_add.map((item,index) => {
                    if (this.pageSelectd[pageCode]) {
                        this.pageSelectd[pageCode].map(obj => {
                            if (item.icrowdkindpriceid === obj.priceId) {
                                this.$set(this.tableData_add[index], '_checked', true);
                                this.tableData_add[index]['commisionNum'] = obj.commisionNum;
                                this.tableData_add[index]['commisionType'] = obj.commisionType;
                            }
                        })
                    }
                })
            },
            async changePageSize_add (pageSize) {
                this.pageNum_add = pageSize;
                await this.getAddTableData();
            },
            selectHasChange (arr) {
                let arr1 = [];
                let table = JSON.parse(JSON.stringify(this.tableData_add));
                for (let obj of table) {
                    obj._checked = false
                }
                if (arr.length > 0) {
                    for (let item of arr) {
                        // item._checked = true;
                        for (let obj of table) {
                            if (item.icrowdkindpriceid === obj.icrowdkindpriceid) {
                                obj._checked = true;
                                arr1.push({
                                priceId: obj.icrowdkindpriceid,
                                commisionType: obj.commisionType,
                                commisionNum: obj.commisionNum,
                                mactualsaleprice: obj.mactualsaleprice,
                            });
                            }
                        }
                    }
                }
                this.tableData_add = table;
                this.$set(this.pageSelectd, this.pageCode_add, arr1)
                let arr2 = [];
                this.pageSelectd.map(item => {
                    if (item) arr2.push(...item)
                })
                this.$set(this.formDatas_add, 'crowKingPriceIds', arr2)
            },
            //输入框值改变，更新选中行的数据
            changeInput (data) {
                let arr = [];
                for (let item of data) {
                    if (item._checked) {
                        arr.push({
                            priceId: item.icrowdkindpriceid,
                            commisionType: item.commisionType,
                            commisionNum: item.commisionNum,
                            mactualsaleprice: item.mactualsaleprice,
                        })
                    }
                }
                this.$set(this.pageSelectd, this.pageCode_add, arr)
                let arr2 = [];
                this.pageSelectd.map(item => {
                    if (item) arr2.push(...item)
                })
                this.$set(this.formDatas_add, 'crowKingPriceIds', arr2)
            },
            //产品配置表单验证
            formValidation () {   //表单验证
                const reg = /(^\d+$)|(^\d+[\.]{1}[0-9]{1,2}$)/;
                let arr = [];
                if (!this.formDatas_add.crowKingPriceIds || !this.formDatas_add.crowKingPriceIds.length) {
                    this.$common.showMessageModal(this, '请选择产品进行配置', 2);
                    return 0
                } else {
                    this.formDatas_add.crowKingPriceIds.map(item => {
                        if (!item.commisionNum && item.commisionNum != 0) {
                            this.$common.showMessageModal(this, '佣金不能为空', 2);
                            return 0
                        } else if (!reg.test(item.commisionNum)) {
                            this.$common.showMessageModal(this, '佣金请输入不小于0的数，可保留两位小数', 2);
                            return 0
                        } else if (reg.test(item.commisionNum)) {
                            let num = '';
                            if (item.commisionType) {
                                num = parseFloat(item.commisionNum) * item.mactualsaleprice * 0.01
                            } else {
                                num = parseFloat(item.commisionNum)
                            }
                            if (num >= parseFloat(item.mactualsaleprice)) {
                                this.$common.showMessageModal(this, '佣金须小于实际售价', 2);
                                return 0
                            } else {
                                arr.push(item)
                            }
                        }
                    });
                    if (this.formDatas_add.crowKingPriceIds.length === arr.length) {
                        return 1
                    }
                }
            },
            async getFormData_add (obj) {
                if(!this.formValidation()) return;
                this.btnLoading = true;
                obj = JSON.parse(JSON.stringify(obj));
                this.$set(obj, 'fzId', this.fzId);
                obj.crowKingPriceIds = JSON.stringify(obj.crowKingPriceIds);
                let url = `/ticket/crowdKindPrice/v1/saveJgfzAndProducts?${this.QS.stringify(obj)}`;
                const aaa = await this.$common.editData(url, this, {}, 'get',true);
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
                }
            },
            setEditForm (type) {
                this.formDatas_edit = {
                    szscenicname: this.currentRowData.szscenicname,
                    sztickettypename: this.currentRowData.sztickettypename,
                    mactualsaleprice: this.currentRowData.mactualsaleprice,
                    commisionType: this.currentRowData.commisionType,
                    commisionNum: this.currentRowData.commisionNum,
                    priceId: this.currentRowData.id,
                    fzId: this.$route.params.id
                };
                this.currentIndex = type;
                this.spinShow = false
            },
            async getFormData_edit (obj) {
                let num = '';
                if (obj.commisionType) {
                    num = parseFloat(obj.mactualsaleprice) * parseFloat(obj.commisionNum) * 0.01
                } else {
                    num = obj.commisionNum
                }
                if (num >= obj.mactualsaleprice) {
                    this.$common.showMessageModal(this, '佣金须小于实际售价', 1);
                    return false
                }
                this.btnLoading = true;
                this.tipName = '修改产品信息';
                let priceId = [{
                    commisionType: obj.commisionType,
                    commisionNum: obj.commisionNum,
                    priceId: obj.priceId,
                }];
                let data = {
                    fzId: obj.fzId,
                    priceId: JSON.stringify(priceId)
                };
                let url = '/ticket/crowdKindPrice/v1/updateJgfzAndProducts';
                const aaa = await this.$common.editData(url, this, data, 'get');
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
            },
            //关闭新增查看页
            closeCurrentPage() {
                this.currentIndex = 1;
            },
            //获取列表表单页部分数据
            getListFormData () {
                return new Promise(resolve => {
                    this.$http.get(this.baseUrl+'/ticket/jgfz/v1/queryJgfzById', {
                        params: {
                            access_token: this.Cookies.get('token'),
                            seq: this.$route.params.id
                        }
                    }).then(res => {
                        if (res.data.code === 200) {
                            let data = res.data.data;
                            this.pars.formDatas = {
                                szscenicname: data.szscenicname,
                                pmcd: data.pmcd,
                                commisionNum: data.commisionType ? `按比例${data.commisionNum}%` : `固定佣金${data.commisionNum}元`
                            };
                            this.scenicId = data.iscenicid;
                            this.fzId = data.seq;
                            resolve(data.szscenicname)
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            this.spinShow = false
                        }
                    });
                })
            }
        },
        async created () {
            // const companytype = JSON.parse(sessionStorage.getItem('companytype'));
            // if (companytype === '01') {
            //     this.btnList[1].isHidden = true;
            //     this.btnList[2].isHidden = true
            // } else if (companytype === '02') {
            //     this.btnList[1].isHidden = false;
            //     this.btnList[2].isHidden = false
            // }
            await this.getListFormData();
            this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/getCrowKindPriceByJgfzId', this, 'get')
        }
    }
</script>

<style scoped>

</style>
