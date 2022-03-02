<template>
   <div>
        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
          <h4 class="text-center mt-20">
            <small>
            <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
            </small>
          </h4>
          <h2><strong> Ajouter Dommage</strong> </h2>
          <form id="create-post-form" @submit.prevent="createDommage">
               <!-- <div class="form-group col-md-12">
                <label for="title"><strong> Prenom</strong> </label>
                <input type="text" id="prenom" v-model="prenom" name="title" class="form-control" placeholder="Prenom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="nom" name="title" class="form-control" placeholder="Nom" required>
               </div> -->

            <div class="form-group col-md-12">
                <label for="title"><strong> Article </strong></label>
                <input type="article" id="article" v-model="article" name="title" class="form-control" placeholder="Article" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Type Dommage </strong></label>
                <select class="form-control" v-model="typeDommage" required>
                  <option>Destruction</option>
                  <option>Perte</option>
                </select>
            </div>

              <div class="form-group col-md-12 pull-right">
                  <button class="btn btn-success" type="submit"> Ajouter Dommage </button>
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
      article: "",
      typeDommage: "",
    };
  },
  methods: {
    createDommage() {
      let dommageData = {
        // prenom: this.prenom,
        // nom: this.nom,
        article: this.article,
        typeDommage: this.typeDommage,
      };
      this.__submitToServer(dommageData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/dommage`, data).then(() => {
        router.go(-1);
      });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

