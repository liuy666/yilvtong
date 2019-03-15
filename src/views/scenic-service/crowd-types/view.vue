<template>
    <div>
        <Card>
            <p slot="title">查看人群种类</p>
            
            <view-del-detail
                :formDatas="formDatas"
                :formItemList="formItemList"
                :label-width="labelWidth"
                :is-view="true"
                :is-show="true"
            ></view-del-detail>

            <Spin size="large" fix v-if="spinShow"></Spin>
      
        </Card>
  </div>
</template>
<script>
export default {
    data () {
        return {
            formDatas: {},
            labelWidth : 140,
            formItemList: [
                {
                    label : "产品编号",
                    keyName : "icrowdkindid"
                },{
                    label : "人群种类编码",
                    keyName : 'szcrowdkindcode'
                },{
                    label : "人群种类名称",
                    keyName : "szcrowdkindname"
                },{
                    label : "是否启用",
                    keyName : "byisuse"
                },{
                    label : "层级",
                    keyName : 'ilevel'
                },{
                    label : "序号",
                    keyName : 'ilevelsequence'
                },{
                    label : "备注",
                    keyName : 'szmemo'
                }
            ],
            spinShow : true
        }
    },
    methods: {
        getFormDatas(){ 
            this.$http.get(this.baseUrl+'/ticket/crowdKind/v1/getCrowdKindInfo?access_token='+this.Cookies.get('token')+'&icrowdkindid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formDatas = res.data.data;
                    this.formDatas.ilevel = this.formDatas.ilevel + '层';
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
