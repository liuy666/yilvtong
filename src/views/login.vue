<style lang="less" scope>
    @import './login.less';
    .system_logo {
        position: absolute;
        left: calc(~'50% - 145px');
        top: calc(~'50% - 260px');
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 450px;
    }
    .login_input {
        width:280px;
        height:40px;
        /*border:1px solid #2E2E2E;*/
        padding-left:45px;
        padding-right:5px;
        margin:0 auto;
        border: none;
        border-bottom: 1px solid #C3C3C3;/* 29B7F8 */
        border-radius:0;
        outline: none;
        box-sizing: border-box;
        background: transparent;
        &.on{
            border-bottom:1px solid #29B7F8;
            color:#29B7F8;
        }
    }
    .input_icon {
        height:20px;
        position:absolute;
        top:9px;
        left:12px;
    }
    .login_footer {
        position : absolute;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0.5px;
        text-align: center;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        bottom: 3%;
        line-height: 30px;
    }
    .login_footer a {
        color:  #999999;
    }
    input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset!important;
    }
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <template v-if="isShowLoading">
            <loading></loading>
        </template>
        <img src="../images/logo1.png" class="system_logo" v-if="type === 1"/>
        <img src="../images/logo2.png" class="system_logo" v-else-if="type === 2"/>
        <div class="login-con">
            <div style="width:400px;float:left">
                <img src="../images/login_pic.png" alt="请登录" class="login-pic">
            </div>
            <div style="width:400px;float:left;background:#fff;border-radius:0 15px 15px 0;">
                <Card dis-hover :bordered="false" style="margin:50px auto 65px;width:80%;background:#fff;">
                    <p slot="title" class="login-title">欢迎登录</p>
                    <div class="form-con">
                        <Form ref="loginForm" :model="form" :rules="rules" autocomplete="off">
                            <FormItem prop="empId">
                                <!-- <Input v-model="form.empId" icon="person" placeholder="请输入用户名"></Input> -->
                                <input v-model="form.empId" placeholder="请输入用户名" class="login_input"
                                    :class="isON_name ? 'on' : ''"
                                    @focus="changeisON('isON_name',true)"
                                    @blur="changeisON('isON_name',false)" />
                                <img :src="isON_name ? icon_name2 : icon_name1" class="input_icon">
                            </FormItem>
                            <FormItem prop="empPwd" style="margin-bottom:12px;">
                                <!-- <Input type="password" v-model="form.empPwd" icon="locked" placeholder="请输入密码"></Input> -->
                                <input type="password" v-model="form.empPwd" placeholder="请输入密码" class="login_input"
                                    :class="isON_pwd ? 'on' : ''"
                                    @focus="changeisON('isON_pwd',true)"
                                    @blur="changeisON('isON_pwd',false)" />
                                <img :src="isON_pwd ? icon_pwd2 : icon_pwd1" class="input_icon">
                            </FormItem>
                            <!-- <Checkbox v-model="single" style="margin-bottom:12px;">
                                <span>记住密码</span>
                            </Checkbox> -->
                            <FormItem style="margin-top:40px;">
                                <Button @click="handleSubmit()" type="primary" long style="width:280px;height:44px;background:#29B7F8;color:#FFF;border:0;margin:0 auto;font-size: 16px;box-shadow: 0 4px 4px 0 rgba(41,183,248,0.36);">登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>

		<div class="login_footer" style="color: #999999">
            <p><a href="http://www.hqyatu.com/" target="_blank">Copyright © 环球雅途集团有限公司 All Rights Reserved 粤ICP备09156180号</a></p>
            <p>提供技术支持 服务热线：(+86)755-88328999</p>
        </div>
    </div>
</template>

