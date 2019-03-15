<style lang="less">
    @import '../../styles/ectrip.less';
</style>

<template>
    <Form :ref="formName" :model="formDatas" :rules="ruleDatas" :label-width="labelWidth" >
        <!-- 非列表页的表单项 -->
        <FormItem v-if="!isListPage" v-for="(item,index) in formItemList" :label="item.label +'：'" :prop="item.keyName" :key="index" :class="{'form-area-formItem':item.hasTitle}" >
            <p  class="form-area-title" v-if="item.hasTitle">{{item.titleName}}</p>

            <Input v-if="item.type===1" v-model="formDatas[item.keyName]" style="width:200px"></Input> <!-- type为1 = 输入框 -->

            <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]"><!--Object.keys(formDatas)[index]-->
                <Radio v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex">{{ oneItem.labelName }}</Radio><!-- type为2 = 单选框 -->
            </RadioGroup>

            <CheckboxGroup v-if="item.type===3" v-model="formDatas[item.keyName]" style="display:inline-block;">
                <Checkbox v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex">{{ oneItem.labelName }}</Checkbox> <!-- type为3 = 复选框 -->
            </CheckboxGroup>

            <Select v-if="item.type===4" v-for="(twoItem,ind) in item.count" v-model="formDatas[item.keyName]" :key="ind" style="width:200px"> <!-- type为4 = 下拉框 -->
                <Option v-for="(oneItem,oneIndex) in twoItem.optionList" :value="oneItem.value" :key="oneIndex">{{ oneItem.label }}</Option>
            </Select>

            <Upload v-if="item.type===5" :action="item.action"> <!-- type为5 = 文件上传 -->
                <Button type="ghost" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
            </Upload>

            <UE v-if="item.type===6" :defaultMsg="item.defaultMsg" :config="item.config" :id="item.ueId" :ref="item.ueId"></UE> <!-- type为6 = 富文本框 -->

            <Input  v-if="item.type===7" v-model="formDatas[item.keyName]" type="textarea" style="width:80%;"  :rows="5" :placeholder="item.placeholder"></Input> <!-- type为7 = 多行输入框 -->

            <Tree  v-if="item.type===8" :data="treeData" show-checkbox style="margin-top:-6px;" ></Tree> <!-- type为8 = 树形控件 -->

            <span v-if="item.type===9">{{formDatas[item.keyName]}}</span> <!-- type为9 = 普通文本文字 -->

            <Input v-if="item.type===10" v-model="formDatas[item.keyName]" readonly style="width:200px"></Input>
            <Button v-if="item.type===10" type="primary"  @click="chooseBtnEvent">{{item.btnLabel}}</Button>

            <span v-show="item.isRequired" class="message-title-red">*</span>
            <span v-if="item.hasDec!='' && typeof(item.hasDec) == 'string'" :class="{'message-title-red':item.isRedDec}" >{{item.hasDec}}</span>
        </FormItem>

        <FormItem v-if="!isListPage" >
            <Button type="primary"  @click="handleSubmit(formName)" class="op-btns searchbtn">保存</Button>
            <Button type="ghost"  @click="handleReset(formName)" class="op-btns resetbtn">重置</Button>
            <Button type="ghost"  @click="closePage" class="op-btns closebtn" >关闭</Button>
        </FormItem>

        <!-- 列表页的查询表单项 -->
        <div class="main_picker">
            <div class="float_option" v-if="isListPage && !isMixed" v-for="(item,index) in formItemList" :key="index">
                <FormItem :label="item.label + '：'" :prop="item.keyName"  >
                    <Input v-if="item.type===1" v-model="formDatas[item.keyName]" class="form-option-input"></Input> <!-- type为1 = 输入框 -->
                    <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]">
                        <Radio v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex">{{ oneItem.labelName }}</Radio><!-- type为2 = 单选框 -->
                    </RadioGroup>
                    <CheckboxGroup v-if="item.type===3" v-model="formDatas[item.keyName]">
                        <Checkbox v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex"></Checkbox> <!-- type为3 = 复选框 -->
                    </CheckboxGroup>
                    <Select v-if="item.type===4" v-model="formDatas[item.keyName]" style="width:200px"> <!-- type为4 = 下拉框 -->
                        <Option v-for="(oneItem,oneIndex) in item.optionList" :value="oneItem.value" :key="oneIndex">{{ oneItem.label }}</Option>
                    </Select>
                    <Upload v-if="item.type===5" :action="item.action"> <!-- type为5 = 文件上传 -->
                        <Button type="ghost" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                    </Upload>

                    <span v-show="item.isRequired" class="message-title-red">*</span>
                </FormItem>
            </div>
            <div class="float_option" v-if="isListPage && !isMixed" >
                <FormItem>
                    <Button type="primary" shape="circle" @click="handleSubmit(formName)" class="op-btns searchbtn" >查询</Button>
                    <Button type="ghost" shape="circle" @click="handleReset(formName)" class="op-btns resetbtn" >重置</Button>
                </FormItem>
            </div>
            <RadioGroup v-if="isListPage && isMixed"  v-model="formDatas[Object.keys(formDatas)[0]]" style="width:100%;" > <!--  注意：如果是单选文本混合型 把单选的值放在formdata的第一个 -->
                <div class="float_option" v-for="(item,index) in formItemList" :key="index">
                    <FormItem :label="item.label==''?'':item.label + '：'" :prop="item.keyName" :label-width="item.labelWidth?item.labelWidth:labelWidth">
                        <Input v-if="item.type===1" v-model="formDatas[item.keyName]" class="form-option-input"></Input> <!-- type为1 = 输入框 -->
                        <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]">
                            <Radio v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex">{{ oneItem.labelName }}</Radio><!-- type为2 = 单选框 -->
                        </RadioGroup>
                        <CheckboxGroup v-if="item.type===3" v-model="formDatas[item.keyName]">
                            <Checkbox v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex"></Checkbox> <!-- type为3 = 复选框 -->
                        </CheckboxGroup>
                        <Select v-if="item.type===4" v-model="formDatas[item.keyName]" style="width:200px"> <!-- type为4 = 下拉框 -->
                            <Option v-for="(oneItem,oneIndex) in item.optionList" :value="oneItem.value" :key="oneIndex">{{ oneItem.label }}</Option>
                        </Select>
                        <Upload v-if="item.type===5" :action="item.action"> <!-- type为5 = 文件上传 -->
                            <Button type="ghost" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                        </Upload>

                        <Radio v-if="item.type===6" :label="item.radioValue">{{ item.radioLabel }}</Radio> <!-- type为6 = 单选与文本框的组合 -->
                        <Input v-if="item.type===6" v-model="formDatas[item.keyName]" style="width: 200px"></Input>

                        <span v-show="item.isRequired" class="message-title-red">*</span>
                    </FormItem>
                </div>
                <div class="float_option" >
                    <FormItem>
                        <Button type="primary" shape="circle" @click="handleSubmit(formName)" class="op-btns searchbtn" >查询</Button>
                        <Button type="ghost" shape="circle" @click="handleReset(formName)" class="op-btns resetbtn" >重置</Button>
                    </FormItem>
                </div>
            </RadioGroup>

        </div>
    </Form>
</template>

<script>
import UE from './ue.vue';
export default {
    name: 'detailForm',
    components: {UE},
    props: {
        formName : {
            type : String,
            required : false,
            default : 'detailForm'
        },
        formDatas : {
            type : Object,
            required : true
        },
        ruleDatas : {
            type : Object
        },
        treeData : {
            type : Array,
            required : false
        },
        formItemList : {
            type : Array,
            required : true
        },
        isListPage : {
            type : Boolean,
            required : true,
            default : false
        },
        isMixed : {
            type : Boolean,
            required : true,
            default : false
        },
        labelWidth : {
            type : Number,
            required : false,
            default : 140
        },
        rawData : {
            type : Object,
            required : false
        }
    },
    methods: {
        handleSubmit (name) { debugger
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //获取表单数据
                    var formData = JSON.stringify(this.formDatas);
                    debuggers
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
        handleReset (name) { debugger
            this.$refs[name].resetFields();
        },
        closePage () {

        },
        chooseBtnEvent () {
            this.$emit('chooseDialog');
        }
    }
};
</script>
