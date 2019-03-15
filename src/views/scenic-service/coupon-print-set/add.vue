<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}副券打印管理</p>

            <Form ref="printSetForm" :model="formDatas" :rules="ruleDatas" :label-width="140">
                <FormItem label="服务商" prop="serviceProviders">
                    <Select v-if="isShowSelect"  v-model="formDatas.serviceProviders" style="width:200px"> 
                        <Option v-for="(oneItem,oneIndex) in serviceList" :value="oneItem.value" :key="oneIndex">{{ oneItem.label }}</Option>
                    </Select>
                    <span v-if="!isShowSelect">{{formDatas.serviceProviders}}</span>
                </FormItem>
                <FormItem label="业务" prop="business">
                    <Select v-if="isShowSelect" v-model="formDatas.business" style="width:200px"> 
                        <Option v-for="(oneItem,oneIndex) in businessList" :value="oneItem.value" :key="oneIndex">{{ oneItem.label }}</Option>
                    </Select>
                    <span v-if="!isShowSelect">{{formDatas.business}}</span>
                </FormItem>
                <FormItem label="打印编码组成" prop="printCodes">
                    <Table border ref="selection" :columns="tableColumns" :data="tableData"  @on-selection-change="getChooseData"  ></Table>
                </FormItem>

                <FormItem>
                    <Button type="primary"  @click="handleSubmit('printSetForm')" class="op-btns searchbtn">保存</Button>
                    <Button type="ghost"  @click="handleReset('printSetForm')" class="op-btns resetbtn">重置</Button>
                    <Button type="ghost"  @click="closePage" class="op-btns closebtn" >关闭</Button>
                </FormItem>
            </Form>

        </Card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            ruleDatas:{},
            formDatas:{},
            serviceList:[],
            businessList:[],
            tableColumns : [{
                type: 'selection',
                width: 100,
                align: 'center'
            },{
                title: '打印名称',
                key: 'printName',
                align: 'center'
            },
            {
                title: '顺序',
                key: 'order',
                align: 'center',
                render : (h,params) => {
                    return h('Input',{
                        props:{
                            type:'text',
                            value:this.tableData[params.index].order
                        },
                        style : {
                            width : '200px',
                            textAlign : 'center'
                        },
                        on:{
                            'on-blur':(event) => {
                                params.row.order = event.target.value;
                                this.tableData[params.index] = params.row;
                            }
                        },
                    });
                }
            },],
            tableData:[{
                printName : '票种',
                order : ''
            },{
                printName : '人群',
                order : ''
            },{}],
            pageName : '',
            isShowSelect : true 
        }
    },
    methods : {
        setPageName () {
            if(this.$route.name.indexOf("new") != -1){
                this.pageName = '新增';
                this.isShowSelect = true;
                this.getListData();
            }else{
                this.pageName = '修改';
                this.isShowSelect = false;
                this.getDataByParams();
            }
        },
        handleSubmit ()  {

        },
        handleReset () {

        },
        closePage () {

        },
        getChooseData (selection) { debugger
            this.formDatas.printCodes = selection;
        },
        getListData () { //获取serviceList和businessList
            //this.isShowSelect = true;
            this.formDatas = {
                serviceProviders : '',
                business : '',
                printCodes : ''
            };
            this.serviceList = [{
                label : '服务商1',
                value : 1
            },
            {
                label : '服务商2',
                value : 2
            }];
            this.businessList = [{
                label : '业务1',
                value : 1
            },
            {
                label : '业务2',
                value : 2
            }]
        },
        getDataByParams () {
            //this.isShowSelect = false;
            this.formDatas = {
                serviceProviders : '服务商1',
                business : '业务1',
                printCodes : ''
            }
        }
    },
    mounted () {
        this.setPageName();
    },
    created () {
        //新增 获取serviceList和businessList 
        //修改 从页面传参里面取当前service和business
        //新增和修改 都要获取tableData

        
        
    },
    watch : {
        '$route' (to) {
            this.setPageName();
        }
    }
}
</script>
