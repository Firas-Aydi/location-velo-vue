<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2><strong> Ajouter Guide </strong></h2>
          <form id="create-post-form" @submit.prevent="createGuide">
               <div class="form-group col-md-12">
                <label for="title"><strong> Prenom</strong> </label>
                <input type="text" id="prenom" v-model="prenom" name="title" class="form-control" placeholder="Prenom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom</strong> </label>
                <input type="text" id="nom" v-model="nom" name="title" class="form-control" placeholder="Nom" required>
               </div>

             <div class="form-group col-md-12">
                <label for="title"><strong> Date de naissance </strong></label>
                <input type="date" id="dateNaissance" v-model="dateNaissance" name="title" class="form-control" placeholder="Date de naissance" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Email </strong></label>
                <input type="email" id="email" v-model="email" name="title" class="form-control" placeholder="Email" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Telephone</strong> </label>
                <input type="tel" id="telephone" v-model="telephone" name="title" class="form-control" placeholder="Telephone" required>
            </div>

            <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Ajouter Guide </button>
            </div>          
          </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
// import * as moment from 'moment'

export default {
  data() {
    return {
      prenom: "",
      nom: "",
      dateNaissance: "",
      email: "",
      telephone: "",
      guides:[],
      errors:[],
    };
  },
  created() {
    this.fetchGuides();
  },
  methods: {
    createGuide() {
      let exist=0
      this.errors = [];
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      if (!this.validString(this.prenom)) {
          this.errors.push('Vérifiez le prénom');
      }else
      if (!this.validString(this.nom)) {
          this.errors.push('Vérifiez le nom');
      }else
      if (this.dateNaissance=="") {
          this.errors.push('Vérifiez la date de naissance');
      }else
      if ( (date.substring(0,4)-this.dateNaissance.substring(0,4))<15) {
          this.errors.push('Vous devez avoir au moins 15 ans');
      }else
      if (!this.validString(this.prenom) || !this.validString(this.nom)){
        this.errors.push('Vérifiez vos donner');
      }else
      if (!this.validEmail(this.email)) {
          this.errors.push('Vérifiez votre email');
      }else
      if (!this.validTel(this.telephone)) {
          this.errors.push('Vérifiez votre numéro de téléphone');
      }else{
      for(var j=0;j<this.guides.length;j++){
        if(this.guides[j].email==this.email){
          exist=exist+1;
        }
      }
      if(exist==0){
      let guideData = {
        prenom: this.prenom,
        nom: this.nom,
        dateNaissance: this.dateNaissance,
        email: this.email,
        telephone: this.telephone,
      };
      this.__submitToServer(guideData);
      }else if(exist != 0){
        this.errors.push("email est déja utilisé."); 
      }
      }
    },
    fetchGuides() {
      axios
        .get(`${server.baseURL}/guide`)
        .then((data) => (this.guides = data.data));
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/guide`, data).then(() => {
        router.go(-1);
      });
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validTel: function (tel) {
      var re = new RegExp(tel.length==8 && /^(2|3|4|5|7|9)[0-9]{7}/);
      return re.test(tel);
    },
    validString: function (s) {
      var re = new RegExp(s.length<=20 && /^[a-zA-Z a-zA-Z À Â Ä Ç É È Ê Ë Î Ï Ô Ö Ù Û Ü Ÿ à â ä ç é è ê ë î ï ô ö ù û ü ÿ]+$/);
      return re.test(s);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

