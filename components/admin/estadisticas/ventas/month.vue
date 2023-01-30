<template>
    <div>
        <v-btn color="primary" @click="$emit('goback')">VOLVER</v-btn>
        <h3 class="mt 4">{{month}} / {{year}}</h3>
        
        <div class="mt-4">
            <monthGraph :year="year" :month="month"/>
        </div>

        <div class="mt-4 mb-4">
            <!-- <select v-model="retiro_id" class="form-control" v-if="retiro_options" @change="retiroChanged">
                <option :value="null">TODO</option>
                <option :value="point.id" v-for="point in retiro_options" :key="point.id" >
                    {{point.name}}
                </option>
            </select> -->
        </div>

        <v-simple-table class="table-striped" v-if="tableData">
            <thead>
                <th>DIA</th>
                <th>PEDIDOS</th>
                <th v-if="isSuper">SIN EDITAR</th>
                <th v-if="isSuper">EDITADOS</th>
                <th v-if="isSuper">DIFERENCIA</th>
                <th v-if="isSuper" colspan="2">PAGADOS</th>
                <th v-if="isSuper" colspan="2">ENVIADOS</th>
            </thead>
            <tbody>   
                <tr v-for="reg in tableData" 
                    :key="reg.day" >
                    <td>{{reg.day}}</td>
                    <td>{{reg.cantidad}}</td>
                    <td v-if="isSuper">${{reg.original_total/100 |price}}</td>
                    <td v-if="isSuper">${{reg.edited_total/100 |price}}</td>
                    <td v-if="isSuper">${{(reg.original_total - reg.edited_total)/100 |price}}</td>
                    <td v-if="isSuper">{{reg.c_pagados}}</td>
                    <td v-if="isSuper">${{reg.pagados/100 |price}}</td>
                    <td v-if="isSuper">{{reg.c_enviados}}</td>
                    <td v-if="isSuper">${{reg.enviados/100 |price}}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <div class="mt-4">
            <byDelivery :month="month" :year="year"></byDelivery>
        </div>
        <div v-if="!tableData">
            Cargando...
        </div>
    </div>
</template>


<script>
import byDelivery from './month-by-delivery.vue'
import monthGraph from './month-graph'
export default {
    components:{monthGraph,byDelivery},
    props:['year','month'],
    data() {
        return {
            retiro_id:null
        }
    },
    computed:{
        tableData(){
            return this.$accessor.stats.getMonthStats
        },
        retiro_options(){
            return this.$accessor.retiroOptions.getNotPausedRetiroOptions
        },
        isSuper(){
            return (this.user.role_id == 1 );
        },
        user(){
            return this.$auth.user
        },
    },
    methods:{
         async retiroChanged(){
            this.$accessor.stats.setRetiroId(this.retiro_id);
            this.$accessor.setLoading(true);
            await this.$accessor.stats.fetchMonthStats({month:this.month,year:this.year})
            this.$accessor.setLoading(false);
        }   
    },
    mounted(){
       this.$accessor.stats.fetchMonthStats({month:this.month,year:this.year})
  
    }
}
</script>
