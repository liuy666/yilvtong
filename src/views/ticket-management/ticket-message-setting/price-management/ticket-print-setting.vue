<template>
    <div>
        <Row>
            <Card v-show="currentIndex === 1">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">票务打印管理</span>
                    <top-btn
                            :btnList="btnList"
                            @changeIndex="changeIndex"
                            @operate="operate"
                    ></top-btn>
                </p>
                <radio-table
                        :colname="colname"
                        :total='total'
                        :tableData="tableData"
                        :pageNum="pars.pageNum"
                        :pageCode="pars.pageCode"
                        :loading="loading"
                        @changePage="changePage"
                        @changePageSize="changePageSize"
                ></radio-table>
            </Card>
            <Card v-show="currentIndex === 12">
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">管理票务打印管理</span>
                </p>
                <div>
                    <detail-form1
                            :isListPage = "false"
                            :isMixed = "false"
                            :isClose = "isClose"
                            :formDatas = "formDatas1"
                            :formItemList = "formItemList1"
                            @getFormData = "getFormDataAdd"
                            @closeCurrentPage = "closeCurrentPageAdd"
                            @selectOne = "selectOne"
                            @cancelSelectOne = "cancelSelectOne"
                            @selectAll = "selectAll"
                    ></detail-form1>
                </div>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                searchCount: 1,   //进页面的第一次请求，列表
                currentIndex: 1,
                isClose: false,
                tipName: '',
                spinShow: true,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    },
                    {
                        type: 12,
                        btnlabel: '管理',
                    },
                    {
                        type: 11,
                        btnlabel: '返回上级',
                        icon: 'reply'
                    },
                ],
                colname: [
                    {
                        title: '服务商',
                        key: 'szscenicname'
                    },
                    {
                        title: '产品名称',
                        key: 'sztickettypename'
                    },
                    {
                        title: '价格编号',
                        key: 'icrowdkindpriceid'
                    },
                    {
                        title: '价格编码',
                        key: 'icrowdkindpricecode'
                    },
                    {
                        title: '打印名称',
                        key: 'pmva'
                    },
                    {
                        title: '是否打印标题',
                        render: (h, parama) => {
                            return h('span',{},parama.row.noteprinttype ? '是' : '否');
                        }
                    },
                    {
                        title: '顺序',
                        key: 'ordernum'
                    },
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    pageNum:10,
                    pageCode:1,
                },
                urlQuery:{},
                formDatas1: {
                    printnos: []
                },   //管理打印
                formItemList1: [
                    {
                        type: 21,
                        label: '打印编码组成',
                        keyName: 'printnos',
                        height: 617,
                        colname: [
                            {
                                type: 'selection',
                                width: 120,
                                align: 'center'
                            },
                            {
                                title: '打印名称',
                                key: 'pmva',
                                align: 'center'
                            },
                            {
                                title: '是否打印标题',
                                align: 'center',
                                render: (h, params) => {
                                    return h('Select', {
                                        props: {
                                            value: params.row.pmvd
                                        },
                                        style: {
                                            width: '200px'
                                        },
                                        on: {
                                            'on-change': (val) => {
                                                params.row.pmvd = val;
                                                this.formItemList1[0].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList1[0].tableData)
                                            }
                                        }
                                    }, this.printTitle.map(item => {
                                        return h('Option',{
                                            props:{
                                                value:item.value,
                                                label:item.label
                                            }
                                        })
                                    }))
                                }
                            },
                            {
                                title: '顺序',
                                align: 'center',
                                render: (h, params) => {
                                    return h('Input', {
                                        props: {
                                            value: params.row.pmvf
                                        },
                                        style: {
                                            width: '200px'
                                        },
                                        on: {    //render无法双向绑定，故用此方法伪双向
                                            input: (val) => {
                                                params.row.pmvf = val;
                                                this.formItemList1[0].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList1[0].tableData)
                                            }
                                        }
                                    })
                                }
                            }
                        ],
                        tableData: [],
                    }
                ],   //管理打印
                printTitle: [
                    {
                        value: '1',
                        label: '是'

                    },
                    {
                        value: '0',
                        label: '否'
                    },
                ]    //是否打印标题
            }
        },
        methods: {
            // 点击新增修改查看按钮跳到对应页面
            changeIndex (type) {
                if (type === 12) {
                    this.spinShow = true;
                    this.tipName = '操作';
                    this.setInitData(type)
                }
            },
            //选择页码
            changePage(pageCode) {
                this.pars.pageCode = pageCode;
                this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/managelist', this, 'get')
            },
            //选择每页条数
            changePageSize(pageSize){
                this.pars.pageNum = pageSize;
                this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/managelist', this, 'get')
            },
            //需要拼接的url后面的参数
            refreshUrlQuery () {
                this.urlQuery = {
                    pageSize: this.pars.pageNum,
                    page: this.pars.pageCode,
                    icrowdkindpriceid : this.$route.params.id
                };
            },
            //返回上一级
            operate (type) {
                if (type === 11) {
                    const routeName = this.$route.name;
                    let pageOpenedList = this.$store.state.app.pageOpenedList;
                    for (let i = 0; i < pageOpenedList.length; i++) {
                        if (pageOpenedList[i].name === routeName) {
                            this.$store.commit('removeTag', routeName);
                            this.$store.commit('closePage', routeName);
                            pageOpenedList = this.$store.state.app.pageOpenedList;
                            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
                            this.$router.go(-1);
                            break
                        }
                    }
                }
            },
            //初始化管理打印页面数据
            setInitData (type) {
                this.formDatas1['icrowdkindpriceid'] = this.$route.params.id;
                this.$http.get(this.baseUrl+'/ticket/printticket/v1/addprintPage',{
                    params:{
                        access_token: this.Cookies.get('token'),
                        icrowdkindpriceid: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        data.map(item => {
                            if (!item.pmvd) {
                                item.pmvd = '1'
                            }
                        });
                        this.formItemList1[0].tableData = data;
                        this.changeInput(data)
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                    this.spinShow = false;
                    this.currentIndex = type
                })
            },
            //管理打印页面表单验证
            formValidation () {    //表单验证
                const reg =  /^[1-9]\d*$/;
                let num = 1;
                this.formDatas1.printnos.map(item => {
                    if (!reg.test(parseInt(item.pmvf))) {
                        this.$common.showMessageModal(this, '编号顺序必须输入大于0的整数', 2);
                        num = 0
                    }
                });
                if (this.formDatas1.printnos.length > 9) {
                    this.$common.showMessageModal(this, '最多只能打印9个选项', 2);
                    num = 0
                } else if (!this.formDatas1.printnos.length) {
                    this.$common.showMessageModal(this, '请先勾选需要打印的选项', 2);
                    num = 0
                }
                return num
            },
            //管理打印页面表单提交
            async getFormDataAdd (obj) {
                if(!this.formValidation()) return;
                let [arr,data,aaa] = [[],{},''];
                obj.printnos.map(item => {
                    arr.push({
                        printno: item.pmcd,
                        noteprinttype: item.pmvd,
                        ordernum: item.pmvf,
                    })
                });
                data = {
                    icrowdkindpriceid: this.formDatas1.icrowdkindpriceid,
                    printnos: JSON.stringify(arr)
                };
                aaa = await this.$common.addNewData('/ticket/printticket/v1/savePrintForCrowdkindprice', this, data)
                if (aaa) this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/managelist', this, 'get')
            },
            //选中表格某一行
            selectOne (arr, row) {
                for(let obj of this.formItemList1[0].tableData) {
                    if (row.pmcd === obj.pmcd) {
                        obj.ischecked = true;
                        obj._checked = true;
                        break
                    }
                }
                this.formDatas1.printnos = arr;
            },
            //取消选中表格某一行
            cancelSelectOne (arr, row) {
                for(let obj of this.formItemList1[0].tableData) {
                    if (row.pmcd === obj.pmcd) {
                        obj.ischecked = false;
                        obj._checked = false;
                        break
                    }
                }
                this.formDatas1.printnos = arr;
            },
            //全选
            selectAll (arr) {
                for(let obj of this.formItemList1[0].tableData) {
                    if (!obj.ischecked) {
                        obj.ischecked = true;
                        obj._checked = true
                    }
                }
                this.formDatas1.printnos = arr;
            },
            //输入框或下拉框值改变，更新选中行的数据
            changeInput (data) {
                let arr = [];
                for (let item of data) {
                    if (item.ischecked) {
                        item['_checked'] = true;
                        arr.push(item)
                    } else {
                        item['_checked'] = false
                    }
                }
                this.formDatas1.printnos = arr;
            },
            //关闭新增修改查看页
            closeCurrentPageAdd () {
                this.currentIndex = 1
            }
        },
        created () {
            this.$common.currentPageData(this.baseUrl+'/ticket/printticket/v1/managelist', this, 'get')
        }
    }
</script>

<style scoped>

</style>
