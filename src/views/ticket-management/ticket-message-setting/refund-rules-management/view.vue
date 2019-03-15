<template>
    <div>
        <Card>
            <p slot="title">查看退票规则信息</p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :labelWidth="labelWidth"
            ></view-del-detail>
        </Card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                labelWidth: 200,
                formDatas: {},
                formItemList: [
                    {
                        label: '退订规则名称',
                        keyName: 'gzname'
                    },
                    {
                        label: '服务商名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '产品名称',
                        keyName: 'sztickettypename'
                    },
                    {
                        label: '计算方式',
                        keyName: 'jsfs'
                    },
                    {
                        label: '出票前后',
                        keyName: 'xyjs4'
                    },
                    {
                        label: '使用状态',
                        keyName: 'isvalid'
                    },
                    {
                        label: '过期票是否允许出票口直接退票',
                        keyName: 'xyjs2'
                    },
                    {
                        label: '过期票退票费率',
                        keyName: 'xyrate2'
                    },
                    {
                        label: '选择项',
                        cycle: []
                    },
                    {
                        label: '备注',
                        keyName: 'sznote'
                    },
                ]
            }
        },
        created () {
            this.$http.get(this.baseUrl+'/ticket/ticketXgz/v1/ticketbackruleView', {
                params:{
                    access_token: this.Cookies.get('token'),
                    gzid: this.$route.params.id
                }
            })
                .then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        let arr = [];
                        switch (data.xyjs4) {
                            case 0: data.xyjs4 = '出票前'; break;
                            case 1: data.xyjs4 = '出票后'; break;
                            default: break
                        }
                        switch (data.isvalid) {
                            case 0: data.isvalid = '禁用'; break;
                            case 1: data.isvalid = '启用'; break;
                            default: break
                        }
                        switch (data.xyjs2) {
                            case 0: data.xyjs2 = '不能退票'; break;
                            case 1: data.xyjs2 = '能退票'; break;
                            default: break
                        }
                        data.changebackrate.forEach(obj => {
                            arr.push([
                                {
                                    label: '时间',
                                    keyName: obj.time
                                },{
                                    label: '退订费率',
                                    keyName: obj.tdfl
                                }
                            ])
                        });
                        this.formDatas = data;
                        this.formItemList[8].cycle = arr
                    } else {
                        this.$Modal.error({
                            title: '操作失败',
                            content: res.data.msg
                        })
                    }
                })
        }
    }
</script>

<style scoped>

</style>
