<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col :span="24">
                <Row :gutter="10">
                    <Col v-for="(item,index) in this.infoObjArr" :key="index" :xs="24" :sm="12" :md="12" :lg="6" :style="{marginBottom: '10px'}">
                        <info-divs :info-obj="item"></info-divs>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row>
            <Col :span="24" :style="{marginBottom: '15px'}">
                <Card>
                    <div class="chart-area bar">
                        <div style="position:absolute; right:20px;top:20px;z-index:10;">
                            <button class="date-change-btn days" :class="isChoose_day_bar ? 'on':'' " @click="changeType">七日</button>
                            <button class="date-change-btn months" :class="isChoose_month_bar ? 'on':'' " @click="changeType">每月</button>
                        </div>
                        <Tabs :animated="false" ><!-- @on-click="elChange" -->
                            <TabPane label="门票" name="1">
                                <Row>
                                    <Spin fix v-if="spinShow">
                                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                    <Col :xs="24" :sm="24" :md="12" :lg="18">
                                        <div style="height:410px;">
                                            <bar-chart
                                                v-if="barflag"
                                                :x-axis-data="bar_xAxisData"
                                                :chart-data="bar_chartData_ticket"
                                                :id-name="'bar_chart_ticket'"
                                                :default-index="barIndex_default"
                                                :choose-index="barClickIndex_ticket"
                                                @barClickEvent="barClickEvent"
                                                @clearClickIndex="clearClickIndex"
                                            ></bar-chart>
                                        </div>
                                    </Col>
                                    <Col :xs="24" :sm="24" :md="12" :lg="6">
                                        <div class="data-sort">
                                            <h1>景区门票销售排名</h1>
                                            <ul class="sortList ticket">
                                                <div v-if="sortData_ticket.length == 0" style="text-align:center;line-height: 300px;font-size: 18px;">暂无排名信息</div>
                                                <li v-else v-for="(item,index) in sortData_ticket" :key="index">
                                                    <div class="sortIcon fl" :class="index==0?'one':index==1?'two':index==2?'three':''">{{index+1}}</div>
                                                    <span class="sortName" :title="item.name">{{item.SZSCENICNAME}}</span>
                                                    <span class="fr">{{item.NUMS}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <!--<TabPane label="酒店" name="2">
                                <Row>
                                    <Spin fix v-if="spinShow">
                                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                    <Col :xs="24" :sm="24" :md="12" :lg="18">
                                        <div style="height:410px;">  
                                            <bar-chart
                                                v-if="barflag"
                                                :x-axis-data="bar_xAxisData"
                                                :chart-data="bar_chartData_hotel"
                                                :id-name="'bar_chart_hotel'"
                                                :default-index="barIndex_default"
                                                :choose-index="barClickIndex_hotel"
                                                @barClickEvent="barClickEvent"
                                                @clearClickIndex="clearClickIndex"
                                            ></bar-chart>
                                        </div>
                                    </Col>
                                    <Col :xs="24" :sm="24" :md="12" :lg="6">
                                        <div class="data-sort">
                                            <h1>景区酒店销售排名</h1>
                                            <ul class="sortList hotel">
                                                <div v-if="sortData_hotel.length == 0" style="text-align:center;line-height: 300px;font-size: 18px;">暂无排名信息</div>
                                                <li v-else v-for="(item,index) in sortData_hotel" :key="index">
                                                    <div class="sortIcon fl" :class="index==0?'one':index==1?'two':index==2?'three':''">{{index+1}}</div>
                                                    <span class="sortName" :title="item.SZSCENICNAME">{{item.SZSCENICNAME}}</span>
                                                    <span class="fr">{{item.NUMS}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>-->
                        </Tabs>
                    </div>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col :span="24" :style="{marginBottom: '50px'}">
                <Card>
                    <div class="chart-area line">
                        <div style="position:absolute; right:20px;top:20px;z-index:10;">
                            <button class="date-change-btn days" :class="isChoose_day_line ? 'on':'' " @click="changeType">七日</button>
                            <button class="date-change-btn months" :class="isChoose_month_line ? 'on':'' " @click="changeType">每月</button>
                        </div>
                        <p slot="title" style="height:50px;border-bottom: 1px solid #dddee1;padding:8px 16px;font-size:16px;font-weight:bold;margin-bottom:16px;">
                            旅游卡订单数据
                        </p>
                        <Row>
                            <Col :xs="24" :sm="24" :md="12" :lg="18">
                                <div style="height:410px;">
                                    <Spin fix v-if="spinShow_line">
                                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                    <line-chart
                                        v-if="lineflag"
                                        :x-axis-data="line_xAxisData"
                                        :all-data="line_chartData"
                                        :id-name="'line_chart_center'"
                                        :color-list="colorList"
                                        :legend-list="legendList"
                                        :default-index="lineIndex_default"
                                        @lineClickEvent="lineClickEvent"
                                    ></line-chart>
                                </div>
                            </Col>
                            <Col :xs="24" :sm="24" :md="12" :lg="6">
                                <div class="data-sort detail fr">
                                    <div class="detail-total">
                                        <div style="color:#000;line-height:35px;font-weight:bold;font-size:16px;">{{currentDate}}</div>
                                        <div style="line-height:40px;">旅游卡当前订单数 <span class="totalNum">{{currentTotalNum}}</span>单</div>
                                        <div v-if="currentType_line == 1" style="line-height:35px;height:35px;"></div>
                                        <div v-else style="line-height:35px;">
                                            同比上月{{compareData[0]}}
                                            <span :class="compareData[1]">{{rate}}</span> 
                                            <img :src="compareData[2] == 1 ? icon1 : compareData[2] == 2 ? icon2 : icon3">
                                        </div>
                                    </div>
                                    <div class="detail-option fl">
                                        <span class="optionNum orderNum">{{orderNum}}</span>
                                        旅游卡入园订单总数
                                    </div>
                                    <div class="fl" style="border-left: 1px solid #f0f0f0;height: 65px;margin: 30px 0;"></div>
                                    <div class="detail-option fl">
                                        <span class="optionNum userNum">{{userNum}}</span>
                                        旅游卡绑定用户总数
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import infoDivs from './components/info-divs.vue';
import barChart from './components/barChart.vue';
import lineChart from './components/lineChart.vue';
import util from '@/libs/util.js';

export default {
    name: 'home',
    components: {
        infoDivs,
        barChart,
        lineChart
    },
    data () {
        return {
            infoObjArr : [
                // {
                //     titleName : '景区服务商',
                //     titleDec : '智慧景区管理系统景区服务商统计',
                //     total : 0,
                //     total1 : 0,
                //     total2 : 0,
                //     isTwo : true,
                //     noteNum : 1
                // },
                // {
                //     titleName : '商铺数量 (酒店、旅行社、超市)',
                //     titleDec : '智慧景区管理系统商铺开户商统计',
                //     total : 0,
                //     total1 : 0,
                //     total2 : 0,
                //     isTwo : true,
                //     noteNum : 2
                // },
                // {
                //     titleName : '总用户数',
                //     titleDec : '总用户数为 (团体、散客、导游、接待) 数据',
                //     total : 0,
                //     noteNum : 3
                // },
                // {
                //     titleName : '电商网站访问量',
                //     titleDec : '电商网站为 (易旅宝景区网站数据)',
                //     total : 0,
                //     day : 0,
                //     isImg : true,
                //     noteNum : 4
                // }
                {
                    total : 0,
                    dec : '企业数量',
                    noteNum : 1
                },
                {
                    total : 0,
                    dec : '景区服务商数量',
                    noteNum : 2
                },
                {
                    total : 0,
                    dec : '分销商数量',
                    noteNum : 3
                },
                {
                    total : 0,
                    dec : '用户数量',
                    noteNum : 4
                },
            ],
            bar_xAxisData : [],
            bar_chartData_ticket : [],
            bar_chartData_hotel : [],
            barIndex_default:6,//默认蓝色下标  type为1时为6 type为2时为11 
            barClickIndex_ticket:-1,//用于记录当前选中柱状下标 绘制图表将对应下标柱状绘制为蓝色，绘制完图表后清空为-1
            barClickIndex_hotel:-1,
            barClickIndex_ticket_old:-1,//用于门票酒店切换时 查询前一个选中的日期的排名情况(记录选中下标)
            barClickIndex_hotel_old:-1,
            isEnd:false,//用于标记柱状数据请求是否完成
            isSortRequested:false, //用于标记排名数据请求是否完成
            barflag : false, //用于控制柱状图表是否绘制  在柱状数据请求完成后绘制
            lineflag : false,
            //spinShow : true,
            isChoose_day_bar : true,
            isChoose_month_bar : false,
            isChoose_day_line : true,
            isChoose_month_line : false,
            currentType_bar :1,//记录柱状图区域当前的日期类型 1为日2为月
            currentType_line : 1,//记录折线图图区域当前的日期类型 1为日2为月
            currentTab:1, //记录当前展示门票/酒店  1为门票2为酒店
            sortData_ticket : [],
            sortData_hotel : [],
            //折线图部分
            colorList : ['#66B6FF','#F86B4F'],
            legendList : ['旅游卡绑定用户数','旅游卡入园订单数'],
            spinShow_line : true,
            lineIndex_default:6,
            line_xAxisData : [],
            line_chartData : [],
            //旅游卡订单详情部分
            orderNum : 0,
            userNum : 0,
            currentDate : '',
            currentTotalNum : 0,
            currentNum : 0,
            oldNum : 0,
            icon1 : require("../../images/home/zengzhang.png"),
            icon2 : require("../../images/home/chiping.png"),
            icon3 : require("../../images/home/xiajiang.png")
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        },
        spinShow () {
            if(this.isEnd && this.isSortRequested)
                return false
            else return true
        },
        compareData () {
            let dValue = this.currentNum - this.oldNum;
            let classText = dValue > 0 ? "增长" : dValue == 0 ? "持平" : "下降",
                className = dValue > 0 ? "up" : dValue == 0 ? "ping" : "down" ,
                imgSrc = dValue > 0 ? 1 : dValue == 0 ? 2 : 3;
            let compare = [classText,className,imgSrc];
            return compare;
        },
        rate () { 
            let upOrDown = '';
            let dValue = this.currentNum - this.oldNum;
            if(this.oldNum == 0){
                upOrDown = this.currentNum > 0 ? '+' + dValue*100 + '%' : '±' + dValue*100 + '%';
            }else{
                let upOrDownNum = ((Math.abs(dValue)/this.oldNum)*100).toFixed(2);
                upOrDown = dValue > 0 ? ' +'+upOrDownNum+'%' : dValue == 0 ? ' ±'+upOrDownNum+'%' : ' -'+upOrDownNum+'%';
            }
            return upOrDown;
        }
    },
    methods: {
        //请求详情数据
        getInfoDatas () {
            return new Promise(resolve => {
                this.$http.get(this.baseUrl+'/sys/homePage/v1/getIndexMessageInfo',{
                    params: {
                        access_token: this.Cookies.get('token')
                    }
                })
                .then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        // this.infoObjArr[0].total = data[0];
                        // this.infoObjArr[0].total1 = data[1];
                        // this.infoObjArr[0].total2 = data[2];
                        // this.infoObjArr[1].total = data[3];
                        // this.infoObjArr[1].total1 = data[4];
                        // this.infoObjArr[1].total2 = data[5];
                        // this.infoObjArr[2].total = data[6];
                        // this.infoObjArr[3].total = data[7];
                        // this.infoObjArr[3].day = data[8];
                        if(data.length>0){
                            this.infoObjArr[0].total = data[9];
                            this.infoObjArr[1].total = data[0];
                            this.infoObjArr[2].total = data[10];
                            this.infoObjArr[3].total = data[6];
                            this.infoObjArr = Object.assign({}, this.infoObjArr);
                        }
                        
                        resolve();
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                })
            })
        },
        //请求柱状图数据
        getBarDatas (type) { //type 1为日2为月 
            let _this = this;
            //记录正在请求的状态  正在请求是isEnd为false,请求完成后isEnd为true
            this.isEnd = false;
            this.barflag = false;
            //this.spinShow = true;

            let defaultDays = type == 1 ? 6 : 11;
            return new Promise(resolve => {
                this.$http.get(this.baseUrl+'/sys/homePage/v1/getIndexTicketMessageInfo',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        type: type,
                        num : defaultDays
                    }
                })
                .then(res => {
                    if (res.data.code === 200) {
                        let xAxisArr = [], nxAxisArr = [], ticketData = [] , hotelData = [];
                        xAxisArr = res.data.data[0].split(',').reverse();
                        xAxisArr.splice(0,1);
                        if(type == 1){ 
                            xAxisArr.forEach(v => {
                                let nv = util.dateFormat(type,v);
                                nxAxisArr.push(nv);
                            })
                        }else{
                            nxAxisArr = xAxisArr;
                        }
                        this.bar_xAxisData = nxAxisArr;
                        ticketData = res.data.data[2].split(',').reverse();
                        hotelData = res.data.data[1].split(',').reverse();
                        ticketData.splice(0,1);
                        hotelData.splice(0,1);
                        this.bar_chartData_ticket = ticketData;
                        this.bar_chartData_hotel = hotelData;

                        this.isEnd = true;
                        this.barflag = true;
                        //this.spinShow = false;

                        
                        resolve();
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                })
            })
            
        },
        //请求门票/酒店排名数据
        getSortDatas (type,el,date) { //el 1门票2酒店
            this.isSortRequested = false;
            let _this = this;
            let defaultDate = '';
            if(!date){
                defaultDate = util.dateFormat(type);
                defaultDate = type == 1 ? defaultDate.slice(0,defaultDate.indexOf('(')) : defaultDate;
            } else{
                date = type == 1 ? date.slice(0,date.indexOf('(')) : date;
            }
            var tickettype = el == 1 ? '01' : '06';
            return new Promise(resolve => {
                this.$http.get(this.baseUrl+'/sys/homePage/v1/getIndexTicketRankingInfo',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        ticketType: tickettype,
                        time : date || defaultDate,
                        timeType : type,
                        num : 7
                    }
                })
                .then(res => {
                    if (res.data.code === 200) {
                        if(res.data.data && res.data.data.length>0){
                            if(el==1){
                                _this.sortData_ticket = [];
                                res.data.data.forEach(v=>{
                                    _this.sortData_ticket.push(v);
                                });
                            }else{
                                _this.sortData_hotel = [];
                                res.data.data.forEach(v=>{
                                    _this.sortData_hotel.push(v);
                                });
                            }
                            resolve();
                        }else{
                            if(el==1){
                                _this.sortData_ticket = [];
                            }else{
                                _this.sortData_hotel = [];
                            } 
                        }
                        _this.isSortRequested = true;
                        //_this.barClickIndex_hotel_ticket = -1;
                        //_this.barClickIndex_hotel_old = -1;
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                })
            })
        },
        //请求折线图数据
        getLineDatas (type) {
            let _this = this;
            this.lineflag = false;
            this.spinShow_line = true;

            let defaultDays = type == 1 ? 6 : 11;
            return new Promise(resolve => {
                this.$http.get(this.baseUrl+'/sys/homePage/v1/travelInfo',{
                    params: {
                        access_token: this.Cookies.get('token'),
                        type: type,
                        num : defaultDays
                    }
                })
                .then(res => { 
                    if (res.data.code === 200) {
                        let data = res.data.data;
                        let xAxisArrL = [], nxAxisArrL = [], dataArr1 = [] , dataArr2 = [] , old = [] , allOrderData = [];
                        xAxisArrL = data[0].split(",").reverse();
                        dataArr1 = data[1].split(",").reverse(); //用户数
                        dataArr2 = data[2].split(",").reverse(); //订单数
                        xAxisArrL.splice(0,2);
                        dataArr1.splice(0,2);
                        dataArr2.splice(0,2);
                        let dataArrAll = [dataArr1,dataArr2];
                        if(type == 1){ 
                            xAxisArrL.forEach(v => {
                                let nv = util.dateFormat(type,v);
                                nxAxisArrL.push(nv);
                            })
                        }else{
                            nxAxisArrL = xAxisArrL;
                        }
                        
                        _this.line_xAxisData = nxAxisArrL;
                        _this.line_chartData = [];
                        for(let i=0;i<2;i++){
                            let lineObj = {};
                            lineObj["name"] = _this.legendList[i];
                            lineObj["data"] = dataArrAll[i];
                            _this.line_chartData.push(lineObj);
                        }

                        //将订单数的整体数据存起来，方便点击时取对应值展示右侧详情
                        allOrderData = data[2].split(",").reverse();
                        allOrderData.splice(0,1); //去掉第一个空元素
                        sessionStorage.setItem("all",allOrderData.join(","));
                        sessionStorage.setItem("lineXAxis",nxAxisArrL.join(","));

                        //设置右侧用户数和订单数的总数
                        _this.orderNum = data[4];
                        _this.userNum = data[3];

                        _this.spinShow_line = false;
                        _this.lineflag = true;

                        _this.setOrderDetail(type,defaultDays-1);

                        resolve();
                    } else {
                        this.$common.showMessageModal(this, res, 1);
                    }
                })
            })
        },
        //设置订单详情的数据
        setOrderDetail (type,index) {
            let allOrderData = sessionStorage.getItem("all").split(','),
			    xAxis = sessionStorage.getItem("lineXAxis").split(','),
                text = type == 1 ? "一天" : "月";
            this.currentDate = xAxis[index];
            this.currentTotalNum = parseInt(allOrderData[index+1]);
            this.currentNum = parseInt(allOrderData[index+1]);
            this.oldNum = parseInt(allOrderData[index]);
        },
        //日/月 日期type切换
        changeType (event) {
            let currentClass = event.target.className;
            let parentAreaClass = event.target.parentNode.parentNode.className;
            let type = (currentClass.indexOf("days") != -1) ? 1 : 2;
            let isBar = (parentAreaClass.indexOf("bar") != -1) ? true : false; //true为柱状图区域 false为折线图区域
            if(this.isEnd){
                if(isBar){
                    this.barIndex_default = type == 1 ? 6 : 11;
                    this.currentType_bar = type;
                    this.isChoose_day_bar = type == 1 ? true : false;
                    this.isChoose_month_bar = type == 2 ? true : false;
                    this.getBarDatas(type);
                    this.getSortDatas(type,this.currentTab);

                }else{
                    this.lineIndex_default = type == 1 ? 6 : 11;
                    this.currentType_line = type;
                    this.isChoose_day_line = type == 1 ? true : false;
                    this.isChoose_month_line = type == 2 ? true : false;
                    this.getLineDatas(type)
                }
                this.barClickIndex_ticket_old = -1;
                this.barClickIndex_hotel_old = -1;
            }else{
                this.$common.showMessageModal(this, "正在请求中，请稍等", 2);
            }
        },
        //门票/酒店切换
        elChange (name) {
            this.currentTab = parseInt(name);
            if(this.barClickIndex_hotel_old != -1 || this.barClickIndex_ticket_old != -1){
                let date = '';
                date = this.currentTab == 1 ? this.bar_xAxisData[this.barClickIndex_ticket_old] : this.bar_xAxisData[this.barClickIndex_hotel_old];
                if(!date) {
                    date = this.currentType_bar == 1 ? this.bar_xAxisData[6] : this.bar_xAxisData[11];
                }
                if(this.currentType_bar == 1){
                    date = date.slice(0,date.indexOf("("));
                }
                this.getSortDatas(this.currentType_bar,this.currentTab,date);
            }else{
                this.getSortDatas(this.currentType_bar,this.currentTab);
            }
            
        },
        barClickEvent (index,chartIdName) { 
            let date = this.bar_xAxisData[index];
            //date = this.currentType_bar == 1 ? date.slice(0,date.indexOf("(")) : date;
            
            if(chartIdName == "bar_chart_ticket") {
                this.barClickIndex_ticket = index;
                this.barClickIndex_ticket_old = index;
                this.barClickIndex_hotel_old = -1;
            }
            else{
                this.barClickIndex_hotel = index;
                this.barClickIndex_hotel_old = index;
                this.barClickIndex_ticket_old = -1;
            }
            this.getBarDatas(this.currentType_bar);
            this.getSortDatas(this.currentType_bar,this.currentTab,date);
        },
        clearClickIndex () {
            this.barClickIndex_ticket = -1;
            this.barClickIndex_hotel = -1;
        },
        lineClickEvent (index){
            this.setOrderDetail(this.currentType_line,index);
        }
    },
    created () {
        this.getInfoDatas();
        this.getBarDatas(1);
        this.getSortDatas(1,1);
        this.getLineDatas(1);
    },
    mounted () {

    }
};
</script>
