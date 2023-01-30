<template>
	<div class="border">
		<span class="name-code">{{appImage.name}}</span>
		<v-row v-if="appImage">
			<v-col cols="4">
				<div class="relative">
					<div class="paused-overlay" v-if="appImage.paused">
						PAUSADO
					</div>
					<v-img v-if="!image && appImage.url" :src="$accessor.imagePath(appImage.url)" />
				</div>
				<uploadImage v-if="uploaded" @blobOptimizedImage="setImage" :nooptimize="true" @reset="resetImage">
				</uploadImage>
			</v-col>
			<v-col cols="8">
				<v-form class="" @submit.prevent="send">
					<v-text-field class="mt-2" @change="update('name')" hide-details label="Nombre"
						v-model="appImage.name" />
					<v-text-field class="mt-2" @change="update('target_url')" hide-details label="Redirección"
						v-model="appImage.target_url" />
					<v-text-field class="mt-2" @change="update('alt')" hide-details label="Alt" v-model="appImage.alt" />
					<div class="mt-2 justify-space-around d-flex">
						<v-btn color="success" :disabled="!image" @click="uploadImage">GUARDAR IMAGEN</v-btn>
						<v-btn :color="appImage.paused ? 'info' : 'secondary'" @click="togglePaused">PAUSAR</v-btn>
						<!-- <v-btn color="info" type="submit">GUARDAR CAMBIOS</v-btn> -->
						<v-btn color="error" @click="destroy" class="minw-btn">
							<v-icon>{{$accessor.mdicons.mdicons.mdiTrashCan}}</v-icon>
						</v-btn>
					</div>
				</v-form>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import uploadImage from '@/components/common/canvas-upload.vue'

export default {
	props: ['appImage'],
	components: {
		uploadImage,
	},
	data() {
		return {
			image: null,
			uploaded: true,
		}
	},
	computed: {

	},
	methods: {
		async update(field) {
			let value = this.appImage[field];
			if (field == 'target_url') {
				value = await this.$accessor.helpers.sanitizedLink(value)
			}
			let data = {
				id: this.appImage.id,
				field: field,
				value: value
			}
			this.$accessor.appImages.update(data).then(() => {
				this.fetch();
				this.$accessor.snackbarNotify('Banner actualizado');
			})
		},
		togglePaused() {
			this.appImage.paused = !this.appImage.paused
			this.update('paused')
		},
		async uploadImage() {
			this.$accessor.setLoading(true)
			let fdata = new FormData();
			fdata.append('id', this.appImage.id);
			fdata.append('image', this.image);
			await this.$accessor.appImages.upload(fdata);
			this.uploaded = false;
			await this.$accessor.appImages.fetchAppImages();
			//this.$router.go();
			this.resetImage();
			this.resetUploaded();
			this.$accessor.setLoading(false)
			this.$accessor.snackbarNotify('Imagen del banner actualizada');
			this.uploaded = true;
		},
		destroy() {
			swal({
				title: `Confirmar borrado del ${this.name}`,
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
				this.$accessor.appImages.destroy(this.appImage.id).then(() => {
					this.fetch()
				})
				this.$accessor.snackbarNotify('Banner borrado');
			})

		},
		setImage(event) {
			this.image = event;
		},
		resetImage() {
			this.image = null;
		},
		resetUploaded() {
			this.uploaded = true;
		},
		fetch() {
			this.$emit('fetch')
		}
	},
	mounted() {

	}
}
</script>

<style lang="scss" scoped>
.paused-overlay{
    z-index:99;
    color:blue;
    font-weight: bold;
    background-color: #ccc6;
    position:absolute;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.name-code{
    font-size: 18px;
    font-weight: bold;
}
.minw-btn{
    min-width: 0 !important;
}
.border{
	padding: 12px;
	border: 2px solid #888;
}
</style>
