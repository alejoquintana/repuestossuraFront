<template>
<div>
    <v-row justify="space-around" class="mr-8">
        <v-col cols="3" class="text-center">
            <h4 class="bold">FOTO DE OFERTAS</h4>
            <span class="dark-text">500 x 650</span>
            <div class="mx-16">
                <loader-img v-if="offersImage && !uploadedOffersImg" contain :aspectRatio="1/1.3"
                :src="$accessor.helpers.imagePath(offersImage.url)"/>
            </div>

            <uploadImage v-if="uploader" :aspectRatio="1/1.3" :rectangular="true" @blobOptimizedImage="setOffersImage" @reset="resetOffersImage" />
            <v-btn :disabled="!uploadedOffersImg" color="success" @click="saveOffersImage" class="mt-3">GUARDAR</v-btn>
        </v-col>
        <v-col cols="3" class="text-center">
            <h4 class="bold">FOTO DE NOVEDADES</h4>
            <span class="dark-text">500 x 650</span>
            <div class="mx-16">
                <loader-img v-if="newsImage && !uploadedNewsImg" contain :aspectRatio="1/1.3"
                :src="$accessor.helpers.imagePath(newsImage.url)"/>
            </div>

            <uploadImage v-if="uploader" :aspectRatio="1/1.3" :rectangular="true"
            @blobOptimizedImage="setNewsImage" @reset="resetNewsImage" />
            <v-btn :disabled="!uploadedNewsImg" color="success"
            @click="saveNewsImage" class="mt-2">GUARDAR</v-btn>
        </v-col>
        <v-col cols="5" class="text-center"></v-col>
        <v-col cols="4" class="mt-8">
            <span class="bold">FOTO DE CARATULA</span>
            <span class="dark-text">1000 x N </span>

            <v-img v-if="caratula && !uploadedCaratula" :src="$accessor.helpers.imagePath(caratula.url)"/>

            <uploadImage :nooptimize="true" v-if="uploader"  :rectangular="true"
            @blobOptimizedImage="setCaratula" @reset="resetCaratula" />
            <v-btn :disabled="!uploadedCaratula" color="success"
            @click="saveCaratula">GUARDAR</v-btn>
        </v-col>
        <v-col cols="5" class="text-center"></v-col>
    </v-row>
</div>
</template>

<script>
import uploadImage from '@/components/common/canvas-upload.vue'
export default {
    components: {
        uploadImage
    },
    data(){return{
        uploadedCaratula:null,
        uploadedOffersImg:null,
        uploadedNewsImg:null,
        uploader:true,
    }},
    computed: {
        appImages(){
            return this.$accessor.appImages.getAppImages
        },
        offersImage(){
            return this.$accessor.appImages.getOffersAppImage
        },
        newsImage(){
            return this.$accessor.appImages.getNewsAppImage
        },
        caratula(){
            return this.$accessor.appImages.getCaratula
        }
    },
    methods: {
        setOffersImage(event){
            this.uploadedOffersImg = event
        },
        resetOffersImage (){
            this.uploadedOffersImg = null
        },
        saveOffersImage (){
            this.$accessor.setLoading(true)
            this.resetUploader()
            let fdata = new FormData();
            fdata.append('id',this.offersImage.id)
            fdata.append('image',this.uploadedOffersImg)
            this.$accessor.appImages.upload(fdata).then(()=>{
                this.resetOffersImage()
                this.fetch()
                this.$accessor.setLoading(false)
            })
        },
        setCaratula(event){
            this.uploadedCaratula = event
        },
        resetCaratula (){
            this.uploadedCaratula = null
        },
        async saveCaratula(){
            if(this.appImages && !this.caratula){
                let data = {name:'caratula catalogo',code:'caratula_catalogo'}
                await this.$accessor.appImages.create(data);
                await this.fetch()
            }
            this.$accessor.setLoading(true)
            this.resetUploader()
            let fdata = new FormData();
            fdata.append('id',this.caratula.id)
            fdata.append('image',this.uploadedCaratula)
            this.$accessor.appImages.upload(fdata).then(()=>{
                this.resetCaratula()
                this.fetch()
                this.$accessor.setLoading(false)
            })
        },
        setNewsImage(event){
            this.uploadedNewsImg = event
        },
        resetNewsImage (){
            this.uploadedNewsImg = null
        },
        saveNewsImage (){
            this.$accessor.setLoading(true)
            this.resetUploader()
            let fdata = new FormData();
            fdata.append('id',this.newsImage.id)
            fdata.append('image',this.uploadedNewsImg)
            this.$accessor.appImages.upload(fdata).then(()=>{
                this.resetNewsImage()
                this.fetch()
                this.$accessor.setLoading(false)
            })
        },
        resetUploader(){
            this.uploader = false;
            setTimeout(() => {
                this.uploader = true;
            }, 50);
        },
        async fetch(){
            await this.$accessor.appImages.fetchAppImages()
        }
    },
    async mounted(){
        await this.fetch()

    }
}
</script>

<style lang="scss" scoped>

</style>
