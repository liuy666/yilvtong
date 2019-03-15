<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}业务类型</p>

            <detail-form1
                :form-datas="formData"
                :form-item-list="formItemList"
                :rule-datas="ruleDatas"
                :is-list-page="false"
                :is-mixed="false"
                :label-width="labelWidth"
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
            labelWidth : 180,
            formData : {},
            formItemList : [
                {
                    label : '产品编号',
                    keyName : 'ibusinessid',
                    type: 9,
                    noShow : true
                },
                {
                    label : '业务编码',
                    keyName : 'szbusinesscode',
                    type : 1,
                    isRequired : true
                },{
                    label : '业务名称',
                    keyName : 'szbusinessname',
                    type : 1,
                    isRequired : true
                },{
                    label : '业务种类',
                    keyName : 'businesstype',
                    type : 4,
                    isRequired : true,
                    optionList : []
                },{
                    label : '是否可以前台注册业务',
                    keyName : 'isregister',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '销售方式',
                    keyName : 'bymarketingway',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '独立'
                    },{
                        value : 1,
                        labelName : '共享'
                    }]
                },{
                    label : '拥有签约客户',
                    keyName : 'bywithmember',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '无'
                    },{
                        value : 1,
                        labelName : '个人会员'
                    },{
                        value : 2,
                        labelName : '机构会员'
                    }]
                },{
                    label : '确认签约客户方式',
                    keyName : 'byconfirmemberway',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '不需要'
                    },{
                        value : 1,
                        labelName : '刷卡确认'
                    },{
                        value : 2,
                        labelName : '密码确认'
                    },{
                        value : 3,
                        labelName : '刷卡+密码确认'
                    }]
                },{
                    label : '是否登记客源地',
                    keyName : 'btouristsaddr',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '不登记'
                    },{
                        value : 1,
                        labelName : '登记'
                    }]
                },{
                    label : '是否登记业务员',
                    keyName : 'bregsalesman',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '不登记'
                    },{
                        value : 1,
                        labelName : '登记'
                    }]
                },{
                    label : '是否登记团质',
                    keyName : 'bteamnature',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '不登记'
                    },{
                        value : 1,
                        labelName : '登记'
                    }]
                },{
                    label : '是否自领自卖',
                    keyName : 'bselfcollarselling',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '票规则统一',
                    keyName : 'bticketnounited',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
                    }]
                },{
                    label : '是否启用',
                    keyName : 'byisuse',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '否'
                    },{
                        value : 1,
                        labelName : '是'
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
            if(this.$route.name.indexOf("add") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.spinShow = false;
                this.formItemList[0].noShow = true;
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.spinShow = true;
                this.formItemList[0].noShow = false;
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                szbusinesscode : '',
                szbusinessname : '',
                businesstype : this.formItemList[3].optionList[0].value,
                isregister : 1,
                bymarketingway : 0,
                bywithmember : 0,
                byconfirmemberway : 0,
                btouristsaddr : 0,
                bregsalesman:0,
                bteamnature:0,
                bselfcollarselling:0,
                bticketnounited:1,
                byisuse : 1,
                szmemo:''
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/ticket/business/v1/viewBusiness?access_token='+this.Cookies.get('token')+'&ibusinessid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formData = res.data.data;
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单          
            if(this.pageName == '新增'){
                this.$common.addNewData('/ticket/business/v1/businessSave?flag=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/ticket/business/v1/businessSave?flag=2', this, obj,'post',true)
            }
            
        },
    },
    async created () {
        //获取业务类型列表
        const options = await this.$common.getSelectItem(this.baseUrl+'/ticket/business/v1/businessSelect',this,3,'businesstype','szbusinessname',true);
        this.formItemList[3].optionList = options;
        console.log(this.formItemList[3].optionList);
        this.setPageName();
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
