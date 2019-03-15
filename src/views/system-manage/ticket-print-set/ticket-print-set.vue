<style scoped lang="less">

</style>

<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">门票打印信息配置</span>
                    <top-btn
                            :btnList="btnList"
                            :currentRowData="currentRowData"
                            @changeIndex="changeIndex"
                    ></top-btn>
                </p>
                <radio-table
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
                    <span v-if="currentIndex === 12" style="display:inline-block;float:left;line-height:32px;">新增票务打印参数</span>
                    <span v-if="currentIndex === 13" style="display:inline-block;float:left;line-height:32px;">修改票务打印参数</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :labelWidth = "140"
                        :formDatas = "formDatas1"
                        :ruleDatas = "ruleDatas"
                        :formItemList = "formItemList1"
                        :isClose = "isClose"
                        @getFormData = "getFormDataAdd"
                        @closeCurrentPage = "closeCurrentPageAdd"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchCount: 1,   //进页面的第一次请求，列表
            currentIndex: 1,
            isClose: false,
            tipName: '',
            spinShow: true,
            total: 0,
            loading: false,
            currentRowData:{},
            urlQuery: {},
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 12,
                    btnlabel : "新增",
                }
            ],
            colname: [
                {
                    title: '打印编码',
                    render: (h,params) => {
                        return h('span', params.row.id.pmcd)
                    }
                },
                {
                    title: '打印名称',
                    key: 'pmva'
                },
                {
                    title: '内容类型',
                    key: 'contentType',
                    render: (h,params) => {
                        return h('span', params.row.isa ? '系统定义' : '自定义');
                    }
                },
                {
                    title: '内容',
                    key: 'pmvb'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h,params) => {
                        return h('span', params.row.isvalue ? '启用' : '禁用');
                    }
                },
                {
                    title: '操作',
                    render: (h,params) => {
                        return h('span', {
                            'class': {
                                hover_span: true
                            },
                            on: {
                                click: () => {
                                    this.changeIndex(13, params.row.id)
                                }
                            }
                        }, '修改')
                    }
                }
            ],
            tableData: [],
            pars: {
                pageNum: 10,
                pageCode: 1,
            },
            formDatas1: {},  //新增修改
            ruleDatas: {
                pmva: [
                    { required: true, message: '打印名称不能为空', trigger: 'blur' }
                ],
            },
            formItemList1: [
                {
                    type: 1,
                    label: '参数',
                    disabled: true,
                    keyName: 'pmky'
                },
                {
                    type: 1,
                    label: '打印编码',
                    keyName: 'pmcd',
                    hasDec: '若不输入，则系统自动生成',
                    isRedDec: true
                },
                {
                    type: 1,
                    label: '打印名称[pmva]',
                    keyName: 'pmva',
                },
                {
                    type: 2,
                    label: '是否启用',
                    keyName: 'isvalue',
                    optionList: [
                        {
                            value: 1,
                            labelName: '启用'
                        },
                        {
                            value: 0,
                            labelName: '停用'
                        }
                    ]
                },
                {
                    type: 2,
                    label: '内容定义类型[isa]',
                    keyName: 'isa',
                    optionList: [
                        {
                            value: 1,
                            labelName: '系统'
                        },
                        {
                            value: 0,
                            labelName: '自定义'
                        }
                    ]
                },
                // {
                //     type: 1,
                //     label: '打印内容[pmvb]',
                //     keyName: 'pmvb'
                // }
            ]
        }
    },
    methods:{
        // 点击新增修改查看按钮跳到对应页面
        changeIndex (type, id) {
            if (type === 12) {
                this.spinShow = true;
                this.tipName = '系统参数新增';
                this.setAddInitData();
                this.currentIndex = type
            } else if (type === 13) {
                this.spinShow = true;
                this.tipName = '系统参数修改';
                this.setEditInitData(id);
                this.currentIndex = type
            }
        },
        //选中某一行
        selected(row){
            this.currentRowData["id"] = 1;
            this.currentRowData["name"] = 'icrowdkindpriceid';
        },
        //选择页码
        changePage(pageCode) {
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.pars.pageCode = pageCode;
            this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysViewList', this, 'get');
        },
        //选择每页条数
        changePageSize(pageSize){
            let arr = this.$store.state.page.listPagePars;
            for (let item of arr) {
                if (item.path == this.$route.path && item.index == 1) {
                    this.pars = item.pars;
                    break;
                }
            }
            this.pars.pageNum = pageSize;
            this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysViewList', this, 'get');
        },
        //新增修改保存
        async getFormDataAdd (obj) {
            obj = JSON.parse(JSON.stringify(obj));
            let [item,aaa] = [{},''];
            item.pmky = obj.pmky;
            item.pmcd = obj.pmcd;
            obj['id'] = item;
            if (this.currentIndex === 12) {
                aaa = await this.$common.addNewData('/sys/syspar/v1/sysparSave?flag=1', this, obj, 'post', true)
            } else if (this.currentIndex === 13) {
                aaa = await this.$common.editData('/sys/syspar/v1/sysparSave?flag=2', this, obj, 'post', true)
            }
            if (aaa) {
                this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysViewList', this, 'get')
            }
        },
        //需要拼接的url后面的参数
        refreshUrlQuery () {
            this.urlQuery = {
                pageSize: this.pars.pageNum,
                page: this.pars.pageCode
            }
        },
        //初始化新增页面
        setAddInitData () {
            this.formItemList1[1].type = 1;
            this.formItemList1[1].hasDec = '若不输入，则系统自动生成';
            this.formDatas1 = {
                isvalue: 1,
                isa: 1,
                pmky: 'PRSZ',    //门票打印列表的系统参数字段
                systp: '1',     //1级系统参数
                spmcd: '****'
            };
            this.spinShow = false
        },
        //初始化修改页面
        setEditInitData (id) {
            this.formItemList1[1].type = 9;
            this.formItemList1[1].hasDec = '';
            this.formDatas1 = {
                isvalue: 1,
                isa: 1
            };
            this.$http.get(this.baseUrl+'/sys/syspar/v1/getSysparInfoById', {
                params: {
                    access_token: this.Cookies.get('token'),
                    pmky: id.pmky,
                    pmcd: id.pmcd
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    this.formDatas1 = data;
                    this.formDatas1['pmky'] = data.id.pmky;
                    this.formDatas1['pmcd'] = data.id.pmcd;
                    this.spinShow = false
                } else {
                    this.$common.showMessageModal(this, res, 1);
                    this.spinShow = false
                }
            })
        },
        //关闭新增修改查看页
        closeCurrentPageAdd () {
            this.currentIndex = 1
        }
    },
    created () {
        this.$common.currentPageData(this.baseUrl+'/sys/syspar/v1/sysViewList', this, 'get')
    }
}
</script>
