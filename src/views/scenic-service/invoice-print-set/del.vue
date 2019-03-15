<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}打印发票设置</p>
            
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
            formItemList: [{
                label : "服务商",
                keyName : "serviceProviders"
            },{
                label : "打印编号",
                keyName : "printNum"
            },{
                label : "内容控制类型",
                keyName : "contentControlType"
            },{
                label : "内容",
                keyName : "content"
            },{
                label : "打印方式",
                keyName : "printWay"
            },{
                label : "行数",
                keyName : "rowNum"
            },{
                label : "排序号",
                keyName : "order"
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
            this.formDatas = JSON.parse(localStorage.getItem('params'))["invoicePrintData"] ? JSON.parse(localStorage.getItem('params'))["invoicePrintData"] : {};
            this.formDatas.contentControlType = this.formDatas.contentControlType == 1 ? '程序控制' : '系统控制';
            this.formDatas.printWay = this.formDatas.printWay == 1 ? '只打印内容' : '标题内容一起打印';
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
