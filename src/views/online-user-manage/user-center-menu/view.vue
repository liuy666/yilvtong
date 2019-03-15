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
                    label : '菜单名称',
                    keyName : 'menuName'
                },{
                    label : '菜单链接',
                    keyName : 'menuLink'
                },{
                    label : '菜单状态',
                    keyName : 'menuStatus'
                },{
                    label : '所属角色',
                    keyName : 'role',
                    showElement : true,
                    optionList : [{
                        value : 1,
                        labelName : '操作员'
                    },{
                        value : 2,
                        labelName : '导游'
                    },{
                        value : 3,
                        labelName : '分社'
                    },{
                        value : 4,
                        labelName : '散客'
                    },{
                        value : 5,
                        labelName : '总社'
                    },{
                        value : 6,
                        labelName : '接待'
                    },{
                        value : 7,
                        labelName : '分销商'
                    }]
                },{
                    label : '备注',
                    keyName : 'dec'
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
            this.formDatas = JSON.parse(localStorage.getItem('params'))["userCenterMenu"] ? JSON.parse(localStorage.getItem('params'))["userCenterMenu"] : {};
            this.formDatas.menuStatus = this.formDatas.menuStatus == 1 ? '启用' : '禁用';
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
