<template>
    <div>
        <div v-if="category && category.id" class="container" :class="selected ? 'selected-category' : '' ">
            <div class="text-category py-4">
                <nuxt-link :to="category.slug">
                    <span class="name">{{category.name}}</span>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["category","color"],
    computed: {
        selected(){
            return this.$route.path == this.category.slug
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        position: relative;
        padding: 0;
    }
    .text-category{
        color:#000;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        border-top: 2px solid $tertiary;
        border-right: 2px solid $tertiary;
        border-left: 2px solid $tertiary;
            transition: 0.5s background-color;
        .name{
            transition: 0.5s color;
        }
    }
    .text-category:hover, .selected-category{
        .name{
            color:#fff !important;
        }
        background-color:#000;
    }
</style>
