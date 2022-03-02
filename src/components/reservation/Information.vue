<template>
  <div>
    <p v-if="errors.length">
              <b class="alert alert-danger" role="alert" v-for="error in errors" :key="error">{{ error }}</b>
            </p>
    <form class="form-inline justify-content-center" >
      <button class="btn btn-success m-2" v-on:click="navigate()">Retour</button>
      <button class="btn btn-success m-2" @click.prevent="control()">Réservez</button>
      <router-link to="/Paiement" @click.native="affichage()">
        <button class="btn btn-success m-2">Payez maintenant !</button>
      </router-link>
    </form>
    <div class="our-blog">
      <div class="container">
        <div class="row">
          <div class="col-md-10 ">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" >Les vélos</th>
                  <th scope="col" >Prénom</th>
                  <th scope="col" >Nom</th>
                  <th scope="col" >Téléphone</th>
                  <th scope="col" >Réseau social</th>
                  <th scope="col" >Taille (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(m,i) in modeles" :key="i">
                  <td>
                    <!-- <img src="@/assets/vélo.png" class="float-left" width="100" height="50" alt=""/> -->
                    {{ m.modele }}<br />{{ m.pouce }}</td>
                  <td><input type="text" name="title" class="form-control mx-auto" style="width: 100px;" placeholder="Prénom" v-on:input="prenom[i] = $event.target.value" required /></td>
                  <td><input type="text" name="title" class="form-control mx-auto" style="width: 100px;" placeholder="Nom"  v-on:input="nom[i] = $event.target.value" required /></td>
                  <td><input type="tel" name="title" class="form-control mx-auto" style="width: 100px;" placeholder="Telephone" v-on:input="tel[i] = $event.target.value" required /></td>
                  <td><input type="text" name="title" class="form-control mx-auto" style="width: 140px;" placeholder="Réseau sociale"  v-on:input="resSoc[i] = $event.target.value" required /></td>
                  <td><input type="number" max="300" min="1" class="form-control mx-auto" style="width: 80px;"  v-on:input="taille[i] = $event.target.value" required /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-2 ms-auto">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <p class="card-text">
                    Date : {{ dateLocation }}<br>
                    L'heure de depart : {{ heureDepart }}<br>
                    L'heure d'arrivée : {{ heureArrivee }}<br>
                    Montant total : {{ montant }}
                </p>
                <div class="form-check">
                  <input class="form-check-input" v-model="guide" type="checkbox" value="">
                  <label class="form-check-label">Demander guide</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import * as moment from 'moment'
export default {
  data: function() {
    return {
      clients:[],
      nbVelo:0,
      // nbAcc:0,
      idCl:"",
      idAcc:[],
      idMod:[],
      dateLocation: "",
      heureDepart:"",
      heureArrivee:"",
      montant:"",
      guide:false,
      prenom:[],
      nom:[],
      tel:[],
      resSoc:[],
      taille:[],
      accessoires:[],
      acc:[],
      modeles:[],
      tousModeles:[],
      reservations:[],
      LigRes:[],
      errors: [],
      LR:[],
    };
  },
  created(){
    this.fetchClients();
    this.fetchAccessoire();
    this.fetchModeles();
    this.fetchLigRes();
    this.fetchReservations();
    this.dateLocation=this.$store.state.reservation.dateLocation
    this.heureDepart=this.$store.state.reservation.heureDepart
    this.heureArrivee=this.$store.state.reservation.heureArrivee
    this.montant=this.$store.state.reservation.montant
    this.$store.getters.modeles.map(m=>{
      for(let i =0; i<m.qtt;i++) {
        this.modeles.push({modele:m.modele,pouce:m.pouce})
        this.nbVelo+=1
      }
    })
    this.$store.getters.accessoires.map(a=>{
      this.acc.push({qtt:a.qtt,article:a.article})
    })
    // console.log(this.acc)
  },
  methods: {
    control: function(){
      this.errors = [];
      // for(var i;this.reservations.length;i++){
      //   if(this.reservations[i].idCl!=localStorage.getItem('email') && this.reservations[i].dateLocation!=this.dateLocation){
      const current = new Date();
      const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
      if( this.nbVelo!=0 && this.prenom.length==this.nbVelo && this.nom.length==this.nbVelo && (this.heureArrivee-this.heureDepart)>1 
      && (this.heureArrivee-this.heureDepart)<9 && this.dateLocation!=undefined 
      && moment(this.dateLocation, ["DD-MM-YYYY","MM-DD-YYYY", "YYYY-MM-DD"])>moment(date, ["DD-MM-YYYY","MM-DD-YYYY", "YYYY-MM-DD"])
      )
      {
        this.createReservation();
        alert("DEMANDE DE RÉSERVATION EFFECTUÉE ✨");
        this.$router.push('/mes-reservation');
      }else
      if(this.prenom.length!=this.nbVelo || this.nom.length!=this.nbVelo)
      {
        this.errors.push("Vérifier le(s) prénom(s) et le(s) nom(s)");
      }
      else{
        this.errors.push("Vérifier vos donner.");
        // console.log(this.nbVelo)
      }
    },
    createReservation() {
      for(var j=0; j<this.clients.length;j++){
        if( this.clients[j].email==localStorage.getItem('email')){
          this.idCl=this.clients[j].id
        }
      }
      let reservationData = {
        dateLocation: this.dateLocation,
        HeureArrivee:this.heureArrivee,
        HeureDepart:this.heureDepart,
        avecGuide: this.guide,
        montant: this.montant,
        nbVelo: this.nbVelo,
        idCl: this.idCl,
      };
      this.__submitToServer(reservationData)
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/reservation`, data)
      .then((res)=>{this.createCycliste(res.data.id),this.affecterAcc(res.data.id)
      });
    },
    createCycliste(id) {
      for(var i=0; i<this.prenom.length;i++){
      let cyclisteData = {
        prenom: this.prenom[i],
        nom: this.nom[i],
        telephone: this.tel[i],
        reseauSoc: this.resSoc[i],
        taille: this.taille[i],
      };
      this.__submitToServerCyc(cyclisteData,id,i);
      }
    },
    __submitToServerCyc(data,id,ligne) {
      axios.post(`${server.baseURL}/cycliste`, data).then((cyc)=>{this.ligneRes(id,cyc.data.id,ligne)});
    },
    ligneRes(idres,idcyc,ligne) {
      // var idRes="";
      let modelesSelectionne=[]
      for(var j=0; j<this.modeles.length;j++){
      for(var i=0; i<this.tousModeles.length;i++){
          if( this.modeles[j].modele==this.tousModeles[i].modele && this.modeles[j].pouce==this.tousModeles[i].pouce){
            modelesSelectionne.push(this.tousModeles[i].id)
            // this.idMod.push(this.tousModeles[i].id)
      // for(var k=0; k<this.modeles.length;k++){
        // if(this.LR.length>0){
        // for(var l=0;l<=this.LR.length;l++){
        //   console.log("1: "+this.LR[l])
        //     var x=0
        //   if(this.LR[l].idCyc==idcyc){x=x+1, console.log("2: "+x)}
        //   if(x==0){
         
      // }}}
      // else{
        //   for(var l=0;l<=this.LR.length;l++){
          //     if( this.LR[l].idCyc!=idcyc){
            //       this.__submitToServerLigRes(ligneResData);
      //     }
      //     }
      //   }
        // else{
        //   let ligneResData = {
        //   idRes: idres,
        //   idCyc: idcyc,
        //   idMod: this.tousModeles[i].id,
        // };
        //       this.__submitToServerLigRes(ligneResData);
        // }
      // }
          }
        }
      }
      // console.log("msg ",this.tousModeles[i].id)
      //  console.log("aaa"+idcyc);
        let ligneResData = {
          idRes: idres,
          idCyc: idcyc,
          idMod: modelesSelectionne[ligne],
        };
      // if(this.LR.length==0){
        // console.log("3: "+ligneResData)
        this.__submitToServerLigRes(ligneResData);
    },
    __submitToServerLigRes(data) {
      // var LR=[]
      axios.post(`${server.baseURL}/ligne-Reservation`, data);
    },
    affecterAcc(id) {
      for(var j=0; j<this.acc.length;j++){
      for(var i=0; i<this.accessoires.length;i++){
          if( this.acc[j].article==this.accessoires[i].article){
            this.idAcc.push(this.accessoires[i].id)
          }
        }
      }
      // console.log(this.idAcc)
      for(var k=0; k<this.acc.length;k++){
      let affecterAccData = {
        nbAcc: this.acc[k].qtt,
        idRes: id,
        idAcc: this.idAcc[k],
      };
      this.__submitToServerAff(affecterAccData);
      }
    },
    __submitToServerAff(data) {
      axios.post(`${server.baseURL}/affecter-acc`, data);
    },
    fetchClients() {
      axios
        .get(`${server.baseURL}/compte`)
        .then((data) => (this.clients = data.data));
    },
    fetchAccessoire() {
      axios
        .get(`${server.baseURL}/accessoire`)
        .then((data) => (this.accessoires = data.data))
    },
    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.tousModeles = data.data))
    },
    fetchReservations() {
      axios
        .get(`${server.baseURL}/reservation`)
        .then((data) => (this.reservations = data.data))
    },
    fetchLigRes() {
      axios
        .get(`${server.baseURL}/ligne-Reservation`)
        .then((data) => (this.LigRes = data.data))
    },
    validTel: function (tel) {
      var re = new RegExp(tel.length==8 && /^(2|3|4|5|7|9)[0-9]{7}/);
      return re.test(tel);
    },
    navigate() {
      this.$router.push('/produit')
    },
    affichage(){
    }
  },
}
</script>
