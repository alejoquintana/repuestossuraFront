<template>
	<div>
		<h1 class="pTitle px-8 py-3 mb-6 mt-2">{{product.name}}</h1>
		<v-row no-gutters>
			<v-col cols="4" lg="5" class="border-right pr-5">
				<loader-img :src="imagePath(selectedImage)" contain />
				<v-row class="mt-2">
					<v-col cols="3" v-for="image in miniatures" :key="image.id" class="cursor-pointer"
						@click="selectedImage = image">
						<loader-img :src="imagePath(image)" />
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="8" lg="7" class="pl-5">
				<div class="fc">
					<span class="t18 mb-6">Cod {{product.code}}</span>
					<shopButton class="mb-6" :product="product" />
					<div v-if="$mq=='lg' && product.description" class="mb-6">
						<h3 class="bold">Descripción</h3>
						<p>{{product.description}}</p>
					</div>
				</div>
			</v-col>
			<v-col v-if="$mq!='lg'">
				<p>{{product.description}}</p>
			</v-col>
			<v-col cols="12" class="mt-4" v-if="product.car_models && product.car_models.length">
				<p class="primary white--text bold mb-0 px-4 py-1 t18">COMPATIBILADES</p>
				<table>
					<tr>
						<th>MARCA</th>
						<th>MODELO</th>
						<th>COMENTARIO</th>
					</tr>
					<tr v-for="relation in product.car_models" :key="relation.id">
						<td> <span v-if="getBrand(relation.car_brand_id)"> {{getBrand(relation.car_brand_id).name}}</span></td>
						<td>{{relation.name}}</td>
						<td>{{relation.comments}}</td>
					</tr>
				</table>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import shopButton from '@/components/product/shop-button.vue'
import infoRow from '@/components/common/Info-row.vue'
export default {
	props: ['product'],
	components: {
		shopButton,
		infoRow,
	},
	data() {
		return {
			selectedImage: null
		}
	},
	computed: {
		brands(){
			return this.$accessor.carBrands.getCarBrands
		},
		relations() {
			return this.$accessor.productCarModel.getByProduct(this.product.id)
		},
		categories() {
			return this.$accessor.categories.getNotPausedCategories
		},
		category() {
			return this.categories.find(c => {
				return c.id == this.product.category_id
			})
		},
		portada() {
			return this.$accessor.products.portada(this.product)
		},
		miniatures() {
			if (!this.product) return;
			if (!this.product.images) return;
			if (!this.selectedImage) return;
			return this.product.images.filter(image => {
				return (image.id != this.selectedImage.id)
			})
		},
		hidePrices() {
			return this.$accessor.configs.hidePrices
		}
	},
	methods: {
		getBrand(id){
			return this.brands.find(b => b.id == id);
		},
		imagePath(image) {
			return this.$accessor.helpers.imagePath(image)
		}
	},
	mounted() {
		if (!this.product) return;
		if (!this.product.images) return;
		this.selectedImage = this.product.images[0];
		this.$accessor.productCarModel.fetchProductCarModelById({id:this.product.id,type:'product'})
	}
}
</script>

<style lang="scss" scoped>
.pTitle {
	background-color: $blue;
	color: #fff;
}

.cName {
	color: $tertiary;
	font-size: 14px;
	margin-bottom: 15px;
	margin-top: 10px;
}
.border-right{
	border-right: 2px solid $red;
}
th,tr,td,table{
	border: 1px solid $blue;
	border-collapse: collapse;
	text-align: left;
}
th{
	background: $gray;
	font-weight: unset;
}
td,th{
	padding: 4px;
}
@media(min-width:660px) {
	.pTitle {
		font-size: 25px;
		padding: 0 10px;
	}
}
@media(max-width:659px) {
	.pTitle {
		font-size: 20px;
	}
}
</style>
