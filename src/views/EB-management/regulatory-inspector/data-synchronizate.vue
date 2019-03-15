<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">数据同步</span>
                    <top-btn
                            :btnList="btnList"
                    ></top-btn>
                </p>
                <detail-form1
                        :isListPage="false"
                        :isMixed="false"
                        :okWords="'同步'"
                        :needListReset="false"
                        :formDatas="formDatas"
                        :rule-datas="ruleDatas"
                        :formItemList="formItemList"
                        @getFormData="getFormData"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
        <Spin fix size="large" v-if="spinShow1">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>数据同步中...</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        name: 'data-synchronizate',
        data () {
            const partId = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择景区服务商'));
                } else {
                    callback();
                }
            };
            const dataType = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择同步类型'));
                } else {
                    callback();
                }
            };
            const synDate = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请选择日期'));
                } else {
                    callback();
                }
            };
            return {
                searchCount: 1,
                spinShow: true,
                spinShow1: false,
                btnList: [
                    {
                        type: 1,
                        btnlabel: '刷新'
                    }
                ],
                formDatas: {},
                ruleDatas: {
                    partId: [
                        { required: true, validator: partId, trigger: 'change' }
                    ],
                    dataType: [
                        { required: true, validator: dataType, trigger: 'change' }
                    ],
                    synDate: [
                        { required: true, validator: synDate, trigger: 'change' }
                    ]
                },
                formItemList: [
                    {
                        type: 4,
                        keyName: 'partId',
                        label: '所属服务商',
                        labelWidth: 100,
                        optionList: []
                    },
                    {
                        type: 4,
                        keyName: 'dataType',
                        label: '同步类型',
                        labelWidth: 100,
                        optionList: [
                            {
                                value: 1,
                                label: '系统配置'
                            },
                            {
                                value: 2,
                                label: '票务信息'
                            },
                            {
                                value: 3,
                                label: '订单'
                            },
                            {
                                value: 4,
                                label: '售检票数据'
                            }
                        ],
                        noShow: true
                    },
                    {
                        type: 4,
                        keyName: 'synDate',
                        label: '日期',
                        labelWidth: 100,
                        optionList: [],
                        noShow: true
                    }
                ]
            };
        },
        methods: {
            async getFormData (obj) {
                this.spinShow1 = true;
                this.$http.post('http://192.168.90.169:86/synserver/manual/synClientData', { ...obj })
                // this.$http.post('http://192.168.90.169:86/synclient/manual/synServerData', { ...obj })
                    .then(res => {
                        if (res.data.returnCode === 'SUCCESS') {
                            this.$Modal.success({
                                title: '温馨提示',
                                content: res.data.returnMsg
                            });
                        } else {
                            this.$Modal.error({
                                title: '温馨提示',
                                content: res.data.returnMsg
                            });
                        }
                        this.spinShow1 = false;
                    })
                    .catch(err => {
                        console.log(err);
                        this.spinShow1 = false;
                    });
            }
        },
        created () {
            this.$http.post('http://192.168.90.169:86/synserver/manual/getPartList')
                .then(res => {
                    if (res.data.returnCode === 'SUCCESS') {
                        let options = [];
                        res.data.content.list.map(item => {
                            options.push({
                                value: item.ecsPartId,
                                label: item.ecsPartName
                            });
                        });
                        this.formItemList[0].optionList = options;
                    } else {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: res.data.returnMsg
                        });
                    }
                    this.spinShow = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        watch: {
            'formDatas.partId' (val) {
                if (val) {
                    this.formItemList[1].noShow = false;
                }
            },
            'formDatas.dataType' (val) {
                this.$set(this.formDatas, 'synDate', '');
                this.formDatas.synDate = '';
                this.$http.post('http://192.168.90.169:86/synserver/manual/getClientSynDate', {
                    partId: this.formDatas.partId,
                    dataType: val
                }).then(res => {
                    if (res.data.returnCode === 'SUCCESS') {
                        const option = res.data.content.list;
                        let arr = [];
                        option.map(item => {
                            arr.push({
                                value: item,
                                label: item
                            });
                        });
    
                        this.formItemList[2].optionList = arr;
                        this.formItemList[2].noShow = false;
                    } else {
                        this.$Modal.error({
                            title: '温馨提示',
                            content: res.data.returnMsg
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped>

</style>