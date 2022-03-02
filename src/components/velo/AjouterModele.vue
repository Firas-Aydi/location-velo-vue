<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2> <strong>Ajouter Modèle </strong></h2>
          <form id="create-post-form" @submit.prevent="createModele">
            <!-- <div class="form-group col-md-12">
              <label for="title"> Photo </label>
              <input type="file" id="image" @change="GetImage" name="title" class="form-control" required>
            </div> -->

            <div class="form-group col-md-12">
              <label for="title"> <strong>Marque</strong> </label>
              <div>
                <li style="display:inline-block; width:307px; margin-right:14px;">
                  <select class="form-control" v-model="marque" required>
                    <option v-for="mar in filteredMVe" :key="mar.id">{{ mar.marque }}</option>
                  </select>
                </li>
                <router-link to="/marque-velo">
                <li style="display:inline-block;" class="btn btn-outline-success" type="submit">Marque Vélo</li>
                </router-link>
              </div>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Modéle </strong></label>
              <input type="text" id="modele" v-model="modele" name="title" class="form-control" placeholder="Modéle" required>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Pouce </strong></label>
              <input type="text" id="pouce" v-model="pouce" name="title" class="form-control" placeholder="Pouce" required>
            </div>

            <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
              <button class="btn btn-success" type="submit"> Ajouter Modèle </button>
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
      idMar:0,
      marque: "",
      modele: "",
      pouce: "",
      marqueVelos:[],
      modeles:[],
      errors: [],
    };
  },
  created() {
    this.fetchMarqueVelos();
    this.fetchModeles();
  },
  computed: {
    filteredMVe: function() {
      return this.marqueVelos;
    },
  },
  methods: {
    // GetImage(event){
    //   let image = event.target.files[0]
    //   let reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   reader.onload = event => {
    //   this.image = event.target.result
    //   }
    // },
    createModele() {
      let exist=0
      this.errors=[]
      for(var i=0; i<this.marqueVelos.length;i++){
          if(this.marqueVelos[i].marque==this.marque)
          this.idMar=this.marqueVelos[i].id;
      }
      for(var j=0;j<this.modeles.length;j++){
        if(this.modeles[j].modele==this.modele && this.modeles[j].pouce==this.pouce){
          exist=exist+1;
        }
      }
      if(exist==0){
      let ModeleData = {
        // image: this.image,
        idMar: this.idMar,
        modele: this.modele,
        pouce: this.pouce,
      };
      this.__submitToServer(ModeleData);
      }else{
        this.errors.push("Modéle existe déja.");
      }
    },
    fetchMarqueVelos() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/modele`, data).then(() => {
        router.go(-1);
      });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

