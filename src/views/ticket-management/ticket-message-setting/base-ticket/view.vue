<template>
    <div>
        <Card>
            <p slot="title">查看基础票</p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
            ></view-del-detail>
        </Card>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formDatas: {},
                formItemList: [
                    {
                        label: '景区名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '产品编号',
                        keyName: 'itickettypeid'
                    },
                    {
                        label: 'IC卡代码',
                        keyName: 'icid'
                    },
                    {
                        label: '产品编码',
                        keyName: 'sztickettypecode'
                    },
                    {
                        label: '产品名称',
                        keyName: 'sztickettypename'
                    },
                    {
                        label: '产品类别',
                        keyName: 'strbycategorytype'
                    },
                    {
                        label: '票号规则',
                        keyName: 'strticketrule'
                    },
                    {
                        label: '检票方式',
                        keyName: 'byusage'
                    },
                    {
                        label: '使用限制',
                        keyName: 'byuselimit'
                    },
                    {
                        label: '出票方式',
                        keyName: 'strticketway'
                    },
                    {
                        label: '介质类型',
                        keyName: 'strmediatype'
                    },
                    {
                        label: '印刷代码',
                        keyName: 'szticketprintcode'
                    },
                    {
                        label: '有效天数',
                        keyName: 'validityday'
                    },
                    {
                        label: '工本费',
                        keyName: 'mnominalfee'
                    },
                    {
                        label: '是否参与入园统计',
                        keyName: 'bispersontimestat'
                    },
                    {
                        label: '是否启用',
                        keyName: 'byisuse'
                    },
                    {
                        label: '备注',
                        keyName: 'szmemo'
                    },
                    {
                        label: '是否启用分时预约',
                        keyName: 'int3'
                    }
                ]
            }
        },
        created () {
            let str = `?access_token=${this.Cookies.get('token')}&itickettypeid=${this.$route.params.id}`;
            this.$http.get(`${this.baseUrl}/ticket/ticket/v1/productView${str}`).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data;
                    data.byusage = data.byusage ? '一票多人' : '一票一人';
                    data.byuselimit = data.byuselimit ? '长期性' : '一次性';
                    data.bispersontimestat = data.bispersontimestat ? '是' : '否';
                    data.byisuse = data.byisuse ? '启用' : '禁用';
                    data.int3 = data.int3 ? '是' : '否';
                    this.formDatas = data
                } else {
                    this.$common.showModal(this, res, 1)
                }
            })
        }
    }
</script>

<style scoped>

</style>
