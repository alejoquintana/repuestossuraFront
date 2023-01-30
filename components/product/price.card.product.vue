<template>
    <div class="info-card w-100">
        <!--UNIDAD -->
        <div v-if="product" >
            <span class="price"> $ {{product.price|price}} c/u </span>
        </div>
    </div>
</template>

<script>
export default {
props:['product']

}
</script>

<style scoped lang="scss">
.info-card{
    font-size: 8px;
}
.price{
  font-size: 18px;
  font-weight: bold;
}
@media (max-width:659px) {
    .price{
      font-size: 18px;
    }
    
}
</style>