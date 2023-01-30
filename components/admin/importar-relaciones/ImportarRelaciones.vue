<template>
	<div>
		<h1>IMPORTAR RELACIONES ENTRE PRODUCTOS Y MODELOS DE AUTO</h1>
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
							<v-select
							v-model="selectedFields['col'+col]"
							:items="fields" @change="selectField(col,$event)"
							item-text="text" item-value="value" dense hide-details/>
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
		<modal @close="showConfirm = false" v-if="showConfirm" >
			<div class="fcc">
				<h2 class="mt-3">No se guardaron <b class="success--text">*{{response.length}}*</b> relaciones</h2>
				<div v-for="(r,i) in response" :key="'notSave-'+i">
					{{r.product_id}} | {{r.car_model_id}} | {{r.text}}
				</div>
				<v-btn class="mt-3" depressed block color="success" @click="end()">ACEPTAR</v-btn>
			</div>
		</modal>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import modal from '@/components/common/Modal'
import csvImport from "~/components/common/CsvImport.vue";

export default {
	components: {csvImport,modal},
	data(){return{
		showConfirm:false,
		response:[],
		selectedFields:{
			col1:'',
			col2:'',
			col3:'',
		},
		fields:[
			{text:'CODIGO PRODUCTO',value:'code_prod'},
			{text:'MODELO AUTO',value:'code_model'},
			{text:'COMENTARIO',value:'comments'}
		],
		separatedIn:{
			create:[],
			notSave:[]
		}
	}},
	computed: {
		...mapGetters({
			fileData: 'admin/getUploadedFileData',
			carModels: 'carModels/getCarModels',
			relations: 'productCarModel/getProductCarModel'
		}),
		codeProd(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'code_prod');
		},
		codeModel(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'code_model');
		},
		comments(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'comments');
		}
	},
	methods: {
		selectField(col,field){
			Object.entries(this.selectedFields).forEach(el => {
				if ('col'+col != el[0] && el[1] == field){
					delete this.selectedFields[el[0]]
				};
			})
		},
		findDuplicated(){
			this.$accessor.setLoading(true)
			let vm = this
			this.separatedIn.create = []
			this.separatedIn.notSave = []

			let rows = this.fileData.slice(1)
			rows.forEach(async (row) => {
				//! SI AMBOS CODIGOS SON FALSYS, NO SE GUARDAN
				if (!row[this.codeModel] || !row[this.codeProd]) {
					this.separatedIn.notSave.push(row)
					return
				};

				//! BUSCA EN MODELOS Y PRODUCTOS SI EXISTE UNO CON ESE CODIGO
				let carModel = vm.carModels.find(model => {
					return model.code == row[vm.codeModel].trim()
				});

				if (!carModel || !product) {
					this.separatedIn.notSave.push(row)
					return
				}
				let existsInRelations = vm.relations.find(relation => {
					return relation.product_id == product.id && relation.car_model_id == carModel.id
				});
				if (existsInRelations) {
					this.separatedIn.notSave.push(row)
					return
				}

				let existsInImport = vm.separatedIn.create.find(r => {
					return row[vm.codeProd] == r[vm.codeProd] && row[vm.codeModel] == r[vm.codeModel]
				});
				if (existsInImport) {
					this.separatedIn.notSave.push(row)
					return
				}
				this.separatedIn.create.push(row)
			});
			this.$accessor.setLoading(false)
		},
		async send(){
			if ( !this.codeProd || !this.codeModel ){
				swal('Falta seleccionar algun campo','','warning')
				return
			}
			this.$accessor.setLoading(true)
			await this.$accessor.productCarModel.confirmImport({fields: this.selectedFields}).then(response => {
				this.response = response
				this.showConfirm = true
				this.$accessor.setLoading(false)
			})
		},
		async end(){
			window.location.replace('/admin/productos');
		}
	},
	mounted(){
		this.$accessor.admin.emptyExcelFile()
		this.$accessor.carModels.fetch()
		//this.$accessor.products.fetchallProducts()
		//this.$accessor.productCarModel.fetchProductCarModel()
	}
};
</script>

<style lang="scss" scoped>

</style>
