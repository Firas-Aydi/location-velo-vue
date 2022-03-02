<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <router-link to="/AjouterTypeClient">
        <button class="btn btn-outline-success m-2" type="submit">Ajouter</button>
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
                  <th scope="col">Type Client</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tcl in filteredTCl" :key="tcl.id">
                  <!-- <th scope="row">{{ tcl.id }}</th> -->
                  <td>{{ tcl.type }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierTypeClient', params: {id: tcl.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier  </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteTypeClients(tcl.id)">Effacer </button>
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
      typeClients: [],
    };
  },
  created() {
    this.fetchTypeClients();
  },
  computed: {
    filteredTCl: function() {
      return this.typeClients;
    },
  },
  methods: {
    fetchTypeClients() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    deleteTypeClients(id) {
        if(confirm("Voulez-vous supprimer ce type?")){
        axios.delete(`${server.baseURL}/type-client/${id}`).then((data) => {
          console.log(data);
          window.location.reload();
        })
      }
    },
  },
};
</script>
