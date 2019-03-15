<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">旅游卡绑定用户</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
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
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 14">
                <p slot="title" class="slot_title_height">
                    <span class="title_span">查看旅游卡绑定用户</span>
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
                total: 0,
                loading: false,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 14,
                        btnlabel: '查看',
                    }
                ],
                currentRowData: {},
                formItemList:[
                    {
                        type: 1,
                        label: '用户账号',
                        keyName:'account',
                        labelWidth: 80
                    },
                    {
                        type: 1,
                        label: '姓名',
                        keyName:'userName',
                        labelWidth: 55
                    },
                    {
                        type: 1,
                        label: '身份证号码',
                        keyName:'identityNum',
                        labelWidth: 85
                    }
                ],
                colname:[
                    {
                        title: '用户账号',
                        render: (h, params) => {
                            return h('span', {
                                'class': 'hover_span',
                                on: {
                                    click: () => {
                                        this.changeIndex(14,params.row.usId)
                                    }
                                }
                            }, params.row.account)
                        }
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '身份证号码',
                        key: 'identityNum'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                    },
                    {
                        title: '旅游卡数量',
                        key: 'num'
                    }
                ],
                tableData:[],
                pars:{
                    formDatas:{},
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery: {},
                formDatas_view: {},
                formItemList_view: [
                    {
                        label: '用户账号',
                        keyName: 'ACCOUNT'
                    },
                    {
                        label: '姓名',
                        keyName: 'USERNAME'
                    },
                    {
                        label: '身份证号',
                        keyName: 'IDENTITYNUM'
                    },
                    {
                        label: '手机号',
                        keyName: 'MOBILE'
                    },
                    {
                        label: '身份证归属地',
                        keyName: 'IDENTITYAREA'
                    },
                    {
                        label: '旅游卡详情',
                        keyName: '',
                        showElement: true,
                        table: true,
                        size: 'small',
                        width: '96%',
                        border: true,
                        height: '',
                        colname: [
                            {
                                title: '序号',
                                key: 'ID',
                                align: 'center',
                                width: 80
                            },
                            {
                                title: '旅游卡代码',
                                key: 'CODE',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '旅游卡名称',
                                key: 'NAME',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '分润协议号',
                                key: 'PROFITNUM',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '绑卡时间',
                                key: 'CREATETIME',
                                align: 'center',
                                width: 150
                            },
                            {
                                title: '旅游卡卡号',
                                key: 'CARDNUMBER',
                                align: 'center',
                                width: 150
                            },
                            {
                                title: '单价',
                                key: 'PRICE',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '旅游卡生效时间',
                                key: 'PERIODSTARTDATE',
                                align: 'center',
                                width: 140
                            },
                            {
                                title: '旅游卡截止时间',
                                key: 'PERIODENDDATE',
                                align: 'center',
                                width: 140
                            },
                            {
                                title: '有效次数',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return h('span', params.row.EFFECTIVETIMES ? params.row.EFFECTIVETIMES : '不限')
                                }
                            },
                            {
                                title: '已使用次数',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return h('span', params.row.EFFECTIVETIMES ? params.row.USEDTIMES : '')
                                }
                            },
                            {
                                title: '剩余次数',
                                align: 'center',
                                width: 110,
                                render: (h, params) => {
                                    return h('span', params.row.EFFECTIVETIMES ? params.row.LEAVETIMES : '不限')
                                }
                            },
                            {
                                title: '开通状态',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    let status = params.row.STATUS;
                                    return h('span', status === 1 ? '已开通' : (status === 0 ? '未开通' : '已过期'))
                                }
                            },
                            {
                                title: '可使用地区',
                                key: 'SCENICS',
                                align: 'center',
                                width: 250
                            },
                        ],
                        tableData: []
                    },
                ],
            }
        },
        methods:{
            changeIndex (type,id) {
                this.spinShow = true;
                if (type === 14) {
                    this.setViewInitData(type,id)
                }
            },
            selected(row){
                this.currentRowData["id"] = row.usId;
                this.currentRowData["name"] = 'usId';
            },
            changePage(pageCode) {
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.currentRowData = {};
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcardBindUser/v1/list', this);
            },
            changePageSize(pageSize){
                let arr = this.$store.state.page.listPagePars;
                for (let item of arr) {
                    if (item.path == this.$route.path && item.index == 1) {
                        this.pars = item.pars;
                        break;
                    }
                }
                this.currentRowData = {};
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcardBindUser/v1/list', this)
            },
            getFormData(data){
                this.pars.formDatas = data;
                this.pars.pageCode = 1;
                this.pars.pageNum = 10;
                this.$common.currentPageData(this.baseUrl+'/tourcard/tourcardBindUser/v1/list', this)
            },
            clearFormData(){
                this.pars.formDatas = {}
            },
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode
                };
            },
            setViewInitData (type,id) {
                id = id ? id : this.currentRowData.id;
                this.$http.get(this.baseUrl + '/tourcard/tourcardBindUser/v1/get/' + id, {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    let data = res.data.data;
                    let height = '';
                    this.formDatas_view = data.userData;
                    this.formItemList_view[5].tableData = data.tourCardDetails;
                    height = (data.tourCardDetails.length * 40 + 34) > 434 ? 434 + 17 : data.tourCardDetails.length * 40 + 34 + 17;
                    this.formItemList_view[5].height = height;
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/tourcard/tourcardBindUser/v1/list', this);
        }
    }
</script>

<style scoped>

</style>
