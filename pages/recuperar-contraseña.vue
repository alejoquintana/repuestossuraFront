<template>
<v-container class="mtc mt-4">
    <v-row class="justify-center w-100">
        <v-col cols="12" md="8">
            <v-card>
                <v-card-header>Recuperar contraseña</v-card-header>

                <p class="p-2">
                    Ingresa tu correo electronico y te enviaremos una contraseña nueva. Podras cambiarla luego
                </p>
                <div class="card-body">
                    <form  aria-label="login" ref="form" @submit.prevent="send">

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    name="correo"
                                    v-model="formData.email"
                                    label="Correo Electrónico"
                                    id="id"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" lg="4">
                                <v-btn block type="submit" @click.prevent="send"  class="secondary rounded-xl rounded-br-0" >
                                    Enviar
                                </v-btn>
                            </v-col>
                        </v-row>
                     </form>
                </div>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import swal from 'sweetalert'

export default Vue.extend({
    head() {
    return {
      titleTemplate: 'ADMIN',
    }
  },
  layout:'default',
   name:'login',
    metaInfo(){
        return{
        title: 'Login'
        }
    },
    data(){
        return{
            formData:{
                email:'' ,
            }
        }
    },
    methods:{
       async send(){
           if(!this.formData.email || this.formData.email.length < 3)return;
            this.$accessor.setLoading(true);
            this.$axios.post('/restorePass',this.formData)
                .then( (r:any) => {
                    this.$accessor.setLoading(false);
                    if(r.data == 'error')
                    {
                        swal('Error','No tenemos registrado ese correo electronico','error')
                    }
                    else {
                        swal('Listo','Enviamos una nueva contraseña a tu correo electronico','success')
                        .then(()=>{
                            this.$router.push('/recuperar-pass');
                        })
                    }
                });

        }
    },
})
</script>


<style lang="scss" scoped>
    .card-header{
        color:$tertiary;
        font-weight: bold;
        font-size: 22px;
    }
    .mtc{
        margin-top:30px;
    }
</style>
