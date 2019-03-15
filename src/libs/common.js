import Cookies from "js-cookie";
let common = {

};
//获取表格当前页数据并用vuex记录
common.currentPageData = (url, vm, method, plan) => {
    let b = JSON.parse(JSON.stringify(vm.pars));
    let a = '';
    vm.loading = true;
    let arr = vm.$store.state.page.listPagePars;
    if (vm.searchCount === 1) {
        vm.searchCount = 2;
        for (let item of arr) {
            if (item.path == vm.$route.path && item.index == 1) {
                vm.currentIndex = 1;
                vm.pars = item.pars;
                vm.total = item.total;
                break;
            }
        }
    }
    vm.refreshUrlQuery();
    for (let i in vm.urlQuery) {
        if (vm.urlQuery[i] !== '' && vm.urlQuery[i] !== undefined) {
            a += `&${i}=${vm.urlQuery[i]}`
        }
    }
    url = url + '?access_token=' + vm.Cookies.get('token') + a;
    if (method == 'get') {
        return new Promise((resolve, reject) => {
            vm.$http.get(url, { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    if (res.data.code === 200) {
                        let data1 = res.data.data;
                        if (data1) {
                            if (!data1.items) {
                                vm.tableData = []
                            } else {
                                vm.tableData = data1.items
                            }
                            vm.total = data1.totalCount;
                            vm.pars.pageNum = data1.pageSize;
                            if (plan) {
                                vm.colname = vm.colname.slice(0, data1.items[data1.items.length - 1].maxLength + 2);
                                vm.tableData = data1.items.slice(0, data1.items.length - 1);
                            }
                        } else {
                            vm.tableData = [];
                            vm.total = 0
                        }
                        let obj = {
                            path: vm.$route.path,
                            pars: b,
                            index: vm.currentIndex,
                            total: vm.total
                        };
                        // console.log(obj)
                        vm.$store.commit('saveListPagePars', obj); //记录查询条件，页码等
                        vm.currentRowData = {};
                        vm.loading = false;
                        vm.spinShow = false;
                        resolve()
                    } else {
                        vm.$common.showMessageModal(vm, res, 1);
                        vm.loading = false;
                        vm.spinShow = false;
                        reject()
                    }
                })
        })
    } else if (method == 'post' || !method) {
        return new Promise((resolve, reject) => {
            vm.$http.post(url, vm.pars.formDatas, { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    if (res.data.code == 200) {
                        let data1 = res.data.data;
                        if (data1) {
                            if (!data1.items) {
                                vm.tableData = []
                            } else {
                                vm.tableData = data1.items
                            }
                            vm.total = data1.totalCount;
                            vm.pars.pageNum = data1.pageSize;
                            if (plan) {
                                vm.colname = vm.colname.slice(0, data1.items[data1.items.length - 1].maxLength + 2);
                                vm.tableData = data1.items.slice(0, data1.items.length - 1);
                            }
                        } else {
                            vm.tableData = [];
                            vm.total = 0
                        }
                        let obj = {
                            path: vm.$route.path,
                            pars: b,
                            index: vm.currentIndex,
                            total: vm.total
                        };
                        // console.log(obj)
                        vm.$store.commit('saveListPagePars', obj); //记录查询条件，页码等
                        vm.currentRowData = {};
                        vm.loading = false;
                        vm.spinShow = false;
                        resolve()
                    } else {
                        vm.$common.showMessageModal(vm, res, 1);
                        vm.loading = false;
                        vm.spinShow = false;
                        reject()
                    }
                })
        })
    }
};

common.getFormDatasAdd = (vm) => {
    vm.$store.commit('saveListPagePars', { //记录增查改的数据
        path: vm.$route.path,
        formDatas1: vm.formDatas1,
        index: vm.currentIndex,
    });
};

common.chooseTreeNode = (url, vm, data) => { //展开树形控件
    url = vm.baseUrl + url;
    data['access_token'] = vm.Cookies.get('token');
    return vm.$http.get(url, {
        params: data
    })
};

