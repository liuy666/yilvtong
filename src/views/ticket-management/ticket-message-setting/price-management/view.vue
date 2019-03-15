<template>
    <div>
        <Card>
            <p slot="title">查看价格</p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :label-width="160"
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
                        label: '价格编号',
                        keyName: 'icrowdkindpriceid'
                    },
                    {
                        label: '所属产品',
                        keyName: 'strtickettype'
                    },
                    {
                        label: '价格代码',
                        keyName: 'icrowdkindpricecode'
                    },
                    {
                        label: '人群种类',
                        keyName: 'strcrowdkind'
                    },
                    {
                        label: '业务类型',
                        keyName: 'strbusiness'
                    },
                    {
                        label: '价格开始日期',
                        keyName: 'startdata'
                    },
                    {
                        label: '价格结束日期',
                        keyName: 'enddata'
                    },
                    {
                        label: '是否实名制',
                        keyName: 'ipeoplenumrange'
                    },
                    {
                        label: '挂牌价',
                        keyName: 'listingprice'
                    },
                    {
                        label: '实际售价',
                        keyName: 'mactualsaleprice'
                    },
                    {
                        label: '结算价',
                        keyName: 'jsprice'
                    },
                    {
                        label: '排序',
                        keyName: 'isequence'
                    },
                    {
                        label: '是否启用',
                        keyName: 'byisuse'
                    },
                    {
                        label: '是否网上销售',
                        keyName: 'isnet'
                    },
                    {
                        label: '是否现场销售',
                        keyName: 'isscene'
                    },
                    {
                        label: '是否扫码购票',
                        keyName: 'isscancode'
                    },
                    {
                        label: '是否旅游卡购票',
                        keyName: 'note3'
                    },
                    {
                        label: '是否允许成团人数控制',
                        keyName: 'inote3'
                    },
                    {
                        label: '用户级别',
                        keyName: 'note1'
                    },
                    {
                        label: '语音提示',
                        keyName: 'note2'
                    },
                    {
                        label: '备注',
                        keyName: 'szmemo'
                    },
                ]
            }
        },
        created () {
            this.$http.get(this.baseUrl+'/ticket/crowdKindPrice/v1/crowdKindPriceView',{
                params: {
                    access_token: this.Cookies.get('token'),
                    iCrowdKindPriceId: this.$route.params.id
                }
            }).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data;
                    data.byisuse = data.byisuse ? '启用' : '禁用';
                    data.ipeoplenumrange = data.ipeoplenumrange ? '是' : '否';
                    data.isnet = data.isnet ? '是' : '否';
                    data.isscene = data.isscene ? '是' : '否';
                    data.isscancode = data.isscancode ? '是' : '否';
                    data.note3 = data.note3 == 1 ? '是' : '否';
                    data.inote3 = data.inote3 ? '是' : '否';
                    this.formDatas = data;
                    this.spinShow = false
                } else {
                    this.$common.showMessageModal(this, res, 1);
                    this.spinShow = false
                }
            })
        }
    }
</script>

<style scoped>

</style>
