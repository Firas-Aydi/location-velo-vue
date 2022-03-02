<template>
  <div>
    <img src="@/assets/img.jpg" alt=""  width="100%" style="margin-top:-25px; margin-bottom:25px;">
    <h1><strong> Nos tarifs </strong></h1>
    <h4><strong> Particulier </strong></h4>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Type client</th>
                  <th scope="col">Marque vélo</th>
                  <th scope="col">Nombre d'heures (h)</th>
                  <th scope="col">Tarif (dt)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in filteredTarPar" :key="t.id">
                  <!-- <th scope="row">{{ t.id }}</th> -->
                  <td>{{ getType(t.idTCl) }}</td>
                  <td>{{ getMarque(t.idMar) }}</td>
                  <td>{{ t.nombreHeure }}</td>
                  <td>{{ t.tarif }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <h4><strong> Association </strong></h4>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Type client</th>
                  <th scope="col">Marque vélo</th>
                  <th scope="col">Nombre d'heures (h)</th>
                  <th scope="col">Tarif (dt)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in filteredTarAss" :key="t.id">
                  <!-- <th scope="row">{{ t.id }}</th> -->
                  <td>{{ getType(t.idTCl) }}</td>
                  <td>{{ getMarque(t.idMar) }}</td>
                  <td>{{ t.nombreHeure }}</td>
                  <td>{{ t.tarif }}</td>
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
 import { server } from "../helper";
 import axios from "axios";
export default {
  data: function() {
    return {
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
    filteredTarPar: function() {
      var tarifsPar = [];
      for(var i=0; i<this.tarifs.length;i++){
      if(this.tarifs[i].idTCl==1){
        tarifsPar.push(this.tarifs[i])
      }
      }
      return tarifsPar;
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
    getMarque(id){
      var marque="";
      for(var i=0; i<this.marqueVelos.length;i++){
      // for(var j=0; j<this.typeClients.length;j++){
        if(id==this.marqueVelos[i].id){
          marque=this.marqueVelos[i].marque;
          return marque;
        }
      // }
      }
    },
    getType(id){
      var type="";
      for(var j=0; j<this.typeClients.length;j++){
        if(id==this.typeClients[j].id ){
          type=this.typeClients[j].type;
          return type;
        }
      }
    },
    // getTypeAss(id){
    //   var type="";
    //   for(var j=0; j<this.typeClients.length;j++){
    //     if(id==this.typeClients[j].id && this.typeClients[j].type=="Particulier"){
    //       type=this.typeClients[j].type;
    //       return type;
    //     }
    //   }
    // },
  },
};
</script>
