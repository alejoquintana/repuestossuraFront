<template>
	<div class="w-100">
		<v-row>
			<v-col cols="4">
				<v-select label="Marca" :items="brands" item-text="name" item-value="id" v-model="carBrand"/>
			</v-col>
			<v-col cols="4">
				<v-select label="Modelo" :items="models" item-text="name" item-value="id" v-model="createData.car_model_id"/>
			</v-col>
			<v-col cols="3">
				<v-textarea v-model="createData.comments" label="Comentarios" rows="1" />
			</v-col>
			<v-col cols="1">
				<v-btn color="info" tile small depressed fab :disabled="!createData.car_model_id"
					@click="create()">
					<v-icon>{{$accessor.mdicons.mdicons.mdiPlus}}</v-icon>
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-simple-table>
					<template v-slot:default>
						<thead>
							<tr>
								<th>Marca</th>
								<th>Modelo</th>
								<th>Comentarios</th>
							</tr>
						</thead>
						<tbody>
							<productModelsRow
							:model="model" @removeRelation="removeRelation($event)"
							v-for="model,i in product.car_models" :key="i" />
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import productModelsRow from "./product.models-row.vue";
export default {
	components: {
		productModelsRow
	},
	props: {
		product: Object
	},
	data() {
		return {
			carBrand:null,
			createData: {
				car_model_id: 0,
				comments: '',
			}
		}
	},
	computed: {
		models() {
			let res = this.$accessor.carModels.getCarModels
			if (this.carBrand) {
				res = res.filter(model => {
					return model.car_brand_id == this.carBrand
				})
			}
			return res
		},
		brands() {
			return this.$accessor.carBrands.carBrands
		},
	},
	methods: {
		removeRelation(id) {
			let index = this.product.car_models.findIndex(el => el.id == id)
			this.product.car_models.splice(index, 1);
		},
		create() {
			let data = {
				product_id: this.product.id,
				car_model_id: this.createData.car_model_id,
				comments: this.createData.comments
			}
			this.$accessor.productCarModel.create(data).then(() => {
				this.$accessor.products.fetchProducts()
			})
			this.createData.car_model_id = 0
			this.createData.comments = ''
		},
	},
	mounted() {
		this.$accessor.carModels.fetch()
		this.$accessor.carBrands.fetch()
	}
}
</script>

<style lang="scss" scoped>

</style>