common.addNewData = (url, vm, data, method, noSingle) => { //新增数据保存，成功后关闭页面并跳转到该数据表格
    let str = noSingle ? '&' : '?';
    url = vm.baseUrl + url + str + 'access_token=' + vm.Cookies.get('token');
    return new Promise((resolve, reject) => {
        vm.$http.post(url, data)
            .then(res => {
                if (res.data.code === 200) {
                    vm.$common.showModal(res, vm);
                    // vm.currentRowData = {};
                    vm.btnLoading = false;
                    resolve(1)
                } else {
                    vm.$common.showMessageModal(vm, res, 1);
                    vm.btnLoading = false;
                    reject()
                }
            })
            .catch(error => {
                vm.btnLoading = false;
                vm.$Modal.error({
                    title: "温馨提示",
                    content: "接口异常, 请联系管理人员"
                })
            })
    })
};

common.editData = (url, vm, data, method, noSingle) => { //修改
    let str = noSingle ? '&' : '?';
    url = vm.baseUrl + url + str + 'access_token=' + vm.Cookies.get('token');
    if (method === 'post' || !method) {
        return new Promise((resolve, reject) => {
            vm.$http.post(url, data)
                .then(res => {
                    if (res.data.code === 200) {
                        vm.$common.showModal(res, vm);
                        // vm.currentRowData = {};
                        vm.btnLoading = false;
                        resolve(1)
                    } else {
                        vm.$common.showMessageModal(vm, res, 1);
                        vm.btnLoading = false;
                        reject()
                    }
                })
                .catch(error => {
                    vm.btnLoading = false;
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: "接口异常, 请联系管理人员"
                    })
                })
        })
    } else if (method === 'put') {
        return new Promise((resolve, reject) => {
            vm.$http.put(url, data)
                .then(res => {
                    if (res.data.code === 200) {
                        vm.$common.showModal(res, vm);
                        // vm.currentRowData = {};
                        vm.btnLoading = false;
                        resolve(1)
                    } else {
                        vm.$common.showMessageModal(vm, res, 1);
                        vm.btnLoading = false;
                        reject()
                    }
                })
                .catch(error => {
                    vm.btnLoading = false;
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: "接口异常, 请联系管理人员"
                    })
                })
        })
    } else if (method === 'get') {
        return new Promise((resolve, reject) => {
            vm.$http.get(url, {params: data})
                .then(res => {
                    if (res.data.code === 200) {
                        vm.$common.showModal(res, vm);
                        // vm.currentRowData = {};
                        vm.btnLoading = false;
                        resolve(1)
                    } else {
                        vm.$common.showMessageModal(vm, res, 1);
                        vm.btnLoading = false;
                        reject()
                    }
                })
                .catch(error => {
                    vm.btnLoading = false;
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: "接口异常, 请联系管理人员"
                    })
                })
        })
    }
};

common.showModal = (res, vm) => { //新增修改请求成功或失败之后弹框提示
    let wait = 3;
    let timeOut = () => {
        if (wait > -1) {
            if (wait == 3) {
                setTimeout(() => {
                    vm.$Modal.success({
                        title: `操作成功,${wait}秒后自动关闭`,
                        content: `${vm.tipName}成功，欢迎使用环球雅途易旅通`,
                        onOk: () => {
                            // vm.$common.closePage(vm);
                            wait = -1;
                            return false
                        }
                    });
                    wait--;
                    timeOut()
                }, 1)
            } else if (wait > 0 && wait < 3) {
                setTimeout(() => {
                    vm.$Modal.success({
                        title: `操作成功,${wait}秒后自动关闭`,
                        content: `${vm.tipName}成功，欢迎使用环球雅途易旅通`,
                        onOk: () => {
                            // vm.$common.closePage(vm);
                            wait = -1;
                            return false
                        }
                    });
                    wait--;
                    timeOut()
                }, 1000)
            } else {
                setTimeout(() => {
                    if (vm.isClose === false) {
                        vm.currentIndex = 1
                    } else {
                        vm.$common.closePage(vm);
                    }
                    vm.$Modal.remove();
                }, 1000)
            }
        } else {
            vm.$Modal.remove();
            if (vm.isClose === false) {
                vm.currentIndex = 1
            } else {
                vm.$common.closePage(vm);
            }
        }
    };
    return new Promise(resolve => {
        timeOut();
        resolve()
    })
};

