<template>
	<div class="fcc">
		<div class="fcc" v-if="!cropping">
			<h4>CREAR PRODUCTO</h4>
			<v-row>
				<v-col cols="12">
					<v-select label="CATEGORIA" :items="categories" item-text="name" item-value="id"
						v-model="newProduct.category_id"
						:rules="[newProduct.category_id ? true : 'Seleccione una categoria']" />
				</v-col>
				<v-col cols="4">
					<v-text-field v-model="newProduct.code" :rules="[newProduct.code ? true : 'Falta el código']"
						label="CODIGO" />
				</v-col>
				<v-col cols="8">
					<v-text-field v-model="newProduct.name" :rules="[newProduct.name ? true : 'Falta el nombre']"
						label="NOMBRE" />
				</v-col>
				<v-col cols="6">
					<v-textarea v-model="newProduct.description" label="DESCRIPCION" rows="3" />
				</v-col>
				<v-col cols="6">
					<v-text-field prepend-icon="$" label="Precio" v-model="newProduct.price" type="number" step=".01" />
					<!-- <priceForm :product="newProduct" @change="priceChange"></priceForm> -->
				</v-col>
			</v-row>
		</div>
		<imageUpload :multiple="true" @blobs="setImages" @reset="resetImage" />
		<v-btn v-if="!cropping" color="primary" class="mt-4" @click="save"
			:disabled="!(newProduct.name && newProduct.code)">
			<v-icon>{{$accessor.mdicons.mdicons.mdiUpload}}</v-icon>
			GUARDAR
		</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import imageUpload from '@/components/common/canvas-upload.vue'
import {Category,Product} from '~/types';
export default Vue.extend({
	components: {
		imageUpload,
	},
	data() {
		return {
			images: null as null | Array < Blob > ,
			newProduct: {
				code: '',
				barcode: 0,
				name: '',
				price: 1,
				category_id: null as number | null,
				description: '',
			}
		}
	},
	computed: {
		cropping(): boolean {
			return this.$accessor.admin.getCropping
		},
		categories(): Array < Category > {
			return this.$accessor.categories.getCategories
		},
	},
	methods: {
		resetImage() {
			this.images = null;
		},
		setImages(event: Array < Blob > ) {
			this.images = event
		},
		async saveImages(product_id:number) {
			if (!this.images || !product_id) return;
			let vm = this;
			const totalImages = this.images.length;
			this.images.forEach(async (image,index) => {
				vm.$accessor.setLoadingMessage(`subiendo ${index+1} de ${totalImages}`)
				let fdata = new FormData();
				fdata.append('product_id', product_id.toString());
				fdata.append('image', image);
				await vm.$accessor.products.uploadImage(fdata)
					.then(() => {
						if (index >= (totalImages-1)) {
							this.$accessor.setLoadingMessage('');
							this.$accessor.setLoading(false)
							this.$emit('close')
						}
					});
			})
		},
		save() {
			let vm = this
			if (!this.newProduct.name) return;
			this.$accessor.setLoading(true)
			this.$accessor.products.saveProduct(this.newProduct).then(async (response:Product|any) => {
				if (response) {
					vm.saveImages(response.id);
				}
				vm.$accessor.products.fetchProducts()
				this.$emit('close')
				vm.$accessor.setLoading(false)
				vm.$accessor.snackbarNotify('Producto creado');
			})
		},
	}
})
</script>
