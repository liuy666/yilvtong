import { otherRoutes, appRoutes } from '@/router/router.js';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

// console.log('************vuex*****************');

const app = {
    state: {
        // hasChangeRouter: false,
        // hasChangeMenu: false,
        cachePage: [], // 存储的是路由的name
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        type: 1,
        pageOpenedList: [ // <已打开的标签导航路由列表> 已经打开的页面（在标签导航上显示）的路由列表，默认存放首页的路由
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ],
        currentPageName: '',
        currentPath: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }], // 面包屑数组
        menuList: [],
        routers: [  // 路由数组，包含菜单路由和主页上的子路由
            otherRoutes,
            ...appRoutes
        ],
        tagsList: [...otherRoutes.children], // <完整的标签导航路由列表> ,存的是二级路由，初始值是主页上所有子路由（不需要权限控制的）
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)

        pageTabList: {}, //存页面tabList 比如客源地管理
        pageCurrentQuery: {}, //存页面的切换页面时的当前查询条件  客源地管理..
        pageParentQuery: {}, //存页面的父级查询条件
        params: {} //存页面传递的参数
    },
    mutations: {
        setType (state, type) {
            state.type = type;
        },
        // 重构新添加的方法
        setParams(state, paramObj) {
            if (state.params[paramObj.paramName] && state.params.hasOwnProperty(paramObj.paramName)) {
                state.params[paramObj.paramName] = paramObj.paramValue;
            } else {
                state.params[paramObj.paramName] = paramObj.paramValue;
            }
            localStorage.setItem("params", JSON.stringify(state.params));
        },
        // 重构新添加的方法
        setPageTabList(state, tabListObj) {
            state.pageTabList[tabListObj.name] = tabListObj.tabList;
        },
        // 重构新添加的方法
        setPageCurrentQuery(state, queryObj) {
            state.pageCurrentQuery[queryObj.name] = queryObj.query;
        },
        // 重构新添加的方法
        setPageParentQuery(state, queryObj) {
            state.pageParentQuery[queryObj.name] = queryObj.query;
        },
        // setRouters(state, list) {
        //     state.routers.push(...list);
        // },

        // 把页面左边菜单中的所有能点击的路由，即二级路由存入tagsList: <完整的标签导航路由列表>
        setTagsList(state, list) {
            state.tagsList.push(...list);
        },
        // 更新菜单，用于进入登录路由就开始更新菜单，这时还无数据，所以 menuList应该置为空数组，而不是null
        updateMenulist(state) {
            state.menuList = JSON.parse(sessionStorage.getItem('routes')) || [];
        },
        // 更改菜单主题
        changeMenuTheme(state, theme) {
            state.menuTheme = theme;
        },
        // 更改主页主题
        changeMainTheme(state, mainTheme) {
            state.themeColor = mainTheme;
        },
        // 添加要展开的子菜单
        addOpenSubmenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        // 从缓存中移除的标签页
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        // 如果localStorage.cachePage有数据，则从中获取缓存的初始化标签导航，
        initCachepage(state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        // 从标签页列表中移除一项
        removeTag(state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },

        /**
         * 根据索引在 <已打开的标签导航路由列表> 中找到某项路由，并更新该路由的params参数（argu）和query参数（query），
         * 然后从 <已打开的标签导航路由列表> 中删除原来的，添加现在传入的（其实就是更新这项的数据），并存入localStorage的pageOpenedList中
         */
        pageOpenedList(state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage); // splice了解一下
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        // 关闭所有的标签页
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        /**
         * 从localStorage.pageOpenedList 中获取存储的 <已经打开的标签导航的列表> ，如果localStorage.pageOpenedList为空，则取主页的路由信息
         * 首页上的计算属性pageTagsList会响应state.pageOpenedList的变化并更新页面
         * 如果想登陆后只显示首页则，作如下修改
         */
        setOpenedList(state) {
            const homeName = sessionStorage.getItem('homeName');
            if (homeName === 'home_index') {
                state.pageOpenedList = [otherRoutes.children[0]]
            } else if (homeName === 'home_index_scenic') {
                state.pageOpenedList = [otherRoutes.children[1]]
            }
            // state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRoutes.children[0]];
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        // 设置当前页name
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        // 保存账户头像
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang(state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount(state, count) {
            state.messageCount = count;
        },
        // 往 <已经打开的标签导航的列表> 和localStorage.pageOpenedList 中都增加一项标签导航
        increateTag(state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) { // 如果将要增加的这项不在 <不缓存列表> 中，则存入vuex的cachePage数组中，且存入localStorage.cachePage
                // 现在要求打开的新页面替换当前的页面，所以这个缓存的功能其实没用了，为了便于以后修改，还是做个判断，不直接去掉
                // state.cachePage.push(tagObj.name);
                // localStorage.cachePage = JSON.stringify(state.cachePage);
                if(state.cachePage.length) {
                    state.cachePage.splice(0,1,tagObj.name);
                } else {
                    state.cachePage.push(tagObj.name);
                }
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            // 改动的原因同上
            if(state.pageOpenedList.length <= 1) {
                state.pageOpenedList.push(tagObj); // 在 <已经打开的标签导航的列表> 增加这项，（首页上的计算属性pageTagsList会同时响应的并更新页面）
            } else {
                state.pageOpenedList.splice(1,1,tagObj);
                // state.pageOpenedList[1] = Object.assign({},state.pageOpenedList[1],tagObj);
            }
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList); // 在 localStorage.pageOpenedList 增加这项
        }
    }
};

export default app;
