<template>
<div>
  <div class="fc carrito" v-if="list && list.length">
      <div class="encabezado" @click="toggle">
            <!-- <div class="iconoCarrito">
                <v-img :src="iconoCarrito" />
            </div> -->
            <v-icon large color="#fff">
                {{$accessor.mdicons.mdicons.mdiCartVariant}}
            </v-icon>
            <div class="fcc">
                <span class="font-weight-bold price">$ {{total|price}}</span>
                <span class="white--text small">
                    *descuento aplicado: {{user.discount}}%
                </span>
            </div>
            <v-icon color="#fff">
                {{desplegado ? $accessor.mdicons.mdicons.mdiChevronDown : $accessor.mdicons.mdicons.mdiChevronUp}}
            </v-icon>
      </div>
      <v-expand-transition>
        <div class="cuerpo fc" v-if="desplegado">
            <div v-for="(listItem,key) in list" :key="listItem.product.id.toString()"
            :class="{ '' : key % 2 == 0 }">
                <v-divider/>
                <v-row class="py-4">
                    <v-col cols="2" @click="deleteListItem(listItem)" class="p-0 d-flex justify-center">
                        <v-btn fab x-small depressed class="carrito-btn-close">
                            <v-icon> {{$accessor.mdicons.mdicons.mdiClose}} </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col  cols="5" class="p-0">
								<span>{{listItem.product.name}}</span>
                    </v-col>
                    <v-col  cols="2" class="p-0">
                        {{listItem.units}}
                    </v-col>
                    <v-col  cols="3" class="font-weight-bold p-0">
                        ${{listItem.units * listItem.product.price|price}}
                    </v-col>
                </v-row>
            </div>
        </div>
      </v-expand-transition>
      <nuxt-link to="/carrito" class="pie">
          <div class="fc">
            <span>
                Terminar pedido
            </span>
            
          </div>
          <span @click="desplegado = true">
            <v-icon color="secondary">
                {{$accessor.mdicons.mdicons.mdiChevronRight}}
            </v-icon>
          </span>
      </nuxt-link>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            desplegado:false
        }
    },
    computed:{
        user(){
            return this.$auth.user
        },
        iconoCarrito(){
            return this.$accessor.appImages.getIcon('pinkCart')
        },
        list(){
            return this.$accessor.shop.getList
        },
        total(){
            return this.$accessor.shop.getTotal
        }
    },
    methods:{

        toggle(){
            this.desplegado = !this.desplegado
        },
        deleteListItem(item){
            item.units = 0;
            this.$accessor.shop.updateList(item)
        }
    }
}
</script>

<style scoped lang="scss">
.small{
    font-size:.8rem;
}
.carrito-btn-close{
    background-color: $primary !important;
    color: #fff;
    font-weight: bold;
    width:20px;
    height: 20px;
    margin-left: 10px!important;
}
.pie{
    display:flex;
    align-items:center;
    justify-content: space-around;
    background-color: #fff;
    color: $primary;
    font-weight:bold;
    border: 2px solid $blue;
    padding:4px;
}
.encabezado{
    width:100%;
    display: flex;
    align-items:center;
    justify-content: space-around;
    background-color: $blue;
    color:#fff;
    padding:4px;
    text-align: center;
}
.cuerpo{
    background-color:#fff;
    font-size:13px;
    color:#000;
}
.carrito{
    z-index:999;
    cursor:pointer;
    width: 340px;
    position:fixed;
    right:5vw;
    bottom:30px;
}
.iconoCarrito{
    max-width: 41px;
    max-height: 41px;
}
.price{
    font-size: 20px;
}
.icons{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid $tertiary ;
}
.secondary{
    background-color: $tertiary;
    .carrito-btn-close{
        background-color: #fff !important;
        color:$primary;
        font-weight: bold;
        width:20px;
        height: 20px;
        margin-left: 10px!important;
    }
}
</style>
