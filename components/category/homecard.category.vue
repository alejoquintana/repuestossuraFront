<template>
  <div>
      <nuxt-link :to="category.slug" v-if="category" class="fc px-3">
            <div class="image-container rounded-xl" :style="borderStyle">
                <loader-img contain :aspectRatio="1/1.3" :src="$accessor.helpers.imagePath(category.image)" :alt="category.name" />
            </div>
            
            <div class="name-container" :style="backgroundStyle">
                <span>{{category.name}}</span>
            </div>
      </nuxt-link>
  </div>
</template>

<script>
export default {
    props:['category','color'],
    computed:{
        borderStyle(){
            return `border:6px solid ${this.color};`
        },
        backgroundStyle(){
            return `background-color:${this.color};`
        }
    }
}
</script>

<style scoped lang="scss">
.name-container{
    color:#fff;
    text-shadow: 1px 1px 1px #0006;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
    border-radius:24px 24px 0 24px ;
    box-shadow: 2px 1px 1px #0006;
    margin: -10px 0 0 15px;
    z-index: 4 ;
    height: 54px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.image-container{
    width:100%;
    overflow: hidden;
}
</style>