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
                    label : "用户名",
                    keyName : 'userName',
                    type : 9,
                    hasTitle: true,
                    titleName : '基本资料'
                },
                {
                    label : "手机号码",
                    keyName : "phone",
                    type : 9,
                    hasDec : " (可用作登录，请认真填写)(如需修改手机号或邮箱请拨打客服电话：40088-11138)",
                    isRedDec : true
                },{
                    label : "电子邮件",
                    keyName : "email",
                    type : 9
                },{
                    label : "昵称",
                    keyName : "userName",
                    type : 9
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
                    label : "开户人",
                    keyName : "accountHolder",
                    type : 1
                },{
                    label : "开户行",
                    keyName : "accountBank",
                    type : 1
                },{
                    label : "银行账户",
                    keyName : "bankAccount",
                    type : 1
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
                    titleName :'联系信息'
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
            this.pageName = '修改';
            this.formName = "detailForm_edit";
            this.setEditForm();
        },
        setEditForm () {
            //取id调接口
            let currentId = this.$route.params.id;

        },
        showChooseDialog () {

        }
    },
    mounted () {
        
    },
    created () {
        this.setPageName();
    }
}
</script>
