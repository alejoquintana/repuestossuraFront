<template>
<v-row  class="mt-4 align-center">
    <v-col cols="4">
        <p class="mb-0 p-input" @click="edit = true" v-if="!edit">{{text.text}}</p>
        <v-text-field hide-details outlined autofocus v-if="edit" @change="update('text')" v-model="text.text" />
    </v-col>
    <v-col cols="1">
    <v-btn fab small :color="text.paused ? 'warning':'success'" @click="togglePaused">
        <v-icon>
            {{text.paused ? $accessor.mdicons.mdicons.mdiPause : $accessor.mdicons.mdicons.mdiPlay}}
        </v-icon>
    </v-btn>
    <v-btn fab small color="error" @click="destroy">
        <v-icon>
            {{$accessor.mdicons.mdicons.mdiTrashCan}}
        </v-icon>
    </v-btn>
    </v-col>
</v-row>
</template>

<script>
export default {
    props:['text'],
    components: {

    },
    data(){return{
        edit:false,
    }},
    computed: {

    },
    methods: {
        togglePaused(){
            this.text.paused = !this.text.paused
            this.update('paused')
        },
        async update(field){
            let data = {
                id:this.text.id,
                field:field,
                value:this.text[field],
            }
            await this.$accessor.blackBarTexts.update(data)
            this.$accessor.snackbarNotify('Texto actualizado');
        },
        async destroy(){
            await swal({
                title:`Confirmar borrado del texto ${this.text.text}`,
                text:'desea continuar?',
                buttons:{
                    confirm:{text:'SI'},
                    cancel:{text:'NO',visible:true,closeModal:true,value:false},
                }
            }).then( (r) => {
                if(!r)return;
                this.$accessor.blackBarTexts.delete(this.text.id).then(()=>{
                    this.$accessor.snackbarNotify('Texto borrado');
                    this.$emit('fetch')
                })
            })
        },
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
.p-input{
    padding: 14px 10px;
    border: 1px solid $primary;
    border-radius: 4px;
}
</style>
