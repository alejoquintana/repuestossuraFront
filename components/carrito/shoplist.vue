<template>
<div>
    <div v-if="total">
        <h3 class="darkblue--text">Tu pedido actual:</h3>
        <v-divider />
        <v-simple-table justify-center class="justify-center darkblue--text mt-4">
            <template>
                <thead>
                    <th class="text-left primary--text">Codigo</th>
                    <th class="text-left primary--text">Producto</th>
                    <th class="text-left primary--text">Unidades</th>
                    <th class="text-left primary--text">Subtotal</th>
                    <th class="text-left tertiary--text">X</th>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="`${item.product.id}`">
                        <td>{{getCode(item)}}</td>
                        <td>{{item.product.name}}</td>
                        <td> <shopButton :product="item.product" hidePrice/> </td>
                        <td>${{prodPrice(item) * item.units|price}}</td>
                        <td>
                            <v-btn fab x-small color="red" outlined @click="remove(item)">
                                <v-icon>{{$accessor.mdicons.mdicons.mdiClose}}</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div class="d-flex justify-end mt-4 pr-4 mr-4">
            <span class="text-h4 darkblue--text">
                TOTAL : ${{total|price}}
            </span>
        </div>
    </div>
</div>
</template>

<script>
import shopButton from '@/components/product/shop-button.vue'
import { ShopListItem } from '~/types'
export default {
    components:{shopButton},
    computed:{
        list(){
            return this.$accessor.shop.getList
        },
        total(){
            return this.$accessor.shop.getTotal
        },
    },
    methods:{

        remove(item){
            let li = new ShopListItem(item.product,0);
            this.$accessor.shop.updateList(li);
        },
        getCode(listItem){
            return listItem.product.code
        },
        prodPrice(item){
            return item.product.price
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
