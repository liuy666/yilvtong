let handleTools = {

    /**
     * 格式化标准时间为字符串格式
     * @param {string} date -- 待格式化的日期字符串
     * @return {string} newDate --  格式化后的日期字符串 yyyy-mm-dd
     */
    formatDate(date) {
    	if(date instanceof Date) {
            let year = date.getFullYear(),
                month = ('0' + (date.getMonth() + 1)).slice(-2),
                day = ('0' + date.getDate()).slice(-2),
                newDate = year + '-' + month + '-' + day;
            return newDate;
        } else {
            return date;
        }
    },

    /**
     * 对象深拷贝
     * @param {object} source -- 源对象  
     * @return {string} sourceCopy -- 拷贝后返回的对象 
     */
    objDeepCopy(source) {
        let sourceCopy = {};
        for (let attr in source) {
            sourceCopy[attr] = source[attr];
        }
        return sourceCopy;
    },

    /**
     * 数组对象深拷贝
     * @param {object} source -- 源数组  
     * @return {string} newArray -- 拷贝后返回的数组
     */
    arrayObjDeepCopy(source) {
        let newArray = [].concat(JSON.parse(JSON.stringify(source)));
        return newArray;
    },

    /**
     * 从数组中查找给定值，找到返回true，否则返回false
     */
    isExist(id,array) {
        if(array.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }
    }

};

export default handleTools;