<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}价格分组</span>
                </p>
                <div>
                    <detail-form1
                            :isListPage = "false"
                            :isMixed = "false"
                            :formDatas = "formDatas"
                            :ruleDatas = "ruleDatas"
                            :labelWidth = "180"
                            :formItemList = "formItemList"
                            @getFormData = "getFormData"
                    ></detail-form1>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spinShow: false,
                pageName: '',
                formDatas: {},
                formItemList: [
                    {
                        type: 9,
                        label: '参数',
                        keyName: ''
                    },
                    {
                        type: 1,
                        label: '分组编码',
                        keyName: '',
                        hasDec: '若不输入，则系统自动生成',
                        isRedDec: true
                    },
                    {
                        type: 1,
                        label: '分组名称',
                        keyName: '',
                        isRequired: true
                    },
                    {
                        type: 7,
                        label: '参数备注',
                        keyName: '',
                    },
                ]
            }
        },
        methods: {
            getFormData (obj) {

            },
            setPageName () {
                if (this.$route.name.indexOf('new') != -1) {
                    this.pageName = '新增';
                } else {
                    this.pageName = '修改';
                }
            }
        },
        created () {
            this.setPageName()
        },
        watch: {
            '$route' () {
                // this.spinShow = true;
                this.setPageName()
            }
        }
    }
</script>

<style scoped>

</style>
