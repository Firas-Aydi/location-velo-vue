<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterVelo">
        <button class="btn btn-outline-success" type="submit">Ajouter</button>
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
                  <!-- <th scope="col">Marque</th> -->
                  <th scope="col">Modèle</th>
                  <th scope="col">Pouce</th>
                  <th scope="col">Matricule</th>
                  <th scope="col">Etat</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in filteredV" :key="v.id">
                  <!-- <th scope="row">{{ v.id }}</th> -->
                  <!-- <td>{{ v.marque }}</td> -->
                  <td>{{ v.modele }}</td>
                  <td>{{ v.pouce }}</td>
                  <td>{{ v.matricule }}</td>
                  <td>{{ v.etat }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierVelo', params: {id: v.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier</button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteVelo(v.id)">Effacer</button>
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
      velos: [],
      modeles: [],
    };
  },
  created() {
    this.fetchModeles();
    this.fetchVelos();
  },
  computed: {
    filteredV: function() {
      var V=[]
      for(var i=0; i<this.velos.length;i++){
        for(var j=0;j<this.modeles.length;j++){
          if(this.velos[i].idMod==this.modeles[j].id){
            V.push({id:this.velos[i].id,matricule:this.velos[i].matricule,etat:this.velos[i].etat,
            modele:this.modeles[j].modele,pouce:this.modeles[j].pouce})
          }
        }
      }
      return V.filter((velos) => {
        return (
          velos.matricule.toLowerCase().match(this.search.toLowerCase()) 
          || velos.modele.toLowerCase().match(this.search.toLowerCase())
        );
      });
    },
    },
  methods: {
    modele(id){
      var modele="";
      for(var j=0; j<this.modeles.length;j++){
        if(id==this.modeles[j].id){
          modele=this.modeles[j].modele;
          return modele;
        }
      }
    },
    pouce(id){
      var pouce="";
      for(var j=0; j<this.modeles.length;j++){
        if(id==this.modeles[j].id){
          pouce=this.modeles[j].pouce;
          return pouce;
        }
      }
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.velos = data.data));
    },
    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    deleteVelo(id) {
      if(confirm("Voulez-vous supprimer ce vélo?")){
      axios.delete(`${server.baseURL}/velo/${id}`).then((data) => {
        console.log(data);
        console.error("msg",data);
        // window.location.reload();
      })
      }
    },
  },
};
</script>
