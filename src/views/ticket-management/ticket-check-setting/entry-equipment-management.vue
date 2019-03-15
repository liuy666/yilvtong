<template>
	<div id="entryEquipment">
		<template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>准进设备管理</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <detail-form1 
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                @getFormData="handleQuery"
                @listPageSelectedChange="handleProviderChange"
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
        <Card v-show="currentIndex === 2 || currentIndex === 3">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex ===2">新增准进设备</span>
                <span v-if="currentIndex ===3">修改准进设备</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatasAddUpdate"
                :ruleDatas="ruleDatasAddUpdate"
                :formItemList="formItemListAddUpdate"
                :isClose="false"
                @getFormData="handleAddUpdate"
                @closeCurrentPage="closeCurrentPage"
                @selectedChange="handleProviderChangeAdd"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 4">
            <p slot="title" class="cardTitle">
                <span>查看准进设备</span>
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
                <span>删除准进设备</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该准进设备吗？</p>
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
        name: "entry-equipment-management",
        data() {
			const typeId = (rule, value, callback) => {
				if (value === undefined) {
                    callback(new Error('准进设备类型不能为空'));
                } else {
                    callback();
                }
			}
			const gardenId = (rule, value, callback) => {
				if (value === undefined) {
                    callback(new Error('所属园门不能为空'));
                } else {
                    callback();
                }
			}
        	return {
        		isShowLoading: false,
        		isDel:false,
                isModalLoading: false,
                isRadio: true,
        		isLoading: false,
        		// isQuery: false,
        		currentIndex: 1,
        		total: 0,
				// watchTotal: 0,
				currentPage: 1,
        		rowData: null,
                initAdd: null,
                detailList: [],
                tableData: [],
                providerList: [],
                gardenList: [],
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
        			iscenicid: undefined,
        			igardengateid: undefined,
        		},
        		formDatasAddUpdate: {
        			iscenicid: 0,
        			igardengateid: 0,
        			iequiptypeid: 0,
        			szaccessequipcode: '',
        			szaccessequipname: '',
        			szipaddress: '',
        			// isa: '',
        			byisuse: 0,
        			szmemo: ''
        		},
        		ruleDatasAddUpdate: {
        			szaccessequipcode: [
						{
							required: true,
							message: '准进设备代码不能为空',
							trigger: 'blur'
						}
					],
        			szaccessequipname: [
						{
							required: true,
							message: '准进设备名称不能为空',
							trigger: 'blur'
						}
					],
        			szipaddress: [
						{
							required: true,
							message: 'MAC地址不能为空或格式不正确',
							trigger: 'blur'
						}
					],
					igardengateid: [
						{
							required: true,
							validator: gardenId,
							trigger: 'select'
						}
					],
					iequiptypeid: [
						{
							required: true,
							validator: typeId,
							trigger: 'select'
						}
					],
					// isa: [
					// 	{
					// 		required: true,
					// 		message: '指纹特征值不能为空',
					// 		trigger: 'blur'
					// 	}
					// ]
        		},
        		formItemList: [
        			{
        				type: 4,
        				keyName: 'iscenicid',
        				label: '选择服务商',
        				selectEvent: true,
        				optionList: []
        			},
        			{
        				type: 4,
        				keyName: 'igardengateid',
        				label: '选择所属园门',
        				optionList: []
        			}
        		],
        		formItemListAddUpdate: [
        			{
        				type: 4,
        				keyName: 'iscenicid',
        				label: '所属服务商',
        				disabled: false,
        				selectEvent: true,
        				optionList: []
        			},
        			{
        				type: 4,
        				keyName: 'igardengateid',
        				label: '所属园门',
        				disabled: false,
        				optionList: []
        			},
        			{
        				type: 4,
        				keyName: 'iequiptypeid',
        				label: '准进设备类型',
        				optionList: []
        			},
        			{
        				type: 1,
        				label: '准进设备代码',
        				keyName: 'szaccessequipcode'
        			},
        			{
        				type: 1,
        				label: '准进设备名称',
        				keyName: 'szaccessequipname'
        			},
        			{
        				type: 1,
        				label: 'MAC地址',
        				keyName: 'szipaddress'
        			},
        			// {
        			// 	type: 1,
        			// 	label: '指纹特征值',
        			// 	keyName: 'isa'
        			// },
        			{
        				type: 2,
        				keyName: 'byisuse',
        				label: '启用状态',
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
        				type: 7,
        				keyName: 'szmemo',
        				label: '备注'
        			}
        		],
        		colnames: [
        			{
                        title: '准进设备编号',
                        width: 120,
                        key: 'iaccessequipid',
                    },
                    {
                        title: '准进设备代码',
                        minWidth: 170,
                        key: 'szaccessequipcode',
                    },
                    {
                        title: '准进设备名称',
                        minWidth: 200,
                        key: 'szaccessequipname',
                    },
                    {
                        title: '所属服务商',
                        minWidth: 200,
                        key: 'striscenicid',
                    },
                    {
                        title: '所属园门',
                        minWidth: 210,
                        key: 'strigardengateid',
                    },
                    {
                        title: 'MAC地址',
						key: 'szipaddress',
						width: 180
                    },
                    // {
                    //     title: '指纹特征值',
                    //     width: 100,
                    //     key: 'isa',
                    // },
                    {
                        title: '启用状态',
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
				size: 10,
				// 保存上一次查询的条件
				QueryBuilder: null
        	}
        },
        async created() {
        	this.isShowLoading = true;
        	this.initAdd = this.$handle.objDeepCopy(this.formDatasAddUpdate);
        	/* 
        		(1) 获取当前登录用户所管理的服务商下拉列表
        		(2) 准进设备分页列表查询
        	*/
        	const initRes = await this.$api.all([
        		{
        			type: 'get',
					url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
					queryParams: {
						url: window.location.hostname
					}
        		},
        		{
        			type: 'get',
        			url: this.baseUrl + '/ticket/accessequip/v1/list',
        			queryParams: {
        				pageSize: this.size,
        				page: 1
        			}
        		}
        	]);
			// console.log(initRes);
            if(!initRes) {
                this.isShowLoading = false;
                return;
			}
			
			let filterList = [],
                pList = initRes[0];
            if(!pList.length || (pList.length === 1 && pList[0].szscenicname === '所有服务商')) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '该景区企业下暂无服务商，请先创建服务商，'
                });
            } else {
				// 去掉所有服务商选项，因为它没有下属园门
				filterList = pList.filter(item => {
					return item.szscenicname !== '所有服务商';
				});

				// 根据景区id获取园门下拉列表，默认取第一个景区id去查询，用于新增页初始化
				const gardenListRes = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/gateSelect/' + filterList[0].iscenicid);
				// console.log(gardenListRes);
				if(!gardenListRes) {
					this.isShowLoading = false;
					return;
				}

				// 页面表单初始化
				let providerList = filterList.map(item => {
					return {
						value: item.iscenicid,
						label: item.szscenicname
					}
				});
				this.providerList = providerList;
				this.formItemList[0].optionList = providerList;
				// this.formDatas.iscenicid =  providerList[0].value;

				// 这里只是第一个景区（服务商）的园门列表，用作初始化页面用，如果查询为空数组则查询表单用默认值
				if(gardenListRes.data.length > 0) {
					this.gardenList = gardenListRes.data.map(item => {
						return {
							value: item.igardengateid,
							label: item.szgardengatename
						}
					});
				}
			}

        	this.tableData =  initRes[1].items;
			this.total = initRes[1].totalCount;
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
				let queryParams = {
        			pageSize: this.size,
        			page: 1
				}
				// 如果服务商或园门id为undefined，则查询时不传
				if(this.formDatas.igardengateid !== undefined) {
					queryParams['igardengateid'] = this.formDatas.igardengateid;
				}
				if(this.formDatas.iscenicid !== undefined) {
					queryParams['iscenicid'] = this.formDatas.iscenicid;
				}
				this.QueryBuilder = {
					...queryParams
				}
				this.currentPage = 1;
				// console.log(queryParams);
				this.sendRequest(queryParams);
        	},
        	// 翻页查询
        	handleChangePage(pageNum) {
				let queryParams = {
					...this.QueryBuilder
				}
				queryParams.page = pageNum;
				queryParams.pageSize = this.size;
				this.currentPage = pageNum;
				// console.log(queryParams);
				this.sendRequest(queryParams);
        	},
        	// 执行查询
        	async sendRequest(queryParams) {
				this.isLoading = true;
        		const res = await this.$api.get(this.baseUrl + '/ticket/accessequip/v1/list',queryParams);
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
				// this.currentPage = pageNum;
				this.rowData = null;
        		this.isLoading = false;
        	},
        	// 选中一条数据
        	handleSelected(rowData) {
        		// console.log(rowData);
            	this.rowData = rowData;
        	},
        	// 菜单功能
        	async handleOperate(operateNum) {
        		if(operateNum === 7) {
        			this.isShowLoading = true;
                    this.formItemListAddUpdate[0].disabled = false;
                    this.formItemListAddUpdate[1].disabled = false;
					this.formDatasAddUpdate = this.$handle.objDeepCopy(this.initAdd);
					
					this.formItemListAddUpdate[0].optionList = this.providerList;
					this.formDatasAddUpdate.iscenicid = this.providerList[0].value;
					this.handleProviderChangeAdd(this.providerList[0].value);
        			this.currentIndex = 2;
        			this.isShowLoading = false;
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
							this.isShowLoading = true;
        					this.formItemListAddUpdate[0].optionList = this.providerList;
        					const preUpdateRes = await this.$api.all([
        						{
        							'url': this.baseUrl + '/ticket/gardengate/v1/gateSelect/' + this.rowData.iscenicid,
        							'type': 'get'
        						},
        						{
        							'url': this.baseUrl + '/ticket/accessequip/v1/equiptypeSelect/' + this.rowData.iscenicid,
        							'type': 'get'
        						}
        					]);
							// console.log(preUpdateRes);
							if(!preUpdateRes) {
								this.isShowLoading = false;
								return;
							}

							// 判断查找的'园门列表'是否为空数组
							if(preUpdateRes[0].length > 0) {
								this.formItemListAddUpdate[1].optionList = preUpdateRes[0].map(item => {
									return {
										value: item.igardengateid,
										label: item.szgardengatename
									}
								});
								this.formDatasAddUpdate.igardengateid = preUpdateRes[0][0].igardengateid;
							} else {
								this.formItemListAddUpdate[1].optionList = [];
								this.formDatasAddUpdate.igardengateid = undefined;
							}
							
							// 判断查找的'准进设备类型列表'是否为空数组
							if(preUpdateRes[1].length > 0) {
								this.formItemListAddUpdate[2].optionList = preUpdateRes[1].map(item => {
									return {
										value: item.iequiptypeid,
										label: item.szequiptypename
									}
								});
								this.formDatasAddUpdate.iequiptypeid = preUpdateRes[1][0].iequiptypeid;
							} else {
								this.formItemListAddUpdate[2].optionList = [];
								this.formDatasAddUpdate.iequiptypeid = undefined;
							}
				
        					this.formItemListAddUpdate[0].disabled = true;
                    		this.formItemListAddUpdate[1].disabled = true;
        					for(let outter in this.formDatasAddUpdate) {
	                            for(let inner in this.rowData) {
	                                if(outter === inner) {
	                                    this.formDatasAddUpdate[outter] = this.rowData[inner];
	                                    break;
	                                }
	                            }
							}
							// 值为数字  不能通过ivew表单验证（UI框架的问题）
							this.formDatasAddUpdate.isa = String(this.rowData.isa);
							this.currentIndex = 3;
							this.isShowLoading = false;
                    		break;
                    	case 9:
                    		this.isDel = true;
                    		break;
                    	case 10:
                    	 	this.handleLook(this.rowData.iaccessequipid);
                    		break;
                    }
        		}
        	},
        	// 查看查询
        	async handleLook(queryParams) {
				this.isShowLoading = true;
        		const lookRes = await this.$api.get(this.baseUrl+'/ticket/accessequip/v1/detail/' + queryParams);
				// console.log(lookRes);
				if(!lookRes) {
					this.isShowLoading = false;
					return;
				}
				
                // 处理成中文字段
                let lookData = {
                	"所属园门：": lookRes.data.strigardengateid,
                	"所属服务商：": lookRes.data.striscenicid,
                	"准进设备类型：": lookRes.data.striequiptypeid,
                	"准进设备代码：": lookRes.data.szaccessequipcode,
                	"准进设备名称：": lookRes.data.szaccessequipname,
                	"IP地址：": lookRes.data.szipaddress,
                	"机芯类型：": lookRes.data.bycoretype,
                	"控制方向：": lookRes.data.byctrldir,
                	"工作模式：": lookRes.data.byworkmode,
                	"网络方式：": lookRes.data.bynetworkmode,
                	"启用状态：": lookRes.data.byisuse ? '启用' : '禁用',
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
        	// 切换服务商
        	async handleProviderChange(val) {
				// 点击重置后服务商下拉框的值为undefined，所以此处必须明确判断是否为undefined，用于阻止查询
				if(val === undefined) {
					return;
				}
				const gardenRes = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/gateSelect/' + val);
				// console.log(gardenRes);
				if(!gardenRes) {
					return;
				}

				if(gardenRes.data.length > 0) {
					this.formItemList[1].optionList = gardenRes.data.map(item => {
						return {
							value: item.igardengateid,
							label: item.szgardengatename
						}
					});
					this.formDatas.igardengateid = gardenRes.data[0].igardengateid;
				} else { // 如果没有下属园门，则设定园门id为undefined
					this.formItemList[1].optionList = [];
					this.formDatas.igardengateid = undefined;
				}
        	},
        	// 新增页切换服务商
        	async handleProviderChangeAdd(val) {
        		const getSelectLists = await this.$api.all([
        			{
        				url: this.baseUrl + '/ticket/gardengate/v1/gateSelect/' + val,
        				type: 'get'
        			},
        			{
        				url: this.baseUrl + '/ticket/accessequip/v1/equiptypeSelect/' + val,
        				type: 'get'
        			}
        		]);
				// console.log(getSelectLists);
				if(!getSelectLists) {
					return;
				}

				// 判断查找的'园门列表'是否为空数组
				if(getSelectLists[0].length > 0) {
					this.formItemListAddUpdate[1].optionList = getSelectLists[0].map(item => {
						return {
							value: item.igardengateid,
							label: item.szgardengatename
						}
					});
					this.formDatasAddUpdate.igardengateid = getSelectLists[0][0].igardengateid;
				} else {
					this.formItemListAddUpdate[1].optionList = [];
					this.formDatasAddUpdate.igardengateid = undefined;
				}
				
				// 判断查找的'准进设备类型列表'是否为空数组
				if(getSelectLists[1].length > 0) {
					this.formItemListAddUpdate[2].optionList = getSelectLists[1].map(item => {
						return {
							value: item.iequiptypeid,
							label: item.szequiptypename
						}
					});
					this.formDatasAddUpdate.iequiptypeid = getSelectLists[1][0].iequiptypeid;
				} else {
					this.formItemListAddUpdate[2].optionList = [];
					this.formDatasAddUpdate.iequiptypeid = undefined;
				}
        	},
        	// 执行新增/修改
        	async handleAddUpdate () {
        		this.isShowLoading = true;
        		// this.watchTotal = 0; // 强制触发页码更新
        		let bodyParams = this.formDatasAddUpdate;
        		bodyParams = {
        			...bodyParams,
        			id: {
        				igardengateid: bodyParams.igardengateid,
        				iscenicid: bodyParams.iscenicid
        			},
                    bycoretype: '0001',     // 机械机芯
                    byctrldir: '0001',     // 只出
                    bynetworkmode: '0002',     // 在线
                    byworkmode: '0001'   // 常规
				};
				// 新增
        		if(this.currentIndex === 2) {
        			const addRes = await this.$api.post(this.baseUrl + '/ticket/accessequip/v1/add',{},bodyParams);
					// console.log(addRes);
					if(!addRes) {
						this.isShowLoading = false;
						return;
					}
        		} else { // 修改
                    bodyParams = {
                        ...bodyParams,
                        iaccessequipid: this.rowData.iaccessequipid,
                        szgateway: '255.255.255.0'
                    };
        			bodyParams.id = {
        				...bodyParams.id,
        				iaccessequipid: this.rowData.iaccessequipid
        			};
        			const updateRes = await this.$api.post(this.baseUrl+'/ticket/accessequip/v1/update',{},bodyParams);
					// console.log(updateRes);
					if(!updateRes) {
						this.isShowLoading = false;
						return;
					}
        		}
				// console.log(bodyParams);
				
				// 重新查询
        		const requeryRes = await this.$api.get(this.baseUrl + '/ticket/accessequip/v1/list',{
                    pageSize: this.size,
        			page: 1
                });
				// console.log(requeryRes);
				if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: (this.currentIndex === 2 ? '新增' : '修改') + '准进设备已经成功，但重新查询时遇到异常，请手动刷新后查看'
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
				this.resetAfterupdate();
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: (this.currentIndex === 2 ? '新增' : '修改') + '准进设备成功，欢迎使用易旅通智慧景区系统'
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
        		const delRes = await this.$api.delete(this.baseUrl + '/ticket/accessequip/v1/delete/' + this.rowData.iaccessequipid);
				// console.log(delRes);
				if(!delRes) {
					this.isModalLoading = false;
					this.isDel = false;
					return;
				}

				// 重新查询
        		const requeryRes = await this.$api.get(this.baseUrl + '/ticket/accessequip/v1/list',{
                    pageSize: this.size,
        			page: 1
                });
				// console.log(requeryRes);
				if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '准进设备信息删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
				}

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
				// this.watchTotal = requeryRes.data.totalCount;
				this.QueryBuilder = {
					pageSize: this.size,
        			page: 1
				}
				this.currentPage = 1;
				this.resetAfterupdate();
                // this.isQuery = false;
                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '准进设备信息删除成功，欢迎使用易旅通智慧景区系统'
                });
			},
			// 新增/修改/删除后重置查询条件
			resetAfterupdate() {
				this.formDatas.iscenicid = undefined;
				this.formDatas.igardengateid = undefined;
			},
        	// 关闭删除确认框
        	cancelEvent() {
        		this.isDel = false;
			},
			// 重置查询表单
			resetForm() {
				this.formItemList[1].optionList = [];
			},
			// 改变最大显示数
			async changeSize(size) {
				this.size = size;
				// console.log(this.size);
				this.handleChangePage(1);
			}
        }
    }
</script>

<style scoped>

</style>
