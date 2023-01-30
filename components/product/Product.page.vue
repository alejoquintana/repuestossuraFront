<template>
  <div>
    <div v-if="product">
      <productPage :product="product" />
    </div>
  </div>
</template>

<script>
import productPage from './page/notmod.product.page.vue'
export default {
    components:{productPage},
    props:['product']
}
</script>
