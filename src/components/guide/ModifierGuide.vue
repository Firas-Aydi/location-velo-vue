<template>
   <div>

        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2> <strong>Modifier Guide</strong> </h2>
          <form id="create-post-form" @submit.prevent="editGuide">
               <div class="form-group col-md-12">
                <label for="title"><strong> Prenom</strong> </label>
                <input type="text" id="prenom" v-model="guide.prenom" name="title" class="form-control" placeholder="Prenom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="guide.nom" name="title" class="form-control" placeholder="Nom" required>
               </div>

             <div class="form-group col-md-12">
                <label for="title"> <strong>Date de naissance</strong> </label>
                <input type="date" id="dateNaissance" v-model="guide.dateNaissance" name="title" class="form-control" placeholder="Date de naissance" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Email </strong></label>
                <input type="email" id="email" v-model="guide.email" name="title" class="form-control" placeholder="Email" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Telephone </strong></label>
                <input type="tel" id="telephone" v-model="guide.telephone" name="title" class="form-control" placeholder="Telephone" required>
            </div>

            <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Modifier Guide </button>
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
      guide: {},
      guides: [],
      errors:[],
      telephone:"",
      email:"",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getGuide();
    this.fetchGuides();

  },
  methods: {
    editGuide() {
      let exist=0
      this.errors = [];
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      if (!this.validString(this.guide.prenom)){
        this.errors.push('Vérifiez le prénom');
      }else
      if (!this.validString(this.guide.nom)){
        this.errors.push('Vérifiez le nom');
      }else
      if (this.dateNaissance==""){
        this.errors.push('Vérifiez la date de naissance');
      }else
      if ( (date.substring(0,4)-this.dateNaissance.substring(0,4))<15) {
          this.errors.push('Vous devez avoir au moins 15 ans');
      }else
      if (!this.validEmail(this.guide.email)) {
          this.errors.push('Vérifiez votre email');
      }else
      if (!this.validTel(this.guide.telephone)  && this.guide.telephone != this.telephone) {
          this.errors.push('Vérifiez votre numéro de téléphone');
      }else{
      for(var j=0;j<this.guides.length;j++){
        if(this.guides[j].email==this.guide.email && this.guides[j].email!=this.email){
          exist=exist+1;
        }
      }
      if(exist==0){
      let guideData = {
        prenom: this.guide.prenom,
        nom: this.guide.nom,
        dateNaissance: this.guide.dateNaissance,
        email: this.guide.email,
        telephone: this.guide.telephone,
      };

      axios.put(`${server.baseURL}/guide/${this.id}`,guideData)
        .then(() => {router.go(-1);});
        }else if(exist != 0){
        this.errors.push("email est déja utilisé."); 
      }
      }
    },
    getGuide() {
      axios
        .get(`${server.baseURL}/guide/${this.id}`)
        .then(data => (this.guide = data.data,
        this.email= data.data.email
        ,this.telephone=data.data.telephone));
    },
    fetchGuides() {
      axios
        .get(`${server.baseURL}/guide`)
        .then((data) => (this.guides = data.data));
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
