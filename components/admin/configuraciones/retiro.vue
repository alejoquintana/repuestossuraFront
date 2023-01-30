<template>
    <div class="fc">
        <div>
            *Los puntos de retiro aparecen como opcion para el cliente en el formulario de envio de pedido.
        </div>
        <div>
            <v-btn color="primary" @click="create">NUEVO PUNTO DE RETIRO</v-btn>
        </div>
        <v-row align="center" class="mt-3" v-for="retiro in retiroOptions" :key="retiro.id">
            <v-col cols="1">
                <v-icon large color="primary">{{retiro.id == 1 ?  $accessor.mdicons.mdicons.mdiTruck : $accessor.mdicons.mdicons.mdiHome}}</v-icon>
            </v-col>
            <v-col cols="4">
                <v-text-field @change="saveChange(retiro,'code')" label="CODIGO" v-model="retiro.code" :disabled="retiro.id === 1"/>
            </v-col>
            <v-col cols="4">
                <v-text-field @change="saveChange(retiro,'name')" label="NOMBRE" v-model="retiro.name" :disabled="retiro.id === 1"/>
            </v-col>
            <v-col cols="1" class="font-weight-bold" :class="retiro.active ? 'success--text' : 'info--text'">
                {{retiro.active ? 'ACTIVO' : 'PAUSADO'}}
            </v-col>
            <v-col cols="1" class="fc" >
                <v-btn :color="retiro.active ? 'info' : 'success'" @click="toggle(retiro,'active')">
                    <v-icon>
                        {{retiro.active ? $accessor.mdicons.mdicons.mdiPause : $accessor.mdicons.mdicons.mdiPlay}}
                    </v-icon>
                </v-btn>
            </v-col>

        </v-row>
    </div>
</template>

<script>
export default {
    computed:{
        configs(){
            return this.$accessor.configs.getConfigs
        },
        retiroOptions(){
            return this.$accessor.retiroOptions.getRetiroOptions;
        }
    },
    methods:{
        async create(){
            let data = {
                code: 'nuevo',
                name:'nuevo'
            }
            await this.$accessor.retiroOptions.create(data);
            await this.$accessor.retiroOptions.fetchRetiroOptions();
            this.$accessor.snackbarNotify('Nuevo punto de retiro creado');
        },
        async destroy(id){
            await this.$accessor.retiroOptions.destroy(id)
            this.$accessor.snackbarNotify('punto de retiro borrado');
            this.$accessor.retiroOptions.fetchRetiroOptions();
        },
        async saveChange(retiro,field){
            await this.$accessor.retiroOptions.update({id:retiro.id,field:field,value:retiro[field]})
            this.$accessor.snackbarNotify('Cambio guardado');
        },
        async toggle(retiro,field){
            let value = retiro[field] ? 0 : 1;
            let data = {
                id:retiro.id,
                field:field,
                value:value
            }
            retiro[field] = !retiro[field];
            await this.$accessor.retiroOptions.update(data);
            this.$accessor.snackbarNotify('Cambio guardado');
        }
    },
    mounted(){
        this.$accessor.retiroOptions.fetchRetiroOptions();
    }
}
</script>