common.closePage = (vm) => { //关闭新增，修改，查看等页面，并跳到所属页面
    vm.$router.go(-1);
    // let pageOpenedList = vm.$store.state.app.pageOpenedList;
    // let lastPageObj = pageOpenedList[0];
    // let belongRouterArr = vm.$store.state.page.belongRouterArr;
    // if (belongRouterArr.length > 0) { //浏览器无刷新，从哪来回哪去
    //     for (let obj of belongRouterArr) {
    //         if (obj.routerName === vm.$route.name) {
    //             for (let item of pageOpenedList) {
    //                 if (item.name === obj.belongRouterName) {
    //                     vm.$common.linkTo(vm, item, pageOpenedList);
    //                     break;
    //                 }
    //             }
    //             break;
    //         }
    //     }
    // } else { //浏览器刷新，回到页面数组的上一个
    //     let len = pageOpenedList.length;
    //     for (let i = 1; i < len; i++) {
    //         if (pageOpenedList[i].name === vm.$route.name) {
    //             if (i < (len - 1)) {
    //                 lastPageObj = pageOpenedList[i + 1];
    //             } else {
    //                 lastPageObj = pageOpenedList[i - 1];
    //             }
    //             break;
    //         }
    //     }
    //     vm.$common.linkTo(vm, lastPageObj, pageOpenedList)
    // }
};

common.linkTo = (vm, item, pageOpenedList) => {   //移除Vuex中路由数组中对应路由并跳转
    vm.$store.commit('removeTag', vm.$route.name);
    vm.$store.commit('closePage', vm.$route.name);
    pageOpenedList = vm.$store.state.app.pageOpenedList;
    localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    // vm.$router.push({ name: item.name, params: item.argu });
    vm.$router.go(-1);
};

common.getCurrentDate = (date, AddDayCount) => { //获取年月日转化格式,AddDayCount传1，为明天，-1为昨天
    let [myDate, year, month, day] = ['', '', '',''];
    if (date) {
        myDate = new Date(date)
    } else {
        myDate = new Date()
    }
    if (AddDayCount !== undefined) {
        myDate.setDate(myDate.getDate() + AddDayCount);
    }
    day = myDate.getDate();
    month = myDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return `${myDate.getFullYear()}-${month}-${day}`
};

common.getCurrentDate1 = (date,AddDatCount) =>{//上一周，上一个月
    let [myDate,lastday,firstday] = ['', '', ''],
         arr = [];
    if (date) {
        myDate = new Date(date)
    } else {
        myDate = new Date()
    }
    let today = myDate.getDay(),
        tomonth = myDate.getMonth();
    let getMyDate = (myDate)=>{
        let [month, day] = ['',''];
        day = myDate.getDate();
        month = myDate.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        myDate = `${myDate.getFullYear()}-${month}-${day}`;
        return myDate
    };
    switch(AddDatCount){
        case -2:
            if(today){
                myDate.setDate(myDate.getDate() - today);
                lastday = getMyDate(myDate);
                myDate.setDate(myDate.getDate() - 6);
                firstday = getMyDate(myDate);
            }else{
                myDate.setDate(myDate.getDate() - 7);
                lastday = getMyDate(myDate);
                myDate.setDate(myDate.getDate() - 14);
                firstday = getMyDate(myDate);
            }
            break;
        case -3:
            myDate.setDate(0);
            lastday = getMyDate(myDate);
            myDate.setDate(1);
            firstday = getMyDate(myDate);
            break;
        case -4://这个是为了返回本月的最后一天
            myDate.setMonth(myDate.getMonth()+1);
            myDate.setDate(0);
            lastday = getMyDate(myDate);
            firstday = getMyDate(myDate);
        default:
            firstday = myDate;
            lastday = myDate;
            break;
    }

    arr[0] = lastday;
    arr[1] = firstday;
    return arr;

}

