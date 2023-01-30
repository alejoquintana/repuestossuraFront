<template>
  <div>
    <h2>IMPORT TEST</h2>
    <csvImport />
  </div>
</template>

<script>
  import csvImport from '~/components/common/CsvImport.vue'
export default {
    layout:'categories',
    name:'encuesta-page',
    components:{csvImport}
}
</script>

<style>

</style>