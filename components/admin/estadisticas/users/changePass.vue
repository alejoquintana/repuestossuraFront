<template>
    <div class="fcc">
        <input type="text" placeholder="INGRESAR PASSWORD" class="form-control" v-model="newPass1">
        <input type="text" placeholder="VOLVER A INGRESAR PASSWORD" class="form-control mt-2" v-model="newPass2">
        <button @click="savePass()" :disabled="!newPass1 && !newPass2"
            class="btn mt-2 btn-block btn-primary">GUARDAR</button>
    </div>
</template>


<script>
import swal from 'sweetalert'
export default {
    props:['propuser'],
    data() {
        return {
            newPass1:null,
            newPass2:null
        }
    },
    methods:{
        savePass(){
            if (!this.newPass1 && !this.newPass2)return
            if (!this.validPassword())return
            let data = {
                user_id : this.propuser.id,
                newPass : this.newPass1
            }
            this.$axios.put('/super/change-user-pass',data)
                .then(r => {
                    this.newPass1 = null;
                    this.newPass2 = null;
                    swal("Se cambio la contraseña correctamente","","success")
                    this.$emit("closeModal")
                })
        },
        validPassword(){
            if (this.newPass1 !== this.newPass2) {
                swal("Las contraseñas no son identicas","","error")
                return false
            }
            if (this.newPass1.length < 8) { 
                swal("Minimo 8 carateres","","error")
                return false
            }
            /* let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if(format.test(this.newPass1)){
                swal("solo puede tener numeros o letras(minuscula o mayuscula)","","error")
                return false
            } */
            return true;
        }
    }
}
</script>
