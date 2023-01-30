<template>
    <div>
        <h3>Iniciando sesion...</h3>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: this.$route.query.token ? this.$route.query.token : null
        }
    },
    mounted(){
        if(!this.token){ this.$router.push('/registrate') }
        
        this.$auth.login({
          data:{
              token:this.token
          }
        }).catch(e => {
            this.$router.push('/registrate') 
        })
    }

}
</script>