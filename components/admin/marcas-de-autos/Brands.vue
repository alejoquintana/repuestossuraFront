<template>
	<div>
		<v-row justify="space-between">
			<v-col cols="12" lg="5">
				<h1>Marcas de auto</h1>
			</v-col>
			<v-col cols="12" lg="3">
				<v-btn block depressed color="success" to="/admin/marcas-de-autos/importar">IMPORTAR .CSV</v-btn>
			</v-col>
			<v-col cols="12" lg="5">
				<v-text-field type="text" v-model="createData.code" label="Codigo" dense
				hide-details />
			</v-col>
			<v-col cols="12" lg="5">
				<v-text-field type="text" v-model="createData.name" label="Nombre" dense
				hide-details />
			</v-col>
			<v-col cols="12" lg="2">
				<v-btn block color="success" @click="create()" :disabled="!createData.code || !createData.name">CREAR
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-divider></v-divider>
			</v-col>
			<v-col cols="12" class="d-flex justify-end">
				<div class="d-flex w-25">
					<v-text-field type="text" ref="search" label="Buscar" dense hide-details class="mr-4" />
					<v-btn color="primary" depressed @click="setSearch()">
						<v-icon>{{$accessor.mdicons.mdicons.mdiMagnify}}</v-icon>
					</v-btn>
				</div>
			</v-col>
			<v-col cols="12">
				<v-divider></v-divider>
			</v-col>
			<v-col cols="12" class="pa-1" v-for="brand in carBrands" :key="brand.id">
				<brandRow :brand="brand" />
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import brandRow from "./brand-row.vue";
	export default {
		components: {
			brandRow
		},
		data() {
			return {
				createData: {
					name: '',
					code: ''
				},
				search:'',
			};
		},
		computed: {
			carBrands(){
				let res = this.$accessor.carBrands.getCarBrands
				if (this.search) {
					let term = this.sanitizeString(this.search)
					res = res.filter(el => {
						let name = this.sanitizeString(el.name)
						let code = this.sanitizeString(el.code)
						return code.search(term) >= 0 || name.search(term) >= 0
					})
				}
				return res
			}
		},
		methods: {
			create() {
				this.$accessor.carBrands.create(this.createData)
				this.createData.name = ''
				this.createData.code = ''
			},
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
		},
		mounted() {
			this.$accessor.carBrands.fetch()
		}
	};
</script>

<style lang="scss" scoped>

</style>
