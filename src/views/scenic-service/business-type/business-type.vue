<style scoped>

</style>
<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span style="display:inline-block;float:left;line-height:32px;">业务类型管理</span>
                    <top-btn
                        :btn-list="btnList"
                        :currentRowData="currentRowData"
                        @changeIndex="changeIndex"
                        @refreshData = "refreshData"
                    ></top-btn>
                </p>
                <detail-form1
                    :formDatas="pars.formDatas"
                    :formItemList="formItemList"
                    :is-list-page="true"
                    :is-mixed="false"
                    :label-width="labelWidth"
                    @getFormData="getFormData"
                ></detail-form1>
                <radio-table
                    :colname="colname"
                    :total='total'
                    :tableData="tableData"
                    :isRadio="true"
                    :pageNum="pars.pageNum"
                    :pageCode="pars.pageCode"
                    :loading="loading"
                    @selected="getChooseData"
                    @changePage="changePage"
                    @changePageSize="changePageSize"
                    @isSingle="isSingle"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12 || currentIndex === 13">
                <p slot="title" class="slot_title_height">
                    <span v-if="currentIndex === 12" class="title_span">新增业务类型</span>
                    <span v-if="currentIndex === 13" class="title_span">修改业务类型</span>
                </p>
                <detail-form1
                        ref = "card"
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas"
                        :labelWidth = "160"
                        :formItemList = "formItemList_add"
                        :isClose = "isClose"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看业务类型</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
                        :label-width="180"
                        :formDatas="formDatas_view"
                        :formItemList="formItemList_view"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></view-del-detail>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchCount: 1,
            currentIndex: 1,
            spinShow: true,
            isClose : false,
            total:0,
            loading: false,
            single: 0,
            btnLoading: false,
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 12,
                    btnlabel : "新增",
                    isAdd : true,
                },
                {
                    type : 13,
                    btnlabel : "修改",
                },
                {
                    type : 4,
                    btnlabel : "删除",
                    dialogType: 'del',
                    url: ''
                },
                {
                    type : 14,
                    btnlabel : "查看",
                }
            ],
            //表单部分
            formItemList : [
                {
                    label : "业务名称",
                    keyName : "szbusinessname",
                    type : 1,
                    hasDec : '(支持模糊查询)',
                    isGrayDec : true
                }
            ],
            labelWidth : 80,
            //表格部分
            colname: [
                // {
                //     title : '编号',
                //     key : 'ibusinessid'
                // },
                {
                    title : '编码',
                    key : 'szbusinesscode'
                },{
                    title : '名称',
                    key : 'szbusinessname'
                },{
                    title : '业务种类',
                    key : 'strbusinesstype'
                },{
                    title : '是否可以前台注册业务',
                    key : 'isregister',
                    render : (h,params) => {
                        let row = params.row;
                        let text = row.isregister == 1 ? '是' : row.isregister == 0 ? '否' : '';
                        return h('span', text);
                    }
                },{
                    title : '销售方式',
                    key : 'bymarketingway',
                    render : (h,params) => {
                        let row = params.row;
                        let text = row.bymarketingway == 1 ? '共享' : row.bymarketingway == 0 ? '独立' : '';
                        return h('span', text);
                    }
                },{
                    title : '签约客户',
                    key : 'bywithmember',
                    render : (h,params) => {
                        let row = params.row;
                        let text = row.bywithmember == 1 ? '个人会员' : row.bywithmember == 0 ? '无' : '机关会员';
                        return h('span', text);
                    }
                },{
                    title : '是否有效',
                    key : 'byisuse',
                    render : (h,params) => {
                        let row = params.row;
                        let text = row.byisuse == 1 ? '启用' : row.byisuse == 0 ? '禁用' : '';
                        return h('span', text);
                    }
                }
            ],
            tableData: [],
            currentRowData:{},
            pars:{
                formDatas : {
                    szbusinessname : ''
                },
                pageNum:10,
                pageCode:1,
            },
            urlQuery:{},
            //新增修改----------
            formDatas_add: {},
            ruleDatas: {
                szbusinesscode: [
                    { required: true, message: '业务编码不能为空', trigger: 'blur' }
                ],
                szbusinessname: [
                    { required: true, message: '业务名称不能为空', trigger: 'blur' }
                ],
            },
            formItemList_add: [
                {
                    label : '产品编号',
                    keyName : 'ibusinessid',
                    type: 1,
                    disabled: true,
                    noShow: true
                },
                {
                    label : '业务编码',
                    keyName : 'szbusinesscode',
                    type : 1,
                },
                {
                    label : '业务名称',
                    keyName : 'szbusinessname',
                    type : 1,
                },
                {
                    label : '业务种类',
                    keyName : 'businesstype',
                    type : 4,
                    optionList : []
                },
                {
                    label : '是否可以前台注册业务',
                    keyName : 'isregister',
                    type : 2,
                    optionList : [
                        {
                            value : 0,
                            labelName : '否'
                        },
                        {
                            value : 1,
                            labelName : '是'
                        }
                    ]
                },
                {
                    label : '销售方式',
                    keyName : 'bymarketingway',
                    type : 2,
                    optionList : [
                        {
                            value : 0,
                            labelName : '独立'
                        },
                        {
                            value : 1,
                            labelName : '共享'
                        }
                    ]
                },{
                    label : '拥有签约客户',
                    keyName : 'bywithmember',
                    type : 2,
                    optionList : [
                        {
                            value : 0,
                            labelName : '无'
                        },
                        {
                            value : 1,
                            labelName : '个人会员'
                        },
                        {
                            value : 2,
                            labelName : '机构会员'
                        }
                    ]
                },{
                    label : '确认签约客户方式',
                    keyName : 'byconfirmemberway',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '不需要'
                    },{
                        value : 1,
                        labelName : '刷卡确认'
                    },{
                        value : 2,
                        labelName : '密码确认'
                    },{
                        value : 3,
                        labelName : '刷卡+密码确认'
                    }]
                },{
                    label : '是否登记客源地',
                    keyName : 'btouristsaddr',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '不登记'
                    },{
                        value : 1,
                        labelName : '登记'
                    }]
                },{
                    label : '是否登记业务员',
                    keyName : 'bregsalesman',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '不登记'
                    },{
                        value : 1,
                        labelName : '登记'
                    }]
                },{
                    label : '是否登记团质',
                    keyName : 'bteamnature',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '不登记'
                    },{
                        value : 1,
                        labelName : '登记'
                    }]
                },{
                    label : '是否自领自卖',
                    keyName : 'bselfcollarselling',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '票规则统一',
                    keyName : 'bticketnounited',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '是否启用',
                    keyName : 'byisuse',
                    type : 2,
                    optionList : [{
                        value : 0,
                        labelName : '禁用'
                    },{
                        value : 1,
                        labelName : '启用'
                    }]
                },{
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
            ],

            //查看--------------

            formDatas_view: {},
            formItemList_view: [
                {
                    label : "产品编号",
                    keyName : "ibusinessid"
                },
                {
                    label : "业务编码",
                    keyName : "szbusinesscode"
                },
                {
                    label : "业务名称",
                    keyName : "szbusinessname"
                },
                {
                    label : "业务种类",
                    keyName : "businesstype"
                },
                {
                    label : "是否可以前台注册业务",
                    keyName : "isregister"
                },
                {
                    label : "销售方式",
                    keyName : "bymarketingway"
                },
                {
                    label : "拥有签约客户",
                    keyName : "bymarketingway"
                },
                {
                    label : "确认签约客户方式",
                    keyName : 'byconfirmemberway'
                },
                {
                    label : "是否登记客源地",
                    keyName : "btouristsaddr"
                },
                {
                    label : "是否登记业务员",
                    keyName : "bregsalesman"
                },
                {
                    label : "是否登记团质",
                    keyName : 'bteamnature'
                },
                {
                    label : "是否自领自卖",
                    keyName : "bselfcollarselling"
                },
                {
                    label : "票规则统一",
                    keyName : "bticketnounited"
                },
                {
                    label : "是否启用",
                    keyName : 'byisuse'
                },
                {
                    label : "备注",
                    keyName : 'szmemo'
                }
            ],
        }
    },
    methods:{
        changeIndex (type) {
            this.spinShow = true;
            if (type === 12) {
                this.tipName = '业务类型新增';
                this.setAddInitData(type)
            } else if (type === 13) {
                this.tipName = '业务类型修改';
                this.setEditInitData(type)
            } else if (type === 14) {
                this.setViewInitData(type)
            }
        },
        //表格相关
        getChooseData(row){
            this.currentRowData["id"] = row.ibusinessid;
            this.currentRowData["name"] = 'ibusinessid';
            this.btnList[3].url = this.baseUrl+'/ticket/business/v1/businessDelete?ibusinessid='+row.ibusinessid;
        },
        changePage(pageCode) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/ticket/business/v1/businessViewList', this, 'get')
        },
        changePageSize(pageSize){
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/ticket/business/v1/businessViewList', this, 'get')
        },
        isSingle(page){
            if(page == 1) this.single = 0;
            else this.single = page;
        },
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode,
                szbusinessname: this.pars.formDatas.szbusinessname
            };
        },
        refreshData(){
            this.currentRowData = {};
            this.pars.pageCode = this.pars.pageCode - this.single;
            this.$common.currentPageData(this.baseUrl+'/ticket/business/v1/businessViewList', this, 'get')
        },
        //表单相关
        getFormData(data){
            this.pars.formDatas = data;
            this.pars.pageCode = 1;
            this.pars.pageNum = 10;
            this.$common.currentPageData(this.baseUrl+'/ticket/business/v1/businessViewList', this, 'get')
        },
        async setAddInitData (type) {
            if (!this.formItemList_add[3].optionList.length) {
                await this.getSelectItem();
            }
            this.formItemList_add[0].noShow = true;
            this.formDatas_add = {
                szbusinesscode : '',
                szbusinessname : '',
                businesstype : this.formItemList_add[3].optionList[0].value,
                isregister : 1,
                bymarketingway : 0,
                bywithmember : 0,
                byconfirmemberway : 0,
                btouristsaddr : 0,
                bregsalesman:0,
                bteamnature:0,
                bselfcollarselling:0,
                bticketnounited:1,
                byisuse : 1,
                szmemo:''
            };
            this.spinShow = false;
            this.currentIndex = type
        },
        async setEditInitData (type) {
            if (!this.formItemList_add[3].optionList.length) {
                await this.getSelectItem();
            }
            this.formItemList_add[0].noShow = false;
            this.getSingleData(type)
        },
        setViewInitData (type) {
            this.getSingleData(type,1)
        },
        getSingleData (type,isView) {
            this.$http.get(this.baseUrl+'/ticket/business/v1/viewBusiness', {
                params: {
                    access_token: this.Cookies.get('token'),
                    ibusinessid: this.currentRowData.id
                }
            }).then(res => {
                if(res.data.code === 200){
                    let data = res.data.data;
                    if (isView) {
                        data.isregister = data.isregister == 0 ? '否' : '是';
                        data.bymarketingway = data.bymarketingway == 0 ? '独立' : '共享';
                        data.bywithmember = data.bywithmember == 0 ? '无' : data.bywithmember == 1 ? '个人会员' : '机构会员';
                        data.byconfirmemberway = data.byconfirmemberway == 0 ? '不需要' : data.byconfirmemberway == 1 ? '刷卡确认' : data.byconfirmemberway == 2 ?'密码确认' : '刷卡+密码确认';
                        data.btouristsaddr = data.btouristsaddr == 0 ? '不登记' : '登记';
                        data.bregsalesman = data.bregsalesman == 0 ? '不登记' : '登记';
                        data.bteamnature = data.bteamnature == 0 ? '不登记' : '登记';
                        data.bselfcollarselling = data.bselfcollarselling == 0 ? '否' : '是';
                        data.bticketnounited = data.bticketnounited == 0 ? '否' : '是';
                        data.byisuse = data.byisuse == 1 ? '启用' : '禁用';
                        this.formDatas_view = data;
                    } else {
                        this.formDatas_add = data;
                    }
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.spinShow = false;
                this.currentIndex = type
            })

        },
        async getSelectItem () {
            let url = `${this.baseUrl}/sys/syspar/v1/findBUTPSelect`;
            const options = await this.$common.getSelectItem(url, this, 3, 'pmcd', 'pmva', 1);
            this.formItemList_add[3].optionList = options
        },
        async getFormDataAdd (obj) {
            let aaa = '';
            this.btnLoading = true;
            if(this.currentIndex === 12){
                aaa = await this.$common.addNewData('/ticket/business/v1/businessSave?flag=1',this,obj,'post',true)
            } else if(this.currentIndex === 13){
                aaa = await this.$common.editData('/ticket/business/v1/businessSave?flag=2', this, obj,'post',true)
            }
            if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/business/v1/businessViewList', this, 'get')
        },
        //关闭新增修改查看页
        closeCurrentPageAdd () {
            this.currentIndex = 1
        }
    },
    created () {
        this.$common.currentPageData(this.baseUrl+'/ticket/business/v1/businessViewList', this, 'get')
    }

}
</script>