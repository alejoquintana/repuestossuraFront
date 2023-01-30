<template>
<div>
    <div v-if="users">
        <v-row>
            <v-col cols="8">
                <input type="text" v-model="search" class="form-control" >
            </v-col>
            <v-col cols="2">
                <v-btn block color="info" @click="fetch">
                    BUSCAR
                </v-btn>
            </v-col>
        </v-row>
        <v-simple-table class="table-striped mt-4">
            <thead>
                <!-- <td>Tipo usuario</td> -->
                <th>Nro cliente</th>
                <th>Nombre</th>
                <th>Servicio</th>
                <th>Mail</th>
                <th>Fecha registro</th>
                <!-- <th>Estado registro</th> -->
                <th>-</th>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <!--
                    <td>{{user.role_id == 1 ? 'SUPER' : user.role_id == 2 ? 'ADMIN' : 'CLIENTE'}}</td>
                    -->
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.service}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.created_at|date}}</td>
                    <!--  <td>
                        <button @click="blockUser(user)"
                                class="btn btn-block btn-danger"
                                >
                                BLOQUEAR
                        </button>
                    </td> -->
                    <td><button class="btn btn-block btn-primary" @click="changePassOf(user)">CAMBIAR CONTRASEÑA</button></td>
                </tr>
            </tbody>
        </v-simple-table>
        <v-btn color="primary" block class="mt-4" v-if="pagination.next_page_url" @click="fetchMore">
            CARGAR MAS
        </v-btn>
    </div>

    <span v-if="!users">Cargando datos...</span>

    <modal v-if="propuser && showChangePass" @close="closeModal()">
        <div class="fcc">
            <span class="passTitle">Cambiar contraseña a</span>
            <span class="passSubTitle text-primary">{{propuser.email}}</span>
            <changePass class="mt-4" @closeModal="closeModal()" :propuser="propuser"></changePass>
        </div>
    </modal>
</div>
</template>

<script>
import modal from '@/components/common/Modal'
import changePass from './changePass.vue'
    export default {
        components:{changePass,modal},
        data(){return{
            search:'',
            users:null,
            pagination:null,
            propuser:null,
            showChangePass:false
        }},
        mounted(){
            this.fetch();
        },
        methods:{

            fetch(){
                let url = '/users-list';

                if(this.search.trim() && this.search.trim().length > 1)
                {
                    url = `/users-list/${this.search}`
                }
              console.log('url',url);
                this.$axios.get(url)
                .then(r => {
                    this.pagination = r.data;
                    this.users = r.data.data;
                })
            },
            fetchMore(){
                if(this.pagination.next_page_url)
                {
                    this.$axios.get(this.pagination.next_page_url)
                        .then( r => {
                            this.pagination = r.data;
                            this.users = this.users.concat(r.data.data);
                        })
                }
            },
            changePassOf(user){
                this.propuser = user;
                this.showChangePass = true;
            },
            closeModal(){
                this.propuser = null;
                this.showChangePass = false;
            }
        },
        computed:
        {
            total()
            {
                return this.users.length
            },

        }
    }
</script>

<style lang="scss" scoped>
.passTitle{
    font-size: 32px;
    font-weight: 500;
}
.passSubTitle{
    font-size: 28px;

}
</style>
