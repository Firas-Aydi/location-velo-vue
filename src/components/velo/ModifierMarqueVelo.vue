<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier marqueVelo </strong></h2>
          <form id="create-post-form" @submit.prevent="editMarqueVelo">
               <div class="form-group col-md-12">
                <label for="title"><strong> Marque Velo </strong></label>
                <input type="text" id="marqueVelo" v-model="marqueVelo.marque" name="title" class="form-control" placeholder="Marque Velo" required>
               </div>

              <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Modifier Marque Velo </button>
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
      marque:"",
      marqueVelos:[],
      marqueVelo: {},
      errors: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMarque();
    this.fetchMarqueVelos();
  },
  methods: {
    editMarqueVelo() {
      let exist=0
      this.errors = [];
      // if (!this.validString(this.marqueVelo.marque)){
      //   this.errors.push('Varifiez vos donner');
      // }else{
      for(var j=0;j<this.marqueVelos.length;j++){
        if(this.marqueVelos[j].marque!=this.marque && this.marqueVelos[j].marque==this.marqueVelo.marque){
          exist=exist+1;
        }
      }
      if(exist==0){
        let marqueVeloData = {
          marque: this.marqueVelo.marque,
        };
        axios.put(`${server.baseURL}/marque-velo/${this.id}`,marqueVeloData)
        .then(() => {router.go(-1);});
      }else{
        this.errors.push("Marque existe déja.");
      }
      // }
    },
    getMarque() {
      axios
        .get(`${server.baseURL}/marque-velo/${this.id}`)
        .then(data => (this.marqueVelo = data.data,this.marque=data.data.marque));
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
