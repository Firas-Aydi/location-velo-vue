<template>
  <div class="border-0"  style="width: 1100px; margin: 0 auto; padding: 25px; background-color:#eee">
    <button class="btn btn-success m-2" v-on:click="navigate()">Retour</button>
      <div class="card  mb-5 pt-3">
          <div class="card-body">
            <form class=" border rounded" style=" margin: 0 auto; padding: 25px; background-color:#eee">
                <div class="form-group">
                    <label class="d-flex" for="inputAddress">Numéro de la carte</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required>
                </div>
                <div class="form-group">
                    <label class="d-flex" for="inputAddress2">Nom du Titulaire</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" required>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-10">
                        <label class="d-flex" for="inputCity">Date d'expiration</label>
                        <div class="form-inline ">
                        <select name="month" class="form-control col-md-6" required>
                            <option value="">----</option>
                            <option value="01 - janv">01 - janv</option>
                            <option value="02 - févr">02 - févr</option>
                            <option value="03 - mars">03 - mars</option>
                            <option value="04 - avr">04 - avr</option>
                            <option value="05 - mai">05 - mai</option>
                            <option value="06 - juin">06 - juin</option>
                            <option value="07 - juil">07 - juil</option>
                            <option value="08 - août">08 - août</option>
                            <option value="09 - sept">09 - sept</option>
                            <option value="10 - oct">10 - oct</option>
                            <option value="11 - nov">11 - nov</option>
                            <option value="12 - déc">12 - déc</option>
                        </select>
                        <select name="year" class="form-control col-md-5 ml-4" required>
                            <option >Choose...</option>
                            <option value="21">2021</option>
                            <option value="22">2022</option>
                            <option value="23">2023</option>
                            <option value="24">2024</option>
                            <option value="25">2025</option>
                            <option value="26">2026</option>
                            <option value="27">2027</option>
                            <option value="28">2028</option>
                            <option value="29">2029</option>
                            <option value="30">2030</option>
                            <option value="31">2031</option>
                            <option value="32">2032</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group col-md-2">
                        <label class="d-flex" for="inputZip">CVC / CVV </label>
                        <input type="text" class="form-control" id="inputZip" required>
                    </div>
                    <button type="submit" class="btn btn-success m-2 d-flex">Réservez maintenant !</button>
                </div>
                
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import router from "../../router";
export default {
  methods: {
    navigate() {
      router.go(-1);
    },
  },
};
</script>
