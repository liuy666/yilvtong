<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}菜单</p>
            
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
                    label : '角色ID',
                    keyName : 'roleId'
                },{
                    label : '角色名称',
                    keyName : 'roleName'
                },{
                    label : '角色备注',
                    keyName : 'roleDec'
                }
            ], 
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
            this.formDatas = JSON.parse(localStorage.getItem('params'))["userCenterRole"] ? JSON.parse(localStorage.getItem('params'))["userCenterRole"] : {};
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
