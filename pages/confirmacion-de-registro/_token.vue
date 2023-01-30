<template>
    <div v-if="loaded" class="mt-4">
        <div v-if="!registered">
            Ocurrio un error.
        </div>
        <div class="form-container" v-if="registered">
            <h3 v-if="registered" class="indigo--text text-center">
                Registro confirmado con exito
            </h3>
            <br>
            <v-divider></v-divider>
            <login class="mt-5"></login>
        </div>
    </div>
</template>

<script lang="ts">
import login from '../login.vue'
import swal from 'sweetalert'
import Vue from 'vue'
import { User } from '~/types';
export default Vue.extend({
    layout:'default',
    components:{login},
    data() {
        return {
            free_until: {} as Date,
            loaded:false,
            registered:false,

        }
    },
    computed:{
        user():User{
            return (this.$auth.user as User)
        },
        admin():boolean{
           return !!this.user
        },
        token():string
        {
            return this.$route.params.token;
        }
    },

    mounted(){
        this.$accessor.setLoading(true);
        if(this.token)
        {
            let data = {token:this.token};
            this.$axios.post('/reg-confirm',data)
                .then(r => {
                    this.loaded = true;
                    this.$accessor.setLoading(false);
                    this.registered=r.data;

                });
        }
    }
})
</script>

<style scoped>
    .form-container{
        max-width:600px;
        margin:auto;
    }
    .login-btn{
    font-size:30px;
    padding:10px 0;
}
.f-card{
    max-width: 600px;
    box-shadow:0px 10px 10px #000c;
}
.f-header{
    text-align:center;
    color:#E80C69;
    background-color: none;
    font-weight: bold;
    font-size: 22px;
    font-size: 30px;
}
.mtc{
    margin-top:30px;
}
@media(max-width:660px){
    .login-btn{
        font-size: 18px;
    }
    .f-card{
        max-width: 360px;
    }
    .f-header{
        font-size: 18px;
    }
}
</style>
