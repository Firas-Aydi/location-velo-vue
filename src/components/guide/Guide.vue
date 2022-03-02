<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterGuide">
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
                  <th scope="col">Date de naissance</th>
                  <th scope="col">Email</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="g in filteredGui" :key="g.id">
                  <!-- <th scope="row">{{ g.id }}</th> -->
                  <td>{{ g.prenom }}</td>
                  <td>{{ g.nom }}</td>
                  <td>{{ g.dateNaissance }}</td>
                  <td>{{ g.email }}</td>
                  <td>{{ g.telephone }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierGuide', params: {id: g.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteGuide(g.id)">Effacer </button>
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
      guides: [],
    };
  },
  created() {
    this.fetchGuides();
  },
  computed: {
    filteredGui: function() {
      return this.guides.filter((guides) => {
        return (
          guides.prenom.toLowerCase().match(this.search.toLowerCase()) ||
          guides.nom.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  },
  methods: {
    fetchGuides() {
      axios
        .get(`${server.baseURL}/guide`)
        .then((data) => (this.guides = data.data));
    },
    deleteGuide(id) {
      if(confirm("Voulez-vous supprimer ce guide?")){
      axios.delete(`${server.baseURL}/guide/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