<script>
    import { appRoutes } from '@/router/router.js';
    export default {
        data () {
            return {
                type: 1, // 1 中心系统 2.是景区
                single: false,
                isShowLoading: false,
                form: {
                    empId: '',
                    empPwd: '',
                    url: window.location.hostname
                },
                rules: {
                    empId: [
                        {
                            required: true,
                            message: '账号不能为空',
                            trigger: 'blur'
                        }
                    ],
                    empPwd: [
                        {
                            required: true,
                            message: '密码不能为空',
                            trigger: 'blur'
                        }
                    ]
                },
                isGetToken: false,
                token: '',
                isON_name: false,
                isON_pwd: false,
                icon_name1: require('../images/user_new.png'),
                icon_name2: require('../images/user_new_choose.png'),
                icon_pwd1: require('../images/pwd.png'),
                icon_pwd2: require('../images/pwd_choose.png')
            };
        },
        mounted () {
            this.loadAccountInfo();
            this.init();
        },
        methods: {
            async init () {
                try {
                    let url = window.location.hostname;
                    let res = await this.$http.get(`${this.baseUrl}/ec/domain/v1/getDomainType`, {
                        params: {
                            url
                        }
                    });

                    if (res.data.code === 200) {
                        this.type = res.data.data.type;
                        if (this.type == 2) {
                            document.title = '易旅通智慧景区-企业版';
                        } else if (this.type == 1) {
                            document.title = '易旅通智慧景区-云中心';
                        }
                        sessionStorage.setItem('systype', this.type)
                        this.$store.commit('setType', this.type);
                    }
                } catch (err) {

                };
            },
            changeisON (input, isON) {
                if (input == 'isON_name') this.isON_name = isON;
                else this.isON_pwd = isON;
            },
            // 登陆表单简单验证
            handleSubmit () {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.getToken();
                    } else {
    
                    }
                });
            },
            // 尝试获取账号信息
            loadAccountInfo () {
                let accountInfo = JSON.parse(sessionStorage.getItem('accountInfo'));

                // 如果有账号信息，则预填写
                if (!accountInfo) {
                    return false;
                } else {
                    this.form.empId = accountInfo.split('&')[0];
                    this.form.empPwd = accountInfo.split('&')[1];
                    this.single = true;
                }
            },
            // 获取token
            getToken () {
                this.isShowLoading = true;
                let tokenData = {
                    username: this.form.empId,
                    password: this.form.empPwd,
                    grant_type: 'password',
                    scope: 'app',
                    client_id: 'android',
                    client_secret: 'android'
                };

                // 获取token
                this.$http.post(this.baseUrl + '/uaa/oauth/token', this.QS.stringify(tokenData))
                    .then(tokenRes => {
                        // console.log(tokenRes);
                        if (tokenRes.status === 200) {
                            // 改变 isGetToken 触发登录接口
                            this.isGetToken = true;
                            this.token = tokenRes.data.access_token;
                        } else {
                            this.isShowLoading = false;
                            this.$Modal.error({
                                title: '温馨提示',
                                content: '未获取token信息，请刷新后重试'
                            });
                        }
                    })
                    .catch(err => {
                        this.isShowLoading = false;
                        this.$Modal.error({
                            title: '温馨提示',
                            content: '该账号不存在'
                        });
                    });
            },
            // 根据id判断数组中是否存在某项
            isExist (id, array) {
                if (array.indexOf(id) !== -1 || id > 99900) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        computed: {
            comToken () {
                return this.token;
            }
        },
        watch: {
            isGetToken (val) {
                if (val) {
                    let obj = {
                        access_token: this.comToken,
                        ...this.form
                    };
                    this.$http.post(this.baseUrl + '/sys/v1/login', this.QS.stringify(obj))
                        .then(async loginRes => {
                            // console.log(loginRes);
                            if (loginRes.data.code === 200) {
                                /**
                                 * 引用本地文件，防止图片链接失效后不能显示的问题
                                 * 现在默认头像是可配置的
                                 * 配置方式：直接用同名图片替换根目录下images下的defaultPicture.jpg图片即可。
                                 */
                                const defaultImg = require('@/images/defaultPicture.jpg');

                                // 存储登录信息
                                sessionStorage.setItem('user', JSON.stringify(this.form.empId));
                                sessionStorage.setItem('password', JSON.stringify(this.form.empPwd));
                                sessionStorage.setItem('companytype', JSON.stringify(loginRes.data.data.companytype));
                                sessionStorage.setItem('iemployeeid', loginRes.data.data.iemployeeid);
                                sessionStorage.setItem('photoURL', loginRes.data.data.photoURL || defaultImg);

                                // 存储 token
                                this.Cookies.set('token', this.comToken);

                                // 存储账户信息
                                let accountInfo = this.form.empId + '&' + this.form.empPwd;
                                if (this.single) {
                                    // console.log('勾选了记住密码');
                                    sessionStorage.setItem('accountInfo', JSON.stringify(accountInfo));
                                } else {
                                    sessionStorage.removeItem('accountInfo');
                                }

                                // 获取所有权限
                                const getDutysRes = await this.$api.get(this.baseUrl + '/sys/postsDuty/v1/getPostListByUser');
                                // console.log(getDutysRes);

                                // 如果获取权限列表失败，则清空登录信息，并退回到login页 -- 修改 by 刘英杰 2018-8-18 18:01:33
                                if (!getDutysRes) {
                                    this.Cookies.remove('token', this.comToken);
                                    sessionStorage.removeItem('user');
                                    sessionStorage.removeItem('password');
                                    sessionStorage.removeItem('companytype');
                                    this.isShowLoading = false;
                                    this.$push({name: 'login'});
                                    return;
                                }

                                // 过滤出 checked 为 true 的权限
                                let hasDutysList = getDutysRes.data.filter(item => {
                                    return item.checked;
                                });
                                // console.log(hasDutysList);

                                // 找出报表统计职责的备注里面的跳转链接存起来
                                if (loginRes.data.data.companytype === '01') {
                                    for (let item of hasDutysList) {
                                        if (item.idutyid === 10254) {
                                            sessionStorage.setItem('szmemo', JSON.stringify(item.szmemo)); // 平台报表统计跳转链接
                                            break;
                                        }
                                    }
                                } else if (loginRes.data.data.companytype === '02') {
                                    for (let item of hasDutysList) {
                                        if (item.idutyid === 920) {
                                            sessionStorage.setItem('szmemo', JSON.stringify(item.szmemo)); // 景区服务商线下售检数据报表跳转链接
                                        } else if (item.idutyid === 962) {
                                            sessionStorage.setItem('szmemo1', JSON.stringify(item.szmemo)); // 景区服务商综合报表查询跳转链接
                                        }
                                    }
                                }

                                // 处理成数字数组
                                let dutyIdList = hasDutysList.map(item => {
                                    return item.idutyid;
                                });
                                // console.log(dutyIdList)
                                sessionStorage.setItem('limitsList', JSON.stringify(dutyIdList));

                                // 遍历本地完整路由，若路由的权限id存在dutyIdList中，则渲染出来
                                let _this = this;
                                let _routes = appRoutes.filter(item => {
                                    if (item.children) {
                                        let routerLv2 = item.children;
                                        let listLv2 = routerLv2.filter(itemLv2 => {
                                            if (itemLv2.children) {
                                                let routrLv3 = itemLv2.children;
                                                let listLv3 = routrLv3.filter(itemLv3 => {
                                                    return _this.isExist(itemLv3.meta.dutyId, dutyIdList);
                                                });
                                                itemLv2.children = listLv3;
                                            }
                                            return _this.isExist(itemLv2.meta.dutyId, dutyIdList);
                                        });
                                        item.children = listLv2;
                                    }
                                    return _this.isExist(item.meta.dutyId, dutyIdList);
                                });
                                // console.log(_routes);

                                sessionStorage.setItem('routes', JSON.stringify(_routes));
                                // console.log(this.$router);

                                /*
                                 * 路由控制方案一
                                 * 在完整的路由表的meta里添加权限标识 isAccess true表示路由可跳转 false不能跳转 方式较简单 会展现所有路由
                                 */

                                /*
                                 * 路由控制方案二
                                 * 根据登陆用户获取该用户权限列表 对比本地完整路由表 并做筛选 动态加载菜单...
                                 */

                                // 获取员工头像
                                // const getImg = await this.$api.get()
                                let photoUrl = sessionStorage.getItem('photoURL');
                                this.$store.commit('setAvator', photoUrl);

                                // 进入主页
                                this.$http.get(this.baseUrl + '/sys/homePage/v1/isCenter', {
                                    params: {
                                        access_token: this.Cookies.get('token')
                                    }
                                }).then(res => {
                                    if (res.data.code === 200) {
                                        let name = '';
                                        if (res.data.data.isCenter == '0') {
                                            name = res.data.data.isAdmin ? 'home_index' : 'home_other';
                                        } else {
                                            name = res.data.data.isAdmin ? 'home_index_scenic' : 'home_other';
                                        }
                                        sessionStorage.setItem('homeName', name);
                                        this.$store.state.app.pageOpenedList.splice(0, 1, {
                                            title: '首页',
                                            path: '',
                                            name: name
                                        });
                                        this.$router.push({
                                            name: name
                                        });
                                        let arr = JSON.parse(JSON.stringify(this.$store.state.app.pageOpenedList));
                                        // console.log(arr);
                                        // console.log(this.$store.state.app.pageOpenedList);
                                    } else {
                                        this.$common.showMessageModal(this, res, 1);
                                    }
                                    this.isGetToken = false;
                                    this.isShowLoading = false;
                                });
                            } else {
                                this.$common.showMessageModal(this, loginRes, 1);
                                // this.Cookies.remove('token');
                                this.isGetToken = false;
                                this.isShowLoading = false;
                            }
                        }).catch(err => {
                        // this.Cookies.remove('token');
                            this.isGetToken = false;
                            this.isShowLoading = false;
                        });
                }
            }
        }
    };
</script>

<style>

</style>
