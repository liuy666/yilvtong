<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">管理票务打印管理</span>
                </p>
                <div>
                    <detail-form1
                            :isListPage = "false"
                            :isMixed = "false"
                            :formDatas = "formDatas"
                            :formItemList = "formItemList"
                            @getFormData = "getFormData"
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
                spinShow: true,
                formDatas: {
                    printnos: []
                },
                formItemList: [
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
                                                this.formItemList[0].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList[0].tableData)
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
                                key: 'address',
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
                                                this.formItemList[0].tableData[params.index] = params.row;
                                                this.changeInput(this.formItemList[0].tableData)
                                            }
                                        }
                                    })
                                }
                            }
                        ],
                        tableData: [],
                    }
                ],
                printTitle: [
                    {
                        value: '1',
                        label: '是'

                    },
                    {
                        value: '0',
                        label: '否'
                    },
                ]
            }
        },
        methods: {
            formValidation () {    //表单验证
                const reg =  /^[1-9]\d*$/;
                this.formDatas.printnos.map(item => {
                    if (reg.test(item.pmvf)) {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '编号顺序必须输入大于0的整数'
                        });
                    }
                })
            },
            getFormData (obj) {
                let [arr,data] = [[],{}];
                obj.printnos.map(item => {
                    arr.push({
                        printno: item.pmcd,
                        noteprinttype: item.pmvd,
                        ordernum: item.pmvf,
                    })
                });
                data = {
                    icrowdkindpriceid: this.formDatas.icrowdkindpriceid,
                    printnos: JSON.stringify(arr)
                };
                this.$common.addNewData('/ticket/printticket/v1/savePrintForCrowdkindprice', this, data)
            },
            selectOne (arr, row) {
                for(let obj of this.formItemList[0].tableData) {
                    if (row.pmcd === obj.pmcd) {
                        obj.ischecked = true;
                        obj._checked = true;
                        break
                    }
                }
                this.formDatas.printnos = arr;
            },
            cancelSelectOne (arr, row) {
                for(let obj of this.formItemList[0].tableData) {
                    if (row.pmcd === obj.pmcd) {
                        obj.ischecked = false;
                        obj._checked = false;
                        break
                    }
                }
                this.formDatas.printnos = arr;
            },
            selectAll (arr) {
                for(let obj of this.formItemList[0].tableData) {
                    if (!obj.ischecked) {
                        obj.ischecked = true;
                        obj._checked = true
                    }
                }
                this.formDatas.printnos = arr;
            },
            changeInput (data) {   //输入框或下拉框值改变，更新选中行的数据
                let arr = [];
                for (let item of data) {
                    if (item.ischecked) {
                        item['_checked'] = true;
                        arr.push(item)
                    } else {
                        item['_checked'] = false
                    }
                }
                this.formDatas.printnos = arr;
            },
            initData () {    //初始化数据
                this.$http.get(this.baseUrl+'/ticket/printticket/v1/addprintPage',{
                    params:{
                        access_token: this.Cookies.get('token'),
                        icrowdkindpriceid: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        data.map(item => {
                            if (!item.pmvd) {
                                item.pmvd = '1'
                            }
                        });
                        this.formItemList[0].tableData = data;
                        this.changeInput(data);
                        this.spinShow = false
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            }
        },
        created () {
            this.formDatas['icrowdkindpriceid'] = this.$route.params.id;
            this.initData()
        }
    }
</script>

<style scoped>

</style>
