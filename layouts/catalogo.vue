<template>
  <v-app >
      <v-main class="secondary">
        <v-container class="white elevation-5 main-container" >
          <nuxt />
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
    mounted(){
      //this.$accessor.products.fetchallProducts()
    }
}
</script>

<style scoped>
  .main-container{
    max-width:1000px!important;
  }
</style>
