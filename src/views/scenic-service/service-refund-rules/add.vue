<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}服务商退票规则</p>

            <detail-form1
                :form-datas="formData"
                :form-item-list="formItemList"
                :rule-datas="ruleDatas"
                :is-list-page="false"
                :is-mixed="false"
                @getFormData="getFormData"
            ></detail-form1>

            <Spin size="large" fix v-if="spinShow"></Spin>

        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formData : {},
            formItemList : [
                {
                    label : '服务商',
                    keyName : 'iscenicid',
                    type : 4,
                    isRequired : true,
                    optionList : []
                },{
                    label : '业务类型',
                    keyName : 'ibusinessid',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '游客业务'
                    },
                    {
                        value : 2,
                        labelName : '旅行社业务'
                    },
                    {
                        value : 3,
                        labelName : '接待业务'    
                    }]
                },{
                    label : '退票方式',
                    keyName : 'tptype',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : '1',
                        labelName : '金额'
                    },{
                        value : '2',
                        labelName : '数量'
                    }]
                },{
                    label : '退票条件费率',
                    keyName : 'tptj',
                    type : 1,
                    isRequired : true
                },{
                    label : '退票手续费率',
                    keyName : 'tdfl',
                    type : 1,
                    isRequired : true
                },{
                    label : '使用状态',
                    keyName : 'byisuse',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '启用'
                    },{
                        value : 0,
                        labelName : '禁用'
                    }]
                },{
                    label : '备注',
                    keyName : 'szmemo',
                    type : 7
                }
                
            ],
            ruleDatas : {

            },
            pageName : '',
            formName : '',
            spinShow : true
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.spinShow = false;
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.spinShow = true;
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                iscenicid : '',
                ibusinessid : 2,
                tptype : '1',
                tptj : '',
                tdfl : '',
                byisuse : 1,
                szmemo : ''
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/ticket/esbrefundrules/v1/preformViewrefundRule?access_token='+this.Cookies.get('token')+'&seq='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formData = res.data.data;
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单          
            if(this.pageName == '新增'){
                this.$common.addNewData('/ticket/esbrefundrules/v1/saveRefundRules?flag=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/ticket/esbrefundrules/v1/saveRefundRules?flag=2', this, obj,'post',true)
            }
        },
    },
    mounted () {
        this.setPageName();
    },
    created () {
        //获取服务商列表
        this.$common.getScenicList(this,0,false);
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
