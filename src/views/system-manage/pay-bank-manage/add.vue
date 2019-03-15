<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}银行排序</span>
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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pageName: '',
                spinShow: true,
                formDatas: {},
                formItemList: [
                    {
                        type: 4,
                        label: '对应银行',
                        keyName:'name'
                    },
                    {
                        type: 9,
                        label: '对应银行',
                        keyName:'name'
                    },
                    {
                        type: 1,
                        label: '行数',
                        keyName:'profitNum'
                    },
                    {
                        type: 1,
                        label: '列数',
                        keyName:'tourCommission'
                    },
                ],
            }
        },
        methods: {
            getFormData (obj) {
                if (this.pageName == '新增') {

                } else {

                }
            },
            setPageName () {
                if(this.$route.name.indexOf('new') != -1){
                    this.pageName = '新增';
                    this.tabShowOrHide(0, false);
                    this.tabShowOrHide(1, true);
                    this.setAddInitData()
                } else {
                    this.pageName = '修改';
                    this.tabShowOrHide(0, true);
                    this.tabShowOrHide(1, false);
                    this.setEditInitData()
                }
            },
            setAddInitData () {
                this.formDatas = {};
                this.spinShow = false
            },
            setEditInitData () {
                //axios请求
                this.spinShow = false
            },
            tabShowOrHide (index, noShow) {    //组件显示与否
                this.formItemList[index].noShow = noShow
            },
        },
        watch: {
            '$route' () {
                this.setPageName()
            }
        },
        created () {
            this.setPageName();
        }
    }
</script>

<style scoped>

</style>
