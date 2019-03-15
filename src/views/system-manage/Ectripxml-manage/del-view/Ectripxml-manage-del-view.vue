<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}节点</p>
            
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
                label : "节点名称",
                keyName : "nodeName"
            },{
                label : "参数",
                keyName : "paramContent"
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
            this.formDatas = JSON.parse(localStorage.getItem('params'))["EctripxmlData"] ? JSON.parse(localStorage.getItem('params'))["EctripxmlData"] : {};
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
