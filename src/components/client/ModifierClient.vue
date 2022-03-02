<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier Client</strong> </h2>
          <form id="create-post-form" @submit.prevent="editClient">
               <div class="form-group col-md-12">
                <label for="title"><strong> Prénom </strong></label>
                <input type="text" id="prenom" v-model="client.prenom" name="title" class="form-control" placeholder="Prénom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="client.nom" name="title" class="form-control" placeholder="Nom" required>
               </div>

             <div class="form-group col-md-12">
                <label for="title"><strong> Date de naissance </strong></label>
                <input type="date" id="dateNaissance" v-model="client.dateNaissance" name="title" class="form-control" placeholder="Date de naissance" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Email </strong></label>
                <input type="email" id="email" v-model="client.email" name="title" class="form-control" placeholder="Email" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Telephone </strong></label>
                <input type="tel" id="telephone" v-model="client.telephone" name="title" class="form-control" placeholder="Telephone" required>
            </div>

            <div class="form-group col-md-12">
                  <div class="form-group">
                    <label><strong>Type Client</strong></label>
                    <div>
                    <li style="display:inline-block; width:317px; margin-right:14px;"><select class="form-control" v-model="client.role" required>
                      <option v-for="tcl in filteredTCl" :key="tcl.id ">{{ tcl.type }}</option>
                    </select></li>
                    <router-link to="/type-client">
                    <li style="display:inline-block;" class="btn btn-outline-success" type="submit">Type Client</li>
                    </router-link>
                    </div>
                  </div>
               </div>

              <div class="form-group col-md-12">
                <label for="title"><strong> Mot de passe </strong></label>
                <input type="password" id="password" v-model="client.password" name="title" class="form-control" placeholder="Mot de passe" autocomplete required>
              </div>

              <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>  
              <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Modifier Client </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
import router from "../../router";
// import * as moment from 'moment'
export default {
  data() {
    return {
      id: 0,
      role: "",
      email: "",
      telephone: "",
      typeClients:[],
      clients:[],
      errors: [],
      client: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getClient();
    this.fetchTypeClient();
    this.fetchClients();
  },
  computed: {
    filteredTCl: function() {
      return this.typeClients;
    },
  },
  methods: {
    editClient() {
      let existEm=0
      this.errors = [];
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      if (!this.validString(this.client.prenom)){
        this.errors.push('Vérifiez le prénom');
      }else
      if (!this.validString(this.client.nom)){
        this.errors.push('Vérifiez le nom');
      }else
      if (this.client.dateNaissance==""){
        this.errors.push('Vérifiez la date de naissance');
      }else
      if (this.client.role==""){
        this.errors.push('Vérifiez le type de client');
      }else
      if ( (date.substring(0,4)-this.client.dateNaissance.substring(0,4))<15) {
          this.errors.push('Vous devez avoir au moins 15 ans');
      }else
      if (!this.validEmail(this.client.email)) {
          this.errors.push("Vérifiez l'email");
      }else
      if (!this.validTel(this.client.telephone) && this.client.telephone != this.telephone) {
          this.errors.push('Vérifiez le numéro de téléphone');
      }else{
        for(var j=0;j<this.clients.length;j++){
          if(this.clients[j].email==this.client.email && this.clients[j].email!=this.email){
            existEm=existEm+1;
          }
        }
      if(existEm==0){
      let clientData = {
        prenom: this.client.prenom,
        nom: this.client.nom,
        dateNaissance: this.client.dateNaissance,
        email: this.client.email,
        telephone: this.client.telephone,
        role: this.client.role,
        password: this.client.password,
      };
      axios.put(`${server.baseURL}/compte/${this.id}`, clientData)
      .then(() => {router.go(-1);}); 
        }else if(existEm != 0){
          this.errors.push("email est déja utilisé."); 
        }
      }
    },
    fetchTypeClient() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    getClient() {
      axios
        .get(`${server.baseURL}/compte/${this.id}`)
        .then(data => (this.client = data.data,
        this.role= data.data.role, this.email= data.data.email,
        this.telephone= data.data.telephone));
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
