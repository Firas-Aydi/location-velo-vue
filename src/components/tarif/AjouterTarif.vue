<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2><strong> Ajouter Tarif</strong> </h2>
          <form id="create-post-form" @submit.prevent="createTarif">
               <div class="form-group col-md-12">
                  <div class="form-group">
                    <label><strong>Type Client</strong></label>
                    <select class="form-control" v-model="typeClient" required>
                      <option v-for="tcl in filteredCl" :key="tcl.id">{{ tcl.type }}</option>
                    </select>
                  </div>
               </div>
               
               <div class="form-group col-md-12">
                  <div class="form-group">
                    <label><strong>Marque Vélo</strong></label>
                    <select class="form-control" v-model="marqueVelo" required>
                      <option v-for="tv in filteredV" :key="tv.id">{{ tv.marque}}</option>
                    </select>
                  </div>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nombre d'heure (h)</strong></label>
                <input type="number" id="nombreHeure" v-model="nombreHeure" name="title" class="form-control" placeholder="Nombre d'heure" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"> <strong>Tarif (dt)</strong></label>
                <input type="number" id="tarif" v-model="tarif" name="title" class="form-control" placeholder="Tarif" required>
               </div>

               <p v-if="errors.length">
                  <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Ajouter Tarif </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
 import axios from "axios";
 import { server } from "../../helper";
 import router from "../../router";
export default {
  data() {
    return {
      idTCl:0,
      typeClient: "",
      idMar:0,
      marqueVelo: "",
      nombreHeure: "",
      tarif: "",
      marqueVelos:[],
      typeClients:[],
      tarifs:[],
      errors:[],
    };
  },
  created() {
    this.fetchVelos();
    this.fetchClients();
    this.fetchTarifs();
  },
  computed: {
    filteredCl: function() {
      return this.typeClients;
    },
    filteredV () {
      return this.marqueVelos;
    },
  },
  methods: {
    createTarif() {
      let exist=0
      this.errors = [];
      if (!this.validNbH(this.nombreHeure)) {
          this.errors.push("Vérifiez nombre d'heure");
      }else{
      for(var i=0; i<this.marqueVelos.length;i++){
          if(this.marqueVelos[i].marque==this.marqueVelo)
          this.idMar=this.marqueVelos[i].id;
      }
      for(var j=0; j<this.typeClients.length;j++){
          if(this.typeClients[j].type==this.typeClient)
          this.idTCl=this.typeClients[j].id;
      }
      for(var k=0;k<this.tarifs.length;k++){
        if(this.tarifs[k].idTCl==this.idTCl && this.tarifs[k].idMar==this.idMar 
           && this.tarifs[k].nombreHeure==this.nombreHeure){
          exist=exist+1;
        }
      }
      if(exist==0){
      let tarifData = {
        idTCl: this.idTCl,
        idMar: this.idMar,
        nombreHeure: this.nombreHeure,
        tarif: this.tarif,
      };
      this.__submitToServer(tarifData);
      }else{
        alert("Tarif existe déja.");
      }
      }
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    fetchClients() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    fetchTarifs() {
      axios
        .get(`${server.baseURL}/tarif`)
        .then((data) => (this.tarifs = data.data));
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/tarif`, data).then(() => {
        router.go(-1);
      });
    },
    validNbH: function (x) {
      var re = new RegExp(x.length==1 && /^[2-8]{1}/);
      return re.test(x);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

