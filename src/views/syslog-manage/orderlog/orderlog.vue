<style>
    @import '../../../styles/common_style.less';
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <p>订单操作日志查询</p>
                <div class="op-button-area">
                    <Button type="ghost" shape="circle" icon="refresh" @click="handleSubmit('formDatas')" >刷新</Button>
                    <Button type="ghost" shape="circle" icon="search" @click="goView" >查看</Button>
                </div>
            </div>
            
            <Form ref="formDatas" :model="formDatas"  inline>
                <FormItem>
                    <RadioGroup v-model="formDatas.flag" style="width:100%" >
                        <div class="one-row">
                            <Radio label="0">全部用户</Radio>
                            <div class="date-choose-area" >
                                <span>日期选择： </span>
                                <DatePicker type="date" placeholder="Select date" v-model="formDatas.startDate" :options="datePickerOptionS"></DatePicker>
                                <span> 至 </span>
                                <DatePicker type="date" placeholder="Select date" v-model="formDatas.endDate" :options="datePickerOptionE"></DatePicker>
                            </div>
                            
                        </div>
                        <div class="one-row">
                            <Radio label="1">按下单用户</Radio>
                            <Select  style="width:150px;" >
                                <Option value="11">1</Option>
                                <Option value="22">1</Option>
                            </Select>
                            <div class="date-choose-area" >
                                <span> 日期选择： </span>
                                <DatePicker type="date" placeholder="Select date" v-model="formDatas.startDate" :options="datePickerOptionS" ></DatePicker>
                                <span> 至 </span>
                                <DatePicker type="date" placeholder="Select date" v-model="formDatas.endDate" :options="datePickerOptionE" ></DatePicker>
                            </div>
                        </div>
                    </RadioGroup>
                </FormItem>
                <FormItem style="margin-top:50px;margin-left:30px;">
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
                flag : '1',
                isEffective : 11,
                startDate : '',
                endDate : ''
            },
            datePickerOptionS : {
                disabledDate (date) { 
                    
                }
            },
            datePickerOptionE : {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
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
            tableDatas : [{"num" : 1 },{},{},{}],
            tableSize : "small",
            totalNum : 100 
        }
    },
    methods : {
        //跳转至查看页
        goView () { 
            if(Object.keys(this.currentRowData).length > 0){
                let argu = {"currentData" : this.currentRowData };
                this.$router.push({
                    name: 'view_orderlog',
                    params: argu
                })
            }else{
                this.$Message.error('请选择一条数据信息');
            }
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
    }
}
</script>
