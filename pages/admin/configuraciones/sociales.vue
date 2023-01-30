<template>
    <div>
        <pageComponent></pageComponent>
    </div>
</template>

<script>
import pageComponent from '@/components/admin/configuraciones/sociales.vue'
export default {
    components:{pageComponent},
    layout:'admin',
    middleware:'checkAdmin' 
}
</script>