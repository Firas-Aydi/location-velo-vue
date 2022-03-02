<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterDommage">
        <button class="btn btn-outline-success" type="submit">Ajouter</button>
      </router-link>
    </form>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Prenom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Article</th>
                  <th scope="col">Type de dommage</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="g in filteredGui" :key="g.id">
                  <!-- <th scope="row">{{ g.id }}</th> -->
                  <td>{{ g.prenom }}</td>
                  <td>{{ g.nom }}</td>
                  <td>{{ g.article }}</td>
                  <td>{{ g.typeDommage }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierDommage', params: {id: g.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteDommage(g.id)">Effacer </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { server } from "../../helper";
import axios from "axios";
export default {
  data: function() {
    return {
      search: "",
      dommages: [],
    };
  },
  created() {
    this.fetchDommages();
  },
  computed: {
    filteredGui: function() {
      return this.dommages.filter((dommages) => {
        return (
          dommages.prenom.toLowerCase().match(this.search.toLowerCase()) ||
          dommages.article.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  },
  methods: {
    fetchDommages() {
      axios
        .get(`${server.baseURL}/dommage`)
        .then((data) => (this.dommages = data.data));
    },
    deleteDommage(id) {
      if(confirm("Voulez-vous supprimer ce dommage?")){
      axios.delete(`${server.baseURL}/dommage/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