common.getCurrentTime = (time) => { //获取年月日转化格式
    let [myTime, hour, minute] = ['', '', ''];
    console.log(time);
    myTime = new Date(time);
    hour = myTime.getHours();
    minute = myTime.getMinutes();
    if (hour < 10) {
        hour = `0${hour}`
    }
    if (minute < 10) {
        minute = `0${minute}`
    }
    return `${hour}:${minute}`
};

common.getScenicList = (vm, index, hasAll) => { //获取景区服务商下拉列表 (公用)
    return new Promise((resolve, reject) => {
        vm.$http.get(vm.baseUrl + '/ticket/provider/v1/getScenicProviderByServerName', {
                params: {
                    access_token: vm.Cookies.get('token'),
                    url: window.location.hostname,
                }
            })
            .then(res => {
                if (res.data.code === 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption["value"] = element.iscenicid;
                        oneOption["label"] = element.szscenicname;
                        options.push(oneOption);
                    });
                    if (options.length === 1 && options[0].value === 0) {
                        vm.$common.showMessageModal(vm, '该景区企业下暂无服务商，请先创建服务商', 2);
                        vm.spinShow = false;
                        resolve(0)
                    } else {
                        if (hasAll) {
                            // vm.formItemList[index].optionList = options;
                            resolve(options)
                        } else {
                            options.shift();
                            // vm.formItemList[index].optionList = options;
                            resolve(options)
                        }
                    }
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false;
                }
            })
    });
};

