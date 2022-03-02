<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">

          <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">

      <router-link to="/AjouterTarif">
        <button class="btn btn-outline-success m-2" type="submit">Ajouter</button>
      </router-link>
    </form>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
          <!-- <h4><strong> Particulier </strong></h4> -->
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Type client</th>
                  <th scope="col">Marque vélo</th>
                  <th scope="col">Nombre d'heures (h)</th>
                  <th scope="col">Tarif (dt)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in filteredTar" :key="t.id">
                  <!-- <th scope="row">{{ t.id }}</th> -->
                  <td>{{ getType(t.idTCl) }}</td>
                  <td>{{ getMarque(t.idMar) }}</td>
                  <td>{{ t.nombreHeure }}</td>
                  <td>{{ t.tarif }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierTarif', params: {id: t.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteTarif(t.id)">Effacer </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          <h4><strong> Association </strong></h4>
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Type client</th>
                  <th scope="col">Marque vélo</th>
                  <th scope="col">Nombre d'heures (h)</th>
                  <th scope="col">Tarif (dt)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in filteredTarAss" :key="t.id">
                  <td>{{ getType(t.idTCl) }}</td>
                  <td>{{ getMarque(t.idMar) }}</td>
                  <td>{{ t.nombreHeure }}</td>
                  <td>{{ t.tarif }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierTarif', params: {id: t.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteTarif(t.id)">Effacer </button>
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
      search:"",
      tarifs: [],
      marqueVelos:[],
      typeClients:[],
    };
  },
  created() {
    this.fetchTarifs();
    this.fetchTypeClients();
    this.fetchMarqueVelos();
  },
  computed: {
    // filteredTar: function() {
    //   return this.tarifs;
    // },
    filteredTar: function() {
      var tarifs = [];
      for(var i=0; i<this.tarifs.length;i++){
      if(this.tarifs[i].idTCl==1)
      {
        tarifs.push(this.tarifs[i])
      }
      }
      return tarifs;
    },
    filteredTarAss: function() {
      var tarifsAss = [];
      for(var i=0; i<this.tarifs.length;i++){
      if(this.tarifs[i].idTCl==2){
        tarifsAss.push(this.tarifs[i])
      }
      }
      return tarifsAss;
    },
  },
  methods: {
    getMarque(id){
      var marque="";
      for(var i=0; i<this.marqueVelos.length;i++){
        if(id==this.marqueVelos[i].id){
          marque=this.marqueVelos[i].marque;
          return marque;
        }
      }
    },
    getType(id){
      var type="";
      for(var j=0; j<this.typeClients.length;j++){
        if(id==this.typeClients[j].id){
          type=this.typeClients[j].type;
          return type;
        }
      }
    },
    fetchTarifs() {
      axios
        .get(`${server.baseURL}/tarif`)
        .then((data) => (this.tarifs = data.data));
    },
    fetchMarqueVelos() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    fetchTypeClients() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    deleteTarif(id) {
      if(confirm("Voulez-vous supprimer ce tarif?")){
      axios.delete(`${server.baseURL}/tarif/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
