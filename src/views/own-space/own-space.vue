<style lang="less">

</style>

<template>
    <div>
        <Row>
            <Card>
                <p slot="title" class="slot_title_height">
                    <span class="title_span">账号资料</span>
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
            const mobile = (rule, value, callback) => {
                const reg = /^(13[0-9]|14[5-9]|15[0-9]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
                if (!reg.test(value) && value) {
                    let str = '手机号码格式错误';
                    callback(new Error(str))
                } else {
                    callback();
                }
            };
            const email = (rule, value, callback) => {
                const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                if (!reg.test(value) && value) {
                    let str = '电子邮件地址格式错误';
                    callback(new Error(str))
                } else {
                    callback();
                }
            };
            return {
                spinShow: true,
                btnLoading: false,
                tipName: '账号资料修改',
                formDatas_add: {},
                ruleDatas_add: {
                    szemployeename: [
                        { required:true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    szcellphone: [
                        { validator: mobile, trigger: 'blur' }
                    ],
                    szemail: [
                        { validator: email, trigger: 'blur' }
                    ],
                },
                formItemList_add:[
                    {
                        type: 1,
                        label: '姓名',
                        keyName: 'szemployeename',
                    },
                    {
                        type: 1,
                        label: '联系电话',
                        keyName: 'szcellphone',
                    },
                    {
                        type: 1,
                        label: '邮箱地址',
                        keyName: 'szemail',
                    },
                    {
                        type: 7,
                        label: '个人描述',
                        keyName: 'szmemo'
                    },
                ]
            }
        },
        methods: {
            getFormDataAdd (obj) {
                this.btnLoading = true;
                this.$common.editData(`/sys/employee/v1/updateEmployeeInfo?${this.QS.stringify(obj)}`, this, {}, 'put', true)
            }
        },
        created () {
            this.$http.get(`${this.baseUrl}/sys/employee/v1/employeeView`, {
                params: {
                    access_token: this.Cookies.get('token'),
                    employeeid: sessionStorage.getItem('iemployeeid')
                }
            }).then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data.employee;
                    this.formDatas_add = {
                        szemployeename: data.szemployeename,
                        szcellphone: data.szcellphone,
                        szemail: data.szemail,
                        szmemo: data.szmemo,
                        flag: 2
                    }
                } else {
                    this.$common.showMessageModal(this, res, 1)
                }
                this.spinShow = false
            });
        }
    };
</script>
