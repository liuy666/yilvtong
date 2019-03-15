<template>
	<div id="ticketParamsManagement">
		<template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>订票信息参数管理</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <Form ref="simpleForm" :model="formDatas" inline>
                <FormItem label="业务类别:" :label-width="70">
                    <Select v-model="formDatas.ibusinessid" style="width:200px">
                        <Option 
                            v-for="item in oderInfoParamsList" 
                            :value="item.value" 
                            :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button 
                        type="primary" 
                        @click="handleSubmit('simpleForm')" 
                        shape="circle"
                        class="op-btns searchbtn">查询</Button>
                </FormItem>
            </Form>
            <radioTable
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage"
                @changePage="changePage"
                @selected="handleSelected"
                @changePageSize="changeSize"></radioTable>            
        </Card>
        <Card v-show="currentIndex === 2 || currentIndex === 3">
            <p slot="title" class="cardTitle">
                <span v-if="currentIndex ===2">新增销售订单信息管理</span>
                <span v-if="currentIndex ===3">修改销售订单信息管理</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatasAddUpdate"
                :ruleDatas="ruleDatasAddUpdate"
                :formItemList="formItemListAddUpdate"
                :isClose="false"
                @getFormData="handleAddUpdate"
                @closeCurrentPage="closeCurrentPage"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 4">
            <p slot="title" class="cardTitle">
                <span>查看销售订单信息管理</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="(item,idx) in detailList" :key="idx">
                    <td>{{ item.title }}</td>
                    <td><div>{{ item.value }}</div></td>
                </tr>
                <tr>
                    <td></td>
                    <td><Button type="primary" shape="circle" class="addpadding" @click="closeCurrentPage">关闭</Button></td>
                </tr>
            </table>
        </Card>
        <Modal v-model="isDel" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除记录</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该记录吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button 
                type="primary" 
                :loading="isModalLoading" 
                @click="sureEvent">确定</Button>
            <Button type="ghost" @click="cancelEvent">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "ticket-params-management",
        data() {
            const validateNum = (rule, value, callback) => {
                let reg = /^[0-9]*$/
                if (value === '') {
                    callback(new Error('排序不能为空，请输入正整数（包括0）'));
                } else if (!reg.test(value)) {
                    callback(new Error('只能输入正整数（包括0）'));
                } else {
                    callback();
                }
            };
        	return {
        		isShowLoading: false,
                isRadio: true,
                isLoading: false,
                // isQuery: false,
                isDel: false,
                isModalLoading: false,
                initAdd: null,
                rowData: null,
        		currentIndex: 1,
                total: 0,
                // watchTotal: 0,
                tableData: [],
                oderInfoParamsList: [],
                detailList: [],
                fieldList: [],
        		btnList: [
        			{
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 7,
                        btnlabel: '新增'
                    },
                    {
                        type: 8,
                        btnlabel: '修改'
                    },
                    {
                        type: 9,
                        btnlabel: '删除'
                    },
                    {
                        type: 10,
                        btnlabel: '查看'
                    }
        		],
                btnRefresh: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }  
                ],
        		formDatas: {
        			// 业务类别id
        			ibusinessid: 0
        		},
                colnames: [
                    {
                        title: '编号',
                        key: 'seq',
                        width: 100
                    },
                    {
                        title: '业务类别',
                        minWidth: 180,
                        key: 'szbusinessname'
                    },
                    {
                        title: '中文名称',
                        minWidth: 180,
                        key: 'zcs'
                    },
                    {
                        title: '对应字段',
                        minWidth: 160,
                        key: 'ecs'
                    },
                    {
                        title: '排序',
                        minWidth: 140,
                        key: 'isequence'
                    },
                    {
                        title: '是否启用',
                        width: 100,
                        render: (h,params) => {
                            return params.row.byisuse ? h('span','启用') : h('span','禁用');
                        }
                    }
                ],
                formDatasAddUpdate: {
                    seq: 0,
                    ibusinessid: 0,
                    zcs: '',
                    ecs: '',
                    isequence: '',// 值应为数字
                    byisuse: 0
                },
                ruleDatasAddUpdate: {
                    zcs: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: '参数不能为空'
                        }
                    ],
                    isequence: [
                        {
                            validator: validateNum,
                            trigger: 'blur',
                            required: true
                        }
                    ]
                },
                formItemListAddUpdate: [
                    {
                        type: 1,
                        keyName: 'seq',
                        label: '编号',
                        disabled: true,
                        isHidden: true
                    },
                    {
                        type: 4,
                        keyName: 'ibusinessid',
                        label: '业务类型',
                        optionList: []
                    },
                    {
                        type: 1,
                        keyName: 'zcs',
                        label: '中文参数',
                    },
                    {
                        type: 4,
                        keyName: 'ecs',
                        label: '对应字段',
                        optionList: []
                    },
                    {
                        type: 1,
                        keyName: 'isequence',
                        label: '排序',
                    },
                    {
                        type: 2,
                        keyName: 'byisuse',
                        label: '状态',
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用',
                            },
                            {
                                value: 0,
                                labelName: '禁用',
                            }
                        ]
                    },
                ],
                size: 10,
                currentPage: 1,
                QueryBuilder: null
        	}
        },
        async created() {
            this.isShowLoading = true;
            this.initAdd = this.$handle.objDeepCopy(this.formDatasAddUpdate);
            const res = await this.$api.all([
                {
                    type: 'get',
                    url: this.baseUrl + '/ticket/ordercs/v1/list',
                    queryParams: {
                        pageSize: this.size,
                        page: 1
                    }
                },
                {
                    type: 'get',
                    url: this.baseUrl + '/ticket/business/v1/businessSelect'
                },
                {
                    type: 'get',
                    url: this.baseUrl + '/ticket/ordercs/v1/getOrderCsParamList'
                }
            ]);
            // console.log(res);
            if(!res) {
                this.isShowLoading = false;
                return;
            }

            this.tableData = res[0].items;
            this.total = res[0].totalCount;
            this.QueryBuilder = {
                pageSize: this.size,
                page: 1
            }

            // 业务类型下拉列表
            this.formDatas.ibusinessid = res[1][0].ibusinessid;
            this.oderInfoParamsList = res[1].map(item => {
                return {
                    value: item.ibusinessid,
                    label: item.szbusinessname
                }
            });
            
            // 新增页-'对应字段'下拉列表 现目前值和字段名都用的pmva，暂时搁置
            let fieldList = res[2].map(item => {
                return {
                    value: item.pmva,
                    label: item.pmva
                }
            });
            this.formItemListAddUpdate[3].optionList = fieldList;
            this.fieldList = fieldList;
            this.isShowLoading = false;
        },
        methods: {
            // 带条件查询
            handleSubmit() {
                // this.isQuery = true;
                let queryParams = {
                    pageSize: this.size,
                    page: 1,
                    ibusinessid: this.formDatas.ibusinessid
                }
                this.QueryBuilder = {
                    ...queryParams
                }
                this.currentPage = 1;
                this.sendRequest(queryParams);
            },
            // 菜单功能
            handleOperate(operateNum) {
                if(operateNum === 7) {
                    this.formDatasAddUpdate = this.$handle.objDeepCopy(this.initAdd);
                    this.formItemListAddUpdate[0].isHidden = true;
                    // 初始化业务类型下拉框
                    this.formItemListAddUpdate[1].optionList = this.oderInfoParamsList;
                    this.formDatasAddUpdate.ibusinessid = this.oderInfoParamsList[0].value;

                    // 初始化对应字段下拉框
                    this.formDatasAddUpdate.ecs = this.fieldList[0].value;                    
                    this.currentIndex = 2;
                    return;
                } else {
                    if(!this.rowData) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请选择一条记录'
                        });
                        return;
                    }
                    if(operateNum === 8) {
                        this.formItemListAddUpdate[0].isHidden = false;
                        this.formItemListAddUpdate[1].optionList = this.oderInfoParamsList;
                        for(let outter in this.formDatasAddUpdate) {
                            for(let inner in this.rowData) {
                                if(outter === inner) {
                                    this.formDatasAddUpdate[outter] = this.rowData[inner];
                                    break;
                                }
                            }
                        }
                        // ecs 的值是pmva
                        this.currentIndex = 3;
                        return;
                    } else if(operateNum === 9) {
                        this.isDel = true;
                        return;
                    } else {
                        this.handleLook(this.rowData.seq);
                    }
                }
            },
            // 翻页查询
            changePage(pageNum) {
                // if(!this.isQuery) {
                //     this.sendRequest({
                //         pageSize: this.size,
                //         page: pageNum
                //     });
                // } else {
                //     this.sendRequest({
                //         pageSize: this.size,
                //         page: pageNum,
                //         ibusinessid: this.formDatas.ibusinessid
                //     });
                // }
                let queryParams = {
                    ...this.QueryBuilder
                }
                queryParams.page = pageNum;
                queryParams.pageSize = this.size;
                this.currentPage = pageNum;
                this.sendRequest(queryParams);
            },
            // 查看查询
            async handleLook(orderId) {
                this.isShowLoading = true;
                const lookRes = await this.$api.get(this.baseUrl+'/ticket/ordercs/v1/detail',{
                    seq: orderId
                });
                // console.log(lookRes);
                if(!lookRes) {
                    this.isShowLoading = false;
                    return;
                }
                let dataObj = {
                    '编号：': lookRes.data.seq,
                    '业务类型：': lookRes.data.szbusinessname,
                    '中文参数：': lookRes.data.zcs,
                    '对应字段：': lookRes.data.ecs,
                    '排序：': lookRes.data.isequence,
                    '状态：': lookRes.data.byisuse ? '启用' : '禁用'
                }
                let list = [];
                for(let attr in dataObj) {
                    list.push({
                        title: attr,
                        value: dataObj[attr]
                    })
                }
                this.detailList = list;
                this.currentIndex = 4;
                this.isShowLoading = false;
            },
            // 执行查询
            async sendRequest(queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/ticket/ordercs/v1/list',queryParams);
                // console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = res.data.items;
                this.total = res.data.totalCount;
                // if(this.isQuery) {
                //     this.watchTotal = res.data.totalCount;
                // }
                this.rowData = null;
                this.isLoading = false;
            },
            // 选中一条数据
            handleSelected(rowData) {
                // console.log(rowData);
                this.rowData = rowData;
            },
            // 执行新增/修改
            async handleAddUpdate() {
                this.isShowLoading = true;
                let queryParams = null;

                // 新增
                if(this.currentIndex === 2) {
                    bodyParams = {
                        byisuse: this.formDatasAddUpdate.byisuse,
                        ecs: this.formDatasAddUpdate.ecs,
                        ibusinessid: this.formDatasAddUpdate.ibusinessid,
                        isequence: this.formDatasAddUpdate.isequence,
                        zcs: this.formDatasAddUpdate.zcs
                    }
                    const addRes = await this.$api.post(this.baseUrl + '/ticket/ordercs/v1/add',{},bodyParams);
                    // console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                } else {
                    bodyParams = { // 修改
                        byisuse: this.formDatasAddUpdate.byisuse,
                        ecs: this.formDatasAddUpdate.ecs,
                        ibusinessid: this.formDatasAddUpdate.ibusinessid,
                        isequence: this.formDatasAddUpdate.isequence,
                        zcs: this.formDatasAddUpdate.zcs,
                        seq: this.rowData.seq
                    }
                    const updateRes = await this.$api.post(this.baseUrl + '/ticket/ordercs/v1/update',{},bodyParams);
                    // console.log(updateRes);
                    if(!updateRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }

                // 重新查询
                // this.watchTotal = 0;
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/ordercs/v1/list',{
                    pageSize: this.size,
                    page: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `${ this.currentIndex === 2 ? '新增' : '修改' }销售订单信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }
                
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
                // this.isQuery = false;
                this.QueryBuilder = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.formDatas.ibusinessid = this.oderInfoParamsList[0].value;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `${ this.currentIndex === 2 ? '新增' : '修改' }销售订单信息成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
            },
            // 关闭新增/修改/查看页
            closeCurrentPage() {
                this.currentIndex = 1;
            },
            // 执行删除
            async sureEvent() {
                this.isModalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/ticket/ordercs/v1/delete',{
                    seq: this.rowData.seq
                });
                // console.log(delRes);
                if(!delRes) {
                    this.isModalLoading = false;
                    this.isDel = false;
                    return;
                }

                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/ordercs/v1/list',{
                    pageSize: this.size,
                    page: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '销售订单信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
                }
                

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
                // this.isQuery = false;
                this.QueryBuilder = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.formDatas.ibusinessid = this.oderInfoParamsList[0].value;
                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '记录删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 关闭删除确认框
            cancelEvent() {
                this.isDel = false;
            },
            // 更改最大显示数
            async changeSize(size) {
                // this.isLoading = true;
                // this.size = size;
                // this.watchTotal = 0;
                // let queryParams = {
                //     pageSize: size,
                //     page: 1
                // }
                // if(this.isQuery) {
                //     queryParams['ibusinessid'] = this.formDatas.ibusinessid
                // }
                // const changeSizeRes = await this.$api.get(this.baseUrl + '/ticket/ordercs/v1/list',queryParams);
                // this.tableData = res.data.items;
                // this.total = res.data.totalCount;
                // this.watchTotal = res.data.totalCount;
                // this.rowData = null;
                // this.isLoading = false;
                this.size = size;
                this.changePage(1);
            }
        }
    }
</script>

<style scoped>

</style>
