<template>
    <div>
        <div class="pricetag"
            v-if="product" >
            ${{product.price|price}}
        </div>
    </div>
</template>

<script>
export default {
props:['product']

}
</script>

<style scoped lang="scss">
    .pricetag{
        font-weight: bold;
        font-size: 18px;
        line-height:18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
    }
    .info-tag{
        color: $tertiary;
        font-weight: bold;
        font-size: 13px;
        margin-top: 4px;
    }
</style>
