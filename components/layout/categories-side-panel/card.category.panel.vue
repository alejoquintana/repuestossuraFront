<template>
    <div>
        <div v-if="category && category.id" class="cont my-1" :class="selected ? 'selected-category' : '' ">
            <div class="extra">
                <nuxt-link :to="category.slug" class="text-false">
                    <div class="my-2">
                        <span>{{category.name | uc}}</span>
                    </div>
                </nuxt-link>
            </div>
            <nuxt-link :to="category.slug" class="text-category">
                <div class="my-2">
                    <v-icon :color="$accessor.helpers.colors.secondary">
                        {{$accessor.mdicons.mdicons.mdiChevronRight}}
                    </v-icon>
                    <span>{{category.name | uc}}</span>
                </div>
            </nuxt-link>
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
    .cont{
        position: relative;
        overflow: hidden;
        .extra{
            left:-100%;
            transition: 0.75s left;
        }
    }
    .cont:hover, .selected-category{
        .extra{
            left:0
        }
    }
    .text-category{
        position: relative;
        color:#000;
        z-index: 5;
        transition: 0.75s color;
    }
    .extra{
        position: absolute;
        background-color: $tertiary;
        width: 75%;
       // border-radius: 0 50px 50px 0;
        .text-false{
            color: $tertiary;
            height: 50px;
        }
    }
</style>
