<template>
    <div>
        <Row>
            <Card>
                <p slot="title" style="height:32px;">
                    <span style="display:inline-block;float:left;line-height:32px;">{{pageName}}身份信息附加</span>
                </p>
                <detail-form1
                        :isListPage="false"
                        :isMixed="false"
                        :formDatas="formDatas"
                        :formItemList="formItemList"
                        @getFormData = "getFormData"
                ></detail-form1>
            </Card>
        </Row>
        <loading v-if="spinShow"></loading>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                spinShow: true,
                pageName: '',
                pageName1: '',
                formDatas: {},
                formItemList: [
                    {
                        type: 1,
                        label: '身份证号',
                        keyName:'identityNum',
                    },
                    {
                        type: 1,
                        label: '姓名',
                        keyName:'name',
                    },
                ]
            }
        },
        methods: {
            getFormData(obj){    //提交表单
                if(this.pageName == '新增'){
                    obj['cardCode'] = this.$route.params.id;
                    this.$common.addNewData('/tourcard/passPeople/v1/save', this, obj)
                } else if(this.pageName == '修改'){
                    obj['cardCode'] = this.$route.params.parentId;
                    this.$common.editData('/tourcard/passPeople/v1/update', this, obj, 'put')
                }
            },
            setPageName(){
                if(this.$route.name.indexOf('new') != -1){
                    this.pageName = '新增';
                    this.pageName1 = '身份信息附加新增';
                    this.formDatas = {};
                    this.spinShow = false
                }else {
                    this.pageName = '修改';
                    this.pageName1 = '身份信息附加修改';
                    this.$http.get(this.baseUrl+'/tourcard/passPeople/v1/get/'+ this.$route.params.id)
                        .then(res => {
                            if (res.data.code == 200) {
                                this.formDatas = res.data.data;
                                this.spinShow = false
                            } else {
                                this.$common.showMessageModal(this, res, 1);
                                this.spinShow = false
                            }
                        })
                }
            },
        },
        created () {
            this.setPageName()
        },
        watch: {
            '$route' () {
                this.setPageName();
            }
        }
    }
</script>

<style scoped>

</style>
