<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/categorias/ImportarCategorias.vue'
export default {
	name:'importar-categroias-admin-page',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
