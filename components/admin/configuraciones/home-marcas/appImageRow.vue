<template>
<div>
    <v-row>
        <v-col cols="2">
            <div class="fcc">
                <span v-if="appImage.name">{{appImage.name}}</span>
                <img :src="$accessor.helpers.imagePath(appImage.url)" alt="">
            </div>
        </v-col>
        <v-col cols="4">
            <div class="fcc">
                <v-btn icon large color="red" @click="deleteImage">
                    <v-icon>{{$accessor.mdicons.mdicons.mdiTrashCan}}</v-icon>
                </v-btn>
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
import swal from 'sweetalert'
export default {
    props:['appImage'],
    methods:{
        async deleteImage(){
            let response = await swal({
				title: `Esta seguro de borrar la imagen ?`,
				text: '',
				buttons: {
					confirm: {
						text: 'SI'
					},
					cancel: {
						text: 'NO',
						visible: true,
						closeModal: true,
						value: false
					},
				}})

                if(response){
                    this.$accessor.setLoading(true)
                    await this.$accessor.appImages.destroy(this.appImage.id)
                    await this.$accessor.appImages.fetchAppImages()
                    this.$accessor.setLoading(false)
                }
        }
    }
}
</script>

<style>

</style>
