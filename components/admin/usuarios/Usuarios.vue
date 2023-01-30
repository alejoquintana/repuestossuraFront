<template>
<div>

	<v-row class="mt-4 ma-0" justify="space-between" align="center">
		<v-col cols="12" lg="4">
			<h1>Usuarios</h1>
		</v-col>
		<v-col cols="12" lg="4" class="d-flex align-items">
			<v-text-field type="text" v-model="searchTerm" label="Buscar" dense hide-details/>
			<v-btn color="info" @click="search" class="ml-4">
				BUSCAR
			</v-btn>
		</v-col>
	</v-row>
	<v-btn color="primary" class="mt-4 ml-auto" v-if="pagination && pagination.next_page_url" @click="fetchMore">
		CARGAR MAS
	</v-btn>
	<v-simple-table>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Email</th>
				<th>Numero</th>
				<th>Fecha de registro</th>
				<th>CUIL/CUIT</th>
				<th>Razon social</th>
				<th>Nombre de fantasía</th>
				<th>Descuento</th>
				<th>habilitado para comprar</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="user in users" :key="user.id">
				<td>{{user.id}}-{{user.name}}</td>
				<td>{{user.email}}</td>
				<td>{{user.area_code}}-{{user.phone}}</td>
				<td>{{user.created_at}}</td>
				<td>{{user.cuil}}</td>
				<td>{{user.razon_social}}</td>
				<td>{{user.nombre_fantasia}}</td>
				<td class="clickable discount" @click="selectedUser = user">{{user.discount}}%</td>
				<td>
					<div class="fcc">
						<span :class="user.enabled ? 'success--text' : 'error--text'">
							{{user.enabled ? 'HABILITADO' : 'NO HABILITADO'}}
						</span>
						<v-btn depressed x-small :color="user.enabled ?   'error' : 'success'" @click="toggleEnabled(user.id)">
							<span v-if="user.enabled">DESHABILITAR</span>
							<span v-else>HABILITAR</span>
						</v-btn>
					</div>
				</td>
			</tr>
		</tbody>
	</v-simple-table>

	<user-modal v-if="selectedUser" :user="selectedUser" @closeModal="closeModal"></user-modal>

	<v-btn color="primary" class="ml-auto" v-if="pagination && pagination.next_page_url" @click="fetchMore">
		CARGAR MAS
	</v-btn>
</div>
</template>

<script>
import userModal from './user.modal'

export default {
	components: {
		userModal
	},
	data() {
		return {
			searchTerm: '',
			selectedUser: null,
		}
	},
	computed: {
		users() {
			return this.$accessor.users.getUsers
		},
		pagination() {
			return this.$accessor.users.pagination
		},

	},
	methods: {
		search(){
			if(!(this.searchTerm.trim() && this.searchTerm.trim().length > 1)) return
			this.$accessor.users.fetchUsers(this.searchTerm)
		},
		fetchMore(){
			this.$accessor.users.fetchMoreUsers()
		},
		closeModal(){
			this.selectedUser = null
			this.refresh()
		},
		refresh(){
			this.$accessor.users.fetchUsers()
		},
		toggleEnabled(id){
			let user = this.users.find(u => u.id == id)
			if(!user)return;
			user.enabled = !user.enabled
			let data = {
				id: id,
				field: 'enabled',
				value: user.enabled
			};
			this.$accessor.users.update(data)
		},
	},
	mounted(){
		this.refresh()
	}
}
</script>
