<template>
  <div>
    <div v-if="category && category.id">
        <nuxt-link :to="category.slug">
            <div class="contenedor">
                <div class="imagecategory" :style="borderStyle">
                    <loader-img :src="image" :alt="category.name" />
                </div>
                <div class="textcategory styled-label" :style="backgroundStyle">
                    <span>{{category.name | uc}}</span>
                </div>
            </div>
        </nuxt-link>
    </div>      
  </div>
</template>

<script>
export default {
    props: ["category","color"],
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
    }
}
</script>

<style lang="scss" scoped>
    .contenedor{
        padding: 2% 10% 2% 40%;
        position: relative;
        display: flex;
        align-items: center;
    }
    .imagecategory{
        border-radius: 24px;
        overflow: hidden;
        z-index: 4;
        width: 100%;
    }
    .textcategory{
        position: absolute;
        z-index: 5;
        width: 60%;
        left: 0;
        top: 40;
        color:#fff;
        text-shadow: 2px 2px 2px #000C;
        text-align: center;
        padding: 13px;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 3px 3px 3px #0006;
    }
</style>