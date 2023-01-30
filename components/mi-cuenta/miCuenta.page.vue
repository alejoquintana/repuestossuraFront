<template>
	<div>
		<div class="fcc">
			<v-row class="w-100">
				<v-col cols="12" lg="7">
					<h1 class="titlePage">{{title}}</h1>
					<span class="descriptionPage">{{description}}</span>
					<div class="fc">
						<span> NOMBRE: {{user.name | uc}} </span>
						<span> EMAIL: {{user.email | uc}} </span>
					</div>
				</v-col>
				<v-col cols="12" lg="5">
					<v-btn class="mt-4" nuxt to="/logout" dark color="red">
						<v-icon> CERRAR SESIÓN </v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<div class="w-100 fcc">
				<h3>MIS PEDIDOS</h3>
				<v-simple-table v-if="orders && orders.length">
					<template class="table table-striped table-bordered mt-3">
						<thead>
							<tr>
								<th>Número de Pedido</th>
								<th>Fecha</th>
								<th>Total</th>
								<th>Formulario</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="order in orders" :key="order.id">
								<td> #{{order.id}} </td>
								<td> {{order.created_at | date}} </td>
								<td> ${{ order.edited ? order.edited_total : order.total}} </td>
								<td>
									<v-btn link color="primary" :href="`${backendpath}/pdf/${user.reg_verif_code}/${order.id}`"
										target="_blank">
										<v-icon>{{$accessor.mdicons.mdicons.mdiFilePdf}}</v-icon>
										PDF
									</v-btn>
								</td>
							</tr>

						</tbody>
					</template>
				</v-simple-table>
			</div>

			<div class="mt-4 pt-4">
				<v-btn large color="red" class="white--text" nuxt to="/cerrar-cuenta">QUIERO BORRAR MIS DATOS</v-btn>
			</div>

		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            defaultTitle:'Mi Cuenta',
            defaultDescription:''
        }
    },
    computed:{
        meta(){
            return this.$accessor.pageMetas.getMeta('mi-cuenta');
        },
        title(){
            if(!this.meta)return this.defaultTitle
            return this.meta.title || this.defaultTitle
        },
        description(){
            if(!this.meta)return this.defaultDescription
            return this.meta.description || this.defaultDescription
        },
        user(){
            return this.$auth.user
        },
        orders(){
            return this.$accessor.orders.getUserOrders
        },
        backendpath(){
            return this.$accessor.helpers.backendpath
        },
    },
    mounted(){
        this.$accessor.orders.fetchUserOrders()
    }
}
</script>

<style lang="scss" scoped>
.btnSalir{
    position: absolute;
    right:10%;
    margin-top: 20px;
}
</style>
