<template>
	<div id="checkTicket">
		<template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>检票规则管理</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <Form ref="simpleForm" :model="formDatas" inline>
		        <FormItem label="所属服务商:" :label-width="90">
		            <Select v-model="formDatas.iscenicid" style="width:200px">
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
                @changePage="handleChangePage"
                @selected="handleSelected"
                @changePageSize="changeSize"></radioTable>            
        </Card>
		<Card v-show="currentIndex === 2 || currentIndex === 3">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex ===2">新增检票规则信息</span>
                <span v-if="currentIndex ===3">修改检票规则信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatasAddUpdate"
                :ruleDatas="ruleDatasAddUpdate"
                :formItemList="formItemListAddUpdate"
                :isClose="false"
                @getFormData="handleSaveData"
                @closeCurrentPage="closeCurrentPage"
                @selectedChange="handleProviderChangeAdd"></detail-form1>
                <!-- @reduceSelect="reduceSelect"
                @increaseSelect="increaseSelect" -->
        </Card>
        <Card v-show="currentIndex === 4">
            <p slot="title" class="cardTitle">
                <span>查看检票规则信息</span>
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
                <span>删除检票规则信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该检票规则信息吗？</p>
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
        name: "check-setting-management",
        data() {
            const validateTimes = (rule, value, callback) => {
                if(value === '' || value === undefined) {
                    callback(new Error('限制总通过次数不能为空'));
                } else {
                    callback();
                }
            }
            const validateInterval = (rule, value, callback) => {
                if(value === '' || value === undefined) {
                    callback(new Error('检票间隔时间(秒)不能为空'));
                } else {
                    callback();
                }
            }
        	return {
                // mock
                // mock: {
                //     keyName: 'select1',
                //     optionList: [
                //         { 
                //             value: 1,
                //             label: '预案01'
                //         },
                //         {
                //             value: 2,
                //             label: '预案02'
                //         }
                //     ]
                // },
        		isShowLoading: false,
                isRadio: true,
                isLoading: false,
                // isQuery: false,
                isDel: false,
                isModalLoading: false,
        		currentIndex: 1,
                total: 0,
                // watchTotal: 0,
                initAdd: null,
                rowData: null,
                detailList: [],
                tableData: [],
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
        		formDatas: {
        			iscenicid: 0
        		},
        		colnames: [
        			{
                        title: '园门名称',
                        minWidth: 170,
                        render: (h,params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                        this.handleLook(params.row.iwicketsetid);
                                    }
                                }
                            },params.row.szgardengatename);
                        }
                    },
                    {
                        title: '产品名称',
                        minWidth: 310,
                        key: 'sztickettypename',
                    },
                    {
                        title: '子产品名称',
                        minWidth: 310,
                        key: 'szticketname',
                    },
                    {
                        title: '消费方式',
                        minWidth: 90,
                        key: 'byconsumemode',
                    },
                    // {
                    //     title: '检票前置条件',
                    //     minWidth: 120,
                    //     key: 'msingleconsume',
                    //     render: (h,params) => {
                    //         let txt = ''
                    //         switch(params.row.msingleconsume) {
                    //             case 0:
                    //                 txt = '无';
                    //                 break;
                    //             case 1:
                    //                 txt = '单号检票';
                    //                 break;
                    //             case 2:
                    //                 txt = '双号检票';
                    //                 break;
                    //             default:
                    //                 break;
                    //         }
                    //         return h('span',txt);
                    //     }
                    // },
                    {
                        title: '检票控制方式',
                        minWidth: 120,
                        key: 'bywicketctrltype',
                    },
                    {
                        title: '检票通行方式',
                        minWidth: 120,
                        key: 'bywicketconsumetype',
                    },
                    {
                        title: '身份识别类型',
                        minWidth: 140,
                        key: 'byregfingerprinttype',
                    },
                    {
                        title: '启用分时预约检票',
                        minWidth: 140,
                        render: (h,params) => {
                        	if(params.row.issettimeticket == 0) {
                        		return h('span','否');
                        	} else if(params.row.byisuse == 1) {
                        		return h('span','是');
                        	}
                        }
                    },
                    {
                        title: '分时预约检票设置',
                        minWidth: 190,
                        render: (h,params) => {
                        	if(params.row.istimeticket == 0) {
                        		return h('span','不限制');
                        	}
                        	if(params.row.istimeticket == 1) {
                        		return h('span','检票时间不可提前不可延后');
                        	}
                        	if(params.row.istimeticket == 2) {
                        		return h('span','检票时间可提前但不能延后');
                        	}
                        	if(params.row.istimeticket == 3) {
                        		return h('span','检票时间不可提前但可延后');
                        	}
                        	if(params.row.istimeticket == 4) {
                        		return h('span','检票时间可提前可延后');
                        	}
                        }
                    },
                    {
                        title: '使用状态',
                        width: 90,
                        render: (h,params) => {
                        	if(params.row.byisuse == 1) {
                        		return h('span','启用');
                        	}
                        	if(params.row.byisuse == 0) {
                        		return h('span','禁用');
                        	}
                        }
                    }
        		],
        		btnRefresh: [
        			{
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatasAddUpdate: {
                	itickettypeid: '', // 产品id
                	izticktypeid: '', // 子产品id
                	igardengateid: '', // 园门id
                	ilimittotaltimes: '', // 限制总通过次数
                	byconsumemode: '', // 消费方式
                	itimeinterval: '', // 检票间隔时间(秒)
                	// msingleconsume: '', // 检票前置条件
                    bywicketctrltype: '', // 检票控制方式
                    bywicketconsumetype: '', // 检票通行方式
                    byregfingerprinttype: '', // 身份识别类型
                    // byusage: 0,
                	byticketnodeal: '', // 票号处理
                	byisuse: 1, // 使用状态
                	issettimeticket: 0, // 是否启用分时检票
                	istimeticket: 1, // 分时预约检票设置
                    // selectGroup: [ // 入园预案
                    //     { select1: 1 }
                    // ],
                    // bispersontimestat: 0,
                    // byuselimit: 0
                },
                ruleDatasAddUpdate: {
                    ilimittotaltimes: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: validateTimes
                        }
                    ],
                    itimeinterval: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: validateInterval
                        }
                    ]
                },
                formItemListAddUpdate: [
                	{
        				type: 4,
        				keyName: 'itickettypeid',
        				label: '产品名称',
        				disabled: false,
                        selectEvent: true,
                        customeWidth: '400px',
        				optionList: []
        			},
        			{
        				type: 4,
        				keyName: 'izticktypeid',
        				label: '子产品名称',
        				disabled: false,
        				hasDec: '',
                        isRedDec: true,
                        customeWidth: '400px',
                        optionList: []
        			},
        			{
        				type: 4,
        				keyName: 'igardengateid',
        				label: '园门名称	',
        				disabled: false,
                        optionList: []
        			},
        			{
        				type: 1,
        				keyName: 'ilimittotaltimes',
        				label: '限制总通过次数',
        				hasDec: '(注：0表示为无限次)',
        				isRedDec: true
        			},
        			{
        				type: 4,
        				keyName: 'byconsumemode',
        				label: '消费方式',
                        optionList: [],
                        disabled: true
        			},
        			{
        				type: 1,
        				keyName: 'itimeinterval',
        				label: '检票间隔时间(秒)'
        			},
        			// {
        			// 	type: 4,
        			// 	keyName: 'msingleconsume',
        			// 	label: '检票前置条件',
                    //     optionList: []
        			// },
        			{
        				type: 4,
        				keyName: 'bywicketctrltype',
        				label: '检票控制方式',
                        optionList: [],
                        disabled: true
                    },
                    {
                        type: 4,
                        keyName: 'bywicketconsumetype',
                        label: '检票通行方式',
                        optionList: []
                    },
                    {
                        type: 4,
                        keyName: 'byregfingerprinttype',
                        label: '身份识别类型',
                        optionList: []
                    },
                    // {
                    //     type: 4,
                    //     keyName: 'byusage',
                    //     label: '检票方式  ',
                    //     optionList: [
                    //         {
                    //             value: 0,
                    //             label: '一票一人'
                    //         },
                    //         {
                    //             value: 1,
                    //             label: '一票多人'
                    //         }
                    //     ]
                    // }, 
                    // {
                    //     type: 'selectGroup',
                    //     label: '入园验证预案',
                    //     configList: [
                    //         {
                    //             keyName: 'select1',
                    //             optionList: [
                    //                 { 
                    //                     value: 1,
                    //                     label: '预案01'
                    //                 },
                    //                 {
                    //                     value: 2,
                    //                     label: '预案02'
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // },
        			{
        				type: 4,
        				keyName: 'byticketnodeal',
        				label: '票号处理',
                        optionList: []
        			},
                    // {
                    //     type: 1,
                    //     label: '有效天数',
                    //     keyName: 'validityday'
                    // },
                    // {
                    //     type: 4,
                    //     keyName: 'byuselimit',
                    //     label: '使用方式',
                    //     optionList: [
                    //         {
                    //             value: 0,
                    //             label: '一次性'
                    //         },
                    //         {
                    //             value: 1,
                    //             label: '长期性'
                    //         }
                    //     ]
                    // },
        			{
        				type: 2,
        				keyName: 'byisuse',
        				label: '使用状态',
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
        				type: 2,
        				keyName: 'issettimeticket',
        				label: '是否启用分时检票',
        				optionList: [
        					{
        						value: 0,
        						labelName: '否'
        					},
        					{
        						value: 1,
        						labelName: '是'
        					}
        				]
        			},
        			{
        				type: 2,
        				keyName: 'istimeticket',
        				label: '分时预约检票设置',
        				optionList: [
        					{
        						value: 1,
                                disabled: false,
        						labelName: '检票时间不可提前不可延后'
        					},
        					{
        						value: 2,
                                disabled: false,
        						labelName: '检票时间可提前但不能延后'
        					},
        					{
        						value: 3,
                                disabled: false,
        						labelName: '检票时间不可提前但可延后'
        					},
        					{
        						value: 4,
                                disabled: false,
        						labelName: '检票时间可提前可延后'
        					}
        				]
        			},
                    // {
                    //     type: 2,
                    //     keyName: 'bispersontimestat',
                    //     label: '是否参与入园统计',
                    //     optionList: [
                    //         {
                    //             value: 0,
                    //             labelName: '否'
                    //         },
                    //         {
                    //             value: 1,
                    //             labelName: '是'
                    //         }
                    //     ]
                    // }
                ],
                size: 10,
                QueryBuild: null,
                currentPage: 1
        	}
        },
        computed: {
            // len() {
            //     return this.formItemListAddUpdate[9].configList.length;
            // }
        },
        async created() {
        	this.isShowLoading = true;
            this.initAdd = this.$handle.objDeepCopy(this.formDatasAddUpdate);
            // 获取服务商列表和初始化查询
        	const initRes = await this.$api.all([
        		{
        			type: 'get',
        			url: this.baseUrl + '/ticket/opwwicketSet/v1/list',
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

            if(!initRes) {
                this.isShowLoading = false;
                return;
            }

            let filterList = [],
                pList = initRes[1];
            if(!pList.length || (pList.length === 1 && pList[0].szscenicname === '所有服务商')) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '该景区企业下暂无服务商，请先创建服务商，'
                });
            } else {
                // 去掉所有服务商选项
                filterList = pList.filter(item => {
                    return item.szscenicname !== '所有服务商';
                });

                this.providerList = filterList.map(item => {
                    return {
                        value:item.iscenicid,
                        label: item.szscenicname
                    }
                });
                this.formDatas.iscenicid = filterList[0].iscenicid;
            }

        	this.tableData = initRes[0].items;
            this.total = initRes[0].totalCount;
            this.QueryBuild = {
                pageSize: this.size,
        		page: 1
            }
            this.currentPage = 1;
        	this.isShowLoading = false;
        },
        methods: {
            // 菜单功能
        	async handleOperate(operateNum) {
                let length = this.formItemListAddUpdate.length;
        		if(operateNum === 7) {
        			this.isShowLoading = true;
                    this.formItemListAddUpdate[0].disabled = false;
                    this.formItemListAddUpdate[1].disabled = false;
                    this.formItemListAddUpdate[2].disabled = false;
                    this.formItemListAddUpdate[length - 1].optionList.forEach(item => {
                        item.disabled = false;                            
                    });
                    this.formItemListAddUpdate[1].hasDec = '(注:产品是基本票时,显示为基本票;当是组合票时,下拉显示的是组合票中的基本票)';
                    this.formDatasAddUpdate = this.$handle.objDeepCopy(this.initAdd);
                    this.gotoAddUpdate(operateNum);
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
                            this.formItemListAddUpdate[0].disabled = true;
                            this.formItemListAddUpdate[1].disabled = true;
                            this.formItemListAddUpdate[2].disabled = true;
                            this.formItemListAddUpdate[length - 1].optionList.forEach(item => {
                                if(!this.rowData.istimeticket) {
                                    item.disabled = true;
                                } else {
                                    item.disabled = false;
                                }                                
                            });
                            this.formItemListAddUpdate[1].hasDec = '';
                            this.gotoAddUpdate(operateNum);
                    		break;
                    	case 9:
                    		this.isDel = true;
                    		break;
                    	case 10: 
                    		this.handleLook(this.rowData.iwicketsetid);
                    		break;
                    }
        		}
	        },
            // 进入新增/修改预查询
            async gotoAddUpdate(operateNum) {
                const preAddRes = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/preAdd');
                // console.log(preAddRes);
                if(!preAddRes) {
                    this.isShowLoading = false;
                    return;
                }

                // 消费方式-只取次数这项
                let filterList = preAddRes.data.xfList.filter(item => {
                    return item.pmva === '次数';
                });
                this.formItemListAddUpdate[4].optionList = filterList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });
                
                // 检票前置条件
                // this.formItemListAddUpdate[6].optionList = preAddRes.data.jpqzList.map(item => {
                //     return {
                //         value: item.pmcd,
                //         label: item.pmva
                //     }
                // });
                // 检票控制方式-只取平台检票这项
                let filterList2 = preAddRes.data.jpList.filter(item => {
                    return item.pmva === '平台检票';
                })
                this.formItemListAddUpdate[6].optionList = filterList2.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });
                // 检票通行方式	
                this.formItemListAddUpdate[7].optionList = preAddRes.data.kpList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });
                // 身份识别类型--只留 无和票+身份证
                let filterList3 = preAddRes.data.sfList.filter(item => {
                    return item.pmva === '无' || item.pmva === '票+身份证';
                })
                this.formItemListAddUpdate[8].optionList = filterList3.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });
                // 票号处理
                this.formItemListAddUpdate[9].optionList = preAddRes.data.phList.map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });

                // 新增
                if(operateNum === 7) {
                    // 根据下拉框当前服务商id 获取产品列表
                    const getProductList = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/getlistEdmticket',{
                        iscenicid: this.formDatas.iscenicid
                    });
                    // console.log(getProductList);
                    if(!getProductList) {
                        this.isShowLoading = false;
                        return;
                    }

                    // 根据下拉框当前服务商id 获取园门列表
                    const gardenList = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/gateSelect/' + this.formDatas.iscenicid);
                    // console.log(gardenList);
                    if(!gardenList) {
                        this.isShowLoading = false;
                        return;
                    }
                    if(!gardenList.data.length) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '你选择的景区服务商还没有添加园门，不能新增检票规则！'
                        });
                        this.isShowLoading = false;
                        return;
                    }

                    let productList = JSON.parse(getProductList.data);
                    // console.log(productList);

                    // 产品列表初始化
                    this.formItemListAddUpdate[0].optionList = productList.map(item => {
                        return {
                            value: item.itickettypeid,
                            label: item.sztickettypename
                        }
                    });

                    // 园门列表初始化
                    this.formItemListAddUpdate[2].optionList = gardenList.data.map(item => {
                        return {
                            value: item.igardengateid,
                            label: item.szgardengatename
                        }
                    });

                    // 子产品列表初始化
                    let isSuccess = this.handleProviderChangeAdd(productList[0].itickettypeid);
                    if(!isSuccess) {
                        this.isShowLoading = false;
                        return;
                    }

                    // 下拉列表表单初始化赋值
                    this.formDatasAddUpdate.itickettypeid = productList[0].itickettypeid; // 产品
                    this.formDatasAddUpdate.igardengateid = gardenList.data[0].igardengateid; // 园门           
                    this.formDatasAddUpdate.byconsumemode = filterList[0].pmcd; // 消费方式
                    // this.formDatasAddUpdate.msingleconsume = preAddRes.data.jpqzList[0].pmcd; // 检票前置条件
                    this.formDatasAddUpdate.bywicketctrltype = filterList2[0].pmcd; // 检票控制方式
                    this.formDatasAddUpdate.bywicketconsumetype = preAddRes.data.kpList[0].pmcd; // 检票通行方式
                    this.formDatasAddUpdate.byregfingerprinttype = filterList3[0].pmcd; // 身份识别类型
                    this.formDatasAddUpdate.byticketnodeal = preAddRes.data.phList[0].pmcd; // 票号处理
                    this.currentIndex = 2;
                }

                // 修改
                if(operateNum === 8) {
                    // 根据选中行服务商id 获取产品列表
                    const getProductList2 = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/getlistEdmticket',{
                        iscenicid: this.rowData.iscenicid
                    });
                    // console.log(getProductList2);
                    if(!getProductList2) {
                        this.isShowLoading = false;
                        return;
                    }

                    // 根据选中行服务商id 获取园门列表
                    const gardenList2 = await this.$api.get(this.baseUrl + '/ticket/gardengate/v1/gateSelect/' + this.rowData.iscenicid);
                    // console.log(gardenList2);
                    if(!gardenList2) {
                        this.isShowLoading = false;
                        return;
                    }
                    if(!gardenList2.data.length) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '你选择的景区服务商还没有添加园门，不能修改检票规则！'
                        });
                        this.isShowLoading = false;
                        return;
                    }

                    let productList2 = JSON.parse(getProductList2.data);
                    // console.log(productList2);

                    // 产品列表初始化
                    this.formItemListAddUpdate[0].optionList = productList2.map(item => {
                        return {
                            value: item.itickettypeid,
                            label: item.sztickettypename
                        }
                    });

                    // 园门列表初始化
                    this.formItemListAddUpdate[2].optionList = gardenList2.data.map(item => {
                        return {
                            value: item.igardengateid,
                            label: item.szgardengatename
                        }
                    });

                    let isSuccess = this.handleProviderChangeAdd(this.rowData.itickettypeid);
                    if(!isSuccess) {
                        this.isShowLoading = false;
                        return;
                    }
                    this.formDatasAddUpdate.itickettypeid = String(this.rowData.itickettypeid); // 产品
                    /**
                     * 修改时在这里用当前选中行数据的子产品id去初始化子产品
                     */
                    this.formDatasAddUpdate.izticktypeid = String(this.rowData.izticktypeid); // 子产品
                    this.formDatasAddUpdate.igardengateid = this.rowData.igardengateid; // 园门           
                    this.formDatasAddUpdate.byconsumemode = filterList[0].pmcd; // 消费方式
                    // this.formDatasAddUpdate.msingleconsume = String(this.rowData.msingleconsume); // 检票前置条件
                    this.formDatasAddUpdate.bywicketctrltype = filterList2[0].pmcd; // 检票控制方式
                    this.formDatasAddUpdate.bywicketconsumetype = preAddRes.data.kpList.filter(item => item.pmva === this.rowData.bywicketconsumetype)[0].pmcd; // 检票通行方式
                    this.formDatasAddUpdate.byregfingerprinttype = filterList3[0].pmcd; // 身份识别类型
                    this.formDatasAddUpdate.byticketnodeal = preAddRes.data.phList.filter(item => item.pmva === this.rowData.byticketnodeal)[0].pmcd; // 票号处理
                    this.formDatasAddUpdate.ilimittotaltimes = this.rowData.ilimittotaltimes; // 限制总通过次数
                    this.formDatasAddUpdate.itimeinterval = this.rowData.itimeinterval; // 检票间隔时间(秒)
                    this.formDatasAddUpdate.issettimeticket = this.rowData.issettimeticket; // 是否启用分时检票
                    this.formDatasAddUpdate.byisuse = this.rowData.byisuse; // 使用状态                    
                     this.currentIndex = 3;
                }
                this.isShowLoading = false;
            },
            // 产品下拉列表切换事件
            async handleProviderChangeAdd(val) {
                // console.log(val)
                // 如果产品名称不存在，则退出
                if(!val) {
                    return false;
                }

                // 获取子产品列表
                const getChilds = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/findviewEdmticket',{
                    itickettypeid: val
                });
                // console.log(getChilds);
                let childList = JSON.parse(getChilds.data);
                // console.log(childList);
                childList = childList.filter(item => {
                    return item.itickettypeid !== '-1';
                });
                if(!childList.length) { // 如果子产品列表为空，则直接返回
                    return true;
                }

                // 初始化子产品列表
                this.formItemListAddUpdate[1].optionList = childList.map(item => {
                    return {
                        value: item.itickettypeid,
                        label: item.sztickettypename
                    }
                });
                if(this.currentIndex === 2) { // 新增时在这里用子产品列表的第一项初始化子产品
                    this.formDatasAddUpdate.izticktypeid = childList[0].itickettypeid;
                }
                return true;
            },
            // 查看查询
	        async handleLook(queryParams) {
                this.isShowLoading = true;
	        	const lookRes = await this.$api.get(this.baseUrl+'/ticket/opwwicketSet/v1/detail/' + queryParams);
                // console.log(lookRes);
                if(!lookRes) {
                    this.isShowLoading = false;
                    return;
                }

	        	// let precondition = '';
	        	// switch(lookRes.data.msingleconsume) {
	        	// 	case 0:
	        	// 		precondition = '无';
	        	// 		break;
	        	// 	case 1:
	        	// 		precondition = '单号检票';
	        	// 		break;
	        	// 	case 2:
	        	// 		precondition = '双号检票';
	        	// 		break;
	        	// }
	        	// 处理成中文字段
	        	let lookData = {
	        		"园门名称：": lookRes.data.szgardengatename,
	        		"所属服务商：": lookRes.data.szscenicname,
	        		"产品名称：": lookRes.data.sztickettypename,
	        		"子产品名称：": lookRes.data.szname,
	        		"限制总通过次数：": lookRes.data.ilimittotaltimes,
	        		"消费方式：": '次数', // lookRes.data.byconsumemode,
	        		"单次消费次数：": lookRes.data.msingletimes,
	        		"检票间隔时间(秒)：": lookRes.data.itimeinterval,
	        		// "检票前置条件：": precondition,
	        		"检票控制方式：": '平台检票', // lookRes.data.bywicketctrltype,
	        		"检票通行方式：": lookRes.data.bywicketconsumetype,
	        		"身份识别类型：": lookRes.data.byregfingerprinttype,
	        		"票号处理：": lookRes.data.byticketnodeal,
	        		"使用状态：": lookRes.data.byisuse ? '启用' : '禁用'
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
            // 带条件查询
	        handleSubmit() {
                // this.isQuery = true;
                let queryParams = {
        			pageSize: this.size,
        			page: 1,
        			iscenicid: this.formDatas.iscenicid
                };
                this.QueryBuild = {
                    ...queryParams
                }
                this.currentPage = 1;
        		this.sendRequest(queryParams);
	        },
            // 翻页查询
	        handleChangePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuild
                }
                queryParams.page = pageNum;
                queryParams.pageSize = this.size;
                this.currentPage = pageNum;
                this.sendRequest(queryParams);
	        },
            // 执行查询
	        async sendRequest(queryParams) {
	        	this.isLoading = true;
	        	const res = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/list',queryParams);
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
	        	this.isLoading =false;
	        	this.rowData = null;
	        },
            // 选中一条数据
	        handleSelected(rowData) {
	        	// console.log(rowData);
            	this.rowData = rowData;
	        },
            // 执行新增/修改
	        async handleSaveData() {
                if(!this.formDatasAddUpdate.izticktypeid) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '该产品下还没有子产品，不能新增或修改检票规则信息！'
                    });
                    return;
                }
                this.isShowLoading = true;
                // this.watchTotal = 0;
                let queryParams = {
                    ...this.formDatasAddUpdate,
                    msingletimes: 1,
                    mlimitconsume: 0,
                    szname: '',
                    szscenicname: '',
                    msingleconsume: 0, // 检票前置条件--无
                }
                if(this.currentIndex === 2) {
                    queryParams = {
                        ...queryParams,
                        iscentcid: this.formDatas.iscenicid,
                        szgardengatename: '',
                        sztickettypename: ''
                    }
                    const addRes = await this.$api.post(this.baseUrl+'/ticket/opwwicketSet/v1/add',{},queryParams);
                    // console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                } else {
                    queryParams = {
                        ...queryParams,
                        iscentcid: this.rowData.iscenicid, // 服务商id
                        iwicketsetid: this.rowData.iwicketsetid,  // 检票设置id，页面没有展示出来
                        szgardengatename: this.rowData.szgardengatename, // 园门名称
                        sztickettypename: this.rowData.sztickettypename // 子产品名称
                    }
                    const updateRes = await this.$api.post(this.baseUrl+'/ticket/opwwicketSet/v1/update',{},queryParams);
                    // console.log(updateRes);
                    if(!updateRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }


                // console.log(queryParams);
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/list',{
                    pageSize: this.size,
                    page: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `检票规则信息已经${ this.currentIndex === 2 ? '新增' : '修改' }成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }
                
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
                // this.isQuery = false;
                this.QueryBuild = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `检票规则信息${ this.currentIndex === 2 ? '新增' : '修改' }成功，欢迎使用易旅通智慧景区系统`
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
                const delRes = await this.$api.delete(this.baseUrl + '/ticket/opwwicketSet/v1/delete/' + this.rowData.iwicketsetid);
                // console.log(delRes);
                if(!delRes) {
                    this.isModalLoading = false;
                    this.isDel = false;
                    return;
                }

                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/opwwicketSet/v1/list',{
                    pageSize: this.size,
                    page: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '检票规则信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
                }
                
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                // this.watchTotal = requeryRes.data.totalCount;
                // this.isQuery = false;
                this.QueryBuild = {
                    pageSize: this.size,
                    page: 1
                }
                this.currentPage = 1;
                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '检票规则信息删除成功，欢迎使用易旅通智慧景区系统'
                });
	        },
            // 关闭删除确认框
	        cancelEvent() {
	        	this.isDel = false;
	        },
            // reduceSelect() {
            //     if(this.len >= 2) {
            //         this.formItemListAddUpdate[9].configList.pop();
            //         this.formDatasAddUpdate.selectGroup.pop();
            //     }
            // },
            // increaseSelect() {
            //     if(this.len <= 5) {
            //         this.formItemListAddUpdate[9].configList.push(this.mock);
            //         this.formDatasAddUpdate.selectGroup.push({
            //             [this.mock.keyName]: 1
            //         });
            //     }
            // },
            changeSize(size) {
                this.size = size;
                this.handleChangePage(1);
            }
        }
    }
</script>

<style scoped>

</style>
