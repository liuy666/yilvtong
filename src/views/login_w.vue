<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <div style="width:400px;float:left">
                <img src="../images/login_pic.png" alt="请登录" class="login-pic">
            </div>
            <div style="width:400px;float:left;background:#f5f6fa;border-radius:0 15px 15px 0;">
                <Card dis-hover :bordered="false" style="margin:80px auto;width:80%;background:#f5f6fa;">
                    <p slot="title" class="login-title">欢迎登录</p>
                    <div class="form-con">
                        <Form ref="loginForm" :model="form" :rules="rules">
                            <FormItem prop="empId">
                                <Input v-model="form.empId" icon="person" placeholder="请输入用户名"></Input>
                            </FormItem>
                            <FormItem prop="empPwd" style="margin-bottom:12px;">
                                <Input type="password" v-model="form.empPwd" icon="locked" placeholder="请输入密码">
                                </Input>
                            </FormItem>
                            <Checkbox v-model="single" style="margin-bottom:12px;">
                                <span>记住密码</span>
                            </Checkbox>
                            <FormItem>
                                <Button @click="handleSubmit" type="primary" long style="background:#5db2ff;border:1px solid #5db2ff;border-radius:none;">登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
export default {
    data () {
        return {
            single: false,
            form: {
                empId: '',
                empPwd: ''
            },
            rules: {
                empId: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                empPwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            isGetToken : false
        };
    },
    mounted:function(){
        this.loadAccountInfo();
    },
    methods: {
        handleSubmit () {
            var mySelf = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    util.loadingShow(mySelf);
                    var tokenData = {
                        username:mySelf.form.empId,
                        password:mySelf.form.empPwd,
                        grant_type:"password",
                        scope:"app",
                        client_id:"android",
                        client_secret:"android"
                    }

                    //获取token
                    mySelf.$http.post(this.baseUrl+'/uaa/oauth/token',mySelf.QS.stringify(tokenData),{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
                    .then(function (response) {
                        if(response.data){
                            //存token
                            Cookies.set('token', response.data.access_token);
                            mySelf.isGetToken = true; //改变isGetToken 触发登录接口
                        }
                    })
                    .catch(function (error) {

                    })
                }
            });
        },
        loadAccountInfo:function(){
            let mySelf = this;

            let accountInfo = Cookies.get('accountInfo'); 

            //如果cookie里没有账号信息  
            if(Boolean(accountInfo) == false){   
                return false;  
            }
            else{  
            //如果cookie里有账号信息  
                let userName = "";  
                let password = "";  
                let index = accountInfo.indexOf("&");  
  
                userName = accountInfo.substring(0,index);  
                password = accountInfo.substring(index+1);  
  
                mySelf.form.empId = userName;  
                mySelf.form.empPwd = password;  
                mySelf.single = true;  
            }  
        }
    },
    watch: {
        isGetToken (val) { 
            var mySelf = this;
            if(val){
                var formData = mySelf.form;//拿到表单数据
                formData["access_token"] = Cookies.get("token");
                
                //登录
                mySelf.$http.post(this.baseUrl+'/sys/v1/login',mySelf.QS.stringify(formData),{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
                .then(function (response) { 
                    util.loadingHide(mySelf);
                    if(response.data.code == 200){
                        //储存用户名&&密码
                        Cookies.set('user', mySelf.form.empId);
                        Cookies.set('password', mySelf.form.empPwd);

                        var remenberStatus = mySelf.single;
                        var accountInfo = '';
                        accountInfo = mySelf.form.empId + '&' + mySelf.form.empPwd;
                        if(remenberStatus){
                            Cookies.set('accountInfo', accountInfo, { expires: 7 });
                        }else{
                            Cookies.remove('accountInfo'); 
                        }

                        mySelf.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

                        
                        //储存当前用户权限
                        //Cookies.set('accessArr',response.data.data.dutys);

                        //菜单权限方法二测试
                        // let menudata = {
                        //     first : [{
                        //         title : '1-1',
                        //         path : 'first_first',
                        //         name : 'first_first',
                        //         popid : 1,
                        //         parentid : 0,
                        //         urlpath : '',
                        //         children : 1
                        //     },{
                        //         title : '1-2',
                        //         path : 'first_second',
                        //         name : 'first_second',
                        //         popid : 2,
                        //         parentid : 0,
                        //         urlpath : 'online-user-manage/reception-user-inquiry/reception-user-inquiry',
                        //         children : 0
                        //     }],
                        //     second : [{
                        //         title : '1-1-1',
                        //         path : 'first_first_first',
                        //         name : 'first_first_first',
                        //         popid : 12,
                        //         parentid : 1,
                        //         urlpath : 'tourcard/tourcard-card/tourcard-main',
                        //         children : 1
                        //     },{
                        //         title : '1-1-2',
                        //         path : 'first_first_second',
                        //         name : 'first_first_second',
                        //         popid : 13,
                        //         parentid : 1,
                        //         urlpath : 'tourcard/tourcard-saleOrder/tourcard-saleOrder',
                        //         children : 0
                        //     }],
                        //     third : [{
                        //         title : '1-1-1-1',
                        //         path : 'first_first_first_first',
                        //         name : 'first_first_first_first',
                        //         popid : 1231,
                        //         parentid : 12,
                        //         urlpath : 'tourcard/tourcard-card/tourcard-card/tourcard-card',
                        //         children : 0
                        //     },{
                        //         title : '1-1-1-2',
                        //         path : 'first_first_first_second',
                        //         name : 'first_first_first_second',
                        //         popid : 1232,
                        //         parentid : 12,
                        //         urlpath : 'tourcard/tourcard-card/tourcard-detail/tourcard-detail',
                        //         children : 0
                        //     }]
                        // }

                        // var router_arr = util.getMenuItem(menudata);
                        // Cookies.set('getMenus',JSON.stringify(router_arr)); 
                        
                        // let tagsList = [];
                        // router_arr.map((item) => {
                        //     if (item.children.length <= 1) {
                        //         tagsList.push(item.children[0]);
                        //     } else {
                        //         tagsList.push(...item.children);
                        //     }
                        // });
                        // Cookies.set('addTagList',JSON.stringify(tagsList)); 

                        // mySelf.$router.addRoutes(router_arr);
                        // mySelf.$store.commit('updateMenulist',router_arr);//更新菜单列表
                        // mySelf.$store.commit('setTagsList', tagsList);//把获取的菜单，添加到store/modules/app中tagsList，util.js中openNewPage用到。

                        // if(!mySelf.$store.state.app.hasChangeRouter){
                        //     //mySelf.$router.options.routes = mySelf.$router.options.routes.concat(router_arr);
                        //     //mySelf.$store.commit('setRouters',router_arr);//把路由添加到store的app中的routers中去。
                        //     mySelf.$store.state.app.hasChangeRouter = true;
                        // }
                

                        mySelf.$router.push({
                            name: 'home_index'
                        });
                        mySelf.isGetToken = false;

                    }
                    else{
                        mySelf.isGetToken = false;
                        mySelf.$Modal.error({
                            title: "温馨提示",
                            content: response.data.msg
                        });
                    }
                })
                .catch(function (error) {
                    util.loadingHide(mySelf);
                });
            }
        }
    }
};
</script>

<style>

</style>
