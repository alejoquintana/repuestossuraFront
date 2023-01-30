<template>
	<div>
		<v-row align="center">
			<v-col cols="2" class="cursor-pointer" @click="imageModal">
				<v-img :aspect-ratio="1" :src="image" contain />
			</v-col>
			<v-col cols="10">
				<v-row>
					<v-col cols="3">
						<span v-if="category.paused" class="info--text font-weight-bold">PAUSADA</span>
						<v-text-field label="CODIGO" v-model="category.code" @change="validate('code')" />
					</v-col>
					<v-col cols="3">
						<span v-if="category.paused" class="info--text font-weight-bold">PAUSADA</span>
						<v-text-field label="NOMBRE" v-model="category.name" @change="validate('name')" />
					</v-col>
					<v-col cols="4">
						<v-textarea rows="1" label="DESCRIPCION" v-model="category.description"
							@change="validate('description')" />
					</v-col>
					<v-col cols="1">
						<v-text-field type="number" class="text-center" label="PRIORIDAD" :rules="orderRules"
							v-model="category.order" @change="validate('order')" />
					</v-col>
					<v-col cols="1">
						<div class="fc">
							<v-btn small fab :color="category.paused ? 'success' : 'info'" @click="togglePaused">
								<v-icon>
									{{category.paused ?  $accessor.mdicons.mdicons.mdiPlay : $accessor.mdicons.mdicons.mdiPause }}
								</v-icon>
							</v-btn>

							<v-btn small fab color="red" dark @click="deleteCategory">
								<v-icon>
									{{$accessor.mdicons.mdicons.mdiTrashCan}}
								</v-icon>
							</v-btn>

						</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<modal @close="showModal=false" v-if="showModal">
			<imageModal :category="category" @close="showModal = false" />
		</modal>
	</div>
</template>

<script>
import imageModal from './category.image-modal'
import modal from '@/components/common/Modal.vue'
import swal from 'sweetalert'
export default {
	components: {modal,imageModal},
	props: ['category'],
	data() {
		return {
			showModal: false,
			orderRules: [(value) => value < 1000 || "El máximo es 999"]
		}
	},
	computed: {
		configs() {
			return this.$accessor.configs.getConfigs
		},
		image() {
			if (this.category.image) {
				return this.$accessor.helpers.imagePath(this.category.image)
			} else {
				return this.$accessor.helpers.noImage
			}
		}
	},
	methods: {
		imageModal() {
			this.showModal = true;
		},
		async deleteCategory() {
			var vm = this;
			swal({
				title: `Confirmar borrado de la categoría ${this.category.name}`,
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
				this.$accessor.categories.deleteCategory(vm.category.id);
				this.$accessor.snackbarNotify('Categoria borrada');
				this.$accessor.setLoading(false)
			})
		},
		validate(field) {
			if (field != 'description' && !this.category[field]) return;
			if (field == 'order' && this.category.order > 999) return;
			this.saveChange(field);
			if (field == 'name') {
				this.changeSlug();
			}
		},
		changeSlug() {
			let vm = this
			let slug = vm.category.name.toLowerCase();
			slug = slug.trim()
			slug = slug.replace(/[^-_a-z\s\d]/g, ""); //# erase special characters
			slug = slug.replace(/[-_\s]{1,}/g, "-"); //# replace spaces,underscore and middle dash by groups
			slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //# normalize accent marks
			slug = slug.replace(/^-|-$/g, "");
			slug = '/' + slug;
			if (slug == '/') {
				slug = 'n-a';
			}
			swal({
				title: `Desea modificar tambien la url de la categoria "${vm.category.name}"`,
				text: `Url anterior: "${vm.category.slug}"\nUrl nueva: "${slug}" `,
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
			if (value == undefined) {
				value = this.category[field]
			}
			let data = {
				id: this.category.id,
				field: field,
				value: value
			}
			await this.$accessor.categories.updateCategory(data);
			this.$accessor.snackbarNotify(`${this.category.name} | Cambio guardado`);
		},
		async togglePaused() {
			this.saveChange('paused', this.category.paused ? 0 : 1)
		}
	}
}
</script>

<style scoped>
    .image-container{
        width:100px;
    }
</style>
