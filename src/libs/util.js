import { resolve } from 'url';

let util = {};


// 设置网页标题
util.title = function(title) {
    title = title || '景区系统';
    window.document.title = title;
};


// 如果数组 arr 中的每一项都在 targetArr 中存在 则返回true
util.inOf = function(arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

// 如果 ele 在数组 targetArr 中存在则返回 true
util.oneOf = function(ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};


util.showThisRoute = function(itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function(routers, name) {
    // 如果name为空或者路由表不存在或者路由表为空数组，则返回null
    if (!name || !routers || !routers.length) {
        return null;
    }
    // // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

// 处理标题
util.handleTitle = function(vm, item) {
    /* 刘英杰 修改于2018-8-18 15:45:57 去掉国际化 */
    // if (typeof item.title === 'object') {
    //     return vm.$t(item.title.i18n);
    // } else {
    //     return item.title;
    // }
    return item.title;
};


/**
 * 设置当前页的path
 * 实际作用：
 * 作用分析：
 * @param { Object } vm -- vue全局实例对象
 * @param { String } name -- 将要前往的路由name
 * @return { Array } currentPathArr -- 返回当前的path数组
 * 示例： util.setCurrentPath(this, to.name);
 */

util.setCurrentPath = function(vm, name) {
    /**
     * 过滤掉 children 长度为0的一级路由对象
     * 因为登陆后的权限过滤操作会过滤掉 <那些没有访问权限的一级路由> 的子路由，即 children的length为0
     * 修改 by 刘英杰 2018-8-18 18:18:00
     */
    // （）
    let realAppRoutes = vm.$store.state.app.routers.filter(item => {
        return item.children.length;
    });

    // debugger
    let title = '';
    let isOtherRouter = false;
    // console.log(name);

    /**
     * 遍历路由表，如果将要前往的路由是 otherRouter(主页路由) ，则 isOtherRouter = true
     */
    realAppRoutes.forEach(item => {
        // // console.log(item);
        if (item.children.length === 1) { // 遍历到的路由只有一个子路由
            // // console.log(item.children);
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item); // 已修改，现在这个函数的功能就是 title = item.title;
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            // // console.log(item.children);
            item.children.forEach(child => { // 遍历到的路由有多个子路由，则继续遍历子路由
                if (child.name === name) {
                    // // console.log(child.name);
                    title = util.handleTitle(vm, child); // 已修改，现在这个函数的功能就是 title = 将要前往的路由的title，且该路由是otherRouter的子路由
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];

        // // console.log(name.indexOf('_index') >= 0)
        // // console.log(isOtherRouter)
        // // console.log(name.indexOf('home_') == -1)
        // // console.log((name.indexOf('_index') >= 0 || isOtherRouter) && name.indexOf('home_') == -1)
    if (name.indexOf('home_') != -1) { // 如果将要前往的路由是三个主页路由之一（home_开头的）
        currentPathArr = [
            {
                // 根据'home_index'找到该路由对象，并使用其title来设置这里的title，其实就是：'首页'
                title: util.handleTitle(vm, util.getRouterObjByName(realAppRoutes, 'home_index')), 
                path: '', // 有三个主页路由，用哪个？设为空？？
                name: sessionStorage.getItem("homeName") || 'home_index' //'home_index'
            }
        ];
        // // console.log('-----------------if--------------------------')
        // // console.log(currentPathArr);
        // 如果isOtherRouter为true，则将要前往的路由是otherRouter的子路由，
        // 如果 name.indexOf('_index') >= 0 为真，则将要前往的路由的name可能是home_index、home_index_scenic、ownspace_index、message_index之一
        // 如果name.indexOf('home_') == -1 为真 则将要前往的路由的name中没有home_，只能是ownspace_index、message_index之一，而它们不是otherRouter的子路由
        // 所以条件1和3互斥？？？
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name.indexOf('home_') == -1) {
        // console.log('*****************************************')
        currentPathArr = [{
                title: util.handleTitle(vm, util.getRouterObjByName(realAppRoutes, 'home_index')),
                path: '/home',
                name: sessionStorage.getItem("homeName") || 'home_index' //'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
        // // console.log('-------------------else if------------------------')
        // // console.log(currentPathArr);
    } else {
        // // console.log('-------------------else------------------------')
        // // console.log(realAppRoutes);
        let currentPathObj = realAppRoutes.filter(item => {
            if (item.children.length <= 1) {
                // // console.log(item)
                // // console.log(item.children)
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        // // console.log(currentPathObj)

        //0308-修复浏览器报错
        // 暂时不想看了
        if (currentPathObj != null) {
            if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
                currentPathArr = [{
                    title: '首页',
                    path: '',
                    name: sessionStorage.getItem("homeName") || 'home_index' //'home_index'
                }];
            } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
                currentPathArr = [{
                        title: '首页',
                        path: '/' + sessionStorage.getItem("homeName") || '/home', // '/home'
                        name: sessionStorage.getItem("homeName") || 'home_index' //'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: name
                    }
                ];
            } else {
                let childObj = currentPathObj.children.filter((child) => {
                    return child.name === name;
                })[0];
                currentPathArr = [{
                        title: '首页',
                        path: '/' + sessionStorage.getItem("homeName") || '/home',
                        name: sessionStorage.getItem("homeName") || 'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: currentPathObj.name
                    },
                    {
                        title: childObj.title,
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name
                    }
                ];
            }
        }



    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};


/**
 * 打开新的标签导航
 * 实际作用：
 * 作用分析：
 * @param { Object } vm -- vue全局实例对象
 * @param { String } name -- 将要前往的路由name
 * @param { Object } argu -- 将要前往的路由的params参数
 * @param { Object } query -- 将要前往的路由的query参数
 * 示例： Util.openNewPage(router.app, to.name, to.params, to.query);
 */
util.openNewPage = function(vm, name, argu, query) {
    // debugger
    let pageOpenedList = vm.$store.state.app.pageOpenedList; // 获取 <已打开的标签导航路由列表>
    // console.log(pageOpenedList);
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    /**
     * 循环遍历该路由列表，如果将要前往的路由已经在  <已打开的标签导航路由列表> 中存在，则找到该路由，
     * 并更新该路由的params和query参数，从 <已打开的标签导航路由列表> 删除后再添加更新后的这项（就是更新该项），并存入localStorage的pageOpenedList中
     */
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            // console.log(pageOpenedList[i].name,i)
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            console.log(1);
            break;
        }
        i++;
    }

    /**
     * 如果将要前往的路由还没有在 <已打开的标签导航路由列表> 中，则根据将要前往的路由name，去 <完整的标签导航路由列表> 查找
     */
    if (!tagHasOpened) {
        /**
         * 获取所有的标签导航路由列表，并做过滤遍历
         */
        let ifchildren = (item)=>{
            if(item.children){
                return item.children.some((value)=>{
                   return ifchildren(value);
                });
                // let cNameArr = item.children.map((value) => {
                //     return value.name;
                // });
                // return cNameArr.indexOf(name) !== -1;
            }else{
                return name === item.name;
            }
        };
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            // 如果遍历的某项还有下级路由（即三级路由），则继续遍历三级路由
            // if (item.children) { // item.children 三级路由
            //     // return name === item.children[0].name;
            //     let cNameArr = item.children.map((value) => {
            //         return value.name;
            //     });
            //     // // console.log('**************************************************************')
            //     // // console.log(cNameArr,name);
            //     return cNameArr.indexOf(name) !== -1; // 如果将要前往的路由是该遍历某项（二级路由）的子路由，则返回这个二级路由
            // } else {
            //     return name === item.name;  // 如果将要前往的路由就是该遍历某项（二级路由），则直接返回这个二级路由
            // }
            return ifchildren(item);
        });
        tag = tag[0];
        if (tag) {// 如果从 <完整的标签导航路由列表> 中找到了符合条件的一项
            // console.log(tag);
            //tag = tag.children ? tag.children[0] : tag;

            // if (tag.children) { // 如果将要前往的路由是这项的子路由，则根据name找到这个子路由，存入tag
            //     let tagChildNameArr = tag.children.map((value) => {
            //         return value.name;
            //     });
            //     let ind = tagChildNameArr.indexOf(name);
            //     tag = tag.children[ind];
            // } else { // 否则直接将这项存入tag
            //     tag = tag;
            // }

            let tagobj = {};

            let circletag = (tag)=>{
                tag.children.forEach((value)=>{
                    if(value.children){
                        circletag(value);
                    }else{
                        if(value.name === name){
                            tagobj = value;
                        }
                    }
                });
            };

            if(tag.children){
                circletag(tag);
                tag = tagobj;
            }

            // 更新params和query参数
            if (argu) {
                // console.log(tag);
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            // console.log(tag);
            vm.$store.commit('increateTag', tag);
        }
    }
    // debugger
    vm.$store.commit('setCurrentPageName', name);
};


/**
 * 前往默认页
 * 实际作用：如果将要前往的路由是一级路由，且该一级路由的子路由数量大于0，并且该一级路由没有设定重定向，则替换前往路由为该一级路由的第一个子路由，否则正常跳转。
 * 作用分析：在本项目中没卵用，因为本项目的可点击的菜单都是二级或三级路由，一级路由仅作为菜单分组展示。但可以避免手动在地址栏输入路由后进去的页面为空。
 * @param { Object } routes -- 路由配置对象
 * @param { String } name -- 将要前往的路由name
 * @param { Object } router -- router 实例，即路由器
 * @param { Function } next 用于resolve路由前置守卫
 * 示例： Util.toDefaultPage(routes, to.name, router, next);
 */

util.toDefaultPage = function(routes, name, router, next) {
    // debugger
    // // console.log(routes);
    // // console.log(routes.length);
    let len = routes.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        // // console.log(routes[i].name);
        // // console.log(name);
        if (routes[i].name === name && routes[i].children && routes[i].redirect === undefined) {
            // // console.log(routes[i].name);
            // // console.log(routes[i].children);
            // // console.log(routes[i].redirect);
            // // console.log(router);

            router.replace({
                name: routes[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function(vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};


util.loadingShow = function(vm) {
    vm.$Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'load-c',
                        size: 18
                    }
                }),
                h('div', 'Loading')
            ])
        }
    });
}

util.loadingHide = function(vm) {
    vm.$Spin.hide();
}

util.menuChildAccess = function(item, accessCode) {
    let childrenArr = [];
    childrenArr = item.children.filter(child => {
        if (child.access !== undefined) {
            if (accessCode.indexOf(child.access) != -1) {
                //return child;
                if (child.children && child.children.length > 0) {
                    child.children = util.menuChildAccess(child, accessCode);
                }
                return child;
            }
        } else {
            return child;
        }
    });
    return childrenArr;
}

util.dateFormat = function(type, date) { //type 1日2月   date 默认日期值
        var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        if (date) {
            var ndate = date.replace(/-/g, "/");
            var day = new Date(ndate).getDay();
            var week = date + '(' + days[day] + ')';
            return week;
        }

        var Dt = new Date(),
            y = Dt.getFullYear(),
            m = Dt.getMonth() + 1,
            d = Dt.getDate(),
            w = days[Dt.getDay()];
        var nm = m < 10 ? '0' + m : m,
            nd = d < 10 ? '0' + d : d;
        var ym = y + '-' + nm,
            ymd = y + '-' + nm + '-' + nd + '(' + w + ')';

        return type == 1 ? ymd : ym;
    }
    //新增class
util.addClass = function(obj, cls) {
    var obj_class = obj.className, //获取class的内容；
        blank = (obj_class != '') ? ' ' : ''; //判断获取的class是否为空，如果不为空，则添加空格；
    added = obj_class + blank + cls; //组合原来的class和需要添加的class，中间加上空格；
    obj.className = added; //替换原来的class；
}

//移除class
util.removeClass = function(obj, cls) {
    var obj_class = '' + obj.className + ''; //获取class的内容，并在首尾各加一个空格；'abc    bcd' -> ' abc    bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' '); //将多余的空字符替换成一个空格；' abc    bcd ' -> ' abc bcd '
    removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的class，替换掉首尾加了空格的class  ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格；'bcd ' -> 'bcd'
    obj.className = removed; //替换原来的class；
}

//生成随机uuid
util.uuid = function(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
export default util;