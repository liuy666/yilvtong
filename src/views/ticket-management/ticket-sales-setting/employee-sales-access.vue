<template>
	<div id="employeeSaleAccess">
		<template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>营销权限</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <Form ref="simpleForm" :model="formDatas" inline>
				<FormItem label="服务商:" :label-width="55">
		            <Select v-model="formDatas.scenicId" style="width:200px" @on-change="handleChange">
				        <Option 
				        	v-for="item in providerList" 
				     		:value="item.value" 
				      		:key="item.value">{{ item.label }}</Option>
				    </Select>
		        </FormItem>
		        <FormItem label="员工姓名:" :label-width="80">
		            <Select v-model="formDatas.iemployeeid" style="width:200px">
				        <Option 
				        	v-for="item in nameList" 
				     		:value="item.value" 
				      		:key="item.value">{{ item.label }}</Option>
				    </Select>
		        </FormItem>
		        <FormItem :label-width="80">
		            <Button 
		            	type="primary" 
		            	@click="handleQuery()" 
		            	shape="circle"
		            	class="addpadding"
						style="margin-top: 0;">查询</Button>
		        </FormItem>
		    </Form>
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
        <Card v-show="currentIndex === 2 || currentIndex === 3">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex === 2">新增营销权限</span>
                <span v-if="currentIndex === 3">修改营销权限</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <checkbox-table 
            	:priceList="priceList" 
                :itemList="currentEmployeeDetail"
                :checkedList="checkedList"
				name="营销权限名称"
                @submit="handleAddUpdate"
                @closePage="handleClosePage"></checkbox-table>
        </Card>
        <Card v-show="currentIndex === 4">
        	<p slot="title" class="cardTitle">
                <span>查看营销权限</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="item in detailList" :key="item.value">
                    <td>{{ item.title }}</td>
                   	<td><div>{{ item.value }}</div></td>
                </tr>
                <tr>
                	<td></td>
                	<td><Button type="primary" shape="circle" class="addpadding" @click="closeModal">关闭</Button></td>
                </tr>
            </table>
        </Card>
        <Modal v-model="isDel" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除营销权限</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该营销权限吗？</p>
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
	import checkboxTable from '@/views/tables/checkbox-table.vue';
    export default {
        name: "employee-sales-access",
        components: {
        	'checkbox-table': checkboxTable
        },
        data() {
        	return {
        		isShowLoading: false,
        		isDel:false,
        		modalLoading: false,
        		isLoading: false,
        		// isQuery: false,
				isRadio: true,
        		currentIndex: 1,
        		rowData: null,
        		total: 0,
				// watchTotal: 0,
				size: 10,
        		tableData: [],
        		currentEmployeeDetail: [],
        		priceList: [],
				checkedList: [],
        		detailList: [],
				nameList: [],
				providerList: [],
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
					iemployeeid: undefined,
					scenicId: undefined
        		},
        		colnames: [
        			{
                        title: '员工名称',
                        width: 240,
                        key: 'stremployee',
                    },
                    {
                        title: '营销权限名称',
						key: 'strcrowdkindprice',
						minWidth:600
                    }
				],
				currentPage: 1,
				QueryBuilder: null
        	}
        },
        async created() {
        	this.isShowLoading = true;
        	// 页面初始化-获取员工姓名列表-查询全部员工的销售权限
        	const res = await this.$api.all([
        		{
        			type: 'get',
        			url: this.baseUrl + '/ticket/employeesalelimits/v1/saleLimitView',
        			queryParams: {
        				pageSize: this.size,
        				page: 1,
        			}
        		},
        		{
                    url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
                    type: 'get',
                    queryParams: {
                        url: window.location.hostname
                    }
                }
			]);

			// console.log(res);
            if(!res) {
                this.isShowLoading = false;
                return;
			}

			let pList = res[1];
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
                let filterList = providerList.filter(item => {
                    return item.label !== '所有服务商';
				});

				// 初始化服务商下拉列表
                this.providerList = filterList;

                // 服务商下拉列表默认选中第一项
                this.formDatas.scenicId = filterList[0].value;

				// 使用服务商下拉列表第一项查询员工列表
				const getEmployeeList = await this.$api.get(this.baseUrl + '/sys/employee/v1/viewSaleEmployeeSelect',{
					scenicId: filterList[0].value
				});
				// console.log(getEmployeeList);
				if(!getEmployeeList) {
					this.isShowLoading = false;
					return;
				}

				// 初始化员工下拉列表
				this.nameList = getEmployeeList.data.map(item => {
					return {
						value: item.iemployeeid,
						label: item.szemployeename,
					};
				});
				this.formDatas.iemployeeid = getEmployeeList.data[0].iemployeeid;
			}

        	this.tableData = res[0].items;
			this.total = res[0].totalCount;
			this.QueryBuilder = {
				pageSize: this.size,
        		page: 1
			}
            this.isShowLoading = false;
        },
        methods: {
        	// 带条件查询
        	handleQuery() {
				// this.isQuery = true;
				if(!this.formDatas.iemployeeid) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '没有可查询的员工姓名'
					});
					return;
				}
				let queryParams = {
        			pageSize: this.size,
        			page: 1,
        			iemployeeid: this.formDatas.iemployeeid
				}
				this.QueryBuilder = {
					...queryParams
				}
				this.currentPage = 1;
        		this.submitForm(queryParams);
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
            	const res = await this.$api.get(this.baseUrl + '/ticket/employeesalelimits/v1/saleLimitView',queryParams);
				// console.log(res);
				if(!res) {
					this.isLoading = false;
					return;
				}

            	this.tableData = res.data.items;
            	this.total = res.data.totalCount;
            	// if(this.isQuery) {
        		// 	this.watchTotal = res.data.totalCount;
				// }
				this.rowData = null;
        		this.isLoading = false;
            },
            // 菜单功能
            async handleOperate(operateNum) {
            	if(operateNum === 7) {
					if (!this.formDatas.iemployeeid) {
						this.$Modal.warning({
	                        title: '温馨提示',
	                        content: '该服务商还没有为基础票种或组合套票分配员工销售权限。（您可以在票种设置 -- 基础票种/组合套票的操作栏 -- 价格管理 -- 分配员工销售权限中设置）'
	                    });
	                    return;
					}
            		this.isShowLoading = true;
            		const allLimitsRes = await this.$api.get(this.baseUrl + '/ticket/crowdKindPrice/v1/getLimitsPriceList',{
            			employeeId: this.formDatas.iemployeeid
            		});
            		// console.log(allLimitsRes);
            		this.priceList = allLimitsRes.data.map(item => {
                        return {
                            value: item.icrowdkindpriceid,
                            label: item.strpricename
                        }
                    });
            		this.currentEmployeeDetail = [
            			{
            				title: '员工',
            				value: this.nameList.filter(item => item.value === this.formDatas.iemployeeid)[0].label,
            				disabled: true
            			}
            		];
            		this.checkedList = [];
            		this.currentIndex = 2;
            		this.isShowLoading = false;
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
	            			this.isShowLoading = true;
	            			this.currentEmployeeDetail = [
	            				{
	            					title: '营销权限编号',
	            					value: this.rowData.isaleslimitsid,
	            					disabled: true
	            				},
	            				{
		            				title: '员工',
		            				value: this.rowData.stremployee,
		            				disabled: true
		            			}
	            			];
							// 这里先获取该员工所有权限，根据其最大数量获取已有权限
							const allLimitsRes2 = await this.$api.get(this.baseUrl + '/ticket/crowdKindPrice/v1/getLimitsPriceList',{
								employeeId: this.rowData.iemployeeid
							});
							if(!allLimitsRes2) {
								this.isShowLoading = false;
								return;
							}

							let len = allLimitsRes2.data.length;
							const getHasLimits = await this.$api.get(this.baseUrl + '/ticket/employeesalelimits/v1/saleLimitView',{
								pageSize: len,
								page: 1,
								iemployeeid: this.rowData.iemployeeid
							});
							// console.log(getHasLimits);
							if(!getHasLimits) {
								this.isShowLoading = false;
								return;
							}

							// 填充多选表格
	            			this.priceList = allLimitsRes2.data.map(item => {
		                        return {
		                            value: item.icrowdkindpriceid,
		                            label: item.strpricename
		                        }
							});
							// 由于数据库数据混乱，需要过滤掉在[实际所有权限]中不存在的权限
							// 查询出来的所有权限id数组（可能查询出其他额外的不要的数据，所以需要过滤）
		                    let queryLimits = getHasLimits.data.items.map(item => {
		                    	return item.icrowdkindpriceid;
							});
							// 实际的所有权限id数组（以这个为标准去筛选）
							let realLimits = allLimitsRes2.data.map(item => {
		                        return item.icrowdkindpriceid
							});
							this.checkedList = queryLimits.filter(item => {
								return this.$handle.isExist(item,realLimits);
							});
		                    this.currentIndex = 3;
		                    this.isShowLoading = false;
	            			break;
	            		case 9:
	            			this.isDel = true;
	            			break;
	            		case 10:
	            			this.handleLook(this.rowData.isaleslimitsid);
	            			break;
                    }
            	}
            },
            // 查看查询
            async handleLook(queryParams) {
				this.isShowLoading = true;
            	const lookRes = await this.$api.get(this.baseUrl+'/ticket/employeesalelimits/v1/querySaleLimitsList',{
            		isalelimitsId: queryParams
            	});
				// console.log(lookRes);
				if(!lookRes) {
					this.isShowLoading = false;
					return;
				}

            	let { isaleslimitsid, stremployee, strcrowdkindprice } = lookRes.data[0];
            	let lookData = {
            		"营销权限编号：": isaleslimitsid,
					"员工名称：": stremployee,
					"营销权限名称：": strcrowdkindprice,
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
            async handleAddUpdate(val) {
				if(!val.length) {
            		this.$Modal.warning({
                        title: '温馨提示',
                        content: '请至少选择一条记录'
                    });
                    return;
				}
				
            	this.isShowLoading = true;
            	if(this.currentIndex === 2) {
	            	const addRes = await this.$api.post(this.baseUrl+'/ticket/employeesalelimits/v1/insertSalelimit',{
	            		iemployeeId: this.formDatas.iemployeeid,
	            		icrowdkindpriceids: val.join(',')
	            	});
					// console.log(addRes);
					if(!addRes) {
						this.isShowLoading = false;
						return;
					}
	            } else {
	            	const updateRes = await this.$api.put(this.baseUrl+'/ticket/employeesalelimits/v1/updateSalelimit',{
	            		iemployeeId: this.rowData.iemployeeid,
	            		icrowdkindpriceids: val.join(',')
	            	});
					// console.log(updateRes);
					if(!updateRes) {
						this.isShowLoading = false;
						return;
					}
				}
				
				// 重新查询
				// this.watchTotal = 0;
	            const requeryRes = await this.$api.get(this.baseUrl + '/ticket/employeesalelimits/v1/saleLimitView',{
                    pageSize: this.size,
                    page: 1
                });
				// console.log(requeryRes);
				if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `营销权限信息已经${ this.currentIndex === 2 ? '新增' : '修改' }成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
				}

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
				// this.isQuery =false;
				this.QueryBuilder = {
					pageSize: this.size,
                    page: 1
				}
				this.currentPage = 1;
				this.formDatas.iemployeeid = this.nameList[0].value;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `营销权限信息${ this.currentIndex === 2 ? '新增' : '修改' }成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
            },
            // 关闭新增/修改页
            handleClosePage() {
            	this.currentIndex = 1;
            },
            // 执行删除
            async sureEvent() {
            	this.modalLoading =true;
            	const delRes = await this.$api.delete(this.baseUrl + '/ticket/employeesalelimits/v1/deleteSalelimit',{
            		iemployeeId: this.rowData.iemployeeid,
            		icrowdkindpriceid: this.rowData.icrowdkindpriceid
            	});
				// console.log(delRes);
				if(!delRes) {
					this.modalLoading = false;
                	this.isDel = false;
					return;
				}

				// 重新查询
                const requeryRes = await this.$api.get(this.baseUrl+'/ticket/employeesalelimits/v1/saleLimitView',{
                    pageSize: this.size,
                    page: 1
                });
				// console.log(requeryRes);
				if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '营销权限信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
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
				this.formDatas.iemployeeid = this.nameList[0].value;
                this.rowData = null;
                this.modalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '营销权限信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 关闭查看框
            closeModal() {
            	this.currentIndex = 1;
            },
            // 关闭删除确认框
            cancelEvent() {
            	this.isDel = false;
			},
			// 改变每页显示条数
			async changeSize(size) {
				this.size = size;
				this.handleChangePage(1);
			},
			// 两级联动下拉框
			async handleChange(val) {
				if(!val) {
					return ;
				}
				const getEmployees = await this.$api.get(this.baseUrl + '/sys/employee/v1/viewSaleEmployeeSelect',{
					scenicId: val
				});
				// console.log(getEmployees);
				if(!getEmployees) {
					this.nameList = [];
					this.formDatas.iemployeeid = undefined;
					return;
				}

				// 初始化员工下拉列表
				if(getEmployees)
				this.nameList = getEmployees.data.map(item => {
					return {
						value: item.iemployeeid,
						label: item.szemployeename,
					};
				});
				if(!getEmployees.data.length) {
					this.formDatas.iemployeeid = undefined;
				} else {
					this.formDatas.iemployeeid = getEmployees.data[0].iemployeeid;
				}
				
			}
        }
    }
</script>

<style scoped lang="less">

</style>