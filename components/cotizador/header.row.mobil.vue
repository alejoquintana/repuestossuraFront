<template>
<div>
    <div v-if="category && category.id" @click="toggle">
        <a :href="'#c'+category.id">
            <div class="contenedor mb-1 d-flex align-center justify-space-between">
                <span class="textCategory ml-8">{{category.name}}</span>
                <v-icon color="tertiary">{{desplegado ? $accessor.mdicons.mdicons.mdiChevronUp : $accessor.mdicons.mdicons.mdiChevronDown}}</v-icon>
                <loader-img :aspectRatio="1/1.3" class="imageCategory" :src="image" :alt="category.name" />
            </div>
        </a>
    </div>
</div>
</template>

<script>
export default {
    props:['category','desplegado'],
    computed: {
        image(){
            if (!this.category || !this.category.id)return
            return this.$accessor.helpers.imagePath(this.category.image)
        },
    },
    methods:{
        toggle(){
            this.$emit('toggleDesplegado')
        },
    }
}
</script>

<style lang="scss" scoped>

.imageCategory {
	max-width: 23%;
}

.contenedor {
	//width: 100vw;
	//margin-right: -24px;
	//margin-left: -24px;
	background-color: #fff;
	border: 3px solid $blue;
}

.textCategory {
	font-size: 18px;
	font-weight: bold;
	color: $blue;
}
</style>
