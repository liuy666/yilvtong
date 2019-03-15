<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">修改密码</span>
                </p>
                <detail-form1
                        :isListPage = "false"
                        :isMixed = "false"
                        :formDatas = "formDatas_add"
                        :ruleDatas = "ruleDatas_add"
                        :labelWidth = "120"
                        :formItemList = "formItemList_add"
                        :btn-loading="btnLoading"
                        @getFormData = "getFormDataAdd"
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
                btnLoading: false,
                tipName: '密码修改',
                formDatas_add: {},
                ruleDatas_add: {
                    oldPassword: [
                        { required:true, message: '旧密码不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required:true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                    rePassword: [
                        { required:true, message: '确认密码不能为空', trigger: 'blur' }
                    ],
                },
                formItemList_add:[
                    {
                        type: 1,
                        label: '用户编号',
                        keyName: 'user',
                        disabled: true
                    },
                    {
                        type: 1,
                        label: '旧密码',
                        keyName: 'oldPassword',
                        inputType: 'password'
                    },
                    {
                        type: 1,
                        label: '新密码',
                        keyName: 'newPassword',
                        inputType: 'password'
                    },
                    {
                        type: 1,
                        label: '确认密码',
                        keyName: 'rePassword',
                        inputType: 'password'
                    }
                ]
            }
        },
        methods: {
            getFormDataAdd (obj) {
                if (obj.newPassword !== obj.rePassword) {
                    this.$common.showMessageModal(this, '新密码与确认密码不一致', 2);
                    return false
                }
                this.formDatas_add = obj;
                this.btnLoading = true;
                this.$common.editData(`/sys/employee/v1/updateEmployeeInfo?${this.QS.stringify(obj)}`, this, {}, 'put', true)
            }
        },
        created () {
            this.formDatas_add = {
                user: JSON.parse(sessionStorage.getItem('user')),
                flag: 1
            };
            this.spinShow = false
        }
    }
</script>

<style scoped>

</style>