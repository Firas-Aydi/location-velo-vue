<template>
   <div>
        <div class="col-md-12 form-wrapper " style="width: 500px; margin: 0 auto;">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <form class="card mb-5 pt-3" id="create-post-form" @submit.prevent="createVelo" style=" background-color:#eee">
          <h2> <strong> Ajouter Vélo </strong></h2>
            <!-- <div class="form-group col-md-12">
              <label for="title"> Photo </label>
              <input type="file" id="image" @change="GetImage" name="title" class="form-control" required>
            </div> -->

            <!-- <div class="form-group col-md-12">
              <label for="title"> Marque </label>
              <div>
                <li style="display:inline-block; width:307px; margin-right:15px;">
                  <select class="form-control" v-model="marque" required>
                    <option v-for="mve in filteredMVe" :key="mve.id">{{ mve.marque }}</option>
                  </select>
                </li>
                <router-link to="/marque-velo">
                <li style="display:inline-block;" class="btn btn-outline-success" type="submit">Marque Vélo</li>
                </router-link>
              </div>
            </div> -->

            <div class="form-group col-md-12">
              <label for="title"><strong> Modéle </strong></label>
              <div>
                <li style="display:inline-block; width:307px; margin-right:15px;">
                  <select class="form-control" v-model="modele" required>
                    <option v-for="mod in filteredMod" :key="mod">{{ mod }}</option>
                  </select>
                </li>
                <router-link to="/modele">
                <li style="display:inline-block;" class="btn btn-outline-success" type="submit">Modèle Vélo</li>
                </router-link>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Pouce </strong></label>
              <div>
                  <select class="form-control" v-model="pouce" required>
                    <option v-for="p in filteredPouce" :key="p" ><p v-if="p.pouce!=''">{{ p }}</p></option>
                  </select>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Matricule </strong></label>
              <input type="text" id="matricule" v-model="matricule" name="title" class="form-control" placeholder="Matricule" required>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Etat </strong></label>
                <select class="form-control" v-model="etat" required>
                  <option>OK</option>
                  <option>KO</option>
                </select>
            </div>

            <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
              <button class="btn btn-success" type="submit"> Ajouter Vélo </button>
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
      // image:null,
      // marque: "",
      idMod:0,
      modele: "",
      pouce: "",
      matricule: "",
      etat: "",
      modeles:[],
      velos:[],
      errors: [],
    };
  },
  created() {
    this.fetchModeles();
    this.fetchVelos();
  },
  computed: {
    filteredPouce: function() {
      return [...new Map(this.modeles.map(item => [item.pouce, item.pouce])).values()];
    },
    filteredMod: function() {
      return [...new Map(this.modeles.map(item => [item.modele, item.modele])).values()];
      // return [ ...new Set(this.modeles.modele) ];
      // return this.modeles.modele= [ ...new Set(this.modeles.modele) ];
      // return this.modeles
    },
  },
  methods: {
    // GetImage(event){
    //   let image = event.target.files[0]
    //   let reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   reader.onload = event => {
    //     this.image = event.target.result
    //   }
    // },
    createVelo() {
      let exist=0
      this.errors=[]
      for(var i=0; i<this.modeles.length;i++){
        if(this.modeles[i].modele==this.modele && this.modeles[i].pouce==this.pouce)
        this.idMod=this.modeles[i].id;
      }
      for(var j=0;j<this.velos.length;j++){
        if(this.velos[j].matricule==this.matricule){
          exist=exist+1;
        }
      }
      if(exist==0){
        let veloData = {
          // image: this.image,
          // marque: this.marque,
          idMod: this.idMod,
          matricule: this.matricule,
          etat: this.etat,
        };
        this.__submitToServer(veloData);
      }else{
        this.errors.push("Vélo existe déja.");
      }
    },
    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.velos = data.data));
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/velo`, data).then(() => {
        router.go(-1);
      });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

