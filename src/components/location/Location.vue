<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
    </form>
    <div class="d-flex justify-content-center">
        <div class="col-md-12 form-wrapper" style="width: 100%; margin: auto;">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Prénom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Date de location</th>
                  <th scope="col">L'heure de depart</th>
                  <th scope="col">L'heure d'arrivée</th>
                  <th scope="col">Nombre de vélo</th>
                  <th scope="col">Guide</th>
                  <th scope="col">Montant totale (dt)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="res in filteredRes" :key="res.id">
                  <!-- <th scope="row">{{ res.id }}</th> -->
                  <td>{{ getPrenom(res.idCl) }}</td>
                  <td>{{ getNom(res.idCl) }}</td>
                  <td>{{ getEmail(res.idCl) }}</td>
                  <td>{{ getTel(res.idCl) }}</td>
                  <td>{{ res.dateLocation }}</td>
                  <td>{{ res.HeureDepart }}</td>
                  <td>{{ res.HeureArrivee }}</td>
                  <td>{{ res.nbVelo }}</td>
                  <td>{{ guide(res.avecGuide) }}</td>
                  <td>{{ res.montant }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link to="/Detail"><button class="btn btn-sm btn-outline-secondary" @click="storeData(res.id)">Detail </button></router-link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
export default {
  data: function() {
    return {
      search: "",
      reservations: [],
      clients: [],
    };
  },
  created() {
    this.fetchReservation();
    this.fetchClients();
  },
  computed: {
    filteredRes: function() {
      return this.reservations
      .filter((reservations) => {
        return (
          reservations.dateLocation.toLowerCase().match(this.search.toLowerCase()) 
          // || reservations.nom.toLowerCase().match(this.search.toLowerCase())
          );
      });
    },
  },
  methods: {
    storeData(id){
      this.$store.commit("updateId",id)
    // console.log(this.$store.state.reservation.id)
    },
    guide(b){
      if(b==false){
        return "non"
      }
      return "oui"
    },
    fetchReservation() {
      axios
        .get(`${server.baseURL}/reservation`)
        .then((data) => (this.reservations = data.data));
    },
    fetchClients() {
      axios
        .get(`${server.baseURL}/compte/clients`)
        .then((data) => (this.clients = data.data));
    },
    getPrenom(id){
      for(var i=0;i<this.clients.length;i++){
        if(this.clients[i].id==id)
        return this.clients[i].prenom
      }
    },
    getNom(id){
      for(var i=0;i<this.clients.length;i++){
        if(this.clients[i].id==id)
        return this.clients[i].nom
      }
    },
    getEmail(id){
      for(var i=0;i<this.clients.length;i++){
        if(this.clients[i].id==id)
        return this.clients[i].email
      }
    },
    getTel(id){
      for(var i=0;i<this.clients.length;i++){
        if(this.clients[i].id==id)
        return this.clients[i].telephone
      }
    },
  },
};
</script>
