<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
    </form>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Prénom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">L'heure de départ</th>
                  <th scope="col">L'heure d'arrivée</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in filteredRet" :key="r.id">
                  <!-- <th scope="row">{{ r.id }}</th> -->
                  <td>{{ getPrenom(r.idCl) }}</td>
                  <td>{{ getNom(r.idCl) }}</td>
                  <td>{{ r.HeureDepart }}</td>
                  <td>{{ r.HeureArrivee }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" >
                        <button class="btn btn-sm btn-outline-secondary" @click="retour(r.id,r.idRes)"> Retour </button>
                        <router-link :to="{name: 'AjouterDommage'}"><button class="btn btn-sm btn-outline-secondary">Dommage </button></router-link>
                        <!-- <router-link :to="{name: 'AjouterReparation'}"><button class="btn btn-sm btn-outline-secondary">Réparation </button></router-link> -->
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
  </div>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
export default {
  data: function() {
    return {
      search: "",
      retours: [],
      clients: [],
    };
  },
  created() {
    this.fetchRetours();
    this.fetchClients();
  },
  computed: {
    filteredRet: function() {
      var retour=[]
      for(var i=0;i<this.retours.length; i++){
        if(this.retours[i].retour==0){
          retour.push(this.retours[i])
        }
      }
      return retour
    },
  },
  methods: {
    fetchRetours() {
      axios
        .get(`${server.baseURL}/location`)
        .then((data) => (this.retours = data.data));
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
    retour(id,idRes){
      let retourData = {
          retour: true,
        };
        axios.put(`${server.baseURL}/location/${id}`,retourData)
        axios.delete(`${server.baseURL}/reservation/${idRes}`)
        alert("RETOUR EFFECTUÉE ✨")
        window.location.reload();
    },
  },
};
</script>
