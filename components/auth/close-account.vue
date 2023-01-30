<template>
    <div class="fc">
        <h4 class="red---text">Quiero cerrar mi cuenta y eliminar mis datos</h4>

        <p>
            Al cerrar tu cuenta eliminaremos todos tus datos personales de nuestro sistema, ya no podrás acceder a tu usuario ni a tu historial de pedidos.
        </p>

        <p>
            Esta acción es permanente y no puede ser deshecha.
        </p>
        <h4 class="red--text">¿ Estas seguro de querer eliminar tus datos ? </h4>
        
        <v-row>
            <v-col cols="12" lg="4">
                <v-btn block color="red" v-if="user && !admin" 
                        class="white--text" 
                        @click="deleteUserData">
                        SI, ELIMINAR MIS DATOS
                </v-btn>
            </v-col>
        </v-row>

        <div v-if="!user" class="red--text">
            NO HAY UN USUARIO LOGEADO EN ESTE MOMENTO
        </div>

        <div v-if="admin" class="red--text">
            ESTA ACCION NO ESTA DISPONIBLE PARA ADMINISTRADORES
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        user(){
            return this.$auth.user
        },
        admin(){
            return  ( this.user && this.user.role_id == 1 )
        }
        
    },
    methods:{
        async deleteUserData(){
            if(!this.user)return;
            if(this.user.role_id == 1)return;
            this.$accessor.setLoading(true)
            await this.$axios.post('/delete-user-data');
            this.$accessor.setLoading(false);
            this.$router.push('/logout');
        }
    }
}
</script>