<template>
	<div>
		<h1>IMPORTAR MODELOS DE AUTO</h1>
		<div v-if="!(fileData && fileData.length)" class="fcc">
			<csvImport />
		</div>
		<div v-else>
			<div class="d-flex justify-end">
				<v-btn depressed color="info" @click="beforeSave()">CONTINUAR</v-btn>
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
				<!-- <thead>
					<tr>
						<th v-for="col in 10" :key="col">
							{{'col'+col}}
						</th>
					</tr>
				</thead> -->
				<tbody>
					<tr v-for="(row,i) in fileData" :key="row.id">
						<td class="purple--text">
							{{++i}}
						</td>
						<td v-for="col in 10" :key="col">
							{{row['col'+col] || '-'}}
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</div>
		<modal @close="showConfirm = false" v-if="showConfirm" >
			<div class="fcc">
				<h2 class="mt-3">se van a crear <b class="success--text">*{{separatedModels.create.length}}*</b> modelos</h2>
				<div v-for="create in separatedModels.create" :key="'create'+create.id">
					{{create[code]}} | {{create[name]}} | {{create[brand_code]}}
				</div>
				<h2 class="mt-3">Ya existen <b class="success--text">*{{separatedModels.update.length}}*</b> modelos</h2>
				<div v-for="update in separatedModels.update" :key="'update'+update.id">
					{{update[code]}} | {{update[name]}} | {{update[brand_code]}}
				</div>
				<h2 class="mt-3">No se van a guardar <b class="success--text">*{{separatedModels.notSave.length}}*</b> modelos</h2>
				<div v-for="notSave in separatedModels.notSave" :key="'notSave'+notSave.id">
					{{notSave[code]}} | {{notSave[name]}} | {{notSave[brand_code]}}
				</div>
				<v-btn class="mt-3" depressed block color="success" @click="save()">CONFIRMAR</v-btn>
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
		selectedFields:{},
		fields:[
			{text:'CODIGO',value:'code'},
			{text:'NOMBRE',value:'name'},
			{text:'MARCA DE AUTO',value:'car_brand_code'}
		],
		separatedModels:{
			create:[],
			update:[],
			notSave:[]
		}
	}},
	computed: {
		...mapGetters({
			fileData: 'admin/getUploadedFileData',
			carBrands: 'carBrands/getCarBrands',
			carModels: 'carModels/getCarModels'
		}),
		code(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'code');
		},
		name(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'name');
		},
		brand_code(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'car_brand_code');
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
			this.separatedModels.create = []
			this.separatedModels.update = []
			this.separatedModels.notSave = []

			let rows = this.fileData.slice(1)
			rows.forEach(row => {
				let carBrand = this.carBrands.find(brand => {
					return brand.code == row[this.brand_code]
				});
				if (!row[this.code] || !carBrand) {
					this.separatedModels.notSave.push(row)
					return
				};
				let carModel = this.carModels.find(brand => {
					return brand.code == row[this.code]
				});

				if(!!carModel){
					this.separatedModels.update.push(row)
				}
				else{
					this.separatedModels.create.push(row)
				}
			});
		},
		beforeSave(){
			if (this.fields.length != Object.entries(this.selectedFields).length){
				swal('Falta seleccionar algun campo','','warning')
				return
			}
			this.findDuplicated();
			this.showConfirm = true
		},
		async save(){
			let create = this.separatedModels.create.map((obj) => obj.id);
			let update = this.separatedModels.update.map((obj) => obj.id);

			let data = {
				fields: this.selectedFields,
				create,
				update,
			}
			this.$accessor.setLoading(true)
			await this.$accessor.carModels.confirmImport(data)
			window.location.replace('/admin/modelos-de-autos');
		}
	},
	mounted() {
		this.$accessor.admin.emptyExcelFile()
		this.$accessor.carBrands.fetch()
		this.$accessor.carModels.fetch()
	}
};
</script>

<style lang="scss" scoped>

</style>
