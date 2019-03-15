<template>
    <div id="distributor">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <Card v-show="currentIndex === 1">
            <p slot="title" class="cardTitle">
                <span>分销商用户查询</span>
                <topBtn :btnList="btnList" @operate="handleOperate"></topBtn>
            </p>
            <detail-form1 
                :isListPage="true"
                :formDatas="formDatas"
                :formItemList="formItemList"
                @getFormData="handleQuery"
                @listPageSelectedChange="selectChange"
                @checkedChange="checkedChange"></detail-form1>
            <radioTable 
                :colname="colnames"
                :total="total"
                :watchTotal="watchTotal"
                :tableData="tableData"
                :isRadio="isRadio"
                :loading="isLoading"
                @changePage="handleChangePage"
                @selected="handleSelected"></radioTable>
        </Card>
        <Card v-show="currentIndex === 2 || currentIndex === 3">
            <p slot="title" class="cardTitle">
                <span v-if="currentIndex ===2">新增分销商用户</span>
                <span v-if="currentIndex ===3">修改售票点信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <Form ref="addOrEditForm" :model="addFormDatas" inline>
                <fieldset v-for="(topItem,topIdx) in add_fieldsetList" :key="topIdx" class="chunkStyle_fieldset">
                    <legend class="chunkStyle_legend">{{ topItem.title }}</legend>
                    <div class="formChunk">
                        <FormItem 
                            v-for="(item,idx) in topItem.config" 
                            :label="item.label + '：'"
                            :prop="item.keyName"
                            :label-width="180"
                            :key="idx"
                            :class="[{ 'hide': item.isHide }, 'defaultClass']">
                            <Input 
                                v-if="item.type === 'input'" 
                                v-model="addFormDatas[item.keyName]"
                                :disabled="item.disabled"
                                style="width: 200px"></Input>
                            <Select 
                                v-if="item.type === 'select'" 
                                v-model="addFormDatas[item.keyName]"
                                :disabled="item.disabled"
                                style="width:200px">
                                <Option 
                                    v-for="(option,idx) in item.optionList"
                                    :value="option.value"
                                    :key="idx">{{ option.label }}</Option>
                            </Select>
                            <div v-if="item.type === 'tree'">
                                <Input v-model="addFormDatas[item.keyName]" style="width: 200px" readonly></Input>
                                <Button type="primary" @click="showTreeModal">{{ item.btnLabel }}</Button>
                                <Modal v-model="isShowTree" :mask-closable="false">
                                    <p slot="header" style="color:#5db2ff;">
                                        <span>{{ item.title }}</span>
                                    </p>
                                    <div style="overflow-y: auto;height: 250px">
                                        <Tree 
                                            v-if="item.treeData.length"
                                            :data="item.treeData"
                                            :load-data="expandTree"
                                            @on-select-change="clickTreeNode">
                                        </Tree>
                                        <span v-else>暂无数据</span>
                                    </div>
                                    <div slot="footer" style="text-align:center" >
                                        <Button type="ghost" @click="closeTree">关闭</Button>
                                    </div>
                                </Modal>
                            </div>
                            <span v-show="item.desc" style="color: red;">{{ item.desc }}</span>
                        </FormItem>
                    </div>
                </fieldset>
                <FormItem style="margin-left: 140px;">
                    <Button
                        type="primary" 
                        @click="submitForm('addOrEditForm')" 
                        shape="circle"
                        class="addpadding"
                        style="margin-right: 20px;">查询</Button>
                    <Button 
                        type="ghost" 
                        @click="resetForm('addOrEditForm')" 
                        shape="circle"
                        class="addpadding"
                        style="margin-right: 20px;">重置</Button>
                    <Button 
                        type="ghost" 
                        @click="handleClose" 
                        shape="circle"
                        class="addpadding">关闭</Button>
                </FormItem>
            </Form>
        </Card>
        <Card v-show="currentIndex === 4">
            <p slot="title" class="cardTitle">
                <span>查看用户信息</span>
                <topBtn :btnList="btnRefresh"></topBtn>
            </p>
            <div class="wrapper" v-for="(outterItem,outterIdx) in detailGroup" :key="outterIdx">
                <div class="blueTitle">{{ outterItem.title }}</div>
                <div class="mainPart">
                    <div class="mainPart_row" v-for="(item,idx) in outterItem.detailList" :key="idx">
                        <div class="mainPart_row_key">{{ item.key }}</div>
                        <div class="mainPart_row_value">{{ item.value }}</div>
                    </div>
                </div>
            </div>
            <Button 
                type="primary" 
                shape="circle" 
                class="addpadding" 
                @click="handleClose"
                style="margin-left: 200px;">关闭</Button>
        </Card>
        <Modal v-model="isDel" width="360">
            <p slot="header" style="color:#5db2ff;">
                <span>删除记录</span>
            </p>
            <div style="text-align:center">
                <img src="@/images/delete.png" />
                <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该用户信息吗？</p>
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
    name: 'distributor-manage',
    data () {
        return {
            isShowLoading: false,
            isDel: false,
            isModalLoading: false,
            isLoading: false,
            isRadio: true,
            isQuery: false,
            isShowTree: false,
            currentIndex: 1,
            total: 0,
            watchTotal: 0,
            rowData: null,
            initAddForm: null,
            tableData: [],
            detailGroup: [],
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
                usid: '',
                lname: '',
                email: '',
                corpname: '',
                radiobutton: -1,
                status: ''
            },
            formItemList: [
                {
                    type: 13,
                    label: '',
                    keyName: 'radiobutton',
                    labelWidth: 100,
                    isCustomWidth: true,
                    optionList: [
                        {
                            type: 1,
                            value: 0,
                            keyName: 'usid',
                            labelName: '按用户编号查询'
                        },
                        {
                            type: 1,
                            value: 1,
                            keyName: 'lname',
                            labelName: '按联系人姓名查询（模糊查询）'
                        },
                        {
                            type: 1,
                            value: 5,
                            keyName: 'email',
                            labelName: '按邮箱或手机号码查询'
                        },
                        {
                            type: 1,
                            value: 2,
                            keyName: 'corpname',
                            labelName: '按公司名查询（模糊查询）'
                        }
                    ]
                },
                {
                    type: 4,
                    label: '查询选项',
                    selectEvent: true,
                    keyName: 'status',
                    optionList: [
                        {
                            value: '01',
                            label: '查询有效用户'
                        },
                        {
                            value: '02',
                            label: '查询无效用户'
                        },
                        {
                            value: '00',
                            label: '查询未审核的用户'
                        },
                        {
                            value: '03',
                            label: '查询审核未通过的用户'
                        }
                    ]
                    // radiobutton固定为3
                }
            ],
            addFormDatas: {
                /* 基本资料 */
                usid: '',
                status: '01',
                ttlb: '99',
                szbusinessname: '旅行社业务',
                szregionalname: '',
                email: '',
                password: '',
                lgtp: '02',
                ustp: '01',
                bname: '',
                note2: '',
                /* 联系信息 */
                lname: '',
                addr: '',
                mobile: '',
                telno: '',
                qq: '',
                msn: '',
                /* 企业信息 */
                corpname: '',
                tourlicensecode: '',
                businesslicensescode: '',
                faxno: '',
                postno: '',
                notea: '',
                noteb: '',
                /* 隐含参数 */
                ldate: '',
                autofapiao: '',
                usqx: '11110001000000000000',
                mmqt: '',
                mmda: '',
                ibusinessid: 2,
                lpdate: '',
                lmdate: '',
                logtimes: '',
                lastdate: '',
                susid: '',
                usdj: '',
                zjhm: '',
                inote1: '',
                iregionalid: -1
            },
            add_fieldsetList: [
                {
                    title: '基本资料',
                    config: [
                        {
                            type: 'input',
                            label: '用户名',
                            keyName: 'usid',
                            desc: '*(由数字、26个英文字母组成,最少4位,首字符为字母!)',
                            disabled: false
                        },
                        {
                            type: 'input',
                            label: '登录密码',
                            keyName: 'password',
                            desc: '*(只能输入数字)',
                            isHide: false
                        },
                        {
                            type: 'select',
                            label: '用户状态',
                            keyName: 'status',
                            disabled: true,
                            optionList: [{
                                value: '01',
                                label: '有效用户'
                            }]
                        },
                        {
                            type: 'select',
                            label: '用户注册类型',
                            keyName: 'lgtp',
                            disabled: true,
                            optionList: [{
                                value: '02',
                                label: '团体用户'
                            }]
                        },
                        {
                            type: 'select',
                            label: '团队用户类别',
                            keyName: 'ttlb',
                            disabled: true,
                            optionList: [{
                                value: '99',
                                label: '分销商'
                            }]
                        },
                        {
                            type: 'select',
                            label: '是否主用户',
                            keyName: 'ustp',
                            disabled: true,
                            optionList: [{
                                value: '01',
                                label: '是'
                            }]
                        },
                        {
                            type: 'input',
                            label: '业务类型',
                            keyName: 'szbusinessname',
                            disabled: true
                        },
                        {
                            type: 'input',
                            label: '内部编号',
                            keyName: 'bname',
                            desc: '*（大于0的整数）'
                        },
                        {
                            type: 'tree',
                            label: '所属地',
                            keyName: 'szregionalname',
                            btnLabel: '选择',
                            title: '选择地区',
                            treeData: []
                        },
                        {
                            type: 'input',
                            label: '电子邮件',
                            keyName: 'email'
                        },
                        {
                            type: 'select',
                            label: '用户级别',
                            keyName: 'note2',
                            optionList: []
                        }
                    ]
                },
                {
                    title: '联系信息',
                    config: [
                        {
                            type: 'input',
                            label: '联系人',
                            keyName: 'lname'
                        },
                        {
                            type: 'input',
                            label: '地址',
                            keyName: 'addr'
                        },
                        {
                            type: 'input',
                            label: '手机号码',
                            keyName: 'mobile'
                        },
                        {
                            type: 'input',
                            label: '联系电话',
                            keyName: 'telno'
                        },
                        {
                            type: 'input',
                            label: 'QQ',
                            keyName: 'qq'
                        },
                        {
                            type: 'input',
                            label: 'MSN',
                            keyName: 'msn'
                        }
                    ]
                },
                {
                    title: '企业信息',
                    config: [
                        {
                            type: 'input',
                            label: '企业名称',
                            keyName: 'corpname'
                        },
                        {
                            type: 'input',
                            label: '旅行社许可证号',
                            keyName: 'tourlicensecode'
                        },
                        {
                            type: 'input',
                            label: '营业执照号码',
                            keyName: 'businesslicensescode'
                        },
                        {
                            type: 'input',
                            label: '企业传真',
                            keyName: 'faxno'
                        },
                        {
                            type: 'input',
                            label: '企业邮编',
                            keyName: 'postno'
                        },
                        {
                            type: 'input',
                            label: '企业网址',
                            keyName: 'notea'
                        },
                        {
                            type: 'input',
                            label: '企业简介',
                            keyName: 'noteb'
                        }
                    ]
                }
            ],
            colnames: [
                {
                    title: '用户编号',
                    key: 'usid'
                },
                {
                    title: '用户昵称',
                    key: 'note6'
                },
                {
                    title: '用户状态',
                    render: (h, params) => {
                        let field = '';
                        if (params.row.status == '00') {
                            field = '未审核用户';
                        } else if (params.row.status == '01') {
                            field = '有效用户';
                        } else if (params.row.status == '02') {
                            field = '无效用户';
                        } else if (params.row.status == '03') {
                            field = '审核未通过用户';
                        }
                        return h('span', field);
                    }
                },
                {
                    title: '联系人',
                    key: 'lname'
                },
                {
                    title: '手机号码',
                    width: 170,
                    key: 'mobile'
                },
                {
                    title: '邮箱地址',
                    key: 'email'
                },
                {
                    title: '联系电话',
                    key: 'telno'
                },
                {
                    title: '注册时间',
                    key: 'ldate'
                },
                {
                    title: '最后一次登录时间',
                    key: 'cdate'
                }
            ]
        };
    },
    async created () {
        this.isShowLoading = true;
        this.addInitDatas = this.$handle.objDeepCopy(this.addFormDatas);
        // 获取分销商信息列表
        const res = await this.$api.get(this.baseUrl + '/ec/custom/v1/customInfoViewList', {
            lgtp: '02',
            ttlb: '99',
            ibusinessid: 2,
            radiobutton: 6,
            page: 1,
            pageSize: 10
        });
        this.tableData = res.data.items;
        this.total = res.data.totalCount;
        this.isShowLoading = false;
    },
    methods: {
    // 带条件查询
        handleQuery () {
            if (this.formDatas.radiobutton === -1 && !this.formDatas.status) {
                this.$Modal.warning({
                    title: '温馨提示',
                    content: '请选择一种查询方式'
                });
            } else {
                this.isQuery = true;
                let queryParams = null,
                    commonParams = {
                        pageSize: 10,
                        page: 1,
                        lgtp: '02',
                        ttlb: '99',
                        ibusinessid: 2
                    };
                if (this.formDatas.radiobutton !== -1) {
                    queryParams = {
                        ...commonParams,
                        radiobutton: this.formDatas.radiobutton,
                        usid: this.formDatas.usid,
                        lname: this.formDatas.lname,
                        email: this.formDatas.email,
                        corpname: this.formDatas.corpname
                    };
                }
                if (this.formDatas.status) {
                    queryParams = {
                        ...commonParams,
                        radiobutton: 3,
                        status: this.formDatas.status
                    };
                }
                this.execQuery(queryParams);
            }
        },
        // 翻页查询
        handleChangePage (pageNum) {
            let queryParams = null,
                commonParams = {
                    pageSize: 10,
                    lgtp: '02',
                    ttlb: '99',
                    ibusinessid: 2
                };
            if (!this.isQuery) {
                this.execQuery({
                    ...commonParams,
                    page: pageNum,
                    radiobutton: 6
                });
            } else {
                if (this.formDatas.status) {
                    queryParams = {
                        radiobutton: 3,
                        status: this.formDatas.status
                    };
                } else {
                    queryParams = {
                        radiobutton: this.formDatas.radiobutton,
                        usid: this.formDatas.usid,
                        lname: this.formDatas.lname,
                        email: this.formDatas.email,
                        corpname: this.formDatas.corpname
                    };
                }
                this.execQuery({
                    ...commonParams,
                    ...queryParams,
                    page: pageNum
                });
            }
        },
        // 选择下拉列表查询选项
        selectChange (selectValue) {
            if (this.formDatas.status) {
                this.formDatas.radiobutton = -1;
            }
        },
        // 选择单选框组
        checkedChange (currentItem) {
            this.formDatas.status = '';
        },
        // 选中一条数据
        handleSelected (rowData) {
            this.rowData = rowData;
        },
        // 关闭删除确认框
        cancelDel () {
            this.isDel = false;
        },
        // 关闭地区树菜单对话框
        closeTree () {
            this.isShowTree = false;
        },
        // 菜单功能
        handleOperate (operateNum) {
      if (operateNum === 7) {
        this.isShowLoading = true;
        this.add_fieldsetList[0].config[1].isHide = false;
        this.add_fieldsetList[0].config[0].disabled = false;
        this.addFormDatas = this.$handle.objDeepCopy(this.addInitDatas);
        this.gotoAddEdit(operateNum);

      } else {
        if (!this.rowData) {
          this.$Modal.warning({
            title: '温馨提示',
            content: '请选择一条记录'
          });
          return;
        }
        if (operateNum === 8) {
          this.isShowLoading = true;
          this.add_fieldsetList[0].config[1].isHide = true;
          this.add_fieldsetList[0].config[0].disabled = true;
          for (let outter in this.addFormDatas) {
            for (let inner in this.rowData) {
              if (outter === inner) {
                this.addFormDatas[outter] = this.rowData[inner];
                break;
              }
            }
          }
          this.gotoAddEdit(operateNum);
          return;
        }
        if (operateNum === 9) {
          this.isDel = true;
          return;
        }
        if (operateNum === 10) {
          this.handleLook(this.rowData.usid);
          
        }
      }
    },
        // 关闭新增/修改/查看页
        handleClose () {
            this.currentIndex = 1;
        },
        // 清空新增/修改页表单数据
        resetForm (name) {
            this.$refs[name].resetFields();
        },
        // 提交新增/修改
        submitForm (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.execAdd();
                }
            });
        },
        // 获取点击的树节点的数据
        clickTreeNode (nodeArray) {
            this.addFormDatas.szregionalname = nodeArray[0].title;
            this.addFormDatas.iregionalid = nodeArray[0].treeId;
            this.isShowTree = false;
        },
        // 执行删除
        async sureDel () {
            this.isModalLoading = true;
            const delRes = await this.$api.delete(this.baseUrl + '/ec/custom/v1/deleteCustom', {
                usid: this.rowData.usid
            });
            if (!delRes) {
                this.isModalLoading = false;
                this.isDel = false;
            } else {
                const requeryRes = await this.$api.get(this.baseUrl + '/ec/custom/v1/customInfoViewList', {
                    lgtp: '02',
                    ttlb: '99',
                    ibusinessid: 2,
                    radiobutton: 6,
                    page: 1,
                    pageSize: 10
                });
                this.tableData = requeryRes.data.items;
                this.total = requeryRes.data.totalCount;
                this.watchTotal = requeryRes.data.totalCount;
                this.isQuery = false;
                this.rowData = null;
                this.isModalLoading = false;
                this.isDel = false;
                this.$Modal.success({
                    title: '操作成功',
                    content: '记录删除成功，欢迎使用易旅通智慧景区系统'
                });
            }
        },
        // 执行查询
        async execQuery (queryParams) {
            this.isLoading = true;
            const res = await this.$api.get(this.baseUrl + '/ec/custom/v1/customInfoViewList', queryParams);
            this.tableData = res.data.items;
            this.total = res.data.totalCount;
            if (this.isQuery) {
                this.watchTotal = res.data.totalCount;
            }
            this.isLoading = false;
            this.rowData = null;
        },
        // 展开下一级树节点
        async expandTree (itemInfo, callback) {
            if (itemInfo.hasnext === 'true') {
                const nextRegionRes = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/getLowerRegion', {
                    iregionalid: itemInfo.treeId
                });
                const nextTreeData = nextRegionRes.data.map(item => {
                    if (item.hasnext === 'false') {
                        return {
                            title: item.szregionalname,
                            treeId: item.szregionalid
                        };
                    } else {
                        return {
                            title: item.szregionalname,
                            loading: false,
                            children: [],
                            treeId: item.szregionalid,
                            hasnext: item.hasnext
                        };
                    }
                });
                callback(nextTreeData);
            } else {

            }
        },
        // 显示树节点菜单
        async showTreeModal () {
            this.isShowLoading = true;
            const sourceRegionRes = await this.$api.get(this.baseUrl + '/sys/sourceRegion/v1/getLowerRegion', {
                iregionalid: 0
            });
            this.add_fieldsetList[0].config[8].treeData = sourceRegionRes.data.map(item => {
                return {
                    title: item.szregionalname,
                    loading: false,
                    children: [],
                    treeId: item.szregionalid,
                    hasnext: item.hasnext
                };
            });
            this.isShowLoading = false;
            this.isShowTree = true;
        },
        // 进入新增or修改页
        async gotoAddEdit (operateNum) {
            // 获取用户级别【也叫价格分组】下拉列表
            const preRes = await this.$api.get(this.baseUrl + '/ticket/crowdKindPrice/v1/getCrowdKindPriceSelectData');
            this.add_fieldsetList[0].config[10].optionList = preRes.data.retrieve.map(item => {
                return {
                    value: item.pmcd,
                    label: item.pmva
                };
            });
            if (operateNum === 7) {
                this.addFormDatas.note8 = preRes.data.retrieve[0].pmcd;
                this.currentIndex = 2;
            } else {
                const preEditRes = await this.$api.get(this.baseUrl + '/ec/custom/v1/getCustomInfoById', {
                    usid: this.rowData.usid
                });
                for (let outter in this.addFormDatas) {
                    for (let inner in preEditRes.data.custom) {
                        if (outter === inner) {
                            if (inner === 'szregionalname') {
                                this.addFormDatas[outter] = preEditRes.data.custom[inner].trim().split(',').join('-');
                            } else {
                                this.addFormDatas[outter] = preEditRes.data.custom[inner];
                            }
                            break;
                        }
                    }
                }
                this.currentIndex = 3;
            }
            this.isShowLoading = false;
        },
        // 查看查询
        async handleLook (userId) {
            this.isShowLoading = true;
            const lookRes = await this.$api.get(this.baseUrl + '/ec/custom/v1/getCustomInfoById', {
                usid: userId
            });
            let custom = lookRes.data.custom;
            let userStatus = '',
                userLoginType = '',
                userGroupType = '';
            isMainAccount = '';

            if (custom.status === '00') {
                userStatus = '未审核用户';
            } else if (custom.status === '01') {
                userStatus = '有效用户';
            } else if (custom.status === '02') {
                userStatus = '无效用户';
            } else if (custom.status === '03') {
                userStatus = '审核未通过用户';
            }
            userLoginType = custom.lgtp === '01' ? '散客用户' : '团体用户';
            if (custom.ttlb === '99') {
                userGroupType = '分销商';
            } else if (custom.ttlb === '01') {
                userGroupType = '旅行社';
            } else if (custom.ttlb === '02') {
                userGroupType = '导游';
            }
            isMainAccount = custom.ustp === '01' ? '是' : '否';

            let dataObj_base = {
                    '用户编号：': custom.usid,
                    '用户状态：': userStatus,
                    '用户注册类型：': userLoginType,
                    '团队用户类别：': userGroupType,
                    '是否主用户：': isMainAccount,
                    '业务类型：': custom.szbusinessname,
                    '所属地：': custom.szregionalname.trim().split(',').join('-'),
                    '电子邮件：': custom.email
                },
                dataObj_contact = {
                    '联系人：': custom.lname,
                    '地址：': custom.addr,
                    '手机号码：': custom.mobile,
                    '联系号码：': custom.telno,
                    '身份证：': custom.zjhm,
                    'QQ：': custom.qq,
                    'MSN：': custom.msn
                },
                dataObj_company = {
                    '企业名称：': custom.corpname,
                    '旅行社许可证号：': custom.tourlicensecode,
                    '营业执照号码：': custom.businesslicensescode,
                    '企业传真：': custom.faxno,
                    '企业邮编：': custom.postno,
                    '企业网址：': custom.notea,
                    '企业简介：': custom.noteb
                },
                // 结算系统用户信息 不清楚是哪个字段
                dataObj_account = {
                    '结算系统用户编号：': '',
                    '结算系统用户账号：': ''
                };

            let list_base = [],
                list_contact = [],
                list_company = [],
                list_account = [],
                list_group = [];

            for (let attr in dataObj_base) {
                list_base.push({
                    key: attr,
                    value: dataObj_base[attr]
                });
            }
            for (let attr in dataObj_contact) {
                list_contact.push({
                    key: attr,
                    value: dataObj_contact[attr]
                });
            }
            for (let attr in dataObj_company) {
                list_company.push({
                    key: attr,
                    value: dataObj_company[attr]
                });
            }
            for (let attr in dataObj_account) {
                list_account.push({
                    key: attr,
                    value: dataObj_account[attr]
                });
            }
            list_group = [
                {
                    title: '基本资料',
                    detailList: list_base
                },
                {
                    title: '联系信息',
                    detailList: list_contact
                },
                {
                    title: '企业信息',
                    detailList: list_company
                },
                {
                    title: '结算信息',
                    detailList: list_account
                }
            ];
            this.detailGroup = list_group;
            this.currentIndex = 4;
            this.isShowLoading = false;
        },
        // 执行新增/修改
        async execAdd () {
            this.isShowLoading = true;
            this.watchTotal = 0;
            let fData = this.addFormDatas;
            if (this.currentIndex === 2) {
                const addRes = await this.$api.post(this.baseUrl + '/ec/custom/v1/CustomInfoSave', {
                    flag: 1
                }, fData);
            }
            if (this.currentIndex === 3) {
                const editRes = await this.$api.post(this.baseUrl + '/ec/custom/v1/CustomInfoSave', {
                    flag: 2
                }, fData);
            }
            const requeryRes = await this.$api.get(this.baseUrl + '/ec/custom/v1/customInfoViewList', {
                lgtp: '02',
                ttlb: '99',
                ibusinessid: 2,
                radiobutton: 6,
                page: 1,
                pageSize: 10
            });
            this.tableData = requeryRes.data.items;
            this.total = requeryRes.data.totalCount;
            this.watchTotal = requeryRes.data.totalCount;
            this.isQuery = false;
            this.rowData = null;
            this.$Modal.success({
                title: '操作成功',
                content: this.currentIndex === 2 ? '新增分销商用户信息成功，欢迎使用易旅通智慧景区系统' : '修改分销商用户信息成功，欢迎使用易旅通智慧景区系统'
            });
            this.currentIndex = 1;
            this.isShowLoading = false;
        }
    }
};
</script>

<style scoped lang="less">
.defaultClass {
  width: 50%;
  margin-right: 0;
}
.hide {
  display: none;
}
.wrapper {
  border: 1px solid #5db2ff;
  position: relative;
  margin-bottom: 30px;
  .blueTitle {
    position: absolute;
    left: 100px;
    top: -14px;
    background-color: #fff;
    padding: 0 10px;
    font-size: 15px;
    font-weight: bold;
    color: #5db2ff;
    line-height: 28px;
  }
  .mainPart {
    overflow: hidden;
    padding: 30px 0 10px 0;
    .mainPart_row {
      float: left;
      width: 50%;
      margin-bottom: 20px !important;
      line-height: 32px;
      overflow: hidden;
      .mainPart_row_key {
        width: 200px;
        text-align: right;
        padding-right: 12px;
        float: left;
      }
      .mainPart_row_value {
        float: left;
      }
    }
  }
}
</style>
