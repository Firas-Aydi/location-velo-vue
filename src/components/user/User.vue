<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterUser">
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
                  <th scope="col">Prénom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Email</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Rôle</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in filteredCom" :key="c.id">
                  <!-- <th scope="row">{{ c.id }}</th> -->
                  <td>{{ c.prenom }}</td>
                  <td>{{ c.nom }}</td>
                  <td>{{ c.email }}</td>
                  <td>{{ c.telephone }}</td>
                  <td>{{ c.role }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierUser', params: {id: c.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteUser(c.id)">Effacer </button>
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
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    filteredCom: function() {
      return this.users.filter((users) => {
        return (
          users.prenom.toLowerCase().match(this.search.toLowerCase()) ||
          users.nom.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  },
  methods: {
    fetchUsers() {
      axios
        .get(`${server.baseURL}/compte/users`)
        .then((data) => (this.users = data.data));
    },
    deleteUser(id) {
      if(confirm("Voulez-vous supprimer cet utilisateur?")){
      axios.delete(`${server.baseURL}/compte/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
