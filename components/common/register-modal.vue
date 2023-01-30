<template>
  <div>
      <modal @close="closeModal" v-if="showRegisterModal">
          <div class="fcc mt-4">
            <span>¿ YA TENES TU USUARIO ? </span>
            <v-btn link to="/login" tile dark depressed @click="closeModal">INGRESÁ</v-btn>
            <v-divider></v-divider>
            <span class="mt-4">¿TODAVIA NO TENES CUENTA?</span>
            <v-btn link to="/registrate" tile dark depressed @click="closeModal">REGISTRATE</v-btn>
          </div>
      </modal>
  </div>
</template>

<script>
import modal from './Modal.vue'
export default {
    components:{
        modal
    },
    computed:{
        showRegisterModal(){
            return this.$accessor.getShowRegisterModal
        }
    },
    methods:{
        closeModal(){
            this.$accessor.setShowRegisterModal(false)
        }
    }
}
</script>
