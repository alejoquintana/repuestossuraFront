<template>
	<modal @close="closeModal()">
		<div class="fcc">
			<label class="bold mt-4">Codigo:</label>
			<v-text-field class="w-75" type="text" dense hide-details filled v-model="model.code"
				@change="update('code')" />

			<label class="bold mt-4">Nombre:</label>
			<v-text-field class="w-75" type="text" dense hide-details filled v-model="model.name"
				@change="update('name')" />

			<label class="bold mt-4">Marca:</label>
			<v-select class="w-75" v-model="model.car_brand_id" :items="carBrands" @change="update('car_brand_id')"
			item-text="name" item-value="id" single-line dense hide-details filled ></v-select>

			<v-btn @click="closeModal()" color="success" depressed class="mt-4 w-75">LISTO! YA TERMINE</v-btn>
		</div>
  </modal>
</template>

<script>
import modal from '@/components/common/Modal'
export default {
	props:['model'],
	components:{modal},
	computed:{
		carBrands(){
			return this.$accessor.carBrands.getCarBrands
		}
	},
	methods:{
		update(field) {
			if (!field || !this.model[field]) return
			let updateData = {
				id: this.model.id,
				field: field,
				value: this.model[field]
			}
			this.$accessor.carModels.update(updateData)
			//this.closeModal()
		},
		closeModal() {
			this.$emit('close')
		},
	}
}
</script>
