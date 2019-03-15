<template>
    <div>
        <Card>
            <p slot="title">查看黑名单用户信息</p>
            
            <view-del-detail
            :formDatas="formDatas"
            :formItemList="formItemList"
            :is-show="isShow"
            ></view-del-detail>
      
        </Card>
  </div>
</template>
<script>
export default {
    data () {
        return {
            formDatas: {},
            formItemList : [
                {
                    label : '用户编号',
                    keyName : 'userNum',
                    hasTitle : true,
                    titleName : '基本资料'
                },{
                    label : '用户状态',
                    keyName : 'userStatus'
                },{
                    label : '用户注册类型',
                    keyName : 'userRegisterType'
                },{
                    label : '团队用户类别',
                    keyName : 'teamUserType'
                },{
                    label : '是否主用户',
                    keyName : 'isCenterUser'
                },{
                    label : '导游证号',
                    keyName : 'guideCard'
                },{
                    label : '身份证号',
                    keyName : 'IdCard'
                },{
                    label : '业务类型',
                    keyName : 'businessType'
                },{
                    label : '所属地',
                    keyName : 'place'
                },{
                    label : '电子邮件',
                    keyName : 'email'
                },{
                    label : '联系人',
                    keyName : 'linkMan',
                    hasTitle : true,
                    titleName : '联系信息'
                },{
                    label : '地址',
                    keyName : 'address'
                },{
                    label : '手机号码',
                    keyName : 'phone'
                },{
                    label : '联系号码',
                    keyName : 'phone'
                },{
                    label : '身份证',
                    keyName : 'IdCard'
                },{
                    label : 'QQ',
                    keyName : 'QQ'
                },{
                    label : 'MSN',
                    keyName : 'MSN'
                },{
                    label : '企业名称',
                    keyName : 'companyName',
                    hasTitle : true,
                    titleName : '企业信息'
                },{
                    label : '旅行社许可证号',
                    keyName : 'jsUser'
                },{
                    label : '营业执照号码',
                    keyName : 'jsUser'
                },{
                    label : '企业传真',
                    keyName : 'jsUser'
                },{
                    label : '企业邮编',
                    keyName : 'jsUser'
                },{
                    label : '企业网址',
                    keyName : 'jsUser'
                },{
                    label : '企业简介',
                    keyName : 'jsUser'
                },{
                    label : '结算系统用户编号',
                    keyName : 'jsUserNum',
                    hasTitle : true,
                    titleName : '结算信息'
                },{
                    label : '结算系统用户账号',
                    keyName : 'jsUser'
                }
            ],
            isShow:true
        }
    },
    methods: {
        getFormDatas(){ 
            let currentId = this.$route.params.id;
        }
    },
    created(){
        this.getFormDatas();
    }
}
</script>
