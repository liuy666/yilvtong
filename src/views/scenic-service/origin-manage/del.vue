<template>
    <div>
        <Card>
            <p slot="title">查看客源地</p>
            
            <view-del-detail
                :formDatas="formDatas"
                :formItemList="formItemList"
                :label-width="labelWidth"
                :is-view="true"
                :is-show="true"
            ></view-del-detail>
            <loading v-if="spinShow"></loading>
        </Card>
  </div>
</template>
<script>
export default {
    data () {
        return {
            formDatas: {},
            labelWidth : 140,
            formItemList: [{
                label : "客源地代码",
                keyName : "szregionalcode"
            },{
                label : "客源地名称",
                keyName : "szregionalname"
            },{
                label : "上级名称",
                keyName : "szinnername",
                noShow : true
            },{
                label : "层级",
                keyName : "ilevel"
            },{
                label : "是否使用",
                keyName : "byisuse"
            },{
                label : "序号",
                keyName : "ilevelsequence"
            },{
                label : "备注",
                keyName : "szmemo"
            }],
            spinShow : true
        }
    },
    methods: {
        getFormDatas(){ 
            this.$http.get(this.baseUrl+'/sys/sourceRegion/v1/getSourceregionById?access_token='+this.Cookies.get('token')+'&iregionalid='+this.$route.params.id)
            .then(res => { 
                if(res.data && res.status == 200){
                    this.formDatas = res.data;
                    if(this.formDatas.ilevel > 1){
                        this.formItemList[2].noShow = false;
                    }
                    this.formDatas.ilevel = this.formDatas.ilevel + '级';
                    this.formDatas.byisuse = this.formDatas.byisuse == 1 ? '启用' : '禁用';
                    this.spinShow = false;
                }
            })
        }
    },
    mounted(){
        
    },
    created() {
        this.getFormDatas();
    }
}
</script>
