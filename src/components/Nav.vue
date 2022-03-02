<template>
  <nav class="navbar navbar-dark mb-4" style="background: #eee;">
    <ul class="nav d-flex align-items-center" :key="componentKey">
      <li class="nav-item" >
        <img src="@/assets/logo.png" alt="logo" width="100" >
      </li>
      <li class="nav-item" >
        <router-link to="/" class="navbar-brand" href="#">Home</router-link>
      </li>
      <li class="nav-item" v-if="guest">
        <router-link to="/register" class="navbar-brand" href="#">S'inscrire</router-link>
      </li>
      <li class="nav-item" v-if="guest">
        <router-link to="/login" class="navbar-brand" href="#">Se connecter</router-link>
      </li>
      <li class="nav-item dropdown" v-if="role==='Responsable de location' || role==='Administrateur'">
      <a class="navbar-brand dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Client
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/client" class="dropdown-item" href="#">Client</router-link>
          <router-link to="/type-client" class="dropdown-item" href="#">Type Client</router-link>
        </div>
      </li>
      <li class="nav-item dropdown" v-if="role==='Responsable vélo et guide' || role==='Administrateur'">
        <a class="navbar-brand dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Vélo
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/velo" class="dropdown-item" href="#">Vélo</router-link>
          <router-link to="/marque-velo" class="dropdown-item" href="#">Marque Vélo</router-link>
          <router-link to="/modele" class="dropdown-item" href="#">Modèle Vélo</router-link>
        </div>
      </li>
      <li class="nav-item" v-if="role==='Responsable commercial' || role==='Administrateur'">
        <router-link to="/tarif" class="navbar-brand" href="#">Tarif</router-link>
      </li>
      <li class="nav-item" v-if="role==='Responsable vélo et guide' || role==='Administrateur'">
        <router-link to="/guide" class="navbar-brand" href="#">Guide</router-link>
      </li>
      <li class="nav-item" v-if="role==='Responsable vélo et guide' || role==='Administrateur'">
        <router-link to="/reparation" class="navbar-brand" href="#">Réparation</router-link>
      </li>
      <li class="nav-item" v-if="role==='Responsable vélo et guide' || role==='Administrateur'">
        <router-link to="/accessoire" class="navbar-brand" href="#">Accessoire</router-link>
      </li>
      <li class="nav-item" v-if="role==='Administrateur' || role==='Administrateur'">
        <router-link to="/user" class="navbar-brand" href="#">Utilisateur</router-link>
      </li>
      <li class="nav-item" v-if="role==='Responsable de location' || role==='Administrateur'">
        <router-link to="/location" class="navbar-brand" href="#">Location</router-link>
      </li>
      <li class="nav-item" v-if="role==='Responsable de location' || role==='Administrateur'">
        <router-link to="/retour" class="navbar-brand" href="#">Retour</router-link>
      </li>
      <li class="nav-item" v-if="role==='Responsable de location' || role==='Administrateur'">
        <router-link to="/dommage" class="navbar-brand" href="#">Dommage</router-link>
      </li>
      <li class="nav-item" v-if="!guest && role!=='Responsable de location' && role!=='Administrateur'
                                  && role!=='Responsable vélo et guide' && role!=='Responsable commercial'">
        <router-link to="/reserver" class="navbar-brand" href="#">Réservation</router-link>
      </li>
      <li class="nav-item" v-if="!guest && role!=='Responsable de location' && role!=='Administrateur'
                                  && role!=='Responsable vélo et guide' && role!=='Responsable commercial'">
        <router-link to="/mes-reservation" class="navbar-brand" href="#">Mes Réservation</router-link>
      </li>
      <li class="nav-item" v-if=" role!=='Responsable de location' && role!=='Administrateur'
                                  && role!=='Responsable vélo et guide' && role!=='Responsable commercial'">
        <router-link to="/apropos" class="navbar-brand" href="#">A propos</router-link>
      </li>
      <li class="nav-item" v-if=" role!=='Responsable de location' && role!=='Administrateur'
                                  && role!=='Responsable vélo et guide' && role!=='Responsable commercial'">
        <router-link to="/contact" class="navbar-brand" href="#">Contact</router-link>
      </li>
    </ul>
    <ul class="nav d-flex align-items-center">
        <li class="nav-item" v-if="!guest">
          <button class="btn btn-success float-right mr-5" type="submit" @click="handleSubmit"> Se déconnecter </button>
        </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  data(){
    return{
      roleValue: localStorage.getItem('role') || "",
      guestValue: localStorage.getItem('token')===null,      
      componentKey : 1
    }
  },
    computed:{
      role(){
        return this.$store.state.role
      },
      guest(){
        return this.$store.state.token == null
      }
      },
    methods:{
      handleSubmit(e){
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        this.$store.commit("updateRole")
        this.$store.commit("updateToken")
        this.$router.push({path: '/login'})
        this.forceReload()
      },
      forceReload(){
        this.componentKey += 1
        // console.log(this.componentKey)
      }
    },
};
</script>

<style></style>
