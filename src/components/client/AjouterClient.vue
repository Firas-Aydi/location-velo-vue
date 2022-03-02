<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2> <strong>Ajouter Client </strong></h2>
          <form id="create-post-form" @submit.prevent="createClient">
               <div class="form-group col-md-12">
                <label for="title"><strong> Prénom </strong></label>
                <input type="text" id="prenom" v-model="prenom" name="title" class="form-control" placeholder="Prénom" required expanded>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="nom" name="title" class="form-control" placeholder="Nom" required>
               </div>

             <div class="form-group col-md-12">
                <label for="title"> <strong>Date de naissance </strong></label>
                <input type="date" id="dateNaissance" v-model="dateNaissance" name="title" class="form-control" placeholder="Date de naissance" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Email</strong> </label>
                <input type="email" id="email" v-model="email" name="title" class="form-control" placeholder="Email" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Telephone</strong> </label>
                <input type="tel" id="telephone" v-model="telephone" name="title" class="form-control" placeholder="Telephone" required>
            </div>

            <div class="form-group col-md-12">
                  <div class="form-group">
                    <label><strong>Type Client</strong></label>
                    <div>
                    <li style="display:inline-block; width:317px; margin-right:14px;">
                      <select class="form-control" v-model="role" required>
                        <option v-for="tcl in typeClients" :key="tcl.id">{{ tcl.type }}</option>
                      </select>
                    </li>
                    <router-link to="/type-client">
                    <li style="display:inline-block;" class="btn btn-outline-success " type="submit">Type Client</li>
                    </router-link>
                    </div>
                  </div>
               </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Mot de passe </strong></label>
                <input type="password" id="password" v-model="password" name="title" class="form-control" placeholder="Mot de passe" autocomplete required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"> <strong>Confirmer mot de passe</strong> </label>
                <input type="password" id="password_confirmation " v-model="password_confirmation " name="title" class="form-control" placeholder="Confirmer mot de passe" autocomplete  required>
            </div>

            <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Ajouter Client </button>
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
      role: "",
      password:"",
      password_confirmation : "",
      typeClients:[],
      errors: [],
      clients: [],
    };
  },
  created() {
    this.fetchTypeClient();
    this.fetchClients();
  },
  computed: {
    filteredTCl: function() {
      return this.typeClients;
    },
  },
  methods: {
    createClient() {
      let existEm=0
      // let existTel=0
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
      if (this.type=="") {
          this.errors.push('Vérifiez le type de client');
      }else
      if ( (date.substring(0,4)-this.dateNaissance.substring(0,4))<15) {
          this.errors.push('Vous devez avoir au moins 15 ans');
      }else
      if (!this.validEmail(this.email)) {
          this.errors.push("Vérifiez l'email");
      }else
      if (!this.validTel(this.telephone)) {
          this.errors.push('Vérifiez le numéro de téléphone');
      }else
      if (this.password != this.password_confirmation){
        this.errors.push('Les mots de passe ne correspondent pas');
        this.password = ""
        this.password_confirmation = ""
      }else{
        for(var j=0;j<this.clients.length;j++){
          if(this.clients[j].email==this.email){
            existEm=existEm+1;
          }
          // if(this.users[j].telephone==this.telephone){
          //   existTel=existTel+1;
          // }
        }
      if(existEm==0){
      let clientData = {
        prenom: this.prenom,
        nom: this.nom,
        dateNaissance: this.dateNaissance,
        email: this.email,
        telephone: this.telephone,
        role: this.role,
        password: this.password,
      };
        this.__submitToServer(clientData); 
        }else if(existEm != 0){
          this.errors.push("email est déja utilisé."); 
        }
        // else{
        //   alert("Numéro de téléphone est déja utilisé."); 
        // }
      }
    },
    fetchTypeClient() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/compte`, data).then(() => {
        router.go(-1);
      });
    },
    fetchClients() {
      axios
        .get(`${server.baseURL}/compte/clients`)
        .then((data) => (this.clients = data.data));
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
