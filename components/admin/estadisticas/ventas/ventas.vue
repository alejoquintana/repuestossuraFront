<template>
<div>
   <!--  <select v-model="retiro_id" class="form-control" v-if="retiro_options && !selected" @change="retiroChanged" >
        <option :value="null">TODO</option>
        <option :value="point.id" v-for="point in retiro_options" :key="point.id" >
            {{point.name}}
        </option>
    </select> -->
    <div class="mt-4" v-if="stats"> 
        <div v-if="!selected">
            <v-simple-table class="table table-striped text-center" :key="retiro_id">
                <thead>
                    <th>MES</th>
                    <th>PEDIDOS</th>
                    <th v-if="isSuper">SIN EDITAR</th>
                    <th v-if="isSuper">EDITADO</th>
                    <th v-if="isSuper">DIFERENCIA</th>
                    <th v-if="isSuper" colspan="2">PAGADOS</th>
                    <th v-if="isSuper" colspan="2">ENVIADOS</th>
                </thead>
                <tbody>
                    <tr v-for="(reg,key) in stats" :key="key" class="clickable" :class="{'selected':selected==reg}" @click="selected=reg">
                        <td>{{months[reg.dmonth-1]}} {{reg.dyear}}</td>
                        <td>{{reg.cantidad}}</td>
                        <td v-if="isSuper">${{reg.original_total/100|price}}</td>
                        <td v-if="isSuper">${{reg.edited_total/100|price}}</td>
                        <td v-if="isSuper">${{(reg.original_total - reg.edited_total)/100|price}}</td>
                        <td v-if="isSuper">{{reg.c_pagados}}</td>
                        <td v-if="isSuper">${{reg.pagados/100 |price}}</td>
                        <td v-if="isSuper">{{reg.c_enviados}}</td>
                        <td v-if="isSuper">${{reg.enviados/100 |price}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>

        <div class="col-12" v-if="selected" >
            <statsmont @goback="selected = null" 
                    :key="selected.dyear+'-'+selected.dmonth" 
                    :year="selected.dyear" 
                    :month="selected.dmonth">
            </statsmont>
        </div>
       
    </div>
    <div v-else>Cargando informacion...</div>
</div>    
</template>


<script>
import statsmont from './month.vue';
/* import statsday from './daily.vue'; */

export default {
    components:{statsmont},
    data(){
        return{
            retiro_id:null,
            display:'month',
            selected:null,
            months: [
                'ENERO','FEBRERO','MARZO',
                'ABRIL','MAYO','JUNIO',
                'JULIO','AGOSTO','SEPTIEMBRE',
                'OCTUBRE','NOVIEMBRE','DICIEMBRE',
            ]
        }
    },
    methods:{
        async retiroChanged(){
            //this.$store.commit('stats/setRetiroId',this.retiro_id);
            this.$accessor.setLoading(true)
            await this.$accessor.stats.fetchSales()
            this.$accessor.setLoading(false)
        },
    },
    computed:{
        /* retiro_options(){
            return this.$accessor.getters['shop/getRetiroOptions']
        }, */
        stats(){
            return this.$accessor.stats.getSales
        },
        isSuper(){
            return (this.user.role_id == 1 );
        },
        user(){
            return this.$auth.user
        },
    },
    async mounted(){
       await this.$accessor.stats.fetchSales()
       //await this.$accessor.shop.fetchRetiroOptions()
    }
}
</script>


<style scoped>
.selected{
    background-color:#00f6!important;
}
</style>
