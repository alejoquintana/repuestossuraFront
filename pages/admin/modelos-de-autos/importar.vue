<template>
  <div>
    <pageComponent></pageComponent>
  </div>
</template>

<script>
import pageComponent from '@/components/admin/modelos-de-autos/ImportModels.vue'
export default {
    name:'importar-modelos-de-autos-admin-page',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
