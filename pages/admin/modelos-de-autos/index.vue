<template>
  <div>
    <pageComponent></pageComponent>
  </div>
</template>

<script>
import pageComponent from '@/components/admin/modelos-de-autos/Models.vue'
export default {
    name:'modelos-de-autos-admin-page',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
