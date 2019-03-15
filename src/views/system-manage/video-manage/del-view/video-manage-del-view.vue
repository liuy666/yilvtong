<style lang="less">
    @import '../../../../styles/common.less';
    @import '../../../../styles/ectrip.less';
</style>

<template>
  <div>
      <Card>
      <p slot="title">
        {{pageName}}视频信息
      </p>
      
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
            <Row>
              <Col span="24">
                <FormItem label="域名名称" prop="code">
                    {{formValidate.code}}
                </FormItem>
                <FormItem label="企业" prop="type1"> 
                    {{formValidate.type1}}
                </FormItem>
                <FormItem label="描述">
                    {{formValidate.info}}
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
                    code:'asfds',
                    type1:'select-1',
                    info:'adsffffffffff',
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
            if(nowPage.name == 'video_del'){
              this.pageName = '删除'
            }else{
              this.pageName = '查看'
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