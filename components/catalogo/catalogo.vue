<template>
<div>
    <v-overlay v-if="loading">
        <v-progress-circular size="100" indeterminate color="primary" ></v-progress-circular>
    </v-overlay>
    
    <v-layout d-flex column>
        <portada></portada>
        <category :category="category" v-for="category in categories" :key="category.id" />
        <v-btn fixed bottom right class="float-button" tile depressed dark
        large nuxt to="/" >
            <v-icon left :color='$accessor.helpers.colors.negro'>{{$accessor.mdicons.mdicons.mdiHome}}</v-icon>
            PAGINA PRINCIPAL
        </v-btn>
    </v-layout>
</div>
</template>

<script >
import portada from './portada.vue'
import category from './category.vue'

export default {
    components:{category,portada},
    data() {
        return {
            visible:false
        }
    },
 
    computed:{
        categories(){
            return this.$accessor.categories.getNotPausedCategories

        },
        loading(){
            return this.$accessor.loading
        }
    },
    mounted(){
        if(this.loading){
            this.$accessor.setLoading(false)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>