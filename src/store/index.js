import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null

  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    
  },
  actions: {
    guardarToken({commit}, data){
      commit("setToken", data.token)
      commit("setUsuario", data.usuario)
      localStorage.setItem("token", data.token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        //commit("setUsuario", decode(token));
      }
      router.push("/");
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push("/login");
    }

  },
  modules: {
  }
})
