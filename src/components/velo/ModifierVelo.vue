<template>
   <div>

        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2> <strong>Modifier Vélo </strong></h2>
          <form id="create-post-form" @submit.prevent="editVelo">
               <!-- <div class="form-group col-md-12">
              <label for="title"> Marque </label>
              <div>
                <li style="display:inline-block; width:307px; margin-right:15px;">
                  <select class="form-control" v-model="velo.marque" required>
                    <option v-for="mve in filteredMod" :key="mve.id">{{ mve.marque }}</option>
                  </select>
                </li>
                <router-link to="/marque-velo">
                <li style="display:inline-block;" class="btn btn-outline-success" type="submit">Marque Vélo</li>
                </router-link>
              </div>
            </div> -->

            <div class="form-group col-md-12">
              <label for="title"><strong> Modèle </strong></label>
              <div>
                <li style="display:inline-block; width:307px; margin-right:15px;">
                  <select class="form-control" v-model="modele" required>
                    <option v-for="mod in filteredMod" :key="mod.id">{{ mod.modele }}</option>
                  </select>
                </li>
                <router-link to="/modele">
                <li style="display:inline-block;" class="btn btn-outline-success" type="submit">Modèle Vélo</li>
                </router-link>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="title"> <strong>Pouce </strong></label>
              <div>
                  <select class="form-control" v-model="pouce" required>
                    <option v-for="mod in filteredMod" :key="mod.id">{{ mod.pouce }}</option>
                  </select>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="title"> <strong>Matricule</strong> </label>
              <input type="text" id="matricule" v-model="velo.matricule" name="title" class="form-control" placeholder="Matricule" required>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Etat </strong></label>
                <select class="form-control" v-model="velo.etat" required>
                  <option>OK</option>
                  <option>KO</option>
                </select>
            </div>

            <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Modifier Vélo </button>
            </div>          
          </form>
        </div>
    </div>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
export default {
  data() {
    return {
      id: 0,
      idMod: 0,
      modele:"",
      pouce:"",
      matricule:"",
      modeles:[],
      velos:[],
      velo: {},
      errors: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getVelo();
    this.fetchModele();
    this.fetchVelos();
  },
  computed: {
    filteredMod: function() {
      return this.modeles;
    },
  },
  methods: {
    editVelo() {
      let existV=0
      this.errors=[]
      for(var i=0; i<this.modeles.length;i++){
        if(this.modeles[i].modele==this.modele && this.modeles[i].pouce==this.pouce){
        this.idMod=this.modeles[i].id;
        }
      }
      for(var j=0;j<this.velos.length;j++){
        if(this.velos[j].matricule!=this.matricule && this.velos[j].matricule==this.velo.matricule){
          existV=existV+1;
        }
      }
      if(existV==0 && this.idMod!=0){
        let veloData = {
          idMod: this.idMod,
          matricule: this.velo.matricule,
          etat: this.velo.etat,
        };
        axios.put(`${server.baseURL}/velo/${this.id}`,veloData)
        .then(() => {router.go(-1);});
      }else
      if(this.idMod==0){
        this.errors.push("Ce Modéle n'existe pas.")
      }else{
        this.errors.push("Vélo existe déja.");
      }
    },
    fetchModele() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.velos = data.data));
    },
    getVelo() {
      axios
        .get(`${server.baseURL}/velo/${this.id}`)
        .then(data => (this.velo = data.data, this.matricule= data.data.matricule));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
