<template>

  <div class="our-blog">
    <h1>Le délai de location doit être entre 2h et 8h</h1>
    <form class="form-inline justify-content-center" @submit.prevent="storeData">
      <div class="form-group m-5 ">
      <label for="title"> Date de location </label>
      <input type="date" id="dateLocation" v-model="dateLocation" name="title" class="form-control m-1" required>
      </div>
      <div class="form-group m-5">
        <label for="title"> Heure du départ </label>
        <select class="form-control m-1" v-model="heureDepart" required>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <!-- <option>18</option> -->
        </select>
      </div>
      <div class="form-group m-5">
        <label for="title"> Heure d'arrivée </label>
        <select class="form-control m-1" v-model="heureArrivee" required>
          <!-- <option>10</option> -->
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
        </select>
      </div>
      <div>
      <router-link to="/Produit" @click.native="control()">
        <button class="btn btn-outline-success m-5" type="submit" @click="storeData()">C'est parti</button>
      </router-link>
      </div>
    </form>
    <h2> Nombre de vélos disponibles </h2>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">{{a}}-{{b}}</th>
                  <th scope="col">{{b}}-{{c}}</th>
                  <th scope="col">{{c}}-{{d}}</th>
                  <th scope="col">{{d}}-{{e}}</th>
                  <th scope="col">{{e}}-{{f}}</th>
                  <th scope="col">{{f}}-{{g}}</th>
                  <th scope="col">{{g}}-{{h}}</th>
                  <th scope="col">{{h}}-{{i}}</th>
                  <th scope="col">{{i}}-{{j}}</th>
                  <th scope="col">{{j}}-{{k}}</th>
                </tr>
              </thead>
              <tbody >
                <!-- <tr v-for="v in filteredV" :key="v.id"> -->
                  <!-- <td v-if="v.etat==='OK'">{{ count++ }}</td> -->
                <tr>
                  <td>{{ veloDisAB() }}</td>
                  <td>{{ veloDisBC() }}</td>
                  <td>{{ veloDisCD() }}</td>
                  <td>{{ veloDisDE() }}</td>
                  <td>{{ veloDisEF() }}</td>
                  <td>{{ veloDisFG() }}</td>
                  <td>{{ veloDisGH() }}</td>
                  <td>{{ veloDisHI() }}</td>
                  <td>{{ veloDisIJ() }}</td>
                  <td>{{ veloDisJK() }}</td>
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
import * as moment from 'moment'
import { server } from "../../helper";
import axios from "axios";
export default {
  data: function() {
    return {
      dateLocation: "",
      heureDepart:'',
      heureArrivee:'',
      velos: [],
      reservations: [],
      count:0,
      a:9,
      b:10,
      c:11,
      d:12,
      e:13,
      f:14,
      g:15,
      h:16,
      i:17,
      j:18,
      k:19,
      errors:[],
    };
  },
  created(){
    console.log(localStorage.getItem('email'))
    this.dateLocation=this.$store.state.dateLocation
    this.heureDepart=this.$store.state.heureDepart
    this.heureArrivee=this.$store.state.heureArrivee
    this.fetchVelos();
    this.fetchReservation();
  },
  computed: {
    filteredV: function() {
      return this.velos;
    },
  },
  methods:{
    control: function(){
      this.errors = [];
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      if((this.heureArrivee-this.heureDepart)>1 && (this.heureArrivee-this.heureDepart)<9 && this.dateLocation!=undefined 
          && moment(this.dateLocation, ["DD-MM-YYYY","MM-DD-YYYY", "YYYY-MM-DD"])>moment(date, ["DD-MM-YYYY","MM-DD-YYYY", "YYYY-MM-DD"]))
      {
        this.storeData();
      }else
      if((this.heureArrivee-this.heureDepart)<=1 || (this.heureArrivee-this.heureDepart)>=9)
      {
        alert("Le délai de location doit être entre 2h et 8h");
        this.$router.push('/reserver');
      }else
      if(this.dateLocation==undefined)
      {
        alert("choisir une date");
        this.$router.push('/reserver');
      }
      else
      if(moment(this.dateLocation, ["DD-MM-YYYY","MM-DD-YYYY", "YYYY-MM-DD"])<=moment(date, ["DD-MM-YYYY","MM-DD-YYYY", "YYYY-MM-DD"]))
      {
        alert("La date de location doit être commencer à partir de demain");
        this.$router.push('/reserver');
      }else
      if(this.heureDepart==undefined)
      {
        alert("choisir l'heure de départ");
        this.$router.push('/reserver');
      }else
      if(this.heureArrivee==undefined)
      {
        alert("choisir l'heure d'arrivée");
        this.$router.push('/reserver');
      }
    },
    storeData: function(){
      this.$store.state.dateLocation=this.dateLocation;
      this.$store.state.heureDepart=this.heureDepart;
      this.$store.state.heureArrivee=this.heureArrivee;
      this.$store.state.nbHeure=this.heureArrivee-this.heureDepart;
      this.$store.commit("updateReservation",
      {
        dateLocation:this.format_date(this.dateLocation),
        heureDepart:this.heureDepart,
        heureArrivee:this.heureArrivee,
        nbHeure:this.heureArrivee-this.heureDepart,
      })
    },
    
    fetchVelos() {
      axios
      .get(`${server.baseURL}/velo/etat`)
      .then((data) => (this.velos = data.data));
    },
    fetchReservation() {
      axios
      .get(`${server.baseURL}/reservation`)
      .then((data) => (this.reservations = data.data));
    },
    veloDisAB(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.a && this.reservations[j].HeureArrivee>=this.b){
        nbv=nbv+this.reservations[j].nbVelo;
        }
        // console.log("heureDepart : ",this.reservations[j].HeureDepart);
        // console.log("a : ",this.a);
      }
      count=count-nbv;
      // console.log("count : ",count);
      // console.log("nbv : ",nbv);
      return count;
    },
    veloDisBC(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.b && this.reservations[j].HeureArrivee>=this.c){
        nbv=nbv+this.reservations[j].nbVelo;
        }
        // console.log("heureDepart : ",this.reservations[j].HeureDepart);
        // console.log("c : ",this.c);
      }
      count=count-nbv;
      // console.log("count : ",count);
      // console.log("nbv : ",nbv);
      return count;
    },
    veloDisCD(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.c && this.reservations[j].HeureArrivee>=this.d){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisDE(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.d && this.reservations[j].HeureArrivee>=this.e){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisEF(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.e && this.reservations[j].HeureArrivee>=this.f){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisFG(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.f && this.reservations[j].HeureArrivee>=this.g){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisGH(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.g && this.reservations[j].HeureArrivee>=this.h){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisHI(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.h && this.reservations[j].HeureArrivee>=this.i){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisIJ(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.i && this.reservations[j].HeureArrivee>=this.j){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    veloDisJK(){
      var nbv=0;
      var count=0;
      for(var i=0;i<this.velos.length;i++){
        count=count+1;
      }
      for(var j=0;j<this.reservations.length;j++){
        if(this.reservations[j].dateLocation==this.format_date(this.dateLocation) 
        && this.reservations[j].HeureDepart<=this.j && this.reservations[j].HeureArrivee>=this.k){
        nbv=nbv+this.reservations[j].nbVelo;
        }
      }
      count=count-nbv;
      return count;
    },
    format_date(value){
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY')
      }
    },
    format_date2(){
      // if (value) {
      //   return moment(String(value)).format('YYYY-DD-MM')
      // }
    },
  },
}
</script>
