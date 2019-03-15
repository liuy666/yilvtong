
<template>
    <Modal v-model="modal" 
           :width="modalWidth" 
           :closable="false" 
           :mask-closable="false"
           >
        <p slot="header" style="color:#5db2ff;">
            <span v-if="contentType == 0">温馨提示</span>
            <span v-if="contentType == 1">删除{{infoName}}</span>
            <span v-if="contentType == 2">{{dialogTitle}}</span>
        </p>
        <!-- message提示框用的dialog内容 -->
        <div v-if="contentType == 0" style="text-align:center">
            <p style="font-size:16px; line-height:30px;">{{dialogMessage}}</p>
        </div>
        <!-- 删除用的dialog内容 -->
        <div v-if="contentType == 1" style="text-align:center">
            <img src="../../images/delete.png" />
            <p style="font-size:16px; line-height:30px;margin-top:10px;">你确定要删除该{{infoName}}吗？</p>
        </div>
        <!-- 表单用的dialog内容 -->
        <div v-if="contentType == 2">
            <Form :model="formDatas" 
                  :rules="ruleDatas" 
                  :label-width="labelWidth">
                <Row>
                    <Col 
                        v-for="(item,index) in dialogFormItemList" 
                        :key="index" 
                        :span="item.cols ? item.cols : 24">
                        <FormItem v-if="!item.isHidden"
                                :label="item.label +'：'" 
                                :prop="item.keyName" 
                                >
                            <Input v-if="item.type===1"
                                   :disabled="item.disabled"
                                v-model="formDatas[item.keyName]" 
                                style="width:200px"
                                >
                            </Input> <!-- type为1 = 输入框 -->

                            <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]"><!--Object.keys(formDatas)[index]-->
                                <Radio v-for="(oneItem,oneIndex) in item.optionList" 
                                    :label="oneItem.value" 
                                    :key="oneIndex"
                                    >
                                    {{ oneItem.labelName }}
                                </Radio><!-- type为2 = 单选框 -->
                            </RadioGroup>

                            <CheckboxGroup v-if="item.type===3" 
                                        v-model="formDatas[item.keyName]" 
                                        style="display:inline-block;"
                                        >
                                <Checkbox v-for="(oneItem,oneIndex) in item.optionList" 
                                        :label="oneItem.value" 
                                        :key="oneIndex"
                                        >
                                    {{ oneItem.labelName }}
                                </Checkbox> <!-- type为3 = 复选框 -->
                            </CheckboxGroup>

                            <Select v-if="item.type===4" 
                                    v-model="formDatas[item.keyName]" 
                                    style="width:200px"
                                    > <!-- type为4 = 下拉框 -->
                                <Option v-for="(oneItem,oneIndex) in item.optionList" 
                                        :value="oneItem.value" 
                                        :key="oneIndex"
                                        >
                                    {{ oneItem.label }}
                                </Option>
                            </Select>

                            <Input  v-if="item.type===7" 
                                    v-model="formDatas[item.keyName]" 
                                    type="textarea" style="width:80%;"  
                                    :rows="5" 
                                    :placeholder="item.placeholder"
                                    >
                            </Input> <!-- type为7 = 多行输入框 -->

                            <span v-if="item.type===9">{{formDatas[item.keyName]}}</span> <!-- type为9 = 普通文本文字 -->
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>

        <div slot="footer" style="text-align:center" >
            <Button type="primary" 
                    :loading="modalLoading" 
                    @click="sureEvent(contentType)"
                    >
                确定
            </Button>
            <Button type="ghost" @click="cancelEvent">取消</Button>
        </div>
    </Modal>
</template>
<script>
    export default {
        name : 'commonDialog',
        props : {
            modal : {
                type : Boolean,
                default : false
            },
            modalLoading:{
                type : Boolean,
                default : false
            },
            infoName : {
                type : String,
                default : ''
            },
            contentType : {
                type : Number,
                default : 1
            },
            dialogTitle : {
                type : String,
                default : ''
            },
            formDatas: {
                type : Object,
                default: () => {
                    return {};
                }
            },
            ruleDatas: {
                type : Object,
                default: () => {
                    return {};
                }
            },
            labelWidth : {
                type : Number,
                default : 100
            },
            dialogFormItemList : {
                type : Array,
                default: () => {
                    return [];
                }
            },
            dialogMessage : {
                type : String,
                default : ""
            },
            isFromBtnComponents : {
                type : Boolean,
                default : true
            },
            requestUrl : {
                type : String,
                default : ''
            },
            currentData : {
                type : Object
            },
            modal_width : {
                type : Number
            }
        },
        data () {
            return {

            }
        },
        computed : {
            modalWidth () {
                let w = this.modal_width ? this.modal_width : 500;
                return this.contentType == 2 ? w : 360;
            }
        },
        methods : {
            sureEvent (contentType) {
                this.$emit('changeModal', 1, contentType);
            },
            cancelEvent () {
                this.$emit('changeModal', 0)
            }
        },
    }
</script>

