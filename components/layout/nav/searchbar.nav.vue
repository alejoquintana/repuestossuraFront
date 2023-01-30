<template>
    <div class="d-flex align-center">
        <input type="text" placeholder="Qué estás buscando?" v-model="searchTerm"
            class="w-100 input-search py-1" @keyup.13="send"
        >
        <v-icon class="icon py-1" @click="send">
            {{$accessor.mdicons.mdicons.mdiMagnify}}
        </v-icon>
      <!-- <v-text-field v-model="searchTerm"
                  outlined
                  :dense="$mq!='lg'"
                  class="mt-3 searchbar"
                  hide-details
                  label=""
                  :append-icon="$accessor.mdicons.mdicons.mdiSearchWeb"
                  /> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTerm:''
        }
    },
    methods:{
        send(){
        if(!this.searchTerm)return
        this.$accessor.searchResults.saveSearchHistory(this.searchTerm);
        this.$router.push({ path: 'resultados-de-busqueda', query: { term: this.searchTerm } })
        }
    },
  /*
  computed:{
    searchTermStore(){
      return this.$accessor.searchResults.getSearchTerm
    }
  },
  watch:{
    searchTermStore(){
      this.searchTerm = this.searchTermStore
    }
  } */
}
</script>

<style lang="scss" scoped>
.input-search{
    border: 2px solid $tertiary;
    padding-left: 35px;
}
.icon{
    border: 2px solid $tertiary;
    border-left: none;
    color: $primary;
    //font-weight: bold;
}
@media(max-width:660px){
  .searchbar{
    font-size:12px;
  }
}
</style>
