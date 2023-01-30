import colors from 'vuetify/es5/util/colors'

var backendUrl = process.env.NODE_ENV === "production" ? 'https://back.repuestossura.com' : 'http://localhost:8000'

export default {
	server: {
		port: 3009
	},

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: "%s",
		title: "Suspensión sura",
		meta: [{
				charset: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: "Suspensión sura"
			}
		],
		script: [{
			async: true,
			src: "https://www.googletagmanager.com/gtag/js?id=G-2XFV8VT6FM"
		}],
		link: [
			{rel: "icon",type: "image/x-icon",href: "/favicon.ico"},
		]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['@/assets/global.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [

		'@/plugins/filters.js',
		"./plugins/loaderimg.js",
		{
			src: '@/plugins/ga.js',
			ssr: false
		},
		{
			src: '@/plugins/axiosInterceptors.js',
			ssr: false
		},
		{
			src: '@/plugins/barcode.js',
			ssr: false
		}
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		"@nuxt/typescript-build",
		// https://go.nuxtjs.dev/vuetify
		"@nuxtjs/vuetify"
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		"@nuxtjs/recaptcha",
		"@nuxtjs/axios",
		"@nuxtjs/auth",
		"nuxt-socket-io",
		"@nuxtjs/style-resources",
		"nuxt-webfontloader",
		"nuxt-typed-vuex",
		'nuxt-mq'
	],

	recaptcha: {
		hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
		language: "sp", // Recaptcha language (v2)
		siteKey: "6LcgskojAAAAAArtp-PqiMHIP4zoEjrfbrxLzhS_", // Site key for requests
		version: 2, // Version
		size: "normal" // Size: 'compact', 'normal', 'invisible' (v2)
	},

	'mq': {
		defaultBreakpoint: 'sm',
		breakpoints: {
			sm: 450,
			md: 1250,
			lg: Infinity,
		}
	},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
	vuetify: {
		treeShake: true,
		defaultAssets: {
			font: {
				family: 'Nunito Sans'
			}
		},
		customVariables: ["~/assets/variables.scss"],
		theme: {
			themes: {
				light: {
					primary: '#126293',
					tertiary: '#B90105',
					blue: '#126293',
					darkerred: '#B90105',
					gray: '#EEE3E3',
				},
				dark: {
					primary: '#126293',
					tertiary: '#B90105',
					blue: '#126293',
					darkerred: '#B90105',
					gray: '#EEE3E3',
				},
			},
		},
	},

	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: "/login",
						method: "post",
						propertyName: "meta.token"
					},
					logout: {
						url: "/logout",
						method: "post"
					},
					user: {
						url: "/user",
						method: "get",
						propertyName: "data"
					}
				}
				// tokenRequired: true,
				// tokenType: 'bearer',
			}
		}
	},

	webfontloader: {
		google: {
			families: ['Open Sans', "Merienda", "Roboto", 'Encode Sans Condensed','Nunito Sans'] //Loads Lato font with weights 400 and 700
		},
	},


	axios: {
		baseURL: backendUrl + "/api"
	},
	env: {
		backendUrl: backendUrl
	},

	styleResources: {
		scss: [
			"@/assets/scss/helpers.scss",
		]
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		extractCss: true
	}
	/*   buildModules: ["@nuxt/typescript-build", "nuxt-typed-vuex"], */
};
