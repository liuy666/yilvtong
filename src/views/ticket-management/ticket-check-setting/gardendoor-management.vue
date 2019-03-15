<template>
	<div id="gardenDoor">
		<template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>景区园门管理</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <Form ref="simpleForm" :model="formDatas" inline>
		        <FormItem label="园门查询:" :label-width="70">
		            <Select v-model="formDatas.providerId" style="width:200px">
				        <Option 
				        	v-for="item in providerList" 
				     		:value="item.value" 
				      		:key="item.value">{{ item.label }}</Option>
				    </Select>
		        </FormItem>
		        <FormItem>
		            <Button 
		            	type="primary" 
		            	@click="handleSubmit('simpleForm')" 
		            	shape="circle"
		            	class="addpadding">查询</Button>
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
                <span v-if="currentIndex ===2">添加园门</span>
                <span v-if="currentIndex ===3">修改园门</span>
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
                <span>查看园门</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="item in detailList">
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
                :loading="modalLoading" 
                @click="sureEvent">确定</Button>
            <Button type="ghost" @click="cancelEvent">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "gardendoor-management",
        data() {
            // const validateProvider = (rule, value, callback) => {
            //     if(value === undefined) {
            //         callback(new Error('请选择一个服务商！'));
            //     } else {
            //         callback();
            //     }
            // }
        	return {
        		isShowLoading: false,
                isRadio: true,
                isLoading: false,
                // isQuery: false,
                isDel: false,
                modalLoading: false,
        		currentIndex: 1,
        		total: 0,
        		// watchTotal: 0,
                initAdd: null,
                rowData: null,
                detailList: [],
                providerList: [], // 不含有<所有服务商>下拉选项
                tableData: [],       
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 7,
                        btnlabel: '新增本级'
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
                    providerId: 0
                },
                formDatasAddUpdate: {
                	// parentname: '',
                	// isgardengateid:,
                	iscenicid: undefined,
                	szgardengatecode: '',
                	szgardengatename: '',
                	bygardengateindex: '', // 值应该为数字
                	szaddress: '',
                	szcontact: '',
                	szphone: '',
                	byisuse: 0,
                	byiscont: 0,
                	szmemo: '',
                },
                ruleDatasAddUpdate: {
                    // iscenicid: [
                    //     {
                    //         validator: validateProvider,
                    //         trigger: 'change'
                    //     }
                    // ],
                	szgardengatecode: [
                		{
        					required: true,
        					message: '园门代码不能为空！',
        					trigger: 'blur'
        				}
                	],
                	szgardengatename: [
                		{
        					required: true,
        					message: '园门名称不能为空！',
        					trigger: 'blur'
        				}
                	],
                    bygardengateindex: [
                        {
                            required: true,
                            message: '园门序号不能为空！',
                            trigger: 'blur'
                        }
                    ]
                },
                formItemListAddUpdate: [
                	{
        				type: 4,
        				keyName: 'iscenicid',
        				label: '选择服务商',
        				optionList: []
        			},
        			{
        				type: 1,
        				keyName: 'szgardengatecode',
        				label: '园门代码'
        			},
        			{
        				type: 1,
        				keyName: 'szgardengatename',
        				label: '园门名称'
        			},
        			{
        				type: 1,
        				keyName: 'bygardengateindex',
        				label: '园门序号'
        			},
        			{
        				type: 1,
        				keyName: 'szaddress',
        				label: '园门地址'
        			},
        			{
        				type: 1,
        				keyName: 'szcontact',
        				label: '联系人'
        			},
        			{
        				type: 1,
        				keyName: 'szphone',
        				label: '联系电话'
        			},
        			{
        				type: 2,
        				keyName: 'byisuse',
        				label: '状态',
        				optionList: [
        					{
        						value: 0,
        						labelName: '禁用',
        					},
        					{
        						value: 1,
        						labelName: '启用',
        					}
        				]
        			},
        			{
        				type: 2,
        				keyName: 'byiscont',
        				label: '园门类型',
        				optionList: [
        					{
        						value: 0,
        						labelName: '入口',
        					},
        					{
        						value: 1,
        						labelName: '码头',
        					}
        				]
        			},
        			{
        				type: 7,
        				keyName: 'szmemo',
        				label: '备注'
        			}
                ],
                colnames: [
                    {
                        title: '编号',
                        width: 100,
                        key: 'igardengateid',
                    },
                    {
                        title: '园门名称',
                        minWidth: 180,
                        key: 'szgardengatename',
                    },
                    {
                        title: '园门代码',
                        minWidth: 140,
                        key: 'szgardengatecode',
                    },
                    {
                        title: '所属服务商',
                        minWidth: 200,
                        key: 'striscenicid',
                    },
                    {
                        title: '园门序号',
                        width: 100,
                        key: 'bygardengateindex',
                    },
                    {
                        title: '实际地址',
                        minWidth: 300,
                        key: 'szaddress',
                    },
                    {
                        title: '联系人',
                        minWidth: 140,
                        key: 'szcontact',
                    },
                    {
                        title: '联系电话',
                        minWidth: 140,
                        key: 'szphone',
                    },
                    {
                        title: '使用状态',
                        width: 100,
                        render: (h,params) => {
                            if(Number(params.row.byisuse)) {
                                return h('span','启用');
                            } else {
                                return h('span','禁用');
                            }
                        }
                    }
                ],
                QueryBuilder: null,
                size: 10,
                currentPage: 1
        	}
        },
        async created() {
        	this.isShowLoading = true;
            this.initAdd = this.$handle.objDeepCopy(this.formDatasAddUpdate);
            // console.log(this.initAdd,this.formDatasAddUpdate);

            // 获取服务商列表和初始化查询列表
        	const res = await this.$api.all([
        		{
        			type: 'get',
        			url: this.baseUrl + '/ticket/gardengate/v1/list',
        			queryParams: {
        				pageSize: this.size,
        				page: 1
        			}
        		},
        		{
        			type: 'get',
                    url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
                    queryParams: {
                        url: window.location.hostname
                    }
        		}
        	]);
            if(!res) {
                this.isShowLoading = false;
                return;
            }

        	this.tableData = res[0].ps.items;
            this.total = res[0].ps.totalCount;
            this.QueryBuilder = {
                pageSize: this.size,
        	    page: 1
            }

            let pList = res[1];
            if(!pList.length || (pList.length === 1 && pList[0].szscenicname === '所有服务商')) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '该景区企业下暂无服务商，请先创建服务商，'
                });
            } else {
                // 处理初始返回数据
                let providerList = pList.map(item => {
                    return {
                        value: item.iscenicid,
                        label: item.szscenicname
                    }
                });

                // 去掉所有服务商选项的下拉列表
                this.providerList = providerList.filter(item => {
                    return item.label !== '所有服务商';
                });

                this.formDatas.providerId =this.providerList[0].value;
            }

        	this.isShowLoading = false;
        },
        methods: {
            // 带条件查询
        	handleSubmit() {
        		// this.isQuery = true;
                let queryParams = {
                    pageSize: this.size,
        			page: 1,
        			providerId: this.formDatas.providerId
                }
                this.QueryBuilder = {
                    ...queryParams
                }
                this.currentPage = 1;
                this.sendRequest(queryParams);
        	},
            // 翻页查询
        	changePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuilder
                }
                queryParams.page = pageNum;
                queryParams.pageSize = this.size;
                this.currentPage = pageNum;
                this.sendRequest(queryParams);
        	},
            // 执行查询
        	async sendRequest(queryParams) {
        		this.isLoading = true;
        		const res = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/list',queryParams);
                // console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }

        		this.tableData = res.data.ps.items;
        		this.total = res.data.ps.totalCount;
        		// if(this.isQuery) {
        		// 	this.watchTotal = res.data.ps.totalCount;
                // }
                this.rowData = null;
        		this.isLoading = false;
        	},
            // 园门菜单功能
            handleOperate(operateNum) {
                if(operateNum === 7) {
                    this.formDatasAddUpdate = this.$handle.objDeepCopy(this.initAdd);
                    this.formItemListAddUpdate[0].optionList = this.providerList;
                    this.formDatasAddUpdate.iscenicid = this.providerList[0].value;
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
                    switch(operateNum) {
                        case 8:
                            this.formItemListAddUpdate[0].optionList = this.providerList;
                            for(let outter in this.formDatasAddUpdate) {
                                for(let inner in this.rowData) {
                                    if(outter === inner) {
                                        if(inner === 'bygardengateindex') {
                                            this.formDatasAddUpdate[outter] = String(this.rowData[inner]);
                                        } else {
                                            this.formDatasAddUpdate[outter] = this.rowData[inner];
                                        }
                                        break;
                                    }
                                }
                            }
                            this.currentIndex = 3;
                            break;
                        case 9:
                            this.isDel = true;
                            break;
                        case 10:
                            this.handleLook(this.rowData.igardengateid);
                            break;
                        default:
                            break;
                    }
                }
            },
            // 查看查询
            async handleLook(queryParams) {
                this.isShowLoading = true;
                const lookRes = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/get/' + queryParams);
                // console.log(lookRes);
                if(!lookRes) {
                    this.isShowLoading = false;
                    return;
                }

                // 处理成中文字段
                let lookData = {
                    "编号：": lookRes.data.id.igardengateid,
                    "服务商：": lookRes.data.striscenicid,
                    "园门代码：": lookRes.data.szgardengatecode,
                    "园门名称：": lookRes.data.szgardengatename,
                    "园门序号：": lookRes.data.bygardengateindex,
                    "园门地址：": lookRes.data.szaddress,
                    "联系人：": lookRes.data.szcontact,
                    "联系电话：": lookRes.data.szphone,
                    "状态：": lookRes.data.byisuse ? '启用' : '禁用',
                    "园门类型：": lookRes.data.byiscont ? '码头' : '入口',
                    "备注：": lookRes.data.szmemo
                }
                let list = [];
                for(let attr in lookData) {
                    list.push({
                        title: attr,
                        value: lookData[attr]
                    })
                }
                this.detailList = list;
                this.currentIndex = 4;
                this.isShowLoading = false;
            },
            // 选中一条数据
            handleSelected(rowData) {
                // console.log(rowData);
                this.rowData = rowData;
            },
            // 执行新增/修改
        	async handleAddUpdate() {
                this.isShowLoading = true;
                // 新增必须添加id主键和iscenicid
        		let queryParams = this.formDatasAddUpdate;
                queryParams = {
                    ...queryParams,
                    isgardengateid: 0,
                    id: { 
                        iscenicid: queryParams.iscenicid 
                    }
                };

                // 新增
        		if(this.currentIndex === 2) {
					const addRes = await this.$api.post(this.baseUrl + '/ticket/gardengate/v1/add',{},queryParams);
                    // console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                } else { // 修改必须添加园门编号igardengateid
                    queryParams.id = {
                        ...queryParams.id,
                        igardengateid: this.rowData.igardengateid
                    };
                    const updateRes = await this.$api.post(this.baseUrl + '/ticket/gardengate/v1/update',{},queryParams);
                    // console.log(updateRes);
                    if(!updateRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }
                // console.log(queryParams)

                // 重新查询
                // this.watchTotal = 0;
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/list',{
                    pageSize: this.size,
                    page: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
                    this.$Modal.success({
                        title: '操作成功',
                        content: `${ this.currentIndex === 2 ? '园门添加' : '园门修改' }成功，但重新查询时遇到异常，请手动刷新后查看`
                    });
                    return;
                }

                this.tableData = requeryRes.data.ps.items;
                this.total = requeryRes.data.ps.totalCount;
                // this.watchTotal = requeryRes.data.ps.totalCount;
                // this.isQuery =false;
                this.QueryBuilder = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.formDatas.providerId = this.providerList[0].value;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `${ this.currentIndex === 2 ? '园门添加' : '园门修改' }成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
        	},
            // 执行园门删除
            async sureEvent() {
                this.modalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/ticket/gardengate/v1/delete',{
                    igardengateid: this.rowData.igardengateid,
                    iscenicid: this.rowData.iscenicid
                });
                // console.log(delRes);
                if(!delRes) {
                    this.modalLoading = false;
                    this.isDel = false;
                    return;
                }

                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/list',{
                        pageSize: this.size,
                        page: 1
                    });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '园门信息删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
				}

                this.tableData = requeryRes.data.ps.items;
                this.total = requeryRes.data.ps.totalCount;
                // this.watchTotal = requeryRes.data.ps.totalCount;
                // this.isQuery = false;
                this.QueryBuilder = {
					pageSize: this.size,
        			page: 1
                }
                this.currentPage = 1;
                this.formDatas.providerId = this.providerList[0].value;
                this.rowData = null;
                this.modalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '记录删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 关闭删除确认框
            cancelEvent() {
                this.isDel =false;
            },
            // 关闭新增/修改/查看页
            closeCurrentPage() {
                this.currentIndex = 1;              
            },
            // 改变最大显示数
            changeSize(size) {
                this.size = size;
                this.changePage(1);
            }
        }
    }
</script>

<style scoped lang="less">

</style>
