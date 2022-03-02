import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    role:localStorage.getItem('role')  || "",
    reservation:{
      id:"",
      email:"",
      dateLocation: "",
      heureDepart:"",
      heureArrivee:"",
      prenom:"",
      nom:"",
      telephone:"",
      montant:0,
      accessoire:"",
      nbHeure:0,
      nbVelo:[],
      nbAc:[]
    }
  },
  mutations: {
    updateRole(state){
      state.role= localStorage.getItem('role')
    },
    updateToken(state){
      state.token= localStorage.getItem('token')
    },
    updateId(state,data){
      state.reservation.id= data
    },
    updateEmail(state,data){
      state.reservation.email= data.email
    },
    updateReservation(state,data){
      state.reservation.dateLocation = data.dateLocation
      state.reservation.heureArrivee = data.heureArrivee
      state.reservation.heureDepart = data.heureDepart
      state.reservation.nbHeure = data.nbHeure
    },
    updateProduit(state,data){
      state.reservation.nbVelo = data
    },
    updateAccessoire(state,data){
      state.reservation.nbAc = data
    },
    updateMontant(state,data){
      state.reservation.montant = data
    },

  },
  actions: {
  },
  getters : {
    isLoggedIn: state => !!state.token,
    modeles:state=>{
      return state.reservation.nbVelo
    },
    accessoires:state=>{
      return state.reservation.nbAc
    },
    role:state=>{
      return state.role
    },
    montant:state=>{
      return state.reservation.montant
    },
    email:state=>{
      return state.email
    },
    id:state=>{
      return state.reservation.id
    },
  },
  modules: {
  }
})