common.getProductInfoByScenicId = (vm, iscenicid, index, url) => { //根据服务商id获取票、产品列表
    return new Promise((resolve, reject) => {
        let obj = {};
        if (url) {
            url = vm.baseUrl + '/ticket/combinationTicket/v1/getComposeProductByScenicId';
            obj = {
                access_token: vm.Cookies.get('token'),
                scenicId: iscenicid
            }
        } else {
            url = vm.baseUrl + '/ticket/ticket/v1/getProductInfoByScenicId';
            obj = {
                access_token: vm.Cookies.get('token'),
                iscenicid: iscenicid
            }
        }
        vm.$http.get(url, {
                params: obj
            })
            .then(res => {
                if (res.data.code == 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption['value'] = element.itickettypeid;
                        oneOption['label'] = element.sztickettypename;
                        options.push(oneOption);
                    });
                    // vm.formItemList[index].optionList = options;
                    resolve(options)
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    })
};

common.getSelectItem = (url, vm, index, value, label, hasAll, parentId, val) => { //获取下拉列表(注意，如果需要根据某个id获取下拉列表，则传parentId和val)
    let obj = { access_token: vm.Cookies.get('token') };
    if (parentId) {
        obj[parentId] = val
    }
    return new Promise((resolve, reject) => {
        vm.$http.get(url, {
                params: obj
            })
            .then(res => {
                if (res.data.code == 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption["value"] = element[value];
                        oneOption["label"] = element[label];
                        options.push(oneOption);
                    });
                    if (hasAll) {
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    } else {
                        options.shift();
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    }
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    })
};

common.getHotel = (vm, index, hasAll) => { //获取酒店下拉列表 (公用)
    return new Promise((resolve, reject) => {
        vm.$http.get(vm.baseUrl + '/ticket/provider/v1/getHotelName', {
            params: {
                access_token: vm.Cookies.get('token'),
                url: window.location.hostname
            }
        })
            .then(res => {
                if (res.data.code === 200) {
                    let options = [];
                    res.data.data.forEach(element => {
                        let oneOption = {};
                        oneOption["value"] = element.iscenicid;
                        oneOption["label"] = element.szscenicname;
                        options.push(oneOption);
                    });
                    if (hasAll) {
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    } else {
                        options.shift();
                        // vm.formItemList[index].optionList = options;
                        resolve(options)
                    }
                } else {
                    vm.$Modal.error({
                        title: "温馨提示",
                        content: res.data.msg
                    });
                    vm.spinShow = false
                }
            })
    });
};

common.addOrsubtractRow = (num, index, keyName, vm) => { //新增修改增加减少行
    let i = '';
    for (let j = 0; j < vm.formItemList1.length; j++) {
        if (vm.formItemList1[j].keyName == keyName) {
            i = j;
            break;
        }
    }
    if (num === 1) {
        if (vm.formItemList1[i].colList.length > 1) {
            vm.formDatas1[keyName].splice(index, 1);
            vm.formItemList1[i].colList.splice(index, 1)
        } else {
            vm.$Modal.warning({
                title: '温馨提示您',
                content: '至少保留一条选项'
            })
        }
    } else {
        let obj = {};
        for (let k in vm.formDatas1[keyName][0]) {
            obj[k] = ''
        }
        vm.formDatas1[keyName].push(obj);
        vm.formItemList1[i].colList.push(vm.formItemList1[i].colList[0])
    }
};

common.showMessageModal = (vm, res, type) => { //对话框提示,1为错误,2为警告
    if (type === 1) {
        if (typeof res === 'object') {
            vm.$Modal.error({
                title: "温馨提示",
                content: res.data.msg
            });
        } else {
            vm.$Modal.error({
                title: "温馨提示",
                content: res
            });
        }
    } else if (type === 2) {
        vm.$Modal.warning({
            title: "温馨提示",
            content: res
        });
    } else if (type === 3) {
        vm.$Modal.success({
            title: "温馨提示",
            content: res
        });
    }
};

// common.getMainHeight = (vm) => { //获取单页高度
//     // let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
//     // vm.elHeight = `${h - 100 -36}px`; //减100因为顶部为100固定高,36为margin
// };

common.toTreeData = (data) => { //一维数组转树形结构
    function tree(idutyid) {
        let arr = [];
        data.filter(item => {
            return item.iparentid === idutyid
        }).forEach(item => {
            arr.push({
                id: item.idutyid,
                title: item.szdutyname,
                checked: item.checked,
                expand: true,
                children: tree(item.idutyid)
            })
        });
        return arr
    }
    return tree(0) // 第一级节点的父id，是null或者0，视情况传入
};

common.validateDate = (vm,start,end) => {
    if (Date.parse(start) > Date.parse(end)) {
        vm.$common.showMessageModal(vm, '起始日期不能大于结束日期', 2);
        return 0
    } else {
        return 1
    }
};

common.getParsBeforeSearch = (vm) => {   //记录表格查询之前的条件
    let arr = vm.$store.state.page.listPagePars;
    for (let item of arr) {
        if (item.path == vm.$route.path && item.index == 1) {
            vm.pars = JSON.parse(JSON.stringify(item.pars));
            break;
        }
    }
};

common.emptyObj = (obj)=>{
    for (let key in obj){
        if(!obj[key]&&obj[key]!==0&&obj[key]!=='0'){
            delete obj[key];
        }

        if(key.indexOf('Time') > -1 && obj[key]){
            try{
                obj[key] = common.getCurrentDate(obj[key]);
            }
            catch (e) {
                // throw new Error(e);
            }

        }
    }
};

common.downloadGZIP = (params,downloadURI)=>{
    let newInput = (name,value)=>{
        let input1=$("<input>");
        input1.attr("type","hidden");
        input1.attr("name",name);
        input1.attr("value",value);
        form.append(input1);
    };
    let form=$("<form>");//定义一个form表单
    form.attr("style","display:none");
    form.attr("target","");
    form.attr("method","get"); //请求类型
    form.attr("action",downloadURI); //请求地址
    for(let key in params){
        newInput(key,params[key]);
    }
    newInput('access_token',Cookies.get('token'));
    $("body").append(form);//将表单放置在web中
    form.submit();
};

common.changeDisabledEndDate = (val,disabledEnd,disabledEndDate)=>{
    let time = 0;
    disabledEnd = Date.parse(val);
    // time = Math.floor((new Date().getTime() - disabledEnd)/86400000);
    // time = time > 29 ? 29 : time;
    disabledEndDate = [-1,0];
    return {disabledEnd,disabledEndDate}
};

common.fmt = (fmt, timeStamp)=> {
    let date = new Date(timeStamp);
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        's+': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (0[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

export default common;
