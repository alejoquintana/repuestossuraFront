<template>
<div>
    <div class="row mt-4" v-if="stats">
        <div class="col-12" v-if="!selected">
            <v-simple-table class="table-striped text-center">
                <thead>
                    <th>MES</th>
                    <th v-if="isSuper">PRIMEROS</th>
                    <th v-if="isSuper">$ PRIMEROS</th>
                    <th v-if="isSuper">OTROS</th>
                    <th v-if="isSuper">$ OTROS</th>
                    <th>TOTAL</th>
                    <th>$ TOTAL</th>
                </thead>
                <tbody>
                    <tr v-for="(reg,key) in stats" :key="key" class="clickable"
                        :class="{'selected':selected==reg}">
                        <td>{{months[reg.dmonth-1]}} {{reg.dyear}}</td>
                        <td>{{reg.ufo_cantidad}}</td>
                        <td>${{reg.ufo_total/100|price}}</td>
                        <td>{{reg.nufo_cantidad}}</td>
                        <td>${{reg.nufo_total/100|price}}</td>
                        <td>{{parseInt(reg.ufo_cantidad)+parseInt(reg.nufo_cantidad)}}</td>
                        <td>${{(parseInt(reg.ufo_total)+parseInt(reg.nufo_total))/100|price}}</td>
                       </tr>
                </tbody>
            </v-simple-table>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            display:'month',
            selected:null,
            months:[
                'ENERO',
                'FEBRERO',
                'MARZO',
                'ABRIL',
                'MAYO',
                'JUNIO',
                'JULIO',
                'AGOSTO',
                'SEPTIEMBRE',
                'OCTUBRE',
                'NOVIEMBRE',
                'DICIEMBRE'
            ]
        }
    },
    computed: {
        stats(){
            return this.$accessor.stats.getUFOstats
        },
        isSuper(){
            return (this.user.role_id == 1 );
        },
        user(){
            return this.$auth.user
        },
    },
    methods: {

    },
    mounted(){
        this.$accessor.stats.fetchUFOstats()
    }
}
</script>
