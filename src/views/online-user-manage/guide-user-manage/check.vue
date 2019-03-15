<template>
    <div>
        <Card>
            <p slot="title">审核团队用户</p>
            
            <view-del-detail
            :formDatas="formDatas"
            :formItemList="formItemList"
            :is-show="isShow"
            ></view-del-detail>
      
        </Card>
  </div>
</template>
<script>
import viewDelDetail from '../../main-components/view-del-detail.vue';
export default {
    components : {
        viewDelDetail
    },
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
                    label : '所属地',
                    keyName : 'place'
                },{
                    label : '电子邮件',
                    keyName : 'email'
                },{
                    label : '姓名',
                    keyName : 'linkMan',
                    hasTitle : true,
                    titleName : '联系信息'
                },{
                    label : '身份证',
                    keyName : 'IdCard'
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
                    label : '企业网址',
                    keyName : 'jsUser'
                },{
                    label : '企业简介',
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
