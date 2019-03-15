<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}门票打印参数</p>

            <detail-form
                :form-name="formName"
                :form-datas="formData"
                :form-item-list="formItemList"
                :is-list-page="isListPage"
                :is-mixed="isMixed"
            ></detail-form>

        </Card>
    </div>
</template>
<script>
import detailForm from '../../../main-components/detail-form.vue'
export default {
    components : {
        detailForm
    },
    data () {
        return {
            formData : JSON.parse(localStorage.getItem('params'))["printSetData"] ? JSON.parse(localStorage.getItem('params'))["printSetData"] : {},
            formItemList : [
                {
                    label : '参数',
                    keyName : 'pmky',
                    type : 9
                },{
                    label : '打印编码',
                    keyName : 'printCode',
                    type : 1
                },{
                    label : '打印名称[pmva]',
                    keyName : 'printName',
                    type : 1,
                    isRequired : true
                },{
                    label : '打印内容[pmvb]',
                    keyName : 'content',
                    type : 1
                },{
                    label : '是否启用',
                    keyName : 'status',
                    type : 2,
                    isRequired : true,
                    optionList : [{
                        value : 1,
                        labelName : '启用'
                    },{
                        value : 0,
                        labelName : '停用'
                    }]
                },{
                    label : '内容定义类型[isa]',
                    keyName : 'contentType',
                    type : 2,
                    optionList : [{
                        value : '系统定义',
                        labelName : '系统'
                    },{
                        value : '自定义',
                        labelName : '自定义'
                    }]
                }
                
            ],
            isListPage : false,
            isMixed : false,
            pageName : '',
            formName : ''
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit"
            }
        }
    },
    mounted () {
        this.setPageName();
    },
}
</script>
