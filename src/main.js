import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index.js';
import { appRoutes } from './router/router.js';
import store from './store';
import App from './app.vue';
import Cookies from 'js-cookie';
import util from './libs/util';
import axios from 'axios';
import QS from 'qs';
import globalComponents from './libs/globalComponent';
import common from '@/libs/common.js';
import reg from '@/libs/reg.js';
import handleTools from '@/libs/HandleTools.js';
import http from '@/libs/http.js';
import http1 from '@/libs/http1.js';
import totalList from '@/libs/const.js';
import vfilters from '@/libs/filter.js';
import 'iview/dist/styles/iview.css';
import '@/UE/ueditor.config.js';
import '@/UE/ueditor.all.min.js';
import '@/UE/lang/zh-cn/zh-cn.js';
import './styles/ectrip.less';
import './styles/GlobalStyles.less';

Vue.use(globalComponents);
Vue.use(iView);

Vue.prototype.Cookies = Cookies;
Vue.prototype.$common = common;
Vue.prototype.$reg = reg;
Vue.prototype.$http = axios;
Vue.prototype.QS = QS;
Vue.prototype.$handle = handleTools;
Vue.prototype.$api = http;
Vue.prototype.$vfilters = vfilters;
Vue.prototype.$bApi = http1;
Vue.prototype.$$totalList = totalList;
Vue.prototype.baseUrl = process.env.NODE_ENV === "production" ? '' : '/api';
Vue.prototype.lee = process.env.NODE_ENV === "production" ? '' : '/lee';
Vue.prototype.fm = process.env.NODE_ENV === 'production' ? '' : '/fm';



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;

        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created() {
        let tagsList = [];
        // 遍历appRoutes中的路由（即需要权限控制的路由，也就是左边菜单中的路由），把所有能点击的路由，即二级路由存入tagsList
        appRoutes.map(item => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});