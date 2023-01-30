<template>
	<v-container class="pa-0">
   	<div class="fc">
      	<BrandsHome />
		  	<v-row no-gutters>
				<v-col cols="12" lg="4" class="my-6 px-4 px-lg-0">
        			<FindProduct />
				</v-col>
				<v-col cols="12" lg="8" class="my-6">
        			<Banner />
				</v-col>
				<v-col v-if="whatsappUrl && $mq=='lg'" cols="12" lg="4" class="my-6">

				</v-col>
				<v-col v-if="whatsappUrl" cols="12" lg="8" class="my-6 px-4">
					<div :class="$mq=='lg' ? 'd-flex justify-end align-center' : ''">
						<span class="t20-lg text-center bold">Accedé a precios exclusivos para tu Negocio</span>
						<v-divider vertical v-if="$mq=='lg'" class="mx-8 tertiary-divider"></v-divider>
						<v-btn :href="whatsappUrl" target="_blank" :block="$mq!='lg'"
						depressed tile x-large outlined color="primary" class=" bg-gray">
							<span class=" t20 bold px-8">solicitá vendedor</span>
						</v-btn>
					</div>
				</v-col>
				<v-col cols="12" lg="4" class="my-6 px-4">
					<div class="bg-gray px-lg-10 py-lg-6 py-3 text-center t28-lg bold">30 AÑOS EN EL RUBRO AUTOMOTOR</div>
				</v-col>
				<v-col cols="12" lg="8" class="fc justify-center my-6 pa-4">
					<p class="mb-1 t24-lg t-18-sm bold">Eleginos como tu proveedor de confianza</p>
					<p class="mb-0 t18-lg">Comercializamos autopartes para el tren delantero del automotor de todas las marcas y modelos. Contamos con diversas marcas para ofrecerte, tanto nacionales como importadas.</p>
				</v-col>
				<v-col cols="12" class="my-6">
					<div :class="$mq=='lg' ? 'd-flex justify-space-around bold' : ''">
						<div v-for="i in (opts.length*2)-1" :key="i">
							<div v-if="i%2" class="fcc my-lg-0 my-4">
								<v-icon size="70" color="tertiary" class="mb-2">{{$accessor.mdicons.mdicons[opts[(i-1)/2].icon]}}</v-icon>
								<span class="text-center bold t20-sm" v-html="opts[(i-1)/2].text"></span>
							</div>
							<v-divider v-else :vertical="$mq=='lg'" class="mx-1 tertiary-divider w-sm-75 mx-auto"></v-divider>
						</div>
					</div>
				</v-col>
				<v-col v-if="whatsappUrl && $mq=='lg'" cols="4" class="my-6"></v-col>
				<v-col v-if="whatsappUrl" cols="12" lg="8" class="my-6 px-4">
					<div :class="$mq=='lg' ? 'd-flex justify-space-around align-center bold' : ''">
						<span class="t20 bold mb-lg-0 mb-4">Preguntas o consultas</span>
						<v-divider v-if="$mq=='lg'" vertical class="mx-lg-16 tertiary-divider"></v-divider>
						<v-btn :block="$mq!='lg'" :href="whatsappUrl" target="_blank"
						depressed tile x-large outlined color="primary" class="bg-gray">
							<span class=" t20 bold px-8">ESCRIBINOS</span>
						</v-btn>
					</div>
				</v-col>
		  	</v-row>
    	</div>
	</v-container>
</template>

<script>
import BrandsHome from './BrandsHome.vue'
import FindProduct from './Find.Product.vue'
import Banner from './Banner.vue'
export default {
	components: {
		BrandsHome,
		FindProduct,
		Banner
	},
	data() {
		return {
			opts:[
				{text:'GARANTÍA DE FÁBRICA', icon:'mdiFileCertificateOutline'},
				{text:'ENVÍOS A TODA ARGENTINA', icon:'mdiTruckFastOutline'},
				{text:'EFECTIVO/<br>TRANSFERENCIA BANCARIA', icon:'mdiCashMultiple'},
			]
		}
	},
	computed:{
		whatsappUrl(){
            return this.$accessor.configs.whatsappUrl;
        },
	},
	async serverPrefetch() {
		await this.$accessor.appImages.fetchAppImages()
	},
	mounted(){
		this.$accessor.appImages.fetchAppImages()
	}
}
</script>
