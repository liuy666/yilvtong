<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}团体用户</p>

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
                    label : "用户名",
                    keyName : "userName",
                    type : 1,
                    isRequired : true,
                    hasDec : "(由数字、26个英文字母组成,最少4位!)",
                    isRedDec : true,
                    hasTitle : true,
                    titleName : "基本资料"
                },{
                    label : "登录密码",
                    keyName : "loginPwd",
                    type : 1,
                    isRequired : true,
                    hasDec : "(只能输入数字)",
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
                    label : "团队用户类别",
                    keyName : "teamUserType",
                    type : 9
                },{
                    label : "是否主用户",
                    keyName : "isCenterUser",
                    type : 9
                },{
                    label : "身份证号",
                    keyName : "IdCard",
                    type : 1,
                    isRequired : true
                },{
                    label : "导游证号",
                    keyName : "guideCard",
                    type : 1,
                    isRequired : true
                },{
                    label : "业务类型",
                    keyName : "businessType",
                    type : 9
                },{
                    label : "所属地",
                    keyName : "place",
                    type : 10,
                    btnLabel : "选择",
                    isRequired :true
                },{
                    label : "电子邮件",
                    keyName : "email",
                    type : 1,
                    isRequired :true
                },{
                    label : "导游姓名",
                    keyName : "guideName",
                    type : 1,
                    hasTitle : true,
                    titleName : "联系信息",
                    isRequired :true
                },{
                    label: "手机号码",
                    keyName : "phone",
                    type : 1,
                    isRequired :true
                },{
                    label : "QQ",
                    keyName : "qq",
                    type : 1
                },{
                    label : "MSN",
                    keyName : "MSN",
                    type : 1
                },{
                    label : "固定电话",
                    keyName : "linkPhone",
                    type : 1
                },{
                    label : "通信地址",
                    keyName : "address",
                    type : 1
                },{
                    label : "传真",
                    keyName : "companyName",
                    type : 1
                },{
                    label: "邮编",
                    keyName : "phone",
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
                userName : '',
                loginPwd : '',
                userStatus : '有效用户',
                userRegisterType : '游客用户',
                teamUserType : '导游',
                isCenterUser : '是',
                businessType : '散客业务',
                IdCard :'',
                guideCard:'',
                place : '',
                email:'',
                linkMan : '',
                address : '',
                phone :'',
                linkPhone : '',
                qq : '',
                MSN : '',
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
