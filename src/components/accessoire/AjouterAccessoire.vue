<template>
   <div>
        <div class=" card col-md-12 form-wrapper mb-5 p-3" style="width: 500px; margin: 0 auto;  background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2> <strong>Ajouter Accessoire </strong></h2>
          <form id="create-post-form" @submit.prevent="createAccessoire">
               <div class="form-group col-md-12">
                <label for="title"><strong> Article </strong></label>
                <input type="text" id="prenom" v-model="article" name="title" class="form-control" placeholder="Article" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nombre</strong> </label>
                <input type="number" id="nombre" v-model="nombre" name="title" class="form-control" placeholder="Nombre" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Prix (dt) </strong></label>
                <input type="number" id="prix" v-model="prix" name="title" class="form-control" placeholder="Prix" required>
               </div>

              <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>
              <div class="form-group col-md-12 pull-right">
                <button class="btn btn-success" type="submit"> Ajouter Accessoire </button>
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
      article: "",
      nombre: "",
      prix: "",
      accessoires:[],
      errors: [],
    };
  },
  created() {
    this.fetchAccessoires();
  },
  methods: {
    createAccessoire() {
      let exist=0
      this.errors = [];
      if (!this.validString(this.article)){
        this.errors.push("Vérifiez le nom de l'article");
      }else{
      for(var j=0;j<this.accessoires.length;j++){
        if(this.accessoires[j].article==this.article){
          exist=exist+1;
        }
      }
      if(exist==0){
        let accessoireData = {
        article: this.article,
        nombre: this.nombre,
        prix: this.prix,
      };
      this.__submitToServer(accessoireData);
      }else{
        this.errors.push("Article existe déja.");
      }
      }
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/accessoire`, data).then(() => {
        router.go(-1);
      });
    },
    fetchAccessoires() {
      axios
        .get(`${server.baseURL}/accessoire`)
        .then((data) => (this.accessoires = data.data));
    },
    validString: function (s) {
      var re = new RegExp(s.length<=30 && /^[a-zA-Z À Â Ä Ç É È Ê Ë Î Ï Ô Ö Ù Û Ü Ÿ à â ä ç é è ê ë î ï ô ö ù û ü ÿ]+$/);
      return re.test(s);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

