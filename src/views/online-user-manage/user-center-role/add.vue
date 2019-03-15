<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}菜单</p>

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
import detailForm from '../../main-components/detail-form.vue'
export default {
    components : {
        detailForm
    },
    data () {
        return {
            formData : {},
            formItemList : [
                {
                    label : '角色名称',
                    keyName : 'roleName',
                    type : 1,
                    isRequired : true
                },{
                    label : '角色备注',
                    keyName : 'roleDec',
                    type : 7
                }
                
            ],
            isListPage : false,
            isMixed : false,
            pageName : '',
            formName : ''
        }
    },
    computed : {
        
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.formName = "detailForm_new";
                this.setAddForm();
            }else{
                this.pageName = '修改';
                this.formName = "detailForm_edit";
                this.setEditForm();
            }
        },
        setAddForm () {
            this.formData = {
                roleName : '',
                roleDec : ''
            }
        },
        setEditForm () {
            //修改 从页面传参中取数据 暂时写死
            this.formData = JSON.parse(localStorage.getItem('params'))["userCenterRole"];
        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        } 
    }
}
</script>
