<template>
  <form>
    <div class="col-md-12 form-wrapper" style="width: 1000px; margin: 0 auto">
      <button class="btn btn-success m-2" v-on:click="navigate()">Retour</button>
      <router-link to="/Information"  @click.native="control()">
        <button class="btn btn-success m-2" @click="storeData()">Réservez maintenant !</button>
      </router-link>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 800px">Les vélos</th>
            <th scope="col" style="width: 100px">Nombre</th>
            <th scope="col" style="width: 100px">Prix (dt)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(m,i) in modeles" :key="i">
            <td>
              <!-- <img src="@/assets/vélo.png" class="float-left" width="100" height="50" /> -->
               {{ m.modele }}<br> {{ m.pouce }}</td>
            <td>
              <input type="number" min="0" :max="groupArrayOfObjects(m.id)" class="form-control" value="0" v-on:input="nb[i] = $event.target.value" required/>
            </td>
            <td>{{ modelesTarif(m.idMar) }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col" style="width: 800px">Les accessoires</th>
            <th scope="col" style="width: 100px">Nombre</th>
            <th scope="col" style="width: 100px">Prix (dt)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a,i) in accessoires" :key="i">
            <td> 
              <!-- <img src="@/assets/vélo.png" class="float-left" width="100" height="50" /> -->
              {{ a.article }} </td>
            <td> <input type="number" :max="groupArrayOfAcc(a.id)" min="0" value="0" class="form-control" v-on:input="nba[i] = $event.target.value" required/> </td>
            <td>{{ a.prix }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </form>
</template>

<script>
import { server } from "../../helper";
import axios from "axios";
export default {
  data: function() {
    return {
      dateLocation: "",
      heureDepart:"",
      heureArrivee:"",
      montant: "",
      count:0,
      reservations: [],
      ligRes: [],
      affAcc: [],
      modeles: [],
      velos: [],
      accessoires: [],
      tarif: [],
      nb:[],
      nba:[],
      nbHeure:0,
      typeClients:[],
    };
  },
  created() {
    this.fetchModeles();
    this.fetchVelos();
    this.fetchAccessoire();
    this.fetchTarif();
    this.fetchTypeClients();
    this.fetchLigRes();
    this.fetchAffAcc();
    this.fetchReservations();
    this.dateLocation=this.$store.state.reservation.dateLocation
    this.heureDepart=this.$store.state.reservation.heureDepart
    this.heureArrivee=this.$store.state.reservation.heureArrivee
    this.nbHeure=this.$store.state.reservation.nbHeure;
  },
  computed: {
  },
  methods: {
    control: function(){
      if( this.nb!=0 )
      {
        this.storeData();
      }else{
        alert("choisir au minimum un modèle");
        this.$router.push('/Produit');
      }
    },
    storeData(){
      const x =[]
      var som=0;
      this.nb.map((n,i)=>{
        if(n>0){
          x.push({qtt:n,modele:this.modeles[i].modele,pouce:this.modeles[i].pouce})
          som+=n*this.modelesTarif(this.modeles[i].idMar)
        }
      })
      this.$store.commit("updateProduit",x)
      const y =[]
      this.nba.map((n,i)=>{
        if(n>0){
          y.push({qtt:n,article:this.accessoires[i].article})
          som+=n*this.accessoires[i].prix
        }
      })
      this.$store.commit("updateAccessoire",y)
      this.$store.commit("updateMontant",som)
      // console.log(this.nb)
    },
    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data))
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.velos = data.data));
    },
    groupArrayOfObjects(id) {
      var nbv=0;
      var qtt=0;
      for(var i=0; i<this.velos.length;i++){
        if(this.velos[i].idMod==id){
          qtt++;
        }
      }
      for(var j=0; j<this.ligRes.length;j++){
        for(var k=0; k<this.reservations.length;k++){
          if(this.ligRes[j].idRes==this.reservations[k].id && this.reservations[k].dateLocation==this.dateLocation && 
          ((this.reservations[k].HeureDepart<=this.heureDepart && this.reservations[k].HeureArrivee>this.heureDepart) || 
          (this.reservations[k].HeureDepart<this.heureArrivee && this.reservations[k].HeureArrivee>this.heureDepart)) ){
            if(this.ligRes[j].idMod==id ){
              nbv++;
            }
          }
        }
      }
      qtt=qtt-nbv;
      return qtt;
    },
    fetchAccessoire() {
      axios
        .get(`${server.baseURL}/accessoire`)
        .then((data) => (this.accessoires = data.data));
    },
    groupArrayOfAcc(id) {
      var nba=0;
      var qtt=0;
        for(var i=0; i<this.accessoires.length;i++){
          if(this.accessoires[i].id==id){
            // qtt++;
            for(var j=0; j<this.affAcc.length;j++){
              if(this.affAcc[j].idAcc==id){
                nba++;
              }
            }
        qtt=this.accessoires[i].nombre-nba;
          }
        }
        return qtt;
    },
    fetchTarif() {
      axios
        .get(`${server.baseURL}/tarif`)
        .then((data) => (this.tarif = data.data));
    },
    fetchTypeClients() {
      axios
        .get(`${server.baseURL}/type-client`)
        .then((data) => (this.typeClients = data.data));
    },
    fetchReservations() {
      axios
        .get(`${server.baseURL}/reservation`)
        .then((data) => (this.reservations = data.data))
    },
    fetchLigRes() {
      axios
      .get(`${server.baseURL}/ligne-Reservation`)
      .then((data) => (this.ligRes = data.data));
    },
    fetchAffAcc() {
      axios
      .get(`${server.baseURL}/affecter-acc`)
      .then((data) => (this.affAcc = data.data));
    },
    modelesTarif(id){
      var tarif=0;
      var type="";
      for(var j=0; j<this.typeClients.length;j++){
        for(var i=0; i<this.tarif.length;i++){
          if(this.tarif[i].idTCl==this.typeClients[j].id && this.typeClients[j].type==this.$store.getters.role){
              type=this.tarif[i].idTCl
          }
        }
      }
      for(var k=0;k<this.tarif.length;k++){
        if(id==this.tarif[k].idMar && type==this.tarif[k].idTCl && this.nbHeure<=this.tarif[k].nombreHeure){
          tarif=this.tarif[k].tarif;
          return tarif;
        }
      }
    },
    // veloDis(){
    //   var nbv=0;
    //   var count=0;
    //   for(var i=0;i<this.velos.length;i++){
    //     count=count+1;
    //   }
    //   for(var j=0;j<this.ligRes.length;j++){
    //     nbv=nbv+1;
    //   }
    //   count=count-nbv;
    //   return count;
    // },
    navigate() {
      this.$router.push('/reserver');
    },
  },
};
</script>
