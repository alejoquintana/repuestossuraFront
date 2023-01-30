<template>
	<div>
		<h1>IMPORTAR MARCAS DE AUTO</h1>
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
				<h2 class="mt-3">se van a crear <b class="success--text">*{{toCreate.length}}*</b> marcas</h2>
				<div v-for="toCreateRow in toCreate" :key="'toCreateRow'+toCreateRow.id">
					{{toCreateRow[code]}}|{{toCreateRow[name]}}
				</div>
				<h2 class="mt-3">Ya existen <b class="success--text">*{{duplicateds.length}}*</b> marcas</h2>
				<div v-for="duplicated in duplicateds" :key="'duplicated'+duplicated.id">
					{{duplicated[code]}}|{{duplicated[name]}}
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
			{text:'NOMBRE',value:'name'}
		],
		duplicateds:[],
		toCreate:[],
	}},
	computed: {
		...mapGetters({
			fileData: 'admin/getUploadedFileData',
			carBrands: 'carBrands/getCarBrands'
		}),
		code(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'code');
		},
		name(){
			return Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'name');
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
			//let code = Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'code');
			//let name = Object.keys(this.selectedFields).find(key => this.selectedFields[key] === 'name');
			this.duplicateds = []
			this.toCreate = []
			let rows = this.fileData.slice(1)
			rows.forEach(row => {
				if (!row[this.code]) return;
				let carBrand = this.carBrands.find(brand => {
					return brand.code == row[this.code]
				});
				if(!!carBrand){
					this.duplicateds.push(row)
				}
				else{
					this.toCreate.push(row)
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
			let create = this.toCreate.map((obj) => obj.id);
			let update = this.duplicateds.map((obj) => obj.id);

			let data = {
				fields: this.selectedFields,
				create,
				update,
			}
			this.$accessor.setLoading(true)
			await this.$accessor.carBrands.confirmImport(data)
			window.location.replace('/admin/marcas-de-autos');
		}
	},
	mounted() {
		this.$accessor.admin.emptyExcelFile()
		this.$accessor.carBrands.fetch()
	}
};
</script>

<style lang="scss" scoped>

</style>
