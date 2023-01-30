<template>
	<div class="mt-8 py-8">
		<v-container class="fc">
			<div class="d-flex align-center mb-4" v-if="routeInUbicacion && socials.length >= 1">
				<span class="text-opt">Seguinos</span>
				<div v-for="(social,i) in socials" :key="i">
					<a :href="social.url" target="_blank" class="btn-opts px-2" v-if="social.name && social.url">
						<v-icon large :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons[social.icon]}}</v-icon>
					</a>
				</div>
			</div>
			<v-divider class="primary-divider"></v-divider>
			<webfooter v-if="$mq=='lg'" />
			<mobileFooter v-if="$mq!='lg'" />
		</v-container>
	</div>
</template>

<script>
import webfooter from './web.footer.vue'
import mobileFooter from './mobile.footer.vue'
export default {
	components: {
		webfooter,
		mobileFooter
	},
	computed: {
		socials() {
			return this.$accessor.configs.socials
		},
		routeInUbicacion() {
			return this.$route.name != 'ubicacion'
		}
	}
}
</script>

<style lang="scss" scoped>
.text-opt{
	color: $blue;
	font-weight: bold;
	font-size: 22px;
	margin-right: 8px;
}
</style>
