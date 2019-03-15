<template>
    <div>
        <Card>
            <p slot="title">查看业务类型</p>
            
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
            labelWidth : 160,
            formItemList: [{
                label : "产品编号",
                keyName : "ibusinessid"
            },{
                label : "业务编码",
                keyName : "szbusinesscode"
            },{
                label : "业务名称",
                keyName : "szbusinessname"
            },{
                label : "业务种类",
                keyName : "businesstype"
            },{
                label : "是否可以前台注册业务",
                keyName : "isregister"
            },{
                label : "销售方式",
                keyName : "bymarketingway"
            },{
                label : "拥有签约客户",
                keyName : "bymarketingway"
            },{
                label : "确认签约客户方式",
                keyName : 'byconfirmemberway'
            },{
                label : "是否登记客源地",
                keyName : "btouristsaddr"
            },{
                label : "是否登记业务员",
                keyName : "bregsalesman"
            },{
                label : "是否登记团质",
                keyName : 'bteamnature'
            },{
                label : "是否自领自卖",
                keyName : "bselfcollarselling"
            },{
                label : "票规则统一",
                keyName : "bticketnounited"
            },{
                label : "是否启用",
                keyName : 'byisuse'
            },{
                label : "备注",
                keyName : 'szmemo'
            }],
            spinShow : true
        }
    },
    methods: {
        getFormDatas(){ 
            this.$http.get(this.baseUrl+'/ticket/business/v1/viewBusiness?access_token='+this.Cookies.get('token')+'&ibusinessid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formDatas = res.data.data;
                    this.formDatas.isregister = this.formDatas.isregister == 0 ? '否' : '是';
                    this.formDatas.bymarketingway = this.formDatas.bymarketingway == 0 ? '独立' : '共享';
                    this.formDatas.bywithmember = this.formDatas.bywithmember == 0 ? '无' : this.formDatas.bywithmember == 1 ? '个人会员' : '机构会员';
                    this.formDatas.byconfirmemberway = this.formDatas.byconfirmemberway == 0 ? '不需要' : this.formDatas.byconfirmemberway == 1 ? '刷卡确认' : this.formDatas.byconfirmemberway == 2 ?'密码确认' : '刷卡+密码确认';
                    this.formDatas.btouristsaddr = this.formDatas.btouristsaddr == 0 ? '不登记' : '登记';
                    this.formDatas.bregsalesman = this.formDatas.bregsalesman == 0 ? '不登记' : '登记';
                    this.formDatas.bteamnature = this.formDatas.bteamnature == 0 ? '不登记' : '登记';
                    this.formDatas.bselfcollarselling = this.formDatas.bselfcollarselling == 0 ? '否' : '是';
                    this.formDatas.bticketnounited = this.formDatas.bticketnounited == 0 ? '否' : '是';
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
