<style scoped lang="less">

</style>

<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">系统参数管理<span style="color: red">（注：仅开发使用，不用测试）</span></span>
                    <top-btn
                        :btnList="btnList"
                        :currentRowData="currentRowData"
                        @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <div style="font-size: 12px" v-if="pars.tableTitle !== '系统参数顶级'">
                    <div style="cursor: pointer; display: inline-block"
                         @click="backBeforeLevel(pars.formDatas.pmky, pars.formDatas.pmva, pars.tableTitle)">
                        <Icon size="16" type="reply"></Icon>
                        <span>返回上一级</span>
                    </div>
                    <div style="width: 2px; display: inline-block">
                        <Icon size="14" type="ios-arrow-forward"></Icon>
                    </div>
                    <Icon size="14" type="ios-arrow-forward"></Icon>
                    <span style="color: #2d8cf0">{{pars.tableTitle.split('--')[0]}}</span>
                </div>
                <detail-form1
                        :is-list-page="true"
                        :is-mixed="false"
                        :label-width="labelWidth"
                        :formDatas="pars.formDatas"
                        :formItemList="formItemList"
                        :tipMsg="tipMsg"
                        @getFormData="getFormData"
                        @clearFormData="clearFormData"
                ></detail-form1>
                <radio-table
                        :tableTitle="pars.tableTitle"
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :isRadio="false"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @selected="selected"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" style="height:32px;">
                    <span v-if="currentIndex === 12" style="display:inline-block;float:left;line-height:32px;">新增系统参数</span>
                    <span v-if="currentIndex === 13" style="display:inline-block;float:left;line-height:32px;">修改系统参数</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        :labelWidth = "160"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">查看系统参数</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :formDatas="formDatas2"
                        :formItemList="formItemList2"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
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
        const validatePmky = (rule, value, callback) => {
            const reg = /^([A-Z]{4})$/;
            if (!value) {
                let str = '参数表示不能为空';
                callback(new Error(str))
            } else if (!reg.test(value)) {
                let str = '参数格式错误，只能输入大写英文字母组成的4位字符';
                callback(new Error(str))
            } else {
                callback();
            }
        };
        return{
            searchCount: 1,   //进页面的第一次请求，列表
            currentIndex: 1,
            tableTitle: '',
            isClose: false,
            tipName: '',
            spinShow: true,
            total: 0,
            loading: false,
            currentRowData:{},
            urlQuery: {},
            labelWidth: 130,
            tipMsg: '本功能中所有参数，非常重要，请不要随便修改、删除',
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 12,
                    btnlabel : "新增同级"
                }
            ],
            formItemList : [
                {
                    type : 1,
                    label : "参数(支持模糊查询)",
                    keyName : "pmky"
                }
            ],
            colname: [
                {
                    title: '参数',
                    width: 150,
                    render : (h, params) => {
                        if (params.row.id) {
                            return h('span', params.row.id.pmky)
                        }
                    }
                },
                {
                    title: '参数码',
                    width: 150,
                    render : (h, params) => {
                        if (params.row.id) {
                            return h('span', params.row.id.pmcd)
                        }
                    }
                },
                {
                    title: '参数值',
                    key: 'pmva',
                    width: 400
                },
                {
                    title: '整型[isa]',
                    key: 'isa',
                    width: 150
                },
                {
                    title: '级别',
                    width: 150,
                    render : (h, params) => {
                        return h('span', params.row.systp === '0' ? '顶级' : `${params.row.systp}级`);
                    }
                },
                {
                    title: '是否启用',
                    width: 150,
                    render : (h, params) => {
                        return h('span', params.row.isvalue ? '启用' : '停用');
                    }
                },
                {
                    title: '操作',
                    width: 454,
                    render: (h, params) => {
                        const row = params.row;
                        let arr = [
                            h('span', {
                                'class' : {
                                    hover_span: true
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.pars.pageCode = 1;
                                        this.pars.pageNum = 10;
                                        this.pars.flag = 0;
                                        this.pars.formDatas.pmky = row.id.pmky;
                                        this.pars.formDatas.pmcd = row.id.pmcd;
                                        this.pars.formDatas.pmva = JSON.parse(JSON.stringify(this.pars)).tableTitle.split('--')[0];
                                        this.pars.formDatas.path = 'down';
                                        this.pars.tableTitle = `${row.pmva}--${row.id.pmky}--${parseInt(row.systp) + 1}级`;
                                        this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
                                    }
                                }
                            }, '下一级'),
                            h('span', {
                                'class' : {
                                    hover_span: true
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.changeIndex(12, row.id, row.systp)
                                    }
                                }
                            }, '新增下级'),
                            h('span', {
                                'class' : {
                                    hover_span: true
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.changeIndex(13, row.id)
                                    }
                                }
                            }, '修改'),
                            h('span', {
                                'class' : {
                                    hover_span: true
                                },
                                on : {
                                    click : () => {
                                        this.changeIndex(14, row.id)
                                    }
                                }
                            }, '查看')
                        ];
                        let arr0 = [
                            h('span', {
                                'class' : {
                                    hover_span: true
                                },
                                style: {
                                    marginRight: '10px'
                                },
                                on : {
                                    click : () => {
                                        this.pars.pageCode = 1;
                                        this.pars.pageNum = 10;
                                        this.pars.flag = 0;
                                        this.pars.formDatas.pmky = row.id.pmky;
                                        this.pars.formDatas.pmcd = row.id.pmcd;
                                        this.pars.formDatas.pmva = JSON.parse(JSON.stringify(this.pars)).tableTitle.split('--')[0];
                                        this.pars.formDatas.path = 'up';
                                        if (parseInt(row.systp) - 1 === 0) {
                                            this.pars.tableTitle = '系统参数顶级'
                                        } else {
                                            this.pars.tableTitle = `${row.pmva}--${row.id.pmky}--${parseInt(row.systp) - 1}级`
                                        }
                                        this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
                                    }
                                }
                            }, '上一级')
                        ];
                        if (parseInt(row.systp)) {
                            arr.unshift(arr0[0]);
                            arr.splice(1,2)
                        }
                        return h('span', arr)
                    }
                }
            ],
            tableData: [],
            pars: {
                pageNum: 10,
                pageCode: 1,
                tableTitle: '',
                flag: 0,
                formDatas: {
                    pmky: '',
                    pmcd: '',
                    path: ''
                }
            },
            formDatas1: {

            },
            ruleDatas: {
                pmky: [
                    { required: true, validator: validatePmky, trigger: 'blur' }
                ],
                pmva: [
                    { required: true, message: '参数值不能为空', trigger: 'blur' }
                ]
            },
            formItemList1: [
                {
                    type: 1,
                    label: '参数',
                    keyName: 'pmky',
                    hasDec: '4位大写英文字母',
                    isRedDec: true,
                    cols: 12
                },
                {
                    type: 1,
                    label: '级别',
                    keyName: 'systp',
                    disabled: true,
                    cols: 12
                },
                {
                    type: 1,
                    label: '参数码',
                    keyName: 'pmcd',
                    hasDec: '',
                    disabled: true,
                    isRedDec: true,
                    cols: 12
                },
                {
                    type: 2,
                    label: '是否启用',
                    keyName: 'isvalue',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: '启用'
                        },
                        {
                            value: 0,
                            labelName: '停用'
                        }
                    ],
                },
                {
                    type: 1,
                    label: '参数值a[pmva]',
                    keyName: 'pmva',
                    cols: 12
                },
                {
                    type: 2,
                    label: '整型[isa]',
                    keyName: 'isa',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: 1
                        },
                        {
                            value: 0,
                            labelName: 0
                        }
                    ],
                },
                {
                    type: 1,
                    label: '参数值b[pmvb]',
                    keyName: 'pmvb',
                    cols: 12
                },
                {
                    type: 2,
                    label: '整型[isb]',
                    keyName: 'isb',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: 1
                        },
                        {
                            value: 0,
                            labelName: 0
                        }
                    ],
                },
                {
                    type: 1,
                    label: '参数值c[pmvc]',
                    keyName: 'pmvc',
                    cols: 12
                },
                {
                    type: 2,
                    label: '整型[isc]',
                    keyName: 'isc',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: 1
                        },
                        {
                            value: 0,
                            labelName: 0
                        }
                    ],
                },
                {
                    type: 1,
                    label: '参数值d[pmvd]',
                    keyName: 'pmvd',
                    cols: 12
                },
                {
                    type: 2,
                    label: '整型[isd]',
                    keyName: 'isd',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: 1
                        },
                        {
                            value: 0,
                            labelName: 0
                        }
                    ],
                },
                {
                    type: 1,
                    label: '参数值e[pmve]',
                    keyName: 'pmve',
                    cols: 12
                },
                {
                    type: 2,
                    label: '整型[ise]',
                    keyName: 'ise',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: 1
                        },
                        {
                            value: 0,
                            labelName: 0
                        }
                    ],
                },
                {
                    type: 1,
                    label: '参数值f[pmvf]',
                    keyName: 'pmvf',
                    cols: 12
                },
                {
                    type: 2,
                    label: '整型[isf]',
                    keyName: 'isf',
                    cols: 12,
                    optionList: [
                        {
                            value: 1,
                            labelName: 1
                        },
                        {
                            value: 0,
                            labelName: 0
                        }
                    ],
                },
                {
                    type: 7,
                    label: '参数备注',
                    keyName: 'note'
                }
            ],
            formDatas2: {},
            formItemList2: [
                {
                    label: '参数',
                    keyName: 'pmky',
                    cols: 12
                },
                {
                    label: '级别',
                    keyName: 'systp',
                    cols: 12
                },
                {
                    label: '参数码',
                    keyName: 'pmcd',
                    cols: 12
                },
                {
                    label: '是否启用',
                    keyName: 'isvalue',
                    cols: 12
                },
                {
                    label: '参数值a[pmva]',
                    keyName: 'pmva',
                    cols: 12
                },
                {
                    label: '整型[isa]',
                    keyName: 'isa',
                    cols: 12
                },
                {
                    label: '参数值b[pmvb]',
                    keyName: 'pmvb',
                    cols: 12
                },
                {
                    label: '整型[isb]',
                    keyName: 'isb',
                    cols: 12
                },
                {
                    label: '参数值c[pmvc]',
                    keyName: 'pmvc',
                    cols: 12
                },
                {
                    label: '整型[isc]',
                    keyName: 'isc',
                    cols: 12
                },
                {
                    label: '参数值d[pmvd]',
                    keyName: 'pmvd',
                    cols: 12
                },
                {
                    label: '整型[isd]',
                    keyName: 'isd',
                    cols: 12
                },
                {
                    label: '参数值f[pmvf]',
                    keyName: 'pmvf',
                    cols: 12
                },
                {
                    label: '整型[isf]',
                    keyName: 'isf',
                    cols: 12
                },
                {
                    label: '参数备注',
                    keyName: 'note'
                }
            ]
        }
    },
    methods:{
        //点击新增修改查看按钮跳到对应页面
        changeIndex (type, id, systp) {
            this.spinShow = true;
            if (type === 12) {
                this.tipName = '系统参数新增';
                this.setAddInitData(type,this.pars.tableTitle, id, systp)
            } else if (type === 13) {
                this.tipName = '系统参数修改';
                this.setEditInitData(type,id)
            } else if (type === 14) {
                this.setViewInitData(type,id)
            }
        },
        //选中某一行
        selected(row){
            this.currentRowData["id"] = 1;
            this.currentRowData["name"] = 'icrowdkindpriceid'
        },
        //选择页码
        changePage(pageCode) {
            this.$common.getParsBeforeSearch(this);
            this.pars.flag = 0;
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
        },
        //选择每页条数
        changePageSize(pageSize){
            this.$common.getParsBeforeSearch(this);
            this.pars.flag = 0;
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
        },
        //条件查询
        getFormData (obj) {
            this.currentRowData = {};
            this.pars.formDatas = obj;
            if (this.pars.formDatas.pmky) {
                this.pars.flag = 1
            } else {
                this.pars.flag = 0;
                this.pars.tableTitle= '系统参数顶级';
            }
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
        },
        clearFormData(){
            this.pars.formDatas = {
                pmky: '',
                pmcd: '',
                path: ''
            };
        },
        //需要拼接的url后面的参数
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                pmky: this.pars.formDatas.pmky,
                pmcd: this.pars.formDatas.pmcd,
                path: this.pars.formDatas.path,
                flag: this.pars.flag
            };
        },
        //返回上级
        backBeforeLevel (pmky, pmva, tableTitle) {
            let systp = tableTitle.split('--')[2];
            if (parseInt(systp) - 1 === 0) {
                this.pars.flag = 0;
                this.pars.formDatas.pmky = '';
                this.pars.formDatas.pmcd = '';
                this.pars.formDatas.path = '';
                this.pars.tableTitle = '系统参数顶级'
            } else if (parseInt(systp) - 1 === 1) {
                this.pars.flag = 0;
                this.pars.formDatas.pmky = pmky;
                this.pars.formDatas.pmcd = '****';
                this.pars.formDatas.path = 'down';
                this.pars.tableTitle = `${pmva}--${pmky}--${parseInt(systp) - 1}级`
            }
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
        },
        //新增修改保存
        async getFormDataAdd (obj) {
            obj = JSON.parse(JSON.stringify(obj));
            let [item,aaa] = [{},''];
            item.pmky = obj.pmky;
            item.pmcd = obj.pmcd;
            obj.systp = obj.systp === '顶级'? '0' : obj.systp.substr(0,1);
            obj['id'] = item;
            if (this.currentIndex === 12) {
                aaa = await this.$common.addNewData('/sys/syspar/v1/sysparSave?flag=1', this, obj, 'post', true)
            } else if (this.currentIndex === 13) {
                aaa = await this.$common.editData('/sys/syspar/v1/sysparSave?flag=2', this, obj, 'post', true)
            }
            if (aaa) {
                this.pars.flag = 0;
                this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
            }
        },
        //新增页面初始化
        setAddInitData (type,tableTitle, id, systp) {
            if (systp) {
                this.formDatas1 = {
                    pmky: id.pmky,
                    spmcd: id.pmcd,
                    systp: `${parseInt(systp) + 1}级`,
                    isvalue: 1,
                    isa: 1,
                    isb: 0,
                    isc: 0,
                    isd: 0,
                    ise: 0,
                    isf: 0
                };
                this.formItemList1[0].disabled = true;
                this.formItemList1[0].hasDec = '';
                this.formItemList1[2].disabled = false;
                this.formItemList1[2].hasDec = '若不输入，则系统自动生成'
            } else {
                if (tableTitle.indexOf('--') === -1) {
                    this.formDatas1 = {
                        pmcd: '****',
                        systp: '顶级',
                        isvalue: 1,
                        isa: 1,
                        isb: 0,
                        isc: 0,
                        isd: 0,
                        ise: 0,
                        isf: 0
                    };
                    this.formItemList1[0].disabled = false;
                    this.formItemList1[0].hasDec = '4位大写英文字母';
                    this.formItemList1[2].disabled = true;
                    this.formItemList1[2].hasDec = ''
                } else {
                    this.formDatas1 = {
                        pmky: tableTitle.split('--')[1],
                        spmcd: '****',
                        systp: tableTitle.split('--')[2],
                        isvalue: 1,
                        isa: 1,
                        isb: 0,
                        isc: 0,
                        isd: 0,
                        ise: 0,
                        isf: 0
                    };
                    this.formItemList1[0].disabled = true;
                    this.formItemList1[0].hasDec = '';
                    this.formItemList1[2].disabled = false;
                    this.formItemList1[2].hasDec = '若不输入，则系统自动生成'
                }
            }
            this.spinShow = false;
            this.currentIndex = type
        },
        //修改页面初始化
        setEditInitData (type,id) {
            this.formItemList1[0].disabled = true;
            this.formItemList1[0].hasDec = '';
            this.$http.get(this.baseUrl+'/sys/syspar/v1/getSysparInfoById',{
                params: {
                    access_token: this.Cookies.get('token'),
                    pmky: id.pmky,
                    pmcd: id.pmcd
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    this.formDatas1 = data;
                    this.formDatas1.pmky = data.id.pmky;
                    this.formDatas1.pmcd = data.id.pmcd;
                    this.formDatas1.systp = this.formDatas1.systp === '0' ? '顶级' : `${this.formDatas1.systp}级`;
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.spinShow = false;
                this.currentIndex = type
            })
        },
        //查看页面初始化
        setViewInitData (type,id) {
            this.$http.get(this.baseUrl+'/sys/syspar/v1/getSysparInfoById',{
                params: {
                    access_token: this.Cookies.get('token'),
                    pmky: id.pmky,
                    pmcd: id.pmcd
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    this.formDatas2 = data;
                    this.formDatas2.pmky = data.id.pmky;
                    this.formDatas2.pmcd = data.id.pmcd;
                    this.formDatas2.systp = this.formDatas2.systp === '0' ? '顶级' : `${this.formDatas2.systp}级`;
                    this.formDatas2.isvalue = this.formDatas2.isvalue ? '启用' : '停用'
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.spinShow = false;
                this.currentIndex = type
            })
        },
        //关闭新增修改查看页
        closeCurrentPageAdd () {
            this.currentIndex = 1
        }
    },
    created () {
        this.pars.tableTitle = '系统参数顶级';
        this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysparViewList', this, 'get')
    }
}
</script>
