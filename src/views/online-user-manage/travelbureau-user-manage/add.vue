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
                    label : "内部编号",
                    keyName : "insideNum",
                    type : 1,
                    isRequired : true,
                    hasDec : "(注：输入整数大于0)",
                    isRedDec : true
                },{
                    label : "联系人",
                    keyName : "linkMan",
                    type : 1,
                    hasTitle : true,
                    titleName : "联系信息",
                    isRequired :true
                },{
                    label : "地址",
                    keyName : "address",
                    type : 1,
                    isRequired :true
                },{
                    label: "手机号码",
                    keyName : "phone",
                    type : 1,
                    isRequired :true
                },{
                    label : "联系电话",
                    keyName : "linkPhone",
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
                    label : "企业名称",
                    keyName : "companyName",
                    type : 1,
                    isRequired :true,
                    hasTitle:true,
                    titleName : "企业信息"
                },{
                    label: "旅行社许可证号",
                    keyName : "phone",
                    type : 1,
                    isRequired :true
                },{
                    label : "营业执照号码",
                    keyName : "linkPhone",
                    type : 1,
                    isRequired :true
                },{
                    label: "企业传真",
                    keyName : "phone",
                    type : 1
                },{
                    label : "企业邮编",
                    keyName : "linkPhone",
                    type : 1
                },{
                    label : "企业网址",
                    keyName : "qq",
                    type : 1
                },{
                    label : "企业简介",
                    keyName : "MSN",
                    type : 7
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
            if(this.$route.name.indexOf("new") != -1){ debugger
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.formItemList.unshift({
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
                });
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.formItemList.unshift({
                    label : "用户名",
                    keyName : "userName",
                    type : 9,
                    hasTitle : true,
                    titleName : "基本资料"
                });
                this.setEditForm();
            }
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
                companyName:'',
                
            }
        },
        setEditForm () {
            let currentId = this.$route.params.id;
        },
        showChooseDialog () {

        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        
    },
    watch : {
        '$route' (to,from) {
            //this.setPageName();
            if(from.name=="travel_user_new"){
                this.formItemList.splice(0,2);
            }
            if(from.name=="travel_user_edit"){
                this.formItemList.splice(0,1);
            }
            this.setPageName();
        } 
    }
}
</script>
