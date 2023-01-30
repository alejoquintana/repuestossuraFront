<template>
    <div>Login out...</div>
</template>

<script>
export default {
    name:'logout',
    mounted(){
        this.$axios.get('/logout')
            .then(res => {
                if(process.browser){
                    window.location.replace('/');
                }
            });
    }
}
</script>


<style lang="scss" scoped>
    .card-header{
        color:$tertiary;
        font-weight: bold;
        font-size: 22px;
    }
    .mtc{
        margin-top:30px;
    }
</style>
