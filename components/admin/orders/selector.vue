<template>
<div>
    <div class="d-flex justify-space-between mt-4">
        <div v-for="opt in options" :key="opt.name" class="px-2 animate"
            :class="status == opt.name ? 'w-50' : 'w-20'">
            <v-btn block tile :outlined="status == opt.name" class="bold"
            :color="opt.color" @click="changestatus(opt.name)">
                {{opt.name | uc}}S
            </v-btn>
        </div>
    </div>
    <!-- <v-row class="mt-2">
        <v-col cols="4" class="m-0 pa-0">
            <v-btn block 
                :color="status == 'nuevo' ? 'warning' : 'secondary'" 
                @click="changestatus('nuevo')" >
                Nuevos
            </v-btn>
        </v-col>
            <v-col cols="4" class="m-0 pa-0">
            <v-btn  block @click="changestatus('visto')" 
                :color="status == 'visto' ? 'success' : 'secondary'">
                Vistos
            </v-btn>
        </v-col>
            
        <v-col cols="4" class="m-0 pa-0">
            <v-btn block  dark @click="changestatus('cancelado')" 
                :color="status == 'cancelado' ? 'red' : 'secondary'">
                Cancelados
            </v-btn>
        </v-col>
        
    </v-row> -->
</div>
</template>


<script>
export default {
    props:['status'],
    data(){
        return{
            options:[
                {name:'nuevo',color:'warning'},
                {name:'visto',color:'primary'},
                {name:'pagado',color:'success'},
                {name:'enviado',color:'info'},
                {name:'cancelado',color:'error'},
            ]
        }
    },
    methods:{
        changestatus(status)
        {
            this.$emit('statusChanged',status);
        }
    }
}
</script>
