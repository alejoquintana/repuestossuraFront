<template>
        <div>
           <closeAccount/>
        </div>
</template>

<script>
import closeAccount from '@/components/auth/close-account.vue';
export default {
    name:'cerrar-cuenta',
    components: { closeAccount },
    layout:'default',
};
</script>
<style scoped>
.chat-container {
    background: #FAFAFA;
    height: 90vh;
    font-family: 'Nunito Sans';
}
</style>
