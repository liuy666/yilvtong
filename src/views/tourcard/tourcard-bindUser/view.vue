<template>
    <div>
        <Card>
            <p slot="title">查看旅游卡绑定用户</p>
            <view-del-detail
                    :formDatas="pars.formDatas"
                    :formItemList="formItemList"
                    :is-show="false"
            ></view-del-detail>
            <radio-table
                    :colname="colname"
                    :total='total'
                    :tableData="tableData"
                    :pageNum="pars.pageNum"
                    :pageCode="pars.pageCode"
                    :loading="loading"
            ></radio-table>
            <Button type="ghost"  @click="closePage" class="op-btns closebtn" >关闭</Button>
        </Card>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spinShow: true,
                formItemList: [
                    {
                        label: '用户账号',
                        keyName: 'ACCOUNT'
                    },
                    {
                        label: '姓名',
                        keyName: 'USERNAME'
                    },
                    {
                        label: '身份证号',
                        keyName: 'IDENTITYNUM'
                    },
                    {
                        label: '手机号',
                        keyName: 'MOBILE'
                    },
                    {
                        label: '身份证归属地',
                        keyName: 'IDENTITYAREA'
                    },
                ],
                colname: [
                    {
                        title: '序号',
                        key: 'ID'
                    },
                    {
                        title: '旅游卡代码',
                        key: 'CODE'
                    },
                    {
                        title: '旅游卡名称',
                        key: 'NAME'
                    },
                    {
                        title: '分润协议号',
                        key: 'PROFITNUM'
                    },
                    {
                        title: '绑卡时间',
                        key: 'CREATETIME'
                    },
                    {
                        title: '旅游卡卡号',
                        key: 'CARDNUMBER'
                    },
                    {
                        title: '单价',
                        key: 'PRICE'
                    },
                    {
                        title: '旅游卡生效时间',
                        key: 'PERIODSTARTDATE'
                    },
                    {
                        title: '旅游卡截止时间',
                        key: 'PERIODENDDATE'
                    },
                    {
                        title: '有效次数',
                        key: 'EFFECTIVETIMES'
                    },
                    {
                        title: '已使用次数',
                        key: 'USEDTIMES'
                    },
                    {
                        title: '剩余次数',
                        key: 'LEAVETIMES'
                    },
                    {
                        title: '开通状态',
                        key: 'STATUS'
                    },
                    {
                        title: '可使用地区',
                        key: 'SCENICS'
                    }
                ],
                tableData:[],
                total: 0,
                loading: false,
                pars:{
                    formDatas:{},
                    pageNum:10,
                    pageCode:1,
                },
            }
        },
        methods: {
            closePage () {
                this.$common.closePage(this)
            }
        },
        created () {
            this.$http.get(this.baseUrl+'/tourcard/tourcardBindUser/v1/get/'+this.$route.params.id)
                .then(res => {
                    let data = res.data.data;
                    this.pars.formDatas = data.userData;
                    this.tableData = data.tourCardDetails;
                    this.total = this.tableData.length;
                    this.spinShow = false
                })
        }
    }
</script>

<style scoped>

</style>
