<template>
    <div>
        <Card>
            <p slot="title">查看短信发送设置</p>
            <view-del-detail
                    :formDatas="formDatas"
                    :formItemList="formItemList"
                    :is-show="isShow"
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
                        label: '编号',
                        keyName: 'conid'
                    },
                    {
                        label: '发送控制点名称',
                        keyName: 'controlpoin'
                    },
                    {
                        label: '内容模板',
                        keyName: 'templates',
                    },
                    {
                        label: '使用状态',
                        keyName:'byisuse',
                    },
                ],
            }
        },
        created () {
            this.$http.get(`${this.baseUrl}/sys/contMessage/v1/detail/${this.$route.params.id}`)
                .then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        switch (data.byisuse) {
                            case 0: data.byisuse = '禁用'; break;
                            case 1: data.byisuse = '启用'; break;
                            default: break
                        }
                        this.formDatas = data
                    }
                })
        }
    }
</script>

<style scoped>

</style>
