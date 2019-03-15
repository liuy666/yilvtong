<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}游客用户</p>

            <detail-form
                :form-name="formName"
                :form-datas="formData"
                :form-item-list="formItemList"
                :is-list-page="isListPage"
                :is-mixed="isMixed"
                @chooseDialog="showChooseDialog"
            ></detail-form>

        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formData : {},
            formItemList : [
                {
                    label : "手机号码",
                    keyName : "phone",
                    type : 1,
                    isRequired : true,
                    hasDec : "(可用作登录，请认真填写)",
                    isRedDec : true,
                    hasTitle : true,
                    titleName : "基本资料"
                },{
                    label : "电子邮件",
                    keyName : "email",
                    type : 1
                },{
                    label : "登录密码",
                    keyName : "loginPwd",
                    type : 1,
                    isRequired : true,
                    hasDec : "只能输入数字",
                    isRedDec : true
                },{
                    label : "用户状态",
                    keyName : "userStatus",
                    type : 9
                },{
                    label : "用户注册类型",
                    keyName : "userRegisterType",
                    type : 9
                },{
                    label : "业务类型",
                    keyName : "businessType",
                    type : 9
                },{
                    label : "所属地",
                    keyName : "place",
                    type : 10,
                    btnLabel : "选择"
                },{
                    label : "联系人",
                    keyName : "linkMan",
                    type : 1,
                    hasTitle : true,
                    titleName : "联系信息"
                },{
                    label : "地址",
                    keyName : "address",
                    type : 1
                },{
                    label : "联系电话",
                    keyName : "linkPhone",
                    type : 1
                },{
                    label : "QQ",
                    keyName : "qq",
                    type : 1
                },{
                    label : "MSN",
                    keyName : "MSN",
                    type : 1
                }
            ],
            isListPage : false,
            isMixed : false,
            pageName : '',
            formName : ''
        }
    },
    computed : {
        
    },
    methods : {
        setPageName () {
            this.pageName = '新增';
            this.formName = "detailForm_new";
            this.setAddForm();
        },
        setAddForm () {
            this.formData = {
                phone : '',
                email : '',
                loginPwd : '',
                userStatus : '有效用户',
                userRegisterType : '游客用户',
                businessType : '散客业务',
                place : '',
                linkMan : '',
                address : '',
                linkPhone : '',
                qq : '',
                MSN : ''
            }
        },
        showChooseDialog () {

        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        
    }
}
</script>
