<template>
<v-lazy v-model="visible">
    <v-card class="h100 d-flex flex-column justify-space-between product-card">
        <div class="card-bottom h-100 d-flex flex-column justify-space-between">
            <div class="fc">
                <v-responsive :aspect-ratio="1/1.3" class="responsive" :elevation="2">
                    <loader-img :aspect-ratio="1/1.3"  :src="$accessor.imagePath(product.images[0].url)"
                        v-if="product.images && product.images[0]" >
                        <v-chip color="secondary" class="code"> Cod {{product.code}}</v-chip>
                    </loader-img>
                    <loader-img :src="$accessor.noImage" v-else />
                </v-responsive>

                <v-card-title class="pTitle">
                        {{product.name.trim()}}
                </v-card-title>
            </div>
            <div class="px-4">
                <price :product="product" class="mb-4" v-if="!$accessor.configs.hidePrices"/>
            </div>
        </div>
    </v-card>
</v-lazy>
</template>

<script>
import price from './price.vue'
export default {
    props:['product'],
    components:{price},
    data() {
        return {
            visible:false
        }
    },
}
</script>

<style lang="scss" scoped>
.small{
    font-size:10px;
}
.pTitle{
	font-weight: bold;
	color: #fff;
	background-color: $blue;
}
.product-card{
    border:1px solid #ccc6;
}
    .responsive{
        overflow:hidden;
    }
    .h100{
        height:100%;
    }

    .code{
        position:absolute;
        bottom:10px;
        left:10px;
    }
    .title{
        word-break: break-word!important;
    }

</style>
