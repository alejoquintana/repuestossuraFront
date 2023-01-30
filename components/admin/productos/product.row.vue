<template>
	<div class="fc">
		<v-divider color="blue"></v-divider>
		<v-row>
			<v-col cols="2" class="cursor-pointer" @click="imageModal()">
				<v-img contain :src="portada"></v-img>
				<span v-if="product.paused" class="primary--text"><b>PAUSADO</b></span>
			</v-col>
			<v-col cols="9" class="fc">
				<v-row>
					<v-col cols="4">
						<v-select label="CATEGORIA" :items="categories" item-text="name" item-value="id"
						:rules="[product.category_id ? true : 'Seleccione una categoria']"
						v-model="fake.category_id" @change="validate('category_id')" />
					</v-col>
					<v-col cols="3">
						<v-text-field v-model="fake.code" @change="validate('code')"
							:rules="[fake.code ? true : 'Falta el código']" label="CODIGO" />
					</v-col>
					<v-col cols="3">
						<v-btn block dark color="success" @click="showModelsModal = true" class="mt-1">
							MODELOS
						</v-btn>
					</v-col>
					<v-col cols="6">
						<v-text-field v-model="fake.name" @change="validate('name')"
							:rules="[fake.name ? true : 'Falta el nombre']" label="NOMBRE" />
					</v-col>
					<v-col cols="3">
						<v-text-field prepend-icon="$" label="Precio" v-model="fake.price" type="number" step=".01"
						 @change="validate('price')"/>
					</v-col>
					<v-col cols="8">
						<v-textarea v-model="fake.description" @change="validate('description')" label="DESCRIPCION"
							rows="1" />
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="1" class="fc">
				<v-btn small dark :color="product.offer ? 'blue' : 'secondary'" @click="toggle('offer')" class="mt-1">
					OFERTA
				</v-btn>
				<v-btn small dark :color="product.new ? 'purple' : 'secondary'" @click="toggle('new')" class="mt-1">
					NUEVO
				</v-btn>
				<v-btn small fab :color="product.paused ? 'success' : 'info'" @click="toggle('paused')" class="mt-1">
					<v-icon>
						{{product.paused ?  $accessor.mdicons.mdicons.mdiPlay : $accessor.mdicons.mdicons.mdiPause }}
					</v-icon>
				</v-btn>

				<v-btn small fab color="red" dark @click="deleteProduct" class="mt-1">
					<v-icon>
						{{$accessor.mdicons.mdicons.mdiTrashCan}}
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<modal @close="closeModal" v-if="showImagesModal || showModelsModal">
			<imageModal v-if="showImagesModal" :product="product" @close="closeModal" />
			<modelsModal v-if="showModelsModal" :product="product" @close="closeModal" />
		</modal>
		<v-divider color="blue" class="mt-4" />
	</div>
</template>

<script>
import imageModal from './product.image-modal'
import modelsModal from './product.models-modal'
import modal from '@/components/common/Modal.vue'
import swal from 'sweetalert'
export default {
	components: {modal,imageModal,modelsModal},
	props: {product:Object},
	data() {
		return {
			showImagesModal: false,
			showModelsModal: false,
			fake:{
				code:'',
				name:'',
				description:'',
				price:0,
				category_id:'',
			}
		}
	},
	mounted() {
		this.fake.price = this.product.price
		this.fake.code = this.product.code
		this.fake.name = this.product.name
		this.fake.description = this.product.description
		this.fake.category_id = this.product.category_id
	},
	computed: {
		portada() {
			return this.$accessor.imagePath(this.product.images[0])
		},
		categories() {
			return [{id: null,name: 'SIN CATEGORIA'}, ...this.$accessor.categories.categories]
		},
	},
	methods: {
		closeModal() {
			this.showImagesModal = false;
			this.showModelsModal = false;
			this.$accessor.setLoading(true)
			this.$accessor.products.fetchProducts();
			this.$accessor.setLoading(false)
		},
		priceChange(e) {
			let field = e.field;
			let value = e.value;
			if (!e.field || !e.value) return;
			this.$accessor.products.update({
				id: this.product.id,
				field,
				value
			})
		},
		imageModal() {
			this.showImagesModal = true;
		},
		async deleteProduct() {
			var vm = this;
			swal({
				title: `Confirmar borrado del producto ${this.product.name}`,
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
			}).then(async (r) => {
				if (!r) return;
				this.$accessor.setLoading(true)
				await this.$accessor.products.delete(vm.product.id);
				this.$accessor.products.fetchProducts();
				this.$accessor.snackbarNotify('Producto borrado');
				this.$accessor.setLoading(false)
			})
		},
		validate(field) {
			if (field == 'price' && this.fake[field] >= 21474836) {
				swal('Numero muy alto','','error')
				this.fake[field] = this.product[field]
				return
			}
			if (((field != 'description' && field != 'category_id') && !this.fake[field]) || (field == 'price' && this.fake[field] == 0)) {
				this.fake[field] = this.product[field]
				return
			}
			this.saveChange(field);
			if (field == 'name') {
				this.saveChangeSlug();
			}
			this.product[field] = this.fake[field]
		},
		saveChangeSlug() {
			let vm = this
			let slug = this.fake.name.toLowerCase();
			slug = slug.toLowerCase();
			//? erase special characters
			slug = slug.replace(/[^-_a-z\s\d]/g, "");
			//? replace spaces,underscore and middle dash by groups
			slug = slug.replace(/[-_\s]{1,}/g, "-");
			//? normalize accent marks
			slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
			slug = slug.replace(/^-|-$/g, "");
			slug = '/' + slug;
			if (slug == '/') {
				slug = 'n-a';
			}
			if (this.product.slug != slug) swal({
				title: `Desea modificar tambien la url del producto "${this.product.name}"`,
				text: `Url anterior: "${this.product.slug}"\nUrl nueva: "${slug}"`,
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
				vm.saveChange('slug', slug);
			})
		},
		async saveChange(field, value) {
			let data = {
				id: this.product.id,
				field: field,
				value: value ? value : this.fake[field]
			}
			await this.$accessor.products.update(data);
			this.$accessor.snackbarNotify(`${this.product.name} | Cambio guardado`);
		},
		async toggle(field) {
			this.product[field] = !this.product[field]
			let data = {
				id: this.product.id,
				field: field,
				value: this.product[field] ? 1 : 0
			}
			await this.$accessor.products.update(data);
			this.$accessor.snackbarNotify(`${this.product.name} | Cambio guardado`);
		}
	}
}
</script>

<style scoped>
	.image-container {
		width: 100px;
	}
</style>
