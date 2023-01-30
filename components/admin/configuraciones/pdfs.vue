<template>
    <div class="fc">
        <div>
            <v-btn color="info" @click="trigerJob" :loading="processing">
                GENERARAR CATALOGO DEPOSITO
            </v-btn>

            <v-btn color="success" target="_blank" :href="backendpath+'/descargar-catalogo-grande'"
            :loading="processing">
                Descargar catalogo Deposito
            </v-btn>
            <div v-if="!processing">
            </div>
        </div>
        <!-- <div class="mt-4">
            <v-btn target="_blank" :href="backendpath+'/precios-excel'" color="info">
                DESCARGAR LISTA DE PRECIOS EN EXCEL
            </v-btn>
        </div> -->
    </div>
</template>

<script>
export default {
    components:{},
    data(){
        return{
            interval:null
        }
    },
    computed:{
        backendpath() {
            return this.$accessor.helpers.backendpath;
        },
        processing() {
            return this.$accessor.pdfs.getProcessing;
        },
    },
    methods:{
        trigerJob(){
            this.$accessor.pdfs.trigerJob()
                .then(()=>{
                    swal('Listo!','Espera unos minutos para ver los cambios','success');
                });
        },
        checkProcessing(){
            this.$accessor.pdfs.checkProcessing()
        }
    },
    mounted(){
        var vm = this;
        this.checkProcessing();
        this.interval = setInterval(() => {
            this.checkProcessing()
        }, 5000);
    },
    beforeDestroy(){
        clearInterval(this.interval)
    }
}
</script>
