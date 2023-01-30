<template>
	<div class="d-flex justify-space-between ml-auto" :class="{'w-50':!footer && !(socials.length || whatsappUrl)}">

		<div class="d-flex" v-if="!footer && socials.length >= 1">
			<span class="text-opt">Seguinos</span>
			<div v-for="(social,i) in socials" :key="i">
				<a :href="social.url" target="_blank" class="btn-opts px-2" v-if="social.name && social.url">
					<v-icon :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons[social.icon]}}</v-icon>
				</a>
			</div>
		</div>

		<a :href="whatsappUrl" target="_blank" class="btn-opts" v-if="whatsappUrl && whatsappNumber">
			<v-icon :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons.mdiCellphone}}</v-icon>
			<span class="text-opt">{{whatsappNumber}}</span>
		</a>

		<nuxt-link :to="'/ubicacion'" class="btn-opts"
			:class="isInRoute('/ubicacion') ? 'selected-opt' : '' ">
			<v-icon :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons.mdiMapMarker}}</v-icon>
			<span class="text-opt">Ubicación</span>
		</nuxt-link>

		<nuxt-link to="/login" v-if="!user && !$accessor.helpers.no_shop" class="btn-opts"
			:class="isInRoute('/login') ? 'selected-opt' : '' ">
			<v-icon :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons.mdiAccount}}</v-icon>
			<span class="text-opt">Iniciar sesión</span>
		</nuxt-link>
		<no-ssr>
			<nuxt-link :to="accountLink" v-if="user" class="btn-opts"
				:class="isInRoute(accountLink) ? 'selected-opt' : '' ">
				<v-icon :color="$accessor.helpers.colors.tertiary">{{$accessor.mdicons.mdicons.mdiAccount}}</v-icon>
				<span class="text-opt">{{user.id}}° {{user.name}}</span>
			</nuxt-link>
		</no-ssr>
	</div>

</template>

<script>
export default {
	props:{
		footer:Boolean
	},
	computed: {
		socials(){
			return this.$accessor.configs.socials;
		},
		whatsappNumber() {
			return this.$accessor.configs.whatsappNumber
		},
		whatsappUrl() {
			return this.$accessor.configs.whatsappUrl
		},
		user() {
			return this.$auth.user
		},
		admin() {
			return (this.user && this.user.role_id <= 2)
		},
		accountLink() {
			if (!this.user) return '/login';
			if (this.admin) return '/admin';
			return '/mi-cuenta'
		}
	},
	methods: {
		isInRoute(slug) {
			return this.$route.path == slug
		},
	},
}
</script>

<style lang='scss' scoped>
.btn-opts{
	display: flex;
	align-items: center;
}
.text-opt{
	color: $blue;
	font-weight: bold;
	font-size: 18px;
	margin-right: 8px;
}
</style>
