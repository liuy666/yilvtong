<template>
    <div style="width:90%;height:390px;" :id="idName"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'pieChart',
    props : {
        pieData : {
            type : Array
        },
        idName : {
            type : String,
            required : true
        },
        
    },
    data () {
        return {
            pieChart : ''
        };
    },
    watch : {
        
    },
    mounted () {
        this.$nextTick(() => {
            let _this = this;
            let chartDom = document.getElementById(this.idName);
            if(window.innerWidth >= 1200){
                chartDom.style.width = (window.innerWidth - 260 - 54)*0.25 + 'px';
            }else if(window.innerWidth >= 992){
                chartDom.style.width = (window.innerWidth - 260 - 54)*0.5 + 'px';
            }else{
                chartDom.style.width = window.innerWidth - 260 - 54 + 'px';
            }
            this.pieChart = echarts.init(chartDom);
            const option = {
                color : ['#FFD572' , '#939AF6' , '#70DBC6' , '#FE907F' ,'#6DB9FE' , '#67D6AC' , '#FB92F0' , '#55D1FA'],
                title : {
                    text : '门票订单种类',
                    left : 'center',
                    textStyle : {
                        fontSize : 14,
                        fontWeight : 'lighter'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },	    
                series: [
                    {
                        name:'门票订单种类',
                        type:'pie',
                        center: ['50%', '55%'],
                        radius: ['30%', '45%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'outside',
                                formatter : function(params) {
                                    var text = params.name,
                                        len = text.length,
                                        lenHalf = Math.ceil(len / 2);
                                    return len<4 ? text : text.slice(0,lenHalf) + '\n'+ text.slice(lenHalf)
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        labelLine: {
                            show : true
                        },
                        data:this.pieData || [] 
                    }
                ]
            };
            this.pieChart.setOption(option);

            window.addEventListener('resize', function () { 
                let chartDom = document.getElementById(_this.idName);
                if(chartDom){
                    if(window.innerWidth >= 1200){
                        chartDom.style.width = (window.innerWidth - 260 - 54)*0.25 + 'px';
                    }else if(window.innerWidth >= 992){
                        chartDom.style.width = (window.innerWidth - 260 - 54)*0.5 + 'px';
                    }else{
                        chartDom.style.width = window.innerWidth - 260 - 54 + 'px';
                    }
                }
                _this.pieChart.resize();
            });
        });
    }
};
</script>
