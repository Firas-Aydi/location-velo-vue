<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2> <strong>Ajouter User</strong> </h2>
          <form id="create-post-form" @submit.prevent="createUser">
               <div class="form-group col-md-12">
                <label for="title"><strong> Prénom </strong></label>
                <input type="text" id="prenom" v-model="prenom" name="title" class="form-control" placeholder="Prénom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="nom" name="title" class="form-control" placeholder="Nom" required>
               </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Email</strong> </label>
                <input type="email" id="email" v-model="email" name="title" class="form-control" placeholder="Email" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Telephone </strong></label>
                <input type="tel" id="telephone" v-model="telephone" name="title" class="form-control" placeholder="Telephone" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"> <strong>Rôle </strong></label>
                <select class="form-control" v-model="role" required>
                  <option>Responsable commercial</option>
                  <option>Responsable vélo et guide</option>
                  <option>Responsable de location</option>
                  <option>Administrateur</option>
                </select>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Mot de passe</strong> </label>
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
                <button class="btn btn-success" type="submit"> Ajouter User </button>
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
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      role: "",
      password: "",
      password_confirmation : "",
      errors: [],
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    createUser() {
      let exist=0
      let existEm=0
      // let existTel=0
      this.errors = [];
      if (!this.validString(this.prenom)){
        this.errors.push('Vérifiez le prénom');
      }else
      if (!this.validString(this.nom)){
        this.errors.push('Vérifiez le nom');
      }else
      if (this.role==""){
        this.errors.push('Vérifiez le rôle');
      }else
      if (!this.validEmail(this.email)) {
          this.errors.push("Varifiez l'email");
      }else
      if (!this.validTel(this.telephone)) {
          this.errors.push('Vérifiez le numéro de téléphone');
      }else
      if (this.password != this.password_confirmation){
        this.errors.push('Les mots de passe ne correspondent pas');
        this.password = ""
        this.password_confirmation = ""
      }else{
        for(var j=0;j<this.users.length;j++){
          if(this.users[j].role==this.role){
            exist=exist+1;
          }
          if(this.users[j].email==this.email){
            existEm=existEm+1;
          }
          // if(this.users[j].telephone==this.telephone){
          //   existTel=existTel+1;
          // }
        }
        if(exist==0 && existEm==0){
          let userData = {
            prenom: this.prenom,
            nom: this.nom,
            role: this.role,
            email: this.email,
            telephone: this.telephone,
            password: this.password,
            isUser: true,
          };
          this.__submitToServer(userData);
        }else if(exist!=0){
          alert("Utilisateur existe déja."); 
        }else if(existEm != 0){
          alert("email est déja utilisé."); 
        }
        // else{
        //   alert("Numéro de téléphone est déja utilisé."); 
        // }
      }
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/compte`, data).then(() => {
        router.go(-1);
      });
    },
    fetchUsers() {
      axios
        .get(`${server.baseURL}/compte/users`)
        .then((data) => (this.users = data.data));
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

