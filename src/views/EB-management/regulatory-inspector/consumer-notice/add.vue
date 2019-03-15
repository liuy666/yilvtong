<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}消费通知</span>
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
        data () {
            return {
                // elHeight: '',
                spinShow: true,
                pageName: '',
                formDatas: {},
                formItemList: [
                    {
                        type: 9,
                        label: '订单号',
                        keyName:'orid'
                    },
                    {
                        type: 9,
                        label: '下单用户',
                        keyName:'orderuserid'
                    },
                    {
                        type: 9,
                        label: '消费数量',
                        keyName:'useQuantity'
                    },
                    {
                        type: 9,
                        label: '消费时间',
                        keyName:'consumedate'
                    },
                    {
                        type: 9,
                        label: '企业编码',
                        keyName:'oto_code'
                    },
                    {
                        type: 9,
                        label: '消费流水号',
                        keyName:'sign'
                    },
                    {
                        type: 1,
                        label: '发送次数',
                        keyName:'printNum'
                    },
                    {
                        type: 2,
                        label: '状态',
                        keyName:'state',
                        optionList: [
                            {
                                value: 1,
                                labelName: '成功'
                            },
                            {
                                value: 0,
                                labelName: '失败'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            getFormData (obj) {
                this.$common.editData('/ec/cytConsumeManager/v1/update', this, obj)
            },
            setPageName () {
                this.pageName = '修改';
                this.setEditInitData()
            },
            setEditInitData () {
                this.$http.get(`${this.baseUrl}/ec/cytConsumeManager/v1/detail/${this.$route.params.id}`,{
                    params: { access_token: this.Cookies.get('token')}
                }).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        this.formDatas = data;
                        this.spinShow = false
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                        this.spinShow = false
                    }
                })
            }
        },
        created () {
            // this.$common.getMainHeight(this);
            this.setPageName()
        }
    }
</script>

<style scoped>

</style>
