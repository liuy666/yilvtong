<template>
    <div style="width:100%;height:410px;" :id="idName"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'lineChart',
    props : {
        xAxisData : {
            type : Array
        },
        allData : {
            type : Array
        },
        defaultIndex : {
            type : Number
        },
        idName : {
            type : String,
            required : true
        },
        colorList : {
            type : Array
        },
        legendList : {
            type : Array
        },
        isScenic : {
            type : Boolean
        }
    },
    data () {
        return {
            lineChart : ''
        };
    },
    mounted () {
        this.$nextTick(() => {
            let _this = this;
            //let barChart = echarts.init(document.getElementById(this.idName));
            let chartDom = document.getElementById(this.idName);
            let w1 = this.isScenic ? 1 : 0.75,
                w2 = this.isScenic ? 1 : 0.5;
            if(window.innerWidth >= 1200){
                chartDom.style.width = (window.innerWidth - 260 - 54)*w1 + 'px';
            }else if(window.innerWidth >= 992){
                chartDom.style.width = (window.innerWidth - 260 - 54)*w2 + 'px';
            }else{
                chartDom.style.width = window.innerWidth - 260 - 54 + 'px';
            }
            this.lineChart = echarts.init(chartDom);

            let ind = this.defaultIndex;
            let seriesArr = []; 
            this.allData.forEach(v => {
                let obj = {
                    name:v.name,
                    type:'line',
                    stack: '总量1',
                    symbol : 'circle',
                    symbolSize : 8,
                    itemStyle : {
                        borderColor : '#fff',
                        borderWidth : 2,
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 8
                    },
                    data:v.data || []
                }
                seriesArr.push(obj);
            });
            
            let gap = _this.isScenic ? 20 : 90;
            let isboundaryGap = _this.isScenic ? false : true;
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            
                        type : 'shadow'   
                    }
                },
                legend: {
                    left : 20,
                    itemGap : gap,
                    selectedMode : false,
                    data:this.legendList || []
                },
                color : this.colorList,
                grid: {
                    left: '1%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap:isboundaryGap,
                    data: this.xAxisData || []
                },
                yAxis: {
                    type: 'value'
                },
                series : seriesArr
            };
            this.lineChart.setOption(option);

            this.lineChart.getZr().on('click',function(params){ 
			    
                var pointInPixel= [params.offsetX, params.offsetY];
                if (_this.lineChart.containPixel('grid',pointInPixel)) {
                    var xIndex=_this.lineChart.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0]; 
                    //事件处理代码书写位置
                    _this.$emit('lineClickEvent',xIndex);
                }
            })

            window.addEventListener('resize', function () { 
                let chartDom = document.getElementById(_this.idName);
                if(chartDom){
                    if(window.innerWidth >= 1200){
                        chartDom.style.width = (window.innerWidth - 260 - 54)*w1 + 'px';
                    }else if(window.innerWidth >= 992){
                        chartDom.style.width = (window.innerWidth - 260 - 54)*w2 + 'px';
                    }else{
                        chartDom.style.width = window.innerWidth - 260 - 54 + 'px';
                    }
                }
                _this.lineChart.resize();
            });
        });
    }
};
</script>
