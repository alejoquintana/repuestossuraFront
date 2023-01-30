<template>
<v-row>
    <v-col cols="4">
        <v-simple-table v-if="order_items" class="table mt-4 table-striped">
            <thead class="thead-border">
                <th>Edicion</th>
                <th>Fecha</th>
                <th>Total</th>
            </thead>
            <tbody>
                <tr v-for="log in order_items" :key="log.edition" @click="selected = log.order_items">
                    <td class="text-center" v-if="!log.edition">ORIGINAL</td>
                    <td class="text-center" v-else>{{`#${log.edition}` }} | {{log.user ? log.user.name : '' }}</td>
                    <td class="text-center">{{log.order_items[0].created_at }}</td>
                    <td class="text-center">{{getTotal(log.order_items)}}</td>
                </tr>
            </tbody>
        </v-simple-table>
    </v-col>
    <v-col  v-if="order" cols="8">
        <v-simple-table v-if="selected" class="table mt-4 table-striped">
            <thead class="thead-border">
                <th>Codigo</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </thead>
            <tbody>
                <tr v-for="item in selected" :key="item.edition">
                    <td class="text-center">{{item.code}}</td>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center">{{item.price}}</td>
                    <td class="text-center">{{item.units}}</td>
                    <td class="text-center">{{item.units * item.price}}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <div v-if="total" class="d-flex px-16 mt-3 justify-end">
            <span class="bold fs-xlg">
                TOTAL : {{total}}
            </span>
        </div>
    </v-col>
</v-row>
</template>

<script>
export default {
    data(){
        return{
            selected:null
        }
    },
    computed:{
        order_items(){
            return this.$accessor.orders.getEditedOrderItems
        },
        order(){
            let fullorder = this.$accessor.orders.getOrder
            return fullorder ? fullorder.order : null;
        },
        total(){
            let res = 0
            if (!this.selected) return res
            this.selected.forEach( item => {
                res += item.units * item.price
            })
            return res
        }
    },
    methods:{
        getTotal(order_items){
            let res = 0
            order_items.forEach(item => {
                let subtotal = item.units * item.price
                res += subtotal
            });
            return res
        },
    }
}
</script>

<style lang="scss" scoped>
.thead-border{
    border-bottom: 2px solid $primary;
    background-color: #000;
    color: #fff;
}
</style>
