<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">旅游卡明细</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @refreshData = "refreshData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="true"
                        :isMixed="false"
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
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看旅游卡明细信息</span>
                </p>
                <view-del-detail
                        :isClose = "isClose"
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
                isClose: false,
                spinShow: true,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 4,
                        btnlabel: '删除',
                        dialogType: 'del',
                        url: ''
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    },
                    {
                        type: 6,
                        btnlabel: '导入',
                        icon: 'clipboard',
                    },
                ],
                currentRowData: {},
                formItemList:[
                    {
                        type: 1,
                        label: '旅游卡卡号',
                        keyName:'cardNumber',
                    },
                    {
                        type: 1,
                        label: '银行卡卡号',
                        keyName:'bankCardNum'
                    },
                    {
                        type: 1,
                        label: '旅游卡名称',
                        keyName:'name'
                    },
                    {
                        type: 1,
                        label: '分润协议号',
                        keyName:'profitNum'
                    },
                    {
                        type: 1,
                        label: '姓名',
                        keyName:'username'
                    },
                    {
                        type: 1,
                        label: '身份证号',
                        keyName:'identityNum'
                    },
                    {
                        type: 4,
                        label: '开通状态',
                        keyName:'status',
                        optionList:[
                            {
                                value : 3,
                                label : '全部'
                            },
                            {
                                value : 1,
                                label : '已开通'
                            },
                            {
                                value : 0,
                                label : '未开通'
                            },
                            {
                                value : 2,
                                label : '已过期'
                            },
                        ]
                    },
                    {
                        type: 11,
                        label: '旅游卡有效期',
                        double: true,
                        dateType: 'date',
                        keyName: 'periodStartDate',
                        keyName1: 'periodEndDate',
                    },
                    {
                        type: 11,
                        label: '创建日期',
                        double: true,
                        dateType: 'date',
                        keyName: 'startCreateTime',
                        keyName1: 'endCreateTime',
                    }
                ],
                colname:[
                    {
                        title: '旅游卡卡号',
                        key: 'cardNumber',
                        width: 160
                    },
                    {
                        title: '产品代码',
                        key: 'code',
                        width: 100
                    },
                    {
                        title: '旅游卡名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '分润协议号',
                        key: 'profitNum',
                        width: 100
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        width: 100
                    },
                    {
                        title: '身份证',
                        key: 'identityNum',
                        width: 180
                    },
                    {
                        title: '开通状态',
                        width: 100,
                        render: (h, params) => {
                            let aaa = '';
                            switch (params.row.status) {
                                case 0 :
                                    aaa = '未开通';
                                    break;
                                case 1 :
                                    aaa = '已开通';
                                    break;
                                case 2 :
                                    aaa = '已过期';
                                    break;
                                default :
                                    break;
                            }
                            return h('span', {}, aaa);
                        }
                    },
                    {
                        title: '单价',
                        key: 'price',
                        width: 90,
                    },
                    {
                        title: '旅游卡生效时间',
                        key: 'periodStartDate',
                        width: 130
                    },
                    {
                        title: '旅游卡截止时间',
                        key: 'periodEndDate',
                        width: 130
                    },
                    {
                        title: '可使用景区',
                        key: 'scenics',
                        width: 200
                    },
                    {
                        title: '创建日期',
                        key: 'createTime',
                        width: 150
                    },
                    {
                        title: '创建人',
                        key: 'createMan',
                        width: 100
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                single: 0,
                pars:{
                    formDatas:{
                        status: 3,
                        startCreateTime: this.$common.getCurrentDate(),
                        endCreateTime: this.$common.getCurrentDate()
                    },
                    pageNum: 10,
                    pageCode: 1,
                },
                urlQuery: {},
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '旅游卡卡号',
                        keyName: 'cardNumber',
                        cols: 12
                    },
                    {
                        label: '旅游卡代码',
                        keyName: 'code',
                        cols: 12
                    },
                    {
                        label: '创建时间',
                        keyName: 'createTime',
                        cols: 12
                    },
                    {
                        label: '旅游卡名称',
                        keyName: 'name',
                        cols: 12
                    },
                    {
                        label: '姓名',
                        keyName:'username',
                        cols: 12
                    },
                    {
                        label: '分润协议号',
                        keyName:'profitNum',
                        cols: 12
                    },
                    {
                        label: '身份证号',
                        keyName:'identityNum',
                        cols: 12
                    },
                    {
                        label: '开通状态',
                        keyName:'status',
                        cols: 12
                    },
                    {
                        label: '单价',
                        keyName: 'price',
                        cols: 12
                    },
                    {
                        label: '单位/学校',
                        keyName: 'organization',
                        cols: 12
                    },
                    {
                        label: '旅游卡生效时间',
                        keyName: 'periodStartDate',
                        cols: 12
                    },
                    {
                        label: '工号/学号',
                        keyName: 'workNum',
                        cols: 12
                    },
                    {
                        label: '旅游卡截止时间',
                        keyName: 'periodEndDate',
                        cols: 12
                    },
                    {
                        label: '旅游卡有效次数',
                        keyName:'effectiveTimes',
                        cols: 12
                    },
                    {
                        label: '是否为历史卡',
                        keyName:'historyCardFlag',
                        cols: 12
                    },
                    {
                        label: '已使用',
                        keyName:'usedTimes',
                        cols: 12
                    },
                    {
                        label: '可使用景区',
                        keyName:'scenics'
                    },
                    {
                        label: '说明',
                        keyName:'descpt'
                    },
                    {
                        label: '创建人',
                        keyName: 'createMan'
                    }
                ]
            }
        },
        methods:{
            changeIndex (type) {
                this.spinShow = true;
                if (type === 14) {
                    this.setViewInitData(type)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.id;
                this.currentRowData["name"] = 'detailId';
            },
            changePage(pageCode){
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardDetail/v1/list',this)
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
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardDetail/v1/list',this)
            },
            getFormData(data){
                if (data.periodStartDate && data.periodEndDate) {
                    if (Date.parse(data.periodStartDate) > Date.parse(data.periodEndDate)) {
                        this.$common.showMessageModal(this, '旅游卡有效期开始日期不能大于结束日期', 2);
                        return
                    }
                } else if (!data.periodStartDate && data.periodEndDate) {
                    this.$common.showMessageModal(this, '请输入旅游卡有效期开始日期', 2);
                    return
                } else if (data.periodStartDate && !data.periodEndDate) {
                    this.$common.showMessageModal(this, '请输入旅游卡有效期结束日期', 2);
                    return
                }
                if (data.startCreateTime.getTime() > data.endCreateTime.getTime()) {
                    this.$common.showMessageModal(this, '创建日期开始日期不能大于结束日期', 2);
                    return
                }
                this.pars.formDatas = data;
                this.pars.formDatas.startCreateTime = this.$common.getCurrentDate(this.pars.formDatas.startCreateTime);
                this.pars.formDatas.endCreateTime = this.$common.getCurrentDate(this.pars.formDatas.endCreateTime);
                if (this.pars.formDatas.periodStartDate) {
                    this.pars.formDatas.periodStartDate = this.$common.getCurrentDate(this.pars.formDatas.periodStartDate)
                }
                if (this.pars.formDatas.periodEndDate) {
                    this.pars.formDatas.periodEndDate = this.$common.getCurrentDate(this.pars.formDatas.periodEndDate)
                }
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardDetail/v1/list', this)
            },
            clearFormData(){
                this.pars.formDatas = {
                    status: 3,
                    startCreateTime: this.$common.getCurrentDate(),
                    endCreateTime: this.$common.getCurrentDate()
                }
            },
            refreshData(){
                this.pars.pageCode = this.pars.pageCode - this.single;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardDetail/v1/list', this)
            },
            isSingle(page){
                this.single = page
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                };
            },
            setViewInitData (type) {
                this.$http.get(this.baseUrl+'/tourcard/tourCardDetail/v1/get/'+this.currentRowData.id,{
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.usedTimes = `${data.usedTimes}次`;
                        data.descpt = data.descpt ? data.descpt : '无';
                        data.effectiveTimes = data.effectiveTimes === -1 ? '不限次' : `${data.effectiveTimes}次`;
                        data.status = data.status ? (data.status === 1 ? '已开通' : '已过期') : '未开通';
                        data.historyCardFlag = data.historyCardFlag ? '是' : '否';
                        this.formDatas_view = data;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourCardDetail/v1/list', this)
        }
    }
</script>

<style>

</style>
