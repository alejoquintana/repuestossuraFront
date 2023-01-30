<template>
	<v-container>
		<!-- <v-layout class="mb-4 mt-4">
        <socialLogin></socialLogin>
    </v-layout> -->
		<v-layout justify-center align-center column>
			<v-row>
				<v-card :max-width="$mq=='lg' ? 500 : 350" class="pa-4 mt-4">
					<v-card-title class="justify-center text-center primary--text">
						<h2>Registrate en <br> {{$accessor.configs.siteName}}</h2>
					</v-card-title>
					<v-form ref="form" class="fcc" @submit.prevent="send" v-model="valid" lazy-validation>
						<v-text-field name="nombre" label="Nombre" id="name" v-model="formData.name" class="mt-3 w-100"
							:rules="rules.name" />

						<v-text-field name="email" label="Email" id="email" v-model="formData.email" class="mt-3 w-100"
							:rules="rules.email" />

                        <div class="d-flex">
                            <v-text-field name="area_code" label="Cod. area" id="area_code" v-model="formData.area_code" class="mt-3 w-25"
                                :rules="rules.area_code" />
                                <span class="mt-7 mx-4">-</span>
                            <v-text-field name="phone" label="Numero" id="phone" v-model="formData.phone" class="mt-3"
                                :rules="rules.phone" />
                        </div>

						<v-text-field name="cuil" label="CUIL/CUIT" id="cuil" v-model="formData.cuil" class="mt-3 w-100"
							:rules="rules.cuil" />

						<v-text-field name="razon_social" label="Razon Social" id="razon_social" v-model="formData.razon_social" class="mt-3 w-100"
							:rules="requiredRule" />

						<v-text-field name="nombre_fantasia" label="Nombre de fantasía" id="nombre_fantasia" v-model="formData.nombre_fantasia" class="mt-3 w-100"
							:rules="requiredRule" />

						<v-text-field name="password" label="Contraseña" id="password" v-model="formData.password"
							type="password" class="mt-3 w-100" :rules="rules.password" />

						<v-text-field name="password" label="Confirmar contraseña" id="passwordConfirm" v-model="passconfirm"
							type="password" class="mt-3 w-100" :rules="rules.passconfirm" />

						<div>
							<recaptcha class="mt-4" @error="captchaError" @success="captchaSuccess"
								@expired="captchaExpired" />
						</div>
						<v-btn tile depressed dark block type="submit" class="mt-4" color="primary">
							Registrarme
						</v-btn>
						<span class="mt-2 tyc">
							Al registrarte estas aceptando nuestros
							<nuxt-link to="/terminos-y-condiciones" class="primary--text">
								términos y condiciones
							</nuxt-link>
						</span>
					</v-form>
				</v-card>
			</v-row>
			<v-divider class="mt-4"></v-divider>
			<v-row class=" mt-4 sugestion text-center">
				<v-col cols="12" class="mt-4">
					<label>Ya tenes tu usuario?</label>
					<v-btn x-small nuxt to="/login" text depressed>
						Ingresá desde aquí
					</v-btn>
				</v-col>
			</v-row>
		</v-layout>
		<modal v-if="showLoginSugestion" @close="showLoginSugestion=false">
			<login-sugestion></login-sugestion>
		</modal>
	</v-container>
</template>

