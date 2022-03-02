<template>
   <div>

        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier Réparation</strong> </h2>
          <form id="create-post-form" @submit.prevent="editReparation">
               <div class="form-group col-md-12">
                  <div class="form-group">
                    <label><strong>Vélo</strong></label>
                    <select class="form-control" v-model="matricule">
                      <option v-for="mv in filteredV" :key="mv.id">{{ mv.matricule }}</option>
                    </select>
                  </div>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Description </strong></label>
                <textarea type="text" id="description" v-model="reparation.description" name="title" class="form-control" placeholder="description" required></textarea>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Date </strong></label>
                <input type="date" id="date" v-model="reparation.date" name="title" class="form-control" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Prix </strong></label>
                <input type="number" id="prix" v-model="reparation.prix" name="title" class="form-control" placeholder="prix" required>
               </div>

              <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Modifier Réparation </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
  import { server } from "../../helper";
  import axios from "axios";
  import router from "../../router";
  import * as moment from 'moment'
export default {
  data() {
    return {
      id: 0,
      idVelo:0,
      matricule: "",
      date: "",
      reparation: {},
      Velos:[],
      reparations:[],
      errors:[],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getReparation();
    this.fetchVelos();
    this.fetchReparations();
  },
  computed: {
    filteredV: function() {
      return this.Velos;
    },
    // filteredV () {
    //   return uniq(this.Velos.map(({ matricule }) => matricule))
    // },
  },
  methods: {
    editReparation() {
      // let exist=0
      this.errors = [];
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      if(this.matricule=="")
      {
      this.errors.push("Vérifier la matricule");
      }else
      if(this.reparation.date=="")
      {
      this.errors.push("Vérifier la date");
      }else
      if(moment(this.reparation.date, ["MM-DD-YYYY", "YYYY-MM-DD"])>moment(date, ["MM-DD-YYYY", "YYYY-MM-DD"]))
      {
      this.errors.push("La date de réparation ne peut pas être supérieur à la date d'aujourd'hui");
      }else{
      for(var i=0; i<this.Velos.length;i++){
          if(this.Velos[i].matricule==this.matricule)
          this.idVelo=this.Velos[i].id;
      }
      // for(var k=0;k<this.reparations.length;k++){
      //   if(this.reparations[k].idVelo==this.idVelo 
      //   && this.reparations[k].date==this.reparation.date && this.reparations[k].date!=this.date){
      //     exist=exist+1;
      //   }
      // }
      // if(exist==0){
      let reparationData = {
        idVelo: this.idVelo,
        description: this.reparation.description,
        date: this.reparation.date,
        prix: this.reparation.prix,
      };
      axios.put(`${server.baseURL}/reparation/${this.id}`,reparationData)
        .then(() => {router.go(-1);});
      // }else{
      //   this.errors.push("Réparation existe déja.");
      // }
      // }else{
      //   this.errors.push("Vérifier vos donner.");
      }
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.Velos = data.data));
    },
    getReparation() {
      axios
        .get(`${server.baseURL}/reparation/${this.id}`)
        .then(data => (this.reparation = data.data,this.date= data.data.date));
    },
    fetchReparations() {
      axios
        .get(`${server.baseURL}/reparation`)
        .then((data) => (this.reparations = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
