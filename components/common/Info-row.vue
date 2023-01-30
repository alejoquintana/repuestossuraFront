<template>
  <div>
      <v-container>
        <v-row align="center" class="pb-4 my-4">
            <v-col cols="12" :lg="cols" v-for="item in itemsForLoop" :key="item.icon">
                <v-row >
                    <!-- <v-col cols="4" class="py-0">
                        <v-img :src="$accessor.appImages.getInfoIcon(item.icon)"></v-img>
                    </v-col> -->
                    <v-col cols="12" class="fc justify-space-around mt-lg-1 py-0" style="font-size:12px">
                        <span class="itemTitle"><b>{{item.title}}</b></span>
                        <span class="encode itemText">{{item.text}}</span>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
    props:['show2'],
    data() {
        return {
            items:[
                {icon:'truck',title:'DESPACHOS AL INTERIOR',text:'Realizamos despachos por el transporte de tu elección.'},
                {icon:'click',title:'ELEGI LOS DISEÑOS',text:'Elegí online como si lo hicieras personalmente.'},
                //{icon:'hand',title:'COTIZA AL INSTANTE',text:'Productos y precios mayoristas actualizados.'},
                {icon:'cart',title:'HACE TU PEDIDO MAYORISTA ONLINE',text:'Fácil, pŕactico y rápido.'},
            ]
        }
    },
    computed:{
        cols(){
            return this.show2 ? 6 : 3 ;
        },
        itemsForLoop(){
            if(!this.show2)return this.items;
            else{
                return this.items.filter(item =>{
                    return item.icon == 'truck' || item.icon == 'hand'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
 .itemText{
    color: $tertiary;
    font-size: 14px;
 }
 .itemTitle{
    font-size: 18px;
 }
</style>
