<template>
	<div>
		<div class="fc darkblue--text pl-2" v-if="sucursales && sucursales.length">
			<h1 class="titlePage">{{title}}</h1>
			<v-row class="mt-4">
				<v-col cols="11" lg="8" offset="1">
					<div class="left-border fc">
						<span v-if="whatsappNumber">
							{{description}}
						</span>
					</div>
				</v-col>
			</v-row>
			<div class="mt-4 px-4" v-if="sucursales">
				<sucursal :sucursal="sucursal" v-for="sucursal in sucursales" :key="sucursal.id" />
			</div>
		</div>

		<div v-if="socials && socials.length" class="fcc mt-8">
			<h2 class="titlePage">Contacto</h2>
			<div v-for="(social,i) in socials" :key="i" class="btn-opts pa-4">
				<a :href="social.url" target="_blank" v-if="social.name && social.url">
					<v-icon x-large :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons[social.icon]}}
					</v-icon>
					<span class="text-social pl-6">{{social.name}}</span>
				</a>
			</div>
		</div>

		<div v-if="!(sucursales && sucursales.length) && !(socials && socials.length)">
			<h1 class="secondary--text text-center my-4">No hay informacion disponible por el momento</h1>
		</div>
	</div>
</template>

<script>
import sucursal from '@/components/admin/configuraciones/sucursales/sucursal.preview'
export default {
	components: {
		sucursal
	},
	data() {
		return {
			defaultTitle: 'Ubicacion',
		}
	},
	computed: {
		socials() {
			let res = this.$accessor.configs.socials;
			let whaItem = {label:'WHATSAPP',name:this.whatsappNumber,url:this.whatsappUrl,icon:'mdiWhatsapp'}
			return [...res,whaItem];
		},
		defaultDescription() {
			return ``
		},
		meta() {
			return this.$accessor.pageMetas.getMeta('donde-estamos');
		},
		title() {
			if (!this.meta) return this.defaultTitle
			return this.meta.title || this.defaultTitle
		},
		description() {
			if (!this.meta) return this.defaultDescription
			return this.meta.description || this.defaultDescription
		},
		whatsappNumber() {
			return this.$accessor.configs.whatsappNumber
		},
		whatsappUrl(){
			return this.$accessor.configs.whatsappUrl
		},
		sucursales() {
			return this.$accessor.sucursales.getLocations.filter(sucursal => {
				return !sucursal.paused;
			})
		}
	},
	serverPrefetch(){
		this.$accessor.sucursales.fetchLocations()
	},
	mounted() {
		this.$accessor.sucursales.fetchLocations()
	}
}
</script>

<style lang="scss" scoped>
.text-social{
	font-size: 18px;
	font-weight: bold;
	color: $blue;
}
</style>
