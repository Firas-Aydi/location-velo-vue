<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterReparation">
        <button class="btn btn-outline-success " type="submit">Ajouter</button>
      </router-link>
    </form>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Vélo</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date réparation</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in filteredRep" :key="r.id">
                  <!-- <th scope="row">{{ r.id }}</th> -->
                  <td>{{ getMatricule(r.idVelo) }}</td>
                  <td>{{ r.description }}</td>
                  <td>{{ r.date }}</td>
                  <td>{{ r.prix }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierReparation', params: {id: r.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteReparation(r.id)">Effacer </button>
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
      reparations: [],
      velos: [],
    };
  },
  created() {
    this.fetchReparations();
    this.fetchVelos();
  },
  computed: {
    filteredRep: function() {
      return this.reparations.filter((reparations) => {
        return (
          reparations.date.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  },
  methods: {
    getMatricule(id){
      var velo="";
      for(var j=0; j<this.velos.length;j++){
        if(id==this.velos[j].id){
          velo=this.velos[j].matricule;
          return velo;
        }
      }
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.velos = data.data));
    },
    fetchReparations() {
      axios
        .get(`${server.baseURL}/reparation`)
        .then((data) => (this.reparations = data.data));
    },
    deleteReparation(id) {
      if(confirm("Voulez-vous supprimer cette réparation?")){
      axios.delete(`${server.baseURL}/reparation/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
