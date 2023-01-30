<template>
    <div class="fc">
        <div>
            <v-btn color="info" @click="create"> 
                NUEVA SUCURSAL
            </v-btn>
        </div>
        <div v-for="sucursal in sucursales" :key="sucursal.id">
            <sucursal-row :sucursal="sucursal"></sucursal-row>
        </div>
    </div>
</template>

<script>
import sucursalRow from './sucursal.row'
export default {
    components:{
        sucursalRow
    },
   computed:{
       sucursales(){
           return this.$accessor.sucursales.getLocations
       }
   },
   methods:{
       async create(){
           await this.$accessor.sucursales.create();
           await this.$accessor.sucursales.fetchLocations();
       }
   },
    mounted(){
        this.$accessor.sucursales.fetchLocations();
    }
}
</script>