<template>
	<div>
		<div v-if="!admin && whatsappUrl">
			<a class="floating right" rel="noreferrer" target="_blank" 
				:href="whatsappUrl">
				<span>Preguntas? escribinos</span>
				 <v-icon color="green">{{$accessor.mdicons.mdicons.mdiWhatsapp}}</v-icon>
			</a>
		
		</div>
	</div>
</template>

<script>
export default {
	
	computed: {
		whatsappUrl(){
			return this.$accessor.configs.whatsappUrl
		},
		user() {
			return this.$auth.user;
		},
		admin() {
			return this.user && this.user.role_id < 3;
		},
	},
	
	
	
}
</script>


<style lang="scss" scoped>
.unreads {
	animation-name: unranim;
	animation-direction: alternate;
	animation-duration: 1s;
	animation-iteration-count: infinite;
}

@keyframes unranim {
	from {
		font-size: 40px;
		color: #000;
	}

	to {
		font-size: 60px;

		color: red;
	}
}

.chat {
	font-size: 40px;

}

.floating {
	cursor: pointer;
	position: fixed;
	z-index: 100;
	bottom: 10px;
	padding: 5px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	color:blue;
	font-weight: bold;
	font-size: 14px !important;
	border-radius: 24px;
	border: 3px solid blue;
	background-color: #fff;
}

.left {
	left: 10px;
}

.right {
	right: 10px;
}

.fa-whatsapp {
	//color: #25D366;
	font-size: 2rem;
	font-weight: bold;
	// margin-right: 10px;
}

.fa-facebook-messenger {
	color: #4267B2;
	font-size: 2rem;
	font-weight: bold;
}
</style>
