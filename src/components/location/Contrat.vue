<template>
  <div class="our-blog">
    <form class="form-inline justify-content-center m-2">
      <small>
        <button class="btn btn-success" v-on:click="navigate()"> Retour </button>
      </small>
    </form>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <img src="@/assets/logo.png" class="float-left" width="100" alt="" />
          <h1>Contrat de location du groupe</h1>
          <p class="float-right mr-4">N du contrat : ....<br> Date .... /.... /........ </p>
          <div class="posts-area">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Prénom</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Téléphone</th>
                  <th scope="col">Réseau sociale</th>
                  <th scope="col">Circuit</th>
                  <th scope="col">Matricule du vélo</th>
                  <th scope="col">Accessoires</th>
                  <!-- <th scope="col">Expérience</th> -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <!-- <td></td> -->
                </tr>
              </tbody>
            </table>
            <div class="">
              <div class="form-check form-check-inline"><p>Pièces de garantie </p></div>&emsp;
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                <label class="form-check-label" for="inlineCheckbox1">CIN</label>
              </div>&emsp;
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                <label class="form-check-label" for="inlineCheckbox2">Chéque</label>
              </div>&emsp;
              <div class="form-check form-check-inline"><p>Pack choisi : ......</p></div>&emsp;
              <div class="form-check form-check-inline"><p>Heure de départ : ......</p></div>&emsp;
              <div class="form-check form-check-inline"><p>Heure de d'arrivée : ......</p></div>&emsp;
              <div class="form-check form-check-inline"><p>Montant totale : ......</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import router from "../../router";
export default {
  data() {
    return {

    };
  },
  methods:{
    navigate() {
      this.$router.push('/detail')
    },
  }
}
</script>