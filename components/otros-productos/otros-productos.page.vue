<template>
<div>
    <div v-if="category">
        <ribbon-title :title="title" ish1/>
        <div class="description px-lg-8 px-2">
            <p class="mb-0">{{description}}</p>
        </div>
    </div>
    <v-container class="mt-lg-4">
        <v-row>
            <v-col cols="6" lg="4" v-for="product in products" :key="product.id" class="pa-0">
                <div class="px-3 h-100">
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
    data() {
        return {
            defaultDescription:'',
            defaultTitle:`Otros Productos`
        }
    },
    computed: {
        categories() {
            return this.$accessor.categories.getNotPausedCategories
        },
        products() {
            return this.$accessor.products.getOthersProducts
        },
        title(){
            if(!this.metadata)return this.defaultTitle;
            return this.metadata.title || this.defaultTitle
        },
        description(){
            if(!this.metadata)return this.defaultDescription;
            return this.metadata.description || this.defaultDescription
        },
        metadata(){
            return this.$accessor.pageMetas.getMeta('otros-productos')
        },
    },
    methods:{

    }
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
