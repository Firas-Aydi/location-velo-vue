<template>
  <div class="our-blog">
    <form @submit.prevent="createLocation">
    <div class="form-inline justify-content-center m-2">
      <small>
        <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
      </small>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-10" >
          <div class="posts-area" >
            <table class="table table-bordered" style="margin-left:-10%;">
              <thead class="thead-dark">
                <tr>
                  <!-- <th scope="col">#</th> -->
                  <th scope="col">Prénom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Réseau Social</th>
                  <th scope="col">Taille</th>
                  <th scope="col">Vélo</th>
                  <th scope="col">Matricule</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(lr,i) in filteredLigRes" :key="lr.id">
                  <!-- <th scope="row">{{ lr.id }}</th> -->
                  <td>{{ lr.prenom }}</td>
                  <td>{{ lr.nom }}</td>
                  <td>{{ lr.tel }}</td>
                  <td>{{ lr.resSoc }}</td>
                  <td>{{ lr.taille }}</td>
                  <td>
                    {{ lr.modele }} <br />
                    {{ lr.pouce }} <br />
                  </td>
                  <td>
                    <!-- <v-select :velos="options" @input="mat => updateMatricule(i, mat)" /> -->
                    <select class="form-control" @input="matricule[i] = $event.target.value" required>
                      <option >------</option>
                      <option v-for="(v,j) in velos" :key="j" @input="matricule[i] = $event.target.value">{{ v.matricule }}</option>
                    </select>
                    <!-- <input type="text" name="title" class="form-control mx-auto" style="width: 100px;" placeholder="Matricule" v-on:input="matricule[i] = $event.target.value" required /> -->
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-bordered" style="margin-left:-10%;">
            <thead class="thead-dark">
              <tr>
                <th scope="col" style="width: 48%;">accessoire</th>
                <th scope="col">Nombre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="acc in ligResAcc" :key="acc.id">
                <td>{{ acc.article }}</td>
                <td>{{ acc.nbAcc }}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div class="col-md-1">
        </div>
        <div class="col-md-1 ms-auto">
          <div class="card mb-3" style="width: 500%; height: 410px; margin-left:-250%;">
            <div class="card-body ">
                <table class="card-text table table-bordered mx-auto" style="margin-left:-10%;">
              <tr>
                <th scope="col" >Date</th>
                <td>{{ reservation.dateLocation }}</td>
              </tr>
              <tr>
                <th scope="col">Heure de depart</th>
                <td>{{ reservation.HeureDepart }}</td>
              </tr>
              <tr>
                <th scope="col">Heure d'arrivée</th>
                <td>{{ reservation.HeureArrivee }}</td>
              </tr>
                <tr>
                <th scope="col">Guide</th>
                <td>{{ demGuide(reservation.avecGuide) }}</td>
                </tr>
                <tr>
                <th scope="col">Montant total</th>
                <td>{{ reservation.montant }}</td>
                </tr>
          </table>
          <div class="form-check">
            
            <label class="form-check-label mr-5" for="CIN">
              <input class="form-check-input" v-model="checked" type="radio" name="flexRadioDefault" id="CIN" value="CIN" />
              CIN
              </label>
            
            <label class="form-check-label" for="Chéque">
              <input class="form-check-input" v-model="checked" type="radio" name="flexRadioDefault" id="Cheque" value="Cheque" />
              Chèque 
              </label>
          </div>
          <div>
            <input type="text" name="title" class="form-control mx-auto" v-model="numero" style="width: 100%;" placeholder="Numéro">
          </div>
              <router-link to="/Contrat" @click.native="control()">
                <button class="btn btn-sm btn-success m-3" >Accepter</button>
              </router-link>
              <button class="btn btn-sm btn-danger m-3" @click="refuser()">Refuser</button>
            </div>
          </div>
          <table class="table table-bordered" style="width: 500%; height: 150px; margin-left:-250%;">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Guide</th>
                <th scope="col" style="width: 50%;">Circuit</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>
                  <select class="form-control"  v-model="guide" required>
                    <option  v-for="g in guides" :key="g.id">{{ g.prenom }}</option>
                  </select>
                </td>
                <td>
                  <input type="text" name="title" class="form-control mx-auto" v-model="circuit" style="width: 100%;" placeholder="Circuit">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </form>
  </div>
