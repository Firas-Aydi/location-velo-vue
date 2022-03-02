<template>
   <div>

        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier Modèle </strong></h2>
          <form id="create-post-form" @submit.prevent="editModele">
               <div class="form-group col-md-12">
              <label for="title"> <strong>Marque </strong></label>
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
              <label for="title"> <strong>Modèle</strong> </label>
              <input type="text" id="modele" v-model="modele.modele" name="title" class="form-control" placeholder="Modèle" required>
            </div>

            <div class="form-group col-md-12">
              <label for="title"><strong> Pouce </strong></label>
              <input type="text" id="pouce" v-model="modele.pouce" name="title" class="form-control" placeholder="Pouce" required>
            </div>

            <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Modifier Modèle </button>
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
      idMar:0,
      marque:"",
      model:"",
      pouce:"",
      marqueVelos:[],
      modeles:[],
      modele: [],
      errors: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getModele();
    this.fetchMarqueVelo();
    // this.getMarque();
    this.fetchModele();
  },
  computed: {
    filteredMVe: function() {
      return this.marqueVelos;
    },
  },
  methods: {
    // getMarque(id){
    //     // var marque="";
    //     for(var j=0; j<this.marqueVelos.length;j++){
    //         if(id==this.marqueVelos[j].id){
    //             this.marque=this.marqueVelos[j].marque;
    //             // return marque;
    //         }
    //     }
    // },
    editModele() {
      let existM=0
      this.errors=[]
      for(var i=0; i<this.marqueVelos.length;i++){
          if(this.marqueVelos[i].marque==this.marque)
          this.idMar=this.marqueVelos[i].id;
      }
      for(var j=0;j<this.modeles.length;j++){
        if(this.modeles[j].modele!=this.model && this.modeles[j].modele==this.modele.modele &&
           this.modeles[j].pouce==this.modele.pouce){
          existM=existM+1;
        }
      }
      if(existM==0){
        let modeleData = {
          idMar: this.idMar,
          modele: this.modele.modele,
          pouce: this.modele.pouce,
        };
        axios.put(`${server.baseURL}/modele/${this.id}`,modeleData)
        .then(() => {router.go(-1);});
      }else{
        this.errors.push("Modéle existe déja.");
      }
    },
    fetchMarqueVelo() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    fetchModele() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    getModele() {
      axios
        .get(`${server.baseURL}/modele/${this.id}`)
        .then(data => (this.modele = data.data,
        this.model=data.data.modele,this.pouce=data.data.pouce
        // console.log(this.modele)
        ));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
