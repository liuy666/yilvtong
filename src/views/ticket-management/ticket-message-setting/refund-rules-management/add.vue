<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}退票规则信息</span>
                </p>
                <div>
                    <detail-form1
                            :isListPage = "false"
                            :isMixed = "false"
                            :formDatas = "formDatas1"
                            :ruleDatas = "ruleDatas"
                            :formItemList = "formItemList1"
                            @getFormData = "getFormData"
                            @addOrsubtractRow = "addOrsubtractRow"
                            @selectedChange = "selectedChange"
                    ></detail-form1>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        data(){
            const validateXyrate2 = (rule, value, callback) => {
                let regTdfl = /^(0.\d*)$/;
                if (!value) {
                    callback(new Error('过期票退票费率不能为空！'))
                } else if (!regTdfl.test(value)) {
                    callback(new Error('过期票退票费率为0-1的小数！'))
                } else {
                    callback()
                }
            };
            return{
                spinShow: true,
                pageName: '',
                formDatas1: {
                    changebackrate: [
                        {
                            time: '',
                            tdfl: ''
                        }
                    ]
                },
                ruleDatas: {
                    gzname: [
                        {
                            required: true,
                            message: '退订规则名称不能为空！',
                            trigger: 'blur'
                        }
                    ],
                    xyrate2: [
                        {
                            validator: validateXyrate2,
                            trigger: 'blur'
                        }
                    ]
                },
                formItemList1: [
                    {
                        type: 1,
                        label: '退票规则名称',
                        keyName:'gzname',
                        isRequired: true
                    },
                    {
                        type: 4,
                        label: '服务商名称',
                        keyName:'iscenicid',
                        isRequired: true,
                        selectEvent: true,
                        optionList: []
                    },
                    {
                        type: 4,
                        label: '产品名称',
                        keyName:'itickettypeid',
                        isRequired: true,
                        optionList: []
                    },
                    {
                        type: 2,
                        label: '计算方式',
                        keyName:'jsfs',
                        isRequired: true,
                        optionList: [
                            {
                                value: '0001',
                                labelName: '按小时'
                            },
                            {
                                value: '0002',
                                labelName: '按天'
                            },
                            {
                                value: '0003',
                                labelName: '常年'
                            },
                        ]
                    },
                    {
                        type: 2,
                        label: '出票前后',
                        keyName:'xyjs4',
                        isRequired: true,
                        optionList: [
                            {
                                value: 0,
                                labelName: '出票前'
                            },
                            {
                                value: 1,
                                labelName: '出票后'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '使用状态',
                        keyName:'isvalid',
                        isRequired: true,
                        optionList: [
                            {
                                value: 0,
                                labelName: '禁用'
                            },
                            {
                                value: 1,
                                labelName: '启用'
                            }
                        ]
                    },
                    {
                        type: 1,
                        label: '过期票退票费率',
                        keyName:'xyrate2',
                        isRequired: true,
                        hasDec: '不大于1,比如:0.34或1.0',
                        isRedDec: true
                    },
                    {
                        type: 15,
                        label: '选择项',
                        keyName:'changebackrate',
                        errMsg: '',
                        colList: [
                            {
                                inputList: [
                                    {
                                        label: '时间',
                                        keyName: 'time',
                                        hasDec: '整数,当计算方式为常年时,不用输入'
                                    },
                                    {
                                        label: '退订费率',
                                        keyName: 'tdfl',
                                        hasDec: '不大于1,比如:0.34或1.0'
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        type: 7,
                        label: '备注',
                        keyName:'sznote'
                    }
                ]
            }
        },
        methods:{
            getFormData(obj){    //提交表单
                let regTdfl = /^(0.\d*)$/;
                let regTime = /^[1-9]\d*$/;
                let data = obj.changebackrate;
                for (let i = 0; i < data.length; i++) {
                    if (this.formDatas1.jsfs == '0003') {
                        if (!data[i].tdfl) {
                            this.formItemList1[7].errMsg = '退订费率不能为空';
                            break;
                        } else if (data[i].tdfl && !regTdfl.test(data[i].tdfl)) {
                            this.formItemList1[7].errMsg = '退订费率为0-1之间的小数';
                            break;
                        } else {
                            this.formItemList1[7].errMsg = '';
                        }
                    } else {
                        if (!data[i].time) {
                            this.formItemList1[7].errMsg = '时间不能为空';
                            break;
                        } else if (data[i].time && !regTime.test(data[i].time)) {
                            this.formItemList1[7].errMsg = '时间为正整数';
                            break;
                        } else {
                            if (!data[i].tdfl) {
                                this.formItemList1[7].errMsg = '退订费率不能为空';
                                break;
                            } else if (data[i].tdfl && !regTdfl.test(data[i].tdfl)) {
                                this.formItemList1[7].errMsg = '退订费率为0-1之间的小数';
                                break;
                            } else {
                                this.formItemList1[7].errMsg = '';
                            }
                        }
                    }
                }
                if (!this.formItemList1[7].errMsg) {
                    if(this.pageName == '新增'){
                        this.$common.addNewData('/ticket/ticketXgz/act?flag=1', this, obj, 'post', true)
                    } else if(this.pageName == '修改'){
                        this.$common.editData('/ticket/ticketXgz/act?flag=2', this, obj, 'post', true)
                    }
                }
            },
            async setPageName(){    //判断新增修改对表单进行初始化
                if(this.$route.name.indexOf('new') != -1){
                    this.pageName = '新增';
                    if (this.formItemList1[7].colList.length > 1) {
                        this.formItemList1[7].colList.splice(1, this.formItemList1[7].colList.length-1)
                    }
                    this.formDatas1 = {
                        changebackrate: [
                            {
                                time: '',
                                tdfl: ''
                            }
                        ],
                        jsfs: '0003',
                        xyjs4: 0,
                        isvalid: 1,
                        iscenicid: this.formItemList1[1].optionList[0].value
                    };
                    const options = await this.$common.getProductInfoByScenicId(this, this.formDatas1.iscenicid, 2);
                    this.formItemList1[2].optionList = options;
                    this.$set(this.formDatas1, 'itickettypeid', this.formItemList1[2].optionList[0].value);
                    this.spinShow = false

                } else {
                    this.pageName = '修改';
                    this.$http.get(this.baseUrl+'/ticket/ticketXgz/v1/ticketbackruleView', {
                        params:{
                            access_token: this.Cookies.get('token'),
                            gzid: this.$route.params.id
                        }
                    }).then(res => {
                        if (res.status == 200) {
                            let data = res.data;
                            switch (data.jsfs) {
                                case '按小时': data.jsfs = '0001'; break;
                                case '按天': data.jsfs = '0002'; break;
                                case '常年': data.jsfs = '0003'; break;
                                default: break
                            }
                            for (let i = 1; i < data.changebackrate.length; i++) {
                                this.formItemList1[7].colList.push({
                                    inputList: [
                                        {
                                            label: '时间',
                                            keyName: 'time'
                                        },
                                        {
                                            label: '退订费率',
                                            keyName: 'tdfl'
                                        },
                                    ]
                                })
                            }
                            this.formDatas1 = JSON.parse(JSON.stringify(data));
                            this.$common.getProductInfoByScenicId(this, this.formDatas1.iscenicid, 2)
                                .then((options) => {
                                    this.formItemList1[2].optionList = options;
                                    let arr = this.formItemList1[2].optionList;
                                    for (let i = 0; i < arr.length; i++) {
                                        if (arr[i].label == data.sztickettypename) {
                                            this.formDatas1['itickettypeid'] = arr[i].value;
                                            break;
                                        }
                                    }
                                    this.spinShow = false
                                })
                        } else {
                            this.$Modal.error({
                                title: '操作失败',
                                content: res.data.msg
                            });
                            this.spinShow = false
                        }
                    })
                }
            },
            addOrsubtractRow (num, index) {    //增加或减少文本输入行
                this.$common.addOrsubtractRow(num, index, 'changebackrate', this)
            },
            async selectedChange (val) {   //服务商下拉选项改变，请求对应服务商产品
                const options = await this.$common.getProductInfoByScenicId(this, val, 2);
                this.formItemList1[2].optionList = options;
                if (this.formItemList1[2].optionList.length > 0) {
                    this.formDatas1.itickettypeid = this.formItemList1[2].optionList[0].value
                }
            }
        },
        watch: {
            '$route' () {
                this.spinShow = true;
                this.setPageName()
            }
        },
        async created(){
            const options = await this.$common.getScenicList(this, 1);
            this.formItemList1[1].optionList = options;
            this.setPageName();
        }
    }
</script>

<style scoped>

</style>
