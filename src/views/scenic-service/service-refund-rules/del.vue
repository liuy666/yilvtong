<template>
    <div>
        <Card>
            <p slot="title">查看服务商退票规则</p>
            
            <view-del-detail
                :formDatas="formDatas"
                :formItemList="formItemList"
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
            formItemList: [
            {
                label : "编号",
                keyName : "seq"
            },{
                label : "服务商名称",
                keyName : "szscenicname"
            },{
                label : "业务类型",
                keyName : "ibusinessid"
            },{
                label : "退票方式",
                keyName : "tptype"
            },{
                label : "退票条件费率",
                keyName : "tptj"
            },{
                label : "退票手续费率",
                keyName : "tdfl"
            },{
                label : "使用状态",
                keyName : "byisuse"
            },{
                label : "备注",
                keyName : 'szmemo'
            }],
            spinShow : true
        }
    },
    methods: {
        getFormDatas(){ 
            this.$http.get(this.baseUrl+'/ticket/esbrefundrules/v1/preformViewrefundRule?access_token='+this.Cookies.get('token')+'&seq='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formDatas = res.data.data;
                    this.formDatas.ibusinessid = this.formDatas.ibusinessid == 1 ? '游客业务' : this.formDatas.ibusinessid == 2 ? '旅行社业务' : '接待业务';
                    this.formDatas.tptype = this.formDatas.tptype == '1' ? '金额' : '数量';
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
