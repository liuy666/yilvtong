<style scoped lang="less">

</style>

<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">岗位管理</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                            @refreshData="refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                        :is-list-page="true"
                        :is-mixed="false"
                        :label-width="labelWidth"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="true"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                        @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增岗位信息</span>
                    <span v-if="currentIndex === 13" class="title_span">修改岗位信息</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "140"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看岗位信息</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas2"
                        :formItemList="formItemList2"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
            <Card v-show="currentIndex === 15">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">岗位与职责关联</span>
                </p>
                <detail-form1
                        ref="post"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_access"
                        :labelWidth = "140"
                        :formItemList = "formItemList_access"
                        :isClose = "isClose"
                        :btn-loading = "btnLoading"
                        @getFormData = "setAccess"
                        @selectTreeAllData = "selectTreeAllData"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    import topTitleOpbtn from '../../main-components/top-title-opbtn.vue';
    import detailForm from '../../main-components/detail-form.vue';
    export default {
        data(){
            return{
                searchCount: 1,   //进页面的第一次请求，列表
                currentIndex: 1,
                tableTitle: '',
                isClose: false,
                tipName: '',
                spinShow: true,
                total: 0,
                loading: false,
                single: 0,
                btnLoading: false,
                currentRowData:{},
                urlQuery: {},
                labelWidth: 130,
                btnList :[
                    {
                        type : 1,
                        btnlabel : "刷新"
                    },
                    {
                        type : 12,
                        btnlabel : "新增",
                    },
                    {
                        type : 13,
                        btnlabel : "修改",
                    },
                    {
                        type : 4,
                        btnlabel : "删除",
                        dialogType: 'del',
                        url: '',
                    },
                    {
                        type : 14,
                        btnlabel : "查看",
                    }
                ],
                colname: [
                    {
                        title: '岗位编号',
                        key: 'ipostsid'
                    },
                    {
                        title: '岗位名称',
                        key: 'szpostsname'
                    },
                    {
                        title: '岗位类别',
                        render: (h, params) => {
                            return h('span', params.row.bycategorytype ? '超级岗位' : '普通岗位')
                        }
                    },
                    {
                        title: '岗位类型',
                        key: 'posttype'
                    },
                    {
                        title: '岗位描述',
                        key: 'szmemo'
                    },
                    {
                        title: '是否有效',
                        render: (h, params) => {
                            return h('span', params.row.byisuse ? '启用' : '禁用')
                        }
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            let arr = [
                                h('span', {
                                    'class' : {
                                        hover_span: true
                                    },
                                    // style: {
                                    //     marginRight: '10px'
                                    // },
                                    on : {
                                        click : () => {
                                            this.changeIndex(15, params.row, false)
                                        }
                                    }
                                }, '所属职责')
                            ];
                            // let arr1 = [
                            //     h('span', {
                            //         'class' : {
                            //             hover_span: true
                            //         },
                            //         on : {
                            //             click : () => {
                            //                 this.changeIndex(15, params.row, true)
                            //             }
                            //         }
                            //     }, '所属按钮职责')
                            // ];
                            // if (params.row.posttype === '平台岗位') {
                            //     arr.push(arr1[0]);
                            // }
                            return h('span', arr)
                        }
                    }
                ],
                formItemList : [
                    {
                        label : "岗位类型",
                        keyName : "posttype",
                        type : 4,
                        labelWidth: 80,
                        optionList : [
                            {
                                value : '00',
                                label : "所有岗位"
                            },
                            {
                                value : '01',
                                label : "平台岗位"
                            },
                            {
                                value : '02',
                                label : "景区岗位"
                            }
                        ]
                    },
                    {
                        label : "岗位名称",
                        keyName : "szpostsname",
                        type : 1,
                        labelWidth: 80
                    }
                ],
                tableData: [],
                pars: {
                    pageNum: 10,
                    pageCode: 1,
                    formDatas: {
                        posttype: '00'
                    }
                },
                formDatas1: {},
                ruleDatas: {
                    szpostscode: [
                        { required: true, message: '岗位代码不能为空', trigger: 'blur' }
                    ],
                    szpostsname: [
                        { required: true, message: '岗位名称不能为空', trigger: 'blur' }
                    ]
                },
                formItemList1: [
                    {
                        type: 1,
                        label: '岗位代码',
                        keyName: 'szpostscode',
                    },
                    {
                        type: 1,
                        label: '岗位名称',
                        keyName: 'szpostsname',
                    },
                    {
                        type: 4,
                        label: '岗位类型',
                        keyName: 'posttype',
                        optionList: [
                            {
                                value : '01',
                                label : "平台岗位"
                            },
                            {
                                value : '02',
                                label : "景区岗位"
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否使用',
                        keyName: 'byisuse',
                        optionList: [
                            {
                                value: 1,
                                labelName: '启用'
                            },
                            {
                                value: 0,
                                labelName: '禁用'
                            },
                        ]
                    },
                    {
                        type: 7,
                        label: '岗位描述',
                        keyName: 'szmemo',
                    }
                ],
                formDatas2: {},
                formItemList2: [
                    {
                        label: '岗位编号',
                        keyName: 'ipostsid'
                    },
                    {
                        label: '岗位代码',
                        keyName: 'szpostscode'
                    },
                    {
                        label: '岗位名称',
                        keyName: 'szpostsname'
                    },
                    {
                        label: '岗位类别',
                        keyName: 'bycategorytype'
                    },
                    {
                        label: '岗位类型',
                        keyName: 'posttype'
                    },
                    {
                        label: '是否使用',
                        keyName: 'byisuse'
                    },
                    {
                        label: '岗位描述',
                        keyName: 'szmemo'
                    }
                ],
                //所属职责页面
                formDatas_access: {},
                formItemList_access: [
                    {
                        type: 1,
                        label: '岗位编号',
                        keyName: 'ipostsid',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '岗位名称',
                        keyName: 'szpostsname',
                        disabled: true
                    },
                    {
                        type: 24,
                        label: '对应职责',
                        keyName: 'idutyids',
                        treeData: [],
                        checkAll: false,
                        treeName: 'post'
                    },
                    {
                        type: 7,
                        label: '描述',
                        keyName: 'szmemo'
                    }
                ],
                treeData: []
            }
        },
        methods:{
            //点击新增修改查看按钮跳到对应页面
            changeIndex (type, row, isBtnAccess) {
                this.spinShow = true;
                if (type === 12) {
                    this.tipName = '岗位信息新增';
                    this.setAddInitData(type);
                } else if (type === 13) {
                    this.tipName = '岗位信息修改';
                    this.setEditInitData(type);
                } else if (type === 14) {
                    this.setViewInitData(type);
                } else if (type === 15) {
                    this.tipName = '岗位与职责关联添加';
                    this.setAccessInitData(type,row, isBtnAccess);
                }
            },
            //选中某一行
            selected(row){
                this.currentRowData["id"] = row.ipostsid;
                this.currentRowData["name"] = 'ipostsid';
                this.btnList[3].url = `${this.baseUrl}/sys/post/v1/deleteEsppostsTabById?ipostsid=${row.ipostsid}`
            },
            //选择页码
            changePage(pageCode) {
                this.$common.getParsBeforeSearch(this);
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
            },
            //选择每页条数
            changePageSize(pageSize){
                this.$common.getParsBeforeSearch(this);
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
            },
            //条件查询
            getFormData (obj) {
                this.pars.formDatas = obj;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
            },
            clearFormData(){
                this.pars.formDatas = {
                    posttype: '00'
                }
            },
            //删除后更新数据
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
            },
            //执行删除时如当页只有一条数据
            isSingle(page){
                this.single = page
            },
            //需要拼接的url后面的参数
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    szpostsname: this.pars.formDatas.szpostsname,
                    posttype: this.pars.formDatas.posttype === '00' ? '' : this.pars.formDatas.posttype
                };
            },
            //新增修改初始化
            async getFormDataAdd (obj) {
                this.btnLoading = true;
                let aaa = '';
                if (this.currentIndex === 12) {
                    obj['bycategorytype'] = '0';
                    aaa = await this.$common.addNewData('/sys/post/v1/saveEsppoststab?flag=1', this, obj, 'post', true)
                } else if (this.currentIndex === 13) {
                    // obj['szcreator'] = this.Cookies.get('user');
                    aaa = await this.$common.editData('/sys/post/v1/saveEsppoststab?flag=2', this, obj, 'post', true)
                }
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
                }
            },
            //新增页面初始化
            setAddInitData (type) {
                this.formDatas1 = {
                    byisuse: 1,
                    posttype: '01'
                };
                this.spinShow = false;
                this.currentIndex = type;
            },
            //修改页面初始化
            setEditInitData (type) {
                this.$http.get(this.baseUrl+'/sys/post/v1/getEsppoststabById',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        ipostsid: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.posttype = data.posttype === '平台岗位'? '01' : '02';
                        this.formDatas1 = data;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                })
            },
            //查看页面初始化
            setViewInitData (type) {
                this.$http.get(this.baseUrl+'/sys/post/v1/getEsppoststabById',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        ipostsid: this.currentRowData.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.bycategorytype = data.bycategorytype ? '超级岗位' : '普通岗位';
                        data.byisuse = data.byisuse ? '启用' : '禁用';
                        this.formDatas2 = data;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type;
                })
            },
            //权限页初始化
            setAccessInitData (type,row, isBtnAccess) {
                let [url,obj] = ['',{
                    access_token: this.Cookies.get('token'),
                    ipostsid: row.ipostsid
                }];
                let item = {
                    ipostsid: row.ipostsid,
                    szpostsname: row.szpostsname,
                    byisuse: 1
                };
                if (isBtnAccess) {
                    url = `${this.baseUrl}/sys/postsDuty/v1/viewListBtnPostDuty`;
                    this.formDatas_access = {
                        ...item,
                        flag: 2
                    };
                } else {
                    url = `${this.baseUrl}/sys/postsDuty/v1/getAllpost`;
                    this.formDatas_access = {
                        ...item,
                        flag: 1
                    };
                }
                this.$http(url, {params: obj}).then(res => {
                    if (res.data.code === 200) {
                        let data = [];
                        this.treeData = res.data.data;
                        this.formItemList_access[2].treeData = this.toTreeData(this.treeData);
                        this.treeData.map(item => {
                            if (item.checked) {
                                data.push(item)
                            }
                        });
                        if (this.treeData.length === data.length) {
                            this.formItemList_access[2].checkAll = true;
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            //选中树形所有数据
            selectTreeAllData (checkAll) {
                this.formItemList_access[2].checkAll = !checkAll;
                this.treeData.map(item => {
                    item.checked = !checkAll
                });
                this.formItemList_access[2].treeData = this.toTreeData(this.treeData);
            },
            //一维数组转树形结构
            toTreeData (data) {
                function tree(idutyid) {
                    let arr = [];
                    data.filter(item => {
                        return item.iparentid === idutyid
                    }).forEach(item => {
                        arr.push({
                            id: item.idutyid,
                            title: item.szdutyname,
                            checked: item.checked,
                            expand: true,
                            children: tree(item.idutyid)
                        })
                    });
                    return arr
                }
                return tree(0)  // 第一级节点的父id，是null或者0，视情况传入
            },
            //权限设置保存
            async setAccess (obj) {
                this.btnLoading = true;
                let arr = this.$refs.post.$refs.post[0].getCheckedNodes();
                let [str,aaa] = ['',''];
                let url = `/sys/postsDuty/v1/esppostdutySave`;
                arr.map(item => {
                    str += `${item.id},`
                });
                str = str.substr(0,str.length-1);
                obj = JSON.parse(JSON.stringify(obj));
                obj['idutyids'] = str;
                delete obj.szpostsname;
                url = `${url}?${this.QS.stringify(obj)}`;
                aaa = await this.$common.editData(url, this, {}, 'put', true);
                if (aaa) {
                    this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
                }
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/sys/post/v1/showAllListEsppost', this, 'get')
        }
    }
</script>
