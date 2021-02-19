import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      administrador: true,
      almacenista: true,
      vendedor: true
    }
  },
  {
    path: '/articulo',
    name: 'articulo',
    component: () => import('../components/articulo'),
    meta: {
      administrador: true,
      almacenista: true
    }
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: () => import('../components/categoria'),
    meta: {
      administrador: true,
      almacenista: true
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import('../components/usuario'),
    meta: {
      administrador:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login'),
    meta: {
      libre:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if   (to.matched.some(record => record.meta.libre))         next();
  else if (store.state.usuario && store.state.usuario.rol   == 'ADMIN_ROL') {
    if (to.matched.some(record => record.meta.administrador)) next();
  } else if (store.state.usuario && store.state.usuario.rol == 'VENDEDOR_ROL') {
    if (to.matched.some(record => record.meta.vendedor))      next();
  } else if (store.state.usuario && store.state.usuario.rol == 'ALMACENISTA_ROL') {
    if (to.matched.some(record => record.meta.almacenista))    next();
  } else next({ name: 'login' });
})

export default router
