<template>
<div>
    <v-fade-transition>
        <div class="snackbar-container" v-if="showSnackbar">
            <div class="snackbar snack-gradient">
               {{snackbarMessage}}
            </div>
        </div>
    </v-fade-transition>
</div>
</template>

<script>
export default {
    methods:{
        showAndClose(){
            let time = this.seconds ? (this.seconds*1000) : 2000
            setTimeout(() => {
                this.$accessor.setShowSnackbar(false);
                this.$accessor.setSnackbarMessage('');
            }, time );
        }
    },
    computed:{
        showSnackbar(){
            return this.$accessor.getShowSnackbar
        },
        snackbarMessage(){
            return this.$accessor.snackbarMessage
        }
    },
    mounted(){
        if(this.showSnackbar){
            this.showAndClose();
        }
    },
    watch:{
        showSnackbar(){
             if(this.showSnackbar){
                this.showAndClose();
            }
        }
    }
}
</script>

<style scoped>

.snack-gradient{
   background: rgb(2,0,36);
    background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(40,97,231,0.9766281512605042) 49%, rgba(103,14,50,1) 100%);
}
.snackbar-container{
         position:fixed;
         display: flex;
         width:100vw;
         justify-content: center;
        top:15px;
        z-index: 9999;
}
    .snackbar{
        justify-content: center;
        display:flex;
        margin:auto;
        width:50vw;
        min-width: 250px;
        color:#fff;
        font-weight: bold;
        font-size: 25px;
        text-align: center;
        z-index: 9999;
    }
</style>