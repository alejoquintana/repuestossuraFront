<template>
    <v-row>
        <v-col v-if="dataList" cols="6"> 
            <v-simple-table class="table table-striped">
                <thead>
                    <th>AÑO</th>
                    <th>MES</th>
                    <th>REGISTROS</th>
                    <th>LOCAL</th>
                    <th>FACEBOOK</th>
                </thead>
                <tbody>
                    <tr v-for="dataRow in dataList" :key="`${dataRow.year}-${dataRow.month}`" 
                            @click="selected = dataRow"
                            class="cursor-pointer"
                            :class="{'selected':selected == dataRow}">
                        <td>{{dataRow.year}}</td>
                        <td>{{dataRow.month}}</td>
                        <td>{{dataRow.n}}</td>
                        <td>{{dataRow.local}}</td>
                        <td>{{dataRow.facebook}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
        <v-col v-else cols="6">
            CARGANDO...
        </v-col>
        <v-col cols="6" class="mt-4" v-if="selected">
            <daily :year="selected.year" :month="selected.month" :key="`daily-${selected.year}-${selected.month}`"></daily>
        </v-col>
    </v-row>
</template>

<script>
import daily from './daily.vue';
export default {
    components:{daily},
    data() {
        return {
            selected:null,
            dataList : null
        }
    },
    mounted(){
        this.$axios.get('/users-monthly')
            .then(r => {
                //console.log('usersmonthly api response',r.data)
                this.dataList = r.data 
            })
    }
}
</script>

<style lang="scss" scoped>
    .selected{
        background-color: #0000eecc !important;
    }

</style>
