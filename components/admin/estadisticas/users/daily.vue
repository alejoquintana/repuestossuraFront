
<template>
    <div>
        <div v-if="dataList">
            <h2>{{month}} - {{year}}</h2>
            <v-simple-table class="table mt-4 table-striped">
                <thead>
                    <th>DIA</th>
                    <th>REGISTROS</th>
                    <th>LOCAL</th>
                    <th>FACEBOOK</th>
                </thead>
                <tbody>
                    <tr v-for="dataRow in dataList" :key="`${dataRow.year} - ${dataRow.month} - ${dataRow.day}`">
                        <td>{{dataRow.day}}</td>
                        <td>{{dataRow.n}}</td>
                        <td>{{dataRow.local}}</td>
                        <td>{{dataRow.facebook}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>
        <div v-else>
            CARGANDO...
        </div>
    </div>
</template>

<script>
export default {
    props:['year','month'],
    data() {
        return {
            selected:null,
            dataList : null
        }
    },
    mounted(){
        this.$axios.get(`/users-daily/${this.year}/${this.month}`)
            .then(r => {
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
