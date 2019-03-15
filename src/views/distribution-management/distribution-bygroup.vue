<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">分销商分组</span>
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
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看分销商分组</span>
                </p>
                <view-del-detail
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        :label-width="labelWidth_view"
                        :is-view="true"
                        :is-show="true"
                        :is-close="isClose"
                        @closeCurrentPage="closeCurrentPage"
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
                spinShow: true,
                isClose : false,
                total: 0,
                loading: false,
                single: 0,
                operationName: '配置产品',
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 2,
                        btnlabel: '新增',
                        isAdd : true,
                        // isHidden: true,
                        routerName : 'service_price_bygroup_new',
                        belongRouterName: this.$route.name
                    },
                    {
                        type: 3,
                        btnlabel: '修改',
                        // isHidden: true,
                        routerName : 'service_price_bygroup_edit',
                        belongRouterName: this.$route.name
                    },
                    {
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: '',
                        // isHidden: true,
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
                        keyName: 'iscenicid',
                        label: '所属服务商',
                        labelWidth: 100,
                        optionList: []
                    },
                    {
                        type: 1,
                        keyName: 'usid',
                        label: '分销商名称模糊查询',
                        labelWidth: 140,
                    },
                    // {
                    //     type: 13,
                    //     keyName: 'flag',
                    //     label: '',
                    //     labelWidth: 10,
                    //     optionList: [
                    //         {
                    //             value: '0',
                    //             labelName: '按用户名',
                    //         },
                    //         {
                    //             value: '1',
                    //             labelName: '按旅行社名称模糊查询',
                    //             keyName: 'query',
                    //             type: 1
                    //         }
                    //     ]
                    // },
                ],
                colname: [
                    {
                        title: '编号',
                        key: 'seq'
                    },
                    {
                        title: '服务商名称',
                        key: 'szscenicname'
                    },
                    {
                        title: '价格分组名称',
                        key: 'pmcd'
                    },
                    {
                        title: '分销商名称',
                        render: (h, params) => {
                            let arr = JSON.parse(params.row.customListJson);
                            arr = arr.filter(item => {
                                return item !== null
                            });
                            if (arr.length) {
                                let arr1 = [];
                                arr.map(item => {
                                    arr1.push(item.usid)
                                });
                                return h('span', arr1.join(','))
                            } else {
                                return h('span', null)
                            }
                        }
                    },
                    // {
                    //     title: '佣金',
                    //     render: (h, params) => {
                    //         const num = params.row.commisionNum;
                    //         return params.row.commisionType ? `按比例${num}%` : `固定佣金${num}元`
                    //     }
                    // },
                    {
                        title: '状态',
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '启用' : '禁用')
                        }
                    },
                    {
                        title: '产品配置状态',
                        render: (h, params) => {
                            return h('span', params.row.configStatus ? '已配置' : '未配置')
                        }
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            if(params.row.seq === 'hqyatu') {
                                return h('span', {
                                    'class': 'hover_span',
                                }, ' ')
                            } else {
                                return h('span', {
                                    'class': 'hover_span',
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'config_product',
                                                params: {
                                                    id: params.row.seq
                                                }
                                            })
                                        }
                                    },
                                }, '配置产品')
                            }
                        }
                    },
                ],
                tableData:[],
                pars:{
                    formDatas:{},
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                //查看页面
                labelWidth_view : 140,
                formDatas_view : {},
                formItemList_view: [
                    {
                        label: '服务商名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '价格分组',
                        keyName: 'pmcd'
                    },
                    // {
                    //     label: '佣金',
                    //     keyName: 'commisionNum'
                    // },
                    {
                        label: '分销商',
                        keyName: '',
                        showElement: true,
                        table: true,
                        width: '40%',
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
                        ],
                        tableData: []
                    },
                    {
                        label: '使用状态',
                        keyName: 'byisuse',
                    }
                ]
            }
        },
        methods:{
            changeIndex (type) {
                this.spinShow = true;
                if (type === 14) {
                    this.setViewForm(type)
                }
            },
            selected (row) {
                this.currentRowData["id"] = row.seq;
                this.currentRowData["name"] = 'seq';
                this.btnList[3].url = `${this.baseUrl}/ticket/jgfz/v1/deleteJgfz?seq=${row.seq}`
            },
            async changePage(pageCode) {
                this.pars.pageCode = pageCode;
                await this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showJgfzByParm', this, 'get');
                this.addHqyt()
            },
            async changePageSize(pageSize){
                this.pars.pageNum = pageSize;
                await this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showJgfzByParm', this, 'get');
                this.addHqyt()
            },
            async getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                await this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showJgfzByParm', this, 'get');
                this.addHqyt()
            },
            clearFormData(){
                this.pars.formDatas = {
                    iscenicid: this.formItemList[0].optionList[0].value,
                }
            },
            async refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                await this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showJgfzByParm', this, 'get');
                this.addHqyt()
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    iscenicid: this.pars.formDatas.iscenicid,
                    usid: this.pars.formDatas.usid
                }
            },
            setViewForm (type) {
                if (this.currentRowData.id === 'hqyatu') {
                    this.$common.showMessageModal(this, '该分组不可查看', 2);
                    this.spinShow = false;
                    return;
                }
                this.$http.get(this.baseUrl+'/ticket/jgfz/v1/queryJgfzById',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        seq: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.byisuse = data.byisuse ? '启用' : '禁用';
                        data.commisionNum = data.commisionType ? `按比例${data.commisionNum}%` : `固定佣金${data.commisionNum}元`;
                        this.formDatas_view = data;
                        this.formItemList_view[2].tableData = JSON.parse(data.customListJson).filter(item => {
                            return item !== null
                        });
                        let height = this.formItemList_view[2].tableData.length * 40 + 34;
                        this.formItemList_view[2].height = height > 434 ? 434 : height
                    } else {
                        this.$common.showMessageModal(this, res ,1)
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                });
            },
            //关闭新增查看页
            closeCurrentPage() {
                this.currentIndex = 1;
            },
            addHqyt() {
                const obj = this.formItemList[0].optionList.filter(item => {
                    return item.value === this.pars.formDatas.iscenicid
                });
                this.tableData.unshift({
                    seq: 'hqyatu',
                    szscenicname: obj[0].label,
                    pmcd: 'hqyatu',
                    customListJson: JSON.stringify([{usid: 'hqyatu'}]),
                    byisuse: 1,
                    configStatus: 1
                })
            }
        },
        async created () {
            // const companytype = JSON.parse(sessionStorage.getItem('companytype'));
            // if (companytype === '01') {
            //     this.btnList[1].isHidden = true;
            //     this.btnList[2].isHidden = true;
            //     this.btnList[3].isHidden = true;
            //     this.operationName = '查看配置产品'
            // } else if (companytype === '02') {
            //     this.btnList[1].isHidden = false;
            //     this.btnList[2].isHidden = false;
            //     this.btnList[3].isHidden = false;
            //     this.operationName = '配置产品'
            // }
            const options = await this.$common.getScenicList(this, 0);
            this.formItemList[0].optionList = options;
            this.pars.formDatas = {
                iscenicid: this.formItemList[0].optionList[0].value
            };
            await this.$common.currentPageData(this.baseUrl+'/ticket/jgfz/v1/showJgfzByParm', this, 'get');
            this.addHqyt()
        }
    }
</script>

<style scoped>

</style>
