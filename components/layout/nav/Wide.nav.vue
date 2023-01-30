<template>
	<div class="fc">
		<v-container>
			<v-row justify="space-between" align="center">
				<v-col cols="3">
					<nuxt-link to="/">
						<v-img :src="$accessor.helpers.largeLogo" contain />
					</nuxt-link>
				</v-col>
				<v-col cols="7" class="px-0">
					<navItems />
				</v-col>
				<v-col cols="12" class="pa-0">
					<v-divider class="tertiary-divider"></v-divider>
				</v-col>
				<v-col cols="12" class="d-flex justify-space-between">
					<span class="primary--text t18 bold font-italic">VENTA MAYORISTA DE AUTOPARTES</span>
					<span class="primary--text t18">PRESENTES PARA NUESTROS CLIENTES DESDE 1992</span>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import navItems from '../commons/nav-items.vue'
export default {
	components: {
		navItems
	},
	data() { return {
	} },
	computed: { },
	methods: { },
}
</script>

<style lang="scss" scoped>

.cart-login{
    border-bottom: 2px solid $tertiary;
}

.border-right{
    border-right: 1px solid $tertiary;
    color: #fff;
}
.name-cat{
    font-size: 14px;
    transition: font-weight;
    font-weight: normal;
}
.name-cat:hover{
    font-weight: bold;
}

</style>
