<style lang="less">
    @import '../../../../styles/common.less';
    @import '../../../../styles/ectrip.less';
</style>

<template>
  <div>
      <Card>
      <p slot="title">
        {{pageName}}轮播信息
      </p>
      
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
            <Row>
              <Col span="24">
                <FormItem label="域名名称" prop="code">
                    <Input v-model="formValidate.code" class="form-main-input"></Input>
                </FormItem>
                <FormItem label="企业" prop="type1"> 
                    <Select v-model="formValidate.type1" class="form-main-select">
                        <Option value="select-1">世界之窗</Option>
                        <Option value="select-2">长白山</Option>
                        <Option value="select-3">庐山</Option>
                    </Select>
                </FormItem>
                <FormItem label="描述">
                    <Input v-model="formValidate.info" type="textarea" :rows="4" ></Input>
                </FormItem>
                <FormItem label="图片商标">
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
              </Col>
            </Row>  
          </Form>
      
    </Card>
  </div>
</template>

<script>
import Vue from 'vue';

    export default {
        data () {
            return {
                res1: [],
                showRes: [],
                formValidate: {
                    code:'',
                    type1:'select-1',
                    info:'',
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '请输入域名名称', trigger: 'blur' }
                    ]
                },
                pageName:''
            }
        },
        methods: {
          getThisPage(){
            let nowPage = this.$route;
            if(nowPage.name == 'swiper_edit'){
              this.pageName = '修改'
            }else{
              this.pageName = '新增'
            }
          },
          handleSubmit (name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                      this.$Message.success('Success!');
                  } else {
                      this.$Message.error('Fail!');
                  }
              })
          },
          handleReset (name) {
              this.$refs[name].resetFields();
          }
        },
        watch:{
          res1 (val) {
              this.showRes = val;
          },
        },
        mounted(){
          this.getThisPage();
        }
    }
</script>