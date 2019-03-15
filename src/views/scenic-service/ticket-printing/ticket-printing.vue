<style lang="less">
    @import '../../../styles/common_style.less';
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <p>票务打印管理</p>
                <div class="op-button-area">
                    <Button type="ghost" shape="circle" icon="refresh" @click="handleSubmit('formDatas')" >刷新</Button>
                    <Button type="ghost" shape="circle" icon="plus" @click="goToPage('add_business_type',true)" >新增</Button>
                    <Button type="ghost" shape="circle" icon="edit" @click="goToPage('edit_business_type',false)">修改</Button>
                </div>
            </div>
            <Form ref="formDatas" :model="formDatas" inline >
                <FormItem label="服务商" :label-width="60" prop="service">
                    <Select v-model="formDatas.service" class="form-option-select" >
                        <Option value="1">服务商1</Option>
                        <Option value="2">服务商1</Option>
                        <Option value="3">服务商1</Option>
                        <Option value="4">服务商1</Option>
                    </Select>
                    <span class="message-title-red">*</span> 
                </FormItem>

                <FormItem label="业务" :label-width="60" prop="service">
                    <Select v-model="formDatas.service" class="form-option-select" >
                        <Option value="1">服务商1</Option>
                        <Option value="2">服务商1</Option>
                        <Option value="3">服务商1</Option>
                        <Option value="4">服务商1</Option>
                    </Select>
                    <span class="message-title-red">*</span> 
                </FormItem>

                <FormItem label="" :label-width="30">
                    <Button type="primary" shape="circle" @click="handleSubmit('formDatas')" class="op-btns searchbtn">查询</Button>
                    <Button type="ghost" shape="circle" @click="handleReset('formDatas')" class="op-btns resetbtn">重置</Button>
                </FormItem>
            </Form>

            <Table :data="tableDatas" :columns="tableColumns" :size="tableSize"  stripe border highlight-row  @on-current-change="getChooseData"></Table>
        
            <div class="page-num-area">
                <div style="float: right;">
                    <Page :total="totalNum" :current="1" @on-change="changePage" show-sizer show-total></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
import commonMethod from '@/libs/common.js';
export default {
    name : 'business-type',
    data () {
        return {
            formDatas : {
                businessName : ''
            },
            currentRowData : {},
            tableColumns : [{
                'title' : '编号',
                'key' : 'num',
                'align' : 'center',
                'width' : 70,
                'render' : (h,params) => {
                    return h('radio',{
                        ref : 'myRadio'
                    })
                }
            },{
                'title' : '编码',
                'key' : 'code',
                'align' : 'center'
            },{
                'title' : '名称',
                'key' : 'code',
                'align' : 'center'
            },{
                'title' : '业务种类',
                'key' : 'code',
                'align' : 'center'
            },{
                'title' : '是否可以前台注册业务',
                'key' : 'code',
                'align' : 'center',
                'render' : (h,params) => {
                    let row = params.row;
                    let text = row.isCanRegister == 1 ? '是' : row.isCanRegister == 0 ? '否' : '';
                    return text;
                }
            },{
                'title' : '销售方式',
                'key' : 'code',
                'align' : 'center'
            },{
                'title' : '签约客户',
                'key' : 'code',
                'align' : 'center'
            },{
                'title' : '是否有效',
                'key' : 'isEffective',
                'align' : 'center',
                'render' : (h,params) => {
                    let row = params.row;
                    let text = row.isEffective == 1 ? '启用' : row.isEffective == 0 ? '禁用' : '';
                    return text;
                }
            }],
            tableDatas : [{'num':true},{},{}],
            tableSize : 'small',
            totalNum : 100
        }
    },
    methods : {
        goToPage (name,isAdd) {
            if(Object.keys(this.currentRowData).length > 0 || isAdd){
                let argu = {"currentData" : this.currentRowData };
                commonMethod.goPage.call(this,name,argu,isAdd);
            }else{
                this.$Message.error("请选择一条记录");
            }
        },
        handleSubmit (name) {

        },
        handleReset (name) {

        },
        getChooseData (currentRow,oldCurrentRow){ 
            this.currentRowData = currentRow;
        },
        changePage () {

        }
    }
}
</script>
