<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterAccessoire">
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
                  <th scope="col">Article</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Prix (dt)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in filteredV" :key="a.id">
                  <!-- <th scope="row">{{ a.id }}</th> -->
                  <td>{{ a.article }}</td>
                  <td>{{ a.nombre }}</td>
                  <td>{{ a.prix }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierAccessoire', params: {id: a.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteAccessoire(a.id)">Effacer </button>
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
      accessoires: [],
    };
  },
  created() {
    this.fetchAccessoires();
  },
  computed: {
    filteredV: function() {
      return this.accessoires.filter((accessoires) => {
        return (
          accessoires.article.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  },
  methods: {
    fetchAccessoires() {
      axios
        .get(`${server.baseURL}/accessoire`)
        .then((data) => (this.accessoires = data.data));
    },
    deleteAccessoire(id) {
      if(confirm("Voulez-vous supprimer cet accessoire?"))
      {
        axios.delete(`${server.baseURL}/accessoire/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
