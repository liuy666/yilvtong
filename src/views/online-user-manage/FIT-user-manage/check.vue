<template>
    <div>
        <Card>
            <p slot="title">查看用户信息</p>
            
            <view-del-detail
            :formDatas="formDatas"
            :formItemList="formItemList"
            :is-view="isView"
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
                }
            ],
            isView:true,
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
