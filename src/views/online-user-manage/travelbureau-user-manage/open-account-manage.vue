<template>
    <div>
        <Card>
            <p slot="title">开户信息管理</p>

            <detail-form
                :form-name="formName"
                :form-datas="formData"
                :form-item-list="formItemList"
                :is-list-page="false"
                :is-mixed="false"
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
                    label : "结算系统商户账号",
                    keyName : "userName",
                    type : 1,
                    isRequired : true,
                    hasTitle : true,
                    titleName : "企业信息"
                },{
                    label : "企业名称",
                    keyName : "loginPwd",
                    type : 1,
                    isRequired : true
                },{
                    label : "企业网站",
                    keyName : "userStatus",
                    type : 1
                },{
                    label : "企业地址",
                    keyName : "userRegisterType",
                    type : 1
                },{
                    label : "工商注册号",
                    keyName : "teamUserType",
                    type : 1,
                    isRequired : true
                },{
                    label : "组织结构代码",
                    keyName : "isCenterUser",
                    type : 1,
                    isRequired : true
                },{
                    label : "法人",
                    keyName : "IdCard",
                    type : 1,
                    isRequired : true
                },{
                    label : "法人身份证",
                    keyName : "guideCard",
                    type : 1,
                    isRequired : true
                },{
                    label : "行业类别",
                    keyName : "businessType",
                    type : 4,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        label : "酒店"
                    },{
                        value : 2,
                        label : "金融"
                    },{
                        value : 3,
                        label : "旅游"
                    }]
                },{
                    label : "业务联系人",
                    keyName : "place",
                    type : 1,
                    isRequired :true,
                    hasTitle : true,
                    titleName : "联系信息"
                },{
                    label : "业务联系手机",
                    keyName : "email",
                    type : 1,
                    isRequired :true
                },{
                    label : "业务联系邮箱",
                    keyName : "guideName",
                    type : 1,
                    isRequired :true
                },{
                    label: "客服联系人",
                    keyName : "phone",
                    type : 1
                },{
                    label : "客服联系手机",
                    keyName : "qq",
                    type : 1
                },{
                    label : "客服联系邮箱",
                    keyName : "MSN",
                    type : 1
                },{
                    label : "结算银行",
                    keyName : "linkPhone",
                    type : 4,
                    isRequired : true,
                    optionList : [],
                    hasTitle : true,
                    titleName : "结算信息",
                },{
                    label : "开户城市",
                    keyName : "address",
                    type : 1,
                    isRequired : true
                },{
                    label : "开户支行",
                    keyName : "companyName",
                    type : 1,
                    isRequired : true
                },{
                    label: "银行开户名",
                    keyName : "phone",
                    type : 1,
                    isRequired : true
                },{
                    label: "银行账号",
                    keyName : "phone",
                    type : 1,
                    isRequired : true
                }
            ],
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
