<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterClient">
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
                  <th scope="col">Date de naissance</th>
                  <th scope="col">Email</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cl in filteredCl" :key="cl.id">
                  <!-- <th scope="row">{{ cl.id }}</th> -->
                  <td>{{ cl.prenom }}</td>
                  <td>{{ cl.nom }}</td>
                  <td>{{ cl.dateNaissance }}</td>
                  <td>{{ cl.email }}</td>
                  <td>{{ cl.telephone }}</td>
                  <td>{{ cl.role }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierClient', params: {id: cl.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteClient(cl.id)">Effacer </button>
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
      clients: [],
      typeClients: [],
    };
  },
  created() {
    this.fetchClients();
    this.fetchTypeClients();
  },
  computed: {
    filteredCl: function() {
      return this.clients.filter((clients) => {
        return (
          clients.role.toLowerCase().match(this.search.toLowerCase()) ||
          clients.prenom.toLowerCase().match(this.search.toLowerCase()) ||
          clients.nom.toLowerCase().match(this.search.toLowerCase()));
      });
    },
  },
  methods: {
    fetchClients() {
      axios
        .get(`${server.baseURL}/compte/clients`)
        .then((data) => (this.clients = data.data));
    },
    fetchTypeClients() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    deleteClient(id) {
      if(confirm("Voulez-vous supprimer ce client?"))
      {
        axios.delete(`${server.baseURL}/compte/${id}`).then((data) => {
          console.log(data);
          window.location.reload();
        })
      }
    }
  },
};
</script>
