<template>
    <div class="h-100">
        <div class="d-flex flex-column justify-space-between h-100" v-if="product">
            <div class="mt-3 pa-0" >
                <div class="aspect-ratio d-flex relative  justify-center align-center overflow-hidden">
                    <v-btn absolute tile fab depressed x-small right color="primary" style="top:10px;"
                                dark nuxt :to="productSlug">
                                <v-icon>{{$accessor.mdicons.mdicons.mdiInformationVariant}}</v-icon>
                    </v-btn>
                    <v-btn v-if="product.images && product.images.length > 1"
                        absolute
                        right
                        style="top:45%"
                        x-small fab
                         @click="showMoreImages" >
                            <v-icon >{{$accessor.mdicons.mdicons.mdiPlus}}</v-icon>
                    </v-btn>
                    <div class="hover-scale cursor-pointer"  @click="showMoreImages">
                        <loader-img :src="portada" class="" :alt="product.name"  />
                    </div>
                    <!-- <div class="price-overlay pa-2" v-if="!hidePrices">
                        <priceTag :product="product"/>
                    </div> -->
                </div>
            </div>

            <div  class="mt-3 pa-0">
                <span class=" prod-name">
                    {{product.name}}
                </span>
            </div>


            <div class="align-self-end">
                <shopButton class="ml-auto" v-if="!hidePrices"  :product="product" card />
            </div>
        </div>
        <imagesModal v-if="showModal" :images="product.images" :title="product.name" @close="showModal=false"/>
    </div>
</template>

<script>
import imagesModal from '@/components/common/images-modal.vue'
import priceInfo from './info.card.product.vue'
import shopButton from './shop-button.vue'
import priceTag from './pricetag.card.product.vue'
export default {
    components:{priceTag,shopButton,priceInfo,imagesModal},
    props:['product'],
    data(){
        return{
            showModal:false
        }
    },
    methods:{
        showMoreImages(){

            if(this.$mq!='lg')this.$router.push(this.productSlug)
            if(!this.product)return
            if(!this.product.images)return;
            if(!this.product.images.length)return;
            if(this.product.images.length <= 1)return;
            this.showModal=true
        }
    },
    computed:{
        productSlug(){
            return this.$accessor.products.getProductSlug(this.product)
        },
        hasMoreImages(){
            return this.product.images.length > 1
        },
        portada(){
            return this.$accessor.products.portada(this.product)
        },
        hidePrices(){
            return this.$accessor.configs.hidePrices
        },
    }
}
</script>

<style scoped lang="scss">

.absolute-badge{
    position:absolute;
    top:10px;
    left:5px;
}
.more-imgs-btn{
    border:3px solid $tertiary;
    color:$tertiary;
    font-weight: bold;
    .icon-large{
        .v-icon__svg{
            width:45px!important;
            height:45px!important;
        }
    }
}
.prod-name{
    color: $primary;
    font-weight: bold;
}
.more-imgs{
    position:absolute;
    top:40%;
    right:10px;
}

.card-btn{
    font-size:14px;
    font-weight: bold;
}
/* .aspect-ratio{
    aspect-ratio: 1 / 1.3
} */
.colest{
    position: relative;
}
.price-overlay{
    position: absolute;
    right: 14px;
    bottom: 14px;
    background-color: $blue;
    color: #fff;
}
</style>
