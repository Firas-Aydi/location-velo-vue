<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center">
      <input class="form-control m-2" v-model="search" type="search" placeholder="Chercher" aria-label="Search">
      <router-link to="/AjouterModele">
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
                  <!-- <th scope="col">Image</th> -->
                  <th scope="col">Marque</th>
                  <th scope="col">Modèle</th>
                  <th scope="col">Pouce</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in filteredMod" :key="v.id">
                  <!-- <th scope="row">{{ v.id }}</th> -->
                  <!-- <td>
                    <img :src="convert(v.image)" alt="">
                    </td>
                  <td>{{ v.image }}</td> -->
                  <td>{{ getMarque(v.idMar) }}</td>
                  <td>{{ v.modele }}</td>
                  <td>{{ v.pouce }}</td>
                  <td>
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link :to="{name: 'ModifierModele', params: {id: v.id}}"><button class="btn btn-sm btn-outline-secondary">Modifier </button></router-link>
                        <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteModele(v.id)">Effacer </button>
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
    //   marque:"",
      modeles: [],
      marqueVelos:[],
    };
  },
  created() {
    this.fetchModeles();
    this.fetchMarqueVelos();
  },
  computed: {
      filteredMod: function() {
        return this.modeles.filter((modeles) => {
          return (
            modeles.modele.toLowerCase().match(this.search.toLowerCase()) ||
            modeles.pouce.toLowerCase().match(this.search.toLowerCase())
          );
        });
      },
      dataUrl(){
        return 'data:image/jpeg;base64,' + btoa(
            new Uint8Array(this.info.image)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }
  },
  methods: {
    getMarque(id){
      var marque="";
      for(var j=0; j<this.marqueVelos.length;j++){
        if(id==this.marqueVelos[j].id){
          marque=this.marqueVelos[j].marque;
          return marque;
        }
      }
    },
//     convert(img) {
//       console.log(img)
//       // var urlCreator = window.URL || window.webkitURL;
//       // var imageUrl = urlCreator.createObjectURL(img);
//       // return "data:image/jpeg:base64,"+img.data
//       // console.log()
//       // return "data:image/jpeg;base64,"+btoa(String.fromCharCode(...new Uint8Array(img.data)));

//       // return imageUrl;
//       return 'data:image/jpeg;base64,' + btoa(
//             new Uint8Array(img.data)
//             .reduce((data, byte) => data + String.fromCharCode(byte), '')
//         );
//     },
//     convertImgToBase64URL(url, callback, outputFormat){
//     var img = new Image();
//     img.crossOrigin = 'Anonymous';
//     img.onload = function(){
//         var canvas = document.createElement('CANVAS'),
//         ctx = canvas.getContext('2d'), dataURL;
//         canvas.height = img.height;
//         canvas.width = img.width;
//         ctx.drawImage(img, 0, 0);
//         dataURL = canvas.toDataURL(outputFormat);
//         callback(dataURL);
//         canvas = null; 
//     };
//     img.src = url;
// },

    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    fetchMarqueVelos() {
      axios
        .get(`${server.baseURL}/marque-velo`)
        .then((data) => (this.marqueVelos = data.data));
    },
    deleteModele(id) {
      if(confirm("Voulez-vous supprimer ce modèle?")){
      axios.delete(`${server.baseURL}/modele/${id}`).then((data) => {
        console.log(data);
        window.location.reload();
      })
      }
    },
  },
};
</script>
