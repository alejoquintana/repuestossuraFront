<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/marcas-de-autos/ImportBrands.vue'
export default {
    name:'importar-marcas-de-autos-admin-page',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
