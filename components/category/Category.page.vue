<template>
<div>
    <div v-if="category">
        <ribbon-title  :image="category.image" :title="category.name" ish1/>
        <div class="description px-lg-8 px-2">
            <p class="mb-0">{{category.description}}</p>
        </div>
    </div>
    <v-container class="mt-lg-4" v-if="products && products.length">
        <v-row justify="space-around" align="stretch">
            <v-col cols="6" lg="4" v-for="product in products" :key="product.id" class=" mb-4 mt-4">
                <div class="px-2 h-100">
                    <productCard :product="product"/>
                </div>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import ribbonTitle from '../common/ribbon.title.vue'
import productCard from '@/components/product/card.product.vue'
export default {
    props:['category','product'],
    components:{ribbonTitle,productCard},
    computed: {
        categories() {
            return this.$accessor.categories.getNotPausedCategories
        },
        products() {
            return this.$accessor.products.getCategoryProducts(this.category)
        },
    },
}
</script>

<style lang="scss" scoped>
.description{
    color: #000;
    font-weight: thin;
}
@media(max-width:660px){
    .description{
        color: #000;
        font-size: 12px;
    }
}
</style>
