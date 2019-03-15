<template>
    <div>
        <Card>
            <p slot="title">查看黑名单用户信息</p>
            
            <view-del-detail
            :formDatas="formDatas"
            :formItemList="formItemList"
            :is-show="true"
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
                    label : '用户名称',
                    keyName : 'userName'
                },{
                    label : '加入黑名单理由',
                    keyName : 'reason'
                }
            ]
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
