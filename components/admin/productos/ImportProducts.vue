<template>
	<div>
		<h1>IMPORTAR PRODUCTOS</h1>
		<div v-if="!(fileData && fileData.length)" class="fcc">
			<csvImport />
		</div>
		<div v-else>
			<div class="d-flex justify-end">
				<v-btn depressed color="info" @click="send()">CONTINUAR</v-btn>
			</div>
			<v-simple-table>
				<thead>
					<tr>
						<th>n°</th>
						<th v-for="col in 10" :key="col">
							<v-select :ref="'col'+col" v-model="selectedFields['col'+col]" :items="fields"
								@change="selectField(col,$event)" item-text="text" item-value="value" dense hide-details />
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in 10" :key="fileData[i-1].id">
						<td class="purple--text">
							{{i}}
						</td>
						<td v-for="col in 10" :key="col">
							{{fileData[i-1]['col'+col] || '-'}}
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</div>
		<modal @close="showConfirm = false" v-if="showConfirm">
			<div class="fcc">
				<h2 class="mt-3" v-if="response.created">Se crearon <b class="success--text">*{{response.created}}*</b> productos</h2>
				<h2 class="mt-3" v-if="response.updated">Se actualizaron <b class="success--text">*{{response.updated}}*</b> productos</h2>
			</div>
			<div class="fcc" v-if="response && response.notSaved && response.notSaved.length">
				<h2 class="mt-3">Error al importar <b class="success--text">*{{response.notSaved.length}}*</b> productos</h2>
				<div v-for="notSave in response.notSaved" :key="'notSave'+notSave.code">
					codigo | {{notSave.code}} | {{notSave.text}}
				</div>
			</div>
			<v-btn class="mt-3" depressed block color="success" @click="end()">OK</v-btn>
		</modal>
	</div>
</template>

<script>
import {
	mapGetters
} from 'vuex'
import modal from '@/components/common/Modal'
import csvImport from "~/components/common/CsvImport.vue";

export default {
	components: {
		csvImport,
		modal
	},
	data() {
		return {
			response: [],
			showConfirm: false,
			selectedFields: {},
			fields: [
				{text: 'RUBRO',value: 'category',col: '',required: true},
				{text: 'CODIGO',value: 'code',col: '',required: true},
				{text: 'NOMBRE',value: 'name',col: '',required: true},
				{text: 'PRECIO',value: 'price',col: '',required: true},
				{text: 'DESCRIPCION',value: 'description',col: '',required: false},
				{text: 'DISPONIBLE',value: 'stock',col: '',required: true},//stock valores posibles: S N C ( SI, NO, CONSULTAR )
			],
		}
	},
	computed: {
		...mapGetters({
			fileData: 'admin/getUploadedFileData',
			categories: 'categories/getCategories',
			products: 'products/getProducts'
		}),
		code() {
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'code');
		},
	},
	methods: {
		selectField(col, field) {
			Object.entries(this.selectedFields).forEach(el => {
				if ('col' + col != el[0] && el[1] == field) {
					delete this.selectedFields[el[0]]
				};
			})
		},
		findDuplicated() {
			let vm = this
			this.rowData.create = []
			this.rowData.update = []
			this.rowData.notSave = []

			let canCreate = this.fields.find(f => {
				if (!f.required) return false
				let isSelected = Object.keys(this.selectedFields).find(
					key => this.selectedFields[key] === f.value
				)
				return !isSelected
			})

			let rows = this.fileData.slice(1)
			rows.forEach(row => {
				if (this.category && !this.findCategory(row[this.category])) {
					this.rowData.notSave.push(row)
					return
				}
				if (this.price) {
					let price = parseFloat(row[this.price].trim())
					if (price == NaN) {
						this.rowData.notSave.push(row)
						return
					}
				}
				if (this.stock && row[this.stock]) {
					let value = row[this.stock].trim()
					if (value != 'S' && value != 'N' && value != 'C') {
						this.rowData.notSave.push(row)
						return
					}
				}

				//! BUSCAR EN LOS PRODUCTOS
				let product = this.products.find(prod => {
					return prod.code == row[this.code]
				});

				 if(!!product){
					this.rowData.update.push(row)
				}

				else if(!canCreate){
					this.rowData.create.push(row)
				} else {
					this.rowData.notSave.push(row)
				}
			});
		},
		findCategory(category_code) {
			category_code = category_code.trim()
			let category = this.categories.find(c => {
				return c.code == category_code
			})
			return !!category
		},
		async send() {
			let vm = this
			if (!this.code) {
				swal('El campo CODIGO es obligatorio', '', 'warning')
				return
			}
			let fields = {}
			for (const [key, value] of Object.entries(this.selectedFields)) {
				let field = this.fields.find(f => f.value == value)
				field.col = key
				fields = {...fields,
					[value]: key
				}
			}
			this.$accessor.setLoading(true)
			await this.$accessor.products.confirmImport(fields).then(response => {
				vm.response = response
			});
			this.showConfirm = true
			this.$accessor.setLoading(false)
		},
		async end() {
			window.location.replace('/admin/productos');
		}
	},
	mounted() {
		this.$accessor.admin.emptyExcelFile()
	}
};
</script>
