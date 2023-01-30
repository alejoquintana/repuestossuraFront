<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/importar-relaciones/ImportarRelaciones.vue'
export default {
	name:'importar-relaciones-page',
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin'
}
</script>
