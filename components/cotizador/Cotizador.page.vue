<template>
<div>
    <v-container class="px-0">
        <div class="fc px-4 mb-8">
            <h1 class="titlePage">{{title}}</h1>
            <span class="descriptionPage">{{description}}</span>
            <span class="warningCotizador mt-3">*APRETA EN EL NOMBRE DE LA CATEGORÍA DESEADA PARA VER LOS PRODUCTOS Y SUS PRECIOS MAYORISTAS</span>
        </div>
        <div>
            <div v-for="category in categories" :key="category.id">
                <categoryRow :category="category" />
            </div>
        </div>
    </v-container>
</div>
</template>

<script>
import categoryRow from '@/components/cotizador/category.row.vue'
export default {
    components: {categoryRow},
    data() {
        return {
            desplegado:false
        }
    },
    computed:{
        categories() {
            return this.$accessor.categories.getNotPausedCategories
        },
        title(){
            let def = '' ;
            if(!this.metadata)return def;
            return this.metadata.title || def
        },
        description(){
            let def = '' ;
            if(!this.metadata)return def;
            return this.metadata.description || def
        },
        metadata(){
            return this.$accessor.pageMetas.getMeta('cotizador')
        },
    },
    methods:{
        toggle(){
            this.desplegado = !this.desplegado
        },
    },
}
</script>

<style lang="scss" scoped>
.warningCotizador{
    font-size: 10px;
    font-weight: bold;
    color: $primary;
}
</style>
