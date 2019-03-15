<template>
    <div>
        <Card>
            <p slot="title">查看票号规则</p>
            
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
            formItemList: [
                {
                    label : "票号规则代码",
                    keyName : "szticketnorulecode"
                },{
                    label : "票号规则名称",
                    keyName : "szticketnorulename"
                },{
                    label : "所属服务商",
                    keyName : 'szscenicname'
                },{
                    label : "票号总长度",
                    keyName : "iticketnolen"
                },{
                    label : "票号前缀长度",
                    keyName : "intons2"
                },{
                    label : "票号前缀",
                    keyName : 'szticketnoprefix'
                },{
                    label : "票代码长度",
                    keyName : 'itickettypecodepos'
                },{
                    label : "流水号位置",
                    keyName : "iserialnopos"
                },{
                    label : "流水号长度",
                    keyName : 'iserialnolen'
                },{
                    label : "票号后缀长度",
                    keyName : 'szticketnosuffix'
                },{
                    label : "票号后缀字符",
                    keyName : 'sztron1'
                },{
                    label : "使用状态",
                    keyName : "byisuse"
                },{
                    label : "计算方式",
                    keyName : 'intons1'
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
            this.$http.get(this.baseUrl+'/ticket/ticketRule/v1/getTicketruleById?access_token='+this.Cookies.get('token')+'&iticketnoruleid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formDatas = res.data.data;
                    this.formDatas.intons1 = this.formDatas.intons1 == 1 ? '十进制' : '三十六进制';
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
