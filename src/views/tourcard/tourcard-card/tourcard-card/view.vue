<template>
    <div>
        <Card>
            <p slot="title">查看旅游卡</p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
            ></view-del-detail>
        </Card>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                // elHeight: '',
                spinShow: true,
                formDatas: {},
                formItemList: [
                    {
                        label: '旅游卡代码',
                        keyName: 'code'
                    },
                    {
                        label: '旅游卡名称',
                        keyName: 'name'
                    },
                    {
                        label: '展示图片',
                        keyName: 'imageAddr',
                        showElement: true,
                        showImage: true
                    },
                    {
                        label: '分润协议号',
                        keyName:'profitNum'
                    },
                    {
                        label: '旅发委',
                        keyName:'tourCommission'
                    },
                    {
                        label: '旅游卡单价',
                        keyName:'price'
                    },
                    {
                        label: '可使用景区',
                        keyName:'scenics',
                    },
                    {
                        label: '银行卡购买权限',
                        keyName:'bankCardFlag',
                    },
                    {
                        label: '身份信息购买权限',
                        keyName:'identityCardFlag',
                    },
                    {
                        label: '旅游卡有效次数',
                        keyName:'timesFlag',
                    },
                    {
                        label: '旅游卡通用时间',
                        keyName:'usePeriod',
                    },
                    {
                        label: '旅游卡上下架',
                        keyName:'status',
                    },
                    {
                        label: '旅游卡说明',
                        keyName:'descpt'
                    }
                ]
            }
        },
        methods: {
            initData () {
                this.$http.get(this.baseUrl+'/tourcard/tourcard/v1/get/'+this.$route.params.id)
                    .then(res => {
                        let data = res.data.data;
                        data.bankCardFlag = '不限';
                        switch (data.identityCardFlag){
                            case 0: data.identityCardFlag = data.identityCardAreas;break;
                            case -1: data.identityCardFlag = '不限';break;
                            default: break
                        }
                        switch (data.timesFlag){
                            case 0: data.timesFlag = data.effectiveTimes;break;
                            case -1: data.timesFlag = '不限';break;
                            default: break
                        }
                        switch (data.usePeriod){
                            case -1: data.usePeriod = '不限';break;
                            case 0: data.usePeriod = '周六周日不能使用';break;
                            case 1: data.usePeriod = '节假日不能使用';break;
                            default: break
                        }
                        switch (data.status){
                            case -1: data.status = '删除';break;
                            case 0: data.status = '下架';break;
                            case 1: data.status = '上架';break;
                            default: break
                        }
                        this.formDatas = data;
                        this.spinShow = false
                    })
            }
        },
        created(){
            // this.$common.getMainHeight(this);
            this.initData()
        }
    }
</script>

<style scoped>

</style>
