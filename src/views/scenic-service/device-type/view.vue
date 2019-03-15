<template>
    <div>
        <Card>
            <p slot="title">查看设备类型信息</p>
            
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
                    label : "服务商名称",
                    keyName : "szscenicname"
                },{
                    label : "设备类型型号",
                    keyName : "szequiptypemodel"
                },{
                    label : "设备类型名称",
                    keyName : 'szequiptypename'
                },{
                    label : "通讯方式",
                    keyName : "szcommmode"
                },{
                    label : "设备种类",
                    keyName : "bycategorytype"
                },{
                    label : "是否使用",
                    keyName : 'byisuse'
                },{
                    label : "描述",
                    keyName : 'szmemo'
                }
            ],
            spinShow : true
        }
    },
    methods: {
        getFormDatas(){ 
            this.$http.get(this.baseUrl+'/ticket/esbequiptypetab/v1/viewEsbequitype?access_token='+this.Cookies.get('token')+'&iequiptypeid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formDatas = res.data.data;
                    this.formDatas.bycategorytype = this.formDatas.bycategorytype == 0 ? '窗口设备' : '准进设备';
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
