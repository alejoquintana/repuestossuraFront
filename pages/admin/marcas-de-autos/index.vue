<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/marcas-de-autos/Brands.vue'
export default {
    name:'marcas-de-autos-admin-page',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
