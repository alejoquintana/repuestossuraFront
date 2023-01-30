<template>
    <div class="fc">
        IMPORTAR ARCHIVO CSV
		<div class="relative">
				<v-btn block class="admi-button mt-3" color="primary">
					<span> ELEGIR ARCHIVO</span>
				</v-btn>
      		  <input  @change="setFile" type="file" id="excelFile" class="display-none-input"
			 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" >
		</div>
        <v-btn info @click="uploadFile()" color="primary" class="mt-4" :disabled="!file">SUBIR ARCHIVO</v-btn>
    </div>
</template>

<script>
export default {
	data() {
		return {
			file: null
		}
	},
	methods: {
		async uploadFile() {
			this.$accessor.setLoading(true)
			await this.$accessor.admin.uploadExcelFile(this.file);
			this.$accessor.setLoading(false)
		},
		setFile(event) {
			this.file = event.target.files ? event.target.files[0] : null;
		}
	},
}
</script>

<style>

</style>
