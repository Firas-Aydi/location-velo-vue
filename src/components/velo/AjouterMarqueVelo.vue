<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto;  background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2> <strong>Ajouter Marque Vélo</strong> </h2>
          <form id="create-post-form" @submit.prevent="createMarqueVelo">
               <div class="form-group col-md-12">
                <label for="title"><strong> Marque Vélo </strong></label>
                <input type="text" id="MarqueVelo" v-model="marque" name="title" class="form-control" placeholder="Marque Vélo" required>
               </div>

              <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Ajouter Marque Vélo </button>
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
      marque:"",
      marqueVelos:[],
      errors: [],

    };
  },
  created() {
    this.fetchMarqueVelos();
  },
  methods: {
    createMarqueVelo() {
      let exist=0
      this.errors = [];
      // if (!this.validString(this.marque)){
      //   this.errors.push('Varifiez vos donner');
      // }else{
      for(var j=0;j<this.marqueVelos.length;j++){
        if(this.marqueVelos[j].marque==this.marque){
          exist=exist+1;
        }
      }
      if(exist==0){
      let MarqueVeloData = {
        marque: this.marque,
      };
      this.__submitToServer(MarqueVeloData);
      }else{
        this.errors.push("Marque existe déja.");
      }
      // }
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/marque-velo`, data).then(() => {
        router.go(-1);
      });
    },
    fetchMarqueVelos() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    // validString: function (s) {
    //   var re = new RegExp(s.length<=20 && /^[a-zA-Z ]+$/);
    //   return re.test(s);
    // },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
