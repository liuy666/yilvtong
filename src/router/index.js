import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import store from '../store';
import Cookies from 'js-cookie';
import { routes, otherRoutes } from './router.js';

// console.log('****************路由配置文件：index.js *****************');

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'hash',
    routes
});


// 路由前置守卫
router.beforeEach((to, from, next) => {
    // console.log(router)
    // console.log('(from) 从：');
    // console.log(from);
    // console.log('(to) 到：');
    // console.log(to);
    iView.LoadingBar.start(); // 加载进度条
    
    //关闭页面或者浏览器 清除localStorage
    if (!sessionStorage.getItem('user')) {
        // 恢复默认样式
        let themeLink = document.querySelector('link[name="theme"]');
        // console.log(themeLink.getAttribute('href'));
        themeLink.setAttribute('href', '');
        // 清空打开的页面等数据，但是保存主题数据
        let theme = '';
        if (localStorage.theme) {
            theme = localStorage.theme;
        }
        localStorage.clear();
        if (theme) {
            localStorage.theme = theme;
        }
    }

    if(!sessionStorage.getItem('user')) { // 先判断是否登录，没有则一律跳到登录页
        // console.log(1);
        if(to.name === 'login') {
            next();
        } else {
            next({
                name: 'login'
            });
        }
        
    } else if(to.name === 'login') { // 登陆后，如果前往的是登录页，则阻止并跳入主页，并弹框提示
        // console.log(2);
        iView.Modal.warning({
            title: '温馨提示',
            width: 500,
            content: '您现在已经是登录状态！'
        });
        next({
            name: 'home_index'
        });
    } else if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        // console.log(3);
        // console.log(router.app.$store.state.app.pageOpenedList)
        Util.toDefaultPage(routes, to.name, router, next);
        // console.log(router.app.$store.state.app.pageOpenedList)
    }

    // Util.title(to.meta.title); // 设置网页标题，现去掉该功能

    // if (!sessionStorage.getItem('user') && to.name !== 'login') {
    //     console.log(1)
    //     next({
    //         name: 'login'
    //     });
    // } else if (sessionStorage.getItem('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    //     console.log(2)
    //     Util.title();
    //     next({
    //         name: 'home_index'
    //     });
    // } else {
    //     console.log(3)
    //     console.log(to.meta.dutyId);
    //     Util.toDefaultPage(routes, to.name, router, next);
    // }
});


// 路由后置守卫
router.afterEach(to => {
    // console.log(router);
    // console.log(router.app.$store.state.app.pageOpenedList)
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish(); // 结束进度条
    window.scrollTo(0, 0); // 有啥用？
});