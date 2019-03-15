<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}岗位信息</p>
            
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
                label : "岗位编号",
                keyName : "postNum"
            },{
                label : "岗位代码",
                keyName : "postNum"
            },{
                label : "岗位名称",
                keyName : "postName"
            },{
                label : "岗位类别",
                keyName : "postT"
            },{
                label : "岗位类型",
                keyName : "postType"
            },{
                label : "是否使用",
                keyName : "status"
            },{
                label : "岗位描述",
                keyName : "postDec"
            }], 
            pageName:'',
            isView:false,
            isShow:true
        }
    },
    methods: {
        getThisPage(){
            if(this.$route.name.indexOf("del")!= -1){
                this.pageName = '删除',
                this.isView = false;
            }else{
                this.pageName = '查看',
                this.isView = true;
            }
        },
        getFormDatas(){ 
            this.formDatas = JSON.parse(localStorage.getItem('params'))["postData"] ? JSON.parse(localStorage.getItem('params'))["postData"] : {};
        }
    },
    mounted(){
        this.getThisPage();
        this.getFormDatas();
    },
    watch : {
        '$route' (to) {
            this.getThisPage();
        }
    }
}
</script>
