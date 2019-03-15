<template>
	<div id="stationManage">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
		<Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>窗口管理</span>
                <topBtn :btnList="btnList" @operate="operate"></topBtn>
            </p>
            <detail-form1 
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                @getFormData="getFormData"
                @clearFormData="resetForm1"></detail-form1>
            <radioTable 
                :colname="colnames"
                :total="total"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage1"
                @changePage="changePage"
                @selected="handleSelected"
                @changePageSize="changeSize1"></radioTable>
        </Card>
        <Card v-show="currentIndex === 2 || currentIndex === 3">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex ===2">新增窗口信息</span>
                <span v-if="currentIndex ===3">修改窗口信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatasAddAndUpdate"
                :ruleDatas="ruleDataAddAndUpdate"
                :formItemList="addAndUpdateFormItemList"
                :isClose="false"
                @getFormData="saveData"
                @closeCurrentPage="closeCurrentPage"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 6">
            <p slot="title" class="cardTitle">
                <span>窗口销售权限管理</span>
                <topBtn :btnList="btnOtherList" @operate="operate6"></topBtn>
            </p>
            <radioTable 
                :colname="colname6"
                :total="total6"
                :tableData="tableData6"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage6"
                @changePage="changePage6"
                @selected="handleSelected6"
                @changePageSize="changeSize6"></radioTable>
        </Card>
        <Card v-show="currentIndex === 4 || currentIndex === 5">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex === 4">新增窗口销售权限</span>
                <span v-else>修改窗口销售权限</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <checkbox-table 
                :priceList="priceList" 
                :itemList="currentWinDetail"
                :checkedList="checkedList"
                name="窗口销售权限名称"
                @submit="handleWinSubmit"
                @closePage="closePage6"></checkbox-table>
        </Card>
        <Card v-show="currentIndex === 11">
            <p slot="title" class="cardTitle">
                <span>窗口设备管理</span>
                <topBtn :btnList="btnOtherList" @operate="operateEqu"></topBtn>
            </p>
            <Form ref="equForm" :model="formDatasEqu" inline>
                <!-- <FormItem style="margin-left: 100px;">
                    <RadioGroup v-model="formDatasEqu.flag">
                        <Radio :label="1">按编号</Radio>
                        <Radio :label="0">按设备名称模糊查询</Radio>
                    </RadioGroup>
                </FormItem> -->
                <!-- <FormItem v-if="formDatasEqu.flag === 1" :label="labelName" :label-width="120" style="margin-left: 60px;">
                    <Input  v-model="formDatasEqu.queryId" style="width: 200px"></Input>
                </FormItem> -->
                <FormItem label="按设备名称模糊查询" :label-width="120">
                    <Input  v-model="formDatasEqu.queryMess" style="width: 200px"></Input>
                </FormItem>
                <FormItem style="margin-left: 140px;">
                    <Button 
                        type="primary" 
                        @click="submitDataEqu('equForm')" 
                        shape="circle"
                        class="addpadding"
                        style="margin-right: 20px;">查询</Button>
                    <Button 
                        type="ghost" 
                        @click="resetDataEqu" 
                        shape="circle"
                        class="addpadding">重置</Button>
                </FormItem>
            </Form> 
            <radioTable 
                :colname="colnamesEqu"
                :total="totalEqu"
                :tableData="tableDataEqu"
                :isRadio="isRadio"
                :loading="isLoading"
                :pageCode="currentPage11"
                @changePage="changePage11"
                @selected="handleSelected11"
                @changePageSize="changeSize11"></radioTable>
        </Card>
        <Card v-show="currentIndex === 11.1 || currentIndex === 11.2">
        	<p slot="title" class="cardTitle">
                <span v-if="currentIndex === 11.1">新增窗口设备信息</span>
                <span v-if="currentIndex === 11.2">修改窗口设备信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatas11"
                :ruleDatas="ruleDatas11"
                :formItemList="formItemList11"
                :isClose="false"
                @getFormData="saveData11"
                @closeCurrentPage="closePage11"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 7 || currentIndex === 8 || currentIndex === 9">
            <p slot="title" class="cardTitle">
                <span v-if="currentIndex === 7">查看窗口信息</span>
                <span v-else-if="currentIndex === 8">查看窗口销售权限信息</span>
                <span v-else>查看窗口设备信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="item in detailList">
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
                <span>删除窗口</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该窗口吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button 
                type="primary" 
                :loading="modalLoading" 
                @click="sureEvent">确定</Button>
            <Button type="ghost" @click="cancelEvent">取消</Button>
            </div>
        </Modal>
        <Modal v-model="isDel6" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除窗口销售权限信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该窗口销售权限信息吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button 
                type="primary" 
                :loading="modalLoading6" 
                @click="sureEvent6">确定</Button>
            <Button type="ghost" @click="cancelEvent6">取消</Button>
            </div>
        </Modal>
        <Modal v-model="isDel11" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除窗口设备信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该窗口设备信息吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button 
                type="primary" 
                :loading="modalLoading11" 
                @click="sureEvent11">确定</Button>
            <Button type="ghost" @click="cancelEvent11">取消</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	import checkboxTable from '@/views/tables/checkbox-table.vue';
    export default {
        name: "ticket-window-management",
        components: {
        	'checkbox-table': checkboxTable
        },
        data() {
        	return {
                isShowLoading: false,
        		isDel:false,
                modalLoading: false,
                isLoading: false,
                isRadio: true,
                size: 10,
                rowData: null, // 保存选中行数据
                initFormDatasAddAndUpdate: null, // 保存主页面新增页表单初始化数据
                stationList: [], // 保存所有站点的列表，用于多处
                typeList: [],
                tableData: [],
                detailList: [], // 通用查看查询键值列表
                providerList: [], // 保存所有服务商的列表，用于多处
                currentIndex: 1,
                total: 0,
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
                    },
                    // {
                    //     type: 11,
                    //     btnlabel: '窗口销售权限',
                    //     icon: 'plus-round'
                    // }
        		],
        		btnRefresh: [
        			{
                        type: 1,
                        btnlabel: '刷新'
                    }
        		],
        		btnOtherList: [
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
                    },
                    {
                        type: 11,
                        icon: 'reply',
                        btnlabel: '返回'
                    }
        		],
        		formDatas: {
        			szticketwinname: '',
        			scenics: 0
        		},
        		formDatasAddAndUpdate: {
        			// 售票业务代码
        			szticketwincode: '',
        			// 售票业务名称
        			szticketwinname: '',
        			// 所属售票站点id
        			iticketstationid: 0,
        			// 本地IP地址
        			ipaddress: '',
        			// MAC地址
        			szipaddress: '',
        			// 售票开始时间
        			dtsellstart: '00:00:00',
        			// 售票结束时间
        			dtsellend: '00:00:00',
        			// 类型
        			bywintype: '',
        			// 是否通用
        			isty: 0,
        			// 使用状态
        			byisuse: 1,
        			// 支付桥设备编码(废弃)
        			payCode: '',
        			// 售票窗口描述
        			szmemo: '',
        			//售票业务IC卡代码
        			icid: ''
        		},
        		ruleDataAddAndUpdate: {
        			szticketwincode: [
        				{
        					required: true, 
        					message: '窗口代码不能为空',
        					trigger: 'blur',
        				}
        			],
        			szticketwinname: [
        				{
        					required: true,
        					message: '窗口名称不能为空',
        					trigger: 'blur',
        				}
        			],
        			szipaddress: [
        				{
        					required: true,
        					message: 'MAC地址不能为空',
        					trigger: 'blur',
        				}
                    ],
                    szmemo: [
        				{
        					required: true,
        					message: '窗口描述不能为空',
        					trigger: 'blur',
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
        				label: '窗口名称',
                        keyName: 'szticketwinname',
                        labelWidth:105
        			}
        		],
        		addAndUpdateFormItemList: [
        			{
        				type: 1,
        				keyName: 'szticketwincode',
        				label: '窗口代码',
                    },
                    {
                        type: 1,
                        keyName: 'icid',
                        label: '窗口IC卡代码',
                        disabled: true,
                        isHidden: true
                    },
        			{
        				type: 1,
        				keyName: 'szticketwinname',
        				label: '窗口名称',
        			},
        			{
        				type: 4,
        				keyName: 'iticketstationid',
        				label: '所属售票站点',
        				optionList: [],
        			},
        			{
        				type: 1,
        				keyName: 'ipaddress',
        				label: '本地IP地址',
        			},
        			{
        				type: 1,
        				keyName: 'szipaddress',
        				label: 'MAC地址',
        				isRequired: true,
        				hasDec: '业务系统以MAC地址为准',
        				isRedDec: true,
        			},
        			{
        				type: 12,
        				double: true,
        				label: '售票开始至结束时间',
        				keyName: 'dtsellstart',
        				keyName1: 'dtsellend',
        				timeType: 'time',
        				format: 'HH:mm',
        			},
        			{
        				type: 4,
        				keyName: 'bywintype',
        				label: '类型',
        				optionList: [],
        			},
        			{
        				type: 2,
        				keyName: 'isty',
        				label: '是否通用',
        				optionList: [
        					{
        						value: 0,
        						labelName: '否',
        					},
        					{
        						value: 1,
        						labelName: '是',
        					}
        				]
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
        				type: 1,
        				keyName: 'payCode',
        				label: '支付桥设备编码',
        			},
        			{
        				type: 7,
        				keyName: 'szmemo',
        				label: '窗口描述'
        			}
        		],
        		colnames: [
        			{
                        title: '窗口ID',
                        width: 100,
                        key: 'iticketwinid'
                    },
                    {
                        title: '窗口名称',
                        width: 170,
                        render: (h,params) => {
                        	return h('a',{
                        		on: {
                        			click: () => {
                                        this.handleLook({
                                            ticketwinId: params.row.iticketwinid
                                        });
                        			}
                        		}
                        	},params.row.szticketwinname);
                        }
                    },
                    {
                        title: '所属售票站点',
                        key: 'szstationname',
                        width : 170
                    },
                    {
                        title: '所属服务商',
                        key: 'szscenicname',
                        width: 170,
                    },
                    {
                        title: 'MAC地址',
                        width: 170,
                        key: 'szipaddress'
                    },
                    {
                        title: 'IP地址',
                        width: 140,
                        key: 'ipaddress'
                    },
                    {
                        title: '售票开始时间',
                        width: 110,
                        key: 'dtsellstart'
                    },
                    {
                        title: '售票结束时间',
                        width: 110,
                        key: 'dtsellend'
                    },
                    {
                        title: '类型',
                        width: 100,
                        key: 'pmva'
                    },
                    {
                        title: '是否通用',
                        width: 90,
                        render: (h,params) => {
                        	if(params.row.isty == 0) {
                        		return h('span','自用');
                        	}
                        	if(params.row.isty == 1) {
                        		return h('span','通用');
                        	}
                        }
                    },
                    {
                        title: '启用状态',
                        width: 90,
                        render: (h,params) => {
                        	if(params.row.byisuse == 0) {
                        		return h('span','禁用');
                        	}
                        	if(params.row.byisuse == 1) {
                        		return h('span','启用');
                        	}
                        }
                    },
                    {
                        title: '操作',
                        width: 220,
                        render: (h,params) => {
                        	return h('span',[
                        		h('a',{
                        			style: {
                        				marginRight: '5px'
                        			},
                                    on: {
                                        click: () => {
                                            this.getWinEquipment(params.row.iticketwinid);
                                        }
                                    }
                        		},'[窗口设备管理]'),
                        		h('a',{
                        			on: {
                        				click: () => {
                                            this.getLimits(params.row.iticketwinid);
                        				}
                        			}
                        		},'[窗口销售权限]')
                        	]);
                        }
                    }
                ],
                currentPage1: 1,
                QueryBuilder1: null,
        		                
                
                /* 后台窗口设备 */
                rowData11: null,
                isDel11: false,
                tableDataEqu: [],
                totalEqu: 0,
                size11: 10,
                modalLoading11: false,
                colnamesEqu: [
                    {
                        width: 100,
                        title: '编号',
                        render: (h,params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                        this.gotoLook11(params.row.iticketequipid);
                                    }
                                }
                            },params.row.iticketequipid);
                        }
                    },
                    {
                        minWidth: 200,
                        key: 'szticketequipname',
                        title: '设备名称',
                        isRequired: true,
                    },
                    {
                        minWidth: 200,
                        key: 'szticketwinname',
                        title: '所属窗口',
                    },
                    {
                        minWidth: 200,
                        key: 'szstationname',
                        title: '所属站点',
                    },
                    {
                        minWidth: 200,
                        key: 'szscenicname',
                        title: '所属服务商',
                        isRequired: true,
                    },
                    {
                        minWidth: 200,
                        key: 'szequiptypename',
                        title: '设备类型',
                    },
                    {
                        title: '启用状态',
                        minWidth: 100,
                        render: (h,params) => {
                            return params.row.byisuse ? h('span','启用') : h('span','禁用');
                        }
                    }
                ],
                formDatasEqu: {
                    flag: 0,
                    // queryId: '',
                    queryMess: ''
                },
                formDatas11: {
                    szticketequipname: '',
                    szticketwinname: '',
                    szstationname: '',
                    szscenicname: '',
                    iequiptypeid: '',
                    szticketequipcode: '',
                    szfactorycode: '',
                    byisuse: 0,
                    szmemo: ''
                },
                ruleDatas11: {
                    szticketequipname: [
                        {
                            required: true,
        					message: '设备名称不能为空！',
        					trigger: 'blur'
                        }
                    ],
                    szticketequipcode: [
                        {
                            required: true,
        					message: '设备编号不能为空！',
        					trigger: 'blur'
                        }
                    ],
                    szfactorycode: [
                        {
                            required: true,
        					message: '厂家编号不能为空！',
        					trigger: 'blur'
                        }
                    ],
                    szmemo: [
                        {
                            required: true,
        					message: '备注不能为空！',
        					trigger: 'blur'
                        }
                    ]
                },
                formItemList11: [
                    {
        				type: 1,
        				keyName: 'szticketequipname',
        				label: '设备名称',
                    },
                    {
        				type: 1,
        				keyName: 'szticketwinname',
                        label: '窗口名称',
                        disabled: true
                    },
                    {
        				type: 1,
        				keyName: 'szstationname',
                        label: '所属站点',
                        disabled: true
                    },
                    {
        				type: 1,
        				keyName: 'szscenicname',
                        label: '所属服务商',
                        disabled: true
                    },
                    {
        				type: 4,
        				keyName: 'iequiptypeid',
                        label: '设备类型',
                        optionList: []
                    },
                    {
        				type: 1,
        				keyName: 'szticketequipcode',
        				label: '设备编号',
                    },
                    {
        				type: 1,
        				keyName: 'szfactorycode',
        				label: '厂家编号',
                    },
                    {
                        type: 2,
                        keyName: 'byisuse',
                        isHidden: true,
                        label: '使用状态',
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用'
                            },
                            {
                                value: 0,
                                labelName: '禁用'
                            }
                        ]
                    },
                    {
                        type: 7,
                        keyName: 'szmemo',
                        label: '备注'
                    }
                ],
                currentPage11: 1,
                QueryBuilder11: null,


                /* 窗口销售权限 */
                tableData6: [],
                currentWinDetail: [], // 当前销售窗口信息--名称和权限编号
                priceList: [], // 所有销售权限列表
                checkedList: [],
                total6: 0, 
                size6: 10,
                currentWinId: 0, // 保存当前窗口的id 用于权限管理子页面 
                rowData6: null,
                isDel6: false,
                modalLoading6: false,
                colname6: [
        			{
                        title: '窗口名称',
                        key: 'strticketwin',
                        align: 'center',
                        minWidth: 240
                    },
                    {
                        title: '窗口销售权限名称',
                        key: 'strcrowdkindprice',
                        align: 'center',
                        minWidth: 420
                    }
                ],
                currentPage6: 1
        	}
        },
        // computed: {
        //     labelName() {
        //         return this.formDatasEqu.flag ? '编号：' : '设备名称包含字符：';
        //     }
        // },
        async created() {
            this.isShowLoading = true; 
            this.initFormDatasAddAndUpdate = this.$handle.objDeepCopy(this.formDatasAddAndUpdate);
            const token = this.Cookies.get('token');

        	// 初始化页面 -- 获取票务销售服务商并显示所有售票站点信息
            const res = await this.$api.all([
                {
                    url: this.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName',
                    type: 'get',
                    queryParams: {
                        url: window.location.hostname
                    }
                },
                {
                    url: this.baseUrl + '/ticket/ticketWin/v1/getlistTicketWin',
                    type: 'get',
                    queryParams: {
                        pageSize: this.size,
                        startIndex: 1
                    }
                },
                {
                    url: this.baseUrl + '/ticket/esbticketStation/v1/showAllesbticket',
                    type: 'get'
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
                // 初始化服务商下拉列表
                let providerList = pList.map(item => {
                    return {
                        value: item.iscenicid,
                        label: item.szscenicname
                    };
                });
                
                // 去掉所有服务商
                filterList = providerList.filter(item => {
                    return item.label !== '所有服务商'
                });

                this.formItemList[0].optionList = filterList;
                this.formDatas.scenics = filterList[0].value;
                this.providerList = filterList; // 保存数据，用于重置
            }

            this.tableData = res[1].items;
            this.total = res[1].totalCount;
            this.QueryBuilder1 = {
                pageSize: this.size,
                startIndex: 1
            }

            // 初始化售票站点下拉列表 用于新增/修改
            this.stationList = res[2].map(item => { 
                return {
                    value: item.iticketstationid,
                    label: item.szstationname
                };
            });

            // 获取类型下拉列表，新增/修改，用于这个接口不规范 用原生axios发请求
            const typeRes = await this.$http.get(this.baseUrl + '/sys/syspar/retrieve?access_token=' + token + '&pmky=SPXH');
            // console.log(typeRes);
            this.typeList = typeRes.data.map(item => {
                return {
                    value: item.pmcd,
                    label: item.pmva
                };
            });          
            this.isShowLoading = false;
        },
        methods: {
        	// 售票窗口管理-带条件查询
        	getFormData() {
                let queryParams = {
                    scenics: this.formDatas.scenics,
                    szticketwinname: this.formDatas.szticketwinname,
                    startIndex: 1,
                    pageSize: this.size
                };
                this.QueryBuilder1 = {
                    ...queryParams
                }
                this.currentPage1 = 1;
                this.submitForm(queryParams);
        	},
        	// 售票窗口管理-执行新增/修改
        	async saveData() {
                this.isShowLoading = true;
                let fData = this.formDatasAddAndUpdate;
        		if(this.currentIndex === 2) { // 新增
                    const addRes = await this.$api.post(this.baseUrl + '/ticket/ticketWin/v1/insertTicketWin',{},fData);
                    // console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                } else { // 修改
                    fData = {
                        ...fData,
                        iticketwinid: this.rowData.iticketwinid
                    }
                    const updateRes = await this.$api.put(this.baseUrl + '/ticket/ticketWin/v1/updateTicketWin',{},fData);
                    // console.log(updateRes);
                    if(!updateRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }

                // 重新查询更新表格
                // this.watchTotal = 0;
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/ticketWin/v1/getlistTicketWin',{
                    pageSize: this.size,
                    startIndex: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `${ this.currentIndex === 2 ? '新增' : '修改' }窗口信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }
                
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder1 = {
					pageSize: this.size,
                    startIndex: 1
                }
                this.currentPage = 1;
                this.formDatas.szticketwinname = '';
                this.formDatas.scenics = this.providerList[0].value;
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `窗口信息${ this.currentIndex === 2 ? '新增' : '修改' }成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
        	},
        	// 售票窗口管理-翻页查询
        	changePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuilder1
                }
                queryParams.startIndex = pageNum;
                queryParams.pageSize = this.size;
                this.currentPage1 = pageNum;
                this.submitForm(queryParams);
        	},
        	// 售票窗口管理-执行查询
            async submitForm(queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/ticket/ticketWin/v1/getlistTicketWin',queryParams);
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
            // 售票窗口管理-菜单功能
            async operate(operateNum) {
            	if(operateNum === 7) {
                    this.formDatasAddAndUpdate = this.$handle.objDeepCopy(this.initFormDatasAddAndUpdate);
                    this.formDatasAddAndUpdate.iticketstationid = this.stationList[0].value;
                    this.formDatasAddAndUpdate.bywintype = this.typeList[0].value;
                    this.formDatasAddAndUpdate.dtsellstart = '07:00:00';
                    this.formDatasAddAndUpdate.dtsellend = '18:00:00';
                    this.addAndUpdateFormItemList[1].isHidden = true;
            		this.addAndUpdateFormItemList[3].optionList = this.stationList;
                    this.addAndUpdateFormItemList[7].optionList = this.typeList;
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
                        this.addAndUpdateFormItemList[1].isHidden = false;
                        this.addAndUpdateFormItemList[3].optionList = this.stationList;
                        this.addAndUpdateFormItemList[7].optionList = this.typeList;
                        for(let attrOuter in this.formDatasAddAndUpdate) {
                            for(let attrInner in this.rowData) {
                                if(attrOuter === attrInner) {
                                    this.formDatasAddAndUpdate[attrOuter] = this.rowData[attrInner];
                                    break;
                                }
                            }
                        }
                        this.currentIndex = 3;
                        this.isShowLoading = false;
                        return;
                    } else if(operateNum === 9) {
                        this.isDel = true;
                        return;
                    } else if(operateNum === 10) {
                        this.handleLook({
                            ticketwinId: this.rowData.iticketwinid
                        });
                        return;
                    } 
                    // else { // 点击按钮获取窗口售票权限
                    //     this.getLimits(this.rowData.iticketwinid);
                    // }

                }
            },
            // 售票窗口管理-选中一条数据
            handleSelected(rowData) {
            	// console.log(rowData);
            	this.rowData = rowData;
            },
            // 售票窗口管理-查看查询
            async handleLook(queryParams) {
                this.isShowLoading = true;
                const lookRes = await this.$api.get(this.baseUrl+'/ticket/ticketWin/v1/getEsbticketWinByIticketWinId',queryParams);
                // console.log(lookRes);
                if(!lookRes) {
                    this.isShowLoading = false;
                    return;
                }
                // 处理成中文字段
                let dataObj = {
                    '窗口代码：': lookRes.data.szticketwincode,
                    '窗口IC卡代码：': lookRes.data.icid,
                    '窗口名称：': lookRes.data.szticketwinname,
                    '所属售票站点：': lookRes.data.szstationname,
                    '所属服务商：': lookRes.data.szscenicname,
                    '本地IP地址：': lookRes.data.ipaddress,
                    'MAC地址：': lookRes.data.szipaddress,
                    '售票开始时间：': lookRes.data.dtsellstart,
                    '售票结束时间：': lookRes.data.dtsellend,
                    '类型：': lookRes.data.bywintype,
                    '使用状态：': lookRes.data.byisuse ? '启用' : '禁用',
                    '窗口描述：': lookRes.data.szmemo,
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
                this.currentIndex = 7;
                this.isShowLoading = false;
            },
            // 售票窗口管理-执行删除
            async sureEvent() {
                this.modalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/ticket/ticketWin/v1/deleteTicketWin',{
                    'iticketwinid': this.rowData.iticketwinid
                });
                // console.log(delRes);
                if(!delRes) {
                    this.modalLoading = false;
                    this.isDel = false;
                    return;
                }

                // 删除后重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/ticket/ticketWin/v1/getlistTicketWin',{
                    pageSize: this.size,
                    startIndex: 1
                });
                // console.log(requeryRes);
                if(!requeryRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '窗口信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
                }
                
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder1 = {
					pageSize: this.size,
                    startIndex: 1
                }
                this.currentPage = 1;
                this.formDatas.szticketwinname = '';
                this.formDatas.scenics = this.providerList[0].value;
                this.rowData = null;
                this.modalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '窗口信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 售票窗口管理-关闭删除确认框
            cancelEvent() {
                this.isDel = false;
            },
            // 关闭查看框，包括售票窗口查看/窗口销售权限查看/窗口设备查看
            closeModal() {
                if(this.currentIndex === 7) {
                    this.currentIndex = 1;
                } else if(this.currentIndex === 8) {
                    this.currentIndex = 6;
                } else {
                    this.currentIndex = 11;
                }   
            },
            // 售票窗口管理-关闭新增/修改页
            closeCurrentPage() {
                this.currentIndex = 1;
            },
            // 售票窗口管理-重置
            resetForm1() {
                this.formDatas.scenics = this.providerList[0].value;
                this.formDatas.szticketwinname = '';
            },
            // 售票窗口管理-改变每页最大数
            async changeSize1(size) {
                this.size = size;
                this.changePage(1);    
            },


            /* 销售权限管理页面 */
            // 进入销售权限子页
            async getLimits(winId) {
                this.isShowLoading = true;
                const getLimitsList = await this.$api.get(this.baseUrl + '/ticket/winLimits/v1/winLimitViewList',{
                    iticketwinid: winId,
                    page: 1,
                    pageSize: this.size6
                });
                // console.log(getLimitsList);
                if(!getLimitsList) {
                    this.isShowLoading = false;
                    return;
                }
                
                this.currentWinId = this.rowData.iticketwinid;               
                this.total6 = getLimitsList.data.totalCount;
                this.currentPage6 = 1;
                this.tableData6 = getLimitsList.data.items;
                this.currentIndex = 6;
                this.isShowLoading = false;
            },
            // 销售权限-翻页查询
        	async changePage6(pageNum) {
                this.isLoading = true;              
                const res = await this.$api.get(this.baseUrl + '/ticket/winLimits/v1/winLimitViewList',{
                    iticketwinid: this.currentWinId,
                    page: pageNum,
                    pageSize: this.size6
                });
                // console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }

                this.total6 = res.data.totalCount;
                this.tableData6 = res.data.items;
                this.currentPage6 = pageNum;
                this.isLoading = false;
            },
            // 销售权限-改变每页最大显示数
            async changeSize6(size) {
                this.size6 = size;
                this.changePage6(1);
            },
            // 销售权限-菜单功能
            operate6(operateNum) {
            	if(operateNum === 7) {
                    this.currentWinDetail = [];
                    this.gotoAddAndUpdate(operateNum);
                    return;
            	} else if(operateNum === 11) {
                    this.currentIndex = 1;
                    return;
                } else {
                    if(!this.rowData6) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请选择一条记录'
                        });
                        return;
                    }
                    if(operateNum === 8) {
                        this.currentWinDetail = [
                            {
                                title: '窗口销售权限编号',
                                value: this.rowData6.iticketwinlimitsid,
                                disabled: true
                            },
                            {
                                title: '窗口名称',
                                value: this.rowData6.strticketwin,
                                disabled: true
                            }
                        ];
                        this.gotoAddAndUpdate(operateNum);
                        return;
                    } else if(operateNum === 9) {
                        this.isDel6 = true;
                        return;
                    } else if(operateNum === 10) {
                        let lookLimitsData = {
                            '窗口销售权限编号：': this.rowData6.iticketwinlimitsid,
                            '窗口名称：': this.rowData6.strticketwin,
                            '窗口销售权限名称：': this.rowData6.strcrowdkindprice
                        }
                        let list = [];
                        for(let attr in lookLimitsData) {
                            list.push({
                                title: attr,
                                value: lookLimitsData[attr]
                            })
                        }
                        this.detailList = list;
                        this.currentIndex = 8;
                        return;
                    }
                }
            },
            // 销售权限-新增/修改页
            async gotoAddAndUpdate(operateNum) {
                this.isShowLoading = true;
                const allLimits = await this.$api.get(this.baseUrl + '/ticket/winLimits/v1/winLimitAddInitData',{
                    iticketwinid: this.currentWinId
                });
                // console.log(allLimits);
                if(!allLimits) {
                    this.isShowLoading = false;
                    return;
                }

                this.priceList =  allLimits.data.pricelist.map(item => {
                    return {
                        value: item.icrowdkindpriceid,
                        label: item.strpricename
                    }
                });
                this.checkedList = this.tableData6.map(item => {
                    return item.icrowdkindpriceid;
                });
                if(operateNum === 7) {
                    this.currentIndex = 4;
                } else {
                    this.currentIndex = 5;
                }
                this.isShowLoading = false;
            },
            // 销售权限-选中一行
            handleSelected6(rowData6) {
                // console.log(rowData6);
                this.rowData6 = rowData6;
            },
            // 销售权限-执行删除
            async sureEvent6() {
                this.modalLoading6 = true;
                const del6 = await this.$api.delete(this.baseUrl + '/ticket/winLimits/v1/deleteWinlimits',{
                    iticketwinlimitsid: this.rowData6.iticketwinlimitsid
                });
                // console.log(del6);
                if(!del6) {
                    this.modalLoading6 = false;
                    this.isDel6 = false;
                    return;
                }

                // 重新查询
                const requery6 = await this.$api.get(this.baseUrl + '/ticket/winLimits/v1/winLimitViewList',{
                    iticketwinid: this.currentWinId,
                    page: 1,
                    pageSize: this.size6
                });
                // console.log(requery6);
                if(!requery6) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '窗口销售权限信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
                }
                
                this.total6 = requery6.data.totalCount;
                this.tableData6 = requery6.data.items;
                this.currentPage6 = 1;
                this.rowData6 = null;
                this.modalLoading6 = false;
                this.isDel6 = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '窗口售票权限信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 销售权限-取消删除
            cancelEvent6() {
                this.isDel6 = false;
            },
            // 销售权限-执行新增/修改
            async handleWinSubmit(val) { 
                if(!val.length) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请至少选择一条记录'
                    });
                    return;
                }
                this.isShowLoading = true;
                // 新增
                if(this.currentIndex === 4) {
                    const addLimitsRes = await this.$api.post(this.baseUrl + '/ticket/ticketWin/v1/insertTicketWinLimits',{
                        Iticketwinid: this.currentWinId,
                        Icrowdkindpriceids: val.join(',')
                    });
                    // console.log(addLimitsRes);
                    if(!addLimitsRes) {
                        this.isShowLoading = false;
                        return;
                    }
                } 

                // 修改
                if(this.currentIndex === 5) { 
                    const updateLimitsRes = await this.$api.put(this.baseUrl + '/ticket/ticketWin/v1/updateTicketWinLimits',{
                        Iticketwinid: this.currentWinId,
                        Icrowdkindpriceids: val.join(',')
                    });
                    // console.log(updateLimitsRes);
                    if(!updateLimitsRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }

                // 重新查询
                // this.watchTotal = 0;
                const requeryLimitsRes = await this.$api.get(this.baseUrl + '/ticket/winLimits/v1/winLimitViewList',{
                    iticketwinid: this.currentWinId,
                    page: 1,
                    pageSize: this.size6
                });
                // console.log(requeryLimitsRes);
                if(!requeryLimitsRes) {
					this.$Modal.warning({
						title: '温馨提示',
						content: `${ this.currentIndex === 4 ? '新增' : '修改' }窗口销售权限信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }
                
                this.total6 = requeryLimitsRes.data.totalCount;
                this.tableData6 = requeryLimitsRes.data.items;
                this.currentPage6 = 1;
                this.rowData6 = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `销售权限信息${ this.currentIndex === 4 ? '新增' : '修改' }成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 6;
                this.isShowLoading = false;
            },
            // 销售权限-关闭新增/修改
            closePage6() {
                this.currentIndex = 6;
            },
           
           


            /* 后台窗口设备管理页面 */
            // 根据窗口id获取窗口设备列表
            async getWinEquipment(winId) {
                this.isShowLoading = true;
                const winEquipmentList = await this.$api.get(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/queryEquip',{
                    ticketwinid: winId,
                    pageSize: this.size11,
                    starIndex: 1
                });
                // console.log(winEquipmentList);
                if(!winEquipmentList) {
                    this.isShowLoading = false;
                    return;
                }

                this.totalEqu = winEquipmentList.data.totalCount;
                this.tableDataEqu = winEquipmentList.data.items;
                this.QueryBuilder11 = {
                    ticketwinid: winId,
                    pageSize: this.size11,
                    starIndex: 1
                }
                this.currentPage11 = 1;
                this.currentIndex = 11;
                this.isShowLoading = false;
            },
            // 后台窗口设备-菜单
            operateEqu(operateNum) {
                if(operateNum === 7) {
                    this.gotoAdd11(operateNum);
                    return;
                } else if(operateNum === 11) {
                    this.currentIndex = 1;
                    return;
                } else {
                    if(!this.rowData11) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '请选择一条记录'
                        });
                        return;
                    }
                    if(operateNum === 8) {
                        this.gotoAdd11(operateNum);
                        return;
                    }
                    if(operateNum === 9) {
                        this.isDel11 = true;
                        return;
                    }
                    if(operateNum === 10) {
                        this.gotoLook11(this.rowData11.iticketequipid);
                        return;
                    }
                }
            },
            // 后台窗口设备-进入新增或修改
            async gotoAdd11(operateNum) {
                this.isShowLoading = true;
                // 初始化固定字段
                this.formDatas11.szticketwinname = this.rowData.szticketwinname;
                this.formDatas11.szstationname = this.rowData.szstationname;
                this.formDatas11.szscenicname = this.rowData.szscenicname;

                // 获取设备类型下拉列表，并初始化
                const getEquType = await this.$api.get(this.baseUrl + '/ticket/esbequiptypetab/v1/queryAllesbequitype');
                let typeList = getEquType.data.items.map(item => {
                    return {
                        value: item.iequiptypeid,
                        label: item.szequiptypename
                    }
                });
                this.formItemList11[4].optionList = typeList;
                
                // 新增页表单数据初始化
                if(operateNum === 7) {
                    this.formItemList11[7].isHidden = true;
                    this.formDatas11.szticketequipname = '';
                    this.formDatas11.iequiptypeid = typeList[0].value;
                    this.formDatas11.szticketequipcode = '';
                    this.formDatas11.szfactorycode = '';
                    this.formDatas11.szmemo = '';
                    this.currentIndex = 11.1;
                }

                // 修改页表单数据初始化
                if(operateNum === 8) {
                    this.formItemList11[7].isHidden = false;
                    for(let outter in this.formDatas11) {
                        for(let inner in this.rowData11) {
                            if(outter === inner) {
                                this.formDatas11[outter] = this.rowData11[inner];
                                break;
                            }
                        }
                    }
                    this.formDatas11.iequiptypeid = typeList.filter(item => item.label === this.rowData11.szequiptypename)[0].value;
                    this.currentIndex = 11.2;
                }
                this.isShowLoading = false;
            },
            // 后台窗口设备-条件查询
            submitDataEqu() {
                // this.isQuery11 = true;
                let queryParams = {
                    pageSize: this.size11,
                    starIndex: 1,
                    ticketwinid:this.rowData.iticketwinid,
                    // queryId: this.formDatasEqu.queryId,
                    queryMess: this.formDatasEqu.queryMess,
                    flag: this.formDatasEqu.flag
                }
                this.QueryBuilder11 = {
                    ...queryParams
                }
                this.currentPage11 = 1;
                this.gotoQuery(queryParams);
            },
            // 后台窗口设备-查询重置
            resetDataEqu() {
                // this.formDatasEqu.flag = 0;
                // this.formDatasEqu.queryId = '';
                this.formDatasEqu.queryMess = '';
            },
            // 后台窗口设备-翻页查询
            async changePage11(num) {
                // let queryParams = {
                //     pageSize: this.size11,
                //     starIndex: num,
                //     ticketwinid: this.rowData.iticketwinid
                // }
                // if(this.isQuery11) {
                //     if(!this.formDatasEqu.flag) {
                //         queryParams['queryId'] = this.formDatasEqu.queryId;
                //     } else {
                //         queryParams['queryMess'] = this.formDatasEqu.queryMess;
                //     }
                // }
                let queryParams = {
                    ...this.QueryBuilder11
                }
                queryParams.starIndex = num;
                queryParams.pageSize = this.size11;
                this.currentPage11 = num;
                this.gotoQuery(queryParams);
            },
            // 后台窗口设备-执行查询
            async gotoQuery(queryParams) {
                this.isLoading = true;
                const queryRes = await this.$api.get(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/queryEquip',queryParams);
                // console.log(queryRes);
                if(!queryRes) {
                    this.isLoading = false;
                    return;
                }

                this.tableDataEqu = queryRes.data.items;
                this.totalEqu = queryRes.data.totalCount;
                this.rowData11 = null;
                this.isLoading = false;
            },
            // 后台窗口设备-查看查询
            async gotoLook11(equId) {
                this.isShowLoading = true;
                const look11 = await this.$api.get(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/performViewEquip',{
                    iticketequipid: this.rowData11.iticketequipid
                });
                if(!look11) {
                    this.isShowLoading = false;
                    return;
                }

                let dataObj = {
                    '设备名称：': look11.data.szticketequipname,
                    '所属窗口：': look11.data.szticketwinname,
                    '所属站点：': look11.data.szstationname,
                    '所属服务商：': look11.data.szscenicname,
                    '设备类型：': look11.data.szequiptypename,
                    '设备编号：': look11.data.szticketequipcode,
                    '厂家编号：': look11.data.szfactorycode,
                    '使用状态：': look11.data.byisuse ? '启用' : '禁用',
                    '备注：': look11.data.szmemo
                }
                let list = [];
                for(let attr in dataObj) {
                    list.push({
                        title: attr,
                        value: dataObj[attr]
                    })
                }
                this.detailList = list;
                this.currentIndex = 9;
                this.isShowLoading = false;
            },
            // 后台窗口设备-选择一条数据
            handleSelected11(rowData11) {
                this.rowData11 = rowData11;
                // console.log(rowData11);
            },
            // 后台窗口设备-改变最大显示数
            async changeSize11(size) {
                this.size11 = size;
                this.changePage11(1);
            },
            // 后台窗口设备-执行新增/修改
            async saveData11() {
                this.isShowLoading = true;
                let bodyParams = {
                    iequiptypeid: this.formDatas11.iequiptypeid,
                    iscenicid: this.providerList.filter(item => item.label === this.rowData.szscenicname)[0].value,
                    iticketstationid: this.stationList.filter(item => item.label === this.rowData.szstationname)[0].value,
                    iticketwinid: this.rowData.iticketwinid,
                    szfactorycode: this.formDatas11.szfactorycode,
                    szmemo: this.formDatas11.szmemo,
                    szticketequipcode: this.formDatas11.szticketequipcode,
                    szticketequipname: this.formDatas11.szticketequipname
                }

                // 新增
                if(this.currentIndex === 11.1) {
                    const add11 = await this.$api.post(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/saveEquipInfo',{},bodyParams);
                    if(!add11) {
                        this.isShowLoading = false;
                        return;
                    }
                }

                // 修改
                if(this.currentIndex === 11.2) {
                    bodyParams = {
                        ...bodyParams,
                        byisuse: this.formDatas11.byisuse,
                        iticketequipid: this.rowData11.iticketequipid
                    }
                    const edit11 = await this.$api.put(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/updateEquip',{},bodyParams);
                    if(!edit11) {
                        this.isShowLoading = false;
                        return;
                    }
                }
                
                // 重新查询
                const requeryAdd = await this.$api.get(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/queryEquip',{
                    ticketwinid: this.rowData.iticketwinid,
                    pageSize: this.size11,
                    starIndex: 1
                });
                // console.log(requeryAdd);
                if(!requeryAdd) {
                    this.$Modal.warning({
						title: '温馨提示',
						content: `${ this.currentIndex === 11.1 ? '新增' : '修改' }窗口设备信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }

                this.totalEqu = requeryAdd.data.totalCount;
                this.tableDataEqu = requeryAdd.data.items;
                this.QueryBuilder11 = {
                    ticketwinid: this.rowData.iticketwinid,
                    pageSize: this.size11,
                    starIndex: 1
                }
                this.currentPage11 = 1;
                this.resetAfterupdate();
                this.rowData11 = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `${ this.currentIndex === 11.1 ? '新增' : '修改' }窗口设备信息成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 11;
                this.isShowLoading = false;
            },
            resetAfterupdate() {
                // this.formDatasEqu.flag = 1;
                // this.formDatasEqu.queryId = '';
                this.formDatasEqu.queryMess = '';
            },
            // 后台窗口设备-关闭新增/修改页
            closePage11() {
                this.currentIndex = 11;
            },
            // 后台窗口设备-关闭删除
            cancelEvent11() {
                this.isDel11 = false;
            },
            // 后台窗口设备-执行删除
            async sureEvent11() {
                this.modalLoading11 = true;
                const del11 = await this.$api.delete(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/deleteEquip',{
                    ticketequipid: this.rowData11.iticketequipid
                });
                if(!del11) {
                    this.modalLoading11 = false;
                    this.isDel11 = false;
                    return
                };

                // 重新查询
                const reQuery11 = await this.$api.get(this.baseUrl + '/ticket/EsbTicketEquipTab/v1/queryEquip',{
                    ticketwinid: this.rowData.iticketwinid,
                    pageSize: this.size11,
                    starIndex: 1
                });
                // console.log(reQuery11);
                if(!reQuery11) {
					this.$Modal.warning({
						title: '温馨提示',
						content: '窗口设备信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
				}

                this.tableDataEqu = reQuery11.data.items;
                this.totalEqu = reQuery11.data.totalCount;
                this.QueryBuilder11 = {
                    ticketwinid: this.rowData.iticketwinid,
                    pageSize: this.size11,
                    starIndex: 1
                }
                this.currentPage11 = 1;
                this.resetAfterupdate();
                this.rowData11 = null;
                this.modalLoading11 = false;
                this.isDel11 = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '窗口设备信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            }
        }
    }
</script>

<style scoped lang="less">

</style>