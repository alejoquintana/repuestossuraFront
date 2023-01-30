<template>
	<v-row justify="space-around" align="stretch">
		<v-col cols="6" lg="4" v-for="product in products" :key="product.id" class=" mb-4 mt-4">
			<div class="px-2 h-100">
				<card :product="product" />
			</div>
		</v-col>
	</v-row>
</template>

<script>
import card from '@/components/product/card.product.vue';
export default {
	components: {
		card
	},
	computed: {
		products(){
			return this.$accessor.products.getSpare
		},
	},
	created(){
		let brand = this.$route.query.marca || '';
		let model = this.$route.query.modelo || '';
		let category = this.$route.query.rubro || '';
		this.$accessor.products.fetchFoundProducts(
			{
				marca:brand,
				modelo:model,
				rubro:category
			}
		)
	}
}
</script>

<style lang="scss" scoped>
</style>
