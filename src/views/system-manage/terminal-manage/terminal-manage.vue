<style lang="less" scoped>

</style>

<template>
    <div id="terminal-manage">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>终端管理</span>
                <topBtn :btnList="btnList" @operate="operate"></topBtn>
            </p>
            <detail-form1 
                :isListPage="true"
			    :formDatas="formDatas"
			    :formItemList="formItemList"
			    @getFormData="handleQuery"
                @clearFormData="resetForm"></detail-form1>
            <radioTable 
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage"
                @changePage="handleChangePage"
                @selected="handleSelected"
                @changePageSize="changeSize"></radioTable>
        </Card>
        <Card v-show="currentIndex === 2 || currentIndex === 3" class="add-min-height">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex ===2">新增终端信息</span>
                <span v-if="currentIndex ===3">修改终端信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatasForAdd"
                :ruleDatas="ruleDatasForAdd"
                :formItemList="formItemListForAdd"
                :isClose="false"
                @getFormData="handleForAdd"
                @closeCurrentPage="closePage"></detail-form1>
        </Card>
        <Modal v-model="isDel" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除终端信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该终端信息吗？</p>
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
        name: 'terminal-manage',
        data() {
            return {
                isShowLoading: false,
                isDel: false,
                isModalLoading: false,
                isLoading: false,
                isRadio: true,
        		currentIndex: 1,
                total: 0,
                rowData: null,
                initDatas: null,
                tableData: [],
                currentPage: 1,
                size: 10,
                QueryBuilder: null,
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
                    }
        		],
        		btnRefresh: [
        			{
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatas: {
                    scenicId: '',
                    cpuSerial: ''
                },
                formItemList: [
                    {
        				type: 4,
        				keyName: 'scenicId',
                        label: '服务商',
                        labelWidth:100,
        				optionList: []
        			},
        			{
        				type: 1,
        				label: 'CPU序列号',
                        keyName: 'cpuSerial',
                        labelWidth:100
        			}
                ],
                formDatasForAdd: {
                    scenicId: '',
                    authCode: '',
                    cpuSerial: '',
                    ipAddress: '',
                    status: 0
                },
                formItemListForAdd: [
                    {
        				type: 4,
        				keyName: 'scenicId',
                        label: '服务商',
        				optionList: []
                    },
                    {
        				type: 1,
        				label: '授权码',
                        keyName: 'authCode'
                    },
                    {
        				type: 1,
        				label: 'CPU序列号',
                        keyName: 'cpuSerial'
                    },
                    {
        				type: 1,
        				label: 'IP地址',
                        keyName: 'ipAddress'
                    },
                    {
        				type: 2,
        				keyName: 'status',
        				label: '审核状态',
        				optionList: [
        					{
        						value: 0,
        						labelName: '审核中'
        					},
        					{
        						value: 1,
        						labelName: '审核失败'
                            },
                            {
        						value: 2,
        						labelName: '审核成功'
        					}
        				]
        			},
                ],
                ruleDatasForAdd: {
                    authCode: [
        				{
        					required: true,
        					message: '授权码不能为空！',
        					trigger: 'blur'
        				}
                    ],
                    cpuSerial: [
        				{
        					required: true,
        					message: 'CPU序列号不能为空！',
        					trigger: 'blur'
        				}
                    ],
                    ipAddress: [
        				{
        					required: true,
        					message: 'IP地址不能为空！',
        					trigger: 'blur'
        				}
        			]
                },
                colnames: [
                    {
                        title: '编号',
                        minWidth: 70,
                        key: 'id'
                    },
                    {
                        title: '景区名称',
                        minWidth: 250,
                        key: 'scenicName'
                    },
                    {
                        title: '授权码',
                        minWidth: 200,
                        key: 'authCode'
                    },
                    {
                        title: 'CPU序列号',
                        minWidth: 200,
                        key: 'cpuSerial'
                    },
                    {
                        title: 'IP地址',
                        minWidth: 170,
                        key: 'ipAddress'
                    },
                    {
                        title: '审核状态',
                        minWidth: 140,
                        render: (h,params) => {
                            let content = '';
                            switch(params.row.status) {
                                case 0:
                                    content = '审核中';
                                    break;
                                case 1:
                                    content = '审核失败';
                                    break;
                                case 2:
                                    content = '审核成功';
                                    break;
                            }
                            return h('span',content);
                        }
                    }
                ],
                providerList: [],
            }
        },
        async created() {
            this.isShowLoading =  true;
            this.initDatas = this.$handle.objDeepCopy(this.formDatasForAdd);
            const res = await this.$api.all([
                {
                    type: 'get',
                    url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
                    queryParams: {
                        url: window.location.hostname
                    }
                },
                {
                    type: 'get',
                    url: this.baseUrl + '/sys/equipAuth/v1/queryEquipAuthList',
                    queryParams: {
                        page: 1,
                        pageSize: this.size
                    }
                }
            ]);

            if(!res) {
                this.isShowLoading = false;
                return;
            }
            let filterList = [],
                pList = res[0];
            if(!pList.length || (pList.length === 1 && pList[0].szscenicname === '所有服务商')) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '该景区企业下暂无服务商，请先创建服务商，'
                });
            } else {
                let providerList = pList.map(item => {
                    return {
                        value: item.iscenicid,
                        label: item.szscenicname
                    }
                });

                // 去掉所有服务商选项
                filterList = providerList.filter(item => {
                    return item.label !== '所有服务商';
                });

                // 保存服务商列表
                this.providerList = filterList;

                // 初始化主页面服务商列表
                this.formItemList[0].optionList = filterList;

                // 初始化新增页服务商列表
                this.formItemListForAdd[0].optionList = filterList;

                // 服务商下拉列表默认选中第一项
                this.formDatas.scenicId = filterList[0].value;
            }
            this.tableData = res[1].items;
            this.total = res[1].totalCount;
            this.QueryBuilder = {
                pageSize: this.size,
                page: 1
            }
            this.isShowLoading = false;
        },
        methods: {
            // 带条件查询
            handleQuery() {
                let queryParams = {           
                    ...this.formDatas,
                    page: 1,
                    pageSize: this.size
                }
                this.QueryBuilder = {
                    ...queryParams
                }
                this.currentPage = 1;
        		this.submitForm(queryParams);
            },
            resetForm() {
                this.formDatas.scenicId = this.providerList[0].value;
            },
            // 菜单功能
            operate(operateNum) {
                if(operateNum === 7) {
                    this.formDatasForAdd = this.$handle.objDeepCopy(this.initDatas);
                    this.formDatasForAdd.scenicId = this.providerList[0].value;
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
                        for(let outter in this.formDatasForAdd) {
                            for(let inner in this.rowData) {
                                if(outter === inner) {
                                    this.formDatasForAdd[outter] = this.rowData[inner];
                                    break;
                                }
                            }
                        }
                        this.currentIndex = 3;
                        return;
                    }
                    if(operateNum === 9) {
                        this.isDel = true;
                        return;
                    }
                }
            },
            // 翻页查询
            handleChangePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuilder
                }
                queryParams.page = pageNum;
                queryParams.pageSize = this.size;
                this.currentPage = pageNum;
                this.submitForm(queryParams);
            },
            // 执行查询
            async submitForm(queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/sys/equipAuth/v1/queryEquipAuthList',queryParams);
                console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = res.data.items;
                this.total = res.data.totalCount;
                this.rowData = null;
                this.isLoading = false;
            },
            // 选中一条数据
            handleSelected(rowData) {
                console.log(rowData);
            	this.rowData = rowData;
            },
            // 改变最大显示页数
            changeSize(size) {
                this.size = size;
                this.handleChangePage(1);
            },
            // 执行新增/修改
            async handleForAdd() {
                this.isShowLoading = true;   
                let bodyParams = this.formDatasForAdd;
                let scenicName = this.providerList.find(item => {
                    return item.value === this.formDatasForAdd.scenicId
                }).label;
                bodyParams = {
                    ...bodyParams,
                    scenicName
                }
                console.log(bodyParams);
                
                if(this.currentIndex === 2) {
                    const addRes = await this.$api.post(this.baseUrl + '/sys/equipAuth/v1/addOrUpdateEquipAuth',{},bodyParams);
                    console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                } else {
                    bodyParams = {
                        ...bodyParams,
                        id: this.rowData.id
                    }
                    const updateRes = await this.$api.post(this.baseUrl + '/sys/equipAuth/v1/addOrUpdateEquipAuth',{},bodyParams);
                    console.log(updateRes);
                    if(!updateRes) {
                        this.isShowLoading = false;
                        return
                    }
                } 

                // 重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/sys/equipAuth/v1/queryEquipAuthList',{
                    pageSize: this.size,
                    page: 1
                });
                console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `终端信息已经${ this.currentIndex === 2 ? '新增' : '修改' } 成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.formDatas.cpuSerial = '';
                this.formDatas.scenicId = this.providerList[0].value;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `终端信息${ this.currentIndex === 2 ? '添加' : '修改' }，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
            },
            // 关闭新增/修改/查看页
            closePage() {
                this.currentIndex = 1;
            },
            // 执行删除
            async sureEvent() {
                this.isModalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/sys/equipAuth/v1/deleteEquipAuth',{
                    id: this.rowData.id
                });
                console.log(delRes);
                if(!delRes) {
                    this.isModalLoading = false;
                    this.isDel = false;
                    return;
                }

                // 重新查询 
                const requeryRes = await this.$api.get(this.baseUrl + '/sys/equipAuth/v1/queryEquipAuthList',{
                    pageSize: this.size,
                    page: 1
                });
                console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '终端信息删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
                }
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.formDatas.cpuSerial = '';
                this.formDatas.scenicId = this.providerList[0].value;
                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '终端信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 关闭删除确认框
            cancelEvent() {
                this.isDel = false;
            }
        }
    }
</script>
