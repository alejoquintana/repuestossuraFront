<template>
<div :id="'c'+category.id">
    <headerMobil v-if="$mq!='lg'" :category="category" :desplegado="desplegado" @toggleDesplegado="toggle"/>
    <headerWide v-if="$mq=='lg'" :category="category" :desplegado="desplegado" @toggleDesplegado="toggle"/>
    <v-expand-transition>
        <div class="cuerpo fc" v-if="desplegado">
            <div v-if="products && products.length">
					<div v-for="product in products" :key="product.id">
						<cardProduct :product="product"/>
					</div>
            </div>
				<div class="d-flex justify-center" v-else>
					<dot-loader class="my-4" size="20px"
					:color="$accessor.helpers.colors.red"/>
				</div>
        </div>
    </v-expand-transition>
</div>
</template>

<script>
import dotLoader from 'vue-spinner/src/PulseLoader.vue';
import headerMobil from '@/components/cotizador/header.row.mobil.vue'
import headerWide from '@/components/cotizador/header.row.wide.vue'
import cardProduct from './card.cotizador.product.vue'
export default {
	props: ['category'],
	components: {
		headerMobil,
		headerWide,
		cardProduct,
		dotLoader
	},
	data() {
		return {
			desplegado: false
		}
	},
	computed: {
		image() {
			if (!this.category || !this.category.id) return
			return this.$accessor.helpers.imagePath(this.category.image)
		},
		products() {
			if (this.category.name == "ofertas") {
				return this.$accessor.products.getOffers
			}
			if (this.category.name == "novedades") {
				return this.$accessor.products.getNews
			}
			return this.$accessor.products.getCategoryProducts(this.category)
		},
	},
	methods: {
		toggle() {
			this.$accessor.products.fetchCategoryProducts(this.category.id)
			this.desplegado = !this.desplegado
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
