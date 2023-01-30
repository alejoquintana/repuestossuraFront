<template>
	<div class="pa-4 w-lg-75">
		<div class="text-center">
			<span class="thanksText">Gracias por confiar en Suspensión sura</span>
		</div>
        <div v-if="!user.survey_completed">
            <h2 class="mt-4">Te invitamos a completar esta breve encuesta:</h2>
            <span class="fs-sm dark-text">*Tu respuesta es anonima*</span>
            <h3 class="mt-4 font-weight-bold">Como conociste Suspensión sura?</h3>

            <v-radio-group v-model="formData.option" column>
                <div v-for="opt in options" :key="opt.name" class="d-flex mt-2">
                    <v-radio :value="opt.name" color="#000" class="mb-0" :off-icon="$accessor.mdicons.mdicons.mdiRadioboxBlank"
                        :on-icon="$accessor.mdicons.mdicons.mdiRadioboxMarked"></v-radio>
                    <span class="fs-xlg">{{opt.name}}</span>
                </div>
            </v-radio-group>

            <v-textarea outlined placeholder="Contanos un poco mas..." v-model="formData.comment"></v-textarea>

            <transition enter-active-class="animated slideInRight">
                <v-row justify="center" v-if="formData.option">
                    <div class="col-12 col-lg-6 p-0 ">
                        <v-btn block dark tile depressed color="primary" @click="send">Enviar</v-btn>
                    </div>
                </v-row>
            </transition>
        </div>
	</div>
</template>

<script>
export default {
    methods:{
        async send(){
            if(this.formData.option){
                this.$accessor.setLoading(true);
                await this.$axios.post('/survey',this.formData)
                window.location.replace('/')
            }
        }
    },
    computed:{
        user(){
            return this.$auth.user
        },
    },
    data(){
        return{
            options:[
                { name:'Facebook', icon: ['fab','fa-facebook'] },
                { name:'Google', icon: ['fab','fa-google'] },
                { name:'Maps', icon: ['fab','fa-map-marker'] },
                { name:'Me lo recomendo un/a amigo/a', icon: ['fa','fa-user-friends'] },
                { name:'Otro', icon: ['fa','fa-star'] },
            ],
            formData:{
                option:null,
                comment:null
            },
        }
    }
}
</script>

<style lang="scss" scoped>
.thanksText{
    font-size: 32px;
    font-weight: bold;
}
</style>
