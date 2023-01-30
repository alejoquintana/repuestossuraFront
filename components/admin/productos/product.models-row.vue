<template>
	<tr>
		<td><span v-if="brand">{{brand.name}}</span></td>
		<td> <span v-if="model">  {{ model.name }}</span></td>
		<td>
			<v-textarea v-model="model.pivot.comments" @change="update()"
			name="comment" id="comment" rows="1" dense hide-details></v-textarea>
		</td>
		<td>
			<v-btn fab small depressed color="error" @click="destroy()">
				<v-icon>
					{{$accessor.mdicons.mdicons.mdiTrashCan}}
				</v-icon>
			</v-btn>
		</td>
	</tr>
</template>

<script>
export default {
	components: {},
	props: {
		model: Object
	},
	data() {return {}},
	computed:{
		brands(){
			return this.$accessor.carBrands.getCarBrands
		},
		brand(){
			if(!this.brands){
				console.log('brands',this.brands)
				return;
			}
			if(!this.model || !this.model.car_brand_id)return
			return this.brands.find(b => b.id == this.model.car_brand_id)
		}
	},
	methods: {
		update(){
			let data = {
				id: this.model.pivot.id,
				field: 'comments',
				value: this.model.pivot.comments
			}
			this.$accessor.productCarModel.update(data)
		},
		destroy(){
			var vm = this;
			swal({
				title: `Confirmar borrado de la relcion entre este producto y el modelo ${this.model.name}`,
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
				this.$accessor.productCarModel.destroy(this.model.pivot.id)
				this.$accessor.snackbarNotify('Relacion borrada');
				this.$emit('removeRelation',this.model.id)
				this.$accessor.setLoading(false)
			})
		},
	},
}
</script>

<style lang="scss" scoped>

</style>
