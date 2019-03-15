<style lang="less">
    @import "../../../styles/common_style.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <p>仓库管理</p>
                <div class="op-button-area">
                    <Button type="ghost" shape="circle" icon="refresh" @click="handleSubmit('formDatas')">刷新</Button>
                    <Button type="ghost" shape="circle" icon="plus" @click="goAdd" >新增</Button>
                    <Button type="ghost" shape="circle" icon="edit" @click="goEditDelView('')">修改</Button>
                    <Button type="ghost" shape="circle" icon="trash-a" @click="goEditDelView('')">删除</Button>
                    <Button type="ghost" shape="circle" icon="search" @click="goEditDelView('')">查看</Button>
                </div>
            </div>
            <Form ref="formDatas" :model="formDatas"  inline>
                <FormItem prop="type" label="所属服务商" :label-width="75" >
                    <Select v-model="formDatas.service" style="width:150px;" >
                        <Option value="0">所有服务商</Option>
                        <Option value="1">服务商1</Option>
                        <Option value="2">服务商2</Option>
                        <!-- <Option v-for="item in serviceList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                    </Select>
                </FormItem>

                <FormItem label="" :label-width="30">
                    <Button type="primary" shape="circle" @click="handleSubmit('formDatas')" class="op-btns searchbtn" >查询</Button>
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
    name : 'stock-manage',
    data () {
        return {
            formDatas : {
                service : '0'
            },
            serviceList : [],
            currentRowData : {},
            tableColumns : [{
                'title' : '所属景区',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '仓库编码',
                'key' : 'stockType',
                'align' : 'center'
            },{
                'title' : '仓库名称',
                'key' : 'stockNum',
                'align' : 'center'
            },{
                'title' : '是否总库',
                'key' : 'isTotal',
                'align' : 'center',
                'render' : (h,params) => {
                    const row = params.row;
                    const text = row.isTotal == 1 ? '是' : row.isTotal == 0 ? '否' : '';
                    return text;
                } 
            },{
                'title' : '使用状态',
                'key' : 'useStatus',
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
        handleSubmit (name) { debugger
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
