<template>
	<div id="stationManage">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>站点管理</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
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
                <span v-if="currentIndex ===2">新增站点信息</span>
                <span v-if="currentIndex ===3">修改站点信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatas1"
                :ruleDatas="ruleDatas1"
                :formItemList="formItemList1"
                :isClose="false"
                @getFormData="handleAddUpdate"
                @closeCurrentPage="closeCurrentPage"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 4" class="add-min-height">
            <p slot="title" class="cardTitle">
                <span>查看站点信息</span>
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
                <span>删除站点</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该站点吗？</p>
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
        name: "ticket-station-management",
        data() {
        	const validateCode = (rule, value, callback) => {
        		let reg = /^[0-9A-Z]{1}$/;
        		if(value === '') {
        			callback(new Error('站点代码不能为空'));
        		} else if(!reg.test(value)) {
        			callback(new Error('只能输入一位数字或者大写英文字母'));
        		} else {
        			callback();
        		}
        	};
        	const validatePhone = (rule,value,callback) => {
        		let reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        		if(value === '') {
        			callback(new Error('手机号码不能为空'));
        		} else if(!reg.test(value)) {
        			callback(new Error('请输入11位有效手机号码'));
        		} else {
        			callback();
        		}
        	}
        	return {
                isShowLoading: false,
                isDel: false,
                modalLoading: false,
                isLoading: false,
                isRadio: true,
        		currentIndex: 1,
                total: 0,
                rowData: null,
                initFormDatas1: null,
                providerList: [],
                tableData: [],
                detailList: [],
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
        			// 站点名称
        			szstationname: '',
        			// 服务商id
        			scenics: 0
        		},
        		formDatas1: {
        			// 站点代码
        			szstationcode: '',
        			// 站点名称
        			szstationname: '',
        			// 所属服务商
        			iscenicid: 0,
        			// 联系人
        			szcontact: '',
        			// 联系电话
        			szphone: '',
        			// 实际地址
        			szaddress: '',
        			// 使用状态
        			byisuse: 1,
        			// 站点描述
        			szmemo: ''
        		},
        		ruleDatas1: {
        			szstationcode: [
        				{
        					validator: validateCode, 
        					trigger: 'blur',
                            required: true
        				}
        			],
        			szstationname: [
        				{
        					required: true,
        					message: '输入不能为空！',
        					trigger: 'blur'
        				}
        			],
        			szcontact: [
        				{
        					required: true,
        					message: '输入不能为空！',
        					trigger: 'blur'
        				}
        			],
        			szphone: [
        				{
        					validator: validatePhone,
        					trigger: 'blur',
                            required: true
        				}
        			],
        			szaddress: [
        				{
        					required: true,
        					message: '输入不能为空！',
        					trigger: 'blur'
        				}
        			]
        		},
        		formItemList: [
        			{
        				type: 4,
        				keyName: 'scenics',
                        label: '所属服务商',
                        labelWidth:95,
        				optionList: []
        			},
        			{
        				type: 1,
        				label: '站点名称',
                        keyName: 'szstationname',
                        labelWidth:105
        			}
        		],
        		formItemList1: [
        			{
        				type: 1,
        				keyName: 'szstationcode',
        				label: '站点代码',
        				hasDec: '(注:只能输入一位，可以是数字或者大写英文字母)',
        				isRedDec: true,
        			},
        			{
        				type: 1,
        				keyName: 'szstationname',
        				label: '站点名称',
        			},
        			{
        				type: 4,
        				keyName: 'iscenicid',
        				label: '所属服务商',
        				optionList: []
        			},
        			{
        				type: 1,
        				keyName: 'szcontact',
        				label: '联系人',
        			},
        			{
        				type: 1,
        				keyName: 'szphone',
        				label: '联系电话',
        			},
        			{
        				type: 1,
        				keyName: 'szaddress',
        				label: '实际地址',
        			},
        			{
        				type: 2,
        				keyName: 'byisuse',
        				label: '使用状态',
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
        				label: '站点描述'
        			}
        		],
        		colnames: [
        			{
                        title: '站点ID',
                        minWidth: 90,
                        key: 'iticketstationid'
                    },
                    {
                        title: '站点名称',
                        minWidth: 240,
                        render: (h,params) => {
                        	return h('a',{
                        		on: {
                        			click: () => {
                                        this.handleLook(params.row.iticketstationid);
                        			}
                        		}
                        	},params.row.szstationname);
                        }
                    },
                    {
                        title: '所属服务商',
                        key: 'szscenicname',
                        minWidth: 240
                    },
                    {
                        title: '联系人',
                        key: 'szcontact',
                        minWidth: 140
                    },
                    {
                        title: '实际地址',
                        key: 'szaddress',
                        minWidth: 300
                    },
                    {
                        title: '启用状态',
                        minWidth: 100,
                        render: (h,params) => {
                        	if(params.row.byisuse == 1) {
                        		return h('span','启用');
                        	}
                        	if(params.row.byisuse == 0) {
                        		return h('span',{
                        			style: {
                        				color: 'gray'
                        			}
                        		},'禁用');
                        	}
                        }
                    }
                ],
                size: 10,
                currentPage: 1,
                QueryBuilder: null
        	}
        },
        async created() {
            this.isShowLoading = true;
            this.initFormDatas1 = this.$handle.objDeepCopy(this.formDatas1);

            // 初始化页面 - 获取票务销售服务商并显示所有售票站点信息
            const res = await this.$api.all([
                {
                    url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
                    type: 'get',
                    queryParams: {
                        url: window.location.hostname
                    }
                },
                {
                    url: this.baseUrl + '/ticket/esbticketStation/v1/getlistEsbticket',
                    type: 'get',
                    queryParams: {
                        pageSize: this.size,
                        startIndex: 1
                    }
                }
            ]);
            // console.log(res);
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
                this.formItemList1[2].optionList = filterList;

                // 服务商下拉列表默认选中第一项
                this.formDatas.scenics = filterList[0].value;
            }
            
            this.tableData = res[1].items;
            this.total = res[1].totalCount;
            this.QueryBuilder = {
                pageSize: this.size,
                startIndex: 1
            }
            this.isShowLoading = false;
        },
        methods: {
        	// 带条件查询
        	handleQuery() {
                let queryParams = {           
                    szstationname: this.formDatas.szstationname,
                    scenics: this.formDatas.scenics,
                    startIndex: 1,
                    pageSize: this.size
                }
                this.QueryBuilder = {
                    ...queryParams
                }
                this.currentPage = 1;
        		this.submitForm(queryParams);
        	},
        	// 执行新增/修改
        	async handleAddUpdate() {
                this.isShowLoading = true;   
        		let fData = this.formDatas1;
        		if(this.currentIndex === 2) {
                    const addRes = await this.$api.post(this.baseUrl + '/ticket/esbticketStation/v1/insertEsbticket',{},fData);
                    // console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
        		} else {
                    // 这两个字段必须传
                    fData = Object.assign({},fData,{
                        iticketstationid: this.rowData.iticketstationid,
                        szscenicname: this.rowData.szscenicname
                    });
                    const updateRes = await this.$api.put(this.baseUrl + '/ticket/esbticketStation/v1/updateEsbticket',{},fData);
                    // console.log(updateRes);
                    if(!updateRes) {
                        this.isShowLoading = false;
                        return
                    }
                }

                // 重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/esbticketStation/v1/getlistEsbticket',{
                    pageSize: this.size,
                    startIndex: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `站点信息已经${ this.currentIndex === 2 ? '新增' : '修改' } 成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }
                
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder = {
                    pageSize: this.size,
                    startIndex: 1
                }
                this.currentPage = 1;
                this.formDatas.szstationname = '';
                this.formDatas.scenics = this.providerList[0].value;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `站点信息${ this.currentIndex === 2 ? '添加' : '修改' }，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
        	},
        	// 翻页查询
        	handleChangePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuilder
                }
                queryParams.startIndex = pageNum;
                queryParams.pageSize = this.size;
                this.currentPage = pageNum;
                this.submitForm(queryParams);
        	},
        	// 执行查询
            async submitForm(queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/ticket/esbticketStation/v1/getlistEsbticket',queryParams);
                // console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = res.data.items;
                this.total = res.data.totalCount;
                this.rowData = null;
                this.isLoading = false; 
            },
            // 菜单功能
            async handleOperate(operateNum) {
            	if(operateNum === 7) {
                    this.formDatas1 = this.$handle.objDeepCopy(this.initFormDatas1);
                    this.formDatas1.iscenicid = this.providerList[0].value;
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
                        for(let outter in this.formDatas1) {
                            for(let inner in this.rowData) {
                                if(outter === inner) {
                                    this.formDatas1[outter] = this.rowData[inner];
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
                    if(operateNum === 10) {
                        this.handleLook(this.rowData.iticketstationid);
                        return;
                    }
                }
            },
            // 查看查询
            async handleLook(queryParams) {
                this.isShowLoading = true;
                const res = await this.$api.get(this.baseUrl + '/ticket/esbticketStation/v1/getviewEsbticketById',{
                    iticketstationid: queryParams
                });
                // console.log(res);
                if(!res) {
                    this.isShowLoading = false;
                    return;
                }
                let dataObj = {
                    '站点ID：': res.data.iticketstationid,
                    '站点代码：': res.data.szstationcode,
                    '站点名称：': res.data.szstationname,
                    '所属服务商：': res.data.szscenicname,
                    '联系人：': res.data.szcontact,
                    '联系电话：': res.data.szphone,
                    '实际地址：': res.data.szaddress,
                    '使用状态：': res.data.byisuse ? '启用' : '禁用',
                    '站点描述：': res.data.szmemo,
                };
                // vue v-for遍历对象时不能保证顺序，故下面处理成数组
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
            // 选中一条数据
            handleSelected(rowData) {
            	// console.log(rowData);
            	this.rowData = rowData;
            },
            // 执行删除
            async sureEvent() {
                this.modalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/ticket/esbticketStation/v1/deleteEsbticket',{
                    iticketstationid: this.rowData.iticketstationid
                });
                // console.log(delRes);
                if(!delRes) {
                    this.modalLoading = false;
                    this.isDel = false;
                    return;
                }

                // 重新查询 
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/esbticketStation/v1/getlistEsbticket',{
                    pageSize: this.size,
                    startIndex: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '站点删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
				}

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder = {
                    pageSize: this.size,
                    startIndex: 1
                }
                this.currentPage = 1;
                this.formDatas.szstationname = '';
                this.formDatas.scenics = this.providerList[0].value;
                this.rowData = null;
                this.modalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '站点删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 关闭删除确认框
            cancelEvent() {
                this.isDel = false;
            },
            // 关闭新增/修改/查看页
            closeCurrentPage() {
                this.currentIndex = 1;
            },
            // 改变最大显示页数
            async changeSize(size) {
                this.size = size;
                this.handleChangePage(1);
            },
            // 重置查询表单
            resetForm() {
                this.formDatas.scenics = this.providerList[0].value;
            }
        }
    }
</script>

<style scoped lang="less">

</style>
