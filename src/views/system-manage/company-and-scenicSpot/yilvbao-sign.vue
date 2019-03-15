<style lang="less">

</style>
<template>
    <div>
        <Card>
            <p slot="title">景区属性</p>

            <view-del-detail
                :form-datas="formDatas"
                :form-item-list="formItemList1"
                :is-view="isView"
                :is-show="isShow"
            ></view-del-detail>

            <detail-form
                :form-datas="formDatas"
                :form-item-list="formItemList2"
                :is-list-page="isListPage"
                :is-mixed="isMixed"
            ></detail-form>
            
      
        </Card>
    </div>
</template>
<script>
import viewDelDetail from '../../main-components/view-del-detail.vue';
import detailForm from '../../main-components/detail-form.vue';
export default {
    components: {
        viewDelDetail,
        detailForm
    },
    data (){
        return {
            formDatas : JSON.parse(localStorage.getItem("params"))["signData"] ? JSON.parse(localStorage.getItem("params"))["signData"] : {},
            formItemList1 : [{
                label : "企业名称",
                keyName : "companyName"
            },{
                label : "景区名称",
                keyName : "scenicName"
            }],
            formItemList2 : [{
                label : "易旅宝标识",
                keyName : 'sign',
                type : 2,
                optionList : [{
                    value : 1,
                    labelName : "是"
                },{
                    value : 0,
                    labelName : "否"
                }]
            }],
            isView : true,
            isShow : false,
            isListPage : false,
            isMixed : false,
            
        }
    },
    methods : {
        getForm () { 
            this.formDatas = JSON.parse(localStorage.getItem("params"))["signData"];
        }
    },
    mounted() {

    }
}
</script>

