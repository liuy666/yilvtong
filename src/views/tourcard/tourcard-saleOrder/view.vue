<template>
    <div>
        <Card>
            <p slot="title">查看旅游卡销售订单详情</p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
            ></view-del-detail>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </Card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spinShow: true,
                formDatas: {},
                formItemList: [
                    {
                        label: '单号',
                        keyName: 'orderID'
                    },
                    {
                        label: '创建时间',
                        keyName: 'createDate'
                    },
                    {
                        label: '买家账号',
                        keyName: 'userId'
                    },
                    {
                        label: '旅发委发行',
                        keyName: 'tourCommission'
                    },
                    {
                        label: '旅游卡代码',
                        keyName: 'cardCode'
                    },
                    {
                        label: '旅游卡名称',
                        keyName: 'cardName'
                    },
                    {
                        label: '旅游卡卡号',
                        keyName: 'cardNum'
                    },
                    {
                        label: '分润协议名称',
                        keyName: 'profitNum'
                    },
                    {
                        label: '姓名',
                        keyName: 'userName'
                    },
                    {
                        label: '身份证号',
                        keyName: 'markedIdentityNum'
                    },
                    {
                        label: '手机号',
                        keyName: 'mobileNum'
                    },
                    {
                        label: '银行卡发行',
                        keyName: 'bankCardPublishAddr'
                    },
                    {
                        label: '身份信息归属地',
                        keyName: 'bankCardBelongAddr'
                    },
                    {
                        label: '旅游卡生效时间',
                        keyName: 'periodStartDate'
                    },
                    {
                        label: '旅游卡截止时间',
                        keyName: 'periodEndDate'
                    },
                    {
                        label: '旅游卡有效次数',
                        keyName: 'effectiveTimes'
                    },
                    {
                        label: '单价',
                        keyName: 'price'
                    },
                    {
                        label: '支付状态',
                        keyName: 'payStatus'
                    },
                    {
                        label: '开通状态',
                        keyName: 'openingStatus'
                    },
                    {
                        label: '可使用景区',
                        keyName: 'isSenicids'
                    },
                    {
                        label: '说明',
                        keyName: 'descpt'
                    }
                ]
            }
        },
        methods: {
            initData () {
                this.$http.get(`${this.baseUrl}/tourcard/tourCardOrder/v1/get/${this.$route.params.id}`,{
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        data.createDate = `${this.$common.getCurrentDate(data.createDate)} ${this.$common.getCurrentTime(data.createDate)}`
                        data.effectiveTimes = data.effectiveTimes ? data.effectiveTimes : '不限';
                        data.payStatus = data.payStatus ? '已支付' : '未支付';
                        data.openingStatus = data.openingStatus == 0 ? '正常' : (data.openingStatus == 1 ? '已过期' : '未开通');
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
            this.initData()
        }
    }
</script>

<style scoped>

</style>
