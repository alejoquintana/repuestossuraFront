<template>
<div>
    <div class="w-50 d-flex align-center">
        <v-text-field v-model="searchId" type="number"
        label="Buscar por id de producto" class="mr-4" />
        <v-btn depressed dark tile @click="updateLog">
            BUSCAR
        </v-btn>
    </div>
    <v-simple-table v-if="!filteredLogs">
        <thead>
            <tr>
                <th>USER</th>
                <th>PRODUCT_ID</th>
                <th>FIELD</th>
                <th>OLD_VALUE</th>
                <th>NEW_VALUE</th>
                <th>CREATED_AT</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="log in productsUpdatelog" :key="log.id">
                <td>{{ log.user }}</td>
                <td>{{ log.product_id }}</td>
                <td>{{ log.field }}</td>
                <td>{{ log.old_value }}</td>
                <td>{{ log.new_value }}</td>
                <td>{{ log.created_at }}</td>
            </tr>
        </tbody>
    </v-simple-table>

    <v-simple-table v-if="filteredLogs">
        <thead>
            <tr>
                <th>USER</th>
                <th>PRODUCT_ID</th>
                <th>FIELD</th>
                <th>OLD_VALUE</th>
                <th>NEW_VALUE</th>
                <th>CREATED_AT</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="log in filteredLogs" :key="log.id">
                <td>{{ log.user }}</td>
                <td>{{ log.product_id }}</td>
                <td>{{ log.field }}</td>
                <td>{{ log.old_value }}</td>
                <td>{{ log.new_value }}</td>
                <td>{{ log.created_at }}</td>
            </tr>
        </tbody>
    </v-simple-table>
</div>
</template>

<script>
export default {
    components: {

    },
    data(){return{
        searchId: null,
        filteredLogs: null,
    }},
    computed: {
        productsUpdatelog(){
            return this.$accessor.products.productsUpdatesLog
        },
    },
    methods: {
        updateLog(){
            if(!this.searchId) this.filteredLogs = null
            this.filteredLogs = this.productsUpdatelog.filter(log => {
                return log.product_id == this.searchId
            })
        }
    },
    mounted(){
        this.$accessor.products.fetchProductsUpdatesLog()

    }
}
</script>

<style lang="scss" scoped>

</style>
