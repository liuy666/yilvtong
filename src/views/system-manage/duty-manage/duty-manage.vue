<template>
    <div id="companyManage">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>菜单管理</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <detail-form1 
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                @getFormData="handleQuery"></detail-form1>
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
                <span v-if="currentIndex === 2">新增菜单信息</span>
                <span v-else>修改菜单信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <detail-form1 
                :isListPage="false"
                :formDatas="formDatas2"
                :ruleDatas="ruleDatas2"
                :formItemList="formItemList2"
                :isClose="false"
                @getFormData="getFormData2"
                @closeCurrentPage="handleClose"></detail-form1>
        </Card>
        <Card v-show="currentIndex === 4">
            <p slot="title" class="cardTitle">
                <span>查看菜单信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <table class="lookDetail">
                <tr v-for="item in detailList">
                    <td>{{ item.title }}</td>
                    <td><div>{{ item.value }}</div></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Button 
                            type="primary" 
                            shape="circle" 
                            class="addpadding" 
                            @click="handleClose">关闭</Button>
                    </td>
                </tr>
            </table>
        </Card>
        <Modal v-model="isDel" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除菜单信息</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该菜单信息吗？</p>
            </div>
            <div slot="footer" style="text-align:center" >
            <Button 
                type="primary" 
                :loading="isModalLoading" 
                @click="sureDel">确定</Button>
            <Button type="ghost" @click="cancelDel">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data(){
            const validateOrder = (rule,value,callback) => {
                let reg = /^[0-9]*$/;
                if(value === '') {
                    callback(new Error('显示顺序不能为空'));
                } else if(!reg.test(value)) {
                    callback(new Error('只能输入正整数'));
                } else {
                    callback();
                }
            }
            return{
                isShowLoading: false,
                isDel: false,
                isModalLoading: false,
                isLoading: false,
                isRadio: true,
                currentIndex: 1,
                total: 0,
                idutyid: 0, // 下级职责的父职责id（即当前职责的id），只用于新增职责。新增顶级职责传入0即可，而修改时传入对应表格行的职责
                iparentid: 0, // 下级职责的父职责id（即当前职责的id），用于获取或新增下级职责。查询顶级职责传入0即可
                previousIdList: [0], // 返回上一级职责所需的id数组(后进先出)
                rowData: null,
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
                    },
                    {
                        type: 11,
                        btnlabel: '上一级',
                        icon: 'reply'
                    }                
                ],
                btnRefresh: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatas: {
                    szdutyname: '',
                    dutype: '00'
                },
                formItemList: [
                    {
                        type: 4,
                        label: '菜单类别',
                        keyName: 'dutype',
                        labelWidth:82,
                        optionList: [
                            {
                                value: '00',
                                label: '所有类别'
                            },
                            {
                                value: '01',
                                label: '平台菜单'
                            },
                            {
                                value: '02',
                                label: '景区菜单'
                            }
                        ]
                    },
                    {
                        type: 1,
                        label: '菜单名称',
                        keyName: 'szdutyname',
                        labelWidth:82
                    },
                ],
                formDatas2: {
                    szdutycode: '',
                    szdutyname: '',
                    szgotopage: '',
                    bypurviewtype: '',
                    bycategorytype: '',
                    dutype: '',
                    iversion: 0, // 固定0
                    byisuse: 0,
                    szorderby: '',
                    bisleaf: 0,
                    issellticket: 1,
                    szmemo: ''
                },
                ruleDatas2: {
                    szdutycode: [
                        {
                            required: true, 
                            message: '菜单代码不能为空', 
                            trigger: 'blur'
                        }
                    ],
                    szdutyname: [
                        {
                            required: true, 
                            message: '菜单名称不能为空', 
                            trigger: 'blur'
                        }
                    ],
                    szgotopage: [
                        {
                            required: true, 
                            message: '菜单链接不能为空', 
                            trigger: 'blur'
                        }
                    ],
                    szmemo: [
                        {
                            required: true, 
                            message: '菜单描述不能为空', 
                            trigger: 'blur'
                        }
                    ],
                    szorderby: [
                        {
                            required: true, 
                            // message: '显示顺序不能为空', 
                            trigger: 'blur',
                            validator: validateOrder
                        }
                    ]
                },      
                formItemList2: [
                    {
                        type: 1,
                        keyName: 'szdutycode',
                        label: '菜单代码',
                        hasDec: "* 如果此菜单为售票权限，则顶级菜单代码输入'saleright'",
                        isRedDec: true
                    },
                    {
                        type: 1,
                        keyName: 'szdutyname',
                        label: '菜单名称'
                    },
                    {
                        type: 1,
                        keyName: 'szgotopage',
                        label: '菜单链接'
                    },
                    {
                        type: 4,
                        keyName: 'bypurviewtype',
                        label: '权限类型',
                        optionList: []
                    },
                    {
                        type: 4,
                        keyName: 'bycategorytype',
                        label: '菜单类型',
                        optionList: []
                    },
                    {
                        type: 2,
                        keyName: 'dutype',
                        label: '菜单类别',
                        optionList: []
                    },
                    // {
                    //     type: 2,
                    //     label: '业务所属类别',
                    //     keyName: 'iversion',
                    //     optionList: [
                    //         {
                    //             value: 0,
                    //             labelName: '综合业务',
                    //             disabled: false
                    //         },
                    //         {
                    //             value: 1,
                    //             labelName: '结算中心',
                    //             disabled: false
                    //         }
                    //     ]
                    // },
                    {
                        type: 2,
                        label: '使用状态',
                        keyName: 'byisuse',
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
                        type: 1,
                        keyName: 'szorderby',
                        label: '显示顺序',
                        hasDec: '(输入正整数,如 0)',
                        isRedDec: true
                    },
                    {
                        type: 2,
                        label: '是否含有下级',
                        keyName: 'bisleaf',
                        optionList: [
                            {
                                value: 0,
                                labelName: '是'
                            },
                            {
                                value: 1,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否有售票权限',
                        keyName: 'issellticket',
                        optionList: [
                            {
                                value: 0,
                                labelName: '是'
                            },
                            {
                                value: 1,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 7,
                        keyName: 'szmemo',
                        label: '菜单描述'
                    }
                ],
                colnames: [
                    {
                        title: '菜单编号',
                        key: 'idutyid',
                        minWidth: 120
                    },
                    {
                        title: '菜单名称',
                        minWidth: 140,
                        render: (h,params) => {
                            return h('a',{
                                on: {
                                    click: () => {
                                        this.handleLook(params.row.idutyid);
                                    }
                                }
                            },params.row.szdutyname);
                        }
                    },
                    {
                        title: '菜单链接',
                        key: 'szgotopage',
                        minWidth: 240
                    },
                    {
                        title: '菜单类别',
                        minWidth: 100,
                        key: 'strdutype'
                    },
                    {
                        title: '是否有效',
                        minWidth: 100,
                        render: (h,params) => {
                            if(params.row.byisuse == 0) {
                                return h('span','禁用');
                            } else {
                                return h('span','启用');
                            }
                        }
                    },
                    {
                        title: '显示顺序',
                        minWidth: 100,
                        key: 'szorderby'
                    },
                    {
                        title: '菜单级别',
                        minWidth: 100,
                        render: (h,params) => {
                            return h('span',params.row.ilevel + '级');
                        }
                    },
                    {
                        title: '操作',
                        minWidth: 100,
                        render: (h,params) => {
                            if(params.row.byisuse == 1) {
                                return h('a',{
                                    on: {
                                        click: () => {
                                            this.iparentid = params.row.idutyid;
                                            this.previousIdList.push(params.row.idutyid);
                                            this.gotoNextLevel(params.row.idutyid);
                                        }
                                    }
                                },'[子菜单]');
                            } else {
                                return h('span','');
                            }
                        }
                    }
                ],
                size: 10,
                currentPage: 1,
                QueryBuilder: null,
                saveAdd: null
            }
        },
        async created() {
            this.isShowLoading = true;
            this.saveAdd = this.$handle.objDeepCopy(this.formDatas2);
            const res = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/listEspduty',{
                iparentid: 0,
                page: 1,
                pageSize: this.size
            });
            if(!res) {
                this.isShowLoading = false;
                return;
            }

            this.tableData = res.data.items;
            this.total = res.data.totalCount;
            this.QueryBuilder = {
                iparentid: 0,
                page: 1,
                pageSize: this.size
            }
            this.isShowLoading = false;
        },
        computed: {
            len() {
                return this.previousIdList.length;
            }
        },
        methods: {
            // 带条件查询
            handleQuery() {
                let queryParams = {
                    ...this.formDatas,
                    iparentid: this.iparentid,
                    page: 1,
                    pageSize: this.size
                }
                this.QueryBuilder = {
                    ...queryParams
                }
                this.currentPage = 1;
                this.execQuery(queryParams);
            },
            // 翻页查询
            handleChangePage(pageNum) {
                let queryParams = {
                    ...this.QueryBuilder
                }
                queryParams.page = pageNum;
                queryParams.iparentid = this.iparentid; // 每次翻页查询都必须获取最新父职责id，而不能使用上一次查询的父职责id
                queryParams.pageSize = this.size;
                this.currentPage = pageNum;
                this.execQuery(queryParams);
            },
            // 选中一条数据
            handleSelected(rowData) {
                // console.log(rowData);
                this.rowData = rowData;
            },
            // 菜单
            handleOperate(operateNum,icon) {
                if(operateNum === 7) {
                    this.gotoAdd(1);
                    return;
                } else if(operateNum === 11 && icon === 'reply') {
                    this.gotoPreviousLevel();
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
                        this.gotoAdd(2);
                        return;
                    }
                    if(operateNum === 9) {
                        this.isDel = true;
                        return;
                    }
                    if(operateNum === 10) {
                        this.handleLook(this.rowData.idutyid);
                        return;
                    }
                }
            },
            // 关闭新增/修改/查看页
            handleClose() {
                this.currentIndex = 1;
            },
            // 关闭删除确认框
            cancelDel() {
                this.isDel = false;
            },
            // 执行查询
            async execQuery(queryParams) {
                this.isLoading = true;
                const res = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/listEspduty',queryParams);
                // console.log(res);
                if(!res) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = res.data.items;
                this.total = res.data.totalCount;
                this.isLoading = false;
                this.rowData = null;
            },
            // 查看查询
            async handleLook(dutyId) {
                this.isShowLoading = true;
                const res = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/viewDuty',{
                    idutyid: dutyId
                });
                if(!res) {
                    this.isShowLoading = false;
                    return;
                }

                let info = res.data;
                let dataObj = {
                    '菜单编号：': info.idutyid,
                    '菜单代码：': info.szdutycode,
                    '菜单名称：': info.szdutyname,
                    '菜单链接：': info.szgotopage,
                    '权限类型：': info.strbypurviewtype,
                    '菜单类型：': info.strbycategorytype,
                    '菜单类别：': info.strdutype,
                    /**
                     * 多选字段的可取值范围
                     * iversion = 0
                     * byisuse = 0/1 
                     * bisleaf = 0/1 
                     * issellticket = 0/1 
                     */
                    '业务所属类别：': '综合业务',
                    '使用状态：': info.byisuse ? '启用' : '禁用',
                    '显示顺序：': info.szorderby,
                    '是否含有下级：': info.bisleaf ? '否' : '是',
                    '是否有售票权限：': info.issellticket ? '否' : '是',
                    '菜单描述：': info.szmemo
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
            // 执行删除 iparentid传入要删除子职责的父id
            async sureDel() {
                this.isModalLoading = true;
                const delRes = await this.$api.delete(this.baseUrl + '/sys/espdutytab/v1/deleteEspduty',{
                    idutyid: this.rowData.idutyid
                });
                if(!delRes) {
                    this.isModalLoading = false;
                    this.isDel = false;
                    return;
                }

                // 重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/listEspduty',{
                    iparentid: this.iparentid,
                    page: 1,
                    pageSize: this.size
                });
                if(!requeryRes) {
                    this.$Modal.warning({
						title: '温馨提示',
						content: '菜单信息已经删除成功，但重新查询时遇到异常，请手动刷新后查看'
					});
					return;
                }

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder = {
                    iparentid: this.iparentid,
                    page: 1,
                    pageSize: this.size
                }
                this.currentPage = 1;
                this.formDatas.szdutyname = '';
                this.formDatas.dutype = '00';
                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '菜单信息删除成功，欢迎使用易旅通智慧景区系统'
                });
            },
            // 执行新增/修改
            async getFormData2() {
                this.isShowLoading = true;
                let bodyParams = this.formDatas2;

                if(this.currentIndex === 2) {
                    bodyParams = {
                        ...bodyParams,
                        iparentid: this.iparentid,
                        idutyid: this.idutyid
                    }
                    // console.log(bodyParams);
                    const addRes = await this.$api.post(this.baseUrl + '/sys/espdutytab/v1/addEspduty',{},bodyParams);
                    // console.log(addRes);
                    if(!addRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }
                
                if(this.currentIndex === 3) {
                    bodyParams = {
                        ...bodyParams,
                        iparentid: this.iparentid,
                        idutyid: this.rowData.idutyid
                    }
                    // console.log(bodyParams);
                    const editRes = await this.$api.post(this.baseUrl + '/sys/espdutytab/v1/updateEspduty',{},bodyParams);
                    // console.log(editRes);
                    if(!editRes) {
                        this.isShowLoading = false;
                        return;
                    }
                }
                
                // 重新查询
                const requeryRes = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/listEspduty',{
                    iparentid: this.iparentid,
                    page: 1,
                    pageSize: this.size
                });
                // console.log(requeryRes);
                if(!requeryRes) {
                    this.$Modal.warning({
						title: '温馨提示',
						content: `${ this.currentIndex === 2 ? '新增' : '修改' }菜单信息已经成功，但重新查询时遇到异常，请手动刷新后查看`
					});
					return;
                }

                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.QueryBuilder = {
                    iparentid: this.iparentid,
                    page: 1,
                    pageSize: this.size
                }
                this.currentPage = 1;
                this.formDatas.szdutyname = '';
                this.formDatas.dutype = '00';
                this.rowData = null;
                this.$Modal.success({
                    title: '操作成功',
                    content: `${ this.currentIndex === 2 ? '新增' : '修改' }菜单信息成功，欢迎使用易旅通智慧景区系统`
                });
                this.currentIndex = 1;
                this.isShowLoading = false;
            },
            // 进入下一级职责
            async gotoNextLevel(currentDutyId) {
                this.isLoading = true;
                const nextRes = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/listEspduty',{
                    iparentid: currentDutyId,
                    page: 1,
                    pageSize: this.size
                });
                if(!nextRes) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = nextRes.data.items;
                this.total = nextRes.data.totalCount;
                this.QueryBuilder = {
                    iparentid: currentDutyId,
                    page: 1,
                    pageSize: this.size
                }
                this.currentPage = 1;
                this.formDatas.szdutyname = '';
                this.idutyid = currentDutyId;
                this.rowData = null;
                this.isLoading = false;
            },
            // 返回上一级职责
            async gotoPreviousLevel() {
                this.isLoading = true;
                let index = 0;
                if(this.len < 2) {
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '没有上一级菜单'
                    });
                    this.isLoading = false;
                    return;
                } else {
                    index = this.len - 2;
                    this.previousIdList.pop();
                }
                this.iparentid = this.previousIdList[index];
                this.idutyid = this.previousIdList[index];

                // 返回上一级查询
                const previousRes = await this.$api.get(this.baseUrl + '/sys/espdutytab/v1/listEspduty',{
                    iparentid: this.previousIdList[index],
                    page: 1,
                    pageSize: this.size
                });
                if(!previousRes) {
                    this.isLoading = false;
                    return;
                }

                this.tableData = previousRes.data.items;
                this.total = previousRes.data.totalCount;
                this.QueryBuilder = {
                    iparentid: this.previousIdList[index],
                    page: 1,
                    pageSize: this.size
                }
                this.currentPage = 1;
                this.rowData = null;
                this.isLoading = false;
            },
            // 进入新增/修改
            async gotoAdd(flag) {
                this.isShowLoading = true;
                const typeListAddRes = await this.$api.all([
                    {
                        url: this.baseUrl + '/sys/syspar/v1/getSysParame',
                        type: 'get',
                        queryParams: {
                            pmky: 'QXTP'
                        }
                    },
                    {
                        url: this.baseUrl + '/sys/syspar/v1/getSysParame',
                        type: 'get',
                        queryParams: {
                            pmky: 'ZZTP'
                        }
                    },
                    {
                        url: this.baseUrl + '/sys/syspar/v1/getSysParame',
                        type: 'get',
                        queryParams: {
                            pmky: 'DDTP'
                        }
                    }
                ]);
                // console.log(typeListAddRes);
                if(!typeListAddRes) {
                    this.isShowLoading = false;
                    return;
                }

                let limitsTypeList = typeListAddRes[0].map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });
                let dutyTypeList = typeListAddRes[1].map(item => {
                    return {
                        value: item.pmcd,
                        label: item.pmva
                    }
                });
                let dutyClassList = typeListAddRes[2].map(item => {
                    return {
                        value: item.pmcd,
                        labelName: item.pmva,
                        disabled: false
                    }
                });
                this.formItemList2[3].optionList = limitsTypeList;
                this.formItemList2[4].optionList = dutyTypeList;
                this.formItemList2[5].optionList = dutyClassList;
                if(flag === 1) {
                    this.formDatas2 = this.$handle.objDeepCopy(this.saveAdd);
                    this.formDatas2.bypurviewtype = limitsTypeList[0].value;
                    this.formDatas2.bycategorytype = dutyTypeList[0].value;
                    this.formDatas2.dutype = dutyClassList[0].value;
                    this.formItemList2[6].optionList.forEach(item => {
                        item.disabled = false;
                    });
                    this.currentIndex = 2;
                }
                if(flag === 2) {
                    for(let outter in this.formDatas2) {
                        for(let inner in this.rowData) {
                            if(outter === inner) {
                                this.formDatas2[outter] = this.rowData[inner];
                                break;
                            }
                        }
                    }
                    this.formItemList2[5].optionList.forEach(item => {
                        item.disabled = true;
                    });
                    this.formItemList2[6].optionList.forEach(item => {
                        item.disabled = true;
                    });
                    this.currentIndex = 3;
                }
                this.isShowLoading = false;
            },      
            // 改变最大显示数
            async changeSize(size) {
                this.size = size;
                this.handleChangePage(1);
            }
        }
    }
</script>

<style scoped>

</style>
