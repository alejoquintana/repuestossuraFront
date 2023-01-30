<template>
<div>
    <div v-if="products && products.length > 0">
        <v-lazy v-model="visible" class="mt-5">
            <div>
                <h2 class="categoryName">{{category.name|uc}}</h2>
                <v-row align-content="stretch" v-if="products" class="align-stretch mt-3">
                    <v-col cols="6" lg="4" class="pa-1 pa-md-2  align-stretch" v-for="product in products" :key="product.id">
                        <productCard :product="product" class="h100"  />
                    </v-col>
                </v-row>
                <v-divider class="mt-6"></v-divider>
            </div>
        </v-lazy>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Product } from '~/types'
import productCard from './product-card.vue'
export default Vue.extend({
    props:['category'],
    components:{productCard},
    data() {
        return {
            visible:false
        }
    },
    computed:{
        products():Array<Product>{
            return this.$accessor.products.getCategoryProducts(this.category);
        },
          }

    
})
</script>

<style lang="scss" scoped>
.categoryName{
    text-align: center;
    font-size: 36px;
    padding: 0;
}
   
</style>