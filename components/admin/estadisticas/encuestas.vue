<template>
<div>
    <v-row>
        <v-col cols="3">
            <v-btn color="success" block class="mt-2 bold"
            @click="fetchSurveyStats({year:0,month:0})">
                TODO
            </v-btn>
            <div v-for="year in years" :key="year">
                <div v-for="index in 12" :key="index">
                    <v-btn color="info" block class="mt-2 bold"
                    @click="fetchSurveyStats({year:year,month:index})">
                        {{months[index-1]}} {{year}}
                    </v-btn>
                </div>
            </div>
        </v-col>
        <v-col cols="9" v-if="surveyStats && surveys">
            <pie-chart v-if="fetched" :chartdata="chartdata"
                       :options="options" />
            <v-simple-table class="mt-4">
                <tbody class="bg-secondary">
                    <tr v-for="stat in surveyStats" :key="stat.opt">
                        <td>{{stat.opt}}</td>
                        <td>{{stat.amount}}</td>
                        <td>{{stat.percentage}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
            <v-simple-table class="mt-4">
                <tbody class="bg-secondary">
                    <tr v-for="survey in surveys" :key="survey.id">
                        <td class="w-20">{{survey.option}}</td>
                        <td>{{survey.comment}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
    </v-row>
</div>
</template>

<script>
import PieChart from './ellipse-chart.js'

export default {
    components: {
        PieChart
    },
    data(){return{
        months: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
        fetched:true,
        options:{
            responsive: true,
            maintainAspectRatio: false,
        }
    }},
    computed: {
        years(){
            return this.$accessor.stats.getSurveyStatsYears
        },
        surveyStats(){
            return this.$accessor.stats.getSurveyStats
        },
        surveys(){
            return this.$accessor.stats.getSurveys
        },
        chartdata(){
            if (this.surveyStats) {
                let labels = []
                let data = []
                let backgroundColor = []
                let bgC = {
                    "Facebook":"#3b5998",
                    "Google":"#DB4437",
                    "Me lo recomendo un/a amigo/a":"#F4B400",
                    "Otro":"#ccc"
                }
                this.surveyStats.forEach(stat => {
                    labels.push(stat.opt)
                    data.push(stat.amount)
                    backgroundColor.push(bgC[stat.opt])
                });
                return {labels:labels,datasets:[{data: data,backgroundColor: backgroundColor}]}
            }
            return []

        }
    },
    methods: {
        async fetchSurveyStats(date){
            this.fetched = false
            this.$accessor.setLoading(true)
            await this.$accessor.stats.fetchSurveyStatByDate(date)
            await this.$accessor.stats.fetchSurveysByDate(date)
            .then( () => {
                this.fetched = true
                this.$accessor.setLoading(false)
            })
        }
    },
    async mounted(){
        await this.$accessor.stats.fetchSurveyStatsYears()
        await this.$accessor.stats.fetchSurveyStatByDate({year:0,month:0})
        await this.$accessor.stats.fetchSurveysByDate({year:0,month:0})
    }
}
</script>

<style lang="scss" scoped>

</style>
