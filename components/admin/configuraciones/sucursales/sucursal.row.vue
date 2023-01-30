<template>
    <div>
        <v-divider color="blue"></v-divider>
        <v-row>
            <v-col cols="6">
                <span v-if="sucursal.paused" class="info--text font-weight-bold">SUCURSAL PAUSADA</span>
                <h3>{{sucursal.name}}</h3>
            </v-col>
            <v-col cols="6">
                <v-btn :color="sucursal.paused ? 'success' : 'info'" @click="toggle('paused')">
                    <v-icon>
                        {{sucursal.paused  ?  $accessor.mdicons.mdicons.mdiPlay : $accessor.mdicons.mdicons.mdiPause }}
                    </v-icon>
                    <span>
                        {{sucursal.paused ? 'ACTIVAR' : 'PAUSAR'}}
                    </span>
                </v-btn>
                <v-btn  class="ml-4" color="red" dark @click="destroy">
                    <v-icon left>
                        {{$accessor.mdicons.mdicons.mdiTrashCan}}
                    </v-icon>
                    BORRAR
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"  v-for="field in fieldList" :key="field.field"> 
                <v-textarea rows="1" :label="field.label" 
                            v-model="sucursal[field.field]"
                            @change="saveChange(field.field)" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <preview :sucursal="sucursal"></preview>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import preview from './sucursal.preview'
export default {
    components:{preview},
    props:['sucursal'],
    data() {
        return {
            fieldList:[
                {field:'name',label:'NOMBRE'},
                {field:'atention',label:'HORARIOS DE ATENCION'},
                {field:'address',label:'DIRECCION'},
                {field:'phone',label:'TELEFONO'},
                {field:'map_url',label:'URL MAPS'},
                {field:'description',label:'DESCRIPCION'},
                ]
        }
    },
    methods:{
        toggle(field){
            let data  = {
                id : this.sucursal.id,
                field:'paused',
                value: this.sucursal.paused ? 0 : 1
            }
            this.$accessor.sucursales.update(data);
            this.sucursal.paused = !this.sucursal.paused;
        },
        saveChange(field){
            let data = {
                id:this.sucursal.id,
                field:field,
                value:this.sucursal[field]
            }
            this.$accessor.sucursales.update(data)
        },
        destroy(){
            this.$accessor.sucursales.destroy(this.sucursal.id);
            this.$accessor.sucursales.fetchLocations();
        }
    }
}
</script>