<script>
import socialLogin from '@/components/auth/social-login.vue'
import swal from 'sweetalert'
import Vue from 'vue'
import modal from '@/components/common/Modal.vue'
import loginSugestion from '@/components/auth/login-sugestion.vue'
import {
	User
} from '~/types'
export default Vue.extend({
	layout: 'default',
	name: 'login',
	components: {
		modal,
		loginSugestion,
		socialLogin
	},
	head() {
		return {
			titleTemplate: `Registrate | ${this.$accessor.configs.siteName}`,
		}
	},
	metaInfo() {
		return {
			title: 'Login'
		}
	},
	data() {
		return {
			showLoginSugestion: false,
			gettigToken: false,
			captchaPassed: false,
			captchaErr: false,
			captchaExp: false,
			valid: true,
            requiredRule: [
                (v) => !!v || 'Falta completar el campo',
            ],
			nameRules: [
                (v) => !!v || 'Falta completar el campo nombre',
				(v) => (v && v.length <= 20) || 'Por favor, elija un nombre mas corto',
			],
			emailRules: [
				(v) => !!v || 'Falta completar el campo email',
				(v) => /.+@.+\..+/.test(v) || 'Revise que su mail este correctamente escrito',
			],
			areaCodeRules: [
				(v) => !!v || 'Falta completar el campo codigo de area',
				(v) => /^\d+$/.test(v) || 'Revise que su mail este correctamente escrito',
			],
			phoneRules: [
				(v) => !!v || 'Falta completar el campo numero',
				(v) => /^\d+$/.test(v) || 'Revise que su mail este correctamente escrito',
			],
			cuilRules: [
                (v) => !!v || 'Falta completar el campo CUIL/CUIT',
				(v) => (v && v.length <= 10) || 'Revise que su CUIL/CUIT este correctamente escrito',
			],
			passwordRules: [
				(v) => !!v || 'Falta completar el campo contraseña',
				(v) => (v && v.length > 7) || 'La contraseña debe tener al menos 8 caracteres',
			],
			formData: {
				recaptcha_token: '',
				name: '',
				email: '',
				area_code: '',
				phone: '',
				cuil: '',
				razon_social: '',
				nombre_fantasia: '',
				password: '',
			},
            passconfirm: '',
		}
	},
	computed: {
		user() {return this.$auth.user},
		admin() {return (this.user && this.user.role_id <= 2)},
		issuper() {return (this.user && this.user.role_id == 1);},
        rules(){
            return {
                name: [
                    ...this.requiredRule,
                    (v) => (v && v.length <= 20) || 'Por favor, elija un nombre mas corto',
                ],
                email: [
                    ...this.requiredRule,
                    (v) => /.+@.+\..+/.test(v) || 'Revise que su mail este correctamente escrito',
                ],
                area_code: [
                    ...this.requiredRule,
                    (v) => /^\d+$/.test(v) || 'Codigo de area invalido',
                ],
                phone: [
                    ...this.requiredRule,
                    (v) => /^\d+$/.test(v) || 'Numero invalido',
                ],
                cuil: [
                    ...this.requiredRule,
                    (v) => (v && v.length <= 11) || 'Revise que su CUIL/CUIT este correctamente escrito',
                ],
                password: [
                    ...this.requiredRule,
                    (v) => (v && v.length > 7) || 'La contraseña debe tener al menos 8 caracteres',
                ],
                passconfirm: [
                    () => (this.formData.password === this.passconfirm) || 'Las contraseñas no coinciden',
                ],
            }
        },
		passwordConfirmationRule() {return () => (this.formData.password === this.passconfirm) || 'Las contraseñas no coinciden'}
	},
	methods: {
		async captchaSuccess() {
			if (this.gettigToken) return;
			this.gettigToken = true;

			if (this.captchaPassed) return;

			const token = await this.$recaptcha.getResponse()
			this.formData.recaptcha_token = token
			this.captchaPassed = true;
			this.gettigToken = false;
		},
		captchaError() {
			this.captchaPassed = false;
			//console.log('captcha error')
		},
		captchaExpired() {
			this.captchaPassed = false;
			this.captchaExp = true;
			//console.log('captcha expired')
		},
		async send() {
			const refForm = this.$refs.form;
			refForm.validate();
			/*  this.$refs.form.validate(); */

			if (!this.valid) {
				swal('Ups', 'Hay un error en el formulario. Por favor revisa tus datos.', 'error');
				return;
			};

			if (!this.captchaPassed) {
				swal('Cuidado', 'Por favor haz la verificiación para continuar', 'error');
				return false;
			}
			this.$accessor.setLoading(true)
			this.$axios.post('/register', this.formData)
				.then((r) => {
					this.$accessor.setLoading(false);
					if (r.data == 'exists') {
						this.showLoginSugestion = true;
					} else {
						this.login();
					}
				}, (error) => {
					//console.log(error.response);
				})

		},
		async login() {
			var vm = this;
			this.$auth.loginWith('local', {
					data: this.formData
				})
				.then(r => {
					// console.log('login response', r );
					let user = vm.user;
					let route = vm.user.role_id <= 2 ? '/admin' : '/'
					this.$router.push(route);
				})
		}
	},
	mounted() {
		if (this.$accessor.helpers.no_shop) {
			this.$router.push('/');
		}
		if (this.issuper) {
			this.$router.push('/admin');
			return;
		} else if (this.admin) {
			let route = '/admin'
			this.$router.push(route);
			return;
		}
		setTimeout(() => {
			if (this.issuper) {
				this.$router.push('/admin');
				return;
			} else if (this.admin) {
				let route = '/admin'
				this.$router.push(route);
				return;
			}
		}, 500);
	}
})
</script>



<style lang="scss" scoped>
.sugestion {
	font-size: 14px;
}
.login-btn {
	font-size: 30px;
	padding: 10px 0;
}
.f-card {
	max-width: 600px;
	box-shadow: 0px 10px 10px #000c;
}
.f-header {
	text-align: center;
	color: #E80C69;
	background-color: none;
	font-weight: bold;
	font-size: 22px;
	font-size: 30px;
}
.mtc {
	margin-top: 30px;
}
.tyc {
	font-size: 12px;
}

@media(max-width:660px) {
	.login-btn {
		font-size: 18px;
	}
	.f-card {
		max-width: 360px;
	}
	.f-header {
		font-size: 18px;
	}
}
</style>
