<style scoped lang="less">

</style>

<template>
    <div>
        <Row>
            <Card  v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">Ectripxml管理</span>
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
        </Row>
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
            single: 0,
            currentRowData:{},
            urlQuery: {},
            btnList :[
                {
                    type : 1,
                    btnlabel : "刷新"
                },
                {
                    type : 3,
                    btnlabel : "修改"
                },
                {
                    type : 4,
                    btnlabel : "删除",
                    dialogType: 'del',
                    url: ''
                }
            ],
            colname: [
                {
                    title: '节点名称',
                    render: (h, params) => {
                        return params.row.lst[0]
                    }
                },
                {
                    title: '参数内容',
                    render: (h, params) => {
                        return params.row.lst[1]
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
                    type: 9,
                    label: '参数',
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
                    isRequired: true
                },
                {
                    type: 1,
                    label: '打印内容[pmvb]',
                    keyName: 'pmvb'
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
                }

            ]
        }
    },
    methods:{
        // 点击新增修改查看按钮跳到对应页面
        changeIndex (type) {
            if (type === 12) {
                this.spinShow = true;
                this.tipName = '系统参数新增';
                this.setAddInitData();
                this.currentIndex = type
            } else if (type === 13) {
                this.spinShow = true;
                this.tipName = '系统参数修改';
                this.setEditInitData();
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
            this.currentRowData = {};
            this.pars.pageCode = pageCode;
            // this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get')
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
            this.currentRowData = {};
            this.pars.pageNum = pageSize;
            // this.$common.currentPageData(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceViewList', this, 'get')
        },
        //执行删除时如当页只有一条数据
        isSingle(page){
            this.single = page
        },
    }
}
</script>
