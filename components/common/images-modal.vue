<template>
  <div style="z-index:999;">
      <modal @close="$emit('close')">
          <div class="fc text-center">
            <h2 v-if="title">{{title}}</h2>
            <div>
                <v-carousel v-model="model" class="pa-0 mb-4" :height="height"
                        hide-delimiter-background
                        :prev-icon="$accessor.mdicons.mdicons.mdiChevronLeft"
                        :delimiter-icon="$accessor.mdicons.mdicons.mdiEye"
                        :next-icon="$accessor.mdicons.mdicons.mdiChevronRight">
                    <v-carousel-item class="pa-0"
                        v-for="img in  images "
                        :key="img.url"
                        >
                        <div>
                        <div class="px-lg-3 py-3 img-container">
                            <v-img v-if="images && images.length" aspect-ratio="1" contain :src="$accessor.imagePath(img.url)"/>
                        </div>
                        </div>
                    </v-carousel-item>
                    <v-carousel-item v-if="(!images || !images.length)">
                        <v-img  aspect-ratio="1" contain :src="$accessor.helpers.noImage"/>
                    </v-carousel-item>
                </v-carousel>
            </div>
          </div>
      </modal>
  </div>
</template>

<script>
import modal from './Modal'
export default {
    props:['images','title'],
    components:{
        modal
    },
    data(){return{
        model:null
    }},
    computed:{
        height(){
            let vh = window.innerHeight;
            let def = this.$mq == 'lg' ? 500 : 250;
            return def;
        }
    },
    methods:{
        closeModal(){

        }
    }

}
</script>

<style lang="scss" scoped>

@media(min-width:660px){
    .img-container{
        width:450px;
        margin:auto;
    }
}
</style>
