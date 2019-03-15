<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}旅游卡</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas"
                        :formItemList = "formItemList"
                        @getFormData = "getFormData"
                ></detail-form1>
                <Spin size="large" fix v-if="spinShow"></Spin>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        name: "add",
        data(){
            return{
                spinShow: true,
                count: 0,
                pageName: '',
                pageName1: '',
                id: '',
                formDatas: {},
                formItemList: [
                    {
                        type: 1,
                        label: '旅游卡名称',
                        keyName:'name',
                        isRequired: true
                    },
                    {
                        type: 1,
                        label: '分润协议号',
                        keyName:'profitNum',
                        isRequired: true
                    },
                    {
                        type: 1,
                        label: '旅发委',
                        keyName:'tourCommission',
                        isRequired: true
                    },
                    {
                        type: 1,
                        label: '旅游卡单价',
                        keyName:'price',
                        isRequired: true
                    },
                    {
                        type: 5,
                        label: '旅游卡展示图片',
                        keyName: 'imageAddr',
                        btnLabel: '上传图片',
                        action: this.baseUrl+'/sys/fileUpload/v1/uploadPic',
                        data: {
                            access_token: this.Cookies.get('token')
                        }
                    },
                    {
                        type: 8,
                        label: '可使用景区',
                        keyName:'scenics',
                        keyName1: 'iscenicids',
                        btnLabel: '选择',
                        title: '选择景区',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        treeData: [],
                        treeType: 1,      //1为景区，2为地区，3为人员，如果是3，请使用自定义render树形控件
                        isRequired: true
                    },
                    {
                        type: 2,
                        label: '银行卡购买权限',
                        keyName:'bankCardFlag',
                        optionList:[
                            {
                                value: -1,
                                labelName: '不限银行卡',
                            }
                        ],
                        isRequired: true
                    },
                    {
                        type: 2,
                        label: '身份信息购买权限',
                        keyName:'identityCardFlag',
                        optionList:[
                            {
                                value: -1,
                                labelName: '不限'
                            },
                            {
                                value: 0,
                                labelName: '指定地区'
                            }
                        ],
                        isRequired: true
                    },
                    {
                        type: 8,
                        label: '',
                        keyName: 'identityCardAreas',
                        keyName1:'identityCardIds',
                        btnLabel: '选择',
                        title: '选择地区',
                        multiple: false,
                        showCheckBox: false,
                        treeModal: false,
                        treeData: [],
                        treeType: 2,      //1为景区，2为地区，3暂时没遇到
                        noShow: true,
                        isRequired: true
                    },
                    {
                        type: 13,
                        label: '旅游卡有效期',
                        keyName : 'periodType',
                        optionList:[
                            {
                                value: 0,
                                labelName: '按年',
                                keyName: 'year'
                            },
                            {
                                value: 1,
                                labelName: '按月',
                                keyName: 'month'

                            },{
                                value: 2,
                                labelName: '按天',
                                keyName: 'day'
                            },

                        ],
                        isRequired: true
                    },
                    {
                        type: 14,
                        label: '旅游卡有效次数',
                        keyName:'timesFlag',
                        keyName1: 'effectiveTimes',
                        isChildShow: true,
                        optionList:[
                            {
                                value: -1,
                                labelName: '不限'
                            },
                            {
                                value: 0,
                                labelName: '限定次数'
                            }
                        ],
                        isRequired: true
                    },
                    {
                        type: 4,
                        label: '旅游卡通用时间',
                        keyName:'usePeriod',
                        optionList: [
                            {
                                value:-1,
                                label:'不限',
                            },
                            {
                                value:0,
                                label:'周六周日不能使用',
                            },
                            {
                                value:1,
                                label:'节假日不能使用',
                            },
                        ],
                        isRequired: true
                    },
                    {
                        type: 2,
                        label: '旅游卡上下架',
                        keyName:'status',
                        optionList:[
                            {
                                value: 1,
                                labelName: '上架'
                            },
                            {
                                value: 0,
                                labelName: '下架'
                            }
                        ],
                        isRequired: true
                    },
                    {
                        type: 7,
                        label: '旅游卡说明',
                        keyName:'descpt'
                    }
                ]
            }
        },
        methods:{
            getFormData(obj){    //提交表单
                switch (obj.periodType){
                    case 0: obj.periodNumber = obj.year; delete obj.year; break;
                    case 1: obj.periodNumber = obj.month; delete obj.month; break;
                    case 2: obj.periodNumber = obj.day; delete obj.day; break;
                    default: break
                }
                if(this.pageName == '新增'){
                    this.$common.addNewData('/tourcard/tourcard/v1/save', this, obj)
                } else if(this.pageName == '修改'){
                    this.$common.editData('/tourcard/tourcard/v1/update', this, obj, 'put')
                }
            },
            setPageName(){     //根据新增or修改动态添加表单组件
                if(this.$route.name.indexOf('new') != -1){
                    this.pageName = '新增';
                    this.pageName1 = '旅游卡新增';
                    this.setAddInitData()
                } else {
                    this.pageName = '修改';
                    this.pageName1 = '旅游卡修改';
                    this.setEditInitData()
                }
            },
            setAddInitData () {
                this.formDatas = {
                    bankCardFlag: -1,
                    identityCardFlag: -1,
                    periodType: 0,
                    status: 1,
                    timesFlag: -1,
                    usePeriod: -1,
                    year: undefined,
                    month: undefined,
                    day: undefined,
                };
                this.spinShow = false
            },
            setEditInitData () {
                this.formItemList.unshift({
                    type: 1,
                    label: '旅游卡代码',
                    keyName: 'code',
                    disabled: true,
                    isRequired: true
                },);
                this.$http.get(this.baseUrl+'/tourcard/tourcard/v1/get/'+this.id)
                    .then(res => {
                        if(res.data.code == 200) {
                            let data = res.data.data;
                            switch (data.periodType) {
                                case 0:
                                    data.year = data.periodNumber;
                                    data.month = undefined;
                                    data.day = undefined;
                                    break;
                                case 1:
                                    data.month = data.periodNumber;
                                    data.year = undefined;
                                    data.day = undefined;
                                    break;
                                case 2:
                                    data.day = data.periodNumber;
                                    data.year = undefined;
                                    data.month = undefined;
                                    break;
                                default: break
                            }
                            this.formDatas = data;
                            this.isExpand(data,9);
                            this.spinShow = false
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                            this.spinShow = false
                        }
                    })
            },
            isExpand(form,index){    //根据身份购买权限展开下方控件
                if (form.identityCardFlag == 0) {
                    this.formItemList[index].noShow = false
                } else {
                    this.formItemList[index].noShow = true
                }
            }
        },
        watch: {
            '$route' (to,from) {
                this.spinShow = true;
                if(to.name == 'tour_card_new'){
                    this.formItemList.splice(0,1)
                }
                this.setPageName();
            },
            formDatas: {
                handler (form) {
                    if (this.$route.name.indexOf('new') != -1) {
                        this.isExpand(form,8)
                    } else {
                        this.isExpand(form,9)
                    }
                },
                deep: true
            },
            'formDatas.timesFlag' (val) {    //单选值变化，切换输入框显示
                this.formItemList.forEach((item,index) => {
                    if (item.keyName == 'timesFlag') {
                        if (val == -1) {
                            this.formItemList[index].isChildShow = false;
                            this.formDatas[item.keyName1] = ''
                        } else {
                            this.formItemList[index].isChildShow = true
                        }
                    }
                });
            },
            'formDatas.periodType' (val) {    //单选值变化，清空输入框的值
                this.formItemList.forEach((item) => {
                    if (item.keyName == 'periodType') {
                        item.optionList.forEach((obj) => {
                            if (this.count && val != obj.value) {
                                this.formDatas[obj.keyName] = undefined;
                            }
                        })
                    }
                });
                this.count++
            },
        },
        created(){
            this.id = this.$route.params.id;
            this.setPageName();
        }
    }
</script>

<style scoped>

</style>
