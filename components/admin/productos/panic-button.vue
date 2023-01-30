<template>
  <div>
      <v-btn v-if="!hidePrices" color="red" dark  @click="saveChange(true)">
          OCULTAR TODOS LOS PRECIOS
      </v-btn>
      <v-btn v-if="hidePrices" color="info" dark @click="saveChange(false)">
          MOSTRAR LOS PRECIOS AL PUBLICO
      </v-btn>
  </div>
</template>

<script>
export default {
    methods:{
        saveChange(value){
            let data = {
                field:'hide_prices',
                value:value
            }
            this.$accessor.configs.update(data);
        }
    },
    computed:{
        configs(){
            return this.$accessor.configs.configs
        },
        hidePrices(){
            return ( this.configs && this.configs.hide_prices )
        }
    }
}
</script>
