<template>
    <div class="fc">
        <v-row align="center">
            <v-col cols="3">
                <b> Mínimo compra presencial</b>
            </v-col>
            <v-col cols="3">
                <v-text-field prepend-icon="$" type="number" step="1" :value="configs.minbuy" @change="saveChange('minbuy',$event)" />
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols="3">
               <b>  Mínimo compra online</b>
            </v-col>
            <v-col cols="3">
                <v-text-field prepend-icon="$" type="number" step="1" :value="configs.minbuy_ship" @change="saveChange('minbuy_ship',$event)" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    computed:{
        configs(){
            return this.$accessor.configs.getConfigs
        }
    },
    methods:{
        saveChange(field,event){
            this.$accessor.configs.update({field:field,value:event})
        }
    }

}
</script>