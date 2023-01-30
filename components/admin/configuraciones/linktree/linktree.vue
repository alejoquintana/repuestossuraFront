<template>
<div>
    <v-row class="">
        <v-col cols="3">
            <v-text-field v-model="newName" label="Nombre" hide-details  />
        </v-col>
        <v-col cols="3">
            <v-text-field v-model="newUrl" label="Url" hide-details />
        </v-col>
        <v-col cols="2" class="d-flex align-end">
            <v-btn @click="create" color="success" :disabled="!newName || !newUrl" block>CREAR</v-btn>
        </v-col>
    </v-row>

    <div>

        <div v-for="link in links" :key="link.id">
            <link-row :link="link" @fetch="fetch" />
        </div>
    </div>
</div>
</template>

<script>
import linkRow from './link-row.vue'
export default {
    components:{linkRow},
    data(){return{
        newName:'',
        newUrl:'',
    }},
    computed:{
        links(){
            return this.$accessor.linktreeLinks.getLinks
        }
    },
    methods:{
        async create(){
            let data = {
                name: this.newName,
                url: await this.$accessor.helpers.sanitizedLink(this.newUrl),
            }
            await this.$accessor.linktreeLinks.createLink(data)
            this.newName = '';
            this.newUrl = '';
            this.fetch()
        },
        fetch(){
            this.$accessor.linktreeLinks.fetchLinks()
        }
    },
    mounted(){
        this.fetch()
    }
}
</script>

<style lang="scss" scoped>

</style>