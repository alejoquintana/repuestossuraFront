<template>
	<div class="fit-content" v-if="product">
		<div v-if="!$accessor.helpers.no_shop">
			<!-- <div v-if="card" class="bold t24">
				<nuxtx-link :to="product.slug" small block depressed outlined tile color="primary" class="bold bg-gray t18">ver mas</nuxtx-link>
			</div> -->
			<div v-if="!(user && user.id)">
				<h3 class="reg-status-text">*Accedé a precios exclusivos para tu Negocio</h3>
				<v-btn block depressed outlined tile color="primary" class="bold bg-gray t18" to="/registrate">REGISTRATE</v-btn>
			</div>
			<div v-if="whatsappUrl && ( user && user.id ) && !admin  && !user.enabled">
				<span class="reg-status-text">*Aguardá la aprobación de tu registro para ver los precios</span>
				<v-btn link :href="whatsappUrl" target="_blank" block depressed outlined tile color="primary" class="bold bg-gray t18">COMUNICATE</v-btn>
			</div>
			<div v-if="admin || ( user && user.id && user.enabled )" class="bold t24">
				<span class="secondary--text">$</span> {{product.price | price}}
				<v-btn v-if="!units" @click="addOne" color="primary">
					 <v-icon :small="$mq!='lg'">{{$accessor.mdicons.mdicons.mdiCartOutline}}</v-icon>
					<span v-if="$mq=='lg'">COMPRAR</span>
				</v-btn>

				<div v-if="units > 0"
            		class="d-flex justify-start ">
					<div class=" d-flex  justify-center align-center units-control" >
						<v-btn fab tile color="primary" dark x-small  @click="removeOne()" class="controls-btn">
							-
						</v-btn>
						<div class="px-2">
							<v-text-field type="number" step="1" hide-details class="text-center mt-0 pt-0" v-model.lazy="units"  @change="updateList()"/>
						</div>
						<v-btn fab tile color="primary" dark x-small @click="addOne()" class="controls-btn">
							+
						</v-btn>
					</div>
        		</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

export default {
	props: {product:Object,card:Boolean,hidePrice:Boolean},
	data() { return {
		units: 0
	} },
	methods: {
		checkUserLoged() {
			if (!this.user) {
				this.$accessor.setShowRegisterModal(true)
				return false
			}
			return true;
		},
		updateList() {
			if (this.units < 1) this.units = 0;
			this.units = Math.floor(this.units);
			let item = {product:this.product, units:this.units}
			this.$accessor.shop.updateList(item)
		},
		addOne() {
			if (!this.units) { this.units = 1 }
			else { this.units++}
			this.updateList()
		},
		removeOne() {
			this.units--;
			if (this.units < 1) {
				this.units = 0;
			}
			this.updateList()
		},
		addToCart() {
			this.units = 1
			this.updateList()
		}
	},
	mounted() {
		if (this.listItem) {
			this.units = this.listItem.units
		}
	},
	computed: {
		whatsappUrl(){
			return this.$accessor.configs.whatsappUrl
		},
		productSlug(){
			return this.$accessor.products.getProductSlug(this.product)
		},
		user() {
			return (this.$auth.user)
		},
		admin(){
			return (this.user && this.user.role_id <= 2);
		},
		list() {
			return this.$accessor.shop.getList
		},
		carritoListItem() {
			return this.$accessor.shop.getListItem(this.product);
		},
		listItem() {
			var vm = this;
			let res = null;
			if (this.list) {
				res = this.list.find(item => {
					return ( item.product.id === vm.product.id )
				})
			}
			if (res) return res;
			return  {product:this.product,units:this.units};
		},
		total() {
			return this.$accessor.shop.getTotal
		},
		configs() {
			return this.$accessor.configs.configs
		},
		hidePrices() {
			return this.$accessor.configs.hidePrices
		},

	},
	watch: {
		carritoListItem() {
			if (!this.carritoListItem) this.units = 0;
			else this.units = this.carritoListItem.units;
		}
	}

}
</script>

<style lang="scss" scoped>
.reg-status-text{
	font-size:.85rem;
	color:grey;
	font-weight: bold;
}
.controls-btn {
	padding: 0 !important;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 25px;
	cursor: pointer;
}

.shop-btn {
	font-size: 14px;
}

.cart-flex {
	width: 50px;
}

.extra {
	width: 10px;
	min-height: 100%;
	background-color: #000;
	margin-left: 4px;
}

.hover-btn {
	transition: 0.5s transform;
}

.hover-btn:hover {
	transform: scale(1.1);
}

.bg-red {
	background-color: #D52B1E;
	color: #fff;
}

.text-red {
	&:focus {
		outline: none;
	}

	color: #D52B1E;
}

.btn-red {
	&:focus {
		outline: none;
		border: none;
	}

	background-color: #D52B1E;
	color:#fff;
	box-shadow: 0px 3px 5px #0006;
	cursor: pointer;
	border:none;
	font-size: 30px;
	width:40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.units-field {
	border: 1px solid #D52B1E !important;
	margin-left: 5px;
	margin-right: 5px;
	font-size: 20px;

	&:focus {
		outline: none;
	}

	width:70px;
	border:none;
	text-align:center;
	outline:none;
}

.units-control {
	// border:1px solid #868686;
	max-width: 150px;
}

@media (max-width:659px) {
	h3{
		font-size: 15px;
	}
	.shop-btn {
		font-size: 12px;
	}

	.extra {
		width: 5px;
		margin-left: 2px;
	}
}
</style>
