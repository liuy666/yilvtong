<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}设备类型</p>

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
                    label : '设备类型型号',
                    keyName : 'szequiptypemodel',
                    type: 1,
                    isRequired : true
                },
                {
                    label : '设备类型名称',
                    keyName : 'szequiptypename',
                    type : 1,
                    isRequired : true
                },{
                    label : '所属服务商',
                    keyName : 'iscenicid',
                    type : 4,
                    isRequired : true,
                    optionList : []
                },{
                    label : '通讯方式',
                    keyName : 'szcommmode',
                    type : 4,
                    isRequired : true,
                    optionList : []
                },{
                    label : '设备种类',
                    keyName : 'bycategorytype',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '窗口设备'
                    },{
                        value : 1,
                        labelName : '准进设备'
                    }]
                },{
                    label : '使用状态',
                    keyName : 'byisuse',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 0,
                        labelName : '禁用'
                    },{
                        value : 1,
                        labelName : '启用'
                    }]
                },{
                    label : '描述',
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
                szequiptypemodel : '',
                szequiptypename : '',
                iscenicid : '',
                szcommmode : '',
                bycategorytype : 0,
                byisuse : 1,
                szmemo :''
            }
        },
        setEditForm () { 
            this.$http.get(this.baseUrl+'/ticket/esbequiptypetab/v1/viewEsbequitype?access_token='+this.Cookies.get('token')+'&iequiptypeid='+this.$route.params.id)
            .then(res => {
                if(res.data.code == 200){
                    this.formData = res.data.data;
                    this.spinShow = false;
                }
            })
        },
        getFormData(obj){    //提交表单          
            if(this.pageName == '新增'){
                this.$common.addNewData('/ticket/esbequiptypetab/v1/saveEsbequitype?act=1',this,obj,'post',true)
            } else if(this.pageName == '修改'){
                this.$common.editData('/ticket/esbequiptypetab/v1/saveEsbequitype?act=2', this, obj,'post',true)
            }
        },
    },
    mounted () {
        this.setPageName();
    },
    created () {
        //获取景区服务商列表
        this.$common.getScenicList(this,2,false);
        //获取通讯方式列表
        this.$common.getSelectItem(this.baseUrl+'/ticket/esbequiptypetab/v1/getCMSESelect',this,3,'value','value',true);
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
