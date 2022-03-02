<template>
   <div>

        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier User </strong></h2>
          <form id="create-post-form" @submit.prevent="editUser">
               <div class="form-group col-md-12">
                <label for="title"><strong> Prénom </strong></label>
                <input type="text" id="prenom" v-model="user.prenom" name="title" class="form-control" placeholder="Prénom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="user.nom" name="title" class="form-control" placeholder="Nom" required>
               </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Email</strong> </label>
                <input type="email" id="email" v-model="user.email" name="title" class="form-control" placeholder="Email" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"> <strong>Telephone </strong></label>
                <input type="tel" id="telephone" v-model="user.telephone" name="title" class="form-control" placeholder="Telephone" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"> <strong>Rôle </strong></label>
                <select class="form-control" v-model="user.role" required>
                    <option>Responsable commercial</option>
                    <option>Responsable vélo et guide</option>
                    <option>Responsable de location</option>
                    <option>Administrateur</option>
                </select>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Mot de passe </strong></label>
                <input type="password" id="password" v-model="user.password" name="title" class="form-control" placeholder="Mot de passe" autocomplete required>
            </div>

            <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
            <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Modifier User </button>
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
      role: "",
      email: "",
      telephone: "",
      users:[],
      errors: [],
      user: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
    this.fetchUsers();
  },
  methods: {
    editUser() {
      let exist=0
      let existEm=0
      this.errors = [];
      if (!this.validString(this.user.prenom)){
        this.errors.push('Vérifiez le prénom');
      }else
      if (!this.validString(this.user.nom)){
        this.errors.push('Vérifiez le nom');
      }else
      if (this.user.role==""){
        this.errors.push('Vérifiez le rôle');
      }else
      if (!this.validEmail(this.user.email)) {
          this.errors.push("Varifiez l'email");
      }else
      if (!this.validTel(this.user.telephone) && this.user.telephone != this.telephone) {
          this.errors.push('Vérifiez le numéro de téléphone');
      }else{
        for(var j=0;j<this.users.length;j++){
          if(this.users[j].role==this.user.role && this.users[j].role!=this.role){
            exist=exist+1;
          }
          if(this.users[j].email==this.user.email && this.users[j].email!=this.email){
            existEm=existEm+1;
          }
        }
        if(exist==0 && existEm==0){
        let userData = {
          prenom: this.user.prenom,
          nom: this.user.nom,
          role: this.user.role,
          email: this.user.email,
          telephone: this.user.telephone,
          password: this.user.password,
        };
        axios
          .put(`${server.baseURL}/compte/${this.id}`,userData)
          .then(() => {router.go(-1);});
      }else if(exist!=0){
          alert("Utilisateur existe déja."); 
        }else if(existEm != 0){
          alert("email est déja utilisé."); 
        }
      }
    },
    getUser() {
      axios
        .get(`${server.baseURL}/compte/${this.id}`)
        .then(data => (this.user = data.data,
        this.role= data.data.role, this.email= data.data.email,
        this.telephone= data.data.telephone));
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
