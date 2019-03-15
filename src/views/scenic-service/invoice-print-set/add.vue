<style lang="less">
    .aAsOpBtn {
        font-size: 30px;
        font-weight: bold;
        color : #000;
    }
</style>

<template>
    <div>
        <Card>
            <p slot="title">{{pageName}}票务打印管理</p>

            <Form ref="printSetForm" :model="formDatas" :rules="ruleDatas" :label-width="140">
                <FormItem label="服务商" prop="serviceProviders">
                    <Select v-if="isShowSelect"  v-model="formDatas.serviceProviders" style="width:200px"> 
                        <Option v-for="(oneItem,oneIndex) in serviceList" :value="oneItem.value" :key="oneIndex">{{ oneItem.label }}</Option>
                    </Select>
                    <span v-if="!isShowSelect">{{formDatas.serviceProviders}}</span>
                </FormItem>
                <FormItem label="发票打印信息组成" prop="invoicePrintInfo">
                    <Table border ref="printInfoTable" :columns="tableColumns" :data="tableData"  ></Table>
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
            printNumList:[
                {value:1,label:'产品内容'},
                {value:2,label:'顾客名称'},
                {value:3,label:'开票日期'},
                {value:4,label:'金额(大写)'},
                {value:5,label:'金额(小写)'},
                {value:6,label:'行业类别'},
                {value:7,label:'开票单位'},
                {value:8,label:'开票人'},
                {value:9,label:'发票代码'},
                {value:10,label:'发票号码'},
                {value:11,label:'备注'}
            ],
            tableColumns : [
                {
                    title: '打印编号',
                    key: 'printName',
                    align: 'center',
                    render : (h,params) => {
                        return h('Select',{
                            props : {
                                value : this.tableData[params.index].printName
                            },
                            on : {
                                'on-change' : (value) => {
                                    this.tableData[params.index].printName = value
                                }
                            }
                        },
                        this.printNumList.map(function(printNum){
                            return h('Option',{
                                props : {
                                    value : printNum.value
                                }
                            },printNum.label)
                        })
                        );
                    }
                },
                {
                    title: '内容控制',
                    key: 'contentControlType',
                    align: 'center',
                    render : (h,params) => {
                        return h('Select',{
                            props : {
                                value : this.tableData[params.index].contentControlType
                            },
                            on : {
                                'on-change' : (value) => {
                                    this.tableData[params.index].contentControlType = value;
                                }
                            }
                        },[  
                            h('Option',{  
                                props: {  
                                    value: 1  
                                }  
                            },'程序控制'),  
                            h('Option',{  
                                props: {  
                                    value: 2  
                                }  
                            },'系统控制')  
                        ])
                    }
                },
                {
                    title: '内容',
                    key: 'content',
                    align: 'center',
                    render : (h,params) => {
                        return h('Input',{
                            props : {
                                disabled : true,
                                value : this.tableData[params.index].content
                            },
                            style : {
                                width : '200px'
                            },
                            on:{
                                'on-blur':(event) => {
                                    this.tableData[params.index].content = event.target.value;
                                }
                            }
                        })
                    }
                },
                {
                    title: '打印控制',
                    key: 'printWay',
                    align: 'center',
                    render : (h,params) => {
                        return h('Select',{
                            props : {
                                value : this.tableData[params.index].printWay
                            },
                            on : {
                                'on-change' : (value) => {
                                this.tableData[params.index].printWay = value;
                                }
                            }
                        },[  
                            h('Option',{  
                                props: {  
                                    value: 1  
                                }  
                            },'只打印内容'),  
                            h('Option',{  
                                props: {  
                                    value: 2  
                                }  
                            },'标题内容一起打印')  
                        ])
                    }
                },
                {
                    title: '行数',
                    key: 'rowNum',
                    align: 'center',
                    render : (h,params) => {
                        return h('Input',{
                            props : {
                                disabled : true,
                                value : this.tableData[params.index].rowNum
                            },
                            style : {
                                width : '100px'
                            },
                            on:{
                                'on-blur':(event) => {
                                    this.tableData[params.index].rowNum = event.target.value;
                                }
                            }
                        })
                    }
                },
                {
                    title: '排序',
                    key: 'order',
                    align: 'center',
                    render : (h,params) => {
                        return h('Input',{
                            props:{
                                type:'text',
                                value:this.tableData[params.index].order
                            },
                            style : {
                                width : '100px',
                                textAlign : 'center'
                            },
                            on:{
                                'on-blur':(event) => {
                                    params.row.order = event.target.value;
                                    this.tableData[params.index] = params.row;
                                }
                            }
                        });
                    }
                },{
                    title : '操作',
                    key : 'op',
                    align : 'center',
                    width : 100,
                    render : (h,params) => {
                        if(params.row.op == 'hide') return '';
                        if(!params.row.op){
                            return h('a',{
                                class : {
                                    aAsOpBtn : true  
                                },
                                on : {
                                    click : () => {
                                        this.tableData[params.index].op = 'hide';
                                        this.tableData.push({op:true});
                                    }
                                }
                            },'+')
                        }else{
                            return h('div',
                                [
                                    h('a',{
                                        class : {
                                            aAsOpBtn : true  
                                        },
                                        on : {
                                            click : () => {
                                                this.tableData.splice(params.index,1);
                                                this.tableData[params.index-1].op = params.index == 1 ? false : true;
                                            }
                                        }
                                    },'- '),
                                    h('a',{
                                        class : {
                                            aAsOpBtn : true  
                                        },
                                        on : {
                                            click : () => {
                                                this.tableData[params.index].op = 'hide';
                                                this.tableData.push({op:true});
                                            }
                                        }
                                    },' +')
                                ]
                            )
                        }
                    }
                }
            ],
            tableData:[],
            pageName : '',
            isShowSelect : true 
        }
    },
    methods : {
        setPageName () { debugger
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

        },
        getListData () { //获取serviceList和businessList
            //this.isShowSelect = true;
            this.formDatas = {
                serviceProviders : '',
                invoicePrintInfo : ''
            };
            this.tableData = [{}];
            this.serviceList = [{ //暂时写死，新增应该发请求获取serviceList
                label : '服务商1',
                value : 1
            },
            {
                label : '服务商2',
                value : 2
            }];
        },
        getDataByParams () {
            //this.isShowSelect = false;
            this.tableData = [{ //暂时写死，应该从页面传参中获取或者重新请求拿到已有的打印设置
                printName:1,
                contentControlType:1,
                content:'',
                printWay:1,
                rowNum:1,
                order:1
            }]
            this.formDatas = { //暂时写死
                serviceProviders : '服务商1',
                invoicePrintInfo : this.tableData
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
