<template>
	<div class="border-left fc px-lg-12 px-4 justify-space-between">
		<p class="text-center t20 tertiary--text">Encontrá el repuesto que buscas</p>
		<div class="d-flex border justify-space-between align-center mb-4 relative">
			<div class="prepend-icon d-flex justify-center align-center">
				<span v-if="!brand" class="">A</span>
				<v-icon v-else color="primary" @click="brand = null">
					{{$accessor.mdicons.mdicons.mdiClose}}
				</v-icon>
			</div>
			<v-select color="primary" v-model="brand" :items="brands" item-text="name" placeholder="Seleccioná una marca"
			return-object single-line solo flat dense hide-details class="placeholder-blue" ></v-select>
		</div>
		<div class="d-flex border justify-space-between align-center mb-4 relative">
			<div class="prepend-icon d-flex justify-center align-center">
				<span v-if="!model" class="">B</span>
				<v-icon v-else color="primary" @click="model = null">
					{{$accessor.mdicons.mdicons.mdiClose}}
				</v-icon>
			</div>
			<v-select color="primary" v-model="model" :items="models" item-text="name" placeholder="Seleccioná un modelo"
			return-object single-line solo flat dense hide-details class="placeholder-blue" ></v-select>
		</div>
		<div class="d-flex border justify-space-between align-center mb-4 relative">
			<div class="prepend-icon d-flex justify-center align-center">
				<span v-if="!category" class="">C</span>
				<v-icon v-else color="primary" @click="category = null">
					{{$accessor.mdicons.mdicons.mdiClose}}
				</v-icon>
			</div>
			<v-select color="primary" v-model="category" :items="categories" item-text="name" placeholder="Tipo de producto"
			return-object single-line solo flat dense hide-details class="placeholder-blue" ></v-select>
		</div>
		<v-btn class="bg-gray" color="primary" outlined block depressed tile @click="routerPush">
			<span class="bold primary--second">Buscar producto</span>
			<v-icon right color="tertiary">{{$accessor.mdicons.mdicons.mdiMagnify}}</v-icon>
		</v-btn>
	</div>
</template>

<script>
export default {
	data(){
		return{
			brand:null,
			model:null,
			category:null,
		}
	},
	computed:{
		brands(){
			return this.$accessor.carBrands.getCarBrands
		},
		models(){
			let models = this.$accessor.carModels.getCarModels
			if (this.brand) {
				let brand = this.$accessor.carBrands.getCarBrandByCode(this.brand.code)
				models = models.filter(m => {
					return m.car_brand_id === brand.id
				})
			}
			return models
		},
		categories(){
			return this.$accessor.categories.getListForMenues
		},
	},
	methods:{
		routerPush(){
			let query = {}
			if (this.brand) {
				query = {marca:this.cleanParam(this.brand.code)}
			}
			if (this.model) {
				query = {...query,modelo:this.cleanParam(this.model.code)}
			}
			if (this.category) {
				query = {...query,rubro:this.cleanParam(this.category.code)}
			}
			if (!this.brand && !this.model && !this.category) return
			this.$accessor.products.fetchFoundProducts(query)
			this.$router.push({ path: '/encontrar-repuesto', query: query })
		},
		cleanParam(param){
			param = param.trim()
			return param.replace(/\s/g,'-')
		},
		checkQueries(){
			if (this.$route.query.marca) {
				let brand = this.$route.query.marca.replaceAll('-',' ')
				this.brand = this.$accessor.carBrands.getCarBrandByCode(brand)
			}
			if (this.$route.query.modelo) {
				let model = this.$route.query.modelo.replaceAll('-',' ')
				this.model = this.$accessor.carModels.getCarModelByCode(model)
			}
			if (this.$route.query.rubro) {
				let category = this.$route.query.rubro.replaceAll('-',' ')
				this.category = this.$accessor.categories.getCategoryByCode(category)
			}
		}
	},
	async mounted() {
		await this.$accessor.carBrands.fetch()
		await this.$accessor.carModels.fetch()
		await this.$accessor.categories.fetchNotPausedCategories()
		this.checkQueries()
	}
}
</script>

<style lang="scss" scoped>

.border{
	border: 2px solid $blue;
	color: $blue;
}
select{
	color: $blue;
}
.prepend-icon{
	background: $gray;
	height: 100%;
	aspect-ratio: 1;
	font-size: 24px;
	font-weight: bold;
}
.border-left{
	border-left: 2px solid $red;
}
.absolute-chevron{
	position: absolute;
	right: 4px;
	z-index: 0;
}
</style>
