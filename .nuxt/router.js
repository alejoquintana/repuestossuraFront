import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3fba0738 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _496b6aec = () => interopDefault(import('../pages/carrito.vue' /* webpackChunkName: "pages/carrito" */))
const _1f9b43ea = () => interopDefault(import('../pages/catalogo-digital.vue' /* webpackChunkName: "pages/catalogo-digital" */))
const _3c526a2c = () => interopDefault(import('../pages/categorias.vue' /* webpackChunkName: "pages/categorias" */))
const _2e1d7328 = () => interopDefault(import('../pages/cerrar-cuenta.vue' /* webpackChunkName: "pages/cerrar-cuenta" */))
const _ace20ace = () => interopDefault(import('../pages/contacto.vue' /* webpackChunkName: "pages/contacto" */))
const _32aa00b6 = () => interopDefault(import('../pages/cotizador.vue' /* webpackChunkName: "pages/cotizador" */))
const _af668ea0 = () => interopDefault(import('../pages/encontrar-repuesto.vue' /* webpackChunkName: "pages/encontrar-repuesto" */))
const _264d43c0 = () => interopDefault(import('../pages/encuesta.vue' /* webpackChunkName: "pages/encuesta" */))
const _f42ac46a = () => interopDefault(import('../pages/fbcallback.vue' /* webpackChunkName: "pages/fbcallback" */))
const _20416ae0 = () => interopDefault(import('../pages/import-test.vue' /* webpackChunkName: "pages/import-test" */))
const _21e45a00 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _1fd0373c = () => interopDefault(import('../pages/linktree.vue' /* webpackChunkName: "pages/linktree" */))
const _21adbb8f = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _611abed4 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _5182aa82 = () => interopDefault(import('../pages/mi-cuenta.vue' /* webpackChunkName: "pages/mi-cuenta" */))
const _9fe8012a = () => interopDefault(import('../pages/novedades.vue' /* webpackChunkName: "pages/novedades" */))
const _b06b96f0 = () => interopDefault(import('../pages/ofertas.vue' /* webpackChunkName: "pages/ofertas" */))
const _02b69dbd = () => interopDefault(import('../pages/otros-productos.vue' /* webpackChunkName: "pages/otros-productos" */))
const _4490e011 = () => interopDefault(import('../pages/recuperar-contraseña.vue' /* webpackChunkName: "pages/recuperar-contraseña" */))
const _9c656442 = () => interopDefault(import('../pages/recuperar-pass.vue' /* webpackChunkName: "pages/recuperar-pass" */))
const _cea8f8c0 = () => interopDefault(import('../pages/registrate.vue' /* webpackChunkName: "pages/registrate" */))
const _7ed62fdd = () => interopDefault(import('../pages/registro-exitoso.vue' /* webpackChunkName: "pages/registro-exitoso" */))
const _73185591 = () => interopDefault(import('../pages/resgindex.vue' /* webpackChunkName: "pages/resgindex" */))
const _0451e6aa = () => interopDefault(import('../pages/resultados-de-busqueda.vue' /* webpackChunkName: "pages/resultados-de-busqueda" */))
const _6152b14a = () => interopDefault(import('../pages/sitemap.vue' /* webpackChunkName: "pages/sitemap" */))
const _688fc8d8 = () => interopDefault(import('../pages/terminos-y-condiciones.vue' /* webpackChunkName: "pages/terminos-y-condiciones" */))
const _7a868042 = () => interopDefault(import('../pages/test/index.vue' /* webpackChunkName: "pages/test/index" */))
const _f4abf276 = () => interopDefault(import('../pages/ubicacion.vue' /* webpackChunkName: "pages/ubicacion" */))
const _97621984 = () => interopDefault(import('../pages/admin/configuraciones/index.vue' /* webpackChunkName: "pages/admin/configuraciones/index" */))
const _10e3924c = () => interopDefault(import('../pages/admin/estadisticas/index.vue' /* webpackChunkName: "pages/admin/estadisticas/index" */))
const _23be9f1b = () => interopDefault(import('../pages/admin/importar-relaciones/index.vue' /* webpackChunkName: "pages/admin/importar-relaciones/index" */))
const _cf12e3d2 = () => interopDefault(import('../pages/admin/marcas-de-autos/index.vue' /* webpackChunkName: "pages/admin/marcas-de-autos/index" */))
const _b0fbd308 = () => interopDefault(import('../pages/admin/metadata/index.vue' /* webpackChunkName: "pages/admin/metadata/index" */))
const _8a131536 = () => interopDefault(import('../pages/admin/modelos-de-autos/index.vue' /* webpackChunkName: "pages/admin/modelos-de-autos/index" */))
const _199f8637 = () => interopDefault(import('../pages/admin/pedidos/index.vue' /* webpackChunkName: "pages/admin/pedidos/index" */))
const _4d02ed08 = () => interopDefault(import('../pages/admin/posts/index.vue' /* webpackChunkName: "pages/admin/posts/index" */))
const _1c7afc88 = () => interopDefault(import('../pages/admin/productos/index.vue' /* webpackChunkName: "pages/admin/productos/index" */))
const _454510c4 = () => interopDefault(import('../pages/admin/rubros/index.vue' /* webpackChunkName: "pages/admin/rubros/index" */))
const _36c2bad2 = () => interopDefault(import('../pages/admin/usuarios/index.vue' /* webpackChunkName: "pages/admin/usuarios/index" */))
const _32e0115d = () => interopDefault(import('../pages/test/testabc.vue' /* webpackChunkName: "pages/test/testabc" */))
const _3dfe60e5 = () => interopDefault(import('../pages/admin/configuraciones/appImages.vue' /* webpackChunkName: "pages/admin/configuraciones/appImages" */))
const _43b95168 = () => interopDefault(import('../pages/admin/configuraciones/banner-home.vue' /* webpackChunkName: "pages/admin/configuraciones/banner-home" */))
const _66635c51 = () => interopDefault(import('../pages/admin/configuraciones/home-marcas.vue' /* webpackChunkName: "pages/admin/configuraciones/home-marcas" */))
const _3242cbdc = () => interopDefault(import('../pages/admin/configuraciones/linktree.vue' /* webpackChunkName: "pages/admin/configuraciones/linktree" */))
const _05201e74 = () => interopDefault(import('../pages/admin/configuraciones/minimos.vue' /* webpackChunkName: "pages/admin/configuraciones/minimos" */))
const _9179c6f6 = () => interopDefault(import('../pages/admin/configuraciones/pdfs.vue' /* webpackChunkName: "pages/admin/configuraciones/pdfs" */))
const _14d81817 = () => interopDefault(import('../pages/admin/configuraciones/puntos-de-retiro.vue' /* webpackChunkName: "pages/admin/configuraciones/puntos-de-retiro" */))
const _2adf9790 = () => interopDefault(import('../pages/admin/configuraciones/slider-banner-home.vue' /* webpackChunkName: "pages/admin/configuraciones/slider-banner-home" */))
const _4b73589f = () => interopDefault(import('../pages/admin/configuraciones/sociales.vue' /* webpackChunkName: "pages/admin/configuraciones/sociales" */))
const _6049ba72 = () => interopDefault(import('../pages/admin/configuraciones/sucursales.vue' /* webpackChunkName: "pages/admin/configuraciones/sucursales" */))
const _00b4a9fc = () => interopDefault(import('../pages/admin/configuraciones/textos-barra-negra.vue' /* webpackChunkName: "pages/admin/configuraciones/textos-barra-negra" */))
const _1dbf943d = () => interopDefault(import('../pages/admin/estadisticas/busquedas.vue' /* webpackChunkName: "pages/admin/estadisticas/busquedas" */))
const _87eccb2e = () => interopDefault(import('../pages/admin/estadisticas/cancelados.vue' /* webpackChunkName: "pages/admin/estadisticas/cancelados" */))
const _22961a76 = () => interopDefault(import('../pages/admin/estadisticas/encuestas.vue' /* webpackChunkName: "pages/admin/estadisticas/encuestas" */))
const _56ed4673 = () => interopDefault(import('../pages/admin/estadisticas/grafico-de-ventas.vue' /* webpackChunkName: "pages/admin/estadisticas/grafico-de-ventas" */))
const _1becd28c = () => interopDefault(import('../pages/admin/estadisticas/log-de-actualizaciones.vue' /* webpackChunkName: "pages/admin/estadisticas/log-de-actualizaciones" */))
const _f0da1b8c = () => interopDefault(import('../pages/admin/estadisticas/mas-vendidos.vue' /* webpackChunkName: "pages/admin/estadisticas/mas-vendidos" */))
const _471a2788 = () => interopDefault(import('../pages/admin/estadisticas/productos-sin-fotos.vue' /* webpackChunkName: "pages/admin/estadisticas/productos-sin-fotos" */))
const _fc7e8afa = () => interopDefault(import('../pages/admin/estadisticas/track-events.vue' /* webpackChunkName: "pages/admin/estadisticas/track-events" */))
const _aa7c3c46 = () => interopDefault(import('../pages/admin/estadisticas/UFOS.vue' /* webpackChunkName: "pages/admin/estadisticas/UFOS" */))
const _11c9a416 = () => interopDefault(import('../pages/admin/estadisticas/url-repetidos.vue' /* webpackChunkName: "pages/admin/estadisticas/url-repetidos" */))
const _30de70ad = () => interopDefault(import('../pages/admin/estadisticas/usuarios.vue' /* webpackChunkName: "pages/admin/estadisticas/usuarios" */))
const _3040e04f = () => interopDefault(import('../pages/admin/estadisticas/ventas.vue' /* webpackChunkName: "pages/admin/estadisticas/ventas" */))
const _59ff86b5 = () => interopDefault(import('../pages/admin/estadisticas/ventas-por-provincia.vue' /* webpackChunkName: "pages/admin/estadisticas/ventas-por-provincia" */))
const _4da0093e = () => interopDefault(import('../pages/admin/marcas-de-autos/importar.vue' /* webpackChunkName: "pages/admin/marcas-de-autos/importar" */))
const _7cfcef66 = () => interopDefault(import('../pages/admin/metadata/categorias.vue' /* webpackChunkName: "pages/admin/metadata/categorias" */))
const _1bed2557 = () => interopDefault(import('../pages/admin/metadata/paginas.vue' /* webpackChunkName: "pages/admin/metadata/paginas" */))
const _8a383186 = () => interopDefault(import('../pages/admin/metadata/productos.vue' /* webpackChunkName: "pages/admin/metadata/productos" */))
const _c913ad5a = () => interopDefault(import('../pages/admin/modelos-de-autos/importar.vue' /* webpackChunkName: "pages/admin/modelos-de-autos/importar" */))
const _66c6299c = () => interopDefault(import('../pages/admin/productos/importar.vue' /* webpackChunkName: "pages/admin/productos/importar" */))
const _e5ee44d8 = () => interopDefault(import('../pages/admin/rubros/importar.vue' /* webpackChunkName: "pages/admin/rubros/importar" */))
const _48f7aa5f = () => interopDefault(import('../pages/admin/pedidos/_id.vue' /* webpackChunkName: "pages/admin/pedidos/_id" */))
const _814afa12 = () => interopDefault(import('../pages/confirmacion-de-registro/_token.vue' /* webpackChunkName: "pages/confirmacion-de-registro/_token" */))
const _f20d11b0 = () => interopDefault(import('../pages/info/_post.vue' /* webpackChunkName: "pages/info/_post" */))
const _58061878 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _4698fc74 = () => interopDefault(import('../pages/_category/index.vue' /* webpackChunkName: "pages/_category/index" */))
const _a2b43d28 = () => interopDefault(import('../pages/_category/_product.vue' /* webpackChunkName: "pages/_category/_product" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _3fba0738,
    name: "admin"
  }, {
    path: "/carrito",
    component: _496b6aec,
    name: "carrito"
  }, {
    path: "/catalogo-digital",
    component: _1f9b43ea,
    name: "catalogo-digital"
  }, {
    path: "/categorias",
    component: _3c526a2c,
    name: "categorias"
  }, {
    path: "/cerrar-cuenta",
    component: _2e1d7328,
    name: "cerrar-cuenta"
  }, {
    path: "/contacto",
    component: _ace20ace,
    name: "contacto"
  }, {
    path: "/cotizador",
    component: _32aa00b6,
    name: "cotizador"
  }, {
    path: "/encontrar-repuesto",
    component: _af668ea0,
    name: "encontrar-repuesto"
  }, {
    path: "/encuesta",
    component: _264d43c0,
    name: "encuesta"
  }, {
    path: "/fbcallback",
    component: _f42ac46a,
    name: "fbcallback"
  }, {
    path: "/import-test",
    component: _20416ae0,
    name: "import-test"
  }, {
    path: "/inspire",
    component: _21e45a00,
    name: "inspire"
  }, {
    path: "/linktree",
    component: _1fd0373c,
    name: "linktree"
  }, {
    path: "/login",
    component: _21adbb8f,
    name: "login"
  }, {
    path: "/logout",
    component: _611abed4,
    name: "logout"
  }, {
    path: "/mi-cuenta",
    component: _5182aa82,
    name: "mi-cuenta"
  }, {
    path: "/novedades",
    component: _9fe8012a,
    name: "novedades"
  }, {
    path: "/ofertas",
    component: _b06b96f0,
    name: "ofertas"
  }, {
    path: "/otros-productos",
    component: _02b69dbd,
    name: "otros-productos"
  }, {
    path: "/recuperar-contrase%C3%B1a",
    component: _4490e011,
    name: "recuperar-contraseña"
  }, {
    path: "/recuperar-pass",
    component: _9c656442,
    name: "recuperar-pass"
  }, {
    path: "/registrate",
    component: _cea8f8c0,
    name: "registrate"
  }, {
    path: "/registro-exitoso",
    component: _7ed62fdd,
    name: "registro-exitoso"
  }, {
    path: "/resgindex",
    component: _73185591,
    name: "resgindex"
  }, {
    path: "/resultados-de-busqueda",
    component: _0451e6aa,
    name: "resultados-de-busqueda"
  }, {
    path: "/sitemap",
    component: _6152b14a,
    name: "sitemap"
  }, {
    path: "/terminos-y-condiciones",
    component: _688fc8d8,
    name: "terminos-y-condiciones"
  }, {
    path: "/test",
    component: _7a868042,
    name: "test"
  }, {
    path: "/ubicacion",
    component: _f4abf276,
    name: "ubicacion"
  }, {
    path: "/admin/configuraciones",
    component: _97621984,
    name: "admin-configuraciones"
  }, {
    path: "/admin/estadisticas",
    component: _10e3924c,
    name: "admin-estadisticas"
  }, {
    path: "/admin/importar-relaciones",
    component: _23be9f1b,
    name: "admin-importar-relaciones"
  }, {
    path: "/admin/marcas-de-autos",
    component: _cf12e3d2,
    name: "admin-marcas-de-autos"
  }, {
    path: "/admin/metadata",
    component: _b0fbd308,
    name: "admin-metadata"
  }, {
    path: "/admin/modelos-de-autos",
    component: _8a131536,
    name: "admin-modelos-de-autos"
  }, {
    path: "/admin/pedidos",
    component: _199f8637,
    name: "admin-pedidos"
  }, {
    path: "/admin/posts",
    component: _4d02ed08,
    name: "admin-posts"
  }, {
    path: "/admin/productos",
    component: _1c7afc88,
    name: "admin-productos"
  }, {
    path: "/admin/rubros",
    component: _454510c4,
    name: "admin-rubros"
  }, {
    path: "/admin/usuarios",
    component: _36c2bad2,
    name: "admin-usuarios"
  }, {
    path: "/test/testabc",
    component: _32e0115d,
    name: "test-testabc"
  }, {
    path: "/admin/configuraciones/appImages",
    component: _3dfe60e5,
    name: "admin-configuraciones-appImages"
  }, {
    path: "/admin/configuraciones/banner-home",
    component: _43b95168,
    name: "admin-configuraciones-banner-home"
  }, {
    path: "/admin/configuraciones/home-marcas",
    component: _66635c51,
    name: "admin-configuraciones-home-marcas"
  }, {
    path: "/admin/configuraciones/linktree",
    component: _3242cbdc,
    name: "admin-configuraciones-linktree"
  }, {
    path: "/admin/configuraciones/minimos",
    component: _05201e74,
    name: "admin-configuraciones-minimos"
  }, {
    path: "/admin/configuraciones/pdfs",
    component: _9179c6f6,
    name: "admin-configuraciones-pdfs"
  }, {
    path: "/admin/configuraciones/puntos-de-retiro",
    component: _14d81817,
    name: "admin-configuraciones-puntos-de-retiro"
  }, {
    path: "/admin/configuraciones/slider-banner-home",
    component: _2adf9790,
    name: "admin-configuraciones-slider-banner-home"
  }, {
    path: "/admin/configuraciones/sociales",
    component: _4b73589f,
    name: "admin-configuraciones-sociales"
  }, {
    path: "/admin/configuraciones/sucursales",
    component: _6049ba72,
    name: "admin-configuraciones-sucursales"
  }, {
    path: "/admin/configuraciones/textos-barra-negra",
    component: _00b4a9fc,
    name: "admin-configuraciones-textos-barra-negra"
  }, {
    path: "/admin/estadisticas/busquedas",
    component: _1dbf943d,
    name: "admin-estadisticas-busquedas"
  }, {
    path: "/admin/estadisticas/cancelados",
    component: _87eccb2e,
    name: "admin-estadisticas-cancelados"
  }, {
    path: "/admin/estadisticas/encuestas",
    component: _22961a76,
    name: "admin-estadisticas-encuestas"
  }, {
    path: "/admin/estadisticas/grafico-de-ventas",
    component: _56ed4673,
    name: "admin-estadisticas-grafico-de-ventas"
  }, {
    path: "/admin/estadisticas/log-de-actualizaciones",
    component: _1becd28c,
    name: "admin-estadisticas-log-de-actualizaciones"
  }, {
    path: "/admin/estadisticas/mas-vendidos",
    component: _f0da1b8c,
    name: "admin-estadisticas-mas-vendidos"
  }, {
    path: "/admin/estadisticas/productos-sin-fotos",
    component: _471a2788,
    name: "admin-estadisticas-productos-sin-fotos"
  }, {
    path: "/admin/estadisticas/track-events",
    component: _fc7e8afa,
    name: "admin-estadisticas-track-events"
  }, {
    path: "/admin/estadisticas/UFOS",
    component: _aa7c3c46,
    name: "admin-estadisticas-UFOS"
  }, {
    path: "/admin/estadisticas/url-repetidos",
    component: _11c9a416,
    name: "admin-estadisticas-url-repetidos"
  }, {
    path: "/admin/estadisticas/usuarios",
    component: _30de70ad,
    name: "admin-estadisticas-usuarios"
  }, {
    path: "/admin/estadisticas/ventas",
    component: _3040e04f,
    name: "admin-estadisticas-ventas"
  }, {
    path: "/admin/estadisticas/ventas-por-provincia",
    component: _59ff86b5,
    name: "admin-estadisticas-ventas-por-provincia"
  }, {
    path: "/admin/marcas-de-autos/importar",
    component: _4da0093e,
    name: "admin-marcas-de-autos-importar"
  }, {
    path: "/admin/metadata/categorias",
    component: _7cfcef66,
    name: "admin-metadata-categorias"
  }, {
    path: "/admin/metadata/paginas",
    component: _1bed2557,
    name: "admin-metadata-paginas"
  }, {
    path: "/admin/metadata/productos",
    component: _8a383186,
    name: "admin-metadata-productos"
  }, {
    path: "/admin/modelos-de-autos/importar",
    component: _c913ad5a,
    name: "admin-modelos-de-autos-importar"
  }, {
    path: "/admin/productos/importar",
    component: _66c6299c,
    name: "admin-productos-importar"
  }, {
    path: "/admin/rubros/importar",
    component: _e5ee44d8,
    name: "admin-rubros-importar"
  }, {
    path: "/admin/pedidos/:id",
    component: _48f7aa5f,
    name: "admin-pedidos-id"
  }, {
    path: "/confirmacion-de-registro/:token?",
    component: _814afa12,
    name: "confirmacion-de-registro-token"
  }, {
    path: "/info/:post?",
    component: _f20d11b0,
    name: "info-post"
  }, {
    path: "/",
    component: _58061878,
    name: "index"
  }, {
    path: "/:category",
    component: _4698fc74,
    name: "category"
  }, {
    path: "/:category/:product",
    component: _a2b43d28,
    name: "category-product"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
