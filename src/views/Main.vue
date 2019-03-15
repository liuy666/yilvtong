<style lang="less" scoped>
    @import "./main.less";
    .single-page .ivu-card {
        min-height: 820px;
    }
    .single-page>div {
        min-height: 820px;
        position: relative;
    }
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'260px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink && 2 == systype" class="max-logo"  src="../images/logo_max1.png" key="max-logo"  style="height:22px;"/>
                    <img v-show="!shrink && 1 == systype" class="max-logo"  src="../images/logo_max2.png" key="max-logo1"  style="height:22px;"/>
                    <img v-show="shrink"  src="../images/logo_mini.png" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'260px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <!--面包屑链接-->
                <!-- <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div> -->
                <div class="header-avator-con">
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <lock-screen></lock-screen>
                    <!--<message-tip v-model="mesCount"></message-tip>-->
                    <!--<theme-switch></theme-switch>-->

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">
                                        <div style="text-align: center">
                                            <Icon type="person"></Icon><span style="margin-left: 10px">账号资料</span>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem name="editPwd">
                                        <div style="text-align: center">
                                            <Icon type="android-settings"></Icon><span style="margin-left: 10px">修改密码</span>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem name="loginout">
                                        <div style="text-align: center">
                                            <Icon type="power"></Icon><span style="margin-left: 10px">退出登录</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
            <!--标签链接-->
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'260px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue'; // 可伸缩分组菜单
    import tagsPageOpened from './main-components/tags-page-opened.vue'; // 标签导航链接
    import breadcrumbNav from './main-components/breadcrumb-nav.vue'; // 面包屑链接 未启用
    import fullScreen from './main-components/fullscreen.vue'; // 全屏
    import lockScreen from './main-components/lockscreen/lockscreen.vue'; // 锁屏
    import messageTip from './main-components/message-tip.vue'; // 文字提示气泡框 未启用
    import themeSwitch from './main-components/theme-switch/theme-switch.vue'; // 主题切换 未启用
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data () {
            return {
                // elHeight: '',
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr // 要展开的菜单数组
            };
        },
        computed: {
            menuList () {
                // console.log(this.$store.state.app.menuList);
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            // lang () {
            //     return this.$store.state.app.lang;
            // },
            menuTheme () {
                //侧边栏主题
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            },
            systype () {
                return this.$store.state.app.type;
            }
        },
        methods: {
            init () {
                // console.log('main-init')
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = JSON.parse(sessionStorage.getItem('user'));
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'editPwd') {
                    util.openNewPage(this, 'editpwd_index');
                    this.$router.push({
                        name: 'editpwd_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    // this.$store.state.app.hasChangeRouter = false;
                    // this.$store.state.app.hasChangeMenu = false;
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                //打印name值
                // console.log(val)
            },
            beforePush (name) {
                //没懂是干什么的
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route' (to) {
                // console.log(to)
                // debugger
                this.$store.commit('setCurrentPageName', to.name);
                // console.log('watch-$route')
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            // lang () {
            //     console.log('watch-lang')
            //     util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            // }
        },
        mounted () {
            this.init();
        },
        created () {
            if (sessionStorage.getItem('systype') == 2 && this.$route.name === 'home_index') {
                this.$store.commit('logout', this);
                this.$store.commit('clearOpenedSubmenu');
                this.$router.replace({
                    name: 'login'
                })
                return;
            } else if (sessionStorage.getItem('systype') == 1 && this.$route.name === 'home_index_scenic') {
                this.$store.commit('logout', this);
                this.$store.commit('clearOpenedSubmenu');
                this.$router.replace({
                    name: 'login'
                })
                return;
            }
            this.$store.commit('setType', sessionStorage.getItem('systype'));
            // 显示打开的页面的列表
            if (sessionStorage.getItem('systype') == 2) {
                document.title = '易旅通智慧景区-企业版';
            } else if (sessionStorage.getItem('systype') == 1) {
                document.title = '易旅通智慧景区-云中心';
            }
            this.$store.commit('setOpenedList');
            // this.$common.getMainHeight(this);
        }
    };
</script>
