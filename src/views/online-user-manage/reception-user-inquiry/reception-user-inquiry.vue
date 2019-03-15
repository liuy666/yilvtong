<style lang="less">
    @import '../../../styles/common_style.less';
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <p>接待用户管理</p>
                <div class="op-button-area">
                    <Button type="ghost" shape="circle" icon="refresh" @click="handleSubmit('formDatas')">刷新</Button>
                    <Button type="ghost" shape="circle" icon="plus" @click="goToPage('',true)" >新增</Button>
                    <Button type="ghost" shape="circle" icon="edit" @click="goToPage('',false)">修改</Button>
                    <Button type="ghost" shape="circle" icon="trash-a" @click="goToPage('',false)">删除</Button>
                    <Button type="ghost" shape="circle" icon="search" @click="goToPage(''),false">查看</Button>
                    <Button type="ghost" shape="circle" icon="gear-a" @click="goToPage(''),false">登录密码初始化</Button>
                    <Button type="ghost" shape="circle" icon="gear-b" @click="goToPage(''),false">错误登录次数初始化</Button>
                    <Button type="ghost" shape="circle" icon="gear-a" @click="goToPage(''),false">审核</Button>
                    <Button type="ghost" shape="circle" icon="gear-b" @click="goToPage(''),false">快速审核</Button>
                </div>
            </div>

            <Form ref="formDatas" :model="formDatas" >
                <div class="all-options-area">
                    <RadioGroup v-model="formDatas.radiobutton" style="width:100%" >
                        <div class="one-option">
                            <FormItem>
                                <Radio label="按用户编号查询">按用户编号查询：</Radio>
                                <Input v-model="formDatas.userNum" style="width:200px;" ></Input>
                            </FormItem>
                        </div>
                        <div class="one-option">
                            <FormItem>
                                <Radio label="按联系人姓名查询（模糊查询）">按联系人姓名查询（模糊查询）：</Radio>
                                <Input v-model="formDatas.name" style="width:200px;" ></Input>
                            </FormItem>
                        </div>
                        <div class="one-option">
                            <FormItem>
                                <Radio label="按邮箱或手机号查询">按邮箱或手机号码查询：</Radio>
                                <Input v-model="formDatas.emallortel" style="width:200px;" ></Input>
                            </FormItem>
                        </div>
                        <div class="one-option">
                            <FormItem label="选择用户类型" :label-width="86">
                                <Select v-model="formDatas.usertype" style="width:200px;" >
                                    <Option value="11">查询有效用户</Option>
                                    <Option value="22">查询无效用户</Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div class="one-option">
                            <FormItem>
                                <Button type="primary" shape="circle" @click="handleSubmit('formDatas')" class="op-btns searchbtn" >查询</Button>
                                <Button type="ghost" shape="circle" @click="handleReset('formDatas')" class="op-btns resetbtn" >重置</Button>
                            </FormItem>
                        </div>
                    </RadioGroup>
                </div>
            </Form>

            <Table :data="tableDatas" :columns="tableColumns" :size="tableSize"  stripe border highlight-row @on-current-change="getChooseData"></Table>
        </Card>
    </div>
</template>
<script>
import commonMethod from '@/libs/common.js';

export default {
    name : 'FIT-user-manage',
    data () {
        return {
            formDatas : {
                radiobutton : '按用户编号查询',
                userNum : '',
                name : '',
                emallortel : '',
                usertype : ''
            },
            currentRowData : {},
            tableColumns : [{
                'title' : '用户编号',
                'key' : 'userNum',
                'align' : 'center',
                'width' : 100
            },{
                'title' : '用户昵称',
                'key' : 'username',
                'align' : 'center',
                'width' : 150
            },{
                'title' : '导游姓名',
                'key' : 'guidename',
                'align' : 'center',
                'width' : 100
            },{
                'title' : '操作',
                'key' : 'ops',
                'align' : 'center',
                'width' : 450,
                'render' : (h,params) => {
                    const row = params.row;
                    if(!row.ops) return '';
                    return h('div',[
                        h('a',{
                            class : 'table-alink',
                            on : {
                                click : () => {

                                }
                            }
                        },' 登录密码初始化 '),
                        h('a',{
                            class : 'table-alink',
                            on : {
                                click : () => {

                                }
                            }
                        },' 错误登录次数初始化 '),
                        h('a',{
                            class : 'table-alink',
                            on : {
                                click : () => {

                                }
                            }
                        },' 审核 '),
                        h('a',{
                            class : 'table-alink',
                            on : {
                                click : () => {

                                }
                            }
                        },' 快速审核 '),
                        h('a',{
                            class : 'table-alink',
                            on : {
                                click : () => {

                                }
                            }
                        },' 初始化指纹 ')
                    ])
                }
            },{
                'title' : '用户状态',
                'key' : 'userStatus',
                'align' : 'center',
                'width' : 100,
                'render' : (h,params) => {
                    const row = params.row;
                    const text = row.userStatus == 1 ? '有效用户' : row.userStatus == 0 ? '无效用户' : '';
                }
            },{
                'title' : '联系人',
                'key' : 'linkman',
                'align' : 'center',
                'width' : 100
            },{
                'title' : '身份证号',
                'key' : 'IdCard',
                'align' : 'center',
                'width' : 200
            },{
                'title' : '手机号码',
                'key' : 'userNum',
                'align' : 'center',
                'width' : 150
            },{
                'title' : '邮箱地址',
                'key' : 'userNum',
                'align' : 'center',
                'width' : 200
            },{
                'title' : '联系电话',
                'key' : 'userNum',
                'align' : 'center',
                'width' : 150
            },{
                'title' : '注册时间',
                'key' : 'userNum',
                'align' : 'center',
                'width' : 150
            },{
                'title' : '最后一次登录时间',
                'key' : 'userNum',
                'align' : 'center',
                'width' : 200
            }],
            tableDatas : [{'ops' : 1},{},{}],
            tableSize : 'small'
        }
    },
    methods : {
        goToPage (name,isAdd) {
            if(Object.keys(this.currentRowData).length > 0 || isAdd) {
                let argu = {"currentData" : this.currentRowData };
                commonMethod.goPage.call(this,name,argu,isAdd);
            }else{
                this.$Message.error("请选择一条记录");
            }
        },
        handleSubmit (name) {
            commonMethod.handleSubmit.call(this,name);
        },
        handleReset () {
            this.$refs[name].resetFields();
        },
        getChooseData (currentRow,oldCurrentRow) {
            this.currentRowData = currentRow;
        }
    }
}
</script>
