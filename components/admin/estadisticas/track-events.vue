<template>
    <div>
        <v-row v-if="fetched && trackEventStats">
            <v-col cols="8" v-for="byYear in trackEventStats" :key="byYear.year">
                {{byYear.year}}
                <line-chart :chartdata="{labels:labels,datasets:byYear.eventsData}"
                            :options="options"
                            :styles="styles" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LineChart from './chart.js'
export default {
    components:{LineChart},
    data(){
        return{
            labels: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],       
            fetched:false,
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
        };
    },
    computed:{
        trackEventStats(){return this.$accessor.trackEvents.getTrackEvents;},
    },
    methods:{
        
        },
    async mounted(){
        this.$store.commit('setLoading',true);
        await this.$accessor.trackEvents.fetchTrackEvents();
        this.fetched = true;
        this.$store.commit('setLoading',false);
    }
}
</script>


<style lang="scss" scoped>
</style>
