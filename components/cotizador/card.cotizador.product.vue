<template>
	<div>
		<div v-if="product">
			<div class="contenedorRow mt-4 px-4">
					<v-row class="ma-0">
						<!-- <v-col v-if="$mq!='lg'" class="px-0" cols="12">
							<span class="pName ">
								{{product.name}}
							</span>
						</v-col> -->
						<v-col cols="4" class="pa-0">
							<div class="relative" @click="showModal=true">
								<loader-img :aspectRatio="1/1.3" class="img-prod" :src="portada" :alt="product.name" />
								<div class="more-imgs" v-if="hasMoreImages">
									<v-btn dark tile fab depressed small class="more-imgs-btn font-weight-bold">
										<v-icon class="icon-large">{{$accessor.mdicons.mdicons.mdiImageMultiple}}</v-icon>
									</v-btn>
								</div>
							</div>
						</v-col>
						<v-col cols="8">
							<v-row>
								<v-col cols="12" lg="6">
									<span class="pName">
										{{product.name}}
									</span>
								</v-col>
								<!-- <v-col cols="12" class="d-flex align-center pa-0">
                                <price v-if="!hidePrices" :product="product" class="priceInfo" />
                            </v-col> -->
								<v-col cols="12" lg="12" class="d-flex justify-end">
									<shopButton :product="product"/>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
			</div>
			<v-divider :color="$accessor.helpers.colors.primary" class="mt-4" />
		</div>
		<imagesModal v-if="showModal" :images="product.images" :title="product.name" @close="showModal=false" />
	</div>
</template>

<script>
import imagesModal from '@/components/common/images-modal'
import price from '@/components/product/price.card.product.vue'
import shopButton from '@/components/product/shop-button.vue'
export default {
    components:{shopButton,price,imagesModal},
    props:['product'],
    data(){
        return{
            showModal:false
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
.more-imgs{
    position:absolute;
    bottom:10px;
    right:10px;
}
.card-btn{
    font-size:14px;
    font-weight: bold;
    border-radius:24px 24px 0 24px!important;
    border:1px solid $tertiary;
    padding: 5px 12px;
}
.priceInfo{
    font-size: 14px;
    font-weight: bold;
    //margin-bottom: 54px;
}
.pName{
    color: $tertiary;
    font-weight: bold;
    margin-bottom: 12px;
}
.textInfo{
    font-size: 14px;
    font-weight: bold;
}
@media(min-width:660px){
    .contenedorRow{
        max-width: 80%;
        margin-right: 30%;
        margin-left: 10%;
    }
}
</style>
