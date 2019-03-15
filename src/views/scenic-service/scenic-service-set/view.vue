<template>
    <div>
        <Card>
            <p slot="title">查看服务商</p>
            
            <view-del-detail
                :formDatas="formDatas"
                :formItemList="formItemList"
                :is-view="true"
                :is-show="true"
                :show-two-col="true"
                :title-list="titleList"
                :label-width="labelWidth"
            ></view-del-detail>

            <Spin size="large" fix v-if="spinShow"></Spin>
      
        </Card>
  </div>
</template>
<script>
export default {
    data () {
        return {
            labelWidth:200,
            formDatas: {},
            formItemList: [{
                label : "服务商编号",
                keyName : "iscenicid",
                divIndex : 0
            },{
                label : "服务商代码",
                keyName : "szsceniccode",
                divIndex : 0
            },{
                label : "服务商名称",
                keyName : "szscenicname",
                divIndex : 0
            },{
                label : "服务商类别",
                keyName : "strpdtyp",
                divIndex : 0
            },{
                label : "服务商等级",
                keyName : "strgrade",
                divIndex : 0
            },{
                label : "所属地区",
                keyName : "strregion",
                divIndex : 0
            },{
                label : "推荐次序",
                keyName : "iordernumber",
                divIndex : 0
            },{
                label : "联系人",
                keyName : 'szcontact',
                divIndex : 0
            },{
                label : "联系电话",
                keyName : 'szphone',
                divIndex : 0
            },{
                label : "详细地址",
                keyName : 'szaddress',
                divIndex : 0
            },{
                label : "网址",
                keyName : 'sznetaddr',
                divIndex : 0
            },{
                label : "全景网址",
                keyName : 'szqjaddr',
                divIndex : 0
            },{
                label : "交通位置描述",
                keyName : 'szlocation',
                divIndex : 0
            },{
                label : "当天预订截止时间",
                keyName : 'szlasttime',
                divIndex : 0
            },{
                label : "是否启用",
                keyName : 'byisuse',
                divIndex : 0
            },{
                label : "最多提前预订天数",
                keyName : 'imaxdata',
                divIndex : 0
            },{
                label : "景区浏览时数",
                keyName : 'szdata',
                divIndex : 0
            },{
                label : "地图位置",
                keyName : 'longitude',
                divIndex : 0
            },{
                label : "是否允许强制退订",
                keyName : 'iscanreturn',
                divIndex : 0
            },{
                label : "过了消费日期是否允许修改",
                keyName : 'icanmodify',
                divIndex : 0
            },{
                label : "预订说明",
                keyName : 'strbookdescription',
                divIndex : 0
            },{
                label : "简介",
                keyName : 'szsimpleintroduction',
                divIndex : 0,
                class : 'one-row-class'
            },{
                label : "详细介绍",
                keyName : 'note',
                divIndex : 0,
                class : 'one-row-class'
            },{
                label : "企业名称",
                keyName : 'companyName',
                divIndex : 1
            },{
                label : "企业网站",
                keyName : 'website',
                divIndex : 1
            },{
                label : "企业地址",
                keyName : 'address',
                divIndex : 1
            },{
                label : "工商注册号",
                keyName : 'registrationNumber',
                divIndex : 1
            },{
                label : "组织结构代码",
                keyName : 'organizationCode',
                divIndex : 1
            },{
                label : "法人",
                keyName : 'corporate',
                divIndex : 1
            },{
                label : "法人身份证",
                keyName : 'corporateIdentity',
                divIndex : 1
            },{
                label : "业务联系人",
                keyName : 'businessContact',
                divIndex : 2
            },{
                label : "客服联系人",
                keyName : 'customerContact',
                divIndex : 2
            },{
                label : "业务联系手机",
                keyName : 'businessTel',
                divIndex : 2
            },{
                label : "客服联系手机",
                keyName : 'customerTel',
                divIndex : 2
            },{
                label : "业务联系邮箱",
                keyName : 'businessContactEmail',
                divIndex : 2
            },{
                label : "客服联系邮箱",
                keyName : 'customerContactEmail',
                divIndex : 2
            },{
                label : "结算系统商户编号",
                keyName : 'hqytId',
                divIndex : 3
            },{
                label : "结算系统商户账号",
                keyName : 'applicationName',
                divIndex : 3
            },{
                label : "合约起始时间",
                keyName : 'contractStartTime',
                divIndex : 3
            },{
                label : "合约结束时间",
                keyName : 'contractEndTime',
                divIndex : 3
            },{
                label : "结算银行",
                keyName : 'bankId',
                divIndex : 3
            },{
                label : "开户城市",
                keyName : 'city',
                divIndex : 3
            },{
                label : "开户支行",
                keyName : 'subbranch',
                divIndex : 3
            },{
                label : "银行开户名",
                keyName : 'settleBankAccountName',
                divIndex : 3
            },{
                label : "银行账号",
                keyName : 'settleBankAccount',
                divIndex : 3
            },{
                label : "结算周期",
                keyName : 'settlementDays',
                divIndex : 3
            },{
                label : "结算费率",
                keyName : 'settlementRate',
                divIndex : 3
            },{
                label : "状态",
                keyName : 'status',
                divIndex : 3
            }],
            spinShow : true,
            titleList : [{
                titleName : '服务商信息'
            },{
                titleName : '企业信息'
            },{
                titleName : '联系信息'
            },{
                titleName : '结算信息'
            }]
        }
    },
    methods: {
        getFormDatas(){ 
            let _this = this;
            this.$http.get(this.baseUrl+'/ticket/provider/provider/query?access_token='+this.Cookies.get('token')+'&scenicId='+this.$route.params.id)
            .then(res => {
                this.formDatas = res.data;
                this.formDatas.iscanreturn = this.formDatas.iscanreturn == 1 ? '是' : '否';
                this.formDatas.icanmodify = this.formDatas.icanmodify == '1' ? '是' : '否';
                this.formDatas.byisuse = this.formDatas.byisuse == 1 ? '启用' : '禁用';
                this.spinShow = false;
            })
            .catch(function (response) { debugger
                _this.$Modal.error({
                    title: '温馨提示',
                    content: '请求失败'
                })
                _this.spinShow = false;
            });
        }
    },
    mounted(){
        
    },
    created() {
        this.getFormDatas();
    }
}
</script>
