<template>
<div>
    <div>
        <ribbon-title :image="$accessor.appImages.icons.ofertas" :color="$accessor.helpers.colors.secondary" :title="title" ish1/>
        <div class="px-lg-8 px-2 descriptionPage" v-if="description">
            <p>{{description}}</p>
        </div>
    </div>
    <v-container>
        <v-row>
            <v-col cols="6" lg="4" v-for="product in firsts " :key="product.id">
                <div class="px-lg-3">
                    <productCard :product="product"/>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <div class="d-flex justify-center mt-8">
        <v-btn large tile depressed :x-large="$mq == 'lg'"
            class="px-lg-16 footer-btn button" nuxt to="/cotizador" >
            VER TODOS LOS PRODUCTOS
        </v-btn>
    </div>
</div>
</template>

<script>
import ribbonTitle from '../common/ribbon.title.vue'
import productCard from '@/components/product/card.product.vue'
export default {
    components:{productCard,ribbonTitle},
    data() {
        return {
            defaultDescription:'',
            defaultTitle:`Otros Productos`
        }
    },
    computed:{
        firsts(){
            var show = this.$mq == 'lg' ? 8 : 4;
            if(!this.othersProducts)return[];
            if(this.othersProducts.length < show)return this.othersProducts;
            let res =  this.othersProducts.slice(0,show);
            return res;
        },
        othersProducts(){
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
    mounted(){
        //this.$accessor.products.fetchallProducts();
    }
}
</script>

<style lang="scss" scoped>
.descriptionPage{
    color: #000;
}
.footer-btn{
    font-size: 28px;
    font-weight: bold;
    box-shadow: 8px 8px #000;
    border: 1px solid #000;
}
@media(max-width:660px){
    .descriptionPage{
        font-size: 12px;
    }
}
</style>
