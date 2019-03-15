<template>
    <div style="width:100%;height:410px;" :id="idName"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'barChart',
    props : {
        xAxisData : {
            type : Array
        },
        chartData : {
            type : Array
        },
        defaultIndex : {
            type:Number,
            required:true
        },
        chooseIndex : {
            type : Number, //1为日 2为月
            required : true
        },
        idName : {
            type : String,
            required : true
        },
        
    },
    data () {
        return {
            barChart : '',
            currentIndex : ''
        };
    },
    watch : {
        
    },
    mounted () {
        this.$nextTick(() => {
            let _this = this;
            //let barChart = echarts.init(document.getElementById(this.idName));
            let chartDom = document.getElementById(this.idName);
            if(window.innerWidth >= 1200){
                chartDom.style.width = (window.innerWidth - 260 - 54)*0.75 + 'px';
            }else if(window.innerWidth >= 992){
                chartDom.style.width = (window.innerWidth - 260 - 54)*0.5 + 'px';
            }else{
                chartDom.style.width = window.innerWidth - 260 - 54 + 'px';
            }
            this.barChart = echarts.init(chartDom);

            let ind = this.chooseIndex != -1 ? this.chooseIndex : this.defaultIndex;
            const option = {
                color : '#EEEEEE',
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top : '12%',
                    left: '1%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.xAxisData || [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '订单数量'
                    }
                ],
                series : [
                    {
                        name:'订单数量',
                        type:'bar',
                        barWidth: '60%',
                        itemStyle : {
                            normal : {
                                color : function(params){
                                    if (params.dataIndex  == ind) {
                                        return '#5DB2FF'
                                    }
                                    else{
                                        return '#EEEEEE'
                                    }
                                }
                            },
                            emphasis : {
                                color : 'rgba(93,178,255,0.7)'
                            }
                            
                        },
                        label : {
                            normal : {
                                show : true,
                                position : 'top'
                            },
                            emphasis : {
                                color : 'rgba(93,178,255,0.7)'
                            }
                        },
                        data: this.chartData || []
                    }
                ]
            };
            this.barChart.setOption(option);
            this.$emit('clearClickIndex');

            this.barChart.on('click',function(param){ 
                let ind = param.dataIndex;
                _this.currentIndex = ind;
                _this.$emit('barClickEvent',ind,_this.idName)
            })

            window.addEventListener('resize', function () { 
                let chartDom = document.getElementById(_this.idName);
                if(chartDom){
                    if(window.innerWidth >= 1200){
                        chartDom.style.width = (window.innerWidth - 260 - 54)*0.75 + 'px';
                    }else if(window.innerWidth >= 992){
                        chartDom.style.width = (window.innerWidth - 260 - 54)*0.5 + 'px';
                    }else{
                        chartDom.style.width = window.innerWidth - 260 - 54 + 'px';
                    }
                }
                _this.barChart.resize();
            });
        });
    }
};
</script>
