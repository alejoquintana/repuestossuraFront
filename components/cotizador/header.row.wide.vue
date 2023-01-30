<template>
<div>
    <div v-if="category && category.id" @click="toggle">
        <a :href="'#c'+category.id">
            <v-container class="py-0">
                <v-row class="contenedor mt-1 ma-0">
                    <div class="imageCategory">
                        <loader-img :aspectRatio="1/1.3" :src="image" :alt="category.name" />
                    </div>
                    <v-col cols="7"  class="px-0">
                        <span class="textCategory border-x px-8">{{category.name}}</span>
                    </v-col>
                    <v-col cols="2" class="d-flex align-center justify-space-around">
                        <v-icon color="tertiary" outlined large>
                            {{desplegado ? $accessor.mdicons.mdicons.mdiChevronUp : $accessor.mdicons.mdicons.mdiChevronDown}}
                        </v-icon>
                    </v-col>
                </v-row>
            </v-container>
        </a>
    </div>
</div>
</template>

<script>
export default {
    props:['category','color','desplegado'],
    computed: {
        image(){
            if (!this.category || !this.category.id)return
            return this.$accessor.helpers.imagePath(this.category.image)
        },
        borderStyle(){
            return `border:6px solid ${this.color};`
        },
        backgroundStyle(){
            return `background-color:${this.color};`
        }
    },
    methods:{
        toggle(){
            this.$emit('toggleDesplegado')
        },
    }
}
</script>

<style lang="scss" scoped>
.contenedor{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border: 3px solid $blue;
}
.imageCategory{
    //overflow: hidden;
    width: 12%;
}
.textCategory{
    font-size: 36px;
    font-weight: bold;
    color: $blue;
}
.border-x{
    border-right: 2px solid $blue;
    border-left: 2px solid $blue;
}
</style>
