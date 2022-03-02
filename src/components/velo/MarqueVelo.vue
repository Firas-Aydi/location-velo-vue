<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <router-link to="/AjouterMarqueVelo">
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
                  <th scope="col">Marque Velo</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mve in filteredMVe" :key="mve.id">
                  <!-- <th scope="row">{{ mve.id }}</th> -->
                  <td>{{ mve.marque }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierMarqueVelo', params: {id: mve.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteMarqueVelos(mve.id)">Effacer</button>
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
      marqueVelos: [],
    };
  },
  created() {
    this.fetchMarqueVelos();
  },
  computed: {
    filteredMVe: function() {
      return this.marqueVelos;
    },
  },
  methods: {
    fetchMarqueVelos() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    deleteMarqueVelos(id) {
      if(confirm("Voulez-vous supprimer cette marque?")){
      axios.delete(`${server.baseURL}/marque-velo/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
