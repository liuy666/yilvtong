<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}节点参数</p>

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
            formData : JSON.parse(localStorage.getItem('params'))["EctripxmlData"] ? JSON.parse(localStorage.getItem('params'))["EctripxmlData"] : {},
            formItemList : [
                {
                    label : '节点名称',
                    keyName : 'nodeName',
                    type : 9
                },{
                    label : '参数',
                    keyName : 'paramContent',
                    type : 1,
                    isRequired : true
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
