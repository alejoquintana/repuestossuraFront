<template>
	<v-row class="border pa-2 mt-1 ma-0" no-gutters>
		<v-col cols="5">
			<div class="d-flex align-center my-1">
				<label class="pa-2">Codigo:</label>
				<v-text-field class="w-75" type="text" dense hide-details filled v-model="brand.code"
					@change="update('code')" />
			</div>
		</v-col>
		<v-col cols="6">
			<div class="d-flex align-center my-1">
				<label class="pa-2">Nombre:</label>
				<v-text-field class="w-75" type="text" dense hide-details filled v-model="brand.name"
					@change="update('name')" />
			</div>
		</v-col>
		<v-col cols="1" class="d-flex align-center justify-center">
			<v-btn fab depressed dark small color="error" class="mx-1" @click="destroy(brand)">
				<v-icon>
					{{$accessor.mdicons.mdicons.mdiTrashCan}}
				</v-icon>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
export default {
	 props: ['brand'],
	 methods: {
		update(field) {
			if (!field || !this.brand[field]) return
			let updateData = {
				id: this.brand.id,
				field: field,
				value: this.brand[field]
			}
			this.$accessor.carBrands.update(updateData)
		},
		destroy() {
			swal({
				title: `Confirmar borrado de la marca ${this.brand.name}`,
				text: 'desea continuar?',
				buttons: {
					confirm: {
						text: 'SI'
					},
					cancel: {
						text: 'NO',
						visible: true,
						closeModal: true,
						value: false
					},
				}
			}).then((r) => {
				if (!r) return;
				this.$accessor.setLoading(true)
				this.$accessor.carBrands.destroy(this.brand.id)
				this.$accessor.snackbarNotify('Marca borrada');
				this.$accessor.setLoading(false)
			})
		},
	 },
	 mounted(){

	 }
}
</script>

<style lang="scss" scoped>
.border{
	border: 2px solid #88888888;
	border-radius: 12px;
}
.row-code{
	font-size: 14px;
}
.row-name{
	font-weight: bold;
	font-size: 18px;
}
</style>
