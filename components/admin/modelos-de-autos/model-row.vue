<template>
<tr>
	<td>{{ model.code }}</td>
	<td>{{ model.name }}</td>
	<td :class="{'error--text bold':!carBrand}">
		{{ carBrand ? carBrand.name : 'SIN MARCA' }}
	</td>
	<td>
		<v-btn depressed dark color="info" class="mx-1" @click="showUpdate = true">
			<span>EDITAR</span>
			<v-icon small>
				{{$accessor.mdicons.mdicons.mdiPencil}}
			</v-icon>
		</v-btn>
		<v-btn depressed dark color="error" class="mx-1" @click="destroy(model)">
			<span>BORRAR</span>
			<v-icon small>
				{{$accessor.mdicons.mdicons.mdiTrashCan}}
			</v-icon>
		</v-btn>
	</td>

	<updateModal v-if="showUpdate" :model="model" @close="showUpdate = false" />
</tr>
</template>

<script>
import updateModal from './updateModal.vue'
export default {
	props: ['model'],
	components:{updateModal},
	data() {
		return {
			showUpdate:false
		}
	},
	methods: {
		closeModal(){
			this.showUpdate = false
		},
		destroy() {
			swal({
				title: `Confirmar borrado del modelo ${this.model.name}`,
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
				this.$accessor.carModels.destroy(this.model.id)
				this.$accessor.snackbarNotify('Marca borrada');
				this.$accessor.setLoading(false)
			})
		},
	},
	computed:{
		carBrands() {return this.$accessor.carBrands.getCarBrands},
		carBrand(){return this.$accessor.carBrands.getCarBrand(this.model.car_brand_id)},
	},
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
