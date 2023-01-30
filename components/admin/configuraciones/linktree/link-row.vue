<template>
<v-row class="relative">
    <v-col cols="4">
        <nuxt-link v-if="isNuxtLink(link.url)" :to="link.url">
            <div class="linktree-btn">
                {{link.name | uc}}
                <span v-if="link.paused">- PAUSADO</span>
            </div>
        </nuxt-link>
        <a v-if="!isNuxtLink(link.url)" :href="link.url" target="_blank">
            <div class="linktree-btn">
                {{link.name | uc}}
                <span v-if="link.paused">- PAUSADO</span>
            </div>
        </a>
    </v-col>
    <v-col cols="8" class="d-flex justify-space-between align-center">
        <div class="d-flex justify-space-between align-center">
            <!-- <v-btn class="mx-1" color="primary">EDITAR</v-btn> -->
            <v-btn @click="togglePaused" class="mx-1" :color="link.paused ? 'success' : 'accent'">
                {{link.paused ? 'ACTIVAR' : 'PAUSAR'}}
            </v-btn>
            <v-btn @click="destroy(link.id)" class="mx-1" color="error">BORRAR</v-btn>
        </div>
        <v-row v-if="link.code == 'custom'">
            <v-col cols="6">
                <v-text-field @change="update('name')" v-model="link.name" label="Nombre" hide-details dense />
            </v-col>
            <v-col cols="6">
                <v-text-field @change="update('url')" v-model="link.url" label="Url" hide-details dense />
            </v-col>
        </v-row>
    </v-col>
</v-row>
</template>

<script>
export default {
    props:['link'],
    methods:{
        togglePaused(link){
            this.link.paused = !this.link.paused
            this.update('paused')
        },
        async update(field){
            let value = this.link[field]
            if (field == 'url') {
                value = await this.$accessor.helpers.sanitizedLink(value)
            }
            let data = {
                id: this.link.id,
                field: field,
                value: value,
            }
            await this.$accessor.linktreeLinks.updateLink(data)
            this.$accessor.snackbarNotify('link actualizado');
            this.$emit('fetch')
        },
        async destroy(id){
            await swal({
                title:`Confirmar borrado del link ${this.link.name}`,
                text:'desea continuar?',
                buttons:{
                    cancel:{text:'NO',visible:true,closeModal:true,value:false},
                    confirm:{text:'SI'},
                }
            }).then( async (r) => {
                if(!r)return;
                await this.$accessor.linktreeLinks.deleteLink(id)
                this.$accessor.snackbarNotify('link borrado');
                this.$emit('fetch')
            })

        },
        isNuxtLink(link){
            if (link.includes('repuestossura.com') || link[0] == '/') {
                return true
            }
            return false
        },
    }
}
</script>
