<style>
    @import '../../../styles/common_style.less';
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <p>后台日志查询</p>
                <div class="op-button-area">
                    <Button type="ghost" shape="circle" icon="refresh" @click="handleSubmit('formDatas')" >刷新</Button>
                    <Button type="ghost" shape="circle" icon="search" @click="goView" >查看</Button>
                </div>
            </div>
            
            <Form ref="formDatas" :model="formDatas"  inline>
                <FormItem>
                    <RadioGroup v-model="formDatas.flag">
                        <Radio label="0">按用户名称</Radio>
                        <Select v-model="formDatas.userName" style="width:150px;" >
                            <Option value="1">张三</Option>
                            <Option value="2">李四</Option>
                            <Option value="3">王二</Option>
                            <Option value="4">麻子</Option>
                            <!-- <Option v-for="item in userNameList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                        </Select>
                        <Radio label="1" style="margin-left:40px;">按操作功能</Radio>
                        <Select v-model="formDatas.opFunction" style="width:150px;" >
                            <Option value="11">审核评论</Option>
                            <Option value="22">新增</Option>
                            <Option value="33">修改</Option>
                            <Option value="44">删除</Option>
                            <!-- <Option v-for="item in opFunctionList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                        </Select>
                    </RadioGroup>
                </FormItem>
                
                <FormItem label="" :label-width="30">
                    <Button type="primary" shape="circle" @click="handleSubmit('formDatas')" class="op-btns searchbtn" >查询</Button>
                    <Button type="ghost" shape="circle" @click="handleReset('formDatas')" class="op-btns resetbtn" >重置</Button>
                </FormItem>
            </Form>

            <Table :data="tableDatas" :columns="tableColumns" :size="tableSize"  stripe border highlight-row @on-current-change="getChooseData"></Table>

            <div class="page-num-area">
                <div style="float: right;">
                    <Page :total="totalNum" :current="1" @on-change="changePage" show-sizer show-total></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
export default {
    name : 'orderlog',
    data () {
        return {
            formDatas : {
                flag : '0',
                userName : '',
                opFunction : ''
            },
            userNameList : [],
            opFunctionList : [],
            currentRowData : {},
            tableColumns : [{
                    'title' : '编号',
                    'key' : 'num',
                    'align' : 'center'
                },{
                    'title' : '用户姓名',
                    'key' : 'userName',
                    'align' : 'center'
                },{
                    'title' : '功能号',
                    'key' : 'functionNum',
                    'align' : 'center'
                },{
                    'title' : '操作概要',
                    'key' : 'opSummary',
                    'align' : 'center'
                },{
                    'title' : '操作日期',
                    'key' : 'opDate',
                    'align' : 'center'
                }],
            tableDatas : [{'num':1},{},{}],
            tableSize : 'small',
            totalNum : 100
        }
    },
    methods : {
        //跳转至查看页
        goView () {
            if(Object.keys(this.currentRowData).length > 0){
                let argu = {"currentData" : this.currentRowData };
                this.$router.push({
                    name: 'view_backstagelog',
                    params: argu
                })
            }else{
                this.$Message.error('请选择一条数据信息');
            }
        },
        //请求查询条件的List数据
        getListData () {
            // ```
            // this.userNameList = ...;
            // this.opFuntionList = ...;  
        },
        //查询
        handleSubmit () {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //获取表单数据
                    var formData = JSON.stringify(this.formDatas);

                    //发送请求
                    /*this.$http.post('tableData.json',forData).then((response) => { debugger
                        //请求成功的处理
                        //返回结果 -> 表格数据 + 分页信息
                    },(response) => {
                        //请求失败的处理
                    })*/
                    
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        //重置
        handleReset () {
            this.$refs[name].resetFields();
        },
        //获取查询结果  调用一个自定义方法来请求数据并处理数据   在点击查询时调用方法， 在换页时调用方法
        getTableData () {

        },
        //获取表格所选行的数据
        getChooseData (currentRow,oldCurrentRow) {
            this.currentRowData = currentRow;
        },
        //换页
        changePage () { 
            //this.tableDatas = this.getTableData();
            this.tableDatas = [{},{},{},{}]
        }
    },
    mounted () {
        this.getListData();
    }
}
</script>
