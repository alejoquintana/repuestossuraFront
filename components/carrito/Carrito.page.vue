<template>
	<div>
		<div v-if="showEditMode">
			<div v-if="editOrder">
				<editOrder :order="editOrder" />
			</div>
		</div>
		<div v-if="!showEditMode && !editMode">
			<div v-if="total">
				<v-row justify="center">
					<v-col cols="12">
						<h1 class="titlePage text-center">{{title}}</h1>
						<span class="descriptionPage">{{description}}</span>
						<div class="fc itemsBox">
							<div class="d-flex align-center mt-4" v-for="item in infoItems" :key="item">
								<v-icon :color="$accessor.helpers.colors.primary">{{$accessor.mdicons.mdicons.mdiCheck}}
								</v-icon>
								<span class="ml-4">{{item}}</span>
							</div>
						</div>
					</v-col>
					<v-col cols="12">
						<div class="dataform fc py-0 pt-4">
						<!-- 	<v-select v-model="fdata.retiro_id" label="DONDE RETIRAS?" :items="retiroOptions" item-value="id"
								item-text="name" :append-icon="$accessor.mdicons.mdicons.mdiChevronDown" /> -->
							<span v-if="user.role_id > 2">{{user.name|uc}}</span>
							<v-text-field label="NOMBRE Y APELLIDO" v-model="fdata.client" v-if="user.role_id <= 2" />
							<!-- <v-text-field label="TELEFONO" v-model="fdata.phone" /> -->
							<!-- <v-text-field label="EMAIL" v-model="user.email" /> -->
							<v-text-field label="DIRECCIÓN" v-model="fdata.address" />
							<v-select v-model="state_id" label="PROVINCIA" :items="states" item-value="id" item-text="name"
								:append-icon="$accessor.mdicons.mdicons.mdiChevronDown" />
							<v-select v-model="fdata.city_id" label="CIUDAD" :items="cities" item-value="id" item-text="name"
								:append-icon="$accessor.mdicons.mdicons.mdiChevronDown" />
							<v-text-field label="CODIGO POSTAL" v-model="fdata.cp" />
							<v-textarea rows="2" label="DEJANOS UN MENSAJE" v-model="fdata.message" />
						</div>
					</v-col>
					<v-col cols="12" lg="6" class="btnItems">
						<v-btn nuxt to="/cotizador" large tile depressed outlined color="tertiary" class="style-button">
							AGREGAR MAS PRODUCTOS
						</v-btn>
					</v-col>
					<v-col cols="12" lg="4" class="btnItems">
						<v-btn large @click="send" tile depressed color="primary">
							ENVIAR PEDIDO
						</v-btn>
					</v-col>
					<v-col cols="12">
						<v-container class="shopContainer">
							<shopList class="shopList" />
						</v-container>
					</v-col>
					<v-col cols="12" lg="6" class="btnItems">
						<v-btn nuxt to="/cotizador" large tile depressed outlined color="tertiary" class="style-button">
							AGREGAR MAS PRODUCTOS
						</v-btn>
					</v-col>
					<v-col cols="12" lg="4" class="btnItems">
						<v-btn large @click="send" tile depressed color="primary">
							ENVIAR PEDIDO
						</v-btn>
					</v-col>
				</v-row>
			</div>
			<div v-if="!total && validateUser" class="fc text-center ">
				<h2>
					AGREGA PRODUCTOS AL CARRITO PARA ENVIAR UN PEDIDO
				</h2>
				<div>
					<v-btn large tile depressed outlined class="mt-4" nuxt to="/cotizador">IR A AGREGAR PRODUCTOS</v-btn>
				</div>
			</div>
			<div v-if="!validateUser" class="fc text-center">
				<div class="fcc mt-4">
					<span class="titleNotUser">INGRESA O REGISTRATE PARA EMPEZAR A COMPRAR</span>
					<div class="mt-4 fcc">
						<span class="mt-4 mb-2">¿ YA TENES TU USUARIO ? </span>
						<v-btn link to="/login" tile dark depressed>INGRESA</v-btn>
						<v-divider></v-divider>
						<span class="mt-4 mb-2">¿TODAVIA NO TENES CUENTA?</span>
						<v-btn link to="/registrate" tile dark depressed>REGISTRATE</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import swal from 'sweetalert'
	import shopList from './shoplist.vue'
	import editOrder from './editOrder.vue'
	import modal from '@/components/common/Modal'
	import {
		User
	} from '~/types'
	import configs from '~/store/configs'
	export default {
		components: {
			shopList,
			editOrder,
			modal
		},
		mounted() {
			if (this.editMode && this.editOrder) {
				//this.editOrder.order_items = this.list
				this.showEditMode = true
			}
			this.$accessor.states.fetchStates();
			this.$accessor.retiroOptions.fetchRetiroOptions();
			this.$accessor.orders.fetchUserOrders();
			if (!this.admin && this.userLastOrder) {
				this.fdata.phone = this.userLastOrder.phone;
				this.fdata.address = this.userLastOrder.address;
				this.fdata.cp = this.userLastOrder.cp;
				this.state_id = this.findState(this.userLastOrder.city_id).id
				this.fdata.city_id = this.userLastOrder.city_id
			}
		},
		data() {
			return {
				showEditMode: false,
				infoItems: [
					'Debajo del formulario esta la lista de los productos que elegiste por si querés re chequear o hacer algún cambio.',
					'Despues de que completes y envies el formulario, aguardá el contacto de nuestro sector de ventas.'
				],
				fdata: {
					user_id: 0,
					client: '',
					phone: '',
					email: '',
					address: '',
					transport: '',
					cp: '',
					message: '',
					city_id: null,
					total: 0,
					retiro_id: 1
				},
				state_id: null,
			}
		},
		computed: {
			shipping() {
				return this.fdata.retiro_id === 1;
			},
			retiroOptions() {
				return this.$accessor.retiroOptions.getNotPausedRetiroOptions
			},
			total() {
				return this.$accessor.shop.getTotal
			},
			editMode() {
				return this.$accessor.shop.onEditMode
			},
			editOrder() {
				return this.$accessor.shop.getEditOrder
			},
			products() {
				return this.$accessor.products.getProducts
			},
			list() {
				return this.$accessor.shop.getList
			},


			title() {
				let def = 'Ultimo paso para terminar tu pedido';
				if (!this.metadata) return def;
				return this.metadata.title || def
			},
			description() {
				let def = '';
				if (!this.metadata) return def;
				return this.metadata.description || def
			},
			metadata() {
				return this.$accessor.pageMetas.getMeta('carrito')
			},
			states() {
				let getter = this.$accessor.states.getStates;
				return getter;
			},
			state() {
				return this.states.find(st => {
					return st.id == this.state_id
				})
			},
			cities() {
				if (!this.state) return []
				return this.state.cities
			},
			user() {
				return this.$auth.user
			},
			admin() {
				return this.user.role_id <= 2
			},
			validateUser() {
				return !!this.$auth.user
			},
			configs() {
				return this.$accessor.configs.getConfigs
			},
			minimo() {
				if (this.user && this.user.role_id <= 2) return 1;
				return (this.shipping ? this.configs.minbuy_ship : this.configs.minbuy)
			},
			userLastOrder() {
				let userOrders = this.$accessor.orders.getUserOrders.reverse()
				return userOrders[0]
			},
		},
		methods: {
			validateBeforeSend() {
				/* if (!this.fdata.phone) {
					swal('Cuidado', 'Completa tu teléfono para continuar', 'error')
					return false
				} */
				if (!this.fdata.city_id) {
					swal('Cuidado', 'Selecciona una ciudad para continuar', 'error')
					return false
				}
				/* if (!this.fdata.retiro_id) {
					swal('Cuidado', 'Selecciona una opcion para retirar', 'error')
					return false
				} */
				return true;
			},
			validateMinBuy() {
				if (this.total < this.minimo) {
					swal('Cuidado', `el minimo de compra es de $${this.minimo}`, 'error')
					return false
				}
				return true
			},
			async send() {
				if (!this.user) return;
				if (!this.validateMinBuy()) return
				this.fdata.user_id = this.user.id;
				if (!this.validateBeforeSend()) return;

				/* let continueSending = await this.controlList();
				if (!continueSending) {
					return;
				} */

				this.$accessor.setLoading(true)
				this.fdata.total = this.total;
				this.$accessor.shop.setUserData(this.fdata);
				await this.$accessor.shop.send();
				this.$accessor.setLoading(false);
				swal('Recibimos tu pedido!', 'Un asesor de ventas se estará comunicando a la brevedad', 'success')
					.then(() => {
						this.$router.push('/encuesta')
					})
			},
			async controlList() {

				/* Pide la  lista de productos y modelos en el pedido al servidor
				para controlar si algo cambio de precio o fue pauasdo mientras el usuario hacia el pedido */

				if (this.admin) return true;

				var vm = this;
				var continueSending = true;
				let listp = this.compactList(this.list);


				let data = {
					listp: JSON.stringify(listp),
				};
				await vm.$axios.post('/check-list-status', data)
					.then(r => {
						let res = r.data;
						let controlProducts = res.products;

						if (controlProducts) {
							this.list.forEach(listProduct => {
								let controlProduct = controlProducts.find(cp => {
									return cp.id == listProduct.product.id
								})
								if (controlProduct && controlProduct.paused) {
									listProduct.product.paused = 1;
									listProduct.units = 0;
									this.$accessor.shop.updateList(listProduct);
									this.$accessor.products.fetchProducts();
									swal(listProduct.product.name,
										'Este producto ya no se encuentra disponible, revisá tu pedido antes de enviarlo',
										'warning');
									continueSending = false;
								}

								if (controlProduct && (controlProduct.price != listProduct.product.price)) {
									swal(listProduct.product.name,
										'Este producto tuvo un cambio de precio, revisá tu pedido antes de enviarlo.',
										'warning');
									listProduct.product.price = controlProduct.price;
									continueSending = false;
								}
							})
						}

					});
				return continueSending;
			},
			compactList(list) {
				/* convierte la lista de productos y modelos en una lista reducida que contiene solo lis ID
				 y la cantidad de unidades pedidas de cada elemento */
				let res = [];
				list.forEach(item => {
					let compactItem = {
						id: item.product.id,
						units: item.units
					};
					res.push(compactItem);
				});
				return res;
			},
			findState(city) {
				let res = null;
				this.states.forEach(s => {
					let rescity = s.cities.find(c => {
						return c.id === city
					})
					if (rescity) {
						res = s
						return res;
					}
				})
				return res;
			},
		},
	}
</script>

<style lang="scss" scoped>
.titleNotUser{
    font-size: 30px;
    font-weight: bold;
}
.dataform{
    border:2px solid $tertiary;
    padding: 20px;
    margin: 15px 15% 15px 15%;
}
@media(max-width:660px){
    .btnItems{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:100%;
    }
    .dataform{
        padding: 10px;
        margin: 20px 5px;
    }
    .shopContainer{
        overflow-x: scroll;
        font-size: 80%;
    }
    .shopList{
        min-width: 140%;
    }
}
</style>
