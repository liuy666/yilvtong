<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">管理票务产品属性</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :labelWidth = "220"
                        :formDatas = "formDatas"
                        :formItemList = "formItemList"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormData"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                tipName: '票务产品属性保存',
                spinShow: true,
                btnLoading: false,
                formDatas: {},
                formItemList: [
                    {
                        type: 1,
                        label: '景区名称',
                        keyName: 'szscenicname',
                        disabled: true,
                    },
                    {
                        type: 1,
                        label: '产品名称',
                        keyName: 'sztickettypename',
                        disabled: true,
                    },
                    {
                        type: 2,
                        label: '是否首次检票激活',
                        keyName: 'inoteger2',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 1,
                        label: '首次检票间隔时间(分钟)',
                        keyName: 'inoteger3',
                        isRequired: true,
                        hasDec: '(注：0为不限制)',
                        isRedDec: true
                    },
                    {
                        type: 2,
                        label: '指纹登记类型',
                        keyName: 'iszhiwen',
                        isRequired: true,
                        optionList: [
                            {
                                value: 0,
                                labelName: '不登记指纹'
                            },
                            {
                                value: 1,
                                labelName: '登记指纹'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否允许自定义价格',
                        keyName: 'inoteger4',
                        isRequired: true,
                        optionList: [
                            {
                                value: 0,
                                labelName: '不允许'
                            },
                            {
                                value: 1,
                                labelName: '允许,可随意修改'
                            },
                            {
                                value: 2,
                                labelName: '允许价格增加'
                            },
                            {
                                value: 3,
                                labelName: '允许价格减少'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否为精选打折票',
                        keyName: 'inoteger5',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '套票下的子票是否同时有效入园',
                        keyName: 'noted5',
                        optionList: [
                            {
                                value: '1',
                                labelName: '是'
                            },
                            {
                                value: '0',
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 2,
                        label: '是否限时控制',
                        keyName: 'choosetype',
                        optionList: [
                            {
                                value: 1,
                                labelName: '是'
                            },
                            {
                                value: 0,
                                labelName: '否'
                            }
                        ]
                    },
                    {
                        type: 4,
                        label: '开始时间',
                        keyName: 'dtstartdate',
                        optionList: [
                            { value: '00:00', label: '00:00' },{ value: '6:00', label: '6:00' },
                            { value: '7:00', label: '7:00' },{ value: '7:30', label: '7:30' },
                            { value: '8:00', label: '8:00' },{ value: '8:30', label: '8:30' },
                            { value: '9:00', label: '9:00' },{ value: '9:30', label: '9:30' },
                            { value: '10:00', label: '10:00' },{ value: '10:30', label: '10:30' },
                            { value: '11:00', label: '11:00' },{ value: '11:30', label: '11:30' },
                            { value: '12:00', label: '12:00' },{ value: '12:30', label: '12:30' },
                            { value: '13:00', label: '13:00' },{ value: '13:30', label: '13:30' },
                            { value: '14:00', label: '14:00' },{ value: '14:30', label: '14:30' },
                            { value: '15:00', label: '15:00' },{ value: '15:30', label: '15:30' },
                            { value: '16:00', label: '16:00' },{ value: '16:30', label: '16:30' },
                            { value: '17:00', label: '17:00' },{ value: '17:30', label: '17:30' },
                            { value: '18:00', label: '18:00' },{ value: '18:30', label: '18:30' },
                            { value: '19:00', label: '19:00' },{ value: '19:30', label: '19:30' },
                            { value: '20:00', label: '20:00' },{ value: '20:30', label: '20:30' },
                            { value: '21:00', label: '21:00' },{ value: '24:00', label: '24:00' },
                        ]
                    },
                    {
                        type: 4,
                        label: '结束时间',
                        keyName: 'dtenddate',
                        optionList: [
                            { value: '00:00', label: '00:00' },{ value: '6:00', label: '6:00' },
                            { value: '7:00', label: '7:00' },{ value: '7:30', label: '7:30' },
                            { value: '8:00', label: '8:00' },{ value: '8:30', label: '8:30' },
                            { value: '9:00', label: '9:00' },{ value: '9:30', label: '9:30' },
                            { value: '10:00', label: '10:00' },{ value: '10:30', label: '10:30' },
                            { value: '11:00', label: '11:00' },{ value: '11:30', label: '11:30' },
                            { value: '12:00', label: '12:00' },{ value: '12:30', label: '12:30' },
                            { value: '13:00', label: '13:00' },{ value: '13:30', label: '13:30' },
                            { value: '14:00', label: '14:00' },{ value: '14:30', label: '14:30' },
                            { value: '15:00', label: '15:00' },{ value: '15:30', label: '15:30' },
                            { value: '16:00', label: '16:00' },{ value: '16:30', label: '16:30' },
                            { value: '17:00', label: '17:00' },{ value: '17:30', label: '17:30' },
                            { value: '18:00', label: '18:00' },{ value: '18:30', label: '18:30' },
                            { value: '19:00', label: '19:00' },{ value: '19:30', label: '19:30' },
                            { value: '20:00', label: '20:00' },{ value: '20:30', label: '20:30' },
                            { value: '21:00', label: '21:00' },{ value: '24:00', label: '24:00' },
                        ]
                    },
                    {
                        type: 2,
                        label: '按日控制',
                        keyName: 'iskz',
                        optionList: [
                            {
                                value: '1',
                                labelName: '按星期控制'
                            },
                            {
                                value: '0',
                                labelName: '不控制'
                            }
                        ]
                    },
                    {
                        type: 16,
                        label: '控制星期',
                        keyName: 'kzdate',
                        textConBefore: '星期',
                        isRequired: true,
                        hasDec: '(格式：星期一，星期二，星期三可写成 1#2#3)',
                        isRedDec: true
                    }
                ]
            }
        },
        methods: {
            getFormData (obj) {
                this.btnLoading = true;
                let url = `/ticket/ticket/v1/productticketSave?itickettypeid=${this.$route.params.id}`;
                this.$common.editData(url, this, obj, 'post', true)
            },
            isShow (val, index) {   //是否显示某些表单项
                if (val == 1) {
                    this.formItemList[index]['noShow'] = false
                } else {
                    this.formItemList[index]['noShow'] = true
                }
            },
            initData () {   //初始化表单数据
                this.$http.get(this.baseUrl+'/ticket/ticket/v1/getEdmticketproductByTickettypeid',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        itickettypeid: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        this.formDatas = data;
                        this.formDatas['szscenicname'] = this.$route.params.parentId.split('-')[1];
                        this.formDatas['sztickettypename'] = this.$route.params.ticket;
                        this.formDatas.iskz = this.formDatas.iskz ? this.formDatas.iskz : '0';
                        this.formDatas.choosetype = this.formDatas.choosetype ? this.formDatas.choosetype : 0;
                        this.formDatas.dtstartdate = this.formDatas.dtstartdate ? this.formDatas.dtstartdate : '00:00';
                        this.formDatas.dtenddate = this.formDatas.dtenddate ? this.formDatas.dtenddate : '24:00';
                        this.isShow(data.choosetype, 9);
                        this.isShow(data.choosetype, 10);
                        this.isShow(data.iskz, 12);
                        this.spinShow = false
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            }
        },
        created () {
            this.initData()
        },
        watch: {
            'formDatas.iskz' (val) {
                this.isShow(val, 12)
            },
            'formDatas.choosetype' (val) {
                this.isShow(val, 9);
                this.isShow(val, 10)
            },
        }
    }
</script>

<style scoped>

</style>
