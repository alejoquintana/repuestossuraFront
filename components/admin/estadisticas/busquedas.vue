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
                @click="fetch"> BUSCAR </v-btn>
        </v-col>
        <v-col cols="2">
            <v-btn color="info" block @click="fetchAll">
                TODOS
            </v-btn>
        </v-col>
    </v-row>
      <v-simple-table v-if="searchHistory">
        <thead>
            <tr>
                <th>TERM</th>
                <th>FECHA</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in searchHistory" :key="item.id">
                <td>{{ item.term }}</td>
                <td>{{ item.created_at }}</td>
            </tr>
        </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            year: 0,
            month: 0,
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
        }
    },
    computed:{
        searchHistory(){
            return this.$accessor.stats.getSearchHistory
        },
        years(){
            return this.$accessor.stats.getSearchHistoryYears
        }
    },
    methods:{
        fetch(){
            this.$accessor.stats.fetchSearchHistory({year:this.year,month:this.month})
        },
        fetchAll(){
            this.$accessor.stats.fetchSearchHistory({year:0,month:0})
        }
    },
    async mounted(){
        await this.$accessor.stats.fetchSearchHistoryYears()
        await this.fetch()
    }
}
</script>
