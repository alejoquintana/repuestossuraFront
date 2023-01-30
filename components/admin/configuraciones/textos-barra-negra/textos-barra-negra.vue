<template>
    <div class="fc">
        <v-row align="center">
            <v-col cols="3">
                <v-text-field v-model="newText" :rules="rules" label="Agregar texto"/>
            </v-col>
            <v-col cols="2">
                <v-btn color="primary" :disabled="disabledRules" @click="create">AGREGAR</v-btn>
            </v-col>
        </v-row>
        <div v-for="text in blackBarTexts" :key="text.id">
            <text-row @fetch="fetch" :text="text"/>
        </div>
    </div>
</template>

<script>
import textRow from "./text-row.vue";
export default {
    components:{textRow},
    data(){
        return{
            newText:'',
            rules: [v => v.length <= 35 || 'Max 35 characters'],
        }
    },
    computed:{
        configs(){
            return this.$accessor.configs.getConfigs
        },
        blackBarTexts(){
            return this.$accessor.blackBarTexts.getTexts
        },
        disabledRules(){
            return !this.newText || this.newText.length >= 35
        }
    },
    methods:{
        saveChange(field,event){
            this.$accessor.configs.update({field:field,value:event})
        },
        create(){
            this.$accessor.blackBarTexts.create({text:this.newText}).then(()=>{
                this.newText = '';
                this.fetch()
            })
        },
        async fetch(){
            await this.$accessor.blackBarTexts.fetchTexts()
        }
    },
    mounted(){
        this.fetch()
    }

}
</script>