<template>
	<div>
		<h1>IMPORTAR RUBROS</h1>
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
				<h2 class="mt-3" v-if="toCreate && toCreate.length">se van a crear <b class="success--text">*{{toCreate.length}}*</b> rubros</h2>
				<div v-for="toCreateRow in toCreate" :key="'toCreateRow'+toCreateRow.id">
					{{toCreateRow[code]}}|{{toCreateRow[name]}}
				</div>
				<h2 class="mt-3" v-if="duplicateds && duplicateds.length">Ya existen <b class="success--text">*{{duplicateds.length}}*</b> rubros</h2>
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
			{text:'CODIGO',value:'code',required:true},
			{text:'NOMBRE',value:'name',required:true},
			{text:'DESCRIPCION',value:'description',required:false},
		],
		duplicateds:[],
		toCreate:[],
	}},
	computed: {
		...mapGetters({
			fileData: 'admin/getUploadedFileData',
			categories: 'categories/getCategories'
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
			this.duplicateds = []
			this.toCreate = []
			let rows = this.fileData.slice(1)
			rows.forEach(row => {
				if (!row[this.code]) return;
				let category = this.categories.find(cat => {
					return cat.code == row[this.code]
				});
				if(!!category){
					this.duplicateds.push(row)
				}
				else{
					this.toCreate.push(row)
				}
			});
		},
		requiredFieldsSelected(){
			let res = true
			this.fields.forEach(field => {
				if (!field.required) return
				let isSelected = Object.keys(this.selectedFields).find(key => this.selectedFields[key] === field.value);
				if (!isSelected) res = false
			});
			return res
		},
		beforeSave(){
			if (!this.requiredFieldsSelected()){
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
			await this.$accessor.categories.confirmImport(data)
			window.location.replace('/admin/rubros');
		}
	},
	mounted() {
		this.$accessor.admin.emptyExcelFile()
		this.$accessor.categories.fetchCategories()
	}
};
</script>

<style lang="scss" scoped>

</style>
