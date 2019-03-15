<style lang="less">
    @import "../../../styles/common_style.less";
    .chooseBtn{
        position: absolute;
        right: 0;
        top: 1px;
        padding: 0 10px;
        border-radius: 0 4px 4px 0;
        background: #2d8cf0;
        color: #fff;
        cursor: pointer;
    }
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <p>用户库存管理</p>
                <div class="op-button-area">
                    <Button type="ghost" shape="circle" icon="refresh" @click="handleSubmit('formDatas')">刷新</Button>
                    <Button type="ghost" shape="circle" icon="plus" @click="goAdd" >新增</Button>
                    <Button type="ghost" shape="circle" icon="edit" @click="goEditDelView('')">修改</Button>
                    <Button type="ghost" shape="circle" icon="trash-a" @click="goEditDelView('')">删除</Button>
                    <Button type="ghost" shape="circle" icon="search" @click="goEditDelView('')">查看</Button>
                </div>
            </div>
            <Form ref="formDatas" :model="formDatas"  inline>
                <FormItem prop="type" label="选择查询的类别" :label-width="100" >
                    <Select v-model="formDatas.type" style="width:150px;" >
                        <Option value="1">类别1</Option>
                        <Option value="2">类别2</Option>
                        <!-- <Option v-for="item in typeList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                    </Select>
                </FormItem>

                <FormItem label="搜索名称" prop="name" :label-width="80">
                    <Select v-model="formDatas.name" style="width:150px;" >
                        <Option value="1">名称1</Option>
                        <Option value="2">名称2</Option>
                        <!-- <Option v-for="item in nameList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                    </Select>
                </FormItem>  
                <FormItem label="用户名称" prop="userName" :label-width="80">
                    <Input v-model="formDatas.userName"></Input><span class="chooseBtn">选择</span>
                </FormItem> 
                <div>
                    <FormItem label="日期时间"  :label-width="65">
                        <div class="date-choose-area" >
                            <DatePicker type="date" placeholder="Select date" v-model="formDatas.startDate" ></DatePicker>
                            <span> 至 </span>
                            <DatePicker type="date" placeholder="Select date" v-model="formDatas.endDate" ></DatePicker>
                        </div>
                    </FormItem>

                    <FormItem label="" :label-width="30">
                        <Button type="primary" shape="circle" @click="handleSubmit('formDatas')" class="op-btns searchbtn" >查询</Button>
                        <Button type="ghost" shape="circle" @click="handleReset('formDatas')" class="op-btns resetbtn" >重置</Button>
                    </FormItem>
                </div>      
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
    name : 'stock-manage',
    data () {
        return {
            formDatas : {
                type : '',
                name : '',
                userName : '',
                startDate : '',
                endDate : ''
            },
            typeList : [],
            nameList : [],
            currentRowData : {},
            tableColumns : [{
                'title' : '库存编号',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '库存类型',
                'key' : 'stockType',
                'align' : 'center'
            },{
                'title' : '服务商/产品名称',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '起始日期',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '截止日期',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '库存数量',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '销售量',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '剩余数量',
                'key' : 'stockNum',
                'align' : 'center'
            }],
            tableDatas : [{},{},{}],
            tableSize : 'small',
            totalNum : 100
        }
    },
    methods : {
        //跳转至新增
        goAdd () {
            this.$router.push({
                name: ''
            })
        },
        //跳转至修改/修改/查看
        goEditDelView () {
            if(Object.keys(this.currentRowData).length > 0){
                let argu = {"currentData" : this.currentRowData };
                this.$router.push({
                    name: '',
                    params: argu
                })
            }else{
                this.$Message.error('请选择一个景区服务商');
            }
        },
        //查询
        handleSubmit (name) {
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
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        //表格数据请求并处理
        oneMethond () { 

        },
        //获取表格选中行数据
        getChooseData (currentRow,oldCurrentRow) {
            this.currentChooseId = currentRow.isscenic_id; 
            this.currentRowData = currentRow;
        },
        //换页
        changePage () { 
            //this.tableDatas = this.oneMethond();
            this.tableDatas = [{},{},{},{}]
        }
    }
}
</script>
