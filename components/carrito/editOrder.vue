<template>
<div>
    <div class="fcc">
        <span>Editando pedido del <b>{{order.created_at}}</b> de <b>{{order.client}}</b></span>
        <v-btn @click="saveEditOrder" block tile depressed dark>GUARDAR CAMBIOS DE PEDIDO</v-btn>
    </div>
    <shopList class="shopList"/>
   
    <v-btn nuxt-link to="/cotizador" block tile depressed dark>AGREGAR MAS PRODUCTOS</v-btn>
</div>
</template>

<script>
import shopList from './shoplist.vue';
export default {
    props:['order'],
    components:{shopList},
    computed:{
    },
    methods:{
        saveEditOrder(){
            this.$accessor.setLoading(true)
            this.$accessor.shop.saveEditedOrder(this.order).then(() => {
                this.$accessor.setLoading(false);
                swal('Pedido editado!','','success')
                    .then(()=>{
                        window.location.replace('/admin/pedidos');
                    })

            })
        }
    },
    mounted(){
    }
}
</script>
