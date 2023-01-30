<template>
<div>
    <v-row v-if="stats">
        <v-col cols="6" v-for="stat in stats" :key="stat.year">
            <chart :chartdata="chartData(stat.salesData)" :options="options" :styles="styles"/>
        </v-col>
    </v-row>
</div>
</template>

<script>
import chart from './chart.js'
export default {
    components:{
        chart
    },
    data(){return{
        labels: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic', ],
        styles : {
            height: '300px',
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        reverse: false,
                        beginAtZero: true
                    }
                }]
            }
        }
    }},
    computed:{
        stats(){
            return this.$accessor.stats.getSalesChart
        },
    },
    methods:{
        chartData(salesData){
            return {labels: this.labels, datasets: salesData}
        }
    },
    mounted(){
        this.$accessor.stats.fetchSalesChart()
    }
}
</script>
