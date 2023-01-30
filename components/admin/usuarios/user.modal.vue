<template>
	<modal @close="$emit('closeModal')">
		<div class="fcc">
			<h3>Modificar descuento de usuario</h3>
			<div class="d-flex align-center w-25">
				<v-text-field v-model="discount" type="number" :rules="rules"/>
				<span>%</span>
			</div>
			<v-btn @click="update('discount')" :disabled="!discount || discount > 100" color="success">
				guardar
			</v-btn>
		</div>
	</modal>
</template>

<script>
import modal from '@/components/common/Modal'
export default {
	components:{
		modal
	},
	props: {user:Object},
	data() {
		return {
			discount: 0,
			rules:[
				value => !!value || 'Valor invalido',
          	value => value < 100 || 'El maximo es 100',
			]
		}
	},
	methods: {
		update(){
			if (!this.discount || this.discount > 100) {
				return
			}
			let data = {
				id: this.user.id,
				field: 'discount',
				value: this.discount
			};
			this.$accessor.users.update(data)
			this.user.discount = this.discount
			this.$emit('closeModal')
		},
	},
	mounted(){
		this.discount = this.user.discount
	}
}
</script>

<style lang="scss" scoped>
.discount{
	transition: all 1s;
}
.discount:hover{
	background-color: #88FF8888;
}
</style>
