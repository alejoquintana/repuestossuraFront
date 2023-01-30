<template>
	<div>
		<v-row class="mt-4 ma-0" justify="space-between">
			<v-col cols="12" lg="8">
				<h1>Modelos de auto</h1>
			</v-col>
			<v-col cols="12" lg="2">
				<v-btn block depressed color="success" to="/admin/modelos-de-autos/importar">IMPORTAR .CSV</v-btn>
			</v-col>
			<v-col cols="12">
				<v-divider></v-divider>
			</v-col>
			<v-col cols="12" lg="3">
				<v-text-field type="text" v-model="createData.code" label="Codigo" dense hide-details />
			</v-col>
			<v-col cols="12" lg="3">
				<v-text-field type="text" v-model="createData.name" label="Nombre" dense hide-details />
			</v-col>
			<v-col cols="12" lg="3">
				<v-select label="Marca de auto" v-model="createData.car_brand_id" :items="carBrands" item-text="name"
					item-value="id" single-line dense hide-details></v-select>
			</v-col>
			<v-col cols="12" lg="2">
				<v-btn block color="success" @click="create()"
					:disabled="!(createData.name&&createData.code&&createData.car_brand_id)">
					CREAR
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-divider></v-divider>
			</v-col>
			<v-col cols="12" lg="6" class="d-flex">
				<v-text-field type="text" ref="search" label="Buscar" dense hide-details class="mr-4" />
				<v-btn color="primary" depressed @click="setSearch()">
					<v-icon>{{$accessor.mdicons.mdicons.mdiMagnify}}</v-icon>
				</v-btn>
			</v-col>
			<v-col cols="12" lg="6" class="d-flex">
				<v-select label="Marca de auto" v-model="filter" :items="carBrands" item-text="name"
				item-value="id" single-line dense hide-details class="mr-4" ></v-select>
				<v-btn color="error" depressed @click="resetFilter()" fab rounded small text :disabled="!filter">
					<v-icon>{{$accessor.mdicons.mdicons.mdiCloseThick}}</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<v-simple-table fixed-header class="table-striped table-header mt-4">
			<thead>
				<tr>
					<th>Codigo</th>
					<th>Nombre</th>
					<th>Marca</th>
					<th class="w-25"></th>
				</tr>
			</thead>
			<tbody>
				<tr is="modelRow" v-for="model in carModels" :key="model.id" :model="model">
				</tr>
			</tbody>
		</v-simple-table>
	</div>
</template>

<script>
import modelRow from "./model-row.vue";
export default {
	components: {modelRow},
	data() {
		return {
			createData:{
				name:'',
				code:'',
				car_brand_id:0,
			},
			search:'',
			filter:0,
		};
	},
	computed: {
		carModels(){
			let res = this.$accessor.carModels.getCarModels
			if (this.search) {
				let term = this.sanitizeString(this.search)
				res = res.filter(el => {
					let name = this.sanitizeString(el.name)
					let code = this.sanitizeString(el.code)
					return code.search(term) >= 0 || name.search(term) >= 0
				})
			}
			if (this.filter) {
				res = res.filter(el => {
					return el.car_brand_id == this.filter
				})
			}
			return res
		},
		carBrands(){return this.$accessor.carBrands.getCarBrands},
	},
	methods: {
		sanitizeString(text){
			text = text.trim()
			text = text.toLowerCase()
			return text
		},
		setSearch(){
			this.search = this.$refs.search.lazyValue
		},
		resetFilter(){
			this.filter = 0
		},
		create(){
			this.$accessor.carModels.create(this.createData)
			this.createData.name = ''
			this.createData.code = ''
			this.createData.car_brand_id = 0
		},
	},
	mounted(){
		this.$accessor.carModels.fetch()
		this.$accessor.carBrands.fetch()
	},
};
</script>

<style lang="scss" scoped>
.border{
	border: 1px solid #88888888;
	border-radius: 12px;
}
</style>
