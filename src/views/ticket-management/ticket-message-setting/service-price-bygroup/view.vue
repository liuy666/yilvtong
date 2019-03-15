<template>
    <div>
        <Card>
            <p slot="title">查看服务商价格分组</p>
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
                        label: '编号',
                        keyName: 'seq'
                    },
                    {
                        label: '服务商名称',
                        keyName: 'szscenicname'
                    },
                    {
                        label: '价格分组名称',
                        keyName: 'pmva'
                    },
                    {
                        label: '用户',
                        keyName: 'corpname'
                    },
                    {
                        label: '使用状态',
                        keyName: 'byisuse',
                    }
                ]
            }
        },
        created () {
            this.$http.get(this.baseUrl+'/ticket/jgfz/v1/queryJgfzById',{
                params: {
                    access_token: this.Cookies.get('token'),
                    seq: this.$route.params.id
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data;
                        data.byisuse = data.byisuse ? '启用' : '禁用';
                        this.formDatas = data
                    } else {
                        this.$Modal.error({
                            title: "温馨提示",
                            content: res.data.msg
                        });
                    }
                });
        }
    }
</script>

<style scoped>

</style>
