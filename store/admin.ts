import { RootState } from "~/store";

import Vue from "vue";
import { getterTree, mutationTree, actionTree } from "typed-vuex";

export type  AdminMenuItem = {
  superOnly?:boolean,
  name:string,
  url?:string,
  children?:Array<AdminMenuItem>,
  active?:boolean
}
/* STATE */
export const state = () => {
	return {
		cropping:false as boolean,
		configs:null as any,
		menu:[
			{name: 'Pedidos', url:'/admin/pedidos'},
			{name: 'Usuarios',url:'/admin/usuarios'},
			{name: 'rubros',url:'/admin/rubros'},
			{name: 'productos', url:'/admin/productos'},
			{name: 'Marcas de autos', url:'/admin/marcas-de-autos'},
			{name: 'Modelos de autos', url:'/admin/modelos-de-autos'},
			{name: 'importar relaciones', url:'/admin/importar-relaciones'},
			{name: 'configuraciones',children:[
				{name:'Banner home',url:'/admin/configuraciones/banner-home'},
				//{name:'Slider home',url:'/admin/configuraciones/slider-banner-home'},
				{name:'Home Marcas',url:'/admin/configuraciones/home-marcas'},
				{name:'Sociales',url:'/admin/configuraciones/sociales'},
				//{name:'Imagenes sistema',url:'/admin/configuraciones/appImages'},
				//{name:'Linktree',url:'/admin/configuraciones/linktree'},
				//{name:'pdfs',url:'/admin/configuraciones/pdfs'},
				{name:'sucursales',url:'/admin/configuraciones/sucursales'},
				/* {name:'Textos Barra Negra',url:'/admin/configuraciones/textos-barra-negra'}, */
				/* {name:'Minimos',url:'/admin/configuraciones/minimos'}, */
			]},
			{superOnly:true,name:'metadata', url:'/admin/metadata',children:[
				{name:'paginas',url:'/admin/metadata/paginas'},
				{name:'categorias',url:'/admin/metadata/rubros'},
				{name:'productos',url:'/admin/metadata/productos'},
			]},
			{superOnly:true,name:'Estadisticas', url:'/admin/estadisticas',children:[
				{name:'usuarios', url:'/admin/estadisticas/usuarios'},
				{name:'ventas', url:'/admin/estadisticas/ventas'},
				{name:'ventas por provincia', url:'/admin/estadisticas/ventas-por-provincia'},
				{name:'cancelados', url:'/admin/estadisticas/cancelados'},
				{name:'grafico de ventas', url:'/admin/estadisticas/grafico-de-ventas'},
				{name:'mas vendidos', url:'/admin/estadisticas/mas-vendidos'},
				{name:'productos sin fotos', url:'/admin/estadisticas/productos-sin-fotos'},
				{name:'url repetidos', url:'/admin/estadisticas/url-repetidos'},
				{name:'encuestas', url:'/admin/estadisticas/encuestas'},
				{name:'busquedas', url:'/admin/estadisticas/busquedas'},
				{name:'UFOS USER FIRST ORDER', url:'/admin/estadisticas/UFOS'},
				{name:'log de actualizaciones', url:'/admin/estadisticas/log-de-actualizaciones'},
				{name:'track events', url:'/admin/estadisticas/track-events'},
			]},
			/* {name:'posts',url:'/admin/posts'} */
		] as Array<AdminMenuItem>,
		uploadedFileData:[],
	};
};

export type catalogoState = ReturnType<typeof state>;

/* GETTERS */
export const getters = getterTree(state, {
	getCropping(state){
		return state.cropping
	},
	getConfigs(state){
		return state.configs
	},
	getUploadedFileData(state){
		return state.uploadedFileData
	},
});

/* MUTATIONS */
export const mutations = mutationTree(state, {
	setCropping(state,payload){
		state.cropping = payload
	},
	setConfigs(state,payload){
		state.configs = payload
	},
	setUploadedFileData(state,payload){
		state.uploadedFileData = payload
	}
});

/* ACTIONS */
export const actions = actionTree(
	{ state, getters, mutations },
	{
		async fetchConfigs({commit}){
			await this.$axios.get('/configs')
			.then(r => {
				commit('setConfigs',r.data)
			})
		},

		async uploadExcelFile({commit},file){
			let fdata = new FormData();
			fdata.append('file',file);
			let response = await this.$axios.post('/upload-excel-file',fdata );
			commit('setUploadedFileData',response.data)

		},
		async emptyExcelFile({commit}){
			commit('setUploadedFileData',[])

		}
	}
);
