<template>
    <div>
        <span v-if="sucursal.paused" class="info--text font-weight-bold">SUCURSAL PAUSADA</span>
        <h3>{{sucursal.name}}</h3>
        <v-row>
            <v-col cols="12" lg="6" v-if="sucursal.map_url">
                  <iframe  :title="sucursal.name" :src="sucursal.map_url" 
                        width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
            </v-col>
            <v-col cols="12" lg="6" class="fc pt-4">
                <div v-for="field in fieldList" :key="field.field" class="mt-2" >
                    <div v-if="sucursal[field.field]">
                        <b>{{field.label}} </b>{{sucursal[field.field]}}
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props:['sucursal'],
    data() {
        return {
            fieldList:[
                {field:'address',label:'DIRECCION:'},
                {field:'atention',label:'ATENCION:'},
                {field:'phone',label:'TELEFONO:'},
                {field:'description',label:''},
                ]
        }
    },
}
</script>