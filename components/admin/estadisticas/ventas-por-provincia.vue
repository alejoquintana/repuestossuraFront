<template>
<div>
    <v-row v-if="years">
        <v-col cols="4">
            <v-select label="Año"
                v-model="year"
                :items="years" />
        </v-col>
        <v-col cols="4">
            <v-select label="Mes"
                v-model="month"
                :items="months"
                item-text="month"
                item-value="num"/>
        </v-col>
        <v-col cols="2">
            <v-btn color="success" :disabled="!(year && month)" block
                @click="fetchSalesByStatesAndDate"> BUSCAR </v-btn>
        </v-col>
        <v-col cols="2">
            <v-btn color="info" block @click="fetchSalesByStates">
                TODOS
            </v-btn>
        </v-col>
    </v-row>
    <div class="w-75" v-if="salesByStates && states">
        <v-simple-table>
            <thead>
                <tr>
                    <th>PROVINCIA</th>
                    <th>CANIDAD</th>
                    <th>PORCENTAJE</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stat in salesByStates" :key="stat.id">
                    <td>{{ getStateName(stat.state_id) }}</td>
                    <td>{{ stat.amount }}</td>
                    <td>{{ stat.percentage }} %</td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</div>
</template>

<script>
export default {
    data(){return{
        year:0,
        month:0,
        months: [
                { month: 'Enero', num: '1' },
                { month: 'Febrero', num: '2' },
                { month: 'Marzo', num: '3' },
                { month: 'Abril', num: '4' },
                { month: 'Mayo', num: '5' },
                { month: 'Junio', num: '6' },
                { month: 'Julio', num: '7' },
                { month: 'Agosto', num: '8' },
                { month: 'Septiembre', num: '9' },
                { month: 'Octubre', num: '10' },
                { month: 'Noviembre', num: '11' },
                { month: 'Diciembre', num: '12' },
        ],
    }},
    computed:{
        salesByStates(){
            return this.$accessor.stats.getSalesByStates
        },
        salesByStatesAndDate(){
            return this.$accessor.stats.getSalesByStatesAndDate
        },
        states(){
            return this.$accessor.states.getStates
        },
        years(){
            return this.$accessor.stats.getSalesYears
        }
    },
    methods:{
        getStateName(id){
            let state = this.states.find(st => {
                return st.id == id
            })
            return state.name
        },
        async fetchSalesByStatesAndDate(){
            this.$accessor.setLoading(true)
            await this.$accessor.stats.fetchSalesByStatesAndState({year:this.year, month:this.month})
                .then(()=>{
                    this.$accessor.setLoading(false)
                })

        },
        async fetchSalesByStates(){
            this.$accessor.setLoading(true)
            await this.$accessor.stats.fetchSalesByStates()
                .then(()=>{
                    this.$accessor.setLoading(false)
                })

        },
    },
    async mounted(){
        await this.$accessor.states.fetchStates()
        await this.$accessor.stats.fetchSalesYears()
        await this.$accessor.stats.fetchSalesByStates()
    }
}
</script>
