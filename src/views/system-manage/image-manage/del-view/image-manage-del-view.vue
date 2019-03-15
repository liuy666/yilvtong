<style lang="less">
    @import '../../../../styles/common.less';
    @import '../../../../styles/ectrip.less';
</style>

<template>
  <div>
        <Card>
            <p slot="title">{{pageName}}图片信息</p>

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
import viewDelDetail from '../../../main-components/view-del-detail.vue';

export default {
    components : {
        viewDelDetail
    },
    data () {
        return {
            formDatas: {},
            formItemList: [{
                label : "域名编号",
                keyName : "user_num"
            },{
                label : "域名名称",
                keyName : "user_name"
            },{
                label : "对应企业",
                keyName : "user_stuts"
            },{
                label : "状态",
                keyName : "user_contact"
            }], 
            pageName:'',
            isView:false,
            isShow:true
        }
    },
    methods: {
        getThisPage(){
            let nowPage = this.$route;
            if(nowPage.name.indexOf("del")!= -1){
                this.pageName = '删除',
                this.isView = false;
            }else{
                this.pageName = '查看',
                this.isView = true;
            }
        },
        getFormDatas(){
            this.formDatas = this.$route.params.imageData ? JSON.parse(this.$route.params.imageData) : {};
        }
    },
    watch:{
       
    },
    mounted(){
        this.getThisPage();
        this.getFormDatas();
    }
}
</script>