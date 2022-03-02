<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 p-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier Accessoire</strong> </h2>
          <form id="create-post-form" @submit.prevent="editAccessoire">
               <div class="form-group col-md-12">
                <label for="title"><strong> Article</strong> </label>
                <input type="text" id="article" v-model="accessoire.article" name="title" class="form-control" placeholder="Article" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"> <strong>Nombre</strong> </label>
                <input type="number" id="nombre" v-model="accessoire.nombre" name="title" class="form-control" placeholder="Nombre" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Prix</strong> </label>
                <input type="number" id="prix" v-model="accessoire.prix" name="title" class="form-control" placeholder="Prix" required>
               </div>

              <p v-if="errors.length">
                <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
              </p>
              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Modifier Accessoire </button>
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
      article: "",
      accessoire: {},
      errors: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getAccessoire();
    this.fetchAccessoires();
  },
  methods: {
    editAccessoire() {
      let exist=0
      this.errors = [];
      if (!this.validString(this.accessoire.article)){
        this.errors.push("Vérifiez le nom de l'article");
      }else{
      for(var j=0;j<this.accessoires.length;j++){
        if(this.accessoires[j].article!=this.article
          && this.accessoires[j].article==this.accessoire.article){
          exist=exist+1;
        }
      }
      if(exist==0){
      let accessoireData = {
        article: this.accessoire.article,
        nombre: this.accessoire.nombre,
        prix: this.accessoire.prix,
      };
      axios.put(`${server.baseURL}/accessoire/${this.id}`,accessoireData)
        .then(() => {router.go(-1);});
      }else{
        this.errors.push("Article existe déja.");
      }
      }
    },
    getAccessoire() {
      axios
        .get(`${server.baseURL}/accessoire/${this.id}`)
        .then(data => (this.accessoire = data.data,
        this.article=data.data.article));
    },
    fetchAccessoires() {
      axios
        .get(`${server.baseURL}/accessoire`)
        .then((data) => (this.accessoires = data.data));
    },
    validString: function (s) {
      var re = new RegExp(s.length<=30 && /^[a-zA-Z a-zA-Z À Â Ä Ç É È Ê Ë Î Ï Ô Ö Ù Û Ü Ÿ à â ä ç é è ê ë î ï ô ö ù û ü ÿ]+$/);
      return re.test(s);
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
