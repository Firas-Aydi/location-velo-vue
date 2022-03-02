<template>
   <div>

        <div class="card col-md-12 form-wrapper mb-5 pt-3" style="width: 500px; margin: 0 auto; background-color:#eee">
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
         </small>
        </h4>
          <h2><strong> Modifier Dommage</strong> </h2>
          <form id="create-post-form" @submit.prevent="editDommage">
               <!-- <div class="form-group col-md-12">
                <label for="title"><strong> Prenom </strong></label>
                <input type="text" id="prenom" v-model="dommage.prenom" name="title" class="form-control" placeholder="Prenom" required>
               </div>

               <div class="form-group col-md-12">
                <label for="title"><strong> Nom </strong></label>
                <input type="text" id="nom" v-model="dommage.nom" name="title" class="form-control" placeholder="Nom" required>
               </div> -->

            <div class="form-group col-md-12">
                <label for="title"><strong> Article </strong></label>
                <input type="article" id="article" v-model="dommage.article" name="title" class="form-control" placeholder="Article" required>
            </div>

            <div class="form-group col-md-12">
                <label for="title"><strong> Type Dommage</strong> </label>
                <select class="form-control" v-model="dommage.typeDommage" required>
                  <option>Destruction</option>
                  <option>Perte</option>
                </select>
            </div>

              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Modifier Dommage </button>
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
      dommage: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getDommage();
  },
  methods: {
    editDommage() {
      let dommageData = {
        // prenom: this.dommage.prenom,
        // nom: this.dommage.nom,
        article: this.dommage.article,
        typeDommage: this.dommage.typeDommage,
      };

      axios
        .put(
          `${server.baseURL}/dommage/${this.id}`,
          dommageData
        )
        .then(() => {
          router.go(-1);
        });
    },
    getDommage() {
      axios
        .get(`${server.baseURL}/dommage/${this.id}`)
        .then(data => (this.dommage = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>
