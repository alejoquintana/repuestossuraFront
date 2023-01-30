<template>
    <v-responsive v-if="caratula">
        <v-img :src="$accessor.helpers.imagePath(caratula.url)" class="mb-4" :alt="`Catalogo Digital ${$accessor.configs.siteName}`" rel="preload"></v-img>
        <v-divider></v-divider>
    </v-responsive>
</template>

<script>
export default {
    computed:{
        caratula(){
            return this.$accessor.appImages.getCaratula
        }   
    },
    serverPrefetch(){
        this.$accessor.appImages.fetchAppImages()
    },
    mounted(){
        if(!this.caratula)this.$accessor.appImages.fetchAppImages()
    }
}
</script>