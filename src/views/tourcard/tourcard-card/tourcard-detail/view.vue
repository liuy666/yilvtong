<template>
    <div>
        <Card>
            <p slot="title">查看旅游卡明细</p>

            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :is-show="isShow"
            ></view-del-detail>
        </Card>
        <loading v-if="spinShow"></loading>
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
                        label: '旅游卡卡号',
                        keyName: 'cardNumber'
                    },
                    {
                        label: '旅游卡代码',
                        keyName: 'code'
                    },
                    {
                        label: '创建时间',
                        keyName: 'createTime'
                    },
                    {
                        label: '旅游卡名称',
                        keyName: 'name'
                    },
                    {
                        label: '分润协议号',
                        keyName:'profitNum'
                    },
                    {
                        label: '姓名',
                        keyName:'username'
                    },
                    {
                        label: '身份证号',
                        keyName:'identityNum'
                    },
                    {
                        label: '开通状态',
                        keyName:'status',
                    },
                    {
                        label: '单价',
                        keyName: 'price'
                    },
                    {
                        label: '单位/学校',
                        keyName: 'organization'
                    },
                    {
                        label: '工号/学号',
                        keyName: 'workNum'
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
                        keyName:'effectiveTimes'
                    },
                    {
                        label: '已使用',
                        keyName:'usedTimes'
                    },
                    {
                        label: '是否为历史卡',
                        keyName:'historyCardFlag',
                    },
                    {
                        label: '可使用景区',
                        keyName:'scenics',
                    },
                    {
                        label: '说明',
                        keyName:'descpt'
                    },
                    {
                        label: '创建人',
                        keyName: 'createMan'
                    }
                ]
            }
        },
        created () {
            this.$http.get(this.baseUrl+'/tourcard/tourCardDetail/v1/get/'+this.$route.params.id)
                .then (res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        data.usedTimes = `${data.usedTimes}次`;
                        if (!data.descpt) {
                            data.descpt = '无'
                        }
                        switch (data.effectiveTimes) {
                            case -1: data.effectiveTimes = '不限次';break;
                            default: data.effectiveTimes = `${data.effectiveTimes}次`;break
                        }
                        switch (data.status) {
                            case 0: data.status = '未开通';break;
                            case 1: data.status = '已开通';break;
                            case 2: data.status = '已过期';break;
                            default: break
                        }
                        switch (data.historyCardFlag) {
                            case 0: data.historyCardFlag = '否';break;
                            case 1: data.historyCardFlag = '是';break;
                            default: break
                        }
                        this.formDatas = data;
                        this.spinShow = false
                    }

                })
        }
    }
</script>

<style scoped>

</style>