</template>
<script>
import { server } from "../../helper";
// import router from "../../router";
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      idAcc: 0,
      nbAcc: 0,
      idGui: NaN,
      idLR: [],
      idCyc: [],
      idMod: [],
      matricule:[],
      guide:"",
      circuit:"",
      checked:"CIN",
      numero:"",
      accessoires: [],
      affAcc: [],
      ligRes: [],
      ligResAcc: [],
      velos:[],
      modeles:[],
      cyclistes:[],
      guides:[],
      reservation:{},
    };
  },
  created() {
    this.id = this.$store.state.reservation.id
    // this.fetchAffecterAcc();
    this.fetchAccessoire();
    this.fetchGuide();
    this.fetchligRes();
    this.fetchVelos();
    this.fetchModeles();
    this.fetchCyc();
    this.getReservation();
    // console.log(this.id)
  },
  computed:{
    options: () => this.velos,
    filteredGui: function() {
      return this.guides
    },
    filteredLigRes: function() {
      var idLR="";
      var prenom="";
      var nom="";
      var tel="";
      var resSoc="";
      var taille="";
      // var idMod="";
      var modele="";
      var pouce="";
      var ligRes=[];
      for(var i=0;i<this.ligRes.length;i++){
        if(this.ligRes[i].idRes==this.id){
          idLR=this.ligRes[i].id;
          for(var j=0;j<this.cyclistes.length;j++){
            if(this.cyclistes[j].id==this.ligRes[i].idCyc){
              prenom=this.cyclistes[j].prenom
              nom=this.cyclistes[j].nom
              tel=this.cyclistes[j].telephone
              resSoc=this.cyclistes[j].reseauSoc
              taille=this.cyclistes[j].taille
            }
          }
          for(var k=0;k<this.modeles.length;k++){
            if(this.modeles[k].id==this.ligRes[i].idMod){
              // idMod=this.ligRes[i].idMod
              modele=this.modeles[k].modele
              pouce=this.modeles[k].pouce
            }
          }
        ligRes.push({id:idLR,prenom:prenom,nom:nom,tel:tel,resSoc:resSoc,taille:taille,modele:modele,pouce:pouce})
        }
      }
      return ligRes;
    },
    },
  methods: {
    updateMatricule (i, mat) {
      this.matricule[i] = mat;
      console.log(i)
      console.log(mat)
    },
    filteredAcc: function() {
      var idLRA="";
      var nbAcc=0;
      var article="";
      // var ligResAcc=[];
      for(var i=0;i<this.affAcc.length;i++){
        if(this.affAcc[i].idRes==this.id){
          idLRA=this.affAcc[i].id;
          nbAcc=this.affAcc[i].nbAcc;
          for(var k=0;k<this.accessoires.length;k++){
            if(this.accessoires[k].id==this.affAcc[i].idAcc){
              article=this.accessoires[k].article
            }
          }
        this.ligResAcc.push({id:idLRA,article:article,nbAcc:nbAcc})
        }
      }
      // return ligResAcc;
      // console.log(this.ligResAcc);
    },
    demGuide(b){
      if(b==false){
        return "non"
      }
      return "oui"
    },
    control: function(){
      var ligRes=0
      for(var i=0;i<this.ligRes.length;i++){
        if(this.ligRes[i].idRes==this.id){
          ligRes=ligRes+1
        }
      }
      if(this.matricule.length==ligRes)
      {
        if((this.checked=="CIN" && this.numero.length==8) || (this.checked=="Cheque" && this.numero.length==7))
        {
          this.createLocation();
          alert("LOCATION EFFECTUÉE ✨")
        }else
        if((this.checked=="CIN" && this.numero.length!=8) || (this.checked=="Cheque" && this.numero.length!=7))
        {
          alert("Vérifier le numéro de CIN ou de chèque");
          this.$router.push('/detail');
        }
      }
      else
      if(this.matricule.length!=ligRes)
      {
        alert("Vérifier les vélos");
        this.$router.push('/detail');
      }
      console.log(this.checked)
    },
    createLocation() {
      var cin=null
      var cheque=null
      if(this.checked=="CIN"){
        cin=this.numero
      }else{
        cheque=this.numero
      }
      // if(this.matricule.length!=this.cyclistes.length)
      // {
      //   alert("Vérifier les vélos");
      //   this.$router.push('/detail');
      // }
      // else{
      for(var j=0; j<this.guides.length;j++){
        if( this.guides[j].prenom==this.guide){
          this.idGui=this.guides[j].id
        }
      }
      let LocationData = {
        dateLocation: this.reservation.dateLocation,
        HeureArrivee:this.reservation.HeureArrivee,
        HeureDepart:this.reservation.HeureDepart,
        circuit: this.circuit,
        nbVelo: this.reservation.nbVelo,
        montant: this.reservation.montant,
        retour: false,
        idCl: this.reservation.idCl,
        idGui: this.idGui,
        idRes: this.reservation.id,
        cin:cin,
        cheque:cheque
      };
      this.__submitToServer(LocationData);
      // }
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/location`, data).then((loc)=>{
        this.createLigLoc(loc.data.id),
        this.createLigLocAcc(loc.data.id);
      });
    },
    createLigLoc(id) {
      var idCyc=[];
      var idVelo=[];
      for(var j=0;j<this.ligRes.length;j++){
        if(this.ligRes[j].idRes==this.id){
          for(var i=0;i<this.modeles.length;i++){
            if(this.modeles[i].id==this.ligRes[j].idMod){
              idCyc.push(this.ligRes[j].idCyc)
            }
          }
        }
      }
      for(var k=0;k<this.matricule.length;k++){
        for(var l=0;l<this.velos.length;l++){
          if(this.matricule[k]==this.velos[l].matricule){
            idVelo.push(this.velos[l].id);
          }
        }
      }
      for(var m=0;m<idCyc.length;m++){
      // for(var n=0;n<idVelo.length;n++){
            let ligLocData = {
              idVelo: idVelo[m],
              idLoc: id,
              idCyc: idCyc[m],
            };
            this.__submitToServerLigLoc(ligLocData);
      // }
      }
      // console.log(this.matricule)
    },
    __submitToServerLigLoc(data) {
      axios.post(`${server.baseURL}/ligne-location`, data);
    },
    createLigLocAcc(id) {
      // var idLRA=0;
      // var nbAcc=0;
      // var article="";
      // var ligResAcc=[];
      for(var i=0;i<this.affAcc.length;i++){
        if(this.affAcc[i].idRes==this.id){
          // idLRA=this.affAcc[i].id;
          // nbAcc=this.affAcc[i].nbAcc;
      let ligLocAccData = {
        nbAcc: this.affAcc[i].nbAcc,
        idLoc: id,
        idAcc: this.affAcc[i].idAcc,
      };
      this.__submitToServerAcc(ligLocAccData);
        }
      }
    },
    __submitToServerAcc(data) {
      axios.post(`${server.baseURL}/ligne-location-accessoire`, data);
    },
    refuser() {
      if(confirm("Voulez-vous refuser cette réservation?")){
      axios.delete(`${server.baseURL}/reservation/${this.id}`).then((data) => {
        console.log(data);
        this.$router.push('/location');
        window.location.reload();
      })
      }
    },
    fetchAffecterAcc() {
      axios
        .get(`${server.baseURL}/affecter-acc`)
        .then((data) => (this.affAcc = data.data,this.filteredAcc()));
    },
    fetchAccessoire() {
      axios
        .get(`${server.baseURL}/accessoire`)
        .then((data) => (this.accessoires = data.data,this.fetchAffecterAcc()));
    },
    fetchligRes() {
      axios
        .get(`${server.baseURL}/ligne-Reservation`)
        .then((data) => (this.ligRes = data.data));
    },
    fetchVelos() {
      axios
        .get(`${server.baseURL}/velo`)
        .then((data) => (this.velos = data.data));
    },
    fetchCyc() {
      axios
        .get(`${server.baseURL}/guide`)
        .then((data) => (this.guides = data.data));
    },
    fetchGuide() {
      axios
        .get(`${server.baseURL}/cycliste`)
        .then((data) => (this.cyclistes = data.data));
    },
    fetchModeles() {
      axios
        .get(`${server.baseURL}/modele`)
        .then((data) => (this.modeles = data.data));
    },
    getReservation() {
      axios
        .get(`${server.baseURL}/reservation/${this.id}`)
        .then(data => (this.reservation = data.data));
    },
    navigate() {
      this.$router.push('/location');
    },
  },
};
</script>
