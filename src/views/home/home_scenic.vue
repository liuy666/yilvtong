<style lang="less">
    @import "./home.less";
</style>
<style lang="less">
    #scenic-spot-info{
        display: none;
        width: 100%;
        // height: 140px;
        background: rgb(255, 255, 255);
        padding: 30px 20px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 16px;
    }
    .scenic-info, .scenic-people{
        width:100%;
        font-size: 16px;
    }
    .scenic-people{
        text-align : right;
    }
    .scenic-people div{
        text-align: center;
        padding: 0 40px;
    }
    .scenic-people div:first-child {
        border-right: 1px solid #f0f0f0;
    }
    .scenic-img{
        width: 80px;
        height: 80px;
        /* background: #000; */
        border-radius: 40px;
        margin-right: 20px;
        /* background: url(./images/home/touxiang_two.png) no-repeat center 30%; */
        background-image: url(../../images/home/touxiang_two.png);
        background-repeat: no-repeat;
        background-position: center 30%;
    }
    .scenic-info .info{
        color: #969696;
        font-size: 12px;
    }
    .func-content.nav{
        overflow: hidden;
    }
    .navs-list {
        overflow: hidden;
    }
    .navs-list li{
        float: left;
        width: 32.5%;
        line-height: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .navs-list li span:hover{
        color:#5db2ff;
    }
    .photo-url {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
</style>
<template>
    <div class="home-main">
        <Row>
            <Col :span="24" :style="{marginBottom: '15px'}">

                <div id="scenic-spot-info" style="display: block;">
                    <Row>
                    <Col :xs="12" :sm="12" :md="12" :lg="12">
                        <div class="fl  scenic-info">
                            <div class="fl scenic-img">
                                <img :src="photoUrl" alt="" class="photo-url">
                            </div>
                            <div class="fl" style="width: calc(100% - 100px);">
                                <span>你好，{{currentUser}}，欢迎使用环球雅途智慧景区系统！</span>
                                <div class="info"><span class="scenic-name">{{info.scenicName}}</span>管理员 | 营业时间：<span class="office-hours">{{info.officeHours}}</span></div>
                            </div>
                        </div>
                    </Col>
                    <Col :xs="12" :sm="12" :md="12" :lg="12">
                        <div class="fr scenic-people">
                            <div class="i-b">企业员工数<br><span class="staff-num">{{info.totalNum}}</span></div>
                            <div class="i-b">景区在园人数<br><span class="guest-num">{{info.lastNum}}</span></div>
                        </div>
                    </Col>
                    </Row>
                </div>
                
            </Col>
        </Row>

        <!-- <Row :gutter="15">
            <Col :xs="24" :sm="24" :md="24" :lg="16" >
                <Card>
                    <p slot="title">营销功能</p>
                    <Row :gutter="10">
                        <Col v-for="(item,index) in this.linkObjArr1" :key="index" :xs="24" :sm="12" :md="8" :lg="8" :style="{marginBottom: '10px'}">
                            <link-area :link-obj="item"></link-area>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <p slot="title">服务功能</p>
                    <Row :gutter="10">
                        <Col v-for="(item,index) in this.linkObjArr2" :key="index" :xs="24" :sm="12" :md="8" :lg="8" :style="{marginBottom: '10px'}">
                            <link-area :link-obj="item"></link-area>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col :xs="24" :sm="24" :md="24" :lg="8" >
                <Card>
                    <p slot="title">便捷导航</p>
                    <div class="func-content nav">
                        <ul class="navs-list">
                            <li v-for="(item,index) in navList" :key="index"  @click="goToNav(item.navUrl,item.params)" ><span style="cursor: pointer;">{{item.navName}}</span></li>
                        </ul>
                    </div>
                </Card>
                <Card :style="{marginTop: '10px'}">
                    <p slot="title">景区服务系统下载</p>
                    <div class="func-content system">
                        <download-area :down-load-list="downloadList_system" :is-system="true"></download-area>
                    </div>
                </Card>
                <Card>
                    <p slot="title">APP下载</p>
                    <div class="func-content">
                        <download-area :down-load-list="downloadList_app" :is-system="false"></download-area>
                    </div>
                </Card>
            </Col>
        </Row> -->
        <Row :gutter="15">
            <Col :xs="24" :sm="24" :md="12" :lg="12" >
                <Card>
                    <p slot="title">营销功能</p>
                    <Row :gutter="10">
                        <Col v-for="(item,index) in this.linkObjArr1" :key="index" :xs="24" :sm="24" :md="24" :lg="12" :style="{marginBottom: '10px'}">
                            <link-area-new :link-obj="item"></link-area-new>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12" >
                <Card>
                    <p slot="title">服务推荐</p>
                    <Row :gutter="10">
                        <Col v-for="(item,index) in this.linkObjArr2" :key="index" :xs="24" :sm="24" :md="24" :lg="12" :style="{marginBottom: '10px'}">
                            <link-area-new :link-obj="item"></link-area-new>
                        </Col>
                    </Row>
                </Card>
            </Col>

        </Row>

        <Row>
            <Col :span="24" :style="{marginTop: '15px',marginBottom:'15px'}">
                <Card>
                    <p slot="title" >景区门票实时数据</p>
                    <div class="chart-area line" style="height:410px;">                        
                        <Spin fix v-if="spinShow_line">
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>Loading</div>
                        </Spin>
                        <line-chart
                            v-if="lineflag"
                            :x-axis-data="line_xAxisData"
                            :all-data="line_chartData"
                            :id-name="'line_chart_scenice'"
                            :color-list="colorList"
                            :legend-list="legendList"
                            :is-scenic="true"
                        ></line-chart>
                    </div>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col :span="24" :style="{marginBottom: '15px'}">
                <Card>
                    <p slot="title">景区门票数据统计</p>
                    <div class="chart-area bar">
                        <div style="position:absolute; right:20px;top:10px;z-index:10;">
                            <button class="date-change-btn days" :class="isChoose_day ? 'on':'' " @click="changeType">七日</button>
                            <button class="date-change-btn months" :class="isChoose_month ? 'on':'' " @click="changeType">每月</button>
                        </div>
                        
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="18">
                                <div style="height:410px;">
                                    <Spin fix v-if="spinShow_bar">
                                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                    <bar-chart
                                        v-if="barflag"
                                        :x-axis-data="bar_xAxisData"
                                        :chart-data="bar_chartData"
                                        :id-name="'bar_chart_scenic'"
                                        :default-index="barIndex_default"
                                        :choose-index="barClickIndex"
                                        @barClickEvent="barClickEvent"
                                        @clearClickIndex="clearClickIndex"
                                    ></bar-chart>
                                </div>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6">
                                <div class="data-sort" style="padding:10px 0;">
                                    <pie-chart
                                        v-if="pieflag"
                                        :pie-data="pie_chartData"
                                        :id-name="'pie_chart_scenic'"
                                    ></pie-chart>
                                    <div v-if="pie_chartData.length==0" class='message' style='text-align:center;width: 100%;line-height: 300px;font-size: 18px;position: absolute;top: 0;'>暂无相关数据</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col :span="24" :style="{marginBottom: '50px'}">
                <Card>
                    <p slot="title">景区服务系统下载</p>
                    <Row :gutter="10">
                        <Col v-for="(item,index) in this.downloadList_system" :key="index" :xs="24" :sm="24" :md="12" :lg="6" :style="{marginBottom: '10px'}">
                            <download-area :down-obj="item" :is-new="true" :is-system="true"></download-area>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import linkArea from './components/link-area.vue';
import linkAreaNew from './components/link-area-new.vue';
import downloadArea from './components/download-area.vue';
import barChart from './components/barChart.vue';
import lineChart from './components/lineChart.vue';
import pieChart from './components/pieChart.vue';
import util from '@/libs/util.js';

export default {
    name: 'home',
    components: {
        linkArea,
        linkAreaNew,
        downloadArea,
        barChart,
        lineChart,
        pieChart
    },
    data () {
        return {
            currentUser: JSON.parse(sessionStorage.getItem('user')),
            info: {
                scenicName: '',
                officeHours: '8:00 - 18:00',
                totalNum: 0,
                lastNum: 0
            },
            linkObjArr1: [
                {
                    title: '景区PC官网',
                    dec: '景区宣传及门票销售',
                    url: window.location.host + '/#/index_home',
                    noteNum: 1,
                    imgLink: true
                },
                {
                    title: '移动微商城',
                    dec: '多渠道联合销售',
                    url: window.location.host + window.location.pathname + '#/scenic-mobile/scenic-micro-mall',
                    noteNum: 2,
                    imgLink: true
                },
                {
                    title: '扫码购',
                    dec: '扫码支付快捷方便',
                    url: 'base-ticket',
                    noteNum: 3,
                    imgLink: true
                }
            ],
            linkObjArr2: [
                {
                    title: '环球汇通交易结算系统',
                    dec: '统一支付，安全可靠',
                    url: 'https://www.upaypal.cn/',
                    noteNum: 1
                },
                {
                    title: '智慧旅游监管系统',
                    dec: '多级一体，多级联动',
                    url: 'http://sem.hqyatu.com:8899/login.action',
                    noteNum: 2
                },
                /* {
                    title:'易旅通目的地分销平台',
                    dec:'统一发码，统一管理',
                    url:'http://www.yilvtour.com/security/login.do',
                    noteNum : 3
                }, */
                {
                    title: '车无忌智慧停车系统',
                    dec: '一键预约，智慧停车',
                    url: 'http://www.parkingfree.cn',
                    noteNum: 4
                }

            ],
            navList: [
                {
                    navUrl: 'enterprise-management',
                    navName: '企业管理'
                },
                {
                    navUrl: 'base-ticket',
                    navName: '基础票'
                },
                {
                    navUrl: 'article-manage',
                    navName: '网站信息管理',
                    params: {
                        id: 0
                    }
                },
                {
                    navUrl: 'distributor-manage',
                    navName: '分销商管理'
                },
                {
                    navUrl: 'order-search',
                    navName: '预定订单查询'
                }
            ],
            downloadList_system: [
                {
                    iconNum: 1,
                    systemName: '',
                    versionNum: '',
                    packageName: ''
                },
                {
                    iconNum: 2,
                    systemName: '',
                    versionNum: '',
                    packageName: ''
                },
                {
                    iconNum: 3,
                    systemName: '',
                    versionNum: '',
                    packageName: ''
                },
                {
                    iconNum: 4,
                    systemName: '',
                    versionNum: '',
                    packageName: '',
                    isSM: true
                }
            ],
            downloadList_app: [
                {
                    appImgNum: 1,
                    appName: '易旅宝',
                    appDec: '出行好帮手'
                },
                {
                    appImgNum: 2,
                    appName: '智慧监管',
                    appDec: '智慧旅游监管系统'
                },
                {
                    appImgNum: 3,
                    appName: '环球汇通',
                    appDec: '让旅行更简单'
                }
            ],
            // 折线图相关
            spinShow_line: true,
            lineflag: false,
            line_xAxisData: [],
            line_chartData: [],
            colorList: ['#54A0F8', '#FE907F', '#67D6AC', '#FFD572', '#939AF6', '#FB92F0', '#55D1FA', '#70DBC6', '#6DB9FE'],
            legendList: [],
            // 柱状图相关
            isChoose_day: true,
            isChoose_month: false,
            spinShow_bar: true,
            barflag: false,
            bar_xAxisData: [],
            bar_chartData: [],
            barIndex_default: 6,
            barClickIndex: -1,
            currentType_bar: 1,
            // 饼状图
            isPieEnd: false,
            pieflag: false,
            pie_chartData: []
        };
    },
    computed: {
        photoUrl () {
            return sessionStorage.getItem('photoURL');
        }
    },
    methods: {
        // 获取景区相关信息
        async getScenicInfo () {
            await this.$http.get(this.baseUrl + '/sys/homePage/v1/companyEmployeeNum?access_token=' + this.Cookies.get('token'))
                .then(res => {
                    if (res.data.code == 200) {
                        this.info['totalNum'] = res.data.data.totalNum;
                    }
                });
            await this.$http.get(this.baseUrl + '/sys/homePage/v1/providerInfo?access_token=' + this.Cookies.get('token'))
                .then(res => {
                    if (res.data.code == 200) {
                        this.info['scenicName'] = res.data.data.szscenicname;
                        this.info['officeHours'] = res.data.data.businesshours ? res.data.data.businesshours : '8:00 - 18:00';
                    }
                });
            await this.$http.get(this.baseUrl + '/sys/homePage/v1/visitorNumInGarden?access_token=' + this.Cookies.get('token'))
                .then(res => {
                    if (res.data.code == 200) {
                        this.info['lastNum'] = res.data.data.lastNum;
                    }
                });
            this.info = Object.assign({}, this.info);
        },
        // 获取系统下载部分的系统详情
        getDownLoadInfo () {
            let _this = this;
            this.$http.get(this.baseUrl + '/sys/homePage/v1/getSysparJsonByCode', {
                params: {
                    access_token: this.Cookies.get('token'),
                    pmky: 'HQYT',
                    pmcd: '0008'
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.data && res.data.data.pmvb) {
                            let first = res.data.data.pmvb.split(';'),
                                second = res.data.data.pmvc.split(';'),
                                third = res.data.data.pmvd.split(';'),
                                force = res.data.data.pmve.split(';');
                            let arr = [first, second, third, force];
                            for (let i = 0; i < 4; i++) {
                                _this.downloadList_system[i].systemName = arr[i][0];
                                _this.downloadList_system[i].versionNum = arr[i][1];
                                _this.downloadList_system[i].packageName = arr[i][2];
                            }
                        } else {
                            this.$common.showMessageModal(this, '请在系统设置中配置相关的系统参数', 1);
                        }
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                });
        },
        // 请求折线图数据
        getLineDatas () {
            let _this = this;
            this.lineflag = false;
            this.spinShow_line = true;

            return new Promise(resolve => {
                this.$http.get(this.baseUrl + '/sys/homePage/v1/realTimeSellData', {
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                })
                    .then(res => {
                        if (res.data.code === 200) {
                            let times = [], ticketTypes = [], allDatas = [];
					    res.data.data.forEach(function (value, index) {
                                let seriesObj = {}, oneTypeData = [];

                                ticketTypes.push(value.name); // 门票的种类

                                value.data.forEach(function (obj, ind) {
                                    if (index == 0) {
                                        times.push(obj.time); // 时间段数组
                                    }
                                    oneTypeData.push(obj.num); // 一个门票类型的所有时段的数据
                                });

                                seriesObj['name'] = value.name;
                                seriesObj['type'] = 'line';
                                seriesObj['data'] = oneTypeData;
                                allDatas.push(seriesObj);
                            });
                            _this.line_xAxisData = times;
                            _this.line_chartData = allDatas;
                            _this.legendList = ticketTypes;

                            _this.spinShow_line = false;
                            _this.lineflag = true;

                            resolve();
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                        }
                    });
            });
        },
        // 请求柱状图数据
        getBarDatas (type) { // type 1为日2为月
            let _this = this;
            // 记录正在请求的状态  正在请求是isEnd为false,请求完成后isEnd为true
            this.isEnd = false;
            this.barflag = false;
            this.spinShow_bar = true;

            let defaultDays = type == 1 ? 6 : 11;
            return new Promise(resolve => {
                this.$http.get(this.baseUrl + '/sys/homePage/v1/periodSaleData', {
                    params: {
                        access_token: this.Cookies.get('token'),
                        type: type
                    }
                })
                    .then(res => {
                        if (res.data.code === 200) {
                            let barxAxis = [], barData = [], nBarxAxis = [];
                            res.data.data.forEach(function (value, index) {
                                barxAxis.unshift(value.date);
                                barData.unshift(value.num);
                            });
                            if (type == 1) {
                                barxAxis.forEach(v => {
                                    let nv = util.dateFormat(type, v);
                                    nBarxAxis.push(nv);
                                });
                            } else {
                                nBarxAxis = barxAxis;
                            }
                            _this.bar_xAxisData = nBarxAxis;
                            _this.bar_chartData = barData;

                            this.isEnd = true;
                            this.barflag = true;
                            this.spinShow_bar = false;

                            resolve();
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                        }
                    });
            });
        },
        // 请求饼图数据
        getPieDatas (type, date) {
            this.isPieEnd = false;
            this.pieflag = false;
            let _this = this;
            let defaultDate = '';
            if (!date) {
                defaultDate = util.dateFormat(type);
                defaultDate = type == 1 ? defaultDate.slice(0, defaultDate.indexOf('(')) : defaultDate;
            } else {
                date = type == 1 ? date.slice(0, date.indexOf('(')) : date;
            }
            return new Promise(resolve => {
                this.$http.get(this.baseUrl + '/sys/homePage/v1/periodTypeWeight', {
                    params: {
                        access_token: this.Cookies.get('token'),
                        type: type,
                        date: date || defaultDate
                    }
                })
                    .then(res => {
                        if (res.data.code === 200) {
                            if (res.data.data && res.data.data.length > 0) {
                                let dataArr = [];
                                res.data.data.forEach(function (value, index) {
                                    let obj = {};
                                    obj['name'] = value.name;
                                    obj['value'] = value.num;
                                    dataArr.push(obj);
                                });
                                _this.pie_chartData = dataArr;
                                resolve();
                            } else {
                                _this.pie_chartData = [];
                            }
                            _this.isPieEnd = true;
                            _this.pieflag = true;
                        } else {
                            this.$common.showMessageModal(this, res, 1);
                        }
                    });
            });
        },
        // 柱状图点击事件
        barClickEvent (index, chartIdName) {
            let date = this.bar_xAxisData[index];
            // date = this.currentType_bar == 1 ? date.slice(0,date.indexOf("(")) : date;
            this.barClickIndex = index;
            this.getBarDatas(this.currentType_bar);
            this.getPieDatas(this.currentType_bar, date);
        },
        clearClickIndex () {
            this.barClickIndex = -1;
        },
        // 日/月 日期type切换
        changeType (event) {
            let currentClass = event.target.className;
            let parentAreaClass = event.target.parentNode.parentNode.className;
            let type = (currentClass.indexOf('days') != -1) ? 1 : 2;
            let isBar = (parentAreaClass.indexOf('bar') != -1); // true为柱状图区域 false为折线图区域
            if (this.isEnd) {
                this.currentType_bar = type;
                this.barIndex_default = type == 1 ? 6 : 11;
                this.isChoose_day = type == 1;
                this.isChoose_month = type == 2;
                this.getBarDatas(type);
                this.getPieDatas(type);
            } else {
                this.$common.showMessageModal(this, '正在请求中，请稍等', 2);
            }
        },
        // 便捷导航点击跳转
        goToNav (navRouter, parmas) {
            if (navRouter != '') {
                if (parmas) {
                    this.$router.push({
                        name: navRouter,
                        params: parmas
                    });
                } else {
                    this.$router.push({
                        name: navRouter
                    });
                }
            } else {
                this.$common.showMessageModal(this, '暂无对应导航', 2);
            }
        }

    },
    created () {
        this.getScenicInfo();
        this.getDownLoadInfo();
        this.getLineDatas();
        this.getBarDatas(1);
        this.getPieDatas(1);

        let _this = this;
        setInterval(function () {
            var d = new Date();
            var m = d.getMinutes();
            if ((m > 0 && m <= 5) || (m > 30 && m <= 35)) {
                _this.getLineDatas();
            }
        }, 300000);
    }
};
</script